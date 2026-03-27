import jwt from 'jsonwebtoken';
import "dotenv/config"

export const createJwt = function (user: any) {

        const token = jwt.sign({ user }, process.env.SECRETKEY!)

        return ("Bearer" + token);
}
