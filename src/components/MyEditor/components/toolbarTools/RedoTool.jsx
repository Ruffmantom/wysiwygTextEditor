import React from 'react'
import { ReactComponent as RedoIcon } from '../../../../assets/icons/redo.svg'
import { isMac } from '../../helpers/helpers';

export default function RedoTool({ handleEditorChange }) {

    const handleRedo = (e) => {
        e.preventDefault();
        document.execCommand("redo", false, null); // Basic bold functionality
        handleEditorChange(); // Save the state change
    };

    return (
        <button
            className={`icon_button tool_bar `}
            onMouseDown={(e) => e.preventDefault()}
            onClick={e => handleRedo(e)}
        >
            <RedoIcon />
            <span className="wysiwyg_tool_tip">
                Redo{" "}
                <span className="key_command">{isMac ? "cmd + shift + z" : "ctrl + shift + z"}</span>
            </span>
        </button>
    )
}
