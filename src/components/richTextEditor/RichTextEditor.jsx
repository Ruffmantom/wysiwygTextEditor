import React, { useRef, useState, useEffect } from "react";
import ToolBar from "./components/ToolBar";
import AddCodeModal from "./components/modals/AddCodeModal";
import AddLinkModal from "./components/modals/AddLinkModal";
import "highlight.js/styles/github.css";
import "./style.css"
import { RichTextEditorProvider } from './contexts/RichTextEditorContext';
import Footer from "./components/Footer";
import RichTextInput from "./components/RichTextInput";
// helpers

export default function RichTextEditor({ options }) {

  return (
    <RichTextEditorProvider>
      <div className="editable_container_cont">
        <div className="rich_text_editor">
          <AddCodeModal />
          <AddLinkModal />
          <ToolBar options={options}/>
          <RichTextInput/>
          <Footer />
        </div>
      </div>
    </RichTextEditorProvider>
  );
}
