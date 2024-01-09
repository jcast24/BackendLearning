import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import models from "../src/models/models.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors());

// Custom middleware
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1], // authenticated user 
  };
  console.log(req.context);
  next();
});

app.get("/session", (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
})

// Routes
// All users
app.get("/users", (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

// Single Users
app.get("/users/:userId", (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id, 
  };
  
  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;
  return res.send(message);
});


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
