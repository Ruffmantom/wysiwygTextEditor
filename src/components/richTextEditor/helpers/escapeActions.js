import { createNewParagraph } from "./helpers";

export const handlePressEscape = (editorRef) => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;
      // If the selection is not inside a text node, or is at the end of the text node, handle nested elements
      const parentElement =
        startNode.nodeType === Node.TEXT_NODE
          ? startNode.parentNode
          : startNode;

      if (parentElement.tagName === "LI") {
        console.log("Hit the escape key inside LI");
        const newParagraph = createNewParagraph();
        if (startNode.parentNode === editorRef.current) {
          editorRef.current.insertBefore(newParagraph, startNode.nextSibling);
        } else {
          editorRef.current.appendChild(newParagraph);
        }

        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
  };