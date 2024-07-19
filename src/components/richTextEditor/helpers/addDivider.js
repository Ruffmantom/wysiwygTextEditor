import { createParagraphAndSetCursor } from "./helpers";

export const handleAddDivider = (editorRef) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;
    // create a new element
    if (selection && selection.rangeCount > 0) {
      // Find the paragraph or text node where the "1. " was typed
      let parentElement =
        startNode.nodeType === Node.TEXT_NODE
          ? startNode.parentNode
          : startNode;

      // append divider below current position
      let divider = document.createElement("hr");
      divider.classList.add("formatted_divider");
      // Insert the ordered list before the current parent element
      parentElement.parentNode.insertBefore(divider, parentElement.nextSibling);
      // add new paragraph and set cursor
      // Create a new paragraph and place the cursor inside it
      createParagraphAndSetCursor(editorRef);
    }
  };