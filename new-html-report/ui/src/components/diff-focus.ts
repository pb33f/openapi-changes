import type { Change } from '../model/report-payload.js';

export interface FocusRange {
    start: number;
    end: number;
}

export interface FocusValueBlock {
    title: string;
    tone: 'added' | 'removed';
    lines: string[];
}

export interface FocusContextLine {
    lineNum: number;
    content: string;
    highlightedContent?: string;
    emphasis: 'normal' | 'primary' | 'range';
}

export interface FocusContextBlock {
    title: string;
    tone: 'added' | 'removed';
    lines: FocusContextLine[];
}

export interface FocusedDiffSection {
    key: string;
    title: string;
    path?: string;
    breaking: boolean;
    valueBlocks: FocusValueBlock[];
    contextBlocks: FocusContextBlock[];
}

const CONTEXT_RADIUS = 10;
const MAX_BLOCK_SIZE = 500;

const CHANGE_MODIFIED = 1;
const CHANGE_PROPERTY_ADDED = 2;
const CHANGE_OBJECT_ADDED = 3;
const CHANGE_OBJECT_REMOVED = 4;
const CHANGE_PROPERTY_REMOVED = 5;

export function buildFocusedDiffSections(
    changes: Change[],
    originalSpec: string,
    modifiedSpec: string,
    originalHighlighted: Record<number, string>,
    modifiedHighlighted: Record<number, string>,
    contextRadius: number = CONTEXT_RADIUS,
): FocusedDiffSection[] {
    const originalLines = splitSpecLines(originalSpec);
    const modifiedLines = splitSpecLines(modifiedSpec);

    return (changes || []).map((change, index) => {
        const valueBlocks = buildValueBlocks(change);
        const contextBlocks = buildContextBlocks(
            change,
            originalLines,
            modifiedLines,
            originalHighlighted || {},
            modifiedHighlighted || {},
            contextRadius,
        );

        return {
            key: `${change.path || 'change'}:${change.property || 'property'}:${change.change}:${index}`,
            title: `${changeTitle(change.change)}: ${change.property || 'changed item'}`,
            path: change.path,
            breaking: !!change.breaking,
            valueBlocks,
            contextBlocks,
        };
    });
}

export function splitSpecLines(spec: string): string[] {
    if (!spec) return [];
    const lines = spec.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }
    return lines;
}

export function singleLineRange(line: number): FocusRange {
    return { start: line, end: line };
}

export function computeBlockRange(lines: string[], changeLine: number): FocusRange {
    if (changeLine <= 0 || lines.length === 0 || changeLine > lines.length) {
        return { start: changeLine, end: changeLine };
    }

    const changeIndex = changeLine - 1;
    const changeIndent = measureIndent(lines[changeIndex]);
    let keyIndex = changeIndex;

    for (let i = changeIndex - 1; i >= 0; i--) {
        const line = lines[i];
        if (isBlankOrComment(line)) continue;
        if (measureIndent(line) < changeIndent) {
            keyIndex = i;
            break;
        }
    }

    const referenceIndent = measureIndent(lines[keyIndex]);
    const endIndex = findBlockEnd(lines, changeIndex, keyIndex, referenceIndent);

    return {
        start: keyIndex + 1,
        end: Math.max(keyIndex + 1, endIndex + 1),
    };
}

export function computeChildBlockRange(lines: string[], childKeyLine: number): FocusRange {
    if (childKeyLine <= 0 || lines.length === 0 || childKeyLine > lines.length) {
        return { start: childKeyLine, end: childKeyLine };
    }

    const childIndex = childKeyLine - 1;
    const childIndent = measureIndent(lines[childIndex]);
    const endIndex = findBlockEnd(lines, childIndex, childIndex, childIndent);

    return {
        start: childKeyLine,
        end: Math.max(childKeyLine, endIndex + 1),
    };
}

function findBlockEnd(lines: string[], startIndex: number, anchorIndex: number, referenceIndent: number): number {
    let endIndex = startIndex;

    for (let i = startIndex + 1; i < lines.length && (i - anchorIndex) < MAX_BLOCK_SIZE; i++) {
        const line = lines[i];
        if (isBlankOrComment(line)) {
            endIndex = i;
            continue;
        }
        if (measureIndent(line) > referenceIndent) {
            endIndex = i;
            continue;
        }
        break;
    }

    while (endIndex > anchorIndex && isBlankOrComment(lines[endIndex])) {
        endIndex--;
    }

    if (endIndex + 1 < lines.length) {
        const next = lines[endIndex + 1];
        const trimmed = trimLeft(next);
        if (trimmed && measureIndent(next) === referenceIndent) {
            const first = trimmed[0];
            if (first === '}' || first === ']') {
                endIndex++;
            }
        }
    }

    return endIndex;
}

