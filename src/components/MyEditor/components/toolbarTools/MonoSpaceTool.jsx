import React, { useState } from 'react'
import { ReactComponent as MonoIcon } from "../../../../assets/icons/monotype.svg";


export default function MonoSpaceTool({ handleEditorChange }) {

    function toggleCodeFormat(e) {
        e.preventDefault();
        const selection = window.getSelection();
    
        if (selection.rangeCount > 0 && !selection.isCollapsed) {
            // Get the selected content as HTML
            const range = selection.getRangeAt(0);
            const selectedContent = range.cloneContents();
            const div = document.createElement('div');
            div.appendChild(selectedContent);
            const html = div.innerHTML;
    
            // Wrap the selected HTML with <code> tags and add a non-breaking space
            const codeHTML = `<code>${html}</code>\u00A0`;
    
            // Use execCommand to insert the HTML, which the browser will track in the undo stack
            document.execCommand('insertHTML', false, codeHTML);
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
