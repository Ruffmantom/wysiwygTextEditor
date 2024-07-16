// goal
/*
 keep track of where the cursor is and if it is inside an element that is defined, then highlight the tool

*/

export const toolBarListener = (
  setToolBarBoldActive,
  setToolBarItalicActive,
  setToolBarBkgColorActive,
  setToolBarBkgColor,
  setToolBarColorActive,
  setToolBarColor,
  setToolBarParagraph
) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  console.log(range.startContainer.parentElement.nodeName === "SPAN");
  console.log(range.startContainer.parentElement.classList);
  // **** mark colored text
  if (
    range.startContainer.parentElement.nodeName === "SPAN" &&
    range.startContainer.parentElement.classList.contains("text_")
  ) {
    let color = range.startContainer.parentElement.classList.split("_")[1];
    setToolBarColor(color);
  } else {
    setToolBarColor("");
  }
};
