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
import {  myKeyBindingFn } from "../helpers/utils";


const RichTextInput = ({ options }) => {

  const {
    editorState,
    setEditorState,
    editorRef,
    focusEditor,
    keyCodeApplyStyle,
    clearFormatting
  } = useRichTextEditor();


  useEffect(() => {
    focusEditor();
  }, []);

  const onTab = (e) => {
    const maxDepth = 4;
    setEditorState(RichUtils.onTab(e, editorState, maxDepth));
  };

 const handleKeyCommand = (command) => { // command comes in as a string
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'clear-styles') {
      console.log("hit clear styles")
      clearFormatting()
      return 'handled'
    }
    if (command === 'ordered-list') {
      console.log("hit ordered list")
      keyCodeApplyStyle('ordered-list-item', 'block')
      return 'handled'
    }
    if (command === 'unordered-list') {
      console.log("hit unordered list")
      keyCodeApplyStyle('unordered-list-item', 'block')
      return 'handled'
    }
    if (command === 'strike-through') {
      console.log("hit strike through")
      keyCodeApplyStyle('STRIKETHROUGH', 'inline')
      return 'handled'
    }
    if (command === 'mono-type') {
      console.log("hit mono type")
      keyCodeApplyStyle('MONOSPACE', 'inline')
      return 'handled'
    }
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className="rich_text_editor">
      <ToolBar options={options} editorState={editorState} setEditorState={setEditorState} />
      <div className="editable_container">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Start Typing..."
          customStyleMap={customStyleMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={myBlockStyleFn}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          onTab={onTab}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
