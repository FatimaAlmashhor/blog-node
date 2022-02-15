const http = require('http');
const route = require('url');
const fs = require('fs');
const path = require('path')
const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};


const file = (fileName) => fs.createReadStream(fileName, 'utf-8');

const renderLinks = (req, res) => {
    // console.log('[style path ]', req.url);
    // // console.log();
    switch (path.extname(req.url)) {
        case '.css':
            res.setHeader('Content-Type', 'text/css');
            file(`./src${req.url}`).pipe(res);
            break;
        case '.js':
            res.setHeader('Content-Type', 'text/javascript');
            file(`./src${req.url}`).pipe(res);

            break;
        case '.jpg':
            res.setHeader('Content-Type', mimetypes['jpg']);
            file(`./src${req.url}`).pipe(res);
            break;
        case '.png':
            res.setHeader('Content-Type', mimetypes['png']);
            file(`./src${req.url}`).pipe(res);
            break;
        case '.jpeg':
            res.setHeader('Content-Type', mimetypes['jpeg']);
            file(`./src${req.url}`).pipe(res);
            break;
        default:
            break
    }

    // console.log(req.url);
    // console.log(req.url.startsWith('/assets/css/main.css'));
    // if (req.url.startsWith('/style.css')) {
    //     res.setHeader('Content-Type', 'text/css');
    //     file(`./src${req.url}`).pipe(res);
    // }
}
http.createServer((req, res) => {

    try {
        renderLinks(req, res)
        // console.log(req.url);
        // console.log(req.url.startsWith('/css/style.css'));
        // if (req.url.startsWith('/css/style.css')) {
        //     res.setHeader('Content-Type', 'text/css');
        //     file('./src/css/style.css').pipe(res);
        // }
        switch (req.url) {
            case '/':
            case '/home':
                res.setHeader("Content-Type", "text/html");
                file('./src/index.html').pipe(res);

                break;
            case '/blog':
                res.setHeader("Content-Type", "text/html");
                file('./src/bloges.html').pipe(res);
                break;
            case '/admin':
            case '/login':
                res.setHeader("Content-Type", "text/html");
                file('./src/login.html').pipe(res);
                // }
                break;
            case '/admin?role=admin':

                res.setHeader("Content-Type", "text/html");
                file('./src/admin.html').pipe(res);

                break;
            default:

                res.setHeader("Content-Type", "text/html");
                file('./src/noFound.html').pipe(res);

                break;
        }


    } catch (er) {
        console.log(er);
        res.statusCode = 500;
        res.end()
    }

}).listen(5000)

