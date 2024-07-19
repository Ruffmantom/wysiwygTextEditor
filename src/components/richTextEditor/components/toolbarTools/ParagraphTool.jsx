import React, { useEffect, useRef } from "react";
import { ReactComponent as H1Icon } from "../../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../../assets/icons/h4.svg";
// state
import { richTextEditorStore } from "../../../../stores/richTextEditorStore";

export default function ParagraphTool() {
    const {
        paragraphDdOpen,
        setParaDropDown
    } = richTextEditorStore();
    const paragraphDropDownRef = useRef(null);

    const handleOpenDropDown = (e) => {
        e.preventDefault()
        setParaDropDown(true)
    }

    const createHeadings = (e, tag) => {
        e.preventDefault()
        console.log(`Create tag: ${tag}`)
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
            ></button>
            <p>Paragraph</p>
            <div
                className={`tool_bar_dd_content ${paragraphDdOpen ? "active" : ""}`}
                ref={paragraphDropDownRef}
            >
                <button
                    className="tool_bar_dd_item h1"
                    onClick={(e) => createHeadings(e, "h1")}
                >
                    <span>Heading 1</span>
                    <H1Icon />
                </button>
                <button
                    className="tool_bar_dd_item h2"
                    onClick={(e) => createHeadings(e, "h2")}
                >
                    <span>Heading 2</span>
                    <H2Icon />
                </button>
                <button
                    className="tool_bar_dd_item h3"
                    onClick={(e) => createHeadings(e, "h3")}
                >
                    <span>Heading 3</span>
                    <H3Icon />
                </button>
                <button
                    className="tool_bar_dd_item h4"
                    onClick={(e) => createHeadings(e, "h4")}
                >
                    <span>Heading 4</span>
                    <H4Icon />
                </button>
                <button
                    className="tool_bar_dd_item p"
                    onClick={(e) => createHeadings(e, "p")}
                >
                    <span>Paragraph</span>P
                </button>
            </div>
        </div>
    )
}
