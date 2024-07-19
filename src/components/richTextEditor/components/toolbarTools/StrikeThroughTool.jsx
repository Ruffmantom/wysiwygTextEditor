import React from 'react'
import { ReactComponent as StrikeIcon } from "../../../../assets/icons/strike.svg";
import { isMac } from '../../helpers/helpers';

export default function StrikeThroughTool() {
    const handleCreateNewTag = (e,tag) => {
        e.preventDefault()
        console.log(`Create Tag: ${tag}`)
    }

    return (
        <button
            className="icon_button tool_bar"
            onClick={(e) => handleCreateNewTag(e,"s")}
        >
            <StrikeIcon />
            <span className="wysiwyg_tool_tip">
                Strike Through{" "}
                <span className="key_command">
                    {isMac ? "cmd + shift + s" : "ctrl + shift + s"}
                </span>
            </span>
        </button>
    )
}
