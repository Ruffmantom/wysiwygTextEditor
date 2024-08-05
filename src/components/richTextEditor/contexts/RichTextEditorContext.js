import React, { createContext, useContext, useState, useRef } from "react";
import {
  EditorState,
  Modifier,
  RichUtils,
  ContentBlock,
  genKey,
  SelectionState,
  CompositeDecorator,
} from "draft-js";
import LinkComponent from "../components/LinkComponent";
import CodeBlockComponent from "../components/CodeBlockComponent";
import HrComponent from "../components/HrComponent";
// Strategies
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

function findCodeBlockEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "CODE_BLOCK"
    );
  }, callback);
}

function findDividerLineEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "HORIZONTAL_RULE"
    );
  }, callback);
}

// Decorator to handle block rendering
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkComponent,
  },
  {
    strategy: findCodeBlockEntities,
    component: CodeBlockComponent,
  },
  {
    strategy: findDividerLineEntities,
    component: HrComponent,
  },
]);


// Declare the context
const RichTextEditorContext = createContext();
// use the context
export const useRichTextEditor = () => {
  return useContext(RichTextEditorContext);
};

export const RichTextEditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
);

const [state, setState] = useState({
  colorDdOpen: false,
  linkModalOpen: false,
  codeModalOpen: false,
  highlightDdOpen: false,
  textAlignDdOpen: false,
  paragraphDdOpen: false,
  toolBarBoldActive: false,
    toolBarColorActive: false,
    toolBarItalicActive: false,
    toolBarBkgColorActive: false,
    toolBarColor: "", // string of what color is selected to highlight the tool
    toolBarBkgColor: "", // string of what color is selected to highlight the tool
    toolBarParagraph: "", // string of what the parent is
    // link test
    urlValue: "",
    labelValue: "",
    codeLang: "javascript",
    codeValue: "",
  });

  // Official ref of the editor
  const editorRef = useRef(null);
  // Ref for the link input field
  const hrefRef = useRef(null);

  // focus the editor
  const focusEditor = () => {
    editorRef.current.focus();
  };
  // un focus the editor
  const blurEditor = () => {
    editorRef.current.blur();
  };

  // drop down state managers
  const setParaDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, paragraphDdOpen: payload }));
  };

  // background highlight drop down
  const setHighlightDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, highlightDdOpen: payload }));
  };

  // Font color drop down
  const setColorDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, colorDdOpen: payload }));
  };

  const setLinkModal = (payload) => {
    setState((prevState) => ({ ...prevState, linkModalOpen: payload }));
  };

  const setCodeModal = (payload) => {
    setState((prevState) => ({ ...prevState, codeModalOpen: payload }));
  };

  const setMoreToolDd = (payload) => {
    setState((prevState) => ({ ...prevState, textAlignDdOpen: payload }));
  };

  // value for the link modal
  const setUrlValue = (payload) => {
    setState((prevState) => ({ ...prevState, urlValue: payload }));
  };

  // value for the link modal
  const setLabelValue = (payload) => {
    setState((prevState) => ({ ...prevState, labelValue: payload }));
  };
  // Language value for the Code modal
  const setCodeLanguage = (payload) => {
    setState((prevState) => ({ ...prevState, codeLang: payload }));
  };

  // Code value for the Code modal
  const setCodeValue = (payload) => {
    setState((prevState) => ({ ...prevState, codeValue: payload }));
  };

  // clear format function
  const clearFormatting = () => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Remove inline styles
    const stylesToRemove = [
      "STRIKETHROUGH",
      "header-one",
      "header-two",
      "header-three",
      "header-four",
      "BOLD",
      "ITALIC",
      "UNDERLINE",
      "INFO_ELM",
      "MONOSPACE",
      "CODE",
      "#D0C031",
      "#D0481C",
      "#1B5E20",
      "#0D47A1",
      "#4A148C",
      "#D07C00",
      "#006064",
      "#B12917",
      "#FFEB3B",
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#9C27B0",
      "#FF9800",
      "#00BCD4",
      "#eb361e",
    ];
    let newContentState = stylesToRemove.reduce((content, style) => {
      return Modifier.removeInlineStyle(content, selection, style);
    }, contentState);

    // Remove block type
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(RichUtils.toggleBlockType(newEditorState, "unstyled"));
  };

  // toggle hr element
  const insertHrBlock = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Create a new code block with the selected language and code
    const contentStateWithEntity = contentState.createEntity(
      "HORIZONTAL_RULE",
      "IMMUTABLE"
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithText = Modifier.insertText(
      contentStateWithEntity,
      selectionState,
      " ", // Placeholder for the code block
      null,
      entityKey
    );

    const newEditorState = EditorState.push(
      editorState,
      contentStateWithText,
      "insert-characters"
    );

    return RichUtils.toggleBlockType(newEditorState, "HORIZONTAL_RULE");
  };

  // Function to insert code block
  function insertCodeBlock(editorState, code, language) {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Create a new code block with the selected language and code
    const contentStateWithEntity = contentState.createEntity(
      "CODE_BLOCK",
      "IMMUTABLE",
      { language, code }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithText = Modifier.insertText(
      contentStateWithEntity,
      selectionState,
      " ", // Placeholder for the code block
      null,
      entityKey
    );

    const newEditorState = EditorState.push(
      editorState,
      contentStateWithText,
      "insert-characters"
    );

    return RichUtils.toggleBlockType(newEditorState, "CODE_BLOCK");
  }

  // apply block or inline style
  const applyStyle = (e, style, method) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  // apply block or inline style
  const keyCodeApplyStyle = (style, method) => {
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // is active function
  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <RichTextEditorContext.Provider
      value={{
        ...state,
        hrefRef,
        isActive,
        editorRef,
        applyStyle,
        blurEditor,
        editorState,
        focusEditor,
        setUrlValue,
        setCodeValue,
        setLinkModal,
        setCodeModal,
        setLabelValue,
        setMoreToolDd,
        insertHrBlock,
        setEditorState,
        insertCodeBlock,
        setParaDropDown,
        setCodeLanguage,
        clearFormatting,
        setColorDropDown,
        keyCodeApplyStyle,
        setHighlightDropDown,
      }}
    >
      {children}
    </RichTextEditorContext.Provider>
  );
};
