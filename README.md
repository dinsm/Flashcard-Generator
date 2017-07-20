# Flashcard-Generator

* In this week's assignment, you will create the backend for a basic flashcard application.

* The backend will essentially constitute an API that allows users to create two types of flashcards.

* Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").

* Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")

* the MVP for the homework is for the user, from the command line, to be able to add either basic or cloze cards to a bank of questions, and then to be able to quiz themselves with these cards.

* First, you will need : 
    - A constructor to make the Basic cards, with front and back,
    - A constructor to make a Cloze card, where you have the full text of the question and the answer,
    - And you would write the javascript to excise the answer in order to present the question as “George …. was the first prez of US”;
    - And you need a code to run the quiz.  

* Once this is done, you will need to add inquirer into the mix, writing the code that allows the user to construct their own flashcards (either basic or cloze cards) via the use of the constructors, and have these questions added to the bank of questions in the quiz part of the app.

* So, initially, all the questions you need will be sitting in two .json files - one for the basic cards, and another for the cloze cards. You will write constructors to read the data in the .json files and construct the cards that will be displayed to the user during their test - i.e., when they run through the cards.