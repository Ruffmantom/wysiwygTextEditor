import React from 'react'
import { ReactComponent as CodeIcon } from "../../../../assets/icons/code.svg";
import { richTextEditorStore } from '../../../../stores/richTextEditorStore';
export default function AddCodeTool() {

    const {
        setCodeModal,
    } = richTextEditorStore();


    const handleTriggerAddCode = (e) => {
        e.preventDefault()
        console.log("Open Code Modal")
        setCodeModal(true)
    }

    return (
        <button
            className="icon_button tool_bar heading"
            onClick={handleTriggerAddCode}
        >
            <CodeIcon />
            <span className="wysiwyg_tool_tip">Code Block</span>
        </button>
    )
}
