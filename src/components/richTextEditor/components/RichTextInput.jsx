import React, { useEffect, useRef } from "react";
import { Editor, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useRichTextEditor } from "../contexts/RichTextEditorContext";
import { customStyleMap } from "../helpers/CustomStyleMaps";
import { blockRendererFn } from '../helpers/CustomBlockRenderer'
import ToolBar from "./ToolBar";


const RichTextInput = ({ options }) => {
  const editorContRef = useRef(null)
  const {
    editorState,
    setEditorState,
    blurEditor,
    editorRef,
    focusEditor,
    linkModalOpen,
    codeModalOpen,
  } = useRichTextEditor();

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };


  const handleClickOutside = (event) => {
    if (
      editorContRef.current &&
      !editorContRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      blurEditor();
    }
  };

  useEffect(() => {
    if (linkModalOpen ||
      codeModalOpen) {
      return
    } else {
      console.log("Editor refocus")
      focusEditor();
    }

    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };

  }, [focusEditor]);


  return (
    <div className="rich_text_editor" ref={editorContRef}>
      <ToolBar options={options} />
      <div className="editable_container">
        <Editor
          ref={editorRef}
          customStyleMap={customStyleMap}
          editorState={editorState}
          blockRendererFn={blockRendererFn}
          // blockStyleFn={blockStyleFn}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
