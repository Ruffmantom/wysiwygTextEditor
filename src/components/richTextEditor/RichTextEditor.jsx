import React, { useRef, useState, useEffect } from "react";
import ToolBar from "./components/ToolBar";
import AddCodeModal from "./components/modals/AddCodeModal";
import AddLinkModal from "./components/modals/AddLinkModal";
import { richTextEditorStore } from "../../stores/richTextEditorStore";
import "highlight.js/styles/github.css";
import "./style.css"
// helpers

export default function RichTextEditor({ options }) {
  const editorRef = useRef(null);
  const timeoutRef = useRef(null); // Use ref to store the timeout ID
  const toolbarRef = useRef(null);

  // state
  const {
    codeModalOpen,
    linkModalOpen,
    setSelectedText,
  } = richTextEditorStore();

  // handle key down functions
  const handleKeyDown = (e) => {
    console.log("Key pressed!")
  };

  const handleSelection = (e) => {
    e.preventDefault()
    console.log("Selection Detected!")
  }


  // on load
  useEffect(() => {

  }, []);

  // return the editor
  return (
    <div className="editable_container_cont">

      <div className="rich_text_editor">
        {codeModalOpen ? <AddCodeModal /> : ""}
        {linkModalOpen ? <AddLinkModal /> : ""}
        <ToolBar options={options} />
        <div
          ref={editorRef}
          className="editable_container"
          contentEditable="true"
          aria-multiline="true"
          spellCheck="true"
          role="textbox"
          // onFocus={handleFocus}
          onSelect={handleSelection}
          onKeyDown={handleKeyDown}
        ></div>
      </div>
    </div>
  );
}
