// import React from "react";

// const HRComponent = (props) => {
//   return <hr className="custom_hr" />;
// };

// export const blockRendererFn = (contentBlock) => {
//   const type = contentBlock.getType();
//   if (type === "hr") {
//     return {
//       component: HRComponent,
//       editable: false,
//     };
//   }

//   return null;
// };

import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import a highlight.js theme

const CodeBlock = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { language, codeContent } = entity.getData();

  const highlightedCode = hljs.highlight(language, codeContent).value;

  return (
    <pre className="code-block">
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

const blockRendererFn = (block) => {
  if (block.getType() === 'atomic') {
    const contentState = block.getEntityAt(0);
    if (contentState) {
      const entity = block.getEntityAt(0);
      const entityType = entity.getType();
      if (entityType === 'CODE_BLOCK') {
        return {
          component: CodeBlock,
          editable: false,
        };
      }
    }
  }
  return null;
};

export { CodeBlock, blockRendererFn };
