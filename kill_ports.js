const { exec } = require('child_process');

const ports = [3000, 3001, 3002, 3003];

function killPortProcesses(ports) {
  ports.forEach(port => {
    // For Unix-like systems
    exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
      if (error) {
        console.warn(`Could not kill process on port ${port}: ${error}`);
        return;
      }
      console.log(`Killed processes on port ${port}`);
    });

    // For Windows (uncomment if needed)
    // exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
    //   if (stdout) {
    //     const pid = stdout.trim().split(/\s+/).pop();
    //     exec(`taskkill /PID ${pid} /F`, (killError) => {
    //       if (killError) console.warn(`Could not kill PID ${pid}`);
    //     });
    //   }
    // });
  });
}

killPortProcesses(ports);
