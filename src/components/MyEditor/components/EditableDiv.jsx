import React, { useEffect, useRef, useState } from "react";

const EditableDiv = ({ elm }) => {
  const [state, setState] = useState("");
  const editorRef = useRef(null);
  const [editorRedoStack, setEditorRedoStack] = useState([])
  const [editorUndoStack, setEditorUndoStack] = useState([])

  const handleState = (event) => {
    event.preventDefault()
    console.log(editorRef.current.innerHTML); // Corrected to innerHTML instead of innerHtml
  };

  return (
    <>
      <div className="ce_block" data-id={elm._id}>
        <div className="ce_block_content">

          {elm.element === "headingOne" ? <h1
            ref={editorRef}
            contentEditable={true}
            className={`editable ${elm.className}`}
            onKeyUp={(e) => handleState(e)}
          >{elm.value}</h1> : null}

          {elm.element === "headingTwo" ? <h2
            ref={editorRef}
            contentEditable={true}
            className={`editable ${elm.className}`}
            onKeyUp={(e) => handleState(e)}
          >{elm.value}</h2> : null}

          {elm.element === "headingThree" ? <h3
            ref={editorRef}
            contentEditable={true}
            className={`editable ${elm.className}`}
            onKeyUp={(e) => handleState(e)}
          >{elm.value}</h3> : null}

          {elm.element === "plainText" ? <div
            ref={editorRef}
            contentEditable={true}
            className={`editable ${elm.className}`}
            onKeyUp={(e) => handleState(e)}
          >{elm.value}</div> : null}

        </div>
      </div>
    </>
  );
};

export default EditableDiv;