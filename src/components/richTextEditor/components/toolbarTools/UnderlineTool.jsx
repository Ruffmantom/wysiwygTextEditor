import React from 'react'
import { ReactComponent as UnderlineIcon } from "../../../../assets/icons/underline.svg";
import { isMac } from '../../helpers/helpers';

export default function UnderlineTool() {

    
    const handleCreateNewTag = (e,tag) => {
        e.preventDefault()
        console.log(`Create Tag: ${tag}`)
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={(e) => handleCreateNewTag(e,"u")}
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
