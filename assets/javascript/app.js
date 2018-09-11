$(document).ready(function(){
      $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: "Who won the 1994 FIFA World Cup?",
      q2: "Which of these star soccer players has never played for Real Madrid?",
      q3: "Anfield is the home of which English Premier League club?",
      q4: "Which of these players has never played for Manchester United?",   
      q5: "In the MLS in what city does the team Chivas USA play",
      q6: 'What are the home colors of the FC Barcelona soccer uniform?"      ',
      q7: "According to the official FIFA rulebook, how long can a goalkeeper hold onto the ball for?"
    },
    options: {
      q1: ['Italy', 'Argentina', 'Brazil', 'France'],
      q2: ['David Beckham', 'Zinadine Zidane', 'Ronaldo', 'lionel Messi'],
      q3: ['Manchester United', 'West Ham United', 'Liverpool', 'Everton'],
      q4: ['Eric Contana', 'Bobby', 'Ryan Giggs', 'Mark hughes'],
      q5: ['Buffalo, New York','Baltimore, Maryland','Carson, California', "Miami, Florida"],
      q6: ['Orange and White','Black and White','Blue and Red','Yellow and Blue'],
      q7: ['3 Seconds', '5 Seconds', '10 Seconds','30 Seconds']
    },
    answers: {
      q1: 'Brazil',
      q2: 'lionel Messi',
      q3: 'liverpool',
      q4: 'Mark Hughes',
      q5: 'Carson, California',
      q6: 'Blue and Red',
      q7: '5 Seconds'
    },
 
  startGame: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    $('#game').show();
    
    $('#results').html('');
    
    $('#timer').text(trivia.timer);
    
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      // hide game sction
      $('#game').hide();
      
      $('#start').show();
    }
    
  }
 

}