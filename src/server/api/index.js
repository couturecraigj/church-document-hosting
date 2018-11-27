import { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import signup from "./signup";
import login from "./login";

const preppedCors = cors({
  origin: true,
  methods: ["POST", "GET"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials"
  ],
  preflightContinue: true,
  credentials: true
});

const app = Router();
app.use(morgan("combined"));
app.options("*", preppedCors);
app.use(preppedCors);
app.use(bodyParser.json());
app.use("/signup", signup);
app.use("/login", login);

export default app;
