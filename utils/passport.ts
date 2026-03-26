import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { prisma } from "../db/prisma.ts";
import bcrypt from "bcryptjs";

let options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrkey: process.env.SECRETKEY,
};
passport.use(new JwtStrategy(async (username, password, done) => {


        try {
                const user = await prisma.user.findUnique({
                        where: {
                                u_name: username
                        }
                });

                if (!user) {
                        return done(null, false, { message: "Cannot find User with that Credentials." });
                }

                const matches = await bcrypt.compare(password, user.password);

                if (!matches) {
                        return done(null, false, { message: "Wrong password/email" });
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




