var HEALIT_APP = {
	answers: []
};
var socket = io();

$(document).ready(function(){
  //attach submit listeners
	$('#patientForm').submit(sendStartTestRequest);
	$('#questionForm').submit(saveAnswer);

  //start listening for response to startTest request
	socket.on('test_start', startTest);
});

function startTest(data) {
		if(data.status === 'error') {
			console.log("ERROR: " + data.msg);
			return;
		}

		HEALIT_APP.test = data.test;
		//hide test form
		$('#patientForm').css('display', 'none');

		//sort questions
		HEALIT_APP.test.questions.sort(function(a,b) {
			if(a.number < b.number)
				return -1;
			else if(a.number > b.number)
				return 1;
			else
				return 0;
		});

		//load question 1
		loadQuestion(HEALIT_APP.test.questions[0]);
		HEALIT_APP.current_question_number = 1;

		//show question form
		$('#questionForm').css('display', 'block');
		console.log(data);
}

function sendStartTestRequest(e) {
		e.preventDefault();
		HEALIT_APP.user_id = $('#idInput').val();
		socket.emit('start', {
			first_name: $('#firstNameInput').val(),
			last_name: $('#lastNameInput').val(),
			id: $('#idInput').val(),
			test_type: $('#testTypeInput').val()
		});
}

function saveAnswer(e) {
		e.preventDefault();

		//get answer
		var question_number = HEALIT_APP.current_question_number,
		    answer = [],
        temp = $('.choice:checked'),
        priorityScore = 0,
        choices = HEALIT_APP.test.questions[HEALIT_APP.current_question_number-1].choices;

    for(var i = 0; i < temp.length; i++) {
      answer.push(temp[i].value);
    }

		if(answer.length === 0) {
			return;
		}

    for(var i = 0; i < choices.length; i++) {
      if(choices[i].correct) {
        //check if user answerd this correctly
        if(answer.indexOf(choices[i].text) === -1) {
          priorityScore += choices[i].value;
        }
      }
    }

    console.log('score: ' + priorityScore);

		HEALIT_APP.answers.push({
			question_number: question_number,
      priorityScore: priorityScore,
			answer: answer
		});


		if(HEALIT_APP.current_question_number === HEALIT_APP.test.questions.length) {
			console.log('sending test');

			socket.emit('test_submit', {
				id: HEALIT_APP.user_id,
        score: calculateScore(HEALIT_APP.test, HEALIT_APP.answers),
				answers: HEALIT_APP.answers
			});

			loadEndPage();			
		} else {
      //load next question
      loadQuestion(HEALIT_APP.test.questions[HEALIT_APP.current_question_number]);
      HEALIT_APP.current_question_number++;
    }
}


function loadEndPage() {
	//hide question form
	$('#questionForm').css('display', 'none');

	//show end page	
	$('#endPage').css('display', 'block');
}

function loadQuestion(question) {
	var choices = [];
	for(var i = 0; i < question.choices.length; i++) {
		var newchoice;
		if(question.max_answers === 1) {
			newchoice = $('#radioModel').clone();
		} else {
			newchoice = $('#checkboxModel').clone();
		}
		
		//drop id
		$(newchoice).removeAttr('id');

		//change display
		$(newchoice).css('display', 'inline-block');

		//change data
		$($(newchoice).find('input')[0]).attr('value', question.choices[i].text);
		$($(newchoice).find('p')).text(question.choices[i].text);

    //attach listener
    $(newchoice).click(selectChoice);

		choices.push(newchoice);
	}

	$('#questionBody').text(question.body);

  //grey out submit button
  $($('#questionForm .button-primary')[0]).css('background-color', '#c2c2c2');
  $($('#questionForm .button-primary')[0]).css('border-color', '#c2c2c2');

	//remove existing choices
	var existing_choices = $('#questionForm .choice-container');
	for(var i = 0; i < existing_choices.length; i++) {
		$(existing_choices[i]).remove();
	}	

	//add to DOM
	for(var i = choices.length-1; i >= 0; i--) {
		$('#questionBody').after($(choices[i]));
	}
}

function calculateScore(test, answers) {
  var score = 0;
  console.log(test);
  console.log(answers);
  for(var i = 0; i < test.questions.length; i++) {
    var question_number = test.questions[i].number;

    //find corresponding answer object
    var qi;
    for(qi = 0; qi < answers.length; qi++) {
      if(answers[qi].question_number === question_number) {
        break;
      }
    }

    //iterate over choices, looking for correct choice(s)
    for(var j = 0; j < test.questions[i].choices.length; j++) {
      if(test.questions[i].choices[j].correct) {
        if(answers[qi].answer.indexOf(test.questions[i].choices[j].text) !== -1) {
          score += test.questions[i].choices[j].value;
        }
      }
    }
  }

  return score;
}

function selectChoice() {
  var choiceBox = $(this).find('input');

  if(!$(choiceBox).is(':checked')) {
    $($(this).find('input')).prop('checked', true);
    console.log('selecting choice');
  } else {
    $($(this).find('input')).prop('checked', false);
    console.log('unselecting choice');
  }

  //recolor choices
  var checked = $('.choice-container input:checked');
  for(var i = 0; i < checked.length; i++) {
    $($(checked[i]).parent()).css('background-color', '#CCC3C2');
  }

  //grey out submit button if no choices are selected
  if(checked.length === 0) {
    $($('#questionForm .button-primary')[0]).css('background-color', '#c2c2c2');
    $($('#questionForm .button-primary')[0]).css('border-color', '#c2c2c2');
  } else {
    $($('#questionForm .button-primary')[0]).css('background-color', '#33C3F0');
    $($('#questionForm .button-primary')[0]).css('border-color', '#33C3F0');
  }

  var unchecked = $('.choice-container input:not(:checked)');
  for(var i = 0; i < unchecked.length; i++) {
    $($(unchecked[i]).parent()).css('background-color', 'white');
  }

}
