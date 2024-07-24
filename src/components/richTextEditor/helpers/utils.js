export const getSelectedText = (editorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const anchorOffset = selectionState.getAnchorOffset();
  const focusKey = selectionState.getFocusKey();
  const focusOffset = selectionState.getFocusOffset();
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  let selectedText = "";
  blockMap.forEach((block) => {
    const key = block.getKey();
    if (key === anchorKey || key === focusKey) {
      const text = block.getText();
      const start = key === anchorKey ? anchorOffset : 0;
      const end = key === focusKey ? focusOffset : text.length;
      selectedText += text.slice(start, end);
    }
  });
  return selectedText;
};
