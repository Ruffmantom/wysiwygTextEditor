import React from "react";
import { ReactComponent as DividerIcon } from "../../../../assets/icons/divider.svg";

export default function AddDividerTool() {
  const createDivider = (e) => {
    e.preventDefault();
  };

  return (
    <button
      className="icon_button tool_bar heading"
      onClick={(e) => createDivider(e)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <DividerIcon />
      <span className="wysiwyg_tool_tip">Divider</span>
    </button>
  );
}
