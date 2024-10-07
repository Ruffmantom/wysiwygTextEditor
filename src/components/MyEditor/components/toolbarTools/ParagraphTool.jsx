import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as H1Icon } from "../../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../../assets/icons/h4.svg";

export default function ParagraphTool() {
    const paragraphDropDownRef = useRef(null);
    const [paraDropDown, setParaDropDown] = useState(false)
    const handleOpenDropDown = (e) => {
        e.preventDefault()
        setParaDropDown(true)
    }

    const handleClickOutside = (event) => {
        if (
            paragraphDropDownRef.current &&
            !paragraphDropDownRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setParaDropDown(false);
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
                onClick={(e) => handleOpenDropDown(e)}
                onMouseDown={(e) => e.preventDefault()}
            ></button>
            <p>Heading</p>
            <div
                className={`tool_bar_dd_content ${paraDropDown ? "active" : ""}`}
                ref={paragraphDropDownRef}
            >
                <button
                //${isActive("header-one", 'block') ? "active" : ""}
                    className={`tool_bar_dd_item h1 `}
                    onClick={(e) => {
                        // applyStyle(e, "header-one", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 1</span>
                    <H1Icon />
                </button>
                <button
                //${isActive("header-two", 'block') ? "active" : ""}
                    className={`tool_bar_dd_item h2 `}
                    onClick={(e) => {
                        // applyStyle(e, "header-two", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 2</span>
                    <H2Icon />
                </button>
                <button
                //${isActive("header-three", 'block') ? "active" : ""}
                    className={`tool_bar_dd_item h3 `}
                    onClick={(e) => {
                        // applyStyle(e, "header-three", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 3</span>
                    <H3Icon />
                </button>
                <button
                //${isActive("header-four", 'block') ? "active" : ""}
                    className={`tool_bar_dd_item h4 `}
                    onClick={(e) => {
                        // applyStyle(e, "header-four", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 4</span>
                    <H4Icon />
                </button>

            </div>
        </div>
    )
}
