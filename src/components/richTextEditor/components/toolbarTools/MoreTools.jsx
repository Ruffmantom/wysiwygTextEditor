import React, { useEffect, useRef } from "react";
import { ReactComponent as MoreIcon } from "../../../../assets/icons/more-v.svg";
// state
import { richTextEditorStore } from "../../../../stores/richTextEditorStore";
import UnderlineTool from "./UnderlineTool";
import StrikeThroughTool from "./StrikeThroughTool";
import ClearFormatTool from "./ClearFormatTool";

export default function MoreTools({ options }) {

    const moreToolsRef = useRef(null);
    const {
        textAlignDdOpen,
        setTxtAlignDd,
    } = richTextEditorStore();

    const handleClickOutside = (event) => {
        if (
            moreToolsRef.current &&
            !moreToolsRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setTxtAlignDd(false);
        }
    };


    // if click outside of dropdowns
    useEffect(() => {
        document.addEventListener("mousedown", (e) => handleClickOutside(e));
        return () => {
            document.removeEventListener("mousedown", (e) => handleClickOutside(e));
        };
    }, []);


    return (
        <div className="icon_button tool_bar tool_bar_dd icon">
            <button
                className="btn_overlay"
                onClick={() => setTxtAlignDd(true)}
            ></button>
            <div className="icon_button tool_bar heading">
                <MoreIcon />
                <span className="wysiwyg_tool_tip">More</span>
            </div>
            <div
                className={`tool_bar_dd_content icons ${textAlignDdOpen ? "active" : ""
                    }`}
                ref={moreToolsRef}
            >
                { options.tools.other.underline || !options ? <UnderlineTool /> : ""}
                { options.tools.other.strikeThrough || !options ? <StrikeThroughTool /> : ""}
                { options.tools.other.removeFormats || !options ? <ClearFormatTool /> : ""}


            </div>
        </div>
    )
}
