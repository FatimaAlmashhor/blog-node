const http = require('http');
const route = require('url');
const fs = require('fs');
http.createServer((req, res) => {
    try {

        switch (req.url) {
            case '/':
            case '/home':

                fs.readFile(__dirname + '/src/index.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                // fs.readFile(__dirname + '/src/css/style.css', function (err, data) {
                //     if (err) console.log(err);
                //     res.writeHead(200, { 'Content-Type': 'text/css' });
                //     res.write(data);
                //     res.end();
                // });

                break;
            case '/blog':
                fs.readFile('./src/bloges.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                break;
            case '/admin':
            case '/login':
                fs.readFile('./src/login.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                // }
                break;
            case '/admin?role=admin':
                fs.readFile('./src/admin.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                break;
            default:

                fs.readFile('./src/noFound.html', function (err, html) {
                    if (err) throw err;
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end()
                })
                break;
        }


    } catch (er) {
        console.log(er);
        res.statusCode = 500;
        res.end()
    }

}).listen(5000)

