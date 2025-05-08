import nodemailer, { Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  public async sendMail(to: string, subject: string, callback: () => string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: "",
      html: callback(),
    });
  }
}

const mailService = new MailService();

export default mailService;
