
var fs = require("fs");

// constructor for BasicCard
var BasicCard = function BasicCard(front, back) {
    this.front = front;
    this.back = back;
};

BasicCard.prototype.create = function() {
    // flashcard object to be appended to file
    var data = {
        front: this.front,
        back: this.back,
        type: "basic"
    };
    // add card to log.txt
    fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
        // if there is an error, log the error
        if (error) {
            console.log(error);
        }
    });
};


module.exports = BasicCard;


// var BasicCard = function(front, back) {
//     this.front = front;
//     this.back = back;
//
// };
//
// BasicCard.prototype.printCard = function() {
//     console.log('Front: ' + this.front + ', ' + 'Back: ' + this.back);
// };
//
// BasicCard.prototype.printFront = function() {
//     console.log(this.front);
//
// };
//
//
// BasicCard.prototype.printAnswer = function() {
//     console.log('Sorry, the correct answer is ' + this.back + '.');
// };
//
// module.exports = BasicCard;