$(document).ready(function() {
    $('.concerns-total').text('Concerns: ' + mockSession1.concerns)

    mockSession1.answers.sort(function(a, b) {
        if (a.priorityLevel > b.priorityLevel) {
            return -1
        } else if (a.priorityLevel < b.priorityLevel) {
            return 1
        } else {
            return 0
        }
    })

    for(var i = 0; i < mockSession1.answers.length; i++) {
        var newItem = $('#concern-item-model').clone();
        
        // Assign data
        $(newItem).find('#colCenter').text(mockSession1.answers[i].question);
        $(newItem).find('#colLeft i').removeClass('very-high');
        
        if (mockSession1.answers[i].priorityLevel === 3) {
            $(newItem).find('#colLeft i').addClass('very-high')
        } else if (mockSession1.answers[i].priorityLevel === 2) {
            $(newItem).find('#colLeft i').addClass('high')
        } else if (mockSession1.answers[i].priorityLevel === 1) {
            $(newItem).find('#colLeft i').addClass('medium')
        }

        // Make visible
        $(newItem).removeAttr('id');
        $(newItem).removeClass('hidden');
        $('.container').append(newItem);       
    }
});
