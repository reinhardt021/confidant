$(document).ready(function() {

  var handlers = {
    container: $('#friends').find('tbody'),

    addContact: function (index, contact) {
      var row = $('<tr>').appendTo(handlers.container);
      $('<td>').addClass('editable firstName').text(contact.firstname).appendTo(row);// add class names 
      $('<td>').addClass('editable lastName').text(contact.lastname).appendTo(row);// select class to remove text and put input field with preset value of contact name
      $('<td>').addClass('editable email').text(contact.email).appendTo(row);
      var nums = $('<td>').appendTo(row);

      if (contact.numbers != undefined) {
        if (contact.numbers.length > 0 ) {
          $.each(contact.numbers, function (index, num) {
            $('<div>').text(num.number_class + ': ' + num.digits).appendTo(nums);
          });
        }
      }

      var edit = $('<td>').appendTo(row);
      var editButton = $('<button>').text('edit').addClass('btn btn-primary edit').data( 'contact_id', contact.id );
      editButton.appendTo(edit);
      var deleteButton = $('<button>').text('delete').addClass('btn btn-primary delete').data( 'contact_id', contact.id );
      deleteButton.appendTo(edit);
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
      handlers.container.empty();
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
        url: '/contacts/'+ data.contact_id +'/delete',
        method: 'DELETE',
        dataType: 'json',
      });
    },
    deleteContact: function () {
      var el = $(this);
      var row = el.closest('tr');

      handlers.deleteAjax(el.data()).done(function (result) {
        row.remove();
      });
    },
    editContact: function () {
      var btn = $(this);
      btn.closest('tr').children('.editable').attr('contenteditable', true).addClass('editableCell');
      btn.toggleClass().addClass('btn btn-primary update').text('update');
    },
    updateContact: function () {
      var btn = $(this);
      var row = btn.closest('tr');
      var id = btn.data().contact_id;
      var updatedContact = {
        firstName: row.children('.firstName').text(),
        lastName: row.children('.lastName').text(),
        email: row.children('.email').text()
      };
      $.ajax({
        url: '/contacts/'+ id,
        method: 'PUT',
        dataType: 'json',
        data: updatedContact
      });
      row.children('.editable').attr('contenteditable', false);
      btn.toggleClass().addClass('btn btn-primary edit').text('edit');
    }
  };

  $('#list').on('click', handlers.listContacts);
  $('#add').on('click', handlers.addNewContact);
  $('#find').on('click', handlers.newSearch);
  $(document).on('click', '.delete', handlers.deleteContact);
  $(document).on('click', '.edit', handlers.editContact);
  $(document).on('click', '.update', handlers.updateContact);


  $('#newSearch').on('click', function () {
    $('#searchForm').show();
    $('#addForm').hide();
  });

  $('#addNew').on('click', function () {
    $('#addForm').show();
    $('#searchForm').hide();
  });

});
