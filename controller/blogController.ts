import type { Request, Response } from 'express'
import { prisma } from '../db/prisma.ts'
import { View } from '../generated/prisma/enums.ts';

export const allPosts = async (req: Request, res: Response) => {

        const posts = await prisma.posts.findMany();

        if (posts.length <= 0) {
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

        let { title, blog, privacy, authorId } = req.body;

        //Change privacy type:
        if (Number(privacy) === 1) {
                privacy = View.PUBLIC
        } else {
                privacy = View.PRIVATE
        };


        console.log(title, blog, privacy, Number(authorId));

        try {
                await prisma.posts.create({
                        data: {
                                title,
                                blog,
                                authorId: Number(authorId),
                                privacy
                        }
                });
        } catch (err) {
                return res.json({
                        message: "Post Cannot be created",
                        err
                })
        }

        return res.status(200).json({
                message: "Post has been Created",
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
                        message: "Post Not found",
                        err
                })
        }

        return res.status(200).json({
                message: "Post's Data Changed",
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
                        message: "Post Not Found",
                        err
                })
        }

        return res.status(200).json({
                message: "Post Deleted Sucessfully"
        });
}
