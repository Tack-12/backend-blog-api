import { Router } from "express";
import { mainPageRoutes } from "./mainPage.ts";

const indexRouter = Router();

// for login - logout :
indexRouter.use('/', mainPageRoutes);

export default indexRouter;
