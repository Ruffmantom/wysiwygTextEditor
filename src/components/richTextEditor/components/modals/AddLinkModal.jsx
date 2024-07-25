import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";
import { EditorState, RichUtils } from "draft-js";

const urlRegex =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/i;

const AddLinkModal = () => {
  const {
    linkModalOpen,
    setLinkModal,
    selectedText,
    setEditorState,
    editorState,
    focusEditor,
    setUrlValue,
    setLabelValue,
    urlValue,
    labelValue,
    hrefRef,
  } = useRichTextEditor();


  const handleClose = (e) => {
    e.preventDefault();
    // clear out the label
    setUrlValue('')
    setLabelValue('')
    setLinkModal(false);
    focusEditor();
  };

  // confirm the link and create element
  const confirmLink = useCallback((e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue, label: labelValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    // close modal
    setLinkModal(false);
    // clear selected text in state
    setUrlValue('')
    setLabelValue('')
    // focus editor
    setTimeout(() => focusEditor(), 0);
  }, [editorState, urlValue, labelValue]);


  const handleCreateLink = (e) => {
    e.preventDefault();

    if (!labelValue) {
      console.log("Please include a label for the link");
      return;
    }
    if (!urlValue) {
      console.log("Please include a link for the link");
      return;
    }
    let linkPass = urlRegex.test(urlValue);

    if (!linkPass) {
      console.log("Please include a valid link");
      return;
    }
    // add create link here
    console.log("Link Data: ", { labelValue, urlValue });
    // create the link
    confirmLink(e);
  };

  if (!linkModalOpen) {
    return null;
  }

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <button
          className="modal_close icon_button"
          onClick={(e) => handleClose(e)}
          onMouseDown={(e) => e.preventDefault()}
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
                onChange={e => setLabelValue(e.target.value)}
                value={labelValue || ""}
              />
            </div>
            <div className="form_group">
              <label htmlFor="href">Link href</label>
              <input
                ref={hrefRef}
                type="text"
                name="href"
                onChange={e => setUrlValue(e.target.value)}
                value={urlValue || ""}
                placeholder="https://www.mylink.com..."
              />
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={e=>handleCreateLink(e)}
              onMouseDown={(e) => e.preventDefault()}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddLinkModal;
