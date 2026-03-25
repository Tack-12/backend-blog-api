import { Router } from "express";
import { signUp, signIn } from "../controller/mainController.ts";

const mainPageRoutes = Router();

mainPageRoutes.post("/signup", signUp)

//Use passport-local to sign in:
mainPageRoutes.post("/signin", signIn)


export { mainPageRoutes };
