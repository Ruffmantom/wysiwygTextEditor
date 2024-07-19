import React, { createContext, useContext, useState } from 'react';

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
    selectedText: "",
    toolBarColor: "", // string of what color is selected to highlight the tool
    toolBarBkgColor: "", // string of what color is selected to highlight the tool
    toolBarParagraph: "", // string of what the parent is
    richTextEditorContent: "",
    currentSelectPosition: "",
    currentSelectEndPosition: "",
    currentSelectStartPosition: "",
  });

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
        setParaDropDown,
        setHighlightDropDown,
        setColorDropDown,
        setLinkModal,
        setCodeModal,
        setTxtAlignDd,
        setSelectedText,
        setRichTextEditorContent,
        setCurrentSelectPosition,
        setCurrentStartAndEndPosition,
        setToolBarBoldActive,
        setToolBarItalicActive,
        setToolBarBkgColorActive,
        setToolBarBkgColor,
        setToolBarColorActive,
        setToolBarColor,
        setToolBarParagraph,
      }}
    >
      {children}
    </RichTextEditorContext.Provider>
  );
};
