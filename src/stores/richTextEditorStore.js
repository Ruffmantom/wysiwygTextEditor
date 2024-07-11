import { create } from "zustand";

export const richTextEditorStore = create((set) => ({
  paragraphDdOpen: false,
  highlightDdOpen: false,
  colorDdOpen: false,
  textAlignDdOpen: false,
  linkModalOpen: false,
  codeModalOpen: false,
  textSelection: '',
  currentSelectPosition: '',
  currentSelectStartPosition: '',
  currentSelectEndPosition: '',
  richTextEditorContent: '',
  setParaDdOpen: () => {
    set({ paragraphDdOpen: true });
  },
  setParaDdClose: () => {
    set({ paragraphDdOpen: false });
  },
  setHighlightDdOpen: () => {
    set({ highlightDdOpen: true });
  },
  setHighlightDdClose: () => {
    set({ highlightDdOpen: false });
  },
  setColorDdOpen: () => {
    set({ colorDdOpen: true });
  },
  setColorDdClose: () => {
    set({ colorDdOpen: false });
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
  setTextSelection: (payload) => {
    set({ textSelection: payload });
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

}));
