import React, { useEffect } from "react";
// helpers
import BoldTool from "./toolbarTools/BoldTool";
import ItalicTool from "./toolbarTools/ItalicTool";
import HighlightTool from "./toolbarTools/HighlightTool";
import ColorTextTool from "./toolbarTools/ColorTextTool";
import ParagraphTool from "./toolbarTools/ParagraphTool";
import MoreTools from "./toolbarTools/MoreTools";
import AddLinkTool from "./toolbarTools/AddLinkTool";
import AddCodeTool from "./toolbarTools/AddCodeTool";
import AddQuoteTool from "./toolbarTools/AddQuoteTool";
import AddDividerTool from "./toolbarTools/AddDividerTool";
import OrderedListTool from "./toolbarTools/OrderedListTool"
import UnorderedListTool from "./toolbarTools/UnorderedListTool";
import InfoTool from "./toolbarTools/InfoTool";
import MonoSpaceTool from "./toolbarTools/MonoSpaceTool";
import UndoTool from "./toolbarTools/UndoTool";
import RedoTool from "./toolbarTools/RedoTool";
/*

tool options: {
            bold: true,
            italic: true,
            highlight: true,
            color: true,
            headings: true,
            other: {
              underline: true,
              strikeThrough: true,
              removeFormats: true
            },
            link: true,
            code: true,
            quote: true,
            divider: true,
            orderedList:true,
            unorderedList:true,
            info:true,
            monospace:true,

          }
*/


const ToolBar = ({ options, handleEditorChange }) => {

 // Ensure other has a default structure if options.other is not provided
 const { more = {} } = options;

  return (
    <div className="wysiwyg_tool_bar">
      {options.bold || !options ? <BoldTool handleEditorChange={handleEditorChange} /> : ""}
      {options.italic || !options ? <ItalicTool handleEditorChange={handleEditorChange} /> : ""}
      {options.monospace || !options ? <MonoSpaceTool handleEditorChange={handleEditorChange} /> : ""}
      {options.highlight || options.color || options.headings ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.highlight || !options ? <HighlightTool handleEditorChange={handleEditorChange} /> : ""}
      {options.color || !options ? <ColorTextTool handleEditorChange={handleEditorChange} /> : ""}
      {options.headings || !options ? <ParagraphTool handleEditorChange={handleEditorChange} /> : ""}
      {
        more.underline ||
        more.strikeThrough ||
        more.removeFormats ||
        !options ? <MoreTools options={options} handleEditorChange={handleEditorChange} /> : ""
      }
      {options.undoRedo || !options ? <UndoTool handleEditorChange={handleEditorChange} /> : ""}
      {options.undoRedo || !options ? <RedoTool handleEditorChange={handleEditorChange} /> : ""}
      {options.link || options.code || options.quote || options.divider ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.info || !options ? <InfoTool handleEditorChange={handleEditorChange} /> : ""}
      {options.link || !options ? <AddLinkTool handleEditorChange={handleEditorChange} /> : ""}
      {options.code || !options ? <AddCodeTool handleEditorChange={handleEditorChange} /> : ""}
      {options.quote || !options ? <AddQuoteTool handleEditorChange={handleEditorChange} /> : ""}
      {options.divider || !options ? <AddDividerTool handleEditorChange={handleEditorChange} /> : ""}
      {options.orderedList || !options ? <OrderedListTool handleEditorChange={handleEditorChange} /> : ""}
      {options.unorderedList || !options ? <UnorderedListTool handleEditorChange={handleEditorChange} /> : ""}
    </div>
  );
};

export default ToolBar;
