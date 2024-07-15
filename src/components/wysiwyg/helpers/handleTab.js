export const handleTab = (e) => {
    console.log(e.key)
    if (e.key === "Tab") {
        e.preventDefault()
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        console.log(selection.anchorNode.nodeName)
        console.log(selection)
        if (selection.anchorNode.nodeName === "LI") {
            // create the sub list item here
        }
        // what can tab do.
        // - move the cursor over "indent"
        // - make a sub list inside a list item
        // 1. check if the event was inside a list item
        // 2. create a sub list
        // 3. move cursor into new list item
        // ** pressing enter should continue the list
        // ** how to exit?
        // - Pressing esc already exits a single list.

    }
}