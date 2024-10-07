import React from 'react'
import { ReactComponent as ULIcon } from "../../../../assets/icons/unordered-list.svg";

export default function UnorderedListTool() {

    //${isActive('unordered-list-item', 'block') ? 'active' : ""}
  return (
     <button
            className={`icon_button tool_bar `}
            // onClick={(e) => applyStyle(e, 'unordered-list-item', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ULIcon />
            <span className="wysiwyg_tool_tip">
                Unordered List{" "}
                <span className="key_command">alt + u</span>
            </span>
        </button>
  )
}
