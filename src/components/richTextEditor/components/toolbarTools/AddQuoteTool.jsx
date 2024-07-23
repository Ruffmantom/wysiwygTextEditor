import React from 'react'
import { ReactComponent as QuoteIcon } from "../../../../assets/icons/quote.svg";
// state
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";


export default function AddQuoteTool() {
    const {
         toggleBlockType
     } = useRichTextEditor();
    
    const handleCreateNewTag = (e,tag) => {
        e.preventDefault()
        toggleBlockType('blockquote')
        console.log(`Create Tag: ${tag}`)
    }

    return (
        <button
            className="icon_button tool_bar heading"
            onClick={(e) => handleCreateNewTag(e,"blockquote")}
        >
            <QuoteIcon />
            <span className="wysiwyg_tool_tip">Quote</span>
        </button>
    )
}
