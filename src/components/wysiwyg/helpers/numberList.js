import { createId, setCursorInsideElement } from "./helpers";

export const createNewListItem = (addBreak) => {
  const newListItem = document.createElement("li");
  newListItem.dataset.id = createId();
  if (addBreak) newListItem.innerHTML = "<br>";
  newListItem.classList.add("formatted_li");
  return newListItem;
};

export const createNewNumberedList = (type, className, addBreak) => {
  const ol = document.createElement("ol");
  ol.classList.add("formatted_ol");
  if (className) ol.classList.add(className);
  ol.setAttribute('type', type);
  ol.dataset.id = createId();
  let listItem = createNewListItem(addBreak)
  // append list item
  ol.appendChild(listItem);
  return ol
}

export const handleNumberListTrigger = (e, timeoutRef, setInputBuffer, inputBuffer) => {
  const currentInput = inputBuffer + e.key;
  // includes works faster every time but could cause problems later down the road
  if (currentInput.includes("1.")) {
    e.preventDefault();
    triggerNumberList();
  } else {
    setInputBuffer(currentInput);
  }
  // Clear any existing timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  // Clear buffer after a timeout to avoid infinite accumulation of input
  timeoutRef.current = setTimeout(() => {
    setInputBuffer("");
  }, 500);
};

export const triggerNumberList = () => {
  console.log("triggerNumberList Hit!");
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const startNode = range.startContainer;
  // Find the paragraph or text node where the "1. " was typed
  let parentElement =
    startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
  console.log("Inside the triggerNumberList: ", parentElement);
  // Create a new ordered list
  const newNumberList = createNewNumberedList()
  // Insert the ordered list before the current parent element
  parentElement.parentNode.insertBefore(newNumberList, parentElement.nextSibling);
  // after inserting the sibling
  // Remove the "1. " parent
  if (
    parentElement.nodeName === "P" &&
    parentElement.textContent.includes("1")
  ) {
    parentElement.remove();
  }
  // Move the caret to the new list item
  setCursorInsideElement(newNumberList.firstChild)
  // Remove the parent element if it's now empty
  if (parentElement.textContent.trim() === "") {
    parentElement.parentNode.removeChild(parentElement);
  }
};
