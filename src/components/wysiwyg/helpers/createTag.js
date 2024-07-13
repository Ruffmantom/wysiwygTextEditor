import { createId } from "./helpers";

export const handleTag = (tag) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    if (selection && selection.anchorNode) {
      let parentNode = selection.anchorNode.parentNode;
      let parentName = parentNode.tagName.toLowerCase();
      const range = selection.getRangeAt(0);

      if (parentName === tag) {
        // Remove parent tag and keep its content
        let tagContent = document.createDocumentFragment();
        while (parentNode.firstChild) {
          tagContent.appendChild(parentNode.firstChild);
        }
        parentNode.replaceWith(tagContent);
      } else {
        // Wrap the selected content with the new tag element
        const newElement = document.createElement(tag);
        newElement.dataset.id = createId();

        newElement.appendChild(range.extractContents());
        range.insertNode(newElement);
      }
    }
  };