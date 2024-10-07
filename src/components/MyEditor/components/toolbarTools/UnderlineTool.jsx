import React from 'react'
import { ReactComponent as UnderlineIcon } from "../../../../assets/icons/underline.svg";
import { isMac } from '../../helpers/helpers';

export default function UnderlineTool({ setMoreToolDd, handleEditorChange }) {

    const handleUnderlineText = (e) => {
        e.preventDefault();
        document.execCommand("underline", false, null); // Basic underline functionality
        handleEditorChange(); // Save the state change
      };

    //${isActive('UNDERLINE', 'inline') ? 'active' : ""}
    return (
        <button
            className={`icon_button tool_bar `}
            onClick={(e) => {
                handleUnderlineText(e);
                setMoreToolDd(false)
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <UnderlineIcon />
            <span className="wysiwyg_tool_tip">
                Underline{" "}
                <span className="key_command">
                    {isMac ? "cmd + u" : "ctrl + u"}
                </span>
            </span>
        </button>
    )
}
