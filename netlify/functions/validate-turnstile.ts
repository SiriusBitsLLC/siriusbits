import { Handler } from '@netlify/functions';
// import nodemailer from 'nodemailer'; // Uncomment if using SMTP

// Cloudflare Turnstile secret key (set as env var in Netlify and .env for local dev)
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Option 1: Netlify Email Integration (recommended if enabled)
// Option 2: SMTP (show commented-out example)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const token = body['cf-turnstile-response'] || body['cf-turnstile'] || body['g-recaptcha-response'];
    const remoteip = event.headers['x-forwarded-for'];

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing Turnstile token' }),
      };
    }

    // 1. Validate Turnstile
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY || '');
    formData.append('response', token);
    if (remoteip) formData.append('remoteip', remoteip);

    const verifyRes = await fetch(VERIFY_URL, {
      method: 'POST',
      body: formData,
    });
    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Turnstile verification failed', ...verifyJson }),
      };
    }

    // 2. Extract form details
    const fields = [
      'purpose', 'name', 'email', 'phone', 'company', 'description', 'message', 'hear', 'preferred-contact', 'consent'
    ];
    const form: Record<string, string> = {};
    for (const f of fields) {
      form[f] = body[f] || '';
    }

    // 3. Send email (Netlify Email Integration or SMTP)
    // --- Netlify Email Integration Example ---
    // See: https://docs.netlify.com/functions/email/
    /*
    import { sendEmail } from '@netlify/emails';
    await sendEmail({
      to: 'contact@siriusbits.com',
      from: 'no-reply@siriusbits.com',
      subject: `New Contact Form Submission from ${form.name}`,
      text: `Message: ${form.message}\n\nDetails: ${JSON.stringify(form, null, 2)}`,
    });
    */

    // --- SMTP Example (commented out) ---
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: 'no-reply@siriusbits.com',
      to: 'contact@siriusbits.com',
      subject: `New Contact Form Submission from ${form.name}`,
      text: `Message: ${form.message}\n\nDetails: ${JSON.stringify(form, null, 2)}`,
    });
    */

    // 4. Respond to client
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Your message was sent! Thank you.' }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: (e as Error).message }),
    };
  }
};
