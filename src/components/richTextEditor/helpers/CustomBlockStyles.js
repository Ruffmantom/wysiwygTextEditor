export const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case "INFO_ELEMENT":
      return "info_element";
    case "code-block":
      return "code_block_preview";
    case "horizontal-rule":
      return "hr_component";
    default:
      break;
  }

  return null;
};
