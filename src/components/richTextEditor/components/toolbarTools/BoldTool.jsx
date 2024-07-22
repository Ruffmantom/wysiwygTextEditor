import React, { useEffect } from 'react'
import { ReactComponent as BoldIcon } from "../../../../assets/icons/bold.svg";
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function BoldTool() {
    const isMac = navigator.userAgent.toLowerCase().includes("macintosh");
    const { editorState, setEditorState, focusEditor } = useRichTextEditor()


    const handleCreateBold = (e) => {
        e.preventDefault()
        // set bold
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
        focusEditor()
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={handleCreateBold}
        >
            <BoldIcon />
            <span className="wysiwyg_tool_tip">
                Bold{" "}
                <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
            </span>
        </button>
    )
}
