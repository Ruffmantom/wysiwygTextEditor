import React, { useState, useEffect, useRef } from "react";
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
import { ReactComponent as HighlightIcon } from "../../../assets/icons/highlight.svg";
import { ReactComponent as FontcolorIcon } from "../../../assets/icons/fontcolor.svg";
import { ReactComponent as DividerIcon } from "../../../assets/icons/divider.svg";
import { ReactComponent as AlignRIcon } from "../../../assets/icons/align-r.svg";
import { ReactComponent as AlignLIcon } from "../../../assets/icons/align-l.svg";
import { ReactComponent as AlignCIcon } from "../../../assets/icons/align-c.svg";
import { ReactComponent as JustifyIcon } from "../../../assets/icons/justify.svg";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more-v.svg";

const highlightColors = [
  "#FFEB3B",
  "#FF5722",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#FF9800",
  "#00BCD4",
  "#eb361e",
];

const deepFontColors = [
  "#D0C031",
  "#D0481C",
  "#1B5E20",
  "#0D47A1",
  "#4A148C",
  "#D07C00",
  "#006064",
  "#B12917",
];

const ToolBar = ({
  setCodeModalOpen,
  setLinkModalOpen,
  setFullContent,
  fullContent,
  selectedContent,
}) => {
  // const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMac = navigator.userAgent.toLowerCase().includes("macintosh");
  const [paragraphDdOpen, setParagraphDdOpen] = useState(false);
  const [highlightDdOpen, setHighlightDdOpen] = useState(false);
  const [colorDdOpen, setColorDdOpen] = useState(false);

  const paragraphDropDownRef = useRef(null);
  const highlightColorDropDownRef = useRef(null);
  const colorDropDownRef = useRef(null);

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

  const handleHighlightClick = (color) => {
    // e.preventDefault()
    console.log("clicked color: " + color);
  };

  const handleTxtColorClick = (color) => {
    // e.preventDefault()
    console.log("clicked color: " + color);
  };

  const handleClickOutside = (event) => {
    if (
      paragraphDropDownRef.current &&
      !paragraphDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setParagraphDdOpen(false);
    }
    if (
      highlightColorDropDownRef.current &&
      !highlightColorDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setHighlightDdOpen(false);
    }
    if (
      colorDropDownRef.current &&
      !colorDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setColorDdOpen(false);
    }
  };

  const handleFormatBold = () => applyFormat("b");
  const handleFormatItalic = () => applyFormat("i");
  const handleFormatHeading = (heading) => () => applyFormat(heading);

  // if click outside of dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);

  return (
    <div className="wysiwyg_tool_bar">
      <div className="icon_button tool_bar" onClick={handleFormatBold}>
        <BoldIcon />
        <span className="wysiwyg_tool_tip">
          Bold{" "}
          <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
        </span>
      </div>
      <div className="icon_button tool_bar" onClick={handleFormatItalic}>
        <ItalicIcon />
        <span className="wysiwyg_tool_tip">
          Italic{" "}
          <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
        </span>
      </div>
      <div className="icon_button tool_bar">
        <UnderlineIcon />
        <span className="wysiwyg_tool_tip">
          Underline{" "}
          <span className="key_command">{isMac ? "cmd + u" : "ctrl + u"}</span>
        </span>
      </div>
      <div className="icon_button tool_bar">
        <StrikeIcon />
        <span className="wysiwyg_tool_tip">
          Strike Through{" "}
          <span className="key_command">
            {isMac ? "cmd + shift + s" : "ctrl + shift + s"}
          </span>
        </span>
      </div>

      <div className="wysiwyg_tool_bar_divider"></div>

      <div className="icon_button tool_bar tool_bar_dd">
        <div
          className="btn_overlay"
          onClick={() => setHighlightDdOpen(true)}
        ></div>
        <HighlightIcon />
        <span className="wysiwyg_tool_tip">Highlight Color</span>
        {/* drop down content */}
        <div
          className={`tool_bar_dd_content color_dd ${
            highlightDdOpen ? "active" : ""
          }`}
          ref={highlightColorDropDownRef}
        >
          <div className="highlight_colors">
            {highlightColors.map((c) => (
              <div
                key={c}
                className="color_swatch"
                onClick={() => handleHighlightClick(c)}
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
          <div className="tool_bar_dd_item p center">
            <span>None</span>
          </div>
        </div>
      </div>

      <div className="icon_button tool_bar tool_bar_dd">
        <div className="btn_overlay" onClick={() => setColorDdOpen(true)}></div>
        <FontcolorIcon />
        <span className="wysiwyg_tool_tip">Font Color</span>
        {/* drop down content */}
        <div
          className={`tool_bar_dd_content color_dd ${
            colorDdOpen ? "active" : ""
          }`}
          ref={colorDropDownRef}
        >
          <div className="highlight_colors">
            {deepFontColors.map((c) => (
              <div
                key={c}
                className="color_swatch"
                onClick={() => handleTxtColorClick(c)}
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
          <div className="tool_bar_dd_item p center">
            <span>Automatic</span>
          </div>
        </div>
      </div>

      <div className="icon_button tool_bar tool_bar_dd">
        <p onClick={() => setParagraphDdOpen(true)}>Paragraph</p>
        <div
          className={`tool_bar_dd_content ${paragraphDdOpen ? "active" : ""}`}
          ref={paragraphDropDownRef}
        >
          <div
            className="tool_bar_dd_item h1"
            onClick={handleFormatHeading("h1")}
          >
            <span>Heading 1</span>
            <H1Icon />
          </div>
          <div
            className="tool_bar_dd_item h2"
            onClick={handleFormatHeading("h2")}
          >
            <span>Heading 2</span>
            <H2Icon />
          </div>
          <div
            className="tool_bar_dd_item h3"
            onClick={handleFormatHeading("h3")}
          >
            <span>Heading 3</span>
            <H3Icon />
          </div>
          <div
            className="tool_bar_dd_item h4"
            onClick={handleFormatHeading("h4")}
          >
            <span>Heading 4</span>
            <H4Icon />
          </div>
          <div
            className="tool_bar_dd_item p"
            onClick={handleFormatHeading("p")}
          >
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

      <div
        className="icon_button tool_bar heading"
      >
        <QuoteIcon />
        <span className="wysiwyg_tool_tip">Quote</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <DividerIcon />
        <span className="wysiwyg_tool_tip">Divider</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <AlignRIcon />
        <span className="wysiwyg_tool_tip">Align Right</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <AlignLIcon />
        <span className="wysiwyg_tool_tip">Align Left</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <AlignCIcon />
        <span className="wysiwyg_tool_tip">Align Center</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <JustifyIcon />
        <span className="wysiwyg_tool_tip">Justify Text</span>
      </div>
      <div
        className="icon_button tool_bar heading"
      >
        <MoreIcon />
        <span className="wysiwyg_tool_tip">More</span>
      </div>
    </div>
  );
};

export default ToolBar;
