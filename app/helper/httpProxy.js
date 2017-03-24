var http = require('http');
var httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your target server
//
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(5060);


//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function (req, res) {
    // You can define here your custom logic to handle the request
    console.log('method:', req.method, req.url);

    //parse request and treat the path

    //proxy request to correct path on the new server    

    // and then proxy the request.
    proxy.web(req, res, { target: 'http://127.0.0.1:5060' });
});

console.log("listening on port 5050")
server.listen(5050);



