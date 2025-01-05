import { Quote } from "../entity/Quote";
import dotenv from "dotenv";
import {User} from "../entity/User";
import {sendEmail} from "../utils/NodeMailerUtils/NodeMailerUtils";
import {MailType} from "../types/MailType";

dotenv.config();

export class QuoteController {
  static async getQuotes(req: any, res: any) {
    try {
      const { id, quote, page } = req.query;
        const ITEM_LIMIT = 10;
        const where: any = {};
        if (id) where.id = id;
        if (quote) where.quote = quote;
        const skip = ((parseInt(page) || 1) - 1) * ITEM_LIMIT;

        const quotes = await Quote.find({ where, relations:['user'], take: ITEM_LIMIT, skip, select: {
                user: {
                    id: true,
                    email: true,
                },
            },});
        if(!quotes) {
            return res.status(404).send({
                message: "No quotes found",
            });
        }
        return res.json({
            quotes,
            page,
        });

    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: "Error during get quotes",
        });
    }
  }

  static async addQuote(req: any, res: any) {
      try {
          const {quote} = req.body;
          const user = await User.findOne({where: {id: req.user.id}});
          if(!user) {
                return res.status(400).send({
                    message: "User not found",
                });
          }
          const newQuote = Quote.create({quote, user});
          if (await newQuote.save()) {
              const { password, ...userWithoutPassword } = user;
              const mail: MailType = {
                    to: user.email,
                    subject: "New Quote",
                    text: `Your quote has been added: ${quote}`,
                    html: `<p>Your quote has been added: ${quote}</p>`,
              }
              await sendEmail(mail);
              return res.json({
                  message: "Quote added",
                  quote: newQuote,
                  user: userWithoutPassword
              });
          } else {
              return res.status(500).send({
                  message: "Error during quote creation",
              });
          }
      } catch (e) {
          console.error(e);
          return res.status(500).send({
              message: "Error during quote creation",
          });
      }
  }


}
