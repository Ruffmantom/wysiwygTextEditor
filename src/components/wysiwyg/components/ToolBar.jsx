import React from "react";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic.svg";
import { ReactComponent as H1Icon } from "../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../assets/icons/h4.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link.svg";
import { ReactComponent as CodeIcon } from "../../../assets/icons/code.svg";
// helpers
import { formatBold, formatItalic } from "../helpers/helpers"


const ToolBar = ({
  textSelection,
  setCodeModalOpen,
  setLinkModalOpen,
  fullContent,
  setFullContent
}) => {

  const handleFormatItalic = ()=>{
    const formattedTxt = formatItalic(fullContent,textSelection)
    setFullContent(formattedTxt)
  }

  const handleFormatBold = () => {
    const formattedTxt = formatBold(fullContent,textSelection)
    setFullContent(formattedTxt)
  }

  return (
    <div className="wysiwyg_tool_bar">
      <div className={`text_formatting ${textSelection !== "" ? "active" : ""}`}>
        <div className="icon_button" onClick={()=>handleFormatBold()}>
          <BoldIcon />
        </div>
        <div className="icon_button" onClick={()=>handleFormatItalic()}>
          <ItalicIcon />
        </div>
        <div className="icon_button heading">
          <H1Icon />
        </div>
        <div className="icon_button heading">
          <H2Icon />
        </div>
        <div className="icon_button heading">
          <H3Icon />
        </div>
        <div className="icon_button heading">
          <H4Icon />
        </div>
      </div>
      <div className="icon_button heading" onClick={() => setLinkModalOpen(true)}>
        <LinkIcon />
      </div>
      <div className="icon_button heading" onClick={() => setCodeModalOpen(true)}>
        <CodeIcon />
      </div>
    </div>
  );
};

export default ToolBar;
