import React from 'react'
import { ReactComponent as ClearFormatIcon } from "../../../../assets/icons/clearFormat.svg";

export default function ClearFormatTool() {
    // const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isMac = navigator.userAgent.toLowerCase().includes("macintosh");
    const clearFormat = (e) => {
        e.preventDefault()
        console.log('Clear all formats')
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={clearFormat}
        >
            <ClearFormatIcon />
            <span className="wysiwyg_tool_tip">
                Clear Format{" "}
                <span className="key_command">
                    {isMac ? "cmd + \\" : "ctrl + \\"}
                </span>
            </span>
        </button>
    )
}
