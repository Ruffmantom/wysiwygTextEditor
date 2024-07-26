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


  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
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
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Start Typing..."
          customStyleMap={customStyleMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={myBlockStyleFn}
          handleKeyCommand={handleKeyCommand}
          onTab={onTab}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
