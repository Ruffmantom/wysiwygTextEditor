import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as MoreIcon } from "../../../../assets/icons/more-v.svg";
import UnderlineTool from "./UnderlineTool";
import StrikeThroughTool from "./StrikeThroughTool";
import ClearFormatTool from "./ClearFormatTool";

export default function MoreTools({ options }) {
const [moreToolDd,setMoreToolDd]= useState(false)
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
                onClick={() => setMoreToolDd(true)}
                onMouseDown={(e) => e.preventDefault()}
            ></button>
            <div className="icon_button tool_bar heading">
                <MoreIcon />
                <span className="wysiwyg_tool_tip">More</span>
            </div>
            <div
                className={`tool_bar_dd_content icons ${moreToolDd ? "active" : ""
                    }`}
                ref={moreToolsRef}
            >
                { options.tools.other.underline || !options ? <UnderlineTool setMoreToolDd={setMoreToolDd} /> : ""}
                { options.tools.other.strikeThrough || !options ? <StrikeThroughTool setMoreToolDd={setMoreToolDd} /> : ""}
                { options.tools.other.removeFormats || !options ? <ClearFormatTool setMoreToolDd={setMoreToolDd} /> : ""}


            </div>
        </div>
    )
}
