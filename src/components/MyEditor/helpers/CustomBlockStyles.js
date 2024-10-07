export const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case "INFO_ELEMENT":
      return "info_element";
    case "CODE_BLOCK":
      return "code_block_preview";
    case "HORIZONTAL_RULE":
      return "hr_component";
    default:
      break;
  }

  return null;
};
