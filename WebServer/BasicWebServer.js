var http = require('http'),
    fs = require('fs'),
    path = require('path')
    host = '172.20.2.110',
    port = '9090';

var mimes = {
  ".htm" : "text/html",
  ".css" : "text/css",
  ".js"  : "text/javascript",
  ".gif" : "image/gift",
  ".jpg" : "image/jpeg",
  ".png" : "image/png"
}

var server = http.createServer(function(req, res){
    var filePath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mimes[path.extname(filePath)];
    //Check to see if the file is exists
    fs.exists(filePath, function(file_exists){
      if(file_exists){
        fs.readFile(filePath, function(error, content){
          if(error){
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, { 'Content-Type' : contentType});
            res.end(content, 'utf-8');
          }
        })
      } else {
        res.writeHead(404);
        res.end("Sorry, we could not find the file you requested !");
      }
    });
}).listen(port, host, function(){
  console.log("Server running on http://" + host + ':' + port);

})
