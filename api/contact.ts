import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, service, budget, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Configure Nodemailer transporter (User must provide valid SMTP config in Vercel env variables)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

  // 1. Admin Email (info@arrowheaddigitech.com)
  const adminHtml = \`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
      <div style="max-w-xl: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://arrowheaddigitech.com/images/arrowhead_black.png" alt="Arrowhead DigiTech" style="max-height: 50px;">
        </div>
        <h2 style="color: #1a1a1a; margin-top: 0;">New Project Inquiry</h2>
        <p style="color: #666; font-size: 14px; margin-bottom: 30px;">Received on \${timestamp}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #333;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">\${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;"><a href="mailto:\${email}" style="color: #FF5A1F;">\${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">\${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Service:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">\${service || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Budget:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">\${budget || 'N/A'}</td>
          </tr>
        </table>
        
        <h3 style="color: #1a1a1a; margin-top: 20px;">Project Details</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; color: #444; line-height: 1.6; white-space: pre-wrap;">\${message || 'No message provided.'}</div>
      </div>
    </body>
    </html>
  \`;

  // 2. User Auto-Response Email
  const userHtml = \`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
      <div style="max-w-xl: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://arrowheaddigitech.com/images/arrowhead_black.png" alt="Arrowhead DigiTech" style="max-height: 50px;">
        </div>
        <h2 style="color: #1a1a1a; margin-top: 0; text-align: center;">Thank You, \${name.split(' ')[0]}!</h2>
        <div style="width: 50px; height: 3px; background-color: #FF5A1F; margin: 20px auto;"></div>
        
        <p style="color: #444; line-height: 1.6; font-size: 16px;">
          We have received your project inquiry and our team is already reviewing your requirements. 
        </p>
        <p style="color: #444; line-height: 1.6; font-size: 16px;">
          At Arrowhead DigiTech, we take pride in delivering premium digital solutions that drive growth. One of our growth specialists will get back to you within <strong>24 hours</strong> during business days.
        </p>

        <div style="background-color: #fcfcfc; border: 1px solid #eee; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h4 style="margin-top: 0; color: #1a1a1a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Inquiry Summary</h4>
          <p style="color: #666; margin: 5px 0; font-size: 14px;"><strong>Service:</strong> \${service || 'Not specified'}</p>
          <p style="color: #666; margin: 5px 0; font-size: 14px;"><strong>Budget:</strong> \${budget || 'Not specified'}</p>
        </div>
        
        <p style="color: #444; line-height: 1.6; font-size: 16px;">
          If you have any immediate questions, feel free to reply directly to this email or call us.
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 13px; margin: 5px 0;"><strong>Arrowhead DigiTech</strong></p>
          <p style="color: #888; font-size: 13px; margin: 5px 0;">Lahore, Pakistan</p>
          <p style="color: #888; font-size: 13px; margin: 5px 0;"><a href="tel:+923000955490" style="color: #FF5A1F; text-decoration: none;">+92 300 0955490</a></p>
          <p style="color: #888; font-size: 13px; margin: 5px 0;"><a href="mailto:info@arrowheaddigitech.com" style="color: #FF5A1F; text-decoration: none;">info@arrowheaddigitech.com</a></p>
        </div>
      </div>
    </body>
    </html>
  \`;

  try {
    // Send to Admin
    await transporter.sendMail({
      from: \`"Arrowhead Website" <\${process.env.SMTP_USER}>\`,
      to: 'info@arrowheaddigitech.com',
      subject: 'New Project Inquiry - Arrowhead DigiTech',
      html: adminHtml,
    });

    // Send to User
    await transporter.sendMail({
      from: \`"Arrowhead DigiTech" <\${process.env.SMTP_USER}>\`,
      to: email,
      subject: 'We Received Your Inquiry - Arrowhead DigiTech',
      html: userHtml,
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
}
