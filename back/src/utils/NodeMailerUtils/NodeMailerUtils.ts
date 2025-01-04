import nodemailer from "nodemailer";
import {MailType} from "../../types/MailType";

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
});

export const sendEmail = async (mail: MailType) => {
    try {
        console.log('prepare to send the mail')
        await transporter.sendMail({
            from: '"TP Docker Quotopia" <no-reply@quotopia.com>',
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
        });
        console.log(`Mail successfully sent to ${mail.to}`);
    } catch (error) {
        console.error("Error during the mail submission", error);
    }
}
