import React, { useRef, useEffect, useState } from 'react'

export default function ContentEditable(props) {
    const contentEditableRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(null);

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const startContainer = range.startContainer;
            const startOffset = range.startOffset;

            // Create a range to encompass the start of the selection
            const rangeClone = range.cloneRange();
            rangeClone.setStart(startContainer, startOffset);

            // Get the bounding client rect of the range
            const rect = rangeClone.getBoundingClientRect();
            const container = contentEditableRef.current;
            const containerRect = container.getBoundingClientRect();

            // Calculate start position in pixels relative to the container
            const startPositionX = rect.left - containerRect.left;
            const startPositionY = rect.top - containerRect.top;
            console.log(selection)
            // set the state with selected text
            props.setSelectedContent(selection.toString());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (new line)

            // Insert <br> tag at the current cursor position
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const br = document.createElement("br");
            range.insertNode(br);

            // Move the cursor after the inserted <br> tag
            range.setStartAfter(br);
            range.setEndAfter(br);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };



    // Effect to update cursor position on initial load and content change
    useEffect(() => {
        const container = contentEditableRef.current;
        if (!container) return;

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const startOffset = range.startOffset;
            const boundingClientRect = range.getBoundingClientRect();
            setCursorPosition({
                top: boundingClientRect.top,
                left: boundingClientRect.left,
                offset: startOffset,
            });
        }
    }, [props.value]);

    useEffect(() => {
        if (contentEditableRef.current.innerHTML !== props.value) {
            // contentEditableRef.current.textContent = props.value;
            contentEditableRef.current.innerHTML = props.value;
        }
    });

    return (
        <div
            contentEditable="true"
            ref={contentEditableRef}
            className="editable_container"
            onBlur={props.onBlur}
            onKeyDown={handleKeyDown}
            onSelect={handleSelection}
            onInput={event => {
                props.onChange(event.target.innerHTML);
            }}
        />
    )
}
