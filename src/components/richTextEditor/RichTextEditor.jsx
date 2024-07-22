import React, { useRef, useState, useEffect } from "react";
import ToolBar from "./components/ToolBar";
import AddCodeModal from "./components/modals/AddCodeModal";
import AddLinkModal from "./components/modals/AddLinkModal";
import "highlight.js/styles/github.css";
import "./style.css"
import { RichTextEditorProvider, useRichTextEditor } from './contexts/RichTextEditorContext';
import Footer from "./components/Footer";
import RichTextInput from "./components/RichTextInput";
// helpers

export default function RichTextEditor({ options }) {
  const editorRef = useRef(null);
  const timeoutRef = useRef(null); // Use ref to store the timeout ID
  const toolbarRef = useRef(null);

  // state
  // const {
  //   codeModalOpen,
  //   linkModalOpen,
  //   setSelectedText,
  // } = useRichTextEditor();

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
    <RichTextEditorProvider>
      <div className="editable_container_cont">
        <div className="rich_text_editor">
          <AddCodeModal />
          <AddLinkModal />
          <ToolBar options={options} editorRef={editorRef} />
          <RichTextInput ref={editorRef}/>
          <Footer />
        </div>
      </div>
    </RichTextEditorProvider>
  );
}
