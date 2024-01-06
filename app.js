import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users and messages
let users = {
  1: {
    id: "1",
    username: "John David",
  },
  2: {
    id: "2",
    username: "Bob Marley",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello world",
    userId: "1",
  },
  2: {
    id: "2",
    text: "my friend!",
    userId: "2",
  },
};

// CORS Middleware
app.use(cors());

// Routes
// All users
app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

// Single Users
app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.post("/users", (req, res) => {
  res.send("Received a POST HTTP method");
});

// Added unique identifiers
app.put("/users/:userid", (req, res) => {
  res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userid", (req, res) => {
  res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
