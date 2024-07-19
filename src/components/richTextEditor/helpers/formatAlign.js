export const formatAlign = ( e, alignment) => {
  e.preventDefault();
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const newClassName = `align_${alignment}`;
    const defaultClassName = "align_left";

    const applyAlignmentClass = (element) => {
      if (element.nodeType === Node.TEXT_NODE) {
        element = element.parentNode;
      }
      if (element.classList.contains(newClassName)) {
        element.classList.replace(newClassName, defaultClassName);
      } else {
        element.classList.remove(
          ...Array.from(element.classList).filter((className) =>
            className.startsWith("align_")
          )
        );
        element.classList.add(newClassName);
      }
    };

    if (range.startContainer === range.endContainer) {
      // Single line selection
      let startNode = range.startContainer;
      if (startNode.nodeType === Node.TEXT_NODE) {
        startNode = startNode.parentNode;
      }
      applyAlignmentClass(startNode);
    } else {
      // Multi-line selection
      const selectedElements = [];
      const treeWalker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            if (range.intersectsNode(node)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          },
        }
      );

      while (treeWalker.nextNode()) {
        selectedElements.push(treeWalker.currentNode);
      }

      selectedElements.forEach((element) => {
        applyAlignmentClass(element);
      });
    }

    console.log("After applying classes");
  }
};
