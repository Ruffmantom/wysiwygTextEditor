import { create } from "zustand";

export const richTextEditorStore = create((set) => ({
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

  setParaDropDown: (payload) => {
    set({ paragraphDdOpen: payload });
  },
  setHighlightDropDown: (payload) => {
    set({ highlightDdOpen: payload });
  },
  setColorDropDown: (payload) => {
    set({ colorDdOpen: payload });
  },
  setLinkModal: (payload) => {
    set({ linkModalOpen: payload });
  },
  setCodeModal: (payload) => {
    set({ codeModalOpen: payload });
  },
  setTxtAlignDd: (payload) => {
    set({ textAlignDdOpen: payload });
  },
  setSelectedText: (payload) => {
    set({ selectedText: payload });
  },
  setRichTextEditorContent: (payload) => {
    set({ richTextEditorContent: payload });
  },
  setCurrentSelectPosition: (payload) => {
    set({ currentSelectPosition: payload });
  },
  setCurrentStartAndEndPosition: (payload) => {
    set({ currentSelectStartPosition: payload.start });
    set({ currentSelectEndPosition: payload.end });
  },
  // toolbar states
  setToolBarBoldActive: (payload) => {
    set({ toolBarBoldActive: payload });
  },
  setToolBarItalicActive: (payload) => {
    set({ toolBarItalicActive: payload });
  },
  setToolBarBkgColorActive: (payload) => {
    set({ toolBarBkgColorActive: payload });
  },
  setToolBarBkgColor: (payload) => {
    set({ toolBarBkgColor: payload });
  },
  setToolBarColorActive: (payload) => {
    set({ toolBarColorActive: payload });
  },
  setToolBarColor: (payload) => {
    set({ toolBarColor: payload });
  },
  setToolBarParagraph: (payload) => {
    set({ toolBarParagraph: payload });
  },
}));
