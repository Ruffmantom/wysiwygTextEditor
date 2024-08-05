import React from 'react'
import { ReactComponent as InfoToolIcon } from "../../../../assets/icons/infoTwo.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
// INFO_ELM
export default function InfoTool() {
    const { applyStyle, isActive } = useRichTextEditor()
    return (
        <button
            className={`icon_button tool_bar ${isActive('INFO_ELEMENT', 'block') ? 'active' : ""}`}
            onClick={(e) => applyStyle(e, 'INFO_ELEMENT', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <InfoToolIcon />
            <span className="wysiwyg_tool_tip">
                Info Block{" "}
            </span>
        </button>
    )
}
