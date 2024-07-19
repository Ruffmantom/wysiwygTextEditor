import React from 'react'
import { ReactComponent as ItalicIcon } from "../../../../assets/icons/italic.svg";
export default function ItalicTool() {
    const isMac = navigator.userAgent.toLowerCase().includes("macintosh");
    const handleCreateItalic = (e) => {
        e.preventDefault()
        console.log('Bold Italic')
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={handleCreateItalic}
        >
            <ItalicIcon />
            <span className="wysiwyg_tool_tip">
                Italic{" "}
                <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
            </span>
        </button>
    )
}
