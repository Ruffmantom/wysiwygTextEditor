import React from 'react'
import {ReactComponent as UndoIcon} from '../../../../assets/icons/undo.svg'
import { isMac } from '../../helpers/helpers';

export default function UndoTool({handleEditorChange}) {

    const handleUndo = (e) => {
        e.preventDefault();
        document.execCommand("undo", false, null); // Basic bold functionality
        handleEditorChange(); // Save the state change
      };

  return (
    <button
    className={`icon_button tool_bar `}
    onMouseDown={(e) => e.preventDefault()}
    onClick={e=>handleUndo(e)}
>
    <UndoIcon />
    <span className="wysiwyg_tool_tip">
        Undo{" "}
        <span className="key_command">{isMac ? "cmd + z" : "ctrl + z"}</span>
    </span>
</button>
  )
}
