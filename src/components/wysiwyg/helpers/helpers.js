export const formatHeading = (headingType, selectedText) => {

    

}
export const formatItalic = (fullContent,selectedText) => {

    const italicHtml = `<i>${selectedText}</i>`
    console.log(fullContent)
    let formattedContent = fullContent.replace(selectedText, italicHtml)

    return formattedContent
}

export const formatBold = (fullContent,selectedText) => {

    const boldHTML = `<b>${selectedText}</b>`
    let formattedContent = fullContent.replace(selectedText, boldHTML)

    return formattedContent
}