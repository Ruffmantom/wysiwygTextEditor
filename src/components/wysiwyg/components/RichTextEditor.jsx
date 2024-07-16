import React, { useRef, useState, useEffect } from "react";
import ToolBar from "./ToolBar";
import AddCode from "./AddCode";
import AddLink from "./AddLink";
import { richTextEditorStore } from "../../../stores/richTextEditorStore";
import "highlight.js/styles/github.css";
// helpers
import {
  createNewParagraph,
  setCursorInsideNewElement,
} from "../helpers/helpers";
import { formatAlign } from "../helpers/formatAlign";
import { handleBackspace } from "../helpers/handleBackspace";
import { handleTag } from "../helpers/createTag";
import { handleAddDivider } from "../helpers/addDivider";
import { handleColorText } from "../helpers/colorText";
import { handleHighlightText } from "../helpers/highlightColor";
import { handleNumberListTrigger } from "../helpers/numberList";
import { handleUnorderedListTrigger } from "../helpers/unorderedList";
import { handlePressEscape } from "../helpers/escapeActions";
import { handleHeading } from "../helpers/formatText";
import { createLink } from "../helpers/createLink";
import { createCodeBlock } from "../helpers/createCodeBlock";
import { handleTab } from "../helpers/handleTab";
import { toolBarListener } from '../helpers/toolBarListener'
import { handleEnterKey } from '../helpers/enterActions'
export default function RichTextEditor() {
  const [inputBuffer, setInputBuffer] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef(null);
  const timeoutRef = useRef(null); // Use ref to store the timeout ID

  // state
  const {
    codeModalOpen,
    linkModalOpen,
    setRichTextEditorContent,
    setLinkModal,
    setCodeModal,
    setCurrentSelectPosition,
    currentSelectPosition,
    currentSelectStartPosition,
    currentSelectEndPosition,
    setCurrentStartAndEndPosition,

    setToolBarBoldActive,
    setToolBarItalicActive,
    setToolBarBkgColorActive,
    setToolBarBkgColor,
    setToolBarColorActive,
    setToolBarColor,
    setToolBarParagraph,
  } = richTextEditorStore();

  // handle key down functions
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEnterKey()
    }
    if (e.key === "Escape") {
      handlePressEscape(editorRef);
    }
    if (e.key === "Escape") {
      handlePressEscape(editorRef);
    }
    if (e.key === "Backspace") {
      backspace();
    } else {
      // list triggers
      handleNumberListTrigger(e, timeoutRef, setInputBuffer, inputBuffer);
      handleUnorderedListTrigger(e, timeoutRef, setInputBuffer, inputBuffer);
      handleTab(e);
    }
    // save to state with every key down
    setRichTextEditorContent(editorRef.current.innerHTML);
    toolBarListener(
      setToolBarBoldActive,
      setToolBarItalicActive,
      setToolBarBkgColorActive,
      setToolBarBkgColor,
      setToolBarColorActive,
      setToolBarColor,
      setToolBarParagraph,
    )
  };

  // on load
  useEffect(() => {
    // on focus create a paragraph tag
    const handleFocus = () => {
      if (editorRef.current.innerHTML.trim() === "") {
        const newParagraph = createNewParagraph();
        setCursorInsideNewElement(editorRef, newParagraph);
      }
    };

    const editor = editorRef.current;
    editor.addEventListener("focus", handleFocus);

    return () => {
      editor.removeEventListener("focus", handleFocus);
    };
  }, []);

  // need to refocus the editor before or after actions have been done
  const focusEditor = () => {
    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  // Action: align content
  const handleAlignFormat = (e, align) => {
    focusEditor();
    formatAlign(e, align);
    focusEditor();
  };

  // Action: Create a paragraph when editor is empty and backspacing
  const backspace = () => {
    // add a check when backspace is pressed
    // if inside the last child element and prevent default of backspacing
    handleBackspace(editorRef);
    focusEditor();
  };

  // Action: Create b, i, and quote
  const handleCreateNewTag = (tag) => {
    handleTag(tag);
    focusEditor();
  };

  // Action: Format line to be a Heading or paragraph
  const createHeadings = (tag) => {
    focusEditor();
    handleHeading(tag);
    focusEditor();
  };

  // Action Create Quote
  const createDivider = () => {
    handleAddDivider(editorRef);
    focusEditor();
  };

  // Action: Change Color of text
  const createColor = (color) => {
    focusEditor();
    handleColorText(color);
    focusEditor();
  };

  // Action: Give text a highlight color
  const createHighlight = (color) => {
    focusEditor();
    handleHighlightText(color);
    focusEditor();
  };

  // link Trigger
  const handleTriggerAddLink = () => {
    focusEditor();
    const selection = window.getSelection();
    // console.log("Original Selection: ", selection);
    const range = selection.getRangeAt(0);
    // set modal open
    setLinkModal(true);
    // if there is selected text then send it as the label
    let startSelection = range.startOffset;
    let endSelection = range.endOffset;
    if (selection.anchorOffset >= 1) {
      let sel = selection.anchorNode.data.slice(startSelection, endSelection);
      setSelectedText(sel);
    }
    // set location
    if (selection.anchorNode.parentNode.dataset.id !== undefined) {
      setCurrentSelectPosition(selection.anchorNode.parentElement.dataset.id);
      console.log(selection.anchorNode.parentElement.dataset);
    } else {
      setCurrentSelectPosition(selection.anchorNode.dataset.id);
      console.log(selection.anchorNode.dataset.id);
    }

    setCurrentStartAndEndPosition({
      start: startSelection,
      end: endSelection,
    });
  };
  // create Links
  const createLinks = (linkData) => {
    createLink(
      linkData,
      editorRef,
      currentSelectPosition,
      currentSelectStartPosition,
      currentSelectEndPosition
    );
    focusEditor();
    // reset state back to default
    setSelectedText("");
    setCurrentSelectPosition("");
    setCurrentStartAndEndPosition({ start: "", end: "" });
  };

  // Add Code Trigger
  const handleTriggerAddCode = () => {
    focusEditor();
    const selection = window.getSelection();
    if (selection) {
      // console.log("Original Selection: ", selection)
      const range = selection.getRangeAt(0);
      // set modal open
      setCodeModal(true);
      // if there is selected text then send it as the label
      if (selection && selection.rangeCount > 0) {
        // console.log(range)
        let startSelection = range.startOffset;
        let endSelection = range.endOffset;
        let sel = "";
        if (
          selection.rangeCount > 0 &&
          startSelection > 0 &&
          endSelection > 0
        ) {
          sel = selection.anchorNode.data.slice(startSelection, endSelection);
        }
        setSelectedText(sel);
      }
      console.log(selection);
      // set location
      if (selection.anchorNode.dataset) {
        setCurrentSelectPosition(selection.anchorNode.dataset.id);
      } else {
        setCurrentSelectPosition(selection.anchorNode.parentElement.dataset.id);
      }

      setCurrentStartAndEndPosition({
        start: range.startOffset,
        end: range.endOffset,
      });
    }
  };

  const createCodeBlocks = (language, codeContent) => {
    createCodeBlock(
      editorRef,
      currentSelectPosition,
      language,
      codeContent,
      currentSelectStartPosition,
      currentSelectEndPosition
    );
    // Reset state back to default
    setSelectedText("");
    setCurrentSelectPosition("");
    setCurrentStartAndEndPosition({ start: "", end: "" });

    // Ensure focus returns to the editor
    editorRef.current.focus();
  };

  // return the editor
  return (
    <div className="rich_text_editor">
      {codeModalOpen ? <AddCode createCodeBlocks={createCodeBlocks} /> : ""}
      {linkModalOpen ? (
        <AddLink selectedText={selectedText} createLinks={createLinks} />
      ) : (
        ""
      )}
      <ToolBar
        handleCreateNewTag={handleCreateNewTag}
        handleAlignFormat={handleAlignFormat}
        createHeadings={createHeadings}
        createColor={createColor}
        createHighlight={createHighlight}
        createDivider={createDivider}
        handleTriggerAddLink={handleTriggerAddLink}
        handleTriggerAddCode={handleTriggerAddCode}
      />
      <div
        ref={editorRef}
        className="editable_container"
        contentEditable
        aria-multiline="true"
        spellCheck="true"
        role="textbox"
        // dangerouslySetInnerHTML={{ __html: content }}
        onKeyDown={handleKeyDown}
      ></div>
    </div>
  );
}
