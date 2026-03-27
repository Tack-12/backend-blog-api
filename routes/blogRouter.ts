import { Router } from 'express';
import { allPosts, deletePost, specificPost, updatePost, uploadPost } from '../controller/blogController.ts';
import { commentsRouter } from './commentsRoutes.ts';
import { passport } from '../utils/passport.ts';
const postsRouter = Router();

const middleware = passport.authenticate('jwt', { session: false });
//Get all Posts:
postsRouter.get("/", allPosts);

//Get specific post:
postsRouter.get("/:postId", specificPost);

//Uplod post:
postsRouter.post("/upload", middleware, uploadPost);

//Update Post:
postsRouter.put("/:postId", middleware, updatePost);

//Delete Post:
postsRouter.delete("/:postId", middleware, deletePost);

//BLOG Router for comments:

postsRouter.use("/:postId/comments", middleware, commentsRouter);

export { postsRouter };
