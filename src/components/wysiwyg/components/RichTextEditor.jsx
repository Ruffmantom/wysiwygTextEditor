import React, { useRef, useState } from "react";
import ToolBar from "./ToolBar";

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("<p><br></p>");

  const handleKeyDown = (e) => {
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
  };

  const handleTag = (tag) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
  
    const range = selection.getRangeAt(0);
  
    // Check if the current selection is already inside the passed-in tag
    let isInsideTag = false;
    let commonAncestorContainer = range.commonAncestorContainer;
    while (commonAncestorContainer) {
      if (commonAncestorContainer.tagName && commonAncestorContainer.tagName.toLowerCase() === tag) {
        isInsideTag = true;
        break;
      }
      commonAncestorContainer = commonAncestorContainer.parentNode;
    }
  
    if (isInsideTag) {
      // Unwrap the content from the current tag
      const selectedNodes = getSelectedNodes(range);
      const wrapper = document.createElement('div');
      selectedNodes.forEach(node => wrapper.appendChild(node));
      range.deleteContents();
      range.insertNode(wrapper);
      wrapper.outerHTML = wrapper.innerHTML;
    } else {
      // Wrap the selected content with the new tag element
      const newElement = document.createElement(tag);
      newElement.appendChild(range.extractContents());
      range.insertNode(newElement);
    }
  
    // Ensure focus returns to the editor
    editorRef.current.focus();
  };
  
  const getSelectedNodes = (range) => {
    const selectedNodes = [];
    let node = range.startContainer;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node === range.endContainer) {
          selectedNodes.push(node);
          break;
        }
        selectedNodes.push(node);
        node = node.nextSibling;
      } else if (node.nodeType === Node.TEXT_NODE) {
        const selectedText = range.toString();
        if (selectedText === node.textContent) {
          selectedNodes.push(node);
          break;
        } else {
          const selectedTextIndex = node.textContent.indexOf(selectedText);
          const nextNode = node.splitText(selectedTextIndex);
          selectedNodes.push(node);
          node = nextNode;
        }
      }
    }
    return selectedNodes;
  };
  

  const handleHeading = (level) => {
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
