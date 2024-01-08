const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleawre
app.use(express.urlencoded({ extended: false }));

//connection DB
const URL =
  "mongodb+srv://sakinislam79:sakinislam79@cluster0.2nxdsyr.mongodb.net";
const file = "youtube";
mongoose
  .connect(`${URL}/${file}`)
  .then(() => console.log("MongoDb connected"))
  .catch((e) => {
    console.log("Database connection error", e);
  });
//Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

//Get a single user using ID
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: "user not found",
    });
  }
  return res.json(user);
});

//Get all the user
app.get("/", async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json({ allUser });
});

//Get all the user name and email
app.get("/users", async (req, res) => {
  const alDBuser = await User.find({});
  const html = `<ul>
   ${alDBuser
     .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
     .join("")}
  
  </ul>`;
  res.send(html);
});

//Post any Data in database
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({
      message: "All feild are required",
    });
  }
  await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });
  return res.status(201).json({ message: `result` });
});

//Delete a user using id
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "User deleted",
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
