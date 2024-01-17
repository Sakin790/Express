const express = require("express");
const app = express();
const PORT = 8080;

app.post("/", (request, response) => {
  response.json({
    message: "Home Route",
  });
  console.log(request.pid);
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
