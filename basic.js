// BasicCard constructor
function BasicCard(front, back) { 
    // Scope safe
    if (this instanceof BasicCard) {
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard();
    }
}

module.exports = BasicCard;