const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

//middleawre
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
app.get("/users", (req, res) => {
  const html = `<ul>
   ${users.map((users) => `<li> ${users.first_name}</li>`).join("")}
  
  </ul>`;
  res.send(html);
});

app.post("/api/post", (req, res) => {
  const body = req.body;
  const id = users.length + 1;
  users.push({ ...body, id });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id });
  });
});



const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

