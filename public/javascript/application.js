$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),

    newContact: function (contact) {
      return $.ajax({
        url: '/contacts',
        method: 'POST',
        dataType: 'json',
        data: contact
      });
    },
    addContact: function (index, contact) {
      var row = $('<tr>').appendTo(handlers.container);
        $('<td>').text(contact.firstname).appendTo(row);
        $('<td>').text(contact.lastname).appendTo(row);
        $('<td>').text(contact.email).appendTo(row);
        // $('<td>').text(contact.numbers).appendTo(row);
        // may have to do a search within a search
        // list within a list for the numbers
    },
    receiveContacts: function (contacts) {
      $.each(contacts, handlers.addContact);
    },
    listContacts: function () {
      return $.ajax({
        url: '/contacts',
        method: 'GET',
      });  
    },
    getContacts: function () {
      handlers.container.empty(); // reset table
      handlers.listContacts().done(handlers.receiveContacts);
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
