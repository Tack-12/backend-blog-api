import { Router } from "express";
import { loginRouter } from "./loginRoutes.ts";
import { postsRouter } from "./blogRouter.ts";

const indexRouter = Router();

// for login - logout :
indexRouter.use('/', loginRouter);

//For Posts/blogs/comments on Posts:
indexRouter.use('/posts', postsRouter);

export default indexRouter;
