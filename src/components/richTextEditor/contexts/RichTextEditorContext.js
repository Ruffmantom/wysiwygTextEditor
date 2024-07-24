import React, {
  createContext,
  useContext,
  useState,
  useRef,
} from "react";

import {
  EditorState,
  Modifier,
  RichUtils,
  ContentBlock,
  genKey,
  SelectionState,
  CompositeDecorator,
} from "draft-js";

import { getSelectedText } from "../helpers/utils";
import LinkComponent from "../components/LinkComponent";


function findLinkEntities(contentBlock, callback, contentState) {
  console.log("hit findLinkEntities")
  contentBlock.findEntityRanges(
    (character) => {
      console.log('Entity Character: ', character)
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkComponent,
  },
]);

const RichTextEditorContext = createContext();

export const useRichTextEditor = () => {
  return useContext(RichTextEditorContext);
};

export const RichTextEditorProvider = ({ children }) => {
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
    editorState: EditorState.createEmpty(decorator),
    selectedText: "",
    toolBarColor: "", // string of what color is selected to highlight the tool
    toolBarBkgColor: "", // string of what color is selected to highlight the tool
    toolBarParagraph: "", // string of what the parent is
  });

  const editorRef = useRef(null);

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const blurEditor = () => {
    if (editorRef.current) {
      console.log("unfocus editor");
      editorRef.current.blur();
    }
  };

 
  // clear format function
  const clearFormatting = () => {
    const contentState = state.editorState.getCurrentContent();
    const selection = state.editorState.getSelection();

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
      state.editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(RichUtils.toggleBlockType(newEditorState, "unstyled"));
  };

  // toggle hr element
  const insertHrBlock = () => {
    const contentState = state.editorState.getCurrentContent();
    const selectionState = state.editorState.getSelection();

    // Create a new ContentBlock for the <hr> element
    const hrBlock = new ContentBlock({
      key: genKey(),
      type: "hr",
      text: "",
    });

    // Create a new ContentBlock for the paragraph after the <hr>
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "unstyled",
      text: "",
    });

    const blockMap = contentState.getBlockMap();
    const blocksBefore = blockMap
      .toSeq()
      .takeUntil(
        (v) => v === contentState.getBlockForKey(selectionState.getStartKey())
      );
    const blocksAfter = blockMap
      .toSeq()
      .skipUntil(
        (v) => v === contentState.getBlockForKey(selectionState.getStartKey())
      )
      .rest();

    const newBlocks = blocksBefore
      .concat(
        [
          [
            contentState.getBlockForKey(selectionState.getStartKey()).getKey(),
            contentState.getBlockForKey(selectionState.getStartKey()),
          ],
          [hrBlock.getKey(), hrBlock],
          [newBlock.getKey(), newBlock],
        ],
        blocksAfter
      )
      .toOrderedMap();

    const newContentState = contentState.merge({
      blockMap: newBlocks,
      selectionBefore: selectionState,
      selectionAfter: SelectionState.createEmpty(newBlock.getKey()),
    });

    const newEditorState = EditorState.push(
      state.editorState,
      newContentState,
      "insert-fragment"
    );
    setEditorState(newEditorState);
  };

  const setEditorState = (payload) => {
    // this is the onChange Function
    setState((prevState) => ({ ...prevState, editorState: payload }));
  };

  const setParaDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, paragraphDdOpen: payload }));
  };

  const setHighlightDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, highlightDdOpen: payload }));
  };

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

  const setSelectedText = () => {
    const selectedText = getSelectedText(state.editorState);
    setState((prevState) => ({ ...prevState, selectedText: selectedText }));
  };

  // Toolbar states
  const setToolBarBoldActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBoldActive: payload }));
  };

  const setToolBarItalicActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarItalicActive: payload }));
  };

  const setToolBarBkgColorActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBkgColorActive: payload }));
  };

  const setToolBarBkgColor = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBkgColor: payload }));
  };


  // apply block or inline style
  const applyStyle = (e, style, method) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(state.editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(state.editorState, style));
  };

  // is active function
  const isActive = (style, method) => {
    if (method === "block") {
      const selection = state.editorState.getSelection();
      const blockType = state.editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = state.editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  // add custom link


  return (
    <RichTextEditorContext.Provider
      value={{
        ...state,
        isActive,
        editorRef,
        applyStyle,
        blurEditor,
        focusEditor,
        setLinkModal,
        setCodeModal,
        setMoreToolDd,
        setEditorState,
        insertHrBlock,
        setParaDropDown,
        setSelectedText,
        clearFormatting,
        setColorDropDown,
        setToolBarBkgColor,
        setHighlightDropDown,
        setToolBarBoldActive,
        setToolBarItalicActive,
        setToolBarBkgColorActive
      }}
    >
      {children}
    </RichTextEditorContext.Provider>
  );
};
