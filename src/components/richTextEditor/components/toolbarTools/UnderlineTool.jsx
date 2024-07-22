import React from 'react'
import { ReactComponent as UnderlineIcon } from "../../../../assets/icons/underline.svg";
import { isMac } from '../../helpers/helpers';
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function UnderlineTool() {
    const { editorState, setEditorState, focusEditor } = useRichTextEditor()

    const handleCreateNewTag = (e) => {
        e.preventDefault()
        // set u
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
        focusEditor()
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={(e) => handleCreateNewTag(e)}
        >
            <UnderlineIcon />
            <span className="wysiwyg_tool_tip">
                Underline{" "}
                <span className="key_command">
                    {isMac ? "cmd + u" : "ctrl + u"}
                </span>
            </span>
        </button>
    )
}
