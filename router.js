function route(handle, pathname, response, request) { // killed postData = request instead
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request); // obj_name[key] - hash map calling fn from obj value
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"}); // if success status head
    response.write("404 Not found"); // msg
    response.end(); // end of response
  }
}
exports.route = route;
