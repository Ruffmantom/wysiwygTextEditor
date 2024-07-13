import { createNewParagraph, setCursorInsideNewElement } from "./helpers";

// need to handle backspace when there is no content inside the content editable
export const handleBackspace = (editorRef) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;
    let parentElement =
      startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
    // Check if the editor is empty or the current parent element is empty
    if (
      editorRef.current.innerHTML.trim() === "" ||
      parentElement.innerHTML.trim() === ""
    ) {
      // Create a new paragraph and place the cursor inside it
      const newParagraph = createNewParagraph();
      setCursorInsideNewElement(editorRef, newParagraph);
    }
  
};
