import React, { useEffect, useRef } from "react";
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
import { ReactComponent as ClearFormatIcon } from "../../../assets/icons/clearFormat.svg";
import { ReactComponent as QuoteIcon } from "../../../assets/icons/quote.svg";
import { ReactComponent as HighlightIcon } from "../../../assets/icons/highlight.svg";
import { ReactComponent as FontcolorIcon } from "../../../assets/icons/fontcolor.svg";
import { ReactComponent as DividerIcon } from "../../../assets/icons/divider.svg";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more-v.svg";
// state
import { richTextEditorStore } from "../../../stores/richTextEditorStore";
// helpers
import { clearFormat } from '../helpers/clearFormat'

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
  handleAlignFormat,
  createHeadings,
  createColor,
  createHighlight,
  createDivider,
  handleTriggerAddCode,
  handleCreateNewTag,
  handleTriggerAddLink,
}) => {
  // const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMac = navigator.userAgent.toLowerCase().includes("macintosh");
  const {
    paragraphDdOpen,
    highlightDdOpen,
    colorDdOpen,
    textAlignDdOpen,
    // drop down actions
    setParaDdOpen,
    setParaDdClose,
    setHighlightDdOpen,
    setHighlightDdClose,
    setColorDdOpen,
    setColorDdClose,
    setTxtAlignDd,
    // modal actions
    setLinkModal,
    setCodeModal,
    // toolbar state
    toolBarBoldActive,
    toolBarItalicActive,
    toolBarBkgColorActive,
    toolBarBkgColor,
    toolBarColorActive,
    toolBarColor,
    toolBarParagraph,
  } = richTextEditorStore();

  const paragraphDropDownRef = useRef(null);
  const highlightColorDropDownRef = useRef(null);
  const colorDropDownRef = useRef(null);
  const txtAlignDropDownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      paragraphDropDownRef.current &&
      !paragraphDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setParaDdClose();
    }
    if (
      highlightColorDropDownRef.current &&
      !highlightColorDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setHighlightDdClose();
    }
    if (
      colorDropDownRef.current &&
      !colorDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setColorDdClose();
    }
    if (
      txtAlignDropDownRef.current &&
      !txtAlignDropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setTxtAlignDd(false);
    }
  };

  const handleHighlightClick = (e, color) => {
    e.preventDefault();
    // console.log("clicked color: " + color);
    createHighlight(color);
    // close drop down
    setHighlightDdClose();
  };

  const handleTxtColorClick = (e, color) => {
    e.preventDefault();
    // console.log("clicked color: " + color);
    createColor(color);
    // close drop down
    setColorDdClose();
  };

  // if click outside of dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);

  return (
    <div className="wysiwyg_tool_bar">
      <button
        className="icon_button tool_bar"
        onClick={() => handleCreateNewTag('b')}
      >
        <BoldIcon />
        <span className="wysiwyg_tool_tip">
          Bold{" "}
          <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
        </span>
      </button>
      <button
        className="icon_button tool_bar"
        onClick={() => handleCreateNewTag("i")}
      >
        <ItalicIcon />
        <span className="wysiwyg_tool_tip">
          Italic{" "}
          <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
        </span>
      </button>

      <div className="wysiwyg_tool_bar_divider"></div>

      <div className="icon_button tool_bar tool_bar_dd">
        <button
          className="btn_overlay"
          onClick={() =>
            highlightDdOpen ? setHighlightDdClose() : setHighlightDdOpen()
          }
        ></button>
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
              <button
                key={c}
                className="color_swatch"
                onClick={(e) => handleHighlightClick(e, c)}
                style={{ backgroundColor: c }}
              ></button>
            ))}
          </div>
          <div className="tool_bar_dd_item p center">
            <button onClick={(e) => handleHighlightClick(e, "none")}>
              None
            </button>
          </div>
        </div>
      </div>

      <div className="icon_button tool_bar tool_bar_dd">
        <button
          className="btn_overlay"
          style={{
            outline: toolBarColor !== "" ? `2px solid #${toolBarColor}` : "",
          }}
          onClick={() => setColorDdOpen()}
        ></button>
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
              <button
                key={c}
                className="color_swatch"
                onClick={(e) => handleTxtColorClick(e, c)}
                style={{ backgroundColor: c }}
              ></button>
            ))}
          </div>
          <div className="tool_bar_dd_item p center">
            <button onClick={(e) => handleTxtColorClick(e, "auto")}>
              Automatic
            </button>
          </div>
        </div>
      </div>

      <div className="icon_button tool_bar tool_bar_dd">
        <button
          className="btn_overlay"
          onClick={() => setParaDdOpen()}
        ></button>
        <p>Paragraph</p>
        <div
          className={`tool_bar_dd_content ${paragraphDdOpen ? "active" : ""}`}
          ref={paragraphDropDownRef}
        >
          <button
            className="tool_bar_dd_item h1"
            onClick={() => createHeadings("h1")}
          >
            <span>Heading 1</span>
            <H1Icon />
          </button>
          <button
            className="tool_bar_dd_item h2"
            onClick={() => createHeadings("h2")}
          >
            <span>Heading 2</span>
            <H2Icon />
          </button>
          <button
            className="tool_bar_dd_item h3"
            onClick={() => createHeadings("h3")}
          >
            <span>Heading 3</span>
            <H3Icon />
          </button>
          <button
            className="tool_bar_dd_item h4"
            onClick={() => createHeadings("h4")}
          >
            <span>Heading 4</span>
            <H4Icon />
          </button>
          <button
            className="tool_bar_dd_item p"
            onClick={() => createHeadings("p")}
          >
            <span>Paragraph</span>P
          </button>
        </div>
      </div>

      <div className="icon_button tool_bar tool_bar_dd icon">
        <button
          className="btn_overlay"
          onClick={() => setTxtAlignDd(true)}
        ></button>
        <div className="icon_button tool_bar heading">
          <MoreIcon />
          <span className="wysiwyg_tool_tip">More</span>
        </div>
        <div
          className={`tool_bar_dd_content icons ${
            textAlignDdOpen ? "active" : ""
          }`}
          ref={txtAlignDropDownRef}
        >
          <button
            className="icon_button tool_bar"
            onClick={() => handleCreateNewTag("u")}
          >
            <UnderlineIcon />
            <span className="wysiwyg_tool_tip">
              Underline{" "}
              <span className="key_command">
                {isMac ? "cmd + u" : "ctrl + u"}
              </span>
            </span>
          </button>

          <button
            className="icon_button tool_bar"
            onClick={() => handleCreateNewTag("s")}
          >
            <StrikeIcon />
            <span className="wysiwyg_tool_tip">
              Strike Through{" "}
              <span className="key_command">
                {isMac ? "cmd + shift + s" : "ctrl + shift + s"}
              </span>
            </span>
          </button>
          
          <button
            className="icon_button tool_bar"
            onClick={() => clearFormat()}
          >
            <ClearFormatIcon />
            <span className="wysiwyg_tool_tip">
             Clear Format{" "}
              <span className="key_command">
                {isMac ? "cmd + \\" : "ctrl + \\"}
              </span>
            </span>
          </button>

          
        </div>
      </div>
      <div className="wysiwyg_tool_bar_divider"></div>
      <button
        className="icon_button tool_bar heading"
        onClick={() => handleTriggerAddLink()}
      >
        <LinkIcon />
        <span className="wysiwyg_tool_tip">Link</span>
      </button>
      <button
        className="icon_button tool_bar heading"
        onClick={() => handleTriggerAddCode()}
      >
        <CodeIcon />
        <span className="wysiwyg_tool_tip">Code Block</span>
      </button>

      <button
        className="icon_button tool_bar heading"
        onClick={() => handleCreateNewTag("blockquote")}
      >
        <QuoteIcon />
        <span className="wysiwyg_tool_tip">Quote</span>
      </button>

      <button
        className="icon_button tool_bar heading"
        onClick={() => createDivider()}
      >
        <DividerIcon />
        <span className="wysiwyg_tool_tip">Divider</span>
      </button>
    </div>
  );
};

export default ToolBar;
