import React from 'react'
import { ReactComponent as ItalicIcon } from "../../../../assets/icons/italic.svg";
import { isMac } from '../../helpers/helpers';

export default function ItalicTool() {

    return (
        <button
        className={`icon_button tool_bar`}
            // onClick={e => applyStyle(e, 'ITALIC', 'inline')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ItalicIcon />
            <span className="wysiwyg_tool_tip">
                Italic{" "}
                <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
            </span>
        </button>
    )
}
