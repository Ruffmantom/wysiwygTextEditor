import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import "./style.css";
import ContentEditable from "./components/ContentEditable";
import ToolBar from "./components/ToolBar";
import AddCode from "./components/AddCode";
import AddLink from "./components/AddLink";

const Wysiwyg = () => {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [fullContent, setFullContent] = useState("");
  const [selectedContent, setSelectedContent] = useState("");

 


  const onContentBlur = React.useCallback((evt) => {
    const sanitizeConf = {
      allowedTags: [
        "b",
        "i",
        "a",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "span",
        "pre",
        "code",
      ],
      allowedAttributes: { a: ["href"] },
    };

    setFullContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
  }, []);

  

  return (
    <div className="editable_container_cont">
      <ToolBar
        setFullContent={setFullContent}
        fullContent={fullContent}
        selectedContent={selectedContent}
        setCodeModalOpen={setCodeModalOpen}
        setLinkModalOpen={setLinkModalOpen}
      />
      {codeModalOpen ? <AddCode setCodeModalOpen={setCodeModalOpen} /> : ""}
      {linkModalOpen ? <AddLink setLinkModalOpen={setLinkModalOpen} /> : ""}

      <ContentEditable
      
        value={fullContent}
        // onBlur={onContentBlur}
        setSelectedContent={setSelectedContent}
        onChange={updatedContent => {
          setFullContent(updatedContent);
        }}
      />
    </div>
  );
};

export default Wysiwyg;
