// CustomBlockRenderer.js
import React from 'react';

export const blockRendererFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'hr') {
    return {
      component: HRComponent,
      editable: false,
    };
  }
  return null;
};

const HRComponent = (props) => {
  return <hr className="custom_hr" />;
};
