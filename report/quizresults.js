$(document).ready(function() {
    $('.concerns-total').text('Concerns : ' + mockSession1.concerns)

    mockSession1.answers.sort(function(a, b) {
        if (a.index > b.index) {
            return 1
        } else if (a.index < b.index) {
            return -1
        } else {
            return 0
        }
    })

    for(var i = 0; i < mockSession1.answers.length; i++) {
        var newItem = $('#question-answer-container-model').clone();
        
        // Assign data
        $(newItem).find('.question').text(mockSession1.answers[i].question);

        for(var j = 0; j < mockSession1.answers[i].choices.length; j++) {
            var newAnswer = $('#answer-model').clone()
            var isCorrect = false,
                isIncorrect = false;

            if (mockSession1.answers[i].userAnswerIndex.indexOf(j) !== -1) {
                if (mockSession1.answers[i].correctAnswerIndex.indexOf(j) !== -1) {
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

            $(newAnswer).find('.answer-text').text(mockSession1.answers[i].choices[j]);

            $(newAnswer).removeAttr('id');
            $(newAnswer).removeClass('hidden');
            $(newItem).find('.answers-container').append(newAnswer)
        }

        // Make visible
        $(newItem).removeAttr('id');
        $(newItem).removeClass('hidden');
        $('.container').append(newItem);       
    }
});
