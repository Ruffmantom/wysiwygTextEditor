import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import ToolBar from "./components/ToolBar";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const MyEditor = ({ 
  placeholder = "Add Content here...", 
  options, 
  handleReturnState = (state) => { console.log("Editor State: ", state) } 
}) => {

  const editorRef = useRef(null);
  const [lastSavedState, setLastSavedState] = useState(""); // Track last saved text for comparison
  const typingTimeoutRef = useRef(null);
  const [showPlaceHolder, setShowPlaceholder] = useState(true)

  // toolbar options
  // this will eventually be used when the editor is in a module
  const toolbarOptions = {
    bold: true,
    italic: true,
    more: {
      underline: true,
      strikeThrough: true,
      removeFormats: true,
    },
    highlight: true,
    color: true,
    headings: true,
    link: false,
    code: false,
    quote: false,
    divider: false,
    orderedList: true,
    unorderedList: true,
    info: false,
    monospace: true,
    undoRedo: true,
  }

  const saveEditorState = (changeType, addedContent = "", removedContent = "") => {
    const editor = editorRef.current;
    const textContent = editor.innerText || ""; // Grab text content of the editor
    const htmlContent = editor.innerHTML || ""; // Grab text content of the editor
    const selection = window.getSelection();
    const carrotPos = selection.focusOffset; // Current caret position

    const state = {
      _id: uid(),
      textContent,
      htmlContent,
      offset: carrotPos,
      carrotPos,
      previousCarrotPos: lastSavedState.carrotPos || 0,
      changeType,
      addedContent,
      removedContent,
      timestamp: Date.now(),
    };

    // return state to whatever module is using this.
    handleReturnState(state)
    setLastSavedState(state);
    if (textContent === "") {
      setShowPlaceholder(true)
    } else {
      setShowPlaceholder(false)
    }
  };

  const handleEditorChange = (e) => {
    const editor = editorRef.current;
    const textContent = editor.innerText || "";
    console.log(e)
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

  useEffect(() => {
    // init editor
    document.execCommand("styleWithCSS", false, true);
  }, [])

  return (
    <div className="editor_main_container">
      <ToolBar options={toolbarOptions} handleEditorChange={handleEditorChange} />
      <div className="editor_wrapper">
        {showPlaceHolder ? <p className="placeholder">{placeholder}</p> : ""}
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
