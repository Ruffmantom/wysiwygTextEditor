import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { richTextEditorStore } from "../../../stores/richTextEditorStore";

const AddLink = () => {
  const { setLinkModal, textSelection, setTextSelection } =
    richTextEditorStore();

  const [linkData, setLinkData] = useState({
    label: textSelection ? textSelection : "",
    href: "",
  });

  const { label, href } = linkData;

  const handleClose = (e) => {
    e.preventDefault();
    setLinkModal(false);
  };

  const handleLabelChange = (e) => {
    setLinkData({
      ...AddLink,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <div
          className="modal_close icon_button"
          onClick={() => setLinkModal(false)}
        >
          <CloseIcon />
        </div>
        <div className="hub_modal_header">
          <h3>Add a Link</h3>
        </div>
        <div className="hub_modal_content fit_content">
          <div className="form_cont create">
            <div className="form_group">
              <label htmlFor="label">Link Label</label>
              <input
                type="text"
                placeholder="Label..."
                name="label"
                onChange={handleLabelChange}
                value={label}
                />
            </div>
            <div className="form_group">
              <label htmlFor="href">Link href</label>
              <input
                type="text"
                name="href"
                onChange={handleLabelChange}
                value={href}
                placeholder="https://www.mylink.com..."
              />
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
