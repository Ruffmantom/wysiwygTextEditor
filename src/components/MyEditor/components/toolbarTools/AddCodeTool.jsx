import React from 'react'
import { ReactComponent as CodeIcon } from "../../../../assets/icons/code.svg";

export default function AddCodeTool({ handleEditorChange }) {


    const handleTriggerAddCode = (e) => {
        e.preventDefault()
        // show the modal
    }


    function insertCodeBlock(e) {
        e.preventDefault();
        const selection = window.getSelection();
    
        // Define the HTML for the code block, including a zero-width space
        const codeBlockHTML = '<pre><code id="newCodeBlock" class="code_block_preview">\u200B</code></pre><br>';
    
        // Use execCommand to insert the code block at the cursor position
        document.execCommand('insertHTML', false, codeBlockHTML);
    
        // Get the newly inserted code block by its ID
        const codeBlock = document.getElementById('newCodeBlock');
    
        if (codeBlock) {
            // Remove the ID to prevent duplicates in the document
            codeBlock.removeAttribute('id');
    
            // Create a new range and set the caret inside the code block
            const range = document.createRange();
            range.selectNodeContents(codeBlock);
            range.collapse(true); // Place the caret at the start
    
            // Clear any existing selections and set the new range
            selection.removeAllRanges();
            selection.addRange(range);
        }
    
        handleEditorChange(); // Save the state change
    }
    


    return (
        <button
            className="icon_button tool_bar heading"
            onClick={e => insertCodeBlock(e)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <CodeIcon />
            <span className="wysiwyg_tool_tip">Code Block</span>
        </button>
    )
}
