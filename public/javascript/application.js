$(document).ready(function() {
  alert('everything has loaded');

  function listContacts() {
    return $.ajax({
      url: '/list',
      method: 'GET',
      data: {  }
    });
  }

  $('#list').on('click', function getAll() {
    var p = $('<p>').text('button clicked');
    var friend_box = $('#friends');
    friend_box.append(p);

    listContacts().done(function addToPage(data) {
      for (var i = 0; i < data.length; i++) {
        var box = $('<div>').text(data[i].email);
        friend_box.append(box);
      }
    });

  });

});
