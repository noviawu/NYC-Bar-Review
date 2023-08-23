import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import * as db from "./database.js";

const app = express();
app.use(
  cookieSession({
    secret: "cookiesecret",
    signed: false,
    name: "__session",
  })
);
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/api/login", (req, res) => {
  /**
   * Login the user using our mock login
   *
   * Only a username is needed for our mock login system.
   * Get the username from the request body and to a cookie
   * session to begin their logged in session.
   *
   * Return:
   * 200 OK - no body
   * 400 Bad Request - when no username is provided
   */
  const { username } = req.body;
  if (username) {
    req.session.username = username;
    console.log("logged in");
    res.status(200).send();
  } else {
    res.status(400).send({ message: "Bad Request: Missing username" });
  }
});

export default app;
