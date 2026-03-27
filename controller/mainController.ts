import { prisma } from "../db/prisma.ts";
import type { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { createJwt } from "../utils/functions.ts";

export const signUp = async (req: Request, res: Response) => {

        const { email, u_name, password } = req.body;

        const user = await prisma.user.findFirst({
                where: {
                        email,
                }
        });

        if (!user) {
                const hashed_password = await bcrypt.hash(password, 10);

                await prisma.user.create({
                        data: {
                                email,
                                u_name,
                                password: String(hashed_password),
                        }
                });


                return res.status(200).json({ message: "User Created." })
        }

        return res.status(403).json({ message: "User already Exists." })
};

export const signIn = async (req: Request, res: Response) => {


        const { email, password } = req.body;


        const user = await prisma.user.findUnique({
                where: {
                        email,
                }
        });

        if (!user) {
                return res.status(404).json({
                        message: "User not found"
                });
        }

        const matched = bcrypt.compare(user.password, password);

        if (!matched) {
                return res.status(401).json({
                        message: " Your'e password/email is wrong."
                });
        }

        const token = createJwt(user);

        return res.status(200).json({
                user,
                token
        })
}
