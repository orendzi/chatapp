// var exec = require("child_process").exec; // timing of execution for unblocking operations for 1 flow
//
// function start(response) {
//   console.log("Request handler 'start' was called.");
//   exec("ls -lah", function(error, stdout, stderr) {
//     response.writeHead(200, {"Content-Type": "text/plain"}); // if success status head
//     response.write(stdout); // msg
//     response.end(); // end of response
//   });
// }
//
// function upload(response) {
//   console.log("Request handler 'upload' was called.");
//   response.writeHead(200, {"Content-Type": "text/plain"}); // if success status head
//   response.write("Hello Upload!"); // msg
//   response.end(); // end of response
// }
//
// exports.start = start;
// exports.upload = upload;

// var html = require("html/index.html");
// https://gist.github.com/hectorcorrea/2573391

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function upload(response, request) { // killed postData = request instead
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Error Windows: try to rename existing file */
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if(err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });

  });

  response.writeHead(200, {"Content-Type": "text/html"}); // if success status head
  response.write("recieved image:<br/>"); // msg
  response.write("<img src='/show' />");
  response.end(); // end of response
}

function show(response) { // killed postData
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) { // file system error
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function getFile(response, filePath, contentType) {
  fs.readFile(filePath, "utf8", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": contentType});
      response.write(file, "utf8");
      response.end();
    }
  });
}

function loadIndex(response) {getFile(response, "html/index.html", "text/html")};
function loadStyle(response) {getFile(response, "css/style.css", "text/css")};
function loadScript(response) {getFile(response, "js/app.js", "javascript")};

exports.upload = upload;
exports.show = show;
exports.loadIndex = loadIndex;
exports.loadStyle = loadStyle;
exports.loadScript = loadScript;
