var gateway = 'http://localhost:8100';
$(document).ready(function(){
  $('#buttonLogin').click(function(){
      $.ajax({
        url: gateway+'/user',
        type: 'POST',
        result: function(json) {

        }
      });
  });
});
