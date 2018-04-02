// Editor Settings (Provided by C9)
var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/pascal");
editor.focus();


$("#btn-run").click(function() {
  const data = {code: editor.getValue()}
  $.ajax({
    type: "POST",
    url: '/get-code',
    data: data,
    dataType: 'json',
    success: function (r) {
      console.log('Data sent succesfully')
      insertDataTable(r)
    },
    error: function (e) {
      console.log('Error at trying to send data to server...')
    }
  })
})

function insertDataTable(stack) {
  stack.forEach(element => {
    var html = '';

    html = "<tr> <td> " + element.word + "</td><td>" +  element.line + "</td><td>" + element.token + "</td></tr>";	
				
				$('#table-body').append(html);
  });


}