import { createLinkElement } from "./helpers";

// after submitting the link the focus on the editor goes away
// we need a way to add the link where the focus was originally before submitting the link
export const createLink = (
  linkData,
  editorRef,
  currentSelectPosition,
  currentSelectStartPosition,
  currentSelectEndPosition
) => {
  const selection = window.getSelection();
  console.log(linkData);
  console.log(currentSelectPosition);
  console.log(currentSelectStartPosition);
  console.log(currentSelectEndPosition);

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

  console.log(foundNode);

  // Create the link element
  const linkElement = createLinkElement(linkData);

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

    newRange.setStart(foundNode.firstChild || foundNode, startOffset);
    newRange.setEnd(foundNode.firstChild || foundNode, endOffset);

    console.log(newRange);

    // Remove the selected content and insert the link element
    newRange.deleteContents();
    newRange.insertNode(linkElement);

    // Ensure the cursor is placed after the inserted link
    const rangeAfterLink = document.createRange();
    rangeAfterLink.setStartAfter(linkElement);
    rangeAfterLink.collapse(true);
    selection.removeAllRanges();
    selection.addRange(rangeAfterLink);
  } catch (error) {
    console.error("Error setting range:", error);
  }
};
