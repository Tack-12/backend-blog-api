import { Router } from "express";
import { deleteComment, editComments, fetchComments, postComments } from "../controller/commentsController.ts";

const commentsRouter = Router({ mergeParams: true });

//Get Comments on a post:
commentsRouter.get("/", fetchComments);

//Post a comment on a post:
commentsRouter.post("/", postComments);

//Edit a comment:
commentsRouter.put("/:cId", editComments);

//Delete a comment:
commentsRouter.delete("/:cId", deleteComment);


export { commentsRouter };
