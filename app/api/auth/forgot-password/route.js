// app/api/auth/forgot-password/route.js
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from "crypto";
import { sendMail } from "@/lib/sendMail";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json(
      { error: "No user found with that email" },
      { status: 404 }
    );
  }

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 30; // 30 minutes

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetLink = `https://varadnikharage.netlify.app/user/reset-password?token=${token}&email=${encodeURIComponent(
    email
  )}`;

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fcf9f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          padding: 40px;
        ">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h2 style="color: #2b3a3e; margin: 0;">Hello 👋 ${user.fullName},</h2>
              <p style="font-size: 16px; color: #555; margin-top: 10px;">
                You requested to reset your password.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 30px 0;">
              <a href="${resetLink}" 
                style="
                  display: inline-block;
                  padding: 12px 28px;
                  font-size: 16px;
                  font-weight: bold;
                  background-color: #c36244;
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                ">
                Reset Password
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 0;">
              <p style="font-size: 15px; color: #666; text-align: center;">
                If you did not request this, please ignore this email.
              </p>
              <p style="font-size: 14px; color: #999; text-align: center;">
                <strong>This link will expire in 30 minutes.</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="font-size: 14px; color: #888;">
                Thank you,<br />
                <strong style="color: #9e8565;">Team Varad Ramesh Nikharage</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

  `;

  await sendMail(email, "Reset your password", html);

  return Response.json(
    { message: "Reset link sent to email" },
    { status: 200 }
  );
}
