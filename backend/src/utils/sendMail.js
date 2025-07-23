import nodemailer from "nodemailer";

// ✅ OTP and generic mail sender (unchanged)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // use MAIL_USER consistently
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Yemmy-Chats Team" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendMail;

// ✅ Chat Message Notification Mail
export const sendMessageEmail = async (to, { senderName, senderPic, message }) => {
  const mailOptions = {
    from: `"Yemmy Chats" <${process.env.MAIL_USER}>`,
    to,
    subject: `📨 New message from ${senderName}`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;border-radius:10px;background:#f9fafb;border:1px solid #e5e7eb;">
        <h2 style="color:#4f46e5;">You've received a new message 💬</h2>
        <div style="margin-top:10px;margin-bottom:10px;">
          <img src="${senderPic || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"}" 
            alt="Avatar" 
            style="width:60px;height:60px;border-radius:50%;border:2px solid #4f46e5;" 
          />
        </div>
        <p><strong>${senderName}</strong> says:</p>
        <blockquote style="background:#fff;padding:15px;border-left:4px solid #4f46e5;font-style:italic;margin:10px 0;">
          ${message}
        </blockquote>
        <p style="color:#6b7280;">Login to <strong>YemmyChats</strong> to reply.</p>
        <hr style="margin-top:20px;" />
        <footer style="font-size:0.8rem;color:#9ca3af;">© 2025 YemmyChats. All rights reserved.</footer>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
