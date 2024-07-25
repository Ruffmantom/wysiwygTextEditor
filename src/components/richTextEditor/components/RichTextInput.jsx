import React, { useEffect } from "react";
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
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

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 13 /* `Enter` key */) {
      return 'insert-newline';
    }
    return getDefaultKeyBinding(e);
  };

  const handlePastedText = (text, html, editorState, setEditorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
  
    const contentState = Modifier.replaceText(
      currentContent,
      selection,
      text,
      editorState.getCurrentInlineStyle()
    );
  
    setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
    return 'handled';
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    if (command === 'insert-newline') {
      const newState = RichUtils.insertSoftNewline(editorState);
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onTab = (e) => {
    const maxDepth = 4;
    setEditorState(RichUtils.onTab(e, editorState, maxDepth));
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
          keyBindingFn={myKeyBindingFn}
          handlePastedText={(text, html) => handlePastedText(text, html, editorState, setEditorState)}
          onTab={onTab}
          onChange={(editorState) => {
            setEditorState(editorState)
          }}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
