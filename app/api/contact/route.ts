import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 🧾 Simple validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" });
    }

    // ✉️ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'smtp.office365.com', etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // 💌 Compose email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // your inbox email
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}

        Message:
        ${message}
      `,
    };

    // 🚀 Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error: "Email failed" });
  }
}
