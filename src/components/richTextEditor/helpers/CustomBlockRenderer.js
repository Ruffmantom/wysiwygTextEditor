import React from "react";
import { useRichTextEditor } from "../contexts/RichTextEditorContext";

const HRComponent = (props) => {
  return <hr className="custom_hr" />;
};

const LinkComponent = (props) => {
  const { contentState, entityKey } = props;
  const { label, url } = contentState.getEntity(entityKey).getData();

  console.log("from link component: " + label + " url: " + url);
  return (
    <a
      className="formatted_link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
};

export const blockRendererFn = (contentBlock) => {
// const {editorState} = useRichTextEditor()

  const type = contentBlock.getType();
  if (type === "hr") {
    return {
      component: HRComponent,
      editable: false,
    };
  }
  // if (type === "atomic") {
  //   const contentState = editorState.getCurrentContent();
  //   const entityKey = contentBlock.getEntityAt(0);
  //   if (entityKey) {
  //     const entityType = contentState.getEntity(entityKey).getType();
  //     if (entityType === "LINK") {
  //       return {
  //         component: LinkComponent,
  //         editable: false,
  //         props: {
  //           contentState,
  //           entityKey,
  //         },
  //       };
  //     }
  //   }
  // }
  return null;
};
