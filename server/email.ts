import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
console.log('Resend API Key loaded:', apiKey ? '✓ Present' : '✗ Missing');

const resend = new Resend(apiKey);

export interface EmailPayload {
  name: string;
  email: string;
  message: string;
  plan?: string;
  phone?: string;
}

export async function sendContactEmail(payload: EmailPayload) {
  try {
    console.log('📧 Sending email to: tahaelatrassi20@gmail.com');
    console.log('📧 From:', payload.email);
    
    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'tahaelatrassi20@gmail.com',
      subject: `Nouveau message de ${payload.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Nom:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
            ${payload.phone ? `<p><strong>Téléphone:</strong> ${escapeHtml(payload.phone)}</p>` : ''}
            ${payload.plan ? `<p><strong>Plan intéressé:</strong> ${escapeHtml(payload.plan)}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(payload.message)}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis votre formulaire de contact sur Webora Digital Solutions.
          </p>
        </div>
      `,
      replyTo: payload.email,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log('Email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
