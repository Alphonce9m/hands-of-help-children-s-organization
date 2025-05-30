import nodemailer from 'nodemailer';

interface ContactFormEmailParams {
  to: string;
  from: string;
  subject: string;
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactFormEmail({
  to,
  from,
  subject,
  name,
  email,
  message,
}: ContactFormEmailParams) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
      <h2 style="color: #1e40af; margin-bottom: 20px;">${subject}</h2>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
        <p style="margin: 0;"><strong>From:</strong> ${name} (${email})</p>
        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap; margin: 0;">${message}</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
        <p>To respond to this message, simply reply to this email.</p>
        <p>The sender's email address is: ${email}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    replyTo: email, // This allows direct replies to the sender
  });
}

export async function sendDonationConfirmationEmail(
  to: string,
  data: {
    amount: number;
    reference: string;
    type: string;
    date: string;
    mpesaReceiptNumber?: string;
  }
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
      <h2 style="color: #1e40af; margin-bottom: 20px;">Thank You for Your Donation!</h2>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
        <p style="margin: 0;"><strong>Amount:</strong> KES ${data.amount.toLocaleString()}</p>
        <p style="margin: 10px 0;"><strong>Reference:</strong> ${data.reference}</p>
        <p style="margin: 10px 0;"><strong>Type:</strong> ${data.type}</p>
        <p style="margin: 10px 0;"><strong>Date:</strong> ${data.date}</p>
        ${data.mpesaReceiptNumber ? `<p style="margin: 10px 0;"><strong>M-Pesa Receipt:</strong> ${data.mpesaReceiptNumber}</p>` : ''}
      </div>
      
      <p style="color: #1f2937;">Thank you for your generosity and support!</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
        <p>If you have any questions about your donation, please contact us at handsofhelpchildrenorg@gmail.com</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL || 'noreply@handsofhelp.org',
    to,
    subject: 'Thank You for Your Donation',
    html,
  });
} 