import React from 'react'
import { ReactComponent as ClearFormatIcon } from "../../../../assets/icons/clearFormat.svg";

export default function ClearFormatTool({handleEditorChange}) {

    function removeCustomTags() {
        const selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parentElement = range.startContainer.parentNode;
    
            // Check if the selected text is inside a <code> tag
            if (parentElement.tagName === "code" || parentElement.tagName === "pre") {
                // Replace the <code> tag with its inner content
                const textNode = document.createTextNode(parentElement.textContent);
                parentElement.parentNode.replaceChild(textNode, parentElement);
                
                // Clear the selection and re-select the new text node
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(textNode);
                selection.addRange(newRange);
            }
        }
    }


    const handleClearFormat = (e) => {
        e.preventDefault();
        document.execCommand("removeFormat", false, null);
        removeCustomTags()
        handleEditorChange(); // Save the state change
      };
      
    return (
        <button
            className="icon_button tool_bar"
            onClick={e => handleClearFormat(e)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ClearFormatIcon />
            <span className="wysiwyg_tool_tip">
                Clear Format
            </span>
        </button>
    )
}
