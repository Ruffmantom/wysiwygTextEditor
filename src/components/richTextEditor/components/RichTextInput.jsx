import React, { useEffect } from "react";
import {
  Editor,
  RichUtils
} from "draft-js";

import "draft-js/dist/Draft.css";
import { useRichTextEditor } from "../contexts/RichTextEditorContext";
import { customStyleMap } from "../helpers/CustomStyleMaps";
import { blockRendererFn } from '../helpers/CustomBlockRenderer'
import ToolBar from "./ToolBar";
import { myBlockStyleFn } from "../helpers/CustomBlockStyles";


const RichTextInput = ({ options }) => {

  const {
    editorState,
    setEditorState,
    editorRef,
    focusEditor
  } = useRichTextEditor();


  useEffect(() => {
    focusEditor();
  }, []);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };


  return (
    <div className="rich_text_editor">
      <ToolBar options={options}  editorState={editorState} setEditorState={setEditorState} />
      <div className="editable_container">
        <Editor
          ref={editorRef}
          placeholder="Start Typing..."
          editorState={editorState}
          customStyleMap={customStyleMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={myBlockStyleFn}
          handleKeyCommand={handleKeyCommand}
          onChange={(editorState) => {
            setEditorState(editorState)
          }}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
