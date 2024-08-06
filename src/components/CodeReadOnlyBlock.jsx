import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import the CSS file for styling
import { ReactComponent as CopyIcon } from "../assets/icons/copy.svg";

const CodeReadOnlyBlock = (props) => {
  const codeRef = useRef(null);
  // const { language, codeContent } = props.blockProps;
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { codeVal, codeLang } = entity.getData();

  const copyCode = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(codeVal)
      .then(() => {
        console.log('copied code!')
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    hljs.highlightElement(codeRef.current);
  }, [codeVal]);

  return (
    <div
      data-offset-key={props.offsetKey}
      className="formatted_code_block read_only"
    >
      <div className="code_block_header code_block_header_read_only">
        <p className="code_block_lang_text">{codeLang}</p>
        <button
          className="icon_button tool_bar"
          onClick={copyCode}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CopyIcon />
          <span className="wysiwyg_tool_tip">Copy Code</span>
        </button>
      </div>
      <pre className="code_block_cont">
        <code ref={codeRef} className={codeLang.toLowerCase()}>
          {codeVal && codeVal.trim()}
        </code>
      </pre>
    </div>
  );
};

export default CodeReadOnlyBlock;
