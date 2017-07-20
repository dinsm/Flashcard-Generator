
var fs = require('fs'); //const
var inquirer = require("inquirer");
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
//var counter = 5;

    inquirer.prompt([{
        name: 'command',
        message: 'What would you like to do?',
        type: 'list',
        choices: [{
            name: 'add-flashcard'
        }, {
            name: 'show-all-cards'
        }]
    }]).then(function(answer) {
        if (answer.command === 'add-flashcard') {
            addCard();
        } else if (answer.command === 'show-all-cards') {
            showCards();
        }
    })
    //.catch(function(answer) {
       // console.log("it's ok!");
    //})
    ;


var addCard = function() {
    // get user input
    inquirer.prompt([{
        name: 'TypeOfCard',
        message: 'What kind of flashcard would you like to create?',
        type: 'list',
        choices: [{
            name: 'basic-flashcard'
        }, {
            name: 'cloze-flashcard'
        }]


    }]).then(function(answer) {
        if (answer.TypeOfCard === 'basic-flashcard') {
            inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide a question');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'back',
                message: 'What is the answer?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide an answer');
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                var newBasic = new BasicCard(answer.front, answer.back);
                newBasic.create();
                nextStep();
            });
        } else if (answer.TypeOfCard === 'cloze-flashcard') {
            inquirer.prompt([{
                name: 'text',
                message: 'What is the full text?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the full text');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'cloze',
                message: 'What is the cloze portion?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the cloze portion');
                        return false;
                    } else {
                        return true;
                    }
                }

            }]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;

                if (text.includes(cloze)) {
                    var newCloze = new ClozeCard(text, cloze);
                    newCloze.create();
                    nextStep();
                } else {
                    console.log('The cloze portion you provided is not found in the full text. Please try again.');
                    addCard();
                }
            });
                //.catch(function(answer) {
               // console.log("it's ok");
            // })
        }
    });
};


var nextStep = function() {

    inquirer.prompt([{
        name: 'nextAction',
        message: 'What would you like to do next?',
        type: 'list',
        choices: [{
            name: 'create-new-card'
        }, {
            name: 'show-all-cards'
        }, {
            name: 'nothing'
        }]

    }]).then(function(answer) {
        //answer.nextAction = undefined;
        if (answer.nextAction === 'create-new-card') {
            addCard();
        } else if (answer.nextAction === 'show-all-cards') {
            showCards();
        } else if (answer.nextAction === 'nothing') {

        }
    });
};


var showCards = function() {

    fs.readFile('./log.txt', 'utf8', function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestion(questions, count);
    });
};


var showQuestion = function(array, index) {
    var question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctResponse;

    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctResponse = parsedQuestion.back;

    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDeleted;
        correctResponse = parsedQuestion.cloze;
    }

    inquirer.prompt([{
        name: 'response',
        message: questionText

    }]).then(function(answer) {
        if (answer.response === correctResponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
                showQuestion(array, index + 1);
            }
        } else {
            console.log('Wrong!');
            if (index < array.length - 1) {
                showQuestion(array, index + 1);
            }
        }
    });
};