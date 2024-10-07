import React from 'react'
import { ReactComponent as ClearFormatIcon } from "../../../../assets/icons/clearFormat.svg";

export default function ClearFormatTool({handleEditorChange}) {

    const handleClearFormat = (e) => {
        e.preventDefault();
        document.execCommand("removeFormat", false, null);
        handleEditorChange(); // Save the state change
      };
    return (
        <button
            className="icon_button tool_bar"
            onClick={e => handleClearFormat(e)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ClearFormatIcon />
            <span className="wysiwyg_tool_tip">
                Clear Format
            </span>
        </button>
    )
}
