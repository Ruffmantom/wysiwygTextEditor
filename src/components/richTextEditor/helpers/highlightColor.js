export const handleHighlightText = (color) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  let chosenColor = color.replace("#", "").toLowerCase();
  let parentNode = selection.anchorNode.parentNode;
  // if color is none auto remove bkg span
  if (color === "none") {
    let tagContent = parentNode.textContent;
    parentNode.replaceWith(tagContent);
    return;
  }
  if (!selection || selection.isCollapsed) {
    // Create a new colored span element at the current cursor position
    const highlightBkg = document.createElement("span");
    // Add class
    highlightBkg.classList.add(`highlight_${chosenColor}`);

    // Create an empty text node inside the highlightBkg
    const textNode = document.createTextNode("\u200B"); // Zero-width space character

    highlightBkg.appendChild(textNode);
    range.insertNode(highlightBkg);

    // Adjust the range to place the cursor inside the new highlightBkg
    const newRange = document.createRange();
    newRange.setStart(textNode, 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else {
    // check if selected text is already colored. else color it
    let parentClassName = parentNode.classList.value;
    let tagClass = `highlight_${chosenColor}`;

    if (parentClassName === tagClass) {
      console.log(`True: ${parentClassName} === ${tagClass}`);
      // remove parent tag
      let tagContent = parentNode.textContent;
      console.log(tagContent);
      parentNode.replaceWith(tagContent);
    } else {
      console.log(`False: ${parentClassName} !== ${tagClass}`);
      // continue with format
      // check if the text already is colored

      console.log(
        "This text is already colored?: " +
          parentClassName.includes("highlight_")
      );
      if (parentClassName.includes("highlight_")) {
        // replace existing classname with new one
        console.log("parentNode: ", parentNode);
        console.log("parentClassName: ", parentClassName);
        console.log("tagClass: ", tagClass);
        parentNode.classList.replace(parentClassName, tagClass);
      } else {
        // Wrap the selected content with the new tag element
        // Create a new colored span element at the current cursor position
        const newElement = document.createElement("span");
        // Add class
        newElement.classList.add(tagClass);
        newElement.appendChild(range.extractContents());
        range.insertNode(newElement);
      }
    }
  }
};
