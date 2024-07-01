export const formatHeading = (headingType, selectedText) => {



}
export const formatItalic = (fullContent, selectedText) => {

    const italicHtml = `<i>${selectedText}</i>`
    console.log("formatItalic - fullContent: " + fullContent)
    console.log("formatItalic - selectedText: " + selectedText)
    let formattedContent = fullContent.replace(selectedText, italicHtml)
    console.log("formatItalic - formattedContent: "+formattedContent)
    return formattedContent
}

export const formatBold = (fullContent, selectedText) => {
    
    const boldHTML = `<b>${selectedText}</b>`
    console.log("formatBold - fullContent: " + fullContent)
    console.log("formatBold - selectedText: " + selectedText)
    let formattedContent = fullContent.replace(selectedText, boldHTML)
    console.log("formatBold - formattedContent: "+formattedContent)

    return formattedContent
}