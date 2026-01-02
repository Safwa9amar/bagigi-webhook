// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});
app.get("/privacy-policy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Privacy Policy | Bagigi</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f9fafb;
          color: #111827;
          padding: 32px;
          line-height: 1.7;
        }
        .container {
          max-width: 720px;
          margin: auto;
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,.05);
        }
        h1 {
          font-size: 28px;
          margin-bottom: 16px;
        }
        h2 {
          font-size: 18px;
          margin-top: 24px;
        }
        p {
          margin-top: 12px;
        }
        footer {
          margin-top: 32px;
          font-size: 14px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Privacy Policy</h1>

        <p>
          Bagigi is a barber appointment and service booking application.
          This Privacy Policy explains how we collect, use, and protect user data.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect the following information:
        </p>
        <ul>
          <li>Phone number (for WhatsApp authentication)</li>
          <li>Basic profile information</li>
          <li>Appointment and service booking data</li>
        </ul>

        <h2>How We Use Information</h2>
        <p>
          Information is used only to:
        </p>
        <ul>
          <li>Authenticate users via WhatsApp</li>
          <li>Send appointment confirmations and notifications</li>
          <li>Improve the user experience</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>
          We do not sell, rent, or share personal data with third parties.
          Data is only processed as required to provide the service.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect user data.
        </p>

        <h2>User Consent</h2>
        <p>
          By using the Bagigi app, you consent to this Privacy Policy.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this policy, contact us at:<br />
          <strong>Email:</strong> hassanih97@gmail.com
        </p>

        <footer>
          © ${new Date().getFullYear()} Bagigi. All rights reserved.
        </footer>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
