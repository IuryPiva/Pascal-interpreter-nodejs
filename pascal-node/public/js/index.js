// Editor Settings (Provided by C9)
var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/pascal");
editor.focus();

$("#btn-run").click(function() {
  console.log(editor.getValue())
  $.ajax({
    type: "POST",
    url: '/get-code',
    data: editor.getValue(),
    dataType: 'text',
    success: function (r) {
      console.log('Data sent succesfully')
    },
    error: function (e) {
      console.log('Error at trying to send data to server...')
    }
  })
})