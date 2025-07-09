import nodemailer from "nodemailer";

export async function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Auth System" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: `<p>${text}</p>`,
  });
}
