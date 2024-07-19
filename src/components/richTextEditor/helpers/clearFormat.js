export const clearFormat = () => {
    const selection = window.getSelection();

    // Ensure there is a valid selection
    if (!selection || selection.rangeCount === 0) {
        return;
    }

    const range = selection.getRangeAt(0);
    const rangeStart = range.startOffset;
    const rangeEnd = range.endOffset;
    const parentElement = selection.anchorNode.parentElement;
    const tagsToRemove = ['B', 'I', 'H1', 'H2', 'H3', 'H4', 'S', 'U'];

    // Check if the selection is collapsed (start and end are the same)
    if (range.collapsed) {
        // If the cursor is within one of the specified tags, remove the tag
        if (tagsToRemove.includes(parentElement.nodeName)) {
            const unwrappedContent = document.createTextNode(parentElement.textContent);
            parentElement.parentNode.replaceChild(unwrappedContent, parentElement);
        }
    } else {
        // If text is selected, remove the specified tags from the selected range
        const fragment = range.cloneContents();
        const div = document.createElement('div');
        div.appendChild(fragment);
        
        // Use a tree walker to traverse and replace tags
        const walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null, false);
        let node;
        
        while (node = walker.nextNode()) {
            if (tagsToRemove.includes(node.nodeName)) {
                const unwrappedContent = document.createTextNode(node.textContent);
                node.parentNode.replaceChild(unwrappedContent, node);
            }
        }
        
        // Replace the selected content with the unwrapped content
        range.deleteContents();
        range.insertNode(document.createTextNode(div.textContent));
        selection.removeAllRanges();
    }
};
