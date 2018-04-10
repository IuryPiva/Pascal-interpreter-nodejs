// Editor Settings (Provided by C9)
var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/pascal");

function run() {
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
}
editor.commands.addCommand({
  name: 'run',
  bindKey: {win: 'f5',  mac: 'f5'},
  exec: run,
  readOnly: true
});
editor.focus();

hotkeys('f5', function(event, handler){
  // Prevent the default refresh event under WIDNOWS system
  event.preventDefault()
  run()
});

$("#btn-run").click(run)

function insertDataTable(stack) {
  $('#table-body')[0].innerHTML = ''
  stack.forEach(element => {
    var html = '';

    html = "<tr> <td> " + element.word + "</td><td>" +  element.line + "</td><td>" + element.token + "</td></tr>";	
    
  
    $('#table-body').append(html);
  });


}