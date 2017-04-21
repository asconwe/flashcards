// ClozeCard should have a property or method that contains or returns only the cloze-deleted portion of the text.
// ClozeCard should have a property or method that contains or returns only the partial text.
// ClozeCard should have a property or method that contains or returns only the full text.
// ClozeCard should throw or log an error when the cloze deletion does not appear in the input text.

// Escape special characters in string
function escapeStr(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// Deletes Cloze text from full text
function returnPartialText(text, cloze) { 
    var escCloze = escapeStr(cloze.trim());
    var regExp = new RegExp(escCloze, "gi")
    var partialText = text.replace(regExp, '...');
    return partialText;
};

// ClozeCard constructor
function ClozeCard(text, cloze) { 
    // Scope safe
    if (this instanceof ClozeCard) {
        this.cloze = cloze;
        this.fullText = text;
        this.partialText = returnPartialText(text, cloze);
    } else {
        return new ClozeCard();
    }
}

module.exports = ClozeCard;