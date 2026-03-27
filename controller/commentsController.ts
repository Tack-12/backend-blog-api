import { prisma } from "../db/prisma.ts"
import type { Request, Response } from 'express';

export const fetchComments = async (req: Request, res: Response) => {

        const p_id: number = Number(req.params.postId);


        const comments = await prisma.comments.findMany({
                where: {
                        post_id: p_id
                }
        })

        if (comments.length <= 0) {
                return res.status(404).json({
                        message: "No Comments for the Post"
                });
        }

        return res.status(200).json({
                message: "Comments",
                comments
        });
};

export const postComments = async (req: Request, res: Response) => {

        const { comment } = req.body;
        const p_id: number = Number(req.params.postId);
        const userId = Number(req.user.id);

        try {
                await prisma.comments.create({
                        data: {
                                post_id: p_id,
                                userId: Number(userId),
                                comment
                        }
                })
        } catch (err) {
                return res.status(404).json({
                        message: "Cannot Post Comments",
                        err
                });
        };

        return res.status(200).json({
                message: "Comment has been Posted",
        });
};


export const editComments = async (req: Request, res: Response) => {

        const cId = req.params.cId;
        const post_id = req.params.postId;
        const { comment } = req.body;

        try {
                await prisma.comments.update({
                        where: {
                                c_id: Number(cId),
                                AND: {
                                        post_id: Number(post_id),
                                }
                        },
                        data: {
                                comment
                        }
                })
        } catch (err) {
                return res.status(404).json({
                        message: "Cannot Update Comment",
                        err
                });
        };

        return res.status(200).json({
                message: "Comment Updated"
        });
};


export const deleteComment = async (req: Request, res: Response) => {

        const cId: number = Number(req.params.cId);

        try {
                await prisma.comments.delete({
                        where: {
                                c_id: Number(cId)
                        }
                });
        } catch (err) {
                return res.status(404).json({
                        message: "Couldnt Delete Error",
                        err
                });
        }


        return res.status(200).json({
                message: "User Sucessfully Deleted",
        })
}
