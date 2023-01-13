import React, {useEffect, useRef, useState} from "react";
import {DiffEditor, Monaco} from "@monaco-editor/react"
import {Change} from '@/model';
import '@/components/tree/Tree.css'
import {ReportState, useReportStore} from "@/model/store";


export interface EditorComponentProps {
    currentChange: Change | null;
    height?: string;
    inlineEditor?: boolean
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
    const originalSpec: string = useReportStore((report: ReportState) => report.selectedReportItem.originalSpec);
    const modifiedSpec: string = useReportStore((report: ReportState) => report.selectedReportItem.modifiedSpec);
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const [mod] = useState(modifiedSpec);
    const [orig] = useState(originalSpec);
    const currentChange = props.currentChange
    const [sbs] = React.useState(props.inlineEditor)

    useEffect(() => {
        if (currentChange) {
            if (editorRef.current) {
                    requestAnimationFrame(() => {
                        setTimeout(()=> {
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
    if (sbs) {
        options.renderSideBySide = false
    } else {
        options.renderSideBySide = true
    }
    let height = props.height
    if (!height) {
        if(sbs) {
            height = "calc(100vh - 607px)"
        } else {
            height = "calc(100vh - 350px)"
        }
    }
    return (
        <DiffEditor
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