import React, { useCallback } from "react";
import { ReactComponent as LinkIcon } from "../../../../assets/icons/link.svg";

export default function AddLinkTool() {


  return (
    <button
      className="icon_button tool_bar heading"
      // onClick={}
      // onMouseDown={(e) => e.preventDefault()}
    >
      <LinkIcon />
      <span className="wysiwyg_tool_tip">Link</span>
    </button>
  );
}
