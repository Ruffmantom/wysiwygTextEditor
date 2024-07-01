import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";

const AddLink = ({ textSelection, setLinkModalOpen }) => {

  const handleClose = (e) => {
    e.preventDefault();
    setLinkModalOpen(false);
  };

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <div
          className="modal_close icon_button"
          onClick={() => setLinkModalOpen(false)}
        >
          <CloseIcon />
        </div>
        <div className="hub_modal_header">
          <h3>Add a Link</h3>
        </div>
        <div className="hub_modal_content fit_content">
          <div className="form_cont create">
            <div className="form_group">
              <label htmlFor="codelang">Link Label</label>
              <input type="text" placeholder="Label..." value={textSelection? textSelection:""} />
            </div>
            <div className="form_group">
              <label htmlFor="codelang">Link href</label>
              <input type="text" placeholder="https://www.mylink.com..." />
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
              Add Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLink;
