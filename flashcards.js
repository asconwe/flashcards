inquirer = require('inquirer');
// mysql = require('mysql'); // Not implemented
// Basic card constructor, accepts front and back text
BasicCard = require('./basic.js');
// Cloze card constructor, accepts full text and cloze deletion
ClozeCard = require('./cloze.js');

// Array to store cards as they are generated
cards = [];

// Prompts the user with the current card
function showCard(message, correctAnswer, callback) {
    inquirer.prompt([{
        name: 'card',
        message: message
    }]).then(function (answers) { 
        // If the user answer is the correct answer
        if (answers.card === correctAnswer) { 
            console.log('Nice! You got it!');
            callback();
        } else {
            inquirer.prompt([{
                name: 'wrongAnswer',
                type: 'list',
                message: 'Nope -',
                choices: ['Try again?', 'Show the answer']
            }]).then(function (answers) { 
                if (answers.wrongAnswer === 'Try again?') {
                    showCard(message, correctAnswer, callback);
                } else {
                    console.log('Correct answer:', correctAnswer);
                    callback();
                }
            });
        }
    });
}

// Begin showing cards - continue through whole deck
function startStudying(index) {
    console.log(cards);
    console.log(index);
    var question;
    var correctAnswer;
    var card = cards[index];
    // Check if it is a card and what type
    if (card instanceof BasicCard) {
        message = card.front;
        correctAnswer = card.back;
    } else if (card instanceof ClozeCard) {
        message = 'Fill in the blank: ' + card.partialText;
        correctAnswer = card.cloze;
    }
    // Show the first card
    showCard(message, correctAnswer, function () { 
        // showCard callback function - if it was not the last card, show the next one
        if (index < cards.length - 1) {
            startStudying(index + 1)
        // If it was the last card, show the prompt to make a new one or start again
        } else {
            promptContinue(cards.length);
        }
    });
}

// Ask if the user wants to make a new card or start studying their cards
function promptContinue(i) { 
    inquirer.prompt([{
        name: 'again',
        type: 'list',
        message: 'What do you want to do?',
        choices: ['Make another card!', 'Get studying!']
    }]).then(function (answers) { 
        if (answers.again === 'Make another card!') {
            promptCard(i + 1);
        } else { 
            startStudying(0);
        }
    });
};

// Prompt the user to make a card
function promptCard(i) {
    inquirer.prompt([
        {
            name: 'cardType',
            type: 'list',
            message: 'What type of card is this?',
            choices: ['Cloze', 'Basic']
        }
    ]).then(function (answers) {
        if (answers.cardType === 'Cloze') {
            inquirer.prompt([{
                name: 'fullText',
                message: 'What is the full text?',
            }, {
                name: 'clozeDeletion',
                message: 'What should we delete?'
            }]).then(function (answers) {
                cards[i] = new ClozeCard(answers.fullText, answers.clozeDeletion);
                promptContinue(i);
            });
        } else {
            inquirer.prompt([{
                name: 'front',
                message: 'What should go on the front of the card?'
            }, {
                name: 'back',
                message: 'What should go on the back of the card?'
            }]).then(function (answers) { 
                cards[i] = new BasicCard(answers.front, answers.back);
                promptContinue(i);
            });
        }
    });
}

// Begin making cards
promptCard(0);