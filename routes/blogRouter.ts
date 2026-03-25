import { Router } from 'express';
import { allPosts, deletePost, specificPost, updatePost, uploadPost } from '../controller/blogController';

const postsRouter = Router();

//Get all Posts:
postsRouter.get("/", allPosts);

//Get specific post:
postsRouter.get("/:postId", specificPost);

//Uplod post:
postsRouter.post("/upload", uploadPost);

//Update Post:
postsRouter.put("/:postId", updatePost);

//Delete Post:
postsRouter.delete("/:postId", deletePost);

export { postsRouter };
