import React, { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { richTextEditorStore } from "../../../stores/richTextEditorStore";

const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/i;

const AddLink = ({ selectedText, createLinks }) => {
  const { setLinkModal } = richTextEditorStore();

  const [linkData, setLinkData] = useState({
    label: selectedText || "",
    href: "",
  });

  const { label, href } = linkData;

  const handleInputChange = (e) => {
    setLinkData({
      ...linkData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateLink = (e) => {
    e.preventDefault();

    // check if label or link are empty
    if (!label) {
      console.log('Please include a label for the link');
      return;
    }
    if (!href) {
      console.log('Please include a link for the link');
      return;
    }
    let linkPass = urlRegex.test(href);

    if (!linkPass) {
      console.log('Please include a valid link');
      return;
    }

    createLinks({ label, href });

    // close modal
    setLinkModal(false);
  };

  useEffect(() => {
    if (selectedText) {
      setLinkData((prevData) => ({
        ...prevData,
        label: selectedText,
      }));
    }
  }, [selectedText]);

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <button
          className="modal_close icon_button"
          onClick={() => setLinkModal(false)}
        >
          <CloseIcon />
        </button>
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
                onChange={handleInputChange}
                value={label || ""}
              />
            </div>
            <div className="form_group">
              <label htmlFor="href">Link href</label>
              <input
                type="text"
                name="href"
                onChange={handleInputChange}
                value={href || ""}
                placeholder="https://www.mylink.com..."
              />
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={handleCreateLink}
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
