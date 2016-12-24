var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


// Hash-map data structure, keys = pathnames, values = functions for paths
var handle = {
  "/": requestHandlers.loadIndex,
  "/upload": requestHandlers.upload,
  "/show": requestHandlers.show,
  "/index": requestHandlers.loadIndex,
  "/style": requestHandlers.loadStyle,
  "/script": requestHandlers.loadScript
};

// handle["/"] = requestHandlers.start;
// handle["/start"] = requestHandlers.start;
// handle["/upload"] = requestHandlers.upload;
// handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
