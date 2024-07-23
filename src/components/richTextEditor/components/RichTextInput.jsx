import React, { useEffect } from "react";
import { Editor, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useRichTextEditor } from "../contexts/RichTextEditorContext";
import { customStyleMap } from "../helpers/CustomStyleMaps";
import {blockRendererFn} from '../helpers/CustomBlockRenderer'
const RichTextInput = () => {
  const { editorState, setEditorState, editorRef, focusEditor } =
    useRichTextEditor();

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    focusEditor();
  }, [focusEditor]);

  return (
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
  );
};

export default RichTextInput;
