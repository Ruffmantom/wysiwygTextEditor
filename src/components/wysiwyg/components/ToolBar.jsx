import React from "react";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic.svg";
import { ReactComponent as H1Icon } from "../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../assets/icons/h4.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link.svg";
import { ReactComponent as CodeIcon } from "../../../assets/icons/code.svg";

const ToolBar = ({ containerRef, setCodeModalOpen, setLinkModalOpen }) => {

  const applyFormat = (tag) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();
    const span = document.createElement(tag);
    span.appendChild(selectedText);
    range.insertNode(span);

    // Deselect the text after formatting
    selection.removeAllRanges();
  };

  const handleFormatBold = () => applyFormat('b');
  const handleFormatItalic = () => applyFormat('i');
  const handleFormatHeading = (heading) => () => applyFormat(heading);

  return (
    <div className="wysiwyg_tool_bar">
      <div className="icon_button" onClick={handleFormatBold}>
        <BoldIcon />
      </div>
      <div className="icon_button" onClick={handleFormatItalic}>
        <ItalicIcon />
      </div>
      <div className="icon_button heading" onClick={handleFormatHeading('h1')}>
        <H1Icon />
      </div>
      <div className="icon_button heading" onClick={handleFormatHeading('h2')}>
        <H2Icon />
      </div>
      <div className="icon_button heading" onClick={handleFormatHeading('h3')}>
        <H3Icon />
      </div>
      <div className="icon_button heading" onClick={handleFormatHeading('h4')}>
        <H4Icon />
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
