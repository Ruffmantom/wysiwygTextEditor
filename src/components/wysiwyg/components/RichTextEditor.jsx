import React, { useRef, useState } from "react";
import ToolBar from "./ToolBar";

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("<p><br></p>");

  const handleKeyDown = (e) => {
    console.log(e.key)
    handleEnterKey(e)
    handleExitCurrentElement(e)
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;

      const newParagraph = document.createElement("p");
      newParagraph.innerHTML = "<br>";

      if (startNode && startNode.parentNode === editorRef.current) {
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

  const handleExitCurrentElement = (e) => {
    if (e.keyCode === 32 && e.target === editorRef.current) {  // Check for spacebar using key code
      if (editorRef.current._lastKey && editorRef.current._lastKey === 32) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Move the cursor outside the current element
        const currentNode = range.endContainer;
        const currentNodeParent = currentNode.parentNode;

        // Check if currentNode is a text node and inside a span element
        if (currentNode.nodeType === Node.TEXT_NODE && currentNodeParent !== editorRef.current) {
          // Create a new range to move the cursor outside the span element
          const newRange = document.createRange();

          // Move the cursor after the current node parent
          newRange.setStartAfter(currentNodeParent);
          newRange.collapse(true);

          // Insert a text node at the new range to start new text content
          const textNode = document.createTextNode('');
          newRange.insertNode(textNode);

          // Adjust the range to place the cursor inside the new text node
          newRange.setStart(textNode, 0);
          newRange.collapse(true);

          // Remove all ranges and add the new one
          selection.removeAllRanges();
          selection.addRange(newRange);

          // Prevent default behavior of adding an additional space
          e.preventDefault();
        }
      }
      editorRef.current._lastKey = 32;  // Store key code for spacebar
    } else if (e.keyCode === 27 && e.target === editorRef.current) {  // Check for Escape key using key code
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Move the cursor outside the current element
      const currentNode = range.endContainer;
      const currentNodeParent = currentNode.parentNode;

      // Check if currentNode is a text node and inside a span element
      if (currentNode.nodeType === Node.TEXT_NODE && currentNodeParent !== editorRef.current) {
        // Create a new range to move the cursor outside the span element
        const newRange = document.createRange();

        // Move the cursor after the current node parent
        newRange.setStartAfter(currentNodeParent);
        newRange.collapse(true);

        // Insert a text node at the new range to start new text content
        const textNode = document.createTextNode('');
        newRange.insertNode(textNode);

        // Adjust the range to place the cursor inside the new text node
        newRange.setStart(textNode, 0);
        newRange.collapse(true);

        // Remove all ranges and add the new one
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Prevent default behavior
        e.preventDefault();
      }
    } else {
      editorRef.current._lastKey = e.keyCode;
    }
  };
// formatting functions
  const handleTag = (tag) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    if (selection && selection.anchorNode) {
      let parentNode = selection.anchorNode.parentNode;
      let parentName = parentNode.tagName.toLowerCase()
      const range = selection.getRangeAt(0);
      if (parentName === tag) {
        // console.log(`True: ${parentName} === ${tag}`)
        // remove parent tag
        let tagContent = parentNode.textContent
        // console.log(tagContent)
        parentNode.replaceWith(tagContent)
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

  const handleColorText = (color) => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let chosenColor = color.replace("#", "").toLowerCase()

    if (!selection || selection.isCollapsed) {
      // Create a new colored span element at the current cursor position
      const colorSpan = document.createElement('span');
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
      let parentClassName = parentNode.classList.value
      let tagClass = `text_${chosenColor}`

      if (parentClassName === tagClass) {
        console.log(`True: ${parentClassName} === ${tagClass}`)
        // remove parent tag
        let tagContent = parentNode.textContent
        console.log(tagContent)
        parentNode.replaceWith(tagContent)

      } else {
        console.log(`False: ${parentClassName} !== ${tagClass}`)
        // continue with format
        // check if the text already is colored

        console.log("This text is already colored?: " + parentClassName.includes('text_'))
        if (parentClassName.includes('text_')) {
          // replace existing classname with new one
          parentNode.classList.replace(parentClassName, tagClass)
        } else {
          // Wrap the selected content with the new tag element
          // Create a new colored span element at the current cursor position
          const newElement = document.createElement('span');
          // Add class
          newElement.classList.add(tagClass);
          newElement.appendChild(range.extractContents());
          range.insertNode(newElement);
        }

      }

    }
  }

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
        handleHeading={handleHeading}
        handleColorText={handleColorText}
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
