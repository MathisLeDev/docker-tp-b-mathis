import {NextFunction, Request, Response} from "express";

const jwt = require("jsonwebtoken");
import dotenv from "dotenv";

dotenv.config();
const encodedtoken = process.env.TOKEN;

export const JwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (
        req.path !== "/api/login" &&
        req.path !== "/ping" &&
        !req.path.includes("/api/users")
    ) {

        if (req.headers.authorization) {
            const token = (req.headers.authorization =
                req.headers.authorization?.replace("Bearer ", ""));
            jwt.verify(token, encodedtoken, (err: any, decoded: any) => {
                if (err) {
                    res.status(401).send({
                        message: "Invalid token",
                    });
                } else {
                    // @ts-ignore
                    req.user = decoded.userRes;
                    console.log("decoded");

                    next();
                }
            });
        } else {
            res.status(401).send({
                message: "No token",
            });
        }
    } else {
        next();
    }
};

export const getDecodedToken = (token: string) => {
    if (token.includes("Bearer ")) {
        token = token.replace("Bearer ", "");
    }
    return jwt.verify(token, encodedtoken);
};
