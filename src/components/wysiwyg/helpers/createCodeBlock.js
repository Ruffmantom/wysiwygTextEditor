import { createCodeBlockElement, setCursorAfterElement } from "./helpers";

export const createCodeBlock = (
    editorRef,
    currentSelectPosition,
    language,
    codeContent,
    currentSelectStartPosition,
    currentSelectEndPosition
) => {
  // Find the parent element with the dataset.id
  let foundNode = null;
  editorRef.current.childNodes.forEach((n) => {
    if (n.dataset && n.dataset.id === currentSelectPosition) {
      foundNode = n;
    }
  });

  if (!foundNode) {
    console.error("Node with dataset.id not found");
    return;
  }

  // Create the code block element
  const codeBlockElement = createCodeBlockElement(language, codeContent);
  console.log("Created Code Block: ", codeBlockElement)
  // Create a new range
  const newRange = document.createRange();

  try {
    // Ensure the offset is within bounds
    const startOffset = Math.max(
      0,
      Math.min(
        foundNode.textContent.length,
        parseInt(currentSelectStartPosition)
      )
    );

    const endOffset = Math.max(
      0,
      Math.min(foundNode.textContent.length, parseInt(currentSelectEndPosition))
    );
    console.log("Found Node: ",foundNode)
    newRange.setStart(foundNode, startOffset);
    newRange.setEnd(foundNode, endOffset);

    // Remove the selected content and insert the code block element
    newRange.deleteContents();
    newRange.insertNode(codeBlockElement);

    // Ensure the cursor is placed after the inserted code block
    setCursorAfterElement(codeBlockElement);
  } catch (error) {
    console.error("Error setting range:", error);
  }
};
