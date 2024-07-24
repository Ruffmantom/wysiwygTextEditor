import React from "react";
import { ReactComponent as LinkIcon } from "../../../../assets/icons/link.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";
import { getSelectedText } from "../../helpers/utils";

export default function AddLinkTool() {
  const { setLinkModal, blurEditor, setSelectedText } = useRichTextEditor();

  const handleOpenLinkModal = (e) => {
    e.preventDefault();
    console.log("Open Link Modal");
    blurEditor();
    setLinkModal(true);
    setSelectedText()
  };

  return (
    <button
      className="icon_button tool_bar heading"
      onClick={e=>handleOpenLinkModal(e)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <LinkIcon />
      <span className="wysiwyg_tool_tip">Link</span>
    </button>
  );
}
