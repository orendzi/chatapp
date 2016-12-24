var formidable = require("formidable"),
    port = 8888,
    http = require("http"), // turn on http-module
    path = require("path"),
    url = require("url"), // path management
    pug = require("pug"); // templates

function start(route, handle) { // fn for exporting this module to other files
  function onRequest(request, response) {
    // var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Ding-dong. Request for " + pathname + " recieved!");
    route(handle, pathname, response, request);
    // request.setEncoding("utf8"); // data expected
    //
    // request.addListener("data", function(postDataChunk) { // listener for event 'data'
    //   postData += postDataChunk; // catch every time the event happens new chunk of data and add it here
    //   console.log("Received POST data chunk " + postDataChunk + ".");
    // });
    //
    // request.addListener("end", function() { // when all data gathered
    //   route(handle, pathname, response, postData); // callback fn - start routing
    // });
  }
  http.createServer(onRequest).listen(port); // callback fn
  console.log("Sever has started!");
}

// TPLS RENDERING! placeholder-val can be json var locals - see docs
// pug.renderFile('tpl.pug', {placeholder: 'value'}, function(err, html) {
//   if err {
//     console.log(err);
//   }
//   console.log(html);
// })

exports.start = start; // fn export
