import React, { useRef, useState } from "react";

const EditableDiv = ({ elm }) => {
  const [state, setState] = useState("");
  const editorRef = useRef(null);
  
  const handleState = (event) => {
    console.log(editorRef.current.innerHTML); // Corrected to innerHTML instead of innerHtml
  };
  
  return (
    <div
      ref={editorRef}
      contentEditable={true}
      className=""
      onKeyUp={(e) => handleState(e)}
    >
      {elm.element === "headingOne" ? <h1>{elm.value}</h1> : ""}
      {elm.element === "headingTwo" ? <h2>{elm.value}</h2> : ""}
      {elm.element === "headingThree" ? <h3>{elm.value}</h3> : ""}
      {elm.element === "plainText" ? <p>{elm.value}</p> : ""}
    </div>
  );
};

export default EditableDiv;