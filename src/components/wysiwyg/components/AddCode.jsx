import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
const AddCode = ({ textSelection, setCodeModalOpen }) => {

  const handleClose = (e) => {
    e.preventDefault();
    setCodeModalOpen(false);
  };

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <div
          className="modal_close icon_button"
          onClick={() => setCodeModalOpen(false)}
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
              <select name="codelang">
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
              {/* <div contentEditable className="editable_container"> */}
                <pre contentEditable className="editable_container code_block">
                  <code>
                    // Place code here...
                  </code>
                </pre>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={(e) => {
                handleClose(e);
              }}
            >
              Add Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
