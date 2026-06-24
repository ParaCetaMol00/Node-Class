const nodeMailer = require("nodemailer");
const envObj = require("../config/env");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: envObj.app_email,
        pass: envObj.app_password
    }
});

const testTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages.");
    } catch (err) {
        console.error("Verification transporter:", err);
    }
};

const sendWelcomeingEmail = async () => {
    try {
        await transporter.sendMail({
            from: `"Example Team" <${envObj.app_email}>`,
            to: `${email}`, //list of recipients
            subject: `Welcome to the app`, // Subject line
            // text: `Hello ${name}, welcome to our app!`, // plain text body
            html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    /**
     * Resets and base styles
     */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      display: block;
    }
    table {
      border-collapse: collapse !important;
    }
    a {
      color: #1a82e2;
      text-decoration: none;
    }
  </style>
</head>
<body style="background-color: #f4f6f8;">

  <!-- Preheader (visible in inbox view) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    We're so excited to have you on board. Here's how to get started.
  </div>

  <!-- Body wrapper -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- Header -->
    <tr>
      <td align="center" bgcolor="#f4f6f8">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="#" style="display: block;">
                <!-- Add your Logo Image URL below -->
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhEyi97bEe4HeVRJRTf-pbzBO_NRD9l3GfVJ0tXEmql5vihi4mpvld7Q&s=10" alt="Logo" width="150" style="display: block;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td align="center" bgcolor="#f4f6f8">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 4px; overflow: hidden;">
          
          <!-- Hero Banner Background / Intro -->
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; color: #333333;">Hi, ${name} Welcome to the family!</h1>
            </td>
          </tr>
          
          <!-- Body Copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; color: #666666; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Hi [User Name],<br><br>
              Thank you so much for joining! We are thrilled to have you with us. Whether you're looking to streamline your workflow or just explore what we have to offer, we're here to help you get the absolute most out of your experience.</p>
            </td>
          </tr>

          <!-- Primary Button -->
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 12px 24px 24px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                    <a href="YOUR_WEBSITE_URL" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Get Started</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Secondary steps/info -->
          <tr>
            <td align="left" bgcolor="#f9f9f9" style="padding: 24px; border-top: 1px dashed #e8e8e8; color: #666666; font-size: 16px; line-height: 24px;">
              <p style="margin: 0; font-weight: bold; color: #333333;">Need a hand getting started?</p>
              <p style="margin: 6px 0 0;">Check out our <a href="#">Getting Started Guide</a> or reach out to our support team anytime at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" bgcolor="#f4f6f8" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" style="color: #666666; font-size: 14px; line-height: 20px;">
              <p style="margin: 0;">You received this email because you created an account with us.</p>
              <p style="margin: 0;">[Company Name], 123 Business Rd, City, Country</p>
              <p style="margin: 0;"><a href="#" style="color: #666666; text-decoration: underline;">Unsubscribe</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
</body>
</html>`, // HTML body

        })

        console.log("Message sent: %s", info.messageId);
        // Preview URL is available when using an Ethereal test account
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

    } catch (err) {
console.error("Error sending email:", err);
    }
}

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Example Team" <${envObj.app_email}>`,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = { transporter, testTransporter, sendWelcomeingEmail, sendEmail};