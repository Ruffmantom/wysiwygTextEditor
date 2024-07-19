import React from 'react'
import { richTextEditorStore } from '../../../../stores/richTextEditorStore';
import { ReactComponent as LinkIcon } from "../../../../assets/icons/link.svg";
export default function AddLinkTool() {
    const {
        setLinkModal,
    } = richTextEditorStore();


    const handleTriggerAddLink = (e) => {
        e.preventDefault()
        console.log("Open Link Modal")
        setLinkModal(true)
    }

    return (
        <button
            className="icon_button tool_bar heading"
            onClick={handleTriggerAddLink}
        >
            <LinkIcon />
            <span className="wysiwyg_tool_tip">Link</span>
        </button>
    )
}
