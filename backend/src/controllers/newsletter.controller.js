// controllers/newsletter.controller.js
import { Newsletter } from "../models/newsletter.model.js";
import nodemailer from "nodemailer";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Avoid duplicate emails
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Save to DB
    await Newsletter.create({ email });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `YemmyChats <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to YemmyChats Newsletter!",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to YemmyChats</title>
          <style>
              /* Base styles */
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  background-color: #f7fafc;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .header {
                  background-color: #4f46e5;
                  padding: 30px 0;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
              }
              .header h1 {
                  color: white;
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  background-color: white;
                  padding: 30px;
                  border-radius: 0 0 8px 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              }
              .logo {
                  width: 120px;
                  height: auto;
                  margin-bottom: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 12px 24px;
                  background-color: #4f46e5;
                  color: white;
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: 600;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #6b7280;
                  font-size: 12px;
              }
              .social-icons {
                  margin: 20px 0;
                  text-align: center;
              }
              .social-icons a {
                  margin: 0 10px;
                  display: inline-block;
              }
              .divider {
                  border-top: 1px solid #e5e7eb;
                  margin: 25px 0;
              }
              @media only screen and (max-width: 600px) {
                  .container {
                      width: 100%;
                      padding: 10px;
                  }
                  .content {
                      padding: 20px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Welcome to YemmyChats</h1>
              </div>
              <div class="content">
                  <center>
                      <img src="https://yemmy-chats.onrender.com/YemmyChat_logo.png" alt="YemmyChats Logo" class="logo">
                  </center>
                  
                  <h2 style="color: #4f46e5; margin-top: 0;">Thank you for subscribing!</h2>
                  
                  <p>Hello there,</p>
                  
                  <p>We're thrilled to have you join the YemmyChats community! You'll now receive our latest updates, exclusive content, and special offers directly to your inbox.</p>
                  
                  <p>Here's what you can expect:</p>
                  
                  <ul>
                      <li>Weekly tech insights and tutorials</li>
                      <li>Exclusive subscriber-only content</li>
                      <li>Early access to new features</li>
                      <li>Community highlights and events</li>
                  </ul>
                  
                  <center>
                      <a href="https://yemmy-chats.onrender.com" class="button">Explore Our Content</a>
                  </center>
                  
                  <div class="divider"></div>
                  
                  <p>If you ever change your mind, you can <a href="https://yemmy-chats.onrender.com" style="color: #4f46e5;">unsubscribe</a> at any time.</p>
                  
                  <p>Thanks again for joining us!</p>
                  
                  <p>Best regards,<br>The YemmyChats Team</p>
                  
                  <div class="social-icons">
                      <a href="https://twitter.com/yemmychats"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter"></a>
                      <a href="https://facebook.com/yemmychats"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" alt="Facebook"></a>
                      <a href="https://instagram.com/yemmychats"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" alt="Instagram"></a>
                      <a href="https://linkedin.com/company/yemmychats"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="24" alt="LinkedIn"></a>
                  </div>
              </div>
              
              <div class="footer">
                  <p>© ${new Date().getFullYear()} YemmyChats. All rights reserved.</p>
                  <p>Our address: 123 Tech Street, Silicon Valley, CA 94000</p>
                  <p><a href="https://yemmy-chats.onrender.com" style="color: #4f46e5;">Visit our website</a></p>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscribed & confirmation email sent!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};