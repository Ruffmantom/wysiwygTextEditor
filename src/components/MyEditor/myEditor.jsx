import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as BoldIcon } from '../../assets/icons/bold.svg';
import "./style.css";
import ToolBar from "./components/ToolBar";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const MyEditor = () => {
  const editorRef = useRef(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [lastSavedState, setLastSavedState] = useState(""); // Track last saved text for comparison
  const typingTimeoutRef = useRef(null);
  const [showPlaceHolder, setShowPlaceholder] = useState(true)

  // toolbar options
  const tools = {
    bold: true,
    italic: true,
    highlight: false,
    color: false,
    headings: false,
    other: {
      underline: false,
      strikeThrough: false,
      removeFormats: false,
    },
    link: false,
    code: false,
    quote: false,
    divider: false,
    orderedList: false,
    unorderedList: false,
    info: false,
    monospace: false,
  }

  const saveEditorState = (changeType, addedContent = "", removedContent = "") => {
    const editor = editorRef.current;
    const textContent = editor.innerText || ""; // Grab text content of the editor
    const selection = window.getSelection();
    const carrotPos = selection.focusOffset; // Current caret position

    const state = {
      _id: uid(),
      textContent,
      offset: carrotPos,
      carrotPos,
      previousCarrotPos: lastSavedState.carrotPos || 0,
      changeType,
      addedContent,
      removedContent,
      timestamp: Date.now(),
      styles: [], // You can populate styles based on selection if needed
    };

    // Push the new state onto the undo stack
    setUndoStack(prevStack => [...prevStack, state]);
    setLastSavedState(state);
    console.log("Last saved item: ", state)
    if (textContent === "") {
      setShowPlaceholder(true)
    } else {
      setShowPlaceholder(false)
    }
  };

  const handleEditorChange = () => {
    const editor = editorRef.current;
    const textContent = editor.innerText || "";

    // Only save if there's a change
    if (textContent !== lastSavedState.textContent) {
      // Use a buffer timeout to delay the state saving
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        saveEditorState("insert", textContent && textContent.replace(lastSavedState.textContent, ""), lastSavedState && lastSavedState.textContent.replace(textContent, ""));
      }, 250);
    }
  };


  const handleItalicText = (e) => {
    e.preventDefault();
    document.execCommand("italic", false, null); // Basic italic functionality
    handleEditorChange(); // Save the state change
  };

  return (
    <div className="editor_main_container">
      <ToolBar options={tools} handleEditorChange={handleEditorChange} />
      <div className="editor_wrapper">
        {showPlaceHolder ? <p className="placeholder">Start Typing here...</p> : ""}
        <div
          className="my_editor_cont"
          ref={editorRef}
          contentEditable="true"
          onInput={handleEditorChange} // Trigger on content change
          onKeyUp={handleEditorChange} // Trigger on key up
          onSelect={handleEditorChange} // Trigger on selection change
        >
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
