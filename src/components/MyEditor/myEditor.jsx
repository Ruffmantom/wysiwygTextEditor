import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import InputElement from "./components/InputElement";
import ImageElement from "./components/ImageElement";
import EditableDiv from "./components/EditableDiv";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const sampleData = [
 
  {
    _id: uid(),
    type: "text",
    element: "headingOne",
    className: "formatted_heading_one",
    value: "This is a Heading",
    position: 1,
    src: "",
    alt: "",
    data: {
      key: "heading",
      value: "one",
    },
    elementId: "",
  },
  {
    _id: uid(),
    type: "text",
    element: "headingTwo",
    className: "formatted_heading_two",
    value: "This is a sub heading!",
    position: 1,
    src: "",
    alt: "",
    data: {
      key: "",
      value: "",
    },
    elementId: "",
  },
  {
    _id: uid(),
    type: "text",
    element: "headingThree",
    className: "formatted_heading_three",
    value: "This is a sub sub heading",
    position: 1,
    src: "",
    alt: "",
    data: {
      key: "",
      value: "",
    },
    elementId: "",
  },
  {
    _id: uid(),
    type: "text",
    element: "plainText",
    className: "formatted_paragraph",
    value: "This is some text!",
    position: 1,
    src: "",
    alt: "",
    data: {
      key: "",
      value: "",
    },
    elementId: "",
  },
];

const MyEditor = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(sampleData || []);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const returnElement = (elm) => {
    if (elm.type === "text") {
      // return <InputElement key={elm._id} elm={elm} />;
      return <EditableDiv key={elm._id} elm={elm} />;
    } else if (elm.type === "image") {
      return <ImageElement key={elm._id} elm={elm} />;
    }
  };

  return (
    <div className="my_editor_cont">
      <p className={`placeholder ${editorState.length >= 1 ? "hide" : ""}`}>
        Start Typing...
      </p>

      <div
        className="my_editor"
        autoCorrect="true"
        // onClick={()=>initializeElement()}
      >
        {editorState && editorState.map((elm) => returnElement(elm))}
      </div>
    </div>
  );
};

export default MyEditor;
