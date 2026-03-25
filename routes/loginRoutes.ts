import { Router } from "express";
import { signUp, signIn } from "../controller/mainController.ts";

const loginRouter = Router();

loginRouter.post("/signup", signUp)

//Use passport-local to sign in:
loginRouter.post("/signin", signIn)


export { loginRouter };
