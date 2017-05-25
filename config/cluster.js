var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();

console.log('\n\nexecutando thread');

if (cluster.isMaster) {
    console.log('thread master');

    // abre um node filho para cada cpu
    cpus.forEach(function () {
        cluster.fork();
    });

    cluster.on('listening', function (worker) {
        console.log('cluster conectado ' + worker.process.pid);
    });
    
    cluster.on('exit', worker => {
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork();
    });

} else {    
    console.log('thread slave');

    //slave sobe o server
    require('../server');
}