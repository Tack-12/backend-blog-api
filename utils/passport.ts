import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { prisma } from "../db/prisma.ts";
import bcrypt from "bcryptjs";

let options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRETKEY!,
};

passport.use(new JwtStrategy(options, async (payload, done) => {

        try {
                const user = prisma.user.findUnique({
                        where: {
                                id: Number(payload.sub),
                        }
                });

                if (!user) {
                        return done(null, false);
                }

                return done(null, user);
        } catch (err) {
                done(err);
        }
}));

passport.serializeUser((user, done) => {
        return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {

        try {
                const user = await prisma.user.findUnique({
                        where: {
                                id
                        }
                })
                return done(null, user);
        } catch (err) {
                return done(err);
        }
});


export { passport };




