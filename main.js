var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body){
  return `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">CREATE</a>
    ${body}
    <hr>
    <p>node.js 32</p>
  </body>
  </html>`;
};

function listing(target){
  var i = 0;
  var list = '<ol>';
  while(i < target.length){
    var list = list + `<li><a href="/?id=${target[i]}">${target[i]}</a></li>`;
   i = i+1;
  }
  var list = list + '</ol>';
  return list;
};

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
      if(queryData.id === undefined){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        
        fs.readdir('./data', function(error, filelist){
          var list = listing(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2><p style="margin-top:45px;">${description}</p>`);
          response.writeHead(200);
          response.end(template);
        });
        } else {
          fs.readdir('./data', function(error, filelist){
            var list = listing(filelist);
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
              var template = templateHTML(title, list, `<h2>${title}</h2><p style="margin-top:45px;">${description}</p>`);
              response.writeHead(200);
              response.end(template);
            });
          });
        }
      } else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
          var list = listing(filelist);
          var template = templateHTML(title, list, `<form action="http://localhost:3000/create_process" method="post"><div><label for="tit">Title<label><input id="tit" name="tit" type="text" /></div><div><label for="conts">Contents</label><textarea id="conts" name="conts"></textarea></div><button>Insert</button></form>`);
          response.writeHead(200);
          response.end(template);
        });
      }else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
          body = body + data;
        });
        request.on('end', function(){
          var post = qs.parse(body);
          var title = post.tit;
          var contents = post.conts;
          console.log(post);
        });
        response.writeHead(200);
        response.end('Success');
      } else {
        response.writeHead(404);
        response.end('Not found');
      }
});
app.listen(3000);