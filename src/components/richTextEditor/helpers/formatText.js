export const handleHeading = (level) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (!selection || selection.isCollapsed) {
      // Create a new heading element at the current cursor position
      const heading = document.createElement(level);
      heading.innerHTML = "<br>"; // Ensure there's a line break inside the new heading
      range.deleteContents(); // Clear any existing content in the range
      range.insertNode(heading);

      // Adjust the range to place the cursor inside the new heading
      const newRange = document.createRange();
      newRange.setStart(heading.firstChild, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Check if the current selection is within a heading element
      let currentHeading = null;
      let parentNode = range.startContainer.parentNode;
      while (parentNode) {
        if (parentNode.tagName && parentNode.tagName.match(/^H[1-3]$/)) {
          currentHeading = parentNode;
          break;
        }
        parentNode = parentNode.parentNode;
      }

      if (currentHeading) {
        // Replace the current heading with the new heading level
        const newHeading = document.createElement(level);
        newHeading.innerHTML = currentHeading.innerHTML;
        currentHeading.parentNode.replaceChild(newHeading, currentHeading);
      } else {
        // No heading found, create a new heading element
        const heading = document.createElement(level);
        heading.appendChild(range.extractContents());
        range.insertNode(heading);
      }
    }
  };