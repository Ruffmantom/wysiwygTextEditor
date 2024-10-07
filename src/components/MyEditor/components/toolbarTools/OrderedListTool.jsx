import React from 'react'
import { ReactComponent as OLIcon } from "../../../../assets/icons/ordered-list.svg";


export default function OrderedListTool({handleEditorChange}) {
    // ${isActive('ordered-list-item', 'block') ? 'active' : ""}
    const insertUnorderedList = (e) => {
        e.preventDefault();
        // document.execCommand("styleWithCSS", false, true);
        document.execCommand("insertOrderedList", false, null);
        handleEditorChange(); // Save the state change
    };


    return (
        <button
            className={`icon_button tool_bar `}
            onClick={(e) => insertUnorderedList(e)}
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
