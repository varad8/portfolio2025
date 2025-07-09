import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { sendMail } from "@/lib/sendMail";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, phone, interest, country, budget, message } =
      await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !interest ||
      !country ||
      !budget ||
      !message
    ) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to DB
    const contactEntry = await Contact.create({
      name,
      email,
      phone,
      interest,
      country,
      budget,
      message,
      status: "Active",
      remark: "",
    });

    // Construct HTML email content
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

      <!-- Header -->
      <div style="background: linear-gradient(to right, #f97316, #ea580c); padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Submission</h1>
        <p style="margin: 0; font-size: 16px;">A new message has arrived!</p>
      </div>

      <!-- Message -->
      <div style="padding: 20px;">
        <p style="font-size: 15px; color: #374151;">
          Hello ${name},
          <br /><br />
          Thank you for reaching out! We have received a new contact form submission with the following details:
        </p>

        <!-- Table -->
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Name</td>
            <td style="padding: 10px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Email</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Phone</td>
            <td style="padding: 10px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Interest</td>
            <td style="padding: 10px;">${interest}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Country</td>
            <td style="padding: 10px;">${country}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Budget</td>
            <td style="padding: 10px;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Message</td>
            <td style="padding: 10px;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Status</td>
            <td style="padding: 10px;">Active</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f3f4f6;">Date and Time</td>
            <td style="padding: 10px;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="background-color: #1f2937; color: #9ca3af; text-align: center; padding: 16px; font-size: 14px;">
        &copy; 2024 Varad Ramesh Nikharage. All rights reserved.
      </div>

    </div>
  </body>
  </html>

    `;

    // Send email
    await sendMail(email, "📬 New Contact Form Submission", html);

    return Response.json(
      { message: "Submitted successfully", data: contactEntry },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
