import React, { useRef, useState } from "react";
import "./style.css";

const MyEditor = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Function to get the current selection and cursor position
  const getCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    return {
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      startContainer: range.startContainer,
      endContainer: range.endContainer,
    };
  };

  // Function to update the content in the editor
  const updateEditorContent = (content) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  };

  // Handle key up event to track actions
  const handleKeyUp = (e) => {
    const cursorPosition = getCursorPosition();

    // Create an action object for the undo stack
    const action = {
      content: editorRef.current.innerHTML,
      cursorPosition: cursorPosition,
    };

    // Add the new action to the undo stack and reset the redo stack
    setUndoStack((prevUndoStack) => [...prevUndoStack, action]);
    setRedoStack([]);

    setEditorState(editorRef.current.innerHTML);
  };

  // Handle the key down event to detect shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      handleUndo();
    } else if (e.ctrlKey && e.shiftKey && e.key === "Z") {
      e.preventDefault();
      handleRedo();
    }
  };

  // Handle the undo operation
  const handleUndo = () => {
    setUndoStack((prevUndoStack) => {
      if (prevUndoStack.length === 0) return prevUndoStack;

      const lastAction = prevUndoStack[prevUndoStack.length - 1];

      setRedoStack((prevRedoStack) => [...prevRedoStack, lastAction]);

      const newUndoStack = prevUndoStack.slice(0, -1);
      const previousAction = newUndoStack[newUndoStack.length - 1];

      if (previousAction) {
        updateEditorContent(previousAction.content);
        setEditorState(previousAction.content);
      } else {
        updateEditorContent("");
        setEditorState("");
      }

      return newUndoStack;
    });
  };

  // Handle the redo operation
  const handleRedo = () => {
    console.log("handle Redo:", redoStack);
    console.log("Editor State:", editorState);
  };

  return (
    <div className="my_editor_cont">
      <p className={`placeholder ${editorState.length >= 1 ? "hide" : ""}`}>
        Start Typing...
      </p>

      <div
        contentEditable="true"
        className="my_editor"
        autoCorrect="true"
        ref={editorRef}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown} // Listen for keydown events
      ></div>
    </div>
  );
};

export default MyEditor;
