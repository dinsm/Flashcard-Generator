var fs = require("fs");

var ClozeCard = function ClozeCard(text, cloze) {

    this.fulltext = text; //this.text = text.split(cloze);
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
    //this.back = fulltext;
    //this.front = partial;
    //this.clozeDeleted = this.text.replace(this.cloze, '_____');

};

ClozeCard.prototype.create = function() {
    var data = {
        text: this.text,
        cloze: this.cloze,
        clozeDeleted: this.clozeDeleted,
        type: "cloze"
    };
    // add card to log.txt
    fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
        // if there is an error, log the error
        if (error) {
            console.log(error);
        }
    });
};

module.exports = ClozeCard;



//     ClozeCard.prototype.createPartial = function() {
//         var newArr = this.text.split(' ');
//         newArr[0] = "...";
//         return partial = newArr.join(' ')
//     };
//
//     ClozeCard.prototype.fulltext = function() {
//         return this.text;
//     };
//
// module.exports = ClozeCard;


// function ClozeCard(text, cloze) {
//     if (this instanceof ClozeCard) {
//         this.fullText = text;
//         this.partial = text.replace(cloze, '...'); // replace all cloze occurrence
//
//         if(this.partial === text) throw new Error('This doesn\'t work, oops');
//         this.cloze = cloze;
//
//     } else return new ClozeCard(text, cloze);
// };
