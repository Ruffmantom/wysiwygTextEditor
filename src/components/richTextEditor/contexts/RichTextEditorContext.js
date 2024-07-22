import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';

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
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };


  // clear format function
  const clearFormatting = () => {
    const contentState = state.editorState.getCurrentContent();
    const selection = state.editorState.getSelection();

    // Remove inline styles
    const stylesToRemove = ['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'];
    let newContentState = stylesToRemove.reduce((content, style) => {
      return Modifier.removeInlineStyle(content, selection, style);
    }, contentState);

    // Remove block type
    const newEditorState = EditorState.push(
      state.editorState,
      newContentState,
      'change-inline-style'
    );
    setEditorState(RichUtils.toggleBlockType(newEditorState, 'unstyled'));
    focusEditor();
  };

  // change text color
  const applyColor = (color) => {
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

    let nextEditorState = EditorState.push(
      state.editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = state.editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    if (!currentStyle.has(color)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        color
      );
    }

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
      'change-inline-style'
    );

    const currentStyle = state.editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, bgColor) => {
        return RichUtils.toggleInlineStyle(state, bgColor);
      }, nextEditorState);
    }

    if (!currentStyle.has(bgColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        bgColor
      );
    }

    setEditorState(nextEditorState);
  };

  // toggle block type
  const toggleBlockType = (blockType) => {
    const newEditorState = RichUtils.toggleBlockType(state.editorState, blockType);
    setState((prevState) => ({ ...prevState, editorState: newEditorState }));
    focusEditor();
  };

  const setParaDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, paragraphDdOpen: payload }));
  };

  const setEditorState = (payload) => { // this is the onChange Function
    setState((prevState) => ({ ...prevState, editorState: payload }));
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

  const setTxtAlignDd = (payload) => {
    setState((prevState) => ({ ...prevState, textAlignDdOpen: payload }));
  };

  const setSelectedText = (payload) => {
    setState((prevState) => ({ ...prevState, selectedText: payload }));
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

  return (
    <RichTextEditorContext.Provider
      value={{
        ...state,
        editorRef,
        applyColor,
        focusEditor,
        setLinkModal,
        setCodeModal,
        setTxtAlignDd,
        setEditorState,
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
