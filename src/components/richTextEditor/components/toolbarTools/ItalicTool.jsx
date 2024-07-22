import React from 'react'
import { ReactComponent as ItalicIcon } from "../../../../assets/icons/italic.svg";
import { isMac } from '../../helpers/helpers';
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function ItalicTool() {
    const { editorState, setEditorState, focusEditor } = useRichTextEditor()

    const handleCreateItalic = (e) => {
        e.preventDefault()
        // set italic
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
        focusEditor()
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={handleCreateItalic}
        >
            <ItalicIcon />
            <span className="wysiwyg_tool_tip">
                Italic{" "}
                <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
            </span>
        </button>
    )
}
