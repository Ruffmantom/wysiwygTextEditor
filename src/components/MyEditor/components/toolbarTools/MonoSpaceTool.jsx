import React, { useState } from 'react'
import { ReactComponent as MonoIcon } from "../../../../assets/icons/monotype.svg";


export default function MonoSpaceTool({ handleEditorChange }) {
    // ${isActive('MONOSPACE', 'inline') ? 'active' : ""}
    const [currentlyActive, setCurrentlyActive] = useState(false)


    function toggleCodeFormat(e) {
        e.preventDefault();
        const selection = window.getSelection();

        if (selection.rangeCount > 0 && !selection.isCollapsed) {
            const range = selection.getRangeAt(0);
    
            // Create a <code> element and wrap the selected text with it
            const codeElement = document.createElement("code");
            range.surroundContents(codeElement);
    
            // Create a new text node or <span> after the <code> element
            const spaceNode = document.createTextNode(" "); // Plain text node as a space
            codeElement.parentNode.appendChild(spaceNode);
    
            // Move the caret to the newly created text node
            range.setStart(spaceNode, 1);
            range.collapse(true);
    
            // Clear the current selection and apply the new range with the updated caret position
            selection.removeAllRanges();
            selection.addRange(range);
        }

        handleEditorChange(); // Save the state change
    }


    return (
        <button
            className={`icon_button tool_bar `}
            onClick={(e) => toggleCodeFormat(e)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <MonoIcon />
            <span className="wysiwyg_tool_tip">
                Monospace{" "}
                <span className="key_command">alt + m</span>
            </span>
        </button>
    )
}
