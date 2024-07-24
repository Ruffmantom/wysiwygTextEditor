import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";
import { CompositeDecorator, EditorState, RichUtils } from "draft-js";

const urlRegex =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/i;

const AddLinkModal = () => {
  const {
    linkModalOpen,
    setLinkModal,
    selectedText,
    setEditorState,
    editorState,
    editorRef,
  } = useRichTextEditor();

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

  const handleClose = (e) => {
    e.preventDefault();
    setLinkModal(false);
  };

  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }

  const Link = (props) => {
    const { url, label } = props.contentState
      .getEntity(props.entityKey)
      .getData();
    return (
      <a href={url} className="formatted_link">
        {props.children}
      </a>
    );
  };

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const confirmLink = useCallback(
    (e) => {
      e.preventDefault();
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url: href, label: label }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      setEditorState(
        RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        )
      );
      setTimeout(() => editorRef.current.focus(), 0);
    },
    [editorState, href, label, setEditorState, editorRef]
  );

  const handleCreateLink = (e) => {
    e.preventDefault();

    if (!label) {
      console.log("Please include a label for the link");
      return;
    }
    if (!href) {
      console.log("Please include a link for the link");
      return;
    }
    let linkPass = urlRegex.test(href);

    if (!linkPass) {
      console.log("Please include a valid link");
      return;
    }

    confirmLink(e);
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

  useEffect(() => {
    setEditorState(() => EditorState.createEmpty(decorator));
  }, []);

  if (!linkModalOpen) {
    return null;
  }

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <button
          className="modal_close icon_button"
          onClick={handleClose}
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
