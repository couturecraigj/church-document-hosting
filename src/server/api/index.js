import { Router } from "express";
import bodyParser from "body-parser";
import signup from "./signup";
import login from "./login";

const app = Router();
app.use(bodyParser.json());
app.use("/signup", signup);
app.use("/login", login);

export default app;
