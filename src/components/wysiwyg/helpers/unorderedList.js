import { createId } from "./helpers";

export const handleUnorderedListTrigger = (e, timeoutRef, setInputBuffer, inputBuffer) => {
  const currentInput = inputBuffer + e.key;
  // includes works faster every time but could cause problems later down the road
  if (currentInput.startsWith("- ")) {
    e.preventDefault();
    triggerUnOrderedList();
  } else {
    setInputBuffer(currentInput);
  }
  // Clear any existing timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  // Clear buffer after a timeout to avoid infinite accumulation of input
  timeoutRef.current = setTimeout(() => {
    // console.log("Clear buffer");
    setInputBuffer("");
  }, 500);
};

export const createUnOrderedList = (className) => {
  const ul = document.createElement("ul");
  ul.dataset.id = createId();
  ul.classList.add("formatted_ul");
  if (className) ul.classList.add(className);
  const li = document.createElement("li");
  li.dataset.id = createId();
  li.classList.add("formatted_li");
  ul.appendChild(li);

  return ul
}

export const triggerUnOrderedList = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const startNode = range.startContainer;

  // Find the paragraph or text node where the "1. " was typed
  let parentElement =
    startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode : startNode;
  console.log("Inside the triggerUnorderedList: ", parentElement);

  // Create a new ordered list
  const newUnOrderedList = createUnOrderedList()

  // Insert the ordered list before the current parent element
  parentElement.parentNode.insertBefore(newUnOrderedList, parentElement.nextSibling);
  // after inserting the sibling
  // Remove the "1. " parent
  // console.log(parentElement.nodeName)
  if (
    parentElement.nodeName === "P" &&
    parentElement.textContent.includes("-")
  ) {
    parentElement.remove();
  }

  // Move the caret to the new list item
  const newRange = document.createRange();
  newRange.setStart(newUnOrderedList.firstChild, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  // Remove the parent element if it's now empty
  if (parentElement.textContent.trim() === "") {
    parentElement.parentNode.removeChild(parentElement);
  }

};
