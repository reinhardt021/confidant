$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),
    listContacts: function () {
      return $.ajax({
        url: '/contacts',
        method: 'GET',
      });  
    },
    newContact: function (contact) {
      return $.ajax({
        url: '',
        method: 'POST',
        dataType: 'json',
        data: contact
      });
    }
  };


  $('#list').on('click', function getAll() {
    // var container = $('#friends');

    handlers.listContacts().done(function addAllToPage(data) {

      for (var i = 0; i < data.length; i++) {
        var row = $('<tr>').appendTo(handlers.container);
        $('<td>').text(data[i].firstname).appendTo(row);
        $('<td>').text(data[i].lastname).appendTo(row);
        $('<td>').text(data[i].email).appendTo(row);
        // var contactNumbers = $('<td>').text('numbers: ' + data[i].numbers);
        // may have to do a search within a search
        // list within a list for the numbers
      }
    });

  });


  $('#add').on('click', function addContact() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val(); 
    var email = $('#email').val();
    var contact = { firstname: firstName, lastname: lastName, email: email };


    handlers.newContact(contact).done();
    
    var tr = $('<tr>')

  });

});