export function computeBlockRangeForChange(lines: string[], changeLine: number, change: Change): FocusRange {
    if (change && isScopedChange(change.change)) {
        const candidates = changeLookupCandidates(change);
        for (let line = changeLine; line > 0;) {
            if (lineMatchesAnyCandidate(lines, line, candidates)) {
                return computeChildBlockRange(lines, line);
            }
            const childLine = findChildLine(lines, line, candidates);
            if (childLine > 0) {
                return computeChildBlockRange(lines, childLine);
            }
            const next = findAncestorLine(lines, line);
            if (next <= 0 || next === line) break;
            line = next;
        }
    }
    return computeBlockRange(lines, changeLine);
}

function buildValueBlocks(change: Change): FocusValueBlock[] {
    const original = resolveOriginalValue(change);
    const modified = resolveNewValue(change);

    switch (change.change) {
    case CHANGE_PROPERTY_ADDED:
    case CHANGE_OBJECT_ADDED:
        return originalOrNewValueBlocks('Added Value', 'added', modified);
    case CHANGE_OBJECT_REMOVED:
    case CHANGE_PROPERTY_REMOVED:
        return originalOrNewValueBlocks('Removed Value', 'removed', original);
    case CHANGE_MODIFIED: {
        const blocks: FocusValueBlock[] = [];
        if (original) {
            blocks.push({
                title: 'Original Value',
                tone: 'removed',
                lines: formatValueLines(original),
            });
        }
        if (modified) {
            blocks.push({
                title: 'Modified Value',
                tone: 'added',
                lines: formatValueLines(modified),
            });
        }
        return blocks;
    }
    default:
        return [];
    }
}

function originalOrNewValueBlocks(
    title: string,
    tone: 'added' | 'removed',
    value: string,
): FocusValueBlock[] {
    if (!value) return [];
    return [{
        title,
        tone,
        lines: formatValueLines(value),
    }];
}

function formatValueLines(value: string): string[] {
    const lines = value.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }
    return lines;
}

function buildContextBlocks(
    change: Change,
    originalLines: string[],
    modifiedLines: string[],
    originalHighlighted: Record<number, string>,
    modifiedHighlighted: Record<number, string>,
    contextRadius: number = CONTEXT_RADIUS,
): FocusContextBlock[] {
    const blocks: FocusContextBlock[] = [];
    const originalLine = change.context?.originalLine || 0;
    const modifiedLine = change.context?.newLine || 0;
    const multilineValue = hasMultilineValue(change);

    switch (change.change) {
    case CHANGE_PROPERTY_ADDED:
    case CHANGE_OBJECT_ADDED:
        if (modifiedLine > 0) {
            blocks.push(buildContextBlock(
                'Modified Context',
                'added',
                modifiedLines,
                modifiedHighlighted,
                computeBlockRangeForChange(modifiedLines, modifiedLine, change),
                contextRadius,
            ));
        }
        break;
    case CHANGE_OBJECT_REMOVED:
    case CHANGE_PROPERTY_REMOVED:
        if (originalLine > 0) {
            blocks.push(buildContextBlock(
                'Original Context',
                'removed',
                originalLines,
                originalHighlighted,
                computeBlockRangeForChange(originalLines, originalLine, change),
                contextRadius,
            ));
        }
        break;
    case CHANGE_MODIFIED:
        if (originalLine > 0) {
            blocks.push(buildContextBlock(
                'Original Context',
                'removed',
                originalLines,
                originalHighlighted,
                multilineValue
                    ? computeBlockRangeForChange(originalLines, originalLine, change)
                    : singleLineRange(originalLine),
                contextRadius,
            ));
        }
        if (modifiedLine > 0) {
            blocks.push(buildContextBlock(
                'Modified Context',
                'added',
                modifiedLines,
                modifiedHighlighted,
                multilineValue
                    ? computeBlockRangeForChange(modifiedLines, modifiedLine, change)
                    : singleLineRange(modifiedLine),
                contextRadius,
            ));
        }
        break;
    default:
        break;
    }

    return blocks;
}

