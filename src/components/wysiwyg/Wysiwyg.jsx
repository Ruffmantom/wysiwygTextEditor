import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import "./style.css";
import RichTextEditor from "./components/RichTextEditor";
import AddCode from "./components/AddCode";
import AddLink from "./components/AddLink";
import { richTextEditorStore } from "../../stores/richTextEditorStore";

const Wysiwyg = () => {
  const [fullContent, setFullContent] = useState("");

  const { codeModalOpen, linkModalOpen } = richTextEditorStore();

  return (
    <div className="editable_container_cont">
      {codeModalOpen ? <AddCode /> : ""}
      {linkModalOpen ? <AddLink /> : ""}

      <RichTextEditor
        value={fullContent}
        onChange={(updatedContent) => {
          setFullContent(updatedContent);
        }}
      />
    </div>
  );
};

export default Wysiwyg;
