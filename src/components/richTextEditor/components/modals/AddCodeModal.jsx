import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from '@uiw/codemirror-themes-all';
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import CustomSelect from "../CustomSelect";
import { useRichTextEditor } from '../../contexts/RichTextEditorContext'
import { AtomicBlockUtils } from "draft-js";
const languageList = ["HTML", "XML", "CSS", "JavaScript", "TypeScript"];

const AddCodeModal = () => {
  const [codeContent, setCodeContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { 
    codeModalOpen, 
    setCodeModal,
    focusEditor,
    editorState,
    setEditorState
   } = useRichTextEditor()

  const handleClose = (e) => {
    e.preventDefault();
    setCodeModal(false);
    // refocus the editor
    focusEditor()
  };

  const handleLanguageChange = (value) => {
    setLanguage(value.toLowerCase());
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "javascript":
      case "typescript":
      case "jsx":
        return javascript();
      case "html":
        return html();
      case "css":
        return css();
      case "xml":
        return xml();
      // Add more cases for other languages as needed
      default:
        return javascript(); // default to javascript if language is not found
    }
  };
// create the codeblock
  const insertCodeBlock = (language, codeContent) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'CODE_BLOCK',
      'IMMUTABLE',
      { language, codeContent }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    setEditorState(newEditorState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Code: ",{ language, codeContent });
    // createCodeBlocks(language, codeContent);
    insertCodeBlock(language, codeContent)
    handleClose(e);
    focusEditor()
  };

  // if codemodal is false
  if (!codeModalOpen) {
    return null
  }

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <div
          className="modal_close icon_button"
          onClick={e => handleClose(e)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CloseIcon />
        </div>
        <div className="hub_modal_header">
          <h3>Add a code block</h3>
        </div>
        <div className="hub_modal_content fit_content">
          <div className="form_cont create">
            <div className="form_group">
              <label htmlFor="codelang">Code Language</label>
              <CustomSelect
                options={languageList}
                setValue={handleLanguageChange}
              />
            </div>
            <div className="add_code form_group">
              <label htmlFor="code">Add Code</label>
              <CodeMirror
                value={codeContent}
                height="200px"
                extensions={[getLanguageExtension(language), vscodeDark]}
                onChange={(value) => setCodeContent(value)}
              />
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={e => handleSubmit(e)}
              onMouseDown={(e) => e.preventDefault()}
            >
              Add Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCodeModal;
