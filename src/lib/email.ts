import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface DonationEmailData {
  amount: number;
  reference: string;
  type: string;
  date: string;
  mpesaReceiptNumber?: string;
}

export async function sendDonationConfirmationEmail(
  email: string,
  data: DonationEmailData
) {
  try {
    const { amount, reference, type, date, mpesaReceiptNumber } = data;

    await resend.emails.send({
      from: 'Kasabuni Library <donations@kasabunilibrary.org>',
      to: email,
      subject: 'Thank You for Your Donation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank You for Your Donation!</h1>
          
          <p>Dear Donor,</p>
          
          <p>We are grateful for your generous donation to Kasabuni Library. Your support helps us continue our mission of empowering children and young adults in Kasabuni.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Donation Details</h2>
            <p><strong>Amount:</strong> KSH ${amount.toLocaleString()}</p>
            <p><strong>Reference Number:</strong> ${reference}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Date:</strong> ${date}</p>
            ${mpesaReceiptNumber ? `<p><strong>M-Pesa Receipt:</strong> ${mpesaReceiptNumber}</p>` : ''}
          </div>
          
          <p>Your donation will be used to:</p>
          <ul>
            <li>Support our library and e-learning center</li>
            <li>Fund our Sister MHM Project</li>
            <li>Provide vocational training and workshops</li>
          </ul>
          
          <p>If you have any questions about your donation, please don't hesitate to contact us.</p>
          
          <p>Thank you again for your support!</p>
          
          <p>Best regards,<br>The Kasabuni Library Team</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending donation confirmation email:', error);
    return false;
  }
} 