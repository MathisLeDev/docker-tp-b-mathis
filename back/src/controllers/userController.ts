import { User } from "../entity/User";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserController {

    static async createUser(req: any, res: any) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    message:
                        "Please provide email and password",
                });
            }

            const isUserExists = await User.findOne({ where: { email } });

            if (isUserExists) {
                return res.status(400).send({
                    message: "Email already taken",
                });
            }

            //encrypt password
            const passwordHash = crypto
                .createHash("sha256")
                .update(req.body.password)
                .digest("hex");

            const user = User.create({
                password: passwordHash,
                email,
            });

            const isUserCreated = await user.save();
            if (!isUserCreated) {
                return res.status(400).send({
                    message: "User error during creation",
                });
            }
            return res.json(user);
        } catch (e) {
            return res.status(400).send({
                message: "Error during create user",
            });
        }
    }

    static async updateUser(req: any, res: any) {
        try {
            const user = req.user;
            const userToUpdate = await User.findOne({ where: { id: user.id } });
            if (!userToUpdate) {
                return res.status(400).send({
                    message: "User not found",
                });
            }

            const { firstName, lastName, email, password } = req.body;

            if (email) userToUpdate.email = email;
            if (password) {
                const passwordHash = crypto
                    .createHash("sha256")
                    .update(password)
                    .digest("hex");
                userToUpdate.password = passwordHash;
            }
            if (await userToUpdate.save()) return res.json(userToUpdate);
            else
                return res.status(400).send({
                    message: "Error during update user",
                });
        } catch (e) {
            return res.status(400).send({
                message: "Error during update user",
            });
        }
    }

    static async login(req: any, res: any) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    message: "Please provide username and password",
                });
            }
            const passwordHash = crypto
                .createHash("sha256")
                .update(password)
                .digest("hex");
            const user = await User.findOne({
                where: { email, password: passwordHash },
            });
            if (!user) {
                return res.status(400).send({
                    message: "User not found",
                });
            }
            //remove password
            const userRes: { password?: string } = { ...user };
            const TOKEN = process?.env?.TOKEN || "";
            delete userRes.password;
            const token = jwt.sign({ userRes }, TOKEN, {
                algorithm: "HS256",
                expiresIn: "1h",
            });
            return res.json({ user: userRes, token: token });
        } catch (e) {
            return res.status(400).send({
                message: "Error during login",
            });
        }
    }

    static async getUsers(req: any, res: any) {
        try {
            const { input } = req.query;
            const upperInput = input.toUpperCase();

            const users = await User.createQueryBuilder("user")
                .where("UPPER(user.email) LIKE :input", { input: `%${upperInput}%` })
                .orWhere("UPPER(user.firstName) LIKE :input", {
                    input: `%${upperInput}%`,
                })
                .orWhere("UPPER(user.lastName) LIKE :input", {
                    input: `%${upperInput}%`,
                })
                .getMany();

            if (!users) {
                return res.status(400).send({
                    message: "Users not found",
                });
            }
            //remove password
            users.forEach((user: any) => {
                delete user.password;
            });
            return res.json(users);
        } catch (e) {
            return res.status(400).send({
                message: "Error during get users",
            });
        }
    }

    static async deleteUser(req: any, res: any) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.status(200).send({
                    message: "User not found",
                });
            }
            if (await user.remove()) return res.json({ message: "User deleted" });
            else
                return res.status(400).send({
                    message: "Error during delete user",
                });
        } catch (e) {
            return res.status(400).send({
                message: "Error during delete user",
            });
        }
    }
}
