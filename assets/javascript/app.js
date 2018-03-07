
// function to remove the start button when first clicked
$('#start').on("click", function() {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button', function(e){
    game.clicked(e);
})
$(document).on('click', '#reset', function(){
    game.reset();
})


// Trivia question variables
var questions = [{
    question: "What is the name for a dog created by crossing a Labrador Retriever and a Poodle?",
    answers: ["Retrioodle", "Labradoodle", "LabPoo", "Lareoodle"],
    correctAnswer: "Labradoodle",
    image: src="https://goo.gl/images/MxjXCG"
}, {
    question: "The Chihuahua is a breed of dog believed to originate from what country?",
    answers: ["Spain", "Venezuela", "China", "Mexico"],
    correctAnswer: "Mexico",
    image: src="https://goo.gl/images/Uj658O"
}, {
    question: "What is the most popular breed of dog in the United States?",
    answers: ["Labrador Retriever", "Golden Retriever", "American Staffordshire Terrier", "German Shepherd"],
    correctAnswer: "Labrador Retriever",
    image: src="https://goo.gl/images/wVpxfh"
}, {
    question: "A puggle is a cross between which two dog breeds?",
    answers: ["Doberman Pinscher and Pug", "Pug and Persian", "Dog and Cat", "Beagle and Poodle"],
    correctAnswer: "Pug and Beagle",
    image: src="https://goo.gl/images/6sJtua"
}, {
    question: "How many chambers are there in a dog's heart?",
    answers: ["1", "4", "2", "6"],
    correctAnswer: "4",
    image: src="https://goo.gl/images/ImLKuu"
}, {
    question: "In the United States which breed of dog is commonly known as a firehouse dog?",
    answers: ["Dalmatian", "German Sheppard", "English Setter", "Greyhound"],
    correctAnswer: "Dalmatian",
    image: src="https://goo.gl/images/5kjXgr"
}, {
    question: "The dingo is a free ranging dog found mainly in which country?",
    answers: ["California", "Australia", "Mexico", "Arizona"],
    correctAnswer: "Australia",
    image: src="https://goo.gl/images/KGsqXm"
}, {
    question: "What breed of horse is best known for its use in racing?",
    answers: ["Mustang", "Quarter Horse", "Arabian", "Thoroughbred"],
    correctAnswer: "Thoroughbred",
    image: src="https://goo.gl/images/4YzKWg"
}, {
    question: "What chemical element gives the blood of a lobster a bluish tint?",
    answers: ["Nickel", "Maganate", "Copper", "Chromium"],
    correctAnswer: "Copper",
    image: src="https://goo.gl/images/fj7Pm9"
}, {
    question: "What is the name for the offspring of a male donkey and a female horse?",
    answers: ["Pony", "Mule", "Minature Horse", "Ass"],
    correctAnswer: "Mule",
    image: src="https://goo.gl/images/doa9x9"
}];

// testing questions
console.log(questions)

// game function- variables
  var game = {
      questions: questions,
      currentQuestion: 0,
      counter: 30,
      correct: 0,
      incorrect: 0,
      unanswered: 0,

    //   Counter function
      countdown: function(){
          game.counter--;
          $('#counter').html(game.counter);
          if(game.counter <= 0) {
              console.log("Outta Time Busta!");
              game.timeUp();
          }
        },

        // Load Question function and loop through questions
          loadQuestion: function(){
            timer = setInterval(game.countdown, 1000);
            $('#startButton').html("<h2>Time Remaining:  <span id='counter'>30</span> Seconds</h2>")
            $('#startButton').html('<h2>' + questions[game.currentQuestion].question + '</h2>');
            for(var i = 0; i < questions[game.currentQuestion].answers.length; i++){
                $('#startButton').append('<button class="answer-button" id="button-' + i +'" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] +'</button>');
            }
          },

        //   This function loads the next question and restarts the timer
          nextQuestion: function() {
              game.counter = 30;
              $('#counter').html(game.counter);
              game.currentQuestion++;
              game.loadQuestion();
          },

        // This function loads when time has lapsed, the timer resets, unaswered question count goes up
          timeUp: function() {
                clearInterval(timer);
                game.unanswered++;
                $('#startButton').html('<h2>Time is Up!</h2>');
                $('#startButton').append('<h3>The Correct Answer Was: ' +questions[game.currentQuestion].correctAnswer + '</h3>');
                if(game.currentQuestion==questions.length-1){
                    setTimeout(game.results, 3*1000);
                } else{
                    setTimeout(game.nextQuestion, 3*1000);
                }
          },
        //   At the end of the game, the results of answered and unanswered questions are revealed
          results: function() {
                clearInterval(timer);
                $('#startButton').html("<h2>Completed!!!</h2>");
                $('#startButton').append("<h3>Correct: " + game.correct + "<h3>");
                $('#startButton').append("<h3>Incorrect: " + game.incorrect + "<h3>");
                $('#startButton').append("<h3>Unanswered: " + game.unanswered + "<h3>");
                $('#startButton').append("<button id='reset'>Reset</button>");
          }, 

        //   
          clicked: function(e) {
                clearInterval(timer);
                if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
                    game.ansCorrectly();
                } else{
                    game.ansIncorrectly();
                }
          },

          ansCorrectly: function() {
              console.log("That is Correct!!!");
              clearInterval(timer);
              game.correct++;
              $('#startButton').html('<h2>You Answered Correctly!</h2>');
              if (game.currentQuestion == questions.length-1){
                  setTimeout(game.results, 3 * 1000);
              } else {
                  setTimeout(game.nextQuestion, 3 * 1000);
              }
          },

          ansIncorrectly: function() {
            console.log("That is Incorrect!!!");
            clearInterval(timer);
            game.incorrect++;
            $('#startButton').html('<h2>You Answered Incorrectly!</h2>');
            $('#startButton').append('<h3>The Correct Answer Was: ' +questions[game.currentQuestion].correctAnswer + '</h3>');
            if (game.currentQuestion == questions.length-1){
                setTimeout(game.results, 3 * 1000);
            } else {
                setTimeout(game.nextQuestion, 3 * 1000);
            }

          },

          reset: function() {
            game.currentQuestion = 0;
            game.counter = 0;
            game.correct = 0;
            game.incorrect = 0;
            game.unanswered = 0;
            game.loadQuestion();
          }
      }
    