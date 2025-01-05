import * as nodemailer from "nodemailer";
import env from "../config/config";

class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string, text?: string) {
    const mailOptions = {
      from: env.EMAIL_USERNAME,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default new MailService();
