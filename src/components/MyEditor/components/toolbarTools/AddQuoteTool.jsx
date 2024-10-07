import React from 'react'
import { ReactComponent as QuoteIcon } from "../../../../assets/icons/quote.svg";


export default function AddQuoteTool() {
    // ${isActive("blockquote", 'block')? 'active':''}
    return (
        <button
            className={`icon_button tool_bar heading `}
            // onClick={(e) => applyStyle(e, "blockquote", 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <QuoteIcon />
            <span className="wysiwyg_tool_tip">Quote</span>
        </button>
    )
}
