import React, { useCallback } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from '@uiw/codemirror-themes-all';
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import CustomSelect from "../CustomSelect";
import { useRichTextEditor } from '../../contexts/RichTextEditorContext'
import { AtomicBlockUtils, EditorState, RichUtils } from "draft-js";
const languageList = ["HTML", "XML", "CSS", "JavaScript", "TypeScript"];

const AddCodeModal = () => {
  const {
    codeModalOpen,
    setCodeModal,
    focusEditor,
    editorState,
    setEditorState,
    codeLang,
    codeValue,
    setCodeLanguage,
    setCodeValue,
    editorRef,
    codeRef,
  } = useRichTextEditor()

  const handleClose = (e) => {
    e.preventDefault();
    setCodeModal(false);
    // refocus the editor
    focusEditor()
  };

  const handleLanguageChange = (value) => {
    setCodeLanguage(value.toLowerCase());
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
  const confirmCode = useCallback((e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    // Create a new entity and get its key
    const contentStateWithEntity = contentState.createEntity('CODE_BLOCK', 'MUTABLE', {
      language: codeLang,
      codeContent: codeValue,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // Create a new editor state with the updated content state
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    // Apply the entity to the selected text using RichUtils.toggleLink
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    // Close the modal and clear input values
    setCodeModal(false)
    setCodeLanguage('');
    setCodeValue('');
    // Focus the editor
    setTimeout(() => editorRef.current.focus(), 0);
  }, [editorState, codeLang, codeValue, setEditorState, setCodeModal, setCodeLanguage, setCodeValue, editorRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Code: ", { language:codeLang, codeContent:codeValue });
    // createCodeBlocks(language, codeContent);
    confirmCode(e)
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
                value={codeValue}
                height="200px"
                extensions={[getLanguageExtension(codeLang), vscodeDark]}
                onChange={(value) => setCodeValue(value)}
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
