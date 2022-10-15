const OR = "OR"

const parseTags = (tags) => {
    try {
        const tagsParsed = tags.split(" " + OR + " ").filter((tag) => tag !== "")
        return tagsParsed 
    } catch (e) {
        throw new Error("Invalid query")
    }   
}

module.exports = {
    parseTags
};