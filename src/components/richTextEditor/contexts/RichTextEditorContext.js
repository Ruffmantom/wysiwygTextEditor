import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

import {
  EditorState,
  Modifier,
  RichUtils,
  ContentBlock,
  genKey,
  SelectionState,
} from "draft-js";

import { getSelectedText } from "../helpers/utils";

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
    editorState: EditorState.createEmpty(),
    selectedText: "",
    toolBarColor: "", // string of what color is selected to highlight the tool
    toolBarBkgColor: "", // string of what color is selected to highlight the tool
    toolBarParagraph: "", // string of what the parent is
    richTextEditorContent: "",
    currentSelectPosition: "",
    currentSelectEndPosition: "",
    currentSelectStartPosition: "",
  });

  const editorRef = useRef(null);

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const blurEditor = () => {
    if (editorRef.current) {
      console.log('unfocus editor')
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
      "#eb361e"
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

  // change text color
  const applyColor = (color) => {
    console.log("Changing color to: " + color);
    const COLOR_STYLES = [
      "#D0C031",
      "#D0481C",
      "#1B5E20",
      "#0D47A1",
      "#4A148C",
      "#D07C00",
      "#006064",
      "#B12917",
    ];

    const selection = state.editorState.getSelection();
    const nextContentState = COLOR_STYLES.reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, state.editorState.getCurrentContent());

    console.log("Got selection & content state: ", nextContentState);
    let nextEditorState = EditorState.push(
      state.editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = state.editorState.getCurrentInlineStyle();
    console.log("Current Style: ", currentStyle);

    if (selection.isCollapsed()) {
      console.log("Selection is collapsed");
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    if (!currentStyle.has(color)) {
      console.log("There is a current style");
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
    }

    console.log("Setting new state");
    setEditorState(nextEditorState);
  };

  // apply a background
  const applyBackgroundColor = (bgColor) => {
    const BG_COLOR_STYLES = [
      "#FFEB3B",
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#9C27B0",
      "#FF9800",
      "#00BCD4",
      "#eb361e",
    ];

    const selection = state.editorState.getSelection();
    const nextContentState = BG_COLOR_STYLES.reduce((contentState, bgColor) => {
      return Modifier.removeInlineStyle(contentState, selection, bgColor);
    }, state.editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      state.editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = state.editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, bgColor) => {
        return RichUtils.toggleInlineStyle(state, bgColor);
      }, nextEditorState);
    }

    if (!currentStyle.has(bgColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, bgColor);
    }

    setEditorState(nextEditorState);
  };

  // toggle block type
  const toggleBlockType = (blockType) => {
    const newEditorState = RichUtils.toggleBlockType(
      state.editorState,
      blockType
    );
    setState((prevState) => ({ ...prevState, editorState: newEditorState }));
    focusEditor();
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
    focusEditor();
  };


  // add link
  const addLink = (editorState, label, href) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: href }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let newContentState = Modifier.insertText(
      contentState,
      selection,
      label,
      null,
      entityKey
    );

    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
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

  const setSelectedText = (newState) => {
    setEditorState(newState);
    const selectedText = getSelectedText(newState);
    setState((prevState) => ({ ...prevState, selectedText: selectedText }));
  };

  const setRichTextEditorContent = (payload) => {
    setState((prevState) => ({ ...prevState, richTextEditorContent: payload }));
  };

  const setCurrentSelectPosition = (payload) => {
    setState((prevState) => ({ ...prevState, currentSelectPosition: payload }));
  };

  const setCurrentStartAndEndPosition = (payload) => {
    setState((prevState) => ({
      ...prevState,
      currentSelectStartPosition: payload.start,
      currentSelectEndPosition: payload.end,
    }));
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

  const setToolBarColorActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarColorActive: payload }));
  };

  const setToolBarColor = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarColor: payload }));
  };

  const setToolBarParagraph = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarParagraph: payload }));
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

  return (
    <RichTextEditorContext.Provider
      value={{
        ...state,
        addLink,
        isActive,
        editorRef,
        applyStyle,
        blurEditor,
        applyColor,
        focusEditor,
        setLinkModal,
        setCodeModal,
        setMoreToolDd,
        setEditorState,
        insertHrBlock,
        setParaDropDown,
        setToolBarColor,
        toggleBlockType,
        setSelectedText,
        clearFormatting,
        setColorDropDown,
        setToolBarBkgColor,
        setToolBarParagraph,
        applyBackgroundColor,
        setHighlightDropDown,
        setToolBarBoldActive,
        setToolBarColorActive,
        setToolBarItalicActive,
        setToolBarBkgColorActive,
        setRichTextEditorContent,
        setCurrentSelectPosition,
        setCurrentStartAndEndPosition,
      }}
    >
      {children}
    </RichTextEditorContext.Provider>
  );
};
