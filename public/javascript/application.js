$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),
    addContact: function (index, contact) {
      var row = $('<tr>').appendTo(handlers.container);
      $('<td>').text(contact.firstname).appendTo(row);
      $('<td>').text(contact.lastname).appendTo(row);
      $('<td>').text(contact.email).appendTo(row);
      $('<td>').text(contact.numbers).appendTo(row);
      // var edit = $('<td>').appendTo(row);
      // var editButton = $('<a>').text('edit').addClass('btn btn-primary edit').data( 'contact_id', contact.id );
      // editButton.appendTo(edit);
      // var deleteButton = $('<a>').text('delete').addClass('btn btn-primary delete').data( 'contact_id', contact.id );
      // deleteButton.appendTo(edit);
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
    },
    appendContact: function (result) {
      handlers.addContact(0, result.contact);
    },
    addNewContact: function () {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val(); 
      var email = $('#email').val();
      var contact = { firstName: firstName, lastName: lastName, email: email };

      handlers.newContact(contact).done(handlers.appendContact);
    }


  };

  $('#list').on('click', handlers.listContacts);
  $('#add').on('click', handlers.addNewContact);
  $('#find').on('click', function () {
    var search = $('#search').val();

    

  });

  // $('.edit').on('click', function editContact() {
  //   // var el = $(this);
  //   console.log('el');
  //   // debugger
  // });

});
