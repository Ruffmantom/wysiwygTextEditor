import React, {useEffect} from 'react'
import { ReactComponent as BoldIcon } from "../../../../assets/icons/bold.svg";

export default function BoldTool({editorRef}) {
    const isMac = navigator.userAgent.toLowerCase().includes("macintosh");

    const handleCreateBold = (e) => {
        e.preventDefault()
        console.log('Bold Text')
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={handleCreateBold}
        >
            <BoldIcon  />
            <span className="wysiwyg_tool_tip">
                Bold{" "}
                <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
            </span>
        </button>
    )
}
