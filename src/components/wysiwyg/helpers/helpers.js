import hljs from "highlight.js";
export const formatHeading = (headingType, selectedText) => { };
export const formatItalic = (fullContent, selectedText) => {
  const italicHtml = `<i>${selectedText}</i>`;
  console.log("formatItalic - fullContent: " + fullContent);
  console.log("formatItalic - selectedText: " + selectedText);
  let formattedContent = fullContent.replace(selectedText, italicHtml);
  console.log("formatItalic - formattedContent: " + formattedContent);
  return formattedContent;
};

export const formatBold = (fullContent, selectedText) => {
  const boldHTML = `<b>${selectedText}</b>`;
  console.log("formatBold - fullContent: " + fullContent);
  console.log("formatBold - selectedText: " + selectedText);
  let formattedContent = fullContent.replace(selectedText, boldHTML);
  console.log("formatBold - formattedContent: " + formattedContent);

  return formattedContent;
};

export const createId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";
  for (var i = 0; i <= 7; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

// create a new paragraph element
export const createNewParagraph = () => {
  const newParagraph = document.createElement("p");
  newParagraph.classList.add("align_left");
  newParagraph.dataset.id = createId();
  newParagraph.innerHTML = "<br>";
  return newParagraph;
};
// create a link element
export const createLinkElement = (linkData) => {
  const linkElement = document.createElement("a");
  linkElement.href = linkData.href;
  linkElement.textContent = linkData.label;
  linkElement.classList.add("formatted_link");
  linkElement.dataset.id = createId();
  linkElement.target = "_blank";

  return linkElement;
};

export const createCodeBlockElement = (language, code) => {
  const preElement = document.createElement("pre");
  const codeElement = document.createElement("code");

  codeElement.textContent = code;
  codeElement.className = `language-${language}`;
  preElement.appendChild(codeElement);

  // Apply syntax highlighting
  if (hljs) {
    hljs.highlightElement(codeElement);
  }

  return preElement;
};
// create new paragraph can set cursor
export const createParagraphAndSetCursor = (editorRef) => {
  const newParagraph = createNewParagraph();
  editorRef.current.appendChild(newParagraph);

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(newParagraph, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  // Ensure focus returns to the editor
  editorRef.current.focus();
};

export const setCursorInsideNewElement = (editorRef, newElement) => {
  editorRef.current.appendChild(newElement);

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(newElement, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
};

export const setCursorInsideElement = (element) => {
  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(element, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
};

export const setCursorAfterElement = (elementNode) => {
  const selection = window.getSelection();
  console.log(elementNode)
  console.log(selection)
  const newRange = document.createRange();
  newRange.setStartAfter(elementNode);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
};

export const createTabSpace = () => {
  const newSpan = document.createElement("span");
  newSpan.classList.add("formatted_tab_space");
  newSpan.dataset.id = createId();
  // newSpan.innerHTML = "<br>";
  return newSpan;
}