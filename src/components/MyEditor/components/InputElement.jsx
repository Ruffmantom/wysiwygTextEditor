import React, { useEffect, useRef } from "react";

const InputElement = ({ elm }) => {
  const textareaRef = useRef(null);
  // Construct the data attribute key
  const dataAttr = elm.data.key && `data-${elm.data.key}`;
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Get the computed styles of the textarea
      const computedStyle = window.getComputedStyle(textarea);
      const fontSize = parseInt(computedStyle.fontSize.split("p")[0]);
      console.log(fontSize);
      // Get the line-height from the computed styles
      const lineHeight = parseInt(computedStyle.lineHeight.split("p")[0]);
      console.log("Line Height: ",lineHeight);
      console.log("Scroll Height: ",textarea.scrollHeight);
      const adjustHeight = () => {
        textarea.style.height = "auto"; // Reset height to auto to shrink if needed
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
      };

      // Adjust height on initial render
      adjustHeight();

      // Adjust height on input change
      textarea.addEventListener("input", adjustHeight);

      // Cleanup the event listener on component unmount
      return () => textarea.removeEventListener("input", adjustHeight);
    }
  }, []);

  return (
    <textarea
      {...{ [dataAttr]: elm.data.value ? elm.data.value : "" }}
      data-position={elm.position}
      className={`editor ${elm.className}`}
      defaultValue={elm.value}
      ref={textareaRef}
      id={elm.elementId}
    ></textarea>
  );
};

export default InputElement;
