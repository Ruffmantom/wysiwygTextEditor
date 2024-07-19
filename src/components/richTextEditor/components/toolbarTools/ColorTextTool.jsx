import React, { useEffect, useRef } from "react";
import { ReactComponent as FontcolorIcon } from "../../../../assets/icons/fontcolor.svg";
// state
import { richTextEditorStore } from "../../../../stores/richTextEditorStore";
const deepFontColors = [
    "#D0C031",
    "#D0481C",
    "#1B5E20",
    "#0D47A1",
    "#4A148C",
    "#D07C00",
    "#006064",
    "#B12917",
];


export default function ColorTextTool() {
    const {
        colorDdOpen,
        setColorDropDown
    } = richTextEditorStore();

    const handleTxtColorClick = (e, color) => {
        e.preventDefault();
        console.log("clicked color: " + color);
        // close drop down
        setColorDropDown(false)
    };

    const colorDropDownRef = useRef(null);

    const handleDropDown = (e) => {
        e.preventDefault()
        if(colorDdOpen){
            setColorDropDown(false)
        }else{
            setColorDropDown(true)
        }
    }

    const handleClickOutside = (event) => {
        if (
            colorDropDownRef.current &&
            !colorDropDownRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setColorDropDown(false)
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
        <div className="icon_button tool_bar tool_bar_dd">
            <button
                className="btn_overlay"
                // style={{
                //     outline: toolBarColor !== "" ? `2px solid #${toolBarColor}` : "",
                // }}
                onClick={handleDropDown}
            ></button>
            <FontcolorIcon />
            <span className="wysiwyg_tool_tip">Font Color</span>
            {/* drop down content */}
            <div
                className={`tool_bar_dd_content color_dd ${colorDdOpen ? "active" : ""
                    }`}
                ref={colorDropDownRef}
            >
                <div className="highlight_colors">
                    {deepFontColors.map((c) => (
                        <button
                            key={c}
                            className="color_swatch"
                            onClick={(e) => handleTxtColorClick(e, c)}
                            style={{ backgroundColor: c }}
                        ></button>
                    ))}
                </div>
                <div className="tool_bar_dd_item p center">
                    <button onClick={(e) => handleTxtColorClick(e, "auto")}>
                        Automatic
                    </button>
                </div>
            </div>
        </div>
    )
}
