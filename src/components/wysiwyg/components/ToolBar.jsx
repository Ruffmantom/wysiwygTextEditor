import React, { useState } from "react";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic.svg";
import { ReactComponent as H1Icon } from "../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../assets/icons/h4.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link.svg";
import { ReactComponent as CodeIcon } from "../../../assets/icons/code.svg";
import { ReactComponent as UnderlineIcon } from "../../../assets/icons/underline.svg";
import { ReactComponent as StrikeIcon } from "../../../assets/icons/strike.svg";
import { ReactComponent as QuoteIcon } from "../../../assets/icons/quote.svg";
import { ReactComponent as JustifyIcon } from "../../../assets/icons/justify.svg";
import { ReactComponent as HighlightIcon } from "../../../assets/icons/highlight.svg";
import { ReactComponent as FontcolorIcon } from "../../../assets/icons/fontcolor.svg";
import { ReactComponent as DividerIcon } from "../../../assets/icons/divider.svg";
import { ReactComponent as AlignRIcon } from "../../../assets/icons/align-r.svg";
import { ReactComponent as AlignLIcon } from "../../../assets/icons/align-l.svg";
import { ReactComponent as AlignCIcon } from "../../../assets/icons/align-c.svg";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more-v.svg";

const ToolBar = ({
  setCodeModalOpen,
  setLinkModalOpen,
  setFullContent,
  fullContent,
  selectedContent,
}) => {
  const [paragraphDdOpen, setParagraphDdOpen] = useState(false);

  const applyFormat = (tag) => {
    console.log("hit apply format");
    if (selectedContent) {
      console.log("Selected Text: " + selectedContent);
      console.log("Full Content: " + fullContent);

      let newElement = `<${tag}>${selectedContent}</${tag}>`;
      let formatTxt = fullContent.replace(selectedContent, newElement);
      console.log("Full Content with replacement: " + formatTxt);
      // set full content
      setFullContent(formatTxt);
    }
  };
  const handleOpenClose = (current, setter) => {
    if (current) {
      setter(false);
    } else {
      setter(true);
    }
  };

  const handleFormatBold = () => applyFormat("b");
  const handleFormatItalic = () => applyFormat("i");
  const handleFormatHeading = (heading) => () => applyFormat(heading);

  return (
    <div className="wysiwyg_tool_bar">
      <div className="icon_button tool_bar" onClick={handleFormatBold}>
        <BoldIcon />
        <span className="wysiwyg_tool_tip">
          Bold <span className="key_command">ctrl + b</span>
        </span>
      </div>
      <div className="icon_button tool_bar" onClick={handleFormatItalic}>
        <ItalicIcon />
        <span className="wysiwyg_tool_tip">
          Italic <span className="key_command">ctrl + i</span>
        </span>
      </div>
      <div className="icon_button tool_bar">
        <UnderlineIcon />
        <span className="wysiwyg_tool_tip">
          Underline <span className="key_command">ctrl + u</span>
        </span>
      </div>
      <div className="icon_button tool_bar">
        <StrikeIcon />
        <span className="wysiwyg_tool_tip">
          Strike Through <span className="key_command">ctrl + shift + s</span>
        </span>
      </div>
      <div className="wysiwyg_tool_bar_divider"></div>
      <div className="icon_button tool_bar">
        <HighlightIcon />
        <span className="wysiwyg_tool_tip">Highlight Color</span>
      </div>
      <div className="icon_button tool_bar">
        <FontcolorIcon />
        <span className="wysiwyg_tool_tip">Font Color</span>
      </div>
      <div className="icon_button tool_bar_dd">
        <p onClick={() => handleOpenClose(paragraphDdOpen, setParagraphDdOpen)}>
          Paragraph
        </p>
        <div
          className={`tool_bar_dd_content ${paragraphDdOpen ? "active" : ""}`}
        >
          <div className="tool_bar_dd_item" onClick={handleFormatHeading("h1")}>
            <span>Heading 1</span>
            <H1Icon />
          </div>
          <div className="tool_bar_dd_item" onClick={handleFormatHeading("h2")}>
            <span>Heading 2</span>
            <H2Icon />
          </div>
          <div className="tool_bar_dd_item" onClick={handleFormatHeading("h3")}>
            <span>Heading 3</span>
            <H3Icon />
          </div>
          <div className="tool_bar_dd_item" onClick={handleFormatHeading("h4")}>
            <span>Heading 4</span>
            <H4Icon />
          </div>
          <div className="tool_bar_dd_item" onClick={handleFormatHeading("p")}>
            <span>Paragraph</span>P
          </div>
        </div>
      </div>
      <div
        className="icon_button tool_bar heading"
        onClick={() => setLinkModalOpen(true)}
      >
        <LinkIcon />
        <span className="wysiwyg_tool_tip">Link</span>
      </div>
      <div
        className="icon_button tool_bar heading"
        onClick={() => setCodeModalOpen(true)}
      >
        <CodeIcon />
        <span className="wysiwyg_tool_tip">Code Block</span>
      </div>
    </div>
  );
};

export default ToolBar;
