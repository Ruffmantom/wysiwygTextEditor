import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { richTextEditorStore } from "../../../stores/richTextEditorStore";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

const AddCode = ({ onAddCode }) => {
  const { setCodeModal } = richTextEditorStore();
  const [codeContent, setCodeContent] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleClose = (e) => {
    e.preventDefault();
    setCodeModal(false);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case 'javascript':
      case 'jsx':
        return javascript();
      case 'python':
        return python();
      // Add more cases for other languages
      default:
        return javascript();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCode(language, codeContent);
    handleClose(e);
  };

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <div
          className="modal_close icon_button"
          onClick={() => setCodeModal(false)}
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
              <select name="codelang" value={language} onChange={handleLanguageChange}>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="csharp">C#</option>
                <option value="swift">Swift</option>
                <option value="go">Go</option>
                <option value="sql">SQL</option>
                <option value="jsx">JSX</option>
                <option value="sass">Sass</option>
                <option value="less">Less</option>
              </select>
            </div>
            <div className="add_code form_group">
              <label htmlFor="code">Add Code</label>
              <CodeMirror
                value={codeContent}
                height="200px"
                extensions={[getLanguageExtension(language)]}
                onChange={(value) => setCodeContent(value)}
              />
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={handleSubmit}
            >
              Add Code
            </button>
            <button
              className="form_action_btn"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
