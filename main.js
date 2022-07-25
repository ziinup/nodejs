var http = require('http');
var fs = require('fs');
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
      if(queryData.id === undefined){  
        fs.readdir('./data', function(error, filelist){
          var i = 0;
          var list = '<ol>';
          while(i < filelist.length){
            var list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i+1;
          }
          var list = list + '</ol>';
        
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        var template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            ${list}
          </ol>
          <h2>${title}</h2>
          <p style="margin-top:45px;">
            ${description}
          </p>
          <hr>
          <p>node.js 23</p>
        </body>
        </html>`;
        response.writeHead(200);
        response.end(template);
      });
        } else {
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
              <p>node.js 23</p>
            </body>
            </html>`;
            response.writeHead(200);
            response.end(template);
          });
        }
      } else {
        response.writeHead(404);
        response.end('Not found');
      }

});
app.listen(3000);  