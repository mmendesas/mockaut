var net = require('net');

// The servers we will proxy to
var upstreamServerAddresses = [
    { address: '127.0.0.1', port: '3000' },
    { address: '127.0.0.1', port: '3001' },
    { address: '127.0.0.1', port: '3002' },
];

// This is where you pick which server to proxy to
// for examples sake, I choose a random one
function getServerBasedOnAddress(address) {
    return upstreamServerAddresses[Math.floor((Math.random() * 3))]
}

// Create the proxy server
net.createServer(function (socket) {

    socket.on('data', function (data) {
        upstream = getServerBasedOnAddress(socket.remoteAddress);
        net.connect(upstream.port, upstream.address, function (connection) {
            this.write(data);
        });
    })

}).listen(5000, function () {
    console.log("Ready to proxy data");
});

// Create the upstream servers
for (var i = 0; i < upstreamServerAddresses.length; i++) {
    var upstream = upstreamServerAddresses[i];

    net.createServer(function (socket) {
        socket.on('data', function (data) {
            console.log("Received some data on " + upstream.address + ":" + upstream.port);
            console.log(data);
        });
    }).listen(upstream.port);
}