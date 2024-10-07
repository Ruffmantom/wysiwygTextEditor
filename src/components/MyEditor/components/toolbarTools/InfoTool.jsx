import React from 'react'
import { ReactComponent as InfoToolIcon } from "../../../../assets/icons/infoTwo.svg";
// INFO_ELM
export default function InfoTool() {
    // add this to the className
    // ${isActive('INFO_ELEMENT', 'block') ? 'active' : ""}
    return (
        <button
            className={`icon_button tool_bar `}
            // onClick={(e) => applyStyle(e, 'INFO_ELEMENT', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <InfoToolIcon />
            <span className="wysiwyg_tool_tip">
                Info Block{" "}
            </span>
        </button>
    )
}
