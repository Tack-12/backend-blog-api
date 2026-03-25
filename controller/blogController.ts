import type { Request, Response } from 'express'
import { prisma } from '../db/prisma'
import { Role } from '../generated/prisma/enums';

export const allPosts = async (req: Request, res: Response) => {

        const posts = await prisma.posts.findMany();

        if (posts.length < 0) {
                return res.status(404).json({
                        message: "No Posts To Show",
                });
        }

        return res.json({
                message: "Fetched the posts",
                posts,
        });
};

export const specificPost = async (req: Request, res: Response) => {

        const p_id: number = Number(req.params.postId);

        const post = await prisma.posts.findUnique({
                where: {
                        p_id
                }
        });

        if (!post) {
                return res.status(404).json({
                        message: "No Posts To Show",
                });
        };

        res.status(200).json({
                message: "Fetched the post",
                posts: post,
        });
};

export const uploadPost = async (req: Request, res: Response) => {

        let { title, blog, time, privacy } = req.body;

        //Change privacy type:
        if (Number(privacy) === 1) {
                privacy = Role.AUTHOR
        } else {
                privacy = Role.USER
        };

        //Get the token and use the author Id
        //Get AuthorId:
        const authorId: number = Number(req.params.userId);

        try {
                await prisma.posts.create({
                        data: {
                                title,
                                blog,
                                authorId,
                                time,
                                privacy
                        }
                });
        } catch (err) {
                return res.send(404).json({
                        message: "User Cannot be created"
                })
        }

        return res.send(200).json({
                message: "User has been Created",
        })
}


export const updatePost = async (req: Request, res: Response) => {

        const postid: number = Number(req.params.postId);
        let { blog, title } = req.body;

        try {
                await prisma.posts.update({
                        where: {
                                p_id: postid,
                        },
                        data: {
                                blog,
                                title,
                        }
                })
        } catch (err) {
                return res.status(404).json({
                        message: "User Not found"
                })
        }

        return res.status(200).json({
                message: "User's Data Changed",
        });
};

export const deletePost = async (req: Request, res: Response) => {

        const p_id: number = Number(req.params.postId);

        try {
                await prisma.posts.delete({
                        where: {
                                p_id,
                        }
                });
        } catch (err) {
                return res.status(404).json({
                        message: "User Not Found"
                })
        }

        return res.status(200).json({
                message: "User Deleted Sucessfully"
        });
}
