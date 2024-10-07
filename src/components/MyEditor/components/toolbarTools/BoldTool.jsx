import React from 'react'
import { ReactComponent as BoldIcon } from "../../../../assets/icons/bold.svg";
import { isMac } from '../../helpers/helpers';

export default function BoldTool({handleEditorChange}) {
    // ${isActive('BOLD', 'inline') ? 'active' : ""}
    const handleBoldText = (e) => {
        e.preventDefault();
        document.execCommand("bold", false, null); // Basic bold functionality
        handleEditorChange(); // Save the state change
      };

    return (
        <button
            className={`icon_button tool_bar `}
            onMouseDown={(e) => e.preventDefault()}
            onClick={e=>handleBoldText(e)}
        >
            <BoldIcon />
            <span className="wysiwyg_tool_tip">
                Bold{" "}
                <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
            </span>
        </button>
    )
}
