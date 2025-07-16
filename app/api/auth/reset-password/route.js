import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/sendMail"; // ✅ Import sendMail

export async function POST(req) {
  await dbConnect();
  const { email, token, password, confirmPassword } = await req.json();

  if (!email || !token || !password || !confirmPassword) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return Response.json({ error: "Passwords do not match" }, { status: 400 });
  }

  const user = await User.findOne({ email, resetToken: token });
  if (!user) {
    return Response.json(
      { error: "Invalid or expired reset token" },
      { status: 400 }
    );
  }

  if (Date.now() > user.resetTokenExpiry) {
    return Response.json({ error: "Reset token has expired" }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  // ✅ Send success email
  const html = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Successful</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ececee; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
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
              <h2 style="color: #2b3a3e; margin: 0;">Password Reset Confirmation</h2>
              <p style="font-size: 16px; color: #555; margin-top: 10px;">
                Hello ${user.fullName},
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 0;">
              <p style="font-size: 15px; color: #333;">
                We’re confirming that your password has been successfully changed.
              </p>
              <p style="font-size: 15px; color: #333;">
                If you didn’t make this change or believe an unauthorized person has accessed your account,
                please <a href="mailto:varadnikharage201@gmail.com" style="color: #c36244;">contact our support team</a> immediately.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 30px 0;">
              <a href="https://varadnikharage.netlify.app/user/login" 
                style="
                  display: inline-block;
                  padding: 12px 28px;
                  font-size: 16px;
                  font-weight: bold;
                  background-color: #c36244;
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                ">
                Login to Your Account
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 20px; text-align: center;">
              <p style="font-size: 14px; color: #888;">
                Thank you for using our services,<br />
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

  await sendMail(email, "Your Password Was Reset", html);

  return Response.json(
    { message: "Password reset successful" },
    { status: 200 }
  );
}