function buildContextBlock(
    title: string,
    tone: 'added' | 'removed',
    specLines: string[],
    highlighted: Record<number, string>,
    range: FocusRange,
    contextRadius: number = CONTEXT_RADIUS,
): FocusContextBlock {
    const start = Math.max(1, range.start - contextRadius);
    const end = Math.min(specLines.length, range.end + contextRadius);
    const lines: FocusContextLine[] = [];

    for (let lineNum = start; lineNum <= end; lineNum++) {
        lines.push({
            lineNum,
            content: specLines[lineNum - 1] || '',
            highlightedContent: highlighted[lineNum],
            emphasis: lineNum === range.start
                ? 'primary'
                : lineNum > range.start && lineNum <= range.end
                    ? 'range'
                    : 'normal',
        });
    }

    return { title, tone, lines };
}

function resolveOriginalValue(change: Change): string {
    if (change.originalEncoded) return change.originalEncoded;
    return stringifyValue(change.original);
}

function resolveNewValue(change: Change): string {
    if (change.newEncoded) return change.newEncoded;
    return stringifyValue(change.new);
}

function stringifyValue(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
}

function hasMultilineValue(change: Change): boolean {
    return resolveOriginalValue(change).includes('\n') || resolveNewValue(change).includes('\n');
}

function changeTitle(changeType: number): string {
    switch (changeType) {
    case CHANGE_PROPERTY_ADDED:
    case CHANGE_OBJECT_ADDED:
        return 'Added';
    case CHANGE_OBJECT_REMOVED:
    case CHANGE_PROPERTY_REMOVED:
        return 'Removed';
    case CHANGE_MODIFIED:
    default:
        return 'Modified';
    }
}

function isScopedChange(changeType: number): boolean {
    return changeType >= CHANGE_MODIFIED && changeType <= CHANGE_PROPERTY_REMOVED;
}

function changeLookupCandidates(change: Change): string[] {
    const seen = new Set<string>();
    const candidates: string[] = [];

    const add = (value: string) => {
        const token = normalizeLookupToken(value);
        if (!token || seen.has(token)) return;
        seen.add(token);
        candidates.push(token);
    };

    add(change.property || '');
    add(resolveOriginalValue(change));
    add(resolveNewValue(change));

    return candidates;
}

function normalizeLookupToken(value: string): string {
    return value
        .trim()
        .replace(/,$/, '')
        .trim()
        .replace(/^['"]|['"]$/g, '')
        .trim()
        .toLowerCase();
}

function lineMatchesAnyCandidate(lines: string[], line: number, candidates: string[]): boolean {
    if (line <= 0 || line > lines.length || candidates.length === 0) return false;
    const token = extractLineToken(lines[line - 1]);
    return token ? candidates.includes(token) : false;
}

function findChildLine(lines: string[], parentLine: number, candidates: string[]): number {
    if (parentLine <= 0 || parentLine > lines.length || candidates.length === 0) return 0;

    const parentIndex = parentLine - 1;
    const parentIndent = measureIndent(lines[parentIndex]);
    let childIndent = -1;

    for (let i = parentIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (isBlankOrComment(line)) continue;

        const indent = measureIndent(line);
        if (indent <= parentIndent) break;
        if (childIndent === -1) childIndent = indent;
        if (indent !== childIndent) continue;
        if (lineMatchesAnyCandidate(lines, i + 1, candidates)) return i + 1;
    }

    return 0;
}

function findAncestorLine(lines: string[], line: number): number {
    if (line <= 1 || line > lines.length) return 0;

    const index = line - 1;
    const indent = measureIndent(lines[index]);
    for (let i = index - 1; i >= 0; i--) {
        if (isBlankOrComment(lines[i])) continue;
        if (measureIndent(lines[i]) < indent) return i + 1;
    }
    return 0;
}

function extractLineToken(line: string): string | null {
    const trimmed = trimLeft(line);
    if (!trimmed) return null;

    if (trimmed.startsWith('- ')) {
        const item = trimmed.slice(2).trim();
        if (!item) return null;
        const colonIndex = item.indexOf(':');
        return colonIndex > 0 ? normalizeLookupToken(item.slice(0, colonIndex)) : normalizeLookupToken(item);
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
        return normalizeLookupToken(trimmed.slice(0, colonIndex));
    }

    if (trimmed[0] === '{' || trimmed[0] === '}' || trimmed[0] === '[' || trimmed[0] === ']') {
        return null;
    }

    return normalizeLookupToken(trimmed);
}

function measureIndent(line: string): number {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ' && line[i] !== '\t') return i;
    }
    return line.length;
}

function isBlankOrComment(line: string): boolean {
    const trimmed = trimLeft(line);
    return trimmed.length === 0 || trimmed[0] === '#';
}

function trimLeft(value: string): string {
    let index = 0;
    while (index < value.length && (value[index] === ' ' || value[index] === '\t')) {
        index++;
    }
    return value.slice(index);
}
