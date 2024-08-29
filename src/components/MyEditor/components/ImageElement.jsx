import React from "react";

const ImageElement = ({ elm }) => {
    // Construct the data attribute key
    const dataAttr = `data-${elm.data.key}`;

  return (
    <div {...{ [dataAttr]: elm.data.value }} data-position={elm.position}>
      <img src={elm.src} alt={elm.alt} />
    </div>
  );
};

export default ImageElement;
