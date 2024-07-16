export const handleColorText = (color) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let chosenColor = color.replace("#", "").toLowerCase();

    if (!selection || selection.isCollapsed) {
      // Create a new colored span element at the current cursor position
      const colorSpan = document.createElement("span");
      // Add class
      colorSpan.classList.add(`text_${chosenColor}`);

      // Create an empty text node inside the colorSpan
      const textNode = document.createTextNode("\u200B"); // Zero-width space character

      colorSpan.appendChild(textNode);
      range.insertNode(colorSpan);

      // Adjust the range to place the cursor inside the new colorSpan
      const newRange = document.createRange();
      newRange.setStart(textNode, 1);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // check if selected text is already colored. else color it
      let parentNode = selection.anchorNode.parentNode;
      const range = selection.getRangeAt(0);
      let parentClassName = parentNode.classList.value;
      let tagClass = `text_${chosenColor}`;

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
          "This text is already colored?: " + parentClassName.includes("text_")
        );
        if (parentClassName.includes("text_")) {
          // replace existing classname with new one
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