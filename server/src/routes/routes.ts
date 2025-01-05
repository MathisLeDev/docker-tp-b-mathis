import express from "express";
import { QuoteController } from "../controllers/quoteController";
import {UserController} from "../controllers/userController";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

//USERS
router.get("/api/users", UserController.getUsers);
router.post("/api/users", UserController.createUser);
router.delete("/api/users/:id", UserController.deleteUser);
router.post("/api/login", UserController.login);


// QUOTES
router.get("/api/quotes", QuoteController.getQuotes);
router.post("/api/quotes", QuoteController.addQuote);


export default router;
