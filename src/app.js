import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import models from "../src/models/models.js";
import routes from "./routes";

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
  // console.log(req.context);
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);


app.listen(process.env.port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
