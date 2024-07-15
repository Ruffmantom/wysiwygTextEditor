import { createNewNumberedList } from "./numberList";
import { createUnOrderedList } from "./unorderedList";

function getListDepth() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
        return 0;
    }
    let node = selection.anchorNode;
    let depth = 0;

    // Traverse up the DOM tree and count the number of <ol> or <ul> elements
    while (node) {
        if (node.nodeName === 'OL' || node.nodeName === 'UL') {
            depth++;
        }
        node = node.parentNode;
    }

    return depth;
}


export const handleTab = (e) => {
    // console.log(e.key)
    if (e.key === "Tab") {
        e.preventDefault()
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        if (selection.anchorNode.nodeName === "LI") {
            // what can tab do.
            // - make a sub list inside a list item
            // 1. check if the event was inside a list item
            // 2. create a sub list
            // 3. move cursor into new list item
            // ** pressing enter should continue the list
            // ** how to exit?
            // - Pressing esc already exits a single list.

            // create the sub list item here
            // check what the parent is
            // if the parent is OL or UL
            const parent = selection.anchorNode.parentElement
            const parentName = parent.nodeName
            if (parentName === "OL") {
                // create new ol list
                // check the depth level
                const depth = getListDepth()
                // console.log("list depth: " + typeof (depth) + " - " + depth)

                if (depth >= 3) {
                    return
                }

                const newSubList = createNewNumberedList(depth === 1 ? "a" : depth === 2 ? "i" : "1", "ol_formatted_sub_list")
                // remove the listStyle to selection
                selection.anchorNode.classList.add('list_style_none')
                // Insert the ordered list before the current parent element
                selection.anchorNode.appendChild(newSubList)
                selection.anchorNode.firstChild.remove()
            }
            if (parentName === "UL") {
                // create new ol list
                // check the depth level
                const depth = getListDepth()
                // console.log("list depth: " + typeof (depth) + " - " + depth)

                if (depth >= 3) {
                    return
                }

                const newSubList = createUnOrderedList(depth === 1 ? "formatted_ul_disc" : depth === 2 ? "formatted_ul_square" : "")
                // remove the listStyle to selection
                selection.anchorNode.classList.add('list_style_none')
                console.log(selection)
                // Insert the ordered list before the current parent element
                selection.anchorNode.appendChild(newSubList)
                selection.anchorNode.firstChild.remove()
            }
        } else {
            // Create a text node with four spaces or a tab character
            const tabNode = document.createTextNode('\u00A0\u00A0\u00A0\u00A0'); // 4 non-breaking spaces

            // Insert the tab node at the current cursor position
            range.insertNode(tabNode);

            // Move the cursor after the inserted tab
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);

            // Remove any previous selections
            selection.removeAllRanges();
            selection.addRange(range);
        }

    }
}