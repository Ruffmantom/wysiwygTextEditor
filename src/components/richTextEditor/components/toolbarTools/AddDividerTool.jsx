import React from 'react'
import { ReactComponent as DividerIcon } from "../../../../assets/icons/divider.svg";
export default function AddDividerTool() {
    const createDivider =(e)=>{
        e.preventDefault()
        console.log('Create Divider')
    }
    return (
        <button
            className="icon_button tool_bar heading"
            onClick={createDivider}
        >
            <DividerIcon />
            <span className="wysiwyg_tool_tip">Divider</span>
        </button>
    )
}
