const net = require('net');

function findFreePort(startPort = 3000, maxAttempts = 10) {
  return new Promise((resolve, reject) => {
    let currentPort = startPort;

    function checkPort(port) {
      const server = net.createServer();
      
      server.listen(port, () => {
        server.close(() => {
          resolve(port);
        });
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          if (currentPort - startPort >= maxAttempts) {
            reject(new Error(`No free port found after ${maxAttempts} attempts`));
          } else {
            checkPort(++currentPort);
          }
        } else {
          reject(err);
        }
      });
    }

    checkPort(currentPort);
  });
}

findFreePort()
  .then(port => {
    console.log(`Free port found: ${port}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
