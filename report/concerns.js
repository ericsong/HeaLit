$(document).ready(function() {
    for(var i = 0; i < mockSession2.answers.length; i++) {
        var newItem = $('#concern-item-model').clone();
        $(newItem).find('#colCenter').text(mockSession2.answers[i].question)
        $(newItem).removeAttr('id');
        $(newItem).removeClass('hidden');
        $('.container').append(newItem);       
    }
});
