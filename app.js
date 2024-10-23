console.log("everything is ok");
var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);

    if (q.pathname == "/") {
      q.pathname = q.pathname + "index";
    }

    const filename = "." + q.pathname + ".html";

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        const page404 = fs.readFileSync("./404.html", "utf-8", (err, data) => {
          if (err) throw err;
          return data;
        });
        res.write(page404);
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
