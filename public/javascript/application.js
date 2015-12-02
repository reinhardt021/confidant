$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),
    addContact: function (index, contact) {
      var row = $('<tr>').appendTo(handlers.container);
      $('<td>').text(contact.firstname).appendTo(row);
      $('<td>').text(contact.lastname).appendTo(row);
      $('<td>').text(contact.email).appendTo(row);
      $('<td>').text(contact.numbers).appendTo(row);
      var edit = $('<td>').appendTo(row);
      var editButton = $('<a>').text('edit').addClass('btn btn-primary edit').data( 'contact_id', contact.id );
      editButton.appendTo(edit);
      var deleteButton = $('<a>').text('delete').addClass('btn btn-primary delete').data( 'contact_id', contact.id );
      deleteButton.appendTo(edit);
        // may have to do a search within a search
        // list within a list for the numbers
    },
    receiveContacts: function (contacts) {
      $.each(contacts, handlers.addContact);
    },
    getContacts: function () {
      return $.ajax({
        url: '/contacts',
        method: 'GET',
      });  
    },
    listContacts: function () {
      handlers.container.empty(); // reset table
      handlers.getContacts().done(handlers.receiveContacts);
    },

    appendContact: function (result) {
      handlers.addContact(0, result.contact);
    },
    newContact: function (contact) {
      return $.ajax({
        url: '/contacts',
        method: 'POST',
        dataType: 'json',
        data: contact
      });
    },
    addNewContact: function () {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val(); 
      var email = $('#email').val();
      var contact = { firstName: firstName, lastName: lastName, email: email };

      handlers.newContact(contact).done(handlers.appendContact);
    },
    searchResults: function (data) {
      if (data.result) {
        $('#errorMsg').text('');
        handlers.receiveContacts(data.contacts);        
      } else {
        $('#errorMsg').text('No results');
      }

      // do failure catching if no users
    },
    searchAjax: function (search) {
      return $.ajax({
        url: '/contacts/find',
        method: 'GET',
        dataType: 'json',
        data: { search: search }
      });
    },
    newSearch: function () {
      var search = $('#search').val();
      handlers.container.empty();
      handlers.searchAjax(search).done(handlers.searchResults);
    },
    deleteAjax: function (data) {
      return $.ajax({
        url: '/contacts/delete',
        method: 'DELETE',
        dataType: 'json',
        data: { contact_id: data.contact_id }
      });
    },
    deleteContact: function () {
      var el = $(this);
      var row = el.closest('tr');
      console.log(el.data()); //data gives you the contact_id
      console.log(this); //data gives you the contact_id

      // handlers.deleteAjax(el.data()).done(function (result) {
      //   console.log(result);
      // });
      row.remove();
    },
    editContact: function () {
      var el = $(this);
      var row = el.closest('tr');
      console.log(el.data());
      console.log(row);
    }
  };

  $('#list').on('click', handlers.listContacts);
  $('#add').on('click', handlers.addNewContact);
  $('#find').on('click', handlers.newSearch);
  $(document).on('click', '.delete', handlers.deleteContact);
  $(document).on('click', '.edit', handlers.editContact);

});
