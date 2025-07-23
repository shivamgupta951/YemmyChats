import nodemailer from "nodemailer";

// ✅ Chat & OTP transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Yemmy-Chats Team" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendMail;

// ✅ Chat Message Notification Mail
export const sendMessageEmail = async (to, { senderName, senderPic }) => {
  const mailOptions = {
    from: `"Yemmy Chats" <${process.env.GMAIL_USER}>`,
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
        <p><strong>${senderName}</strong> sent you a message.</p>
        
        <p style="margin: 20px 0; padding: 15px; background-color: #fffbe6; border-left: 4px solid #facc15; color: #444;">
          🔐 For privacy reasons, the message content is not included in this email.
        </p>

        <a href="https://yemmy-chats.onrender.com/login" 
           style="display:inline-block;margin-top:15px;padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:5px;">
          🔓 Login to view message
        </a>

        <hr style="margin-top:20px;" />
        <footer style="font-size:0.8rem;color:#9ca3af;">© 2025 YemmyChats. All rights reserved.</footer>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
