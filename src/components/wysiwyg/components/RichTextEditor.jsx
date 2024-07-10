import React, { useRef, useState } from "react";
import ToolBar from "./ToolBar";

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("<p><br></p>");

  const handleKeyDown = (e) => {
    // console.log(e.key);
    handleEnterKey(e);
    // handleExitCurrentElement(e);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
  
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;
      const startOffset = range.startOffset;
  
      const isCursorAtEnd = (node, offset) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return offset === node.textContent.length;
        } else {
          return offset === node.childNodes.length;
        }
      };
  
      const isCursorAtStart = (node, offset) => {
        return offset === 0;
      };
  
      const createNewParagraph = () => {
        const newParagraph = document.createElement("p");
        newParagraph.classList.add("align_left");
        newParagraph.innerHTML = "<br>";
        return newParagraph;
      };
  
      const createNewListItem = () => {
        const newListItem = document.createElement("li");
        newListItem.innerHTML = "<br>";
        return newListItem;
      };
  
      // Check if cursor is at the start of a node
      if (startNode.nodeType === Node.TEXT_NODE && isCursorAtStart(startNode, startOffset)) {
        const parentElement = startNode.parentNode;
        const newParagraph = createNewParagraph();
        parentElement.parentNode.insertBefore(newParagraph, parentElement);
  
        // Move the caret to the new paragraph
        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else if (startNode.nodeType === Node.TEXT_NODE && !isCursorAtEnd(startNode, startOffset)) {
        const textNode = startNode;
        const textContent = textNode.textContent;
  
        // Split the text node at the caret position
        const beforeText = textContent.slice(0, startOffset);
        const afterText = textContent.slice(startOffset);
  
        const beforeTextNode = document.createTextNode(beforeText);
        const afterTextNode = document.createTextNode(afterText);
  
        // Replace the original text node with the split parts
        textNode.parentNode.insertBefore(beforeTextNode, textNode);
        textNode.parentNode.insertBefore(afterTextNode, textNode);
        textNode.parentNode.removeChild(textNode);
  
        // Create a new paragraph for the content after the caret
        const newParagraph = document.createElement("p");
        newParagraph.classList.add("align_left");
        newParagraph.appendChild(afterTextNode);
  
        // Move the rest of the nodes to the new paragraph
        let nextNode = afterTextNode.nextSibling;
        while (nextNode) {
          const currentNode = nextNode;
          nextNode = nextNode.nextSibling;
          newParagraph.appendChild(currentNode);
        }
  
        // Determine the appropriate insertion point
        const parentElement = beforeTextNode.parentNode;
        const grandParentElement = parentElement.parentNode;
  
        if (parentElement === editorRef.current) {
          editorRef.current.insertBefore(newParagraph, beforeTextNode.nextSibling);
        } else if (grandParentElement === editorRef.current) {
          grandParentElement.insertBefore(newParagraph, parentElement.nextSibling);
        } else {
          editorRef.current.appendChild(newParagraph);
        }
  
        // Move the caret to the new paragraph
        const newRange = document.createRange();
        newRange.setStart(afterTextNode, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        // If the selection is not inside a text node, or is at the end of the text node, handle nested elements
        const parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
  
        if (parentElement.tagName === "LI") {
          // Handle Enter key within a list item
          const newListItem = createNewListItem();
          parentElement.parentNode.insertBefore(newListItem, parentElement.nextSibling);
  
          const newRange = document.createRange();
          newRange.setStart(newListItem, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else if (parentElement.tagName === "BLOCKQUOTE") {
          // Handle Enter key within a blockquote
          const newParagraph = createNewParagraph();
          parentElement.parentNode.insertBefore(newParagraph, parentElement.nextSibling);
  
          const newRange = document.createRange();
          newRange.setStart(newParagraph, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // Handle Enter key for regular paragraphs and other elements
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
      }
  
      // Ensure focus returns to the editor
      editorRef.current.focus();
    }
  };

  // formatting functions
  const handleTag = (tag) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    if (selection && selection.anchorNode) {
      let parentNode = selection.anchorNode.parentNode;
      let parentName = parentNode.tagName.toLowerCase();
      const range = selection.getRangeAt(0);
      if (parentName === tag) {
        // console.log(`True: ${parentName} === ${tag}`)
        // remove parent tag
        let tagContent = parentNode.textContent;
        // console.log(tagContent)
        parentNode.replaceWith(tagContent);
      } else {
        // console.log(`False: ${parentName} !== ${tag}`)
        // continue with format
        // Wrap the selected content with the new tag element
        const newElement = document.createElement(tag);
        newElement.appendChild(range.extractContents());
        range.insertNode(newElement);
      }
    }

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  const handleAlignFormat = (e, alignment) => {
    e.preventDefault();
    console.log("hit handleAlignFormat");
    editorRef.current.focus();
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const newClassName = `align_${alignment}`;
      const defaultClassName = "align_left";

      const applyAlignmentClass = (element) => {
        if (element.nodeType === Node.TEXT_NODE) {
          element = element.parentNode;
        }
        if (element.classList.contains(newClassName)) {
          element.classList.replace(newClassName, defaultClassName);
        } else {
          element.classList.remove(
            ...Array.from(element.classList).filter((className) =>
              className.startsWith("align_")
            )
          );
          element.classList.add(newClassName);
        }
      };

      if (range.startContainer === range.endContainer) {
        // Single line selection
        let startNode = range.startContainer;
        if (startNode.nodeType === Node.TEXT_NODE) {
          startNode = startNode.parentNode;
        }
        applyAlignmentClass(startNode);
      } else {
        // Multi-line selection
        const selectedElements = [];
        const treeWalker = document.createTreeWalker(
          range.commonAncestorContainer,
          NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: (node) => {
              if (range.intersectsNode(node)) {
                return NodeFilter.FILTER_ACCEPT;
              }
              return NodeFilter.FILTER_REJECT;
            },
          }
        );

        while (treeWalker.nextNode()) {
          selectedElements.push(treeWalker.currentNode);
        }

        selectedElements.forEach((element) => {
          applyAlignmentClass(element);
        });
      }

      console.log("After applying classes");

      editorRef.current.focus(); // Focus once after modifications
    }
  };

  const handleColorText = (color) => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let chosenColor = color.replace("#", "").toLowerCase();

    if (!selection || selection.isCollapsed) {
      // Create a new colored span element at the current cursor position
      const colorSpan = document.createElement("span");
      // Add class
      colorSpan.classList.add(`text_${chosenColor}`);

      // Create an empty text node inside the colorSpan
      const textNode = document.createTextNode("\u200B"); // Zero-width space character

      colorSpan.appendChild(textNode);
      range.insertNode(colorSpan);

      // Adjust the range to place the cursor inside the new colorSpan
      const newRange = document.createRange();
      newRange.setStart(textNode, 1);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // check if selected text is already colored. else color it
      let parentNode = selection.anchorNode.parentNode;
      const range = selection.getRangeAt(0);
      let parentClassName = parentNode.classList.value;
      let tagClass = `text_${chosenColor}`;

      if (parentClassName === tagClass) {
        console.log(`True: ${parentClassName} === ${tagClass}`);
        // remove parent tag
        let tagContent = parentNode.textContent;
        console.log(tagContent);
        parentNode.replaceWith(tagContent);
      } else {
        console.log(`False: ${parentClassName} !== ${tagClass}`);
        // continue with format
        // check if the text already is colored

        console.log(
          "This text is already colored?: " + parentClassName.includes("text_")
        );
        if (parentClassName.includes("text_")) {
          // replace existing classname with new one
          parentNode.classList.replace(parentClassName, tagClass);
        } else {
          // Wrap the selected content with the new tag element
          // Create a new colored span element at the current cursor position
          const newElement = document.createElement("span");
          // Add class
          newElement.classList.add(tagClass);
          newElement.appendChild(range.extractContents());
          range.insertNode(newElement);
        }
      }
    }
  };

  const handleHighlightText = (color) => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let chosenColor = color.replace("#", "").toLowerCase();
    let parentNode = selection.anchorNode.parentNode;
    // if color is none auto remove bkg span
    if (color === "none") {
      let tagContent = parentNode.textContent;
      parentNode.replaceWith(tagContent);
      return;
    }
    if (!selection || selection.isCollapsed) {
      // Create a new colored span element at the current cursor position
      const highlightBkg = document.createElement("span");
      // Add class
      highlightBkg.classList.add(`highlight_${chosenColor}`);

      // Create an empty text node inside the highlightBkg
      const textNode = document.createTextNode("\u200B"); // Zero-width space character

      highlightBkg.appendChild(textNode);
      range.insertNode(highlightBkg);

      // Adjust the range to place the cursor inside the new highlightBkg
      const newRange = document.createRange();
      newRange.setStart(textNode, 1);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // check if selected text is already colored. else color it
      let parentClassName = parentNode.classList.value;
      let tagClass = `highlight_${chosenColor}`;

      if (parentClassName === tagClass) {
        console.log(`True: ${parentClassName} === ${tagClass}`);
        // remove parent tag
        let tagContent = parentNode.textContent;
        console.log(tagContent);
        parentNode.replaceWith(tagContent);
      } else {
        console.log(`False: ${parentClassName} !== ${tagClass}`);
        // continue with format
        // check if the text already is colored

        console.log(
          "This text is already colored?: " +
            parentClassName.includes("highlight_")
        );
        if (parentClassName.includes("highlight_")) {
          // replace existing classname with new one
          parentNode.classList.replace(parentClassName, tagClass);
        } else {
          // Wrap the selected content with the new tag element
          // Create a new colored span element at the current cursor position
          const newElement = document.createElement("span");
          // Add class
          newElement.classList.add(tagClass);
          newElement.appendChild(range.extractContents());
          range.insertNode(newElement);
        }
      }
    }
  };

  const handleHeading = (level) => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (!selection || selection.isCollapsed) {
      // Create a new heading element at the current cursor position
      const heading = document.createElement(level);
      heading.innerHTML = "<br>"; // Ensure there's a line break inside the new heading
      range.deleteContents(); // Clear any existing content in the range
      range.insertNode(heading);

      // Adjust the range to place the cursor inside the new heading
      const newRange = document.createRange();
      newRange.setStart(heading.firstChild, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Check if the current selection is within a heading element
      let currentHeading = null;
      let parentNode = range.startContainer.parentNode;
      while (parentNode) {
        if (parentNode.tagName && parentNode.tagName.match(/^H[1-3]$/)) {
          currentHeading = parentNode;
          break;
        }
        parentNode = parentNode.parentNode;
      }

      if (currentHeading) {
        // Replace the current heading with the new heading level
        const newHeading = document.createElement(level);
        newHeading.innerHTML = currentHeading.innerHTML;
        currentHeading.parentNode.replaceChild(newHeading, currentHeading);
      } else {
        // No heading found, create a new heading element
        const heading = document.createElement(level);
        heading.appendChild(range.extractContents());
        range.insertNode(heading);
      }
    }

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  return (
    <div className="rich_text_editor">
      <ToolBar
        handleTag={handleTag}
        handleAlignFormat={handleAlignFormat}
        handleHeading={handleHeading}
        handleColorText={handleColorText}
        handleHighlightText={handleHighlightText}
      />
      <div
        ref={editorRef}
        className="editable_container"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
