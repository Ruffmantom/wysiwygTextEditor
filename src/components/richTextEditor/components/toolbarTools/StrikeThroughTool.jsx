import React from 'react'
import { ReactComponent as StrikeIcon } from "../../../../assets/icons/strike.svg";
import { isMac } from '../../helpers/helpers';
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function StrikeThroughTool() {
    const { editorState, setEditorState, focusEditor } = useRichTextEditor()
    const handleCreateNewTag = (e) => {
        e.preventDefault()
        // set s
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
        focusEditor()
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={(e) => handleCreateNewTag(e)}
        >
            <StrikeIcon />
            <span className="wysiwyg_tool_tip">
                Strike Through{" "}
                <span className="key_command">
                    {isMac ? "cmd + shift + s" : "ctrl + shift + s"}
                </span>
            </span>
        </button>
    )
}
