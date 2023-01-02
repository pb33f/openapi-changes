import React, {useEffect, useRef, useState} from "react";
import data from '../../../data.json'
import {DiffEditor, Monaco} from "@monaco-editor/react"
import {Change} from '@/model';

const originalSpec = data.originalSpec
const modifiedSpec = data.modifiedSpec

export interface EditorComponentProps {
    currentChange: Change | null;
    height?: string;
}

const updatePosition = (currentChange: Change, editorRef: any, col: number, line: number) => {
    if (currentChange.context.originalLine && !currentChange.context.newLine) {
        editorRef.current.setPosition({column: 1, lineNumber: 1});
        editorRef.current.revealLinesInCenter(1, 1);
        editorRef.current.getOriginalEditor().setPosition({column: col, lineNumber: line})
        editorRef.current.getOriginalEditor().revealPositionInCenter({column: col, lineNumber: line})
        editorRef.current.getOriginalEditor().revealLinesInCenter(line, line);
        editorRef.current.getOriginalEditor().focus();
    } else {
        editorRef.current.getOriginalEditor().revealLinesInCenter(1, 1);
        editorRef.current.getOriginalEditor().setPosition({column: 1, lineNumber: 1})
        editorRef.current.setPosition({column: col, lineNumber: line});
        editorRef.current.revealLinesInCenter(line, line);
        editorRef.current.focus();
    }
}

export const EditorComponent = (props: EditorComponentProps) => {

    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const [mod] = useState(modifiedSpec);
    const [orig] = useState(originalSpec);
    const currentChange = props.currentChange

    useEffect(() => {
        if (currentChange) {
            if (editorRef.current) {
                console.log('lllllll');
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
                    setTimeout(()=> {
                        updatePosition(currentChange, editorRef, col, line)
                    })
                }
            }
        }
    });

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
        const options = {
            base: 'vs-dark',
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
                'editor.lineHighlightBackground': '#E400FB98',
                'editorLineNumber.foreground': '#6368747F',
                'editorLineNumber.activeForeground': '#e400fb',
                'editor.inactiveSelectionBackground': '#FF3C742D',
                'diffEditor.removedTextBackground': '#FF3C741D',
                'diffEditor.insertedTextBackground': '#62C4FF2D',
            }
        };
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
                setTimeout(()=> {
                    updatePosition(currentChange, editorRef, col, line)
                })
            }
        }
    }

    const options = {
        readOnly: false,
        minimap: {enabled: false},
    };
    let height = props.height
    if (!height) {
        height = "73vh"
    }

    return (
        <DiffEditor
            width="100%"
            height={height}
            original={orig}
            modified={mod}
            onMount={handleEditorDidMount}
            theme={"pb33f"}
            language="yaml"
            options={options}
        />
    );
}