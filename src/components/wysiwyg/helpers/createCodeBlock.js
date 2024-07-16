import { createCodeBlockElement, setCursorAfterElement } from "./helpers";

export const createCodeBlock = (
    editorRef,
    language,
    codeContent
) => {
  const selection = window.getSelection();

  if (!selection.rangeCount) {
    console.error("No selection range found");
    return;
  }

  const range = selection.getRangeAt(0);
  const startContainer = range.startContainer;
  const endContainer = range.endContainer;

  // Check if the selection is within the editor
  if (!editorRef.current.contains(startContainer) || !editorRef.current.contains(endContainer)) {
    console.error("Selection is outside the editor");
    return;
  }

  // Create the code block element
  const codeBlockElement = createCodeBlockElement(language, codeContent);
  console.log("Created Code Block: ", codeBlockElement);

  try {
    // Delete the selected content and insert the code block element
    range.deleteContents();
    range.insertNode(codeBlockElement);

    // Ensure the cursor is placed after the inserted code block
    setCursorAfterElement(codeBlockElement);
  } catch (error) {
    console.error("Error manipulating range:", error);
  }
};