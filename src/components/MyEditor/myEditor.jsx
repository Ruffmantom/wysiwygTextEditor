import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as BoldIcon } from '../../assets/icons/bold.svg'
import "./style.css";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


const MyEditor = () => {
  const editorRef = useRef(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);


  const handleEditorKeyDown = (e) => {
    console.log(e)
    const editorValue = editorRef
    console.log(editorValue)
  }


  // handle selecting text
  const handleEditorSelection = (e) => {
    const editorValue = editorRef.current.onselect
    const selection = window.getSelection()
    console.log(selection)
  }


  // tool bar handlers
  // bold
  const handleBoldText = (e) => {
    e.preventDefault()
    // Note: range refers to the actual highlight when the user selects
    const selection = window.getSelection()

    // selection.collapseToEnd() // closes range and puts carrot at end
    // selection.empty() // closes the range and removes carrot
    console.log(selection.rangeCount)
    console.log(selection.getRangeAt(1))
  }

  return (
    <div className="editor_main_container">
      <div className="editor_tool_bar">
        <button onClick={e => handleBoldText(e)} className="icon_btn"><BoldIcon /></button>
      </div>
      <div className="editor_wrapper">
        <p className="placeholder">Start Typing here...</p>
        <div className="my_editor_cont" ref={editorRef} contentEditable="true" onKeyUp={e => handleEditorKeyDown(e)} onSelect={e => handleEditorSelection(e)}>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
