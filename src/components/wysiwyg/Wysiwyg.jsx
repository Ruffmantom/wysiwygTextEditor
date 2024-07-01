import React, { useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import "./style.css";
import ContentEditable from 'react-contenteditable';
import ToolBar from "./components/ToolBar";
import AddCode from "./components/AddCode";
import AddLink from "./components/AddLink";

const Wysiwyg = () => {
  const containerRef = useRef(null);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [fullContent, setFullContent] = useState("");

  const onContentBlur = React.useCallback(evt => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p", "h1", "h2", "h3", "h4", "h5", "span", "pre", "code"],
      allowedAttributes: { a: ["href"] }
    };

    setFullContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
  }, []);

  return (
    <div className="editable_container_cont">
      <ToolBar
        containerRef={containerRef}
        setCodeModalOpen={setCodeModalOpen}
        setLinkModalOpen={setLinkModalOpen}
      />
      {codeModalOpen ? <AddCode setCodeModalOpen={setCodeModalOpen} /> : ""}
      {linkModalOpen ? <AddLink setLinkModalOpen={setLinkModalOpen} /> : ""}

      <ContentEditable
        innerRef={containerRef}
        className="editable_container"
        onBlur={onContentBlur}
        html={fullContent}
        onChange={(e) => setFullContent(e.target.value)}
      />
    </div>
  );
};

export default Wysiwyg;
