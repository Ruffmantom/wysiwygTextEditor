import React from 'react'
import { ReactComponent as ULIcon } from "../../../../assets/icons/unordered-list.svg";

export default function UnorderedListTool({ handleEditorChange }) {

    //${isActive('unordered-list-item', 'block') ? 'active' : ""}

    const insertUnorderedList = (e) => {
        e.preventDefault();
        // document.execCommand("styleWithCSS", false, true);
        document.execCommand("insertUnorderedList", false, null);
        handleEditorChange(); // Save the state change
    };


    return (
        <button
            className={`icon_button tool_bar `}
            onClick={(e) => insertUnorderedList(e)}
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
