const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;

//Amar machine a joto core ace toto gulo load Balancer create kora  jabe
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const app = express();
  const PORT = 8000;

  app.get("/", (req, res) => {
    return res.json({
      message: `This is Home Route ${process.pid}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}
