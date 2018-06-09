// Editor Settings (Provided by C9)
var editor = ace.edit("editor");

var socket = io();

editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/pascal");

function run() {
  const data = {
    code: editor.getValue()
  }
  socket.emit('run(f5)', data)
}

socket.on('doneCompiling', function (data) {
  insertDataTable(data.stack)
  if (data.parsedStack.length > 0) {

    data.parsedStack.forEach(element => {
      var html = '';
      html = "<h6>" + currentDate() + " - " + element.error + "</h6>"
      insertDataConsole(html)
    });

  } else if (data.semanticStack.length > 0) {
    html = "<h6>" + currentDate() + " - " + data.semanticStack[0] + "</h6>"
    insertDataConsole(html)

  } else {
    html = "<h6>" + currentDate() + " - " + data.parsedStack.success + "</h6>"

    insertDataConsole(html)
  }
})
socket.on('lexerError', function (error) {
  var html = '';

  html = "<h6>" + currentDate() + " - " + error + "</h6>"

  insertDataConsole(html)

})

socket.on('semanticError', function (error) {
  var html = '';

  html = "<h6>" + currentDate() + " - " + error + "</h6>"

  insertDataConsole(html)

})
editor.commands.addCommand({
  name: 'run',
  bindKey: {
    win: 'f5',
    mac: 'f5'
  },
  exec: run,
  readOnly: true
});
editor.focus();

hotkeys('f5', function (event, handler) {
  // Prevent the default refresh event under WIDNOWS system
  event.preventDefault()
  run()
});

$("#btn-run").click(run)


function insertDataConsole(data) {
  $('#terminal').append(data);

  $("#terminal").animate({
    scrollTop: $('#terminal').prop("scrollHeight")
  }, 0);

}
function insertDataTable(stack) {

  $('#table-body')[0].innerHTML = ''
  stack.forEach(element => {
    var html = '';

    html = "<tr> <td> " + element.word + "</td><td>" + element.line + "</td><td>" + element.token + "</td></tr>";

    $('#table-body').append(html);
  });


}

function currentDate() {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month;
  }
  day = "" + now.getDate();
  if (day.length == 1) {
    day = "0" + day;
  }
  hour = "" + now.getHours();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  minute = "" + now.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  second = "" + now.getSeconds();
  if (second.length == 1) {
    second = "0" + second;
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}