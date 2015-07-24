$(document).ready(function() {
    for(var i = 0; i < mockSession2.answers.length; i++) {
        var newItem = $('#concern-item-model').clone();
        
        // Assign data
        $(newItem).find('#colCenter').text(mockSession2.answers[i].question);
        $(newItem).find('#colLeft i').removeClass('very-high');
        
        if (mockSession2.answers[i].priorityLevel === 3) {
            $(newItem).find('#colLeft i').addClass('very-high')
        } else if (mockSession2.answers[i].priorityLevel === 2) {
            $(newItem).find('#colLeft i').addClass('high')
        } else if (mockSession2.answers[i].priorityLevel === 1) {
            $(newItem).find('#colLeft i').addClass('medium')
        }

        // Make visible
        $(newItem).removeAttr('id');
        $(newItem).removeClass('hidden');
        $('.container').append(newItem);       
    }
});
