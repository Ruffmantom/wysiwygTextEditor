import React from 'react'
import { ReactComponent as ItalicIcon } from "../../../../assets/icons/italic.svg";
import { isMac } from '../../helpers/helpers';

export default function ItalicTool({handleEditorChange}) {

    const handleItalicText = (e) => {
        e.preventDefault();
        document.execCommand("italic", false, null); // Basic italic functionality
        handleEditorChange(); // Save the state change
      };

    return (
        <button
        className={`icon_button tool_bar`}
            onClick={e => handleItalicText(e)}
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
