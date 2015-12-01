$(document).ready(function() {
  alert('everything has loaded');

  // function listContacts() {
  //   return $.ajax({
  //     url: '/list',
  //     method: 'GET',
  //     data: {  }
  //   });
  // }

  $('#list').on('click', function getAll() {
    $('#friends').append('button works');
  });

});
