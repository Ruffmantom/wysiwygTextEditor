import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as FontcolorIcon } from "../../../../assets/icons/fontcolor.svg";
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

export default function ColorTextTool({ handleEditorChange }) {
    const colorDropDownRef = useRef(null);
    const [defaultColor, setDefaultColor] = useState('')
    const [colorDdOpen, setColorDropDown] = useState(false)

    //foreColor
    const colorText = (e, color) => {
        e.preventDefault();
        // document.execCommand("styleWithCSS", false, true);
        document.execCommand("foreColor", false, color);
        handleEditorChange(); // Save the state change
    };

    const handleDropDown = (e) => {
        e.preventDefault()
        if (colorDdOpen) {
            setColorDropDown(false)
        } else {
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
        // Retrieve the value of the CSS variable
        let foundColor = getComputedStyle(document.documentElement).getPropertyValue('--black').trim();
        setDefaultColor(foundColor)
        document.addEventListener("mousedown", (e) => handleClickOutside(e));
        return () => {
            document.removeEventListener("mousedown", (e) => handleClickOutside(e));
        };
    }, []);

    return (
        <div className="icon_button tool_bar tool_bar_dd">
            <button
                className="btn_overlay"
                onClick={handleDropDown}
                onMouseDown={(e) => e.preventDefault()}
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
                            //${isActive(c, 'inline') ? 'active' : ""}
                            className={`color_swatch `}
                            onClick={e => {
                                colorText(e, c)
                                setColorDropDown(false)
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            style={{ backgroundColor: c }}
                        ></button>
                    ))}
                </div>

                <button
                    className='tool_bar_dd_item p center clear_style_btn'
                    onClick={e => {
                        // and set new state as default
                        colorText(e, defaultColor)
                        setColorDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Default
                </button>

            </div>
        </div>
    )
}
