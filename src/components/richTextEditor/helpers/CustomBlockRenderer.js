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
  if (type === 'note') {
    return {
      component: NoteComponent,
      editable: true,
    }
  }
  return null;
};

const HRComponent = (props) => {
  return <hr className="custom_hr" />;
};
const NoteComponent = (props) => {
  return <div className='formatted_note'>

  </div>;
};
