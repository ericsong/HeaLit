$(document).ready(function() {
    var newItem = $('#concern-item-model').clone();
    $(newItem).removeAttr('id');
    $(newItem).removeClass('hidden');
    $('.container').append(newItem);
});
