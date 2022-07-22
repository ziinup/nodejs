var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
    var template = `<!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="?id=html">HTML</a></li>
        <li><a href="?id=css">CSS</a></li>
        <li><a href="?id=javascript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p style="margin-top:45px;">
        ${description}
      </p>
      <hr>
      <p>node.js 17</p>
    </body>
    </html>`;

    response.end(template);
    });
   
});
app.listen(3000);