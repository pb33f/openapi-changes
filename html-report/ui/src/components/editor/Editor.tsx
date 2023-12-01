// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React, {useEffect, useRef} from "react";
import {DiffEditor, Monaco} from "@monaco-editor/react"
import {Change} from '@/model';
import '@/components/tree/Tree.css'
import {EditorState, ReportState, useEditorStore, useReportStore} from "@/model/store";
import {Switch} from "antd";
import './Editor.css';

export interface EditorComponentProps {
    currentChange: Change | null;
    height?: string;
    sideBySideEditor?: boolean
}

const updatePosition = (currentChange: Change, editorRef: any, origCol: number, origLine: number,
                        newCol: number, newLine: number) => {
    // if this is a removal
    if (origLine && !newLine) {
        editorRef.current.setPosition({column: 1, lineNumber: 1});
        editorRef.current.revealLinesInCenter(1, 1);
        editorRef.current.getOriginalEditor().setPosition({column: origCol, lineNumber: origLine})
        editorRef.current.getOriginalEditor().revealPositionInCenter({column: origCol, lineNumber: origLine})
        editorRef.current.getOriginalEditor().revealLinesInCenter(origLine, origLine);
        editorRef.current.getOriginalEditor().focus();
    } else {
        if (origLine) {
            editorRef.current.getOriginalEditor()
                .revealLinesInCenter(origCol, origLine);
            editorRef.current.getOriginalEditor()
                .setPosition({column: origCol, lineNumber: origLine})
        } else {
            editorRef.current.getOriginalEditor().revealLinesInCenter(1, 1);
            editorRef.current.getOriginalEditor().setPosition({column: 1, lineNumber: 1})
        }
        if (newLine) {
            editorRef.current.setPosition({column: newCol, lineNumber: newLine});
            editorRef.current.revealLinesInCenter(newLine, newLine);
            editorRef.current.focus();
        } else {
            editorRef.current.getOriginalEditor().revealLinesInCenter(1, 1);
            editorRef.current.getOriginalEditor().setPosition({column: 1, lineNumber: 1})
        }
    }
}

export function EditorComponent(props: EditorComponentProps) {
    const originalSpec: string | undefined = useReportStore((report: ReportState) => report.selectedReportItem?.originalSpec);
    const modifiedSpec: string | undefined = useReportStore((report: ReportState) => report.selectedReportItem?.modifiedSpec);
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const currentChange = props.currentChange
    const sbs = props.sideBySideEditor;
    const setSbs = useEditorStore((editor: EditorState) => editor.setSideBySide);

    useEffect(() => {
        if (currentChange) {
            if (editorRef.current) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        updatePosition(currentChange, editorRef,
                            currentChange.context.originalColumn,
                            currentChange.context.originalLine,
                            currentChange.context.newColumn,
                            currentChange.context.newLine)
                    }, 10)
                })
            }
        }
    });

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;

        const options = {
            base: 'vs-dark',
            renderSideBySide: false,
            inherit: true,
            rules: [

                {
                    "foreground": "b685ff",
                    "token": "string"
                },
                {
                    "foreground": "62C4FFFF",
                    "token": "type"
                },
            ],
            colors: {
                'editor.foreground': '#ffffff',
                'editor.background': '#0d1117',
                'editorCursor.foreground': '#62C4FFFF',
                'editor.lineHighlightBackground': '#E400FB4D',
                'editorLineNumber.foreground': '#6368747F',
                'editorLineNumber.activeForeground': '#E400FB',
                'editor.inactiveSelectionBackground': '#FF3C742D',
                'diffEditor.removedTextBackground': '#FF3C741A',
                'diffEditor.insertedTextBackground': '#62C4FF1A',
            }
        };
        // @ts-ignore
        monaco.editor.defineTheme("pb33f", options);
        monaco.editor.setTheme('pb33f');

        if (currentChange) {
            let line: number;
            let col: number;
            if (currentChange.context.originalLine && !currentChange.context.newLine) {
                line = currentChange.context.originalLine
                col = currentChange.context.originalColumn
            } else {
                line = currentChange.context.newLine
                col = currentChange.context.newColumn
            }
            if (col != null || line != null) {
                // ensure the position update happens after the mounting and subsequent rendering has occurred
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        updatePosition(currentChange, editorRef,
                            currentChange.context.originalColumn,
                            currentChange.context.originalLine,
                            currentChange.context.newColumn,
                            currentChange.context.newLine)
                    }, 10);
                });
            }
        }
    }

    const options: any = {
        readOnly: false,
        minimap: {enabled: false},
    };

    let checked = true;

    if (sbs) {
        options.renderSideBySide = true
    } else {
        checked = false;
        options.renderSideBySide = false
    }
    let height = props.height
    const mobile = (window.innerWidth < 1000)
    if (!height) {
        if (mobile) {
            height = "calc(100vh - 480px)"
        } else {
            height = "calc(100vh - 316px)"
        }
    }

    const flipEditor = (checked: boolean) => {
        setSbs(checked)
    }

    return (
        <section className='editor'>
            <span className='editor-flip-controls'>
                View side-by-side
                <Switch size='small' defaultChecked onChange={flipEditor} checked={checked}/>
            </span>
            <DiffEditor
                height={height}
                original={originalSpec}
                modified={modifiedSpec}
                onMount={handleEditorDidMount}
                theme={"pb33f"}
                language="yaml"
                options={options}
            />
        </section>
    );
}