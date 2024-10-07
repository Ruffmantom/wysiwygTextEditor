import React from 'react'
import { ReactComponent as StrikeIcon } from "../../../../assets/icons/strike.svg";

export default function StrikeThroughTool({setMoreToolDd}) {
// ${isActive('STRIKETHROUGH', 'inline') ? 'active' : ""}
    return (
        <button
            className={`icon_button tool_bar `}
            onClick={(e) => {
                // applyStyle(e, 'STRIKETHROUGH', 'inline')
                setMoreToolDd(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <StrikeIcon />
            <span className="wysiwyg_tool_tip">
                Strike Through{" "}
                <span className="key_command">
                    alt + s
                </span>
            </span>
        </button>
    )
}
