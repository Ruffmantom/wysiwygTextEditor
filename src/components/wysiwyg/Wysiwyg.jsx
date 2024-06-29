import React, { useRef, useState } from "react";
import "./style.css";
//components
import TextFormatter from "./components/TextFormatter";
import ToolBar from "./components/ToolBar";
import AddCode from "./components/AddCode";

const Wysiwyg = () => {
  const containerRef = useRef(null);
  const [txtFormatterOpen, setTxtFormatterOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [textNodeSelection, setTextNodeSelection] = useState(null);
  const [textSelection, setTextSelection] = useState("");
  const [txtFormatterTop, setTxtFormatterTop] = useState("");
  const [txtFormatterLeft, setTxtFormatterLeft] = useState("");
  const [fullContent, setFullContent] = useState("");

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      // this will be needed when replacing
      const fullParentNode = selection.anchorNode.parentElement.outerHTML;
      console.log(selection)
      // this will be needed when replacing
    //   setTextNodeSelection(selection);
      setTextSelection(selection.toString());
      const range = selection.getRangeAt(0);
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;

      // Create a range to encompass the start of the selection
      const rangeClone = range.cloneRange();
      rangeClone.setStart(startContainer, startOffset);

      // Get the bounding client rect of the range
      const rect = rangeClone.getBoundingClientRect();
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      // Calculate start position in pixels relative to the container
      const startPositionX = rect.left - containerRect.left;
      const startPositionY = rect.top - containerRect.top;
      setTxtFormatterTop(startPositionY - 55);
      setTxtFormatterLeft(startPositionX);
      setTxtFormatterOpen(true);
    } else {
      setTextSelection("");
      setTxtFormatterOpen(false);
    }
  };

  const handleInput = () => {
    // Update fullContent state with the current content of the editable container
    const content = containerRef.current.innerHTML;
    setFullContent(content);
  };

  return (
    <div className="editable_container_cont">
        {/* {txtFormatterOpen && textSelection ? (
          <TextFormatter
            txtFormatterTop={txtFormatterTop}
            txtFormatterLeft={txtFormatterLeft}
          />
        ) : (
          ""
        )} */}
        <ToolBar textSelection={textSelection} setCodeModalOpen={setCodeModalOpen}/>
        {codeModalOpen ? <AddCode textSelection={textSelection} setCodeModalOpen={setCodeModalOpen}/>:""}
      <div
        ref={containerRef}
        contentEditable
        className="editable_container"
        onSelect={handleSelection}
        onInput={handleInput}
      >
        <h1>Place Content Here</h1>
        <p>You can type, add images, <span>links</span> and all sorts of stuff!😁</p>
      </div>
    </div>
  );
};

export default Wysiwyg;
