// content of index.js
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
    console.log(request.url)
    console.log(fib(15));
    response.end('Hello Node.js Server!')    
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

function fib(n) {
    if (n > 1) {
        return fib(n - 1) + fib(n - 2)
    } else {
        return n;
    }
}