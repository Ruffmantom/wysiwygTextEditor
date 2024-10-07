import React from 'react'
import { ReactComponent as OLIcon } from "../../../../assets/icons/ordered-list.svg";


export default function OrderedListTool() {
    // ${isActive('ordered-list-item', 'block') ? 'active' : ""}
    return (
        <button
            className={`icon_button tool_bar `}
            // onClick={(e) => applyStyle(e, 'ordered-list-item', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <OLIcon />
            <span className="wysiwyg_tool_tip">
                Ordered List{" "}
                <span className="key_command">alt + 1</span>
            </span>
        </button>
    )
}
