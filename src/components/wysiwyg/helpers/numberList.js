export const handleNumberListTrigger = (e, timeoutRef, setInputBuffer, inputBuffer) => {
  // console.log("handle Number List Trigger Hit!")
  const currentInput = inputBuffer + e.key;
  // console.log(currentInput)
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
    // console.log("Clear buffer");
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
  const ol = document.createElement("ol");
  ol.classList.add("formatted_ol");
  const li = document.createElement("li");
  li.classList.add("formatted_li");
  li.innerHTML = "<br>"; // Add a placeholder for the list item
  ol.appendChild(li);

  // Insert the ordered list before the current parent element
  parentElement.parentNode.insertBefore(ol, parentElement.nextSibling);
  // after inserting the sibling
  // Remove the "1. " parent
  // console.log(parentElement.nodeName)
  if (
    parentElement.nodeName === "P" &&
    parentElement.textContent.includes("1")
  ) {
    parentElement.remove();
  }

  // Move the caret to the new list item
  const newRange = document.createRange();
  newRange.setStart(li, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  // Remove the parent element if it's now empty
  if (parentElement.textContent.trim() === "") {
    parentElement.parentNode.removeChild(parentElement);
  }


};
