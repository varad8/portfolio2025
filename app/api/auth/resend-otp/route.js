//resend-otp api

import { dbConnect } from "@/lib/dbConnect";
import Otp from "@/models/Otp";
import { generateOTP } from "@/lib/generateOTP";
import { sendMail } from "@/lib/sendMail";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

  if (latestOtp && latestOtp.expiresAt > new Date()) {
    const remaining = Math.ceil((latestOtp.expiresAt - Date.now()) / 1000);
    return Response.json(
      { error: `Please wait ${remaining}s before resending OTP` },
      { expiresAt: latestOtp.expiresAt },
      { status: 429 }
    );
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

  await Otp.create({ email, code: otp, expiresAt });

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0; padding:0; background:#f9f9f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); padding: 40px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #4b0082; margin: 0;">Hey 👋,</h2>
                <p style="font-size: 18px; color: #555;">Let’s verify your email</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-size: 16px; color: #333;">
                  Use the following One Time Password (OTP) to verify your email:
                </p>
                <div style="font-size: 32px; font-weight: bold; margin: 20px 0; background-color: #f0ebfa; color: #6a0dad; padding: 12px 24px; border-radius: 10px; display: inline-block;">
                  ${otp}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 20px;">
                <p style="font-size: 14px; color: #999;">
                  This OTP is valid for the next 10 minutes. Do not share it with anyone.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 30px;">
                <p style="font-size: 14px; color: #888;">Thanks,<br /><strong style="color: #4b0082;">The Team - Varad Ramesh Nikharage</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

  await sendMail(email, "Your New OTP", html);

  return Response.json({ message: "OTP resent successfully", expiresAt });
}
