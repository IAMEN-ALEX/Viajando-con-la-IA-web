require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
    console.log('Sending test email to menaresalexis34@gmail.com...');
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'menaresalexis34@gmail.com',
            subject: 'Test Email form Debugger',
            html: '<p>If you see this, the email works!</p>'
        });
        console.log('Success:', data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail();
