import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as MoreIcon } from "../../../../assets/icons/more-v.svg";
import UnderlineTool from "./UnderlineTool";
import StrikeThroughTool from "./StrikeThroughTool";
import ClearFormatTool from "./ClearFormatTool";

export default function MoreTools({ options, handleEditorChange }) {

    const [moreToolDd, setMoreToolDd] = useState(false)
    const moreToolsRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            moreToolsRef.current &&
            !moreToolsRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setMoreToolDd(false);
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
                onClick={(e) => {
                    e.preventDefault()
                    setMoreToolDd(true)
                }}
                onMouseDown={(e) => e.preventDefault()}
            >
                <span className="wysiwyg_tool_tip">More</span>

            </button>
            <div className="icon_button tool_bar heading">
                <MoreIcon />
            </div>
            <div
                className={`tool_bar_dd_content icons ${moreToolDd ? "active" : ""
                    }`}
                ref={moreToolsRef}
            >
                {options.more.underline || !options ? <UnderlineTool handleEditorChange={handleEditorChange} setMoreToolDd={setMoreToolDd} /> : ""}
                {options.more.strikeThrough || !options ? <StrikeThroughTool handleEditorChange={handleEditorChange} setMoreToolDd={setMoreToolDd} /> : ""}
                {options.more.removeFormats || !options ? <ClearFormatTool handleEditorChange={handleEditorChange} setMoreToolDd={setMoreToolDd} /> : ""}


            </div>
        </div>
    )
}
