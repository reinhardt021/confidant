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
        url: '/contacts',
        method: 'POST',
        dataType: 'json',
        data: contact
      });
    },
    getContacts: function () {
      handlers.listContacts().done(function addAllToPage(contacts) {
        $.each(contacts, function (index, contact) {
          var row = $('<tr>').appendTo(handlers.container);
          $('<td>').text(contact.firstname).appendTo(row);
          $('<td>').text(contact.lastname).appendTo(row);
          $('<td>').text(contact.email).appendTo(row);
          // // var contactNumbers = $('<td>').text('numbers: ' + data[i].numbers);
          // may have to do a search within a search
          // list within a list for the numbers
        });
      });
    }
  };


  $('#list').on('click', handlers.getContacts);


  $('#add').on('click', function addContact() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val(); 
    var email = $('#email').val();
    var contact = { firstname: firstName, lastname: lastName, email: email };


    handlers.newContact(contact).done();
    
    var tr = $('<tr>')

  });

});
