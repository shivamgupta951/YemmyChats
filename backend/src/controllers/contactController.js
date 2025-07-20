import ContactModel from "../models/contactModel.js";
import sendMail from "../utils/sendMail.js";

export const handleContact = async (req, res) => {
  const { username, email, phone, message } = req.body;

  if (!username || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Save to DB
    const newContact = new ContactModel({ username, email, phone, message });
    await newContact.save();

    // Mail to user
    await sendMail({
      to: email,
      subject: "Thanks for contacting us!",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            background-color: #4f46e5;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            color: white;
            text-align: center;
            margin-bottom: 25px;
          }
          .content {
            padding: 15px 0;
          }
          .message-box {
            background-color: #f3f4f6;
            border-left: 4px solid #4f46e5;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 15px 0;
          }
          .social-icons {
            margin: 20px 0;
            text-align: center;
          }
          .social-icons a {
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us</h1>
          </div>
          
          <div class="content">
            <p>Hello ${username},</p>
            
            <p>We've received your message and appreciate you reaching out to us. Here's what you sent:</p>
            
            <div class="message-box">
              <p><strong>Your Message:</strong></p>
              <p>${message}</p>
            </div>
            
            <p>Our team will review your inquiry and get back to you within 1-2 business days.</p>
            
            <p>In the meantime, you might find answers to common questions in our <a href="https://yemmy-chats.onrender.com" style="color: #4f46e5;">FAQ section</a>.</p>
            
            <center>
              <a href="https://yemmy-chats.onrender.com" class="btn">Visit Our Website</a>
            </center>
          </div>
          
          <div class="social-icons">
            <a href="https://facebook.com/yourpage"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="24" alt="Facebook"></a>
            <a href="https://twitter.com/yourhandle"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter"></a>
            <a href="https://linkedin.com/company/yourcompany"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="24" alt="LinkedIn"></a>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <p>123 Business Street, City, Country</p>
            <p><a href="https://yemmy-chats.onrender.com" style="color: #4f46e5;">Privacy Policy</a> | <a href="https://yemmy-chats.onrender.com" style="color: #4f46e5;">Terms of Service</a></p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    // Mail to admin
    await sendMail({
      to: process.env.ADMIN_GMAIL,
      subject: "📩 New Contact Form Submission",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            background-color: #4f46e5;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            color: white;
            text-align: center;
            margin-bottom: 25px;
          }
          .details {
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-label {
            font-weight: 600;
            width: 100px;
            color: #4f46e5;
          }
          .message-box {
            background-color: #f3f4f6;
            border-left: 4px solid #4f46e5;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .action-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span>${username}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span><a href="mailto:${email}">${email}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span>${phone || 'Not provided'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div class="message-box">
            <h3>Message:</h3>
            <p>${message}</p>
          </div>
          
          <div>
            <a href="mailto:${email}" class="action-btn">Reply to ${username.split(' ')[0]}</a>
            <a href="https://yemmy-chats.onrender.com" class="action-btn" style="background-color: #6b7280;">View in Dashboard</a>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    res.status(200).json({ 
      message: "Thank you! We've received your message.",
      success: true
    });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ 
      message: "Something went wrong while processing your request",
      success: false
    });
  }
};