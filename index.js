const http = require('http');
const route = require('url');
const fs = require('fs');
http.createServer((req, res) => {
    try {

        switch (req.url) {
            case '/':
            case '/home':
                fs.readFile(__dirname + '/public/index.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                fs.readFile(__dirname + '/public/css/style.css', function (err, data) {
                    if (err) console.log(err);
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                });
                break;
            case '/blog':
                fs.readFile('./public/bloges.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                break;
            case '/admin':
                var currentUrl = route.parse('http://localhost:5000/' + req.url.toString(), true)
                res.write(currentUrl.search);
                res.end();
                if (currentUrl.search === null) {
                    fs.readFile('./public/login.html', function (err, html) {
                        if (err) throw err;
                        res.writeHeader(200, { "Content-Type": "text/html" });
                        res.write(html);
                        res.end()
                    })
                }
                else {
                    res.write(currentUrl.query);
                    res.end();
                    fs.readFile('./public/admin.html', function (err, html) {
                        if (err) throw err;
                        res.writeHeader(200, { "Content-Type": "text/html" });
                        res.write(html);
                        res.end()
                    })
                }
                break;
            // default:
            //     fs.readFile('./public/noFound.html', function (err, html) {
            //         if (err) throw err;
            //         res.writeHeader(200, { "Content-Type": "text/html" });
            //         res.write(html);
            //         res.end()
            //     })
            //     break;
        }


    } catch (er) {
        console.log(er);
        res.statusCode = 500;
        res.end()
    }

}).listen(5000)

