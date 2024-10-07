import React from 'react'
import { ReactComponent as MonoIcon } from "../../../../assets/icons/monotype.svg";


export default function MonoSpaceTool() {
    // ${isActive('MONOSPACE', 'inline') ? 'active' : ""}
    return (
        <button
            className={`icon_button tool_bar `}
            // onClick={(e) => applyStyle(e, 'MONOSPACE', 'inline')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <MonoIcon />
            <span className="wysiwyg_tool_tip">
                Monospace{" "}
                <span className="key_command">alt + m</span>
            </span>
        </button>
    )
}
