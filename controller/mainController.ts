import { prisma } from "../db/prisma.ts";
import type { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { passport } from "../utils/passport.ts";

export const signUp = async (req: Request, res: Response) => {

        const { email, u_name, role, password } = req.body;

        const user = await prisma.user.findFirst({
                where: {
                        email,
                }
        });

        if (!user) {
                return res.status(403).json({ message: "User already Exists." })
        }
        const hashed_password = bcrypt.hash(password, 10);

        await prisma.user.create({
                data: {
                        email,
                        u_name,
                        password: String(hashed_password),
                        role
                }
        })
};

export const signIn = passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/'
})
