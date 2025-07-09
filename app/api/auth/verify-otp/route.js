//verify otp api
import { dbConnect } from "@/lib/dbConnect";
import { sendMail } from "@/lib/sendMail";
import Otp from "@/models/Otp";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { email, otp } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  // If already verified, do not process OTP again
  if (user.isVerified) {
    return Response.json(
      { message: "Email already verified", status: "success" },
      { status: 200 }
    );
  }

  const otpEntry = await Otp.findOne({ email, code: otp, used: false });
  if (!otpEntry || otpEntry.expiresAt < new Date()) {
    return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  user.isVerified = true;
  await user.save();

  otpEntry.used = true;
  await otpEntry.save();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome Email</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(to right, #f97316, #ea580c);padding:24px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;">Welcome!</h1>
              <p style="margin:8px 0 0;font-size:16px;opacity:0.9;">Your registration is complete!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <h2 style="font-size:20px;color:#ea580c;margin-bottom:20px;">Registration Confirmation</h2>
              <p style="color:#374151;font-size:14px;line-height:1.6;margin-bottom:24px;">
                Dear ${user.fullName},<br><br>
                Thank you for registering ! We are excited to have you on board.<br><br>
                Your account has been successfully created. You can now log in to access all our features.
              </p>

              <!-- Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background-color:#ffffff;margin-bottom:24px;">
                <thead>
                  <tr>
                    <th style="padding:12px;background-color:#f97316;color:#ffffff;font-size:14px;text-align:left;"> </th>
                    <th style="padding:12px;background-color:#f97316;color:#ffffff;font-size:14px;text-align:left;"> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Name</td>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${
                      user.fullName
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Email</td>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${
                      user.email
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Account Status</td>
                    <td style="padding:12px;border-bottom:1px solid #e5e7eb;color:green;font-weight:bold;">${
                      user.isVerified ? "Verified" : "Unverified"
                    }</td>
                  </tr>
                </tbody>
              </table>

              <!-- Button -->
              <div style="text-align:center;margin-top:32px;">
                <a href="{{login_link}}" style="background-color:#f97316;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:9999px;font-weight:bold;display:inline-block;">
                  Log In to Your Account
                </a>
              </div>

              <!-- Help -->
              <p style="margin-top:24px;text-align:center;color:#6b7280;font-size:13px;">
                If you have any questions, please contact our support team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1f2937;color:#9ca3af;padding:24px;text-align:center;font-size:12px;">
              <p style="margin:0;">&copy; 2025 Varad Ramesh Nikharage. All rights reserved.</p>
            
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const userEmail = user.email;

  await sendMail(userEmail, "Registration Complete", html);

  return Response.json(
    { message: "Email verified successfully", status: "success" },
    { status: 200 }
  );
}
