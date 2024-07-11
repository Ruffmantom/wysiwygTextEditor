import React, { useRef, useState, useEffect } from "react";
import ToolBar from "./ToolBar";
import AddCode from "./AddCode";
import AddLink from "./AddLink";
import { richTextEditorStore } from "../../../stores/richTextEditorStore";

export default function RichTextEditor() {
  const [inputBuffer, setInputBuffer] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [lastKeyWasEnter, setLastKeyWasEnter] = useState(false);
  const editorRef = useRef(null);
  const timeoutRef = useRef(null); // Use ref to store the timeout ID
  const createId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let id = ""
    for (var i = 0; i <= 7; i++) {
      id += chars[Math.floor(Math.random() * chars.length)]
    }
    return id
  }

  // state
  const {
    codeModalOpen,
    linkModalOpen,
    setRichTextEditorContent,
    setLinkModal,
    setCurrentSelectPosition,
    currentSelectPosition,
    currentSelectStartPosition,
    currentSelectEndPosition,
    setCurrentStartAndEndPosition,
  } = richTextEditorStore();

  // util functions
  // create a new paragraph element
  const createNewParagraph = () => {
    const newParagraph = document.createElement("p");
    newParagraph.classList.add("align_left");
    newParagraph.dataset.id = createId();
    newParagraph.innerHTML = "<br>";
    return newParagraph;
  };
  // create a link element
  const createLinkElement = (linkData) => {
    const linkElement = document.createElement("a");
    linkElement.href = linkData.href;
    linkElement.textContent = linkData.label;
    linkElement.classList.add("formatted_link");
    linkElement.dataset.id = createId();
    linkElement.target = "_blank";

    return linkElement
  }

  const createParagraphAndSetCursor = () => {
    const newParagraph = createNewParagraph()
    editorRef.current.appendChild(newParagraph);

    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.setStart(newParagraph, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    // Ensure focus returns to the editor
    editorRef.current.focus();
  }

  // handle functions
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnterKey(e);
    } else {
      handlePressEscape(e)
      handleNumberListTrigger(e);
      handleUnorderedListTrigger(e);
      handleBackspace(e);
      setLastKeyWasEnter(false); // Reset the Enter flag for other keys
    }
    // save to state with every key down
    setRichTextEditorContent(editorRef.current.innerHTML)
  };

  useEffect(() => {
    // Add focus event listener to the editor
    const handleFocus = () => {
      if (editorRef.current.innerHTML.trim() === "") {
        console.log("Editor is empty on focus, adding a new paragraph");
        const newParagraph = createNewParagraph()
        editorRef.current.appendChild(newParagraph);

        const selection = window.getSelection();
        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Ensure focus returns to the editor
        editorRef.current.focus();
      }
    };

    const editor = editorRef.current;
    editor.addEventListener('focus', handleFocus);

    return () => {
      editor.removeEventListener('focus', handleFocus);
    };
  }, []);


  // need to handle backspace when there is no content inside the content editable
  const handleBackspace = (e) => {
    if (e.key === "Backspace") {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;
      let parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;

      // Check if the editor is empty or the current parent element is empty
      if (editorRef.current.innerHTML.trim() === "" || parentElement.innerHTML.trim() === "") {
        e.preventDefault();
        console.log('About to add a new paragraph');

        // Create a new paragraph and place the cursor inside it
        const newParagraph = createNewParagraph()
        editorRef.current.appendChild(newParagraph);

        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Ensure focus returns to the editor
        editorRef.current.focus();
      }
    }
  }

  const handleNumberListTrigger = (e) => {
    // console.log("handle Number List Trigger Hit!")
    const currentInput = inputBuffer + e.key;
    // console.log(currentInput)
    // includes works faster every time but could cause problems later down the road
    if (currentInput.includes('1.')) {
      e.preventDefault();
      triggerNumberList();
    } else {
      setInputBuffer(currentInput);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear buffer after a timeout to avoid infinite accumulation of input
    timeoutRef.current = setTimeout(() => {
      // console.log("Clear buffer");
      setInputBuffer('');
    }, 500);
  };

  const handleAddDivider = () => {
    console.log('hit add divider')
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;
    // create a new element
    if (selection && selection.rangeCount > 0) {
      // Find the paragraph or text node where the "1. " was typed
      let parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;

      // append divider below current position
      let divider = document.createElement('hr')
      divider.classList.add("formatted_divider")
      // Insert the ordered list before the current parent element
      parentElement.parentNode.insertBefore(divider, parentElement.nextSibling);
      // add new paragraph and set cursor
      // Create a new paragraph and place the cursor inside it
      createParagraphAndSetCursor()
    }
  }

  const handleUnorderedListTrigger = (e) => {
    // console.log("handle Unordered List Trigger Hit!")
    const currentInput = inputBuffer + e.key;
    // console.log(currentInput)
    // includes works faster every time but could cause problems later down the road
    if (currentInput.startsWith('- ')) {
      e.preventDefault();
      triggerUnOrderedList();
    } else {
      setInputBuffer(currentInput);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear buffer after a timeout to avoid infinite accumulation of input
    timeoutRef.current = setTimeout(() => {
      // console.log("Clear buffer");
      setInputBuffer('');
    }, 500);
  };

  const triggerNumberList = () => {
    console.log("triggerNumberList Hit!")
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;

    // Find the paragraph or text node where the "1. " was typed
    let parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
    console.log("Inside the triggerNumberList: ", parentElement)


    // Create a new ordered list
    const ol = document.createElement('ol');
    ol.classList.add('formatted_ol');
    const li = document.createElement('li');
    li.classList.add('formatted_li');
    li.innerHTML = '<br>'; // Add a placeholder for the list item
    ol.appendChild(li);

    // Insert the ordered list before the current parent element
    parentElement.parentNode.insertBefore(ol, parentElement.nextSibling);
    // after inserting the sibling
    // Remove the "1. " parent
    // console.log(parentElement.nodeName)
    if (parentElement.nodeName === "P" && parentElement.textContent.includes("1")) {
      parentElement.remove()
    }

    // Move the caret to the new list item
    const newRange = document.createRange();
    newRange.setStart(li, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    // Remove the parent element if it's now empty
    if (parentElement.textContent.trim() === '') {
      parentElement.parentNode.removeChild(parentElement);
    }

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  const triggerUnOrderedList = () => {
    console.log("triggerNumberList Hit!")
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;

    // Find the paragraph or text node where the "1. " was typed
    let parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
    console.log("Inside the triggerNumberList: ", parentElement)


    // Create a new ordered list
    const ol = document.createElement('ul');
    ol.classList.add('formatted_ul');
    const li = document.createElement('li');
    li.classList.add('formatted_li');
    li.innerHTML = '<br>'; // Add a placeholder for the list item
    ol.appendChild(li);

    // Insert the ordered list before the current parent element
    parentElement.parentNode.insertBefore(ol, parentElement.nextSibling);
    // after inserting the sibling
    // Remove the "1. " parent
    // console.log(parentElement.nodeName)
    if (parentElement.nodeName === "P" && parentElement.textContent.includes("-")) {
      parentElement.remove()
    }

    // Move the caret to the new list item
    const newRange = document.createRange();
    newRange.setStart(li, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    // Remove the parent element if it's now empty
    if (parentElement.textContent.trim() === '') {
      parentElement.parentNode.removeChild(parentElement);
    }

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  const handlePressEscape = (e) => {
    if (e.key === "Escape") {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;
      // If the selection is not inside a text node, or is at the end of the text node, handle nested elements
      const parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;

      if (parentElement.tagName === "LI") {
        console.log("Hit the escape key inside LI")
        const newParagraph = createNewParagraph()
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
        // Ensure focus returns to the editor
        editorRef.current.focus();
      }
    }
  }


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



      const createNewListItem = (addBreak) => {
        const newListItem = document.createElement("li");
        if (addBreak) newListItem.innerHTML = "<br>"
        newListItem.classList.add('formatted_li')
        return newListItem;
      };

      // Check if cursor is at the start of a node
      if (startNode.nodeType === Node.TEXT_NODE && isCursorAtStart(startNode, startOffset)) {
        console.log("Pressed Enter at start of a node")
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
        console.log("Pressed Enter and about to Split text line")
        const parentElement = startNode.parentNode;
        const textNode = startNode;
        const textContent = textNode.textContent;

        // Split the text node at the caret position
        const beforeText = textContent.slice(0, startOffset);
        const afterText = textContent.slice(startOffset);

        const beforeTextNode = document.createTextNode(beforeText);
        const afterTextNode = document.createTextNode(afterText);
        // const parentElement = beforeTextNode.parentNode;

        // Replace the original text node with the split parts
        textNode.parentNode.insertBefore(beforeTextNode, textNode);
        textNode.parentNode.insertBefore(afterTextNode, textNode);
        textNode.parentNode.removeChild(textNode);
        // check if inside a li
        if (parentElement.tagName === "LI") {
          console.log("splitting text inside a LI")
          console.log(beforeText)
          console.log(afterText)

          // create the new li under parent
          const newListItem = createNewListItem(false);
          newListItem.appendChild(afterTextNode)
          parentElement.parentNode.insertBefore(newListItem, parentElement.nextSibling);

          // Move the caret to the new paragraph
          const newRange = document.createRange();
          newRange.setStart(afterTextNode, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // Create a new paragraph for the content after the caret
          const newParagraph = createNewParagraph();
          newParagraph.appendChild(afterTextNode);

          // Move the rest of the nodes to the new paragraph
          let nextNode = afterTextNode.nextSibling;
          while (nextNode) {
            const currentNode = nextNode;
            nextNode = nextNode.nextSibling;
            newParagraph.appendChild(currentNode);
          }
          // Determine the appropriate insertion point
          // const parentElement = beforeTextNode.parentNode;
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

        }


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
        // Remove parent tag and keep its content
        let tagContent = document.createDocumentFragment();
        while (parentNode.firstChild) {
          tagContent.appendChild(parentNode.firstChild);
        }
        parentNode.replaceWith(tagContent);
      } else {
        // Wrap the selected content with the new tag element
        const newElement = document.createElement(tag);
        newElement.dataset.id = createId();

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
      colorSpan.dataset.id = createId();

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
          newElement.dataset.id = createId();

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
      highlightBkg.dataset.id = createId();

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
          newElement.dataset.id = createId();
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

  const handleTriggerAddLink = () => {

    const selection = window.getSelection();
    console.log("Original Selection: ", selection)
    const range = selection.getRangeAt(0);
    // set modal open
    setLinkModal(true)
    // if there is selected text then send it as the label
    if (selection && selection.rangeCount > 0) {
      // console.log(range)
      let startSelection = range.startOffset
      let endSelection = range.endOffset
      let sel = selection.anchorNode.data.slice(startSelection, endSelection)
      setSelectedText(sel)
    }
    // set location
    setCurrentSelectPosition(selection.anchorNode.parentElement.dataset.id)

    setCurrentStartAndEndPosition({ start: range.startOffset, end: range.endOffset })
  }



  // after submitting the link the focus on the editor goes away
  // we need a way to add the link where the focus was originally before submitting the link
  const createLink = (linkData) => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
    const selection = window.getSelection();
    console.log(linkData);
    console.log(currentSelectPosition);
    console.log(currentSelectStartPosition);
    console.log(currentSelectEndPosition);

    // Find the parent element with the dataset.id
    let foundNode = null;
    editorRef.current.childNodes.forEach(n => {
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
    const linkElement = createLinkElement(linkData)

    // Create a new range
    const newRange = document.createRange();

    try {
      // Ensure the offset is within bounds
      const startOffset = Math.max(0, Math.min(foundNode.textContent.length, parseInt(currentSelectStartPosition)));
      const endOffset = Math.max(0, Math.min(foundNode.textContent.length, parseInt(currentSelectEndPosition)));

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

    // reset state back to default
    setSelectedText('')
    setCurrentSelectPosition('')
    setCurrentStartAndEndPosition({ start: '', end: '' })

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };





  return (
    <div className="rich_text_editor">
      {codeModalOpen ? <AddCode /> : ""}
      {linkModalOpen ? <AddLink selectedText={selectedText} createLink={createLink} /> : ""}
      <ToolBar
        handleTag={handleTag}
        handleAlignFormat={handleAlignFormat}
        handleHeading={handleHeading}
        handleColorText={handleColorText}
        handleHighlightText={handleHighlightText}
        handleAddDivider={handleAddDivider}
        handleTriggerAddLink={handleTriggerAddLink}
      />
      <div
        ref={editorRef}
        className="editable_container"
        contentEditable
        // dangerouslySetInnerHTML={{ __html: content }}
        onKeyDown={handleKeyDown}
      >
      </div>
    </div>
  );
}
