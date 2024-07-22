import React from 'react'
import { ReactComponent as ClearFormatIcon } from "../../../../assets/icons/clearFormat.svg";
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';

export default function ClearFormatTool() {
    const { clearFormatting } = useRichTextEditor();

    const clearFormat = (e) => {
        e.preventDefault()
        clearFormatting()
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={clearFormat}
        >
            <ClearFormatIcon />
            <span className="wysiwyg_tool_tip">
                Clear Format{" "}
                <span className="key_command">
                    {isMac ? "cmd + \\" : "ctrl + \\"}
                </span>
            </span>
        </button>
    )
}
