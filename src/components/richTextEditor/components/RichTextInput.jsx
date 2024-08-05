import React, { useEffect } from "react";
import { Editor, RichUtils } from "draft-js";

import "draft-js/dist/Draft.css";
import { useRichTextEditor } from "../contexts/RichTextEditorContext";
import { customStyleMap } from "../helpers/CustomStyleMaps";
// components
import Audio from "./Audio"
import Image from "./Image"
import Video from "./Video"
import CodeBlock from "./CodeBlock"
// toolbar
import ToolBar from "./ToolBar";
// render helpers
import { myBlockStyleFn } from "../helpers/CustomBlockStyles";
import { myKeyBindingFn } from "../helpers/helpers";

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

  const handleKeyCommand = (command) => {
    // command comes in as a string
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "clear-styles") {
      clearFormatting();
      return "handled";
    }
    if (command === "ordered-list") {
      keyCodeApplyStyle("ordered-list-item", "block");
      return "handled";
    }
    if (command === "unordered-list") {
      keyCodeApplyStyle("unordered-list-item", "block");
      return "handled";
    }
    if (command === "strike-through") {
      keyCodeApplyStyle("STRIKETHROUGH", "inline");
      return "handled";
    }
    if (command === "mono-type") {
      keyCodeApplyStyle("MONOSPACE", "inline");
      return "handled";
    }
   
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }
  
    return null;
  }

  const Media = (props) => {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0)
    );
    const { src,code } = entity.getData();
    const type = entity.getType();
  
    let media;
    if (type === 'audio') {
      media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
      media = <Video src={src} />;
    } else if (type === 'code') {
      media = <CodeBlock code={code} />;
    }
  
    return media;
  };

  

  return (
    <div className="rich_text_editor">
      <ToolBar
        options={options}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <div className="editable_container">
        <Editor
          ref={editorRef}
          editorState={editorState}
          autoCorrect="true"
          spellCheck="true"
          onChange={setEditorState}
          placeholder="Start Typing..."
          
          customStyleMap={customStyleMap}
          
          blockStyleFn={myBlockStyleFn}
          blockRendererFn={mediaBlockRenderer}
          
          keyBindingFn={myKeyBindingFn}
          handleKeyCommand={handleKeyCommand}
          onTab={onTab}
        />
      </div>
    </div>
  );
};

export default RichTextInput;
