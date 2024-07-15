import { createId, createNewParagraph } from "./helpers";

export const handleEnterKey = (e,editorRef) => {
/*
What actions are possible when the enter key is pressed
- create new line
-- when a new line is created or split from an existing line add a new data-id attribute
- create new li item
-- add new data-id attribute
- push content down
-- no action needed
- New line in code block
-- stay inside code block
*/

    // if (e.key === "Enter") {
    //   e.preventDefault();

    //   const selection = window.getSelection();
    //   const range = selection.getRangeAt(0);
    //   const startNode = range.startContainer;
    //   const startOffset = range.startOffset;

    //   const isCursorAtEnd = (node, offset) => {
    //     if (node.nodeType === Node.TEXT_NODE) {
    //       return offset === node.textContent.length;
    //     } else {
    //       return offset === node.childNodes.length;
    //     }
    //   };

    //   const isCursorAtStart = (node, offset) => {
    //     return offset === 0;
    //   };

    //   const createNewListItem = (addBreak) => {
    //     const newListItem = document.createElement("li");
    //     newListItem.dataset.id = createId();
    //     if (addBreak) newListItem.innerHTML = "<br>";
    //     newListItem.classList.add("formatted_li");
    //     return newListItem;
    //   };

    //   // Check if cursor is at the start of a node
    //   if (
    //     startNode.nodeType === Node.TEXT_NODE &&
    //     isCursorAtStart(startNode, startOffset)
    //   ) {
    //     console.log("Pressed Enter at start of a node");
    //     const parentElement = startNode.parentNode;
    //     const newParagraph = createNewParagraph();
    //     parentElement.parentNode.insertBefore(newParagraph, parentElement);

    //     // Move the caret to the new paragraph
    //     const newRange = document.createRange();
    //     newRange.setStart(newParagraph, 0);
    //     newRange.collapse(true);
    //     selection.removeAllRanges();
    //     selection.addRange(newRange);
    //   } else if (
    //     startNode.nodeType === Node.TEXT_NODE &&
    //     !isCursorAtEnd(startNode, startOffset)
    //   ) {
    //     console.log("Pressed Enter and about to Split text line");
    //     const parentElement = startNode.parentNode;
    //     const textNode = startNode;
    //     const textContent = textNode.textContent;

    //     // Split the text node at the caret position
    //     const beforeText = textContent.slice(0, startOffset);
    //     const afterText = textContent.slice(startOffset);

    //     const beforeTextNode = document.createTextNode(beforeText);
    //     const afterTextNode = document.createTextNode(afterText);
    //     // const parentElement = beforeTextNode.parentNode;

    //     // Replace the original text node with the split parts
    //     textNode.parentNode.insertBefore(beforeTextNode, textNode);
    //     textNode.parentNode.insertBefore(afterTextNode, textNode);
    //     textNode.parentNode.removeChild(textNode);
    //     // check if inside a li
    //     if (parentElement.tagName === "LI") {
    //       console.log("splitting text inside a LI");
    //       console.log(beforeText);
    //       console.log(afterText);

    //       // create the new li under parent
    //       const newListItem = createNewListItem(false);
    //       newListItem.appendChild(afterTextNode);
    //       parentElement.parentNode.insertBefore(
    //         newListItem,
    //         parentElement.nextSibling
    //       );

    //       // Move the caret to the new paragraph
    //       const newRange = document.createRange();
    //       newRange.setStart(afterTextNode, 0);
    //       newRange.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     } else {
    //       // Create a new paragraph for the content after the caret
    //       const newParagraph = createNewParagraph();
    //       newParagraph.appendChild(afterTextNode);

    //       // Move the rest of the nodes to the new paragraph
    //       let nextNode = afterTextNode.nextSibling;
    //       while (nextNode) {
    //         const currentNode = nextNode;
    //         nextNode = nextNode.nextSibling;
    //         newParagraph.appendChild(currentNode);
    //       }
    //       // Determine the appropriate insertion point
    //       // const parentElement = beforeTextNode.parentNode;
    //       const grandParentElement = parentElement.parentNode;

    //       if (parentElement === editorRef.current) {
    //         editorRef.current.insertBefore(
    //           newParagraph,
    //           beforeTextNode.nextSibling
    //         );
    //       } else if (grandParentElement === editorRef.current) {
    //         grandParentElement.insertBefore(
    //           newParagraph,
    //           parentElement.nextSibling
    //         );
    //       } else {
    //         editorRef.current.appendChild(newParagraph);
    //       }

    //       // Move the caret to the new paragraph
    //       const newRange = document.createRange();
    //       newRange.setStart(afterTextNode, 0);
    //       newRange.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     }
    //   } else {
    //     // If the selection is not inside a text node, or is at the end of the text node, handle nested elements
    //     const parentElement =
    //       startNode.nodeType === Node.TEXT_NODE
    //         ? startNode.parentNode
    //         : startNode;
    //     if (parentElement.tagName === "LI") {
    //       // Handle Enter key within a list item
    //       const newListItem = createNewListItem();
    //       parentElement.parentNode.insertBefore(
    //         newListItem,
    //         parentElement.nextSibling
    //       );

    //       const newRange = document.createRange();
    //       newRange.setStart(newListItem, 0);
    //       newRange.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     } else if (parentElement.tagName === "BLOCKQUOTE") {
    //       // Handle Enter key within a blockquote
    //       const newParagraph = createNewParagraph();
    //       parentElement.parentNode.insertBefore(
    //         newParagraph,
    //         parentElement.nextSibling
    //       );

    //       const newRange = document.createRange();
    //       newRange.setStart(newParagraph, 0);
    //       newRange.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     } else {
    //       // Handle Enter key for regular paragraphs and other elements
    //       const newParagraph = createNewParagraph();

    //       if (startNode.parentNode === editorRef.current) {
    //         editorRef.current.insertBefore(newParagraph, startNode.nextSibling);
    //       } else {
    //         editorRef.current.appendChild(newParagraph);
    //       }

    //       const newRange = document.createRange();
    //       newRange.setStart(newParagraph, 0);
    //       newRange.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     }
    //   }

    //   // Ensure focus returns to the editor
    //   editorRef.current.focus();
    // }
  };