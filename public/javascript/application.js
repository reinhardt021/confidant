$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),
    addContact: function (index, contact) {
      var row = $('<tr>').appendTo(handlers.container);
        $('<td>').text(contact.firstname).appendTo(row);
        $('<td>').text(contact.lastname).appendTo(row);
        $('<td>').text(contact.email).appendTo(row);
        $('<td>').text(contact.numbers).appendTo(row);
        $('<td>').text('edit').appendTo(row);
        $('<td>').text('delete').appendTo(row);
        // may have to do a search within a search
        // list within a list for the numbers
    },
    receiveContacts: function (contacts) {
      $.each(contacts, handlers.addContact);
    },
    listContacts: function () {
      handlers.container.empty(); // reset table
      handlers.getContacts().done(handlers.receiveContacts);
    },
    getContacts: function () {
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
    }
  };

  $('#list').on('click', handlers.listContacts);

  $('#add').on('click', function addContact() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val(); 
    var email = $('#email').val();
    var contact = { firstName: firstName, lastName: lastName, email: email };

    handlers.newContact(contact).done(handlers.addContact);
    
    var tr = $('<tr>')

  });

});
