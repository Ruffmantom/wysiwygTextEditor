import React, { useState, useEffect } from "react";
import "./style.css";
import RichTextEditor from "./components/RichTextEditor";
import { richTextEditorStore } from "../../stores/richTextEditorStore";

const Wysiwyg = () => {
  const [fullContent, setFullContent] = useState("");
  const {  richTextEditorContent } = richTextEditorStore();

  useEffect(()=>{

  },[richTextEditorContent])
  return (
    <div className="editable_container_cont">
      <RichTextEditor />
      {/* <div className="output">
        <h3>HTML Output:</h3>
        {richTextEditorContent}
      </div> */}
    </div>
  );
};

export default Wysiwyg;
