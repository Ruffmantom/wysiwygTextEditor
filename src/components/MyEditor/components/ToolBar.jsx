import React from "react";
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


const ToolBar = ({ options, handleEditorChange}) => {


  return (
    <div className="wysiwyg_tool_bar">
      {options.bold || !options ? <BoldTool handleEditorChange={handleEditorChange} /> : ""}
      {options.italic || !options ? <ItalicTool /> : ""}
      {options.monospace || !options ? <MonoSpaceTool /> : ""}
      {options.highlight || options.color || options.headings ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.highlight || !options ? <HighlightTool /> : ""}
      {options.color || !options ? <ColorTextTool /> : ""}
      {options.headings || !options ? <ParagraphTool /> : ""}
      {
        options.other.underline ||
          options.other.strikeThrough ||
          options.other.removeFormats || !options ? <MoreTools options={options} /> : ""
      }
      {options.link || options.code || options.quote || options.divider ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.info || !options ? <InfoTool /> : ""}
      {options.link || !options ? <AddLinkTool /> : ""}
      {options.code || !options ? <AddCodeTool /> : ""}
      {options.quote || !options ? <AddQuoteTool /> : ""}
      {options.divider || !options ? <AddDividerTool /> : ""}
      {options.orderedList || !options ? <OrderedListTool /> : ""}
      {options.unorderedList || !options ? <UnorderedListTool /> : ""}
    </div>
  );
};

export default ToolBar;
