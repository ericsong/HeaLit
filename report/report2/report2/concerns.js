var mockSession = mockSession2;

$(document).ready(function() {
    $('.concerns-total').text('Concerns: ' + mockSession.concerns)

    mockSession.answers.sort(function(a, b) {
        if (a.priorityLevel > b.priorityLevel) {
            return -1
        } else if (a.priorityLevel < b.priorityLevel) {
            return 1
        } else {
            return 0
        }
    })

    for(var i = 0; i < mockSession.answers.length; i++) {
        var newItem = $('#concern-item-model').clone();
        
        // Assign data
        $(newItem).find('#colCenter').text(mockSession.answers[i].question);
        $(newItem).find('#colLeft i').removeClass('very-high');
        
        if (mockSession.answers[i].priorityLevel === 3) {
            $(newItem).find('#colLeft i').addClass('very-high')
        } else if (mockSession.answers[i].priorityLevel === 2) {
            $(newItem).find('#colLeft i').addClass('high')
        } else if (mockSession.answers[i].priorityLevel === 1) {
            $(newItem).find('#colLeft i').addClass('medium')
        }

        // Modal modifier
        $(newItem).find('a i').click(function() {
            var question = $(this).parent().parent().parent().find('#colCenter').text()
            var item

            for(var i = 0; i < mockSession.answers.length; i++) {
                console.log(mockSession.answers[i].question)
                console.log(question)
                if (mockSession.answers[i].question === question) {
                    item = mockSession.answers[i];
                    break;
                }
            }
            // Assign data
            $('.modal-body .question-answer-item .question').text(item.question);

            $('.modal-body .question-answer-item .answers-container').empty()
            for(var j = 0; j < item.choices.length; j++) {
                var newAnswer = $('#answer-model').clone()
                var isCorrect = false,
                    isIncorrect = false;

                if (item.userAnswerIndex.indexOf(j) !== -1) {
                    if (item.correctAnswerIndex.indexOf(j) !== -1) {
                        isCorrect = true
                    } else {
                        isIncorrect = true
                    }
                }

                if (isCorrect) {
                    $(newAnswer).addClass('correct')
                    $(newAnswer).find('.answer-icon i').text('check')
                } else if (isIncorrect) {
                    $(newAnswer).addClass('incorrect')
                    $(newAnswer).find('.answer-icon i').text('close')
                }

                $(newAnswer).find('.answer-text').text(mockSession.answers[i].choices[j]);

                $(newAnswer).removeAttr('id');
                $(newAnswer).removeClass('hidden');
                $('.modal-body .question-answer-item .answers-container').append(newAnswer)
            }

        })

        // Attach remove listeners
        $(newItem).find('.material-icons.correct').click(function(){
            $(this).parent().parent().fadeOut() 
        })
        $(newItem).find('.material-icons.incorrect').click(function(){
            $(this).parent().parent().fadeOut() 
        })

        // Make visible
        $(newItem).removeAttr('id');
        $(newItem).removeClass('hidden');
        $('.container').append(newItem);       
    }
});
