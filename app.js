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
    res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bagigi | Barber Booking App</title>
      <meta name="description" content="Book your haircut easily and professionally with Bagigi." />
      <style>
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #111827, #1f2933);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,.4);
        }

        h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }

        p {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .cta {
          display: inline-block;
          padding: 12px 24px;
          background: #22c55e;
          color: #022c22;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          transition: transform .15s ease, box-shadow .15s ease;
        }

        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(34,197,94,.4);
        }

        .links {
          margin-top: 32px;
          font-size: 14px;
          opacity: 0.8;
        }

        .links a {
          color: #93c5fd;
          text-decoration: none;
          margin: 0 8px;
        }

        footer {
          margin-top: 16px;
          font-size: 12px;
          opacity: 0.6;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Bagigi</h1>
        <p>Book your haircut easily and professionally</p>

        <a class="cta" href="#">Download App</a>

        <div class="links">
          <a href="/privacy-policy">Privacy Policy</a> ·
          <a href="/terms-of-service">Terms of Service</a>
        </div>

        <footer>
          © ${new Date().getFullYear()} Bagigi
        </footer>
      </div>
    </body>
    </html>
  `);

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
app..get("/terms-of-service", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Terms of Service | Bagigi</title>
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
        <h1>Terms of Service</h1>

        <p>
          Welcome to Bagigi. By using this application, you agree to the following Terms of Service.
          Please read them carefully.
        </p>

        <h2>Service Description</h2>
        <p>
          Bagigi is a barber appointment and service booking application designed
          to help users book services with a single professional barber.
        </p>

        <h2>User Responsibilities</h2>
        <ul>
          <li>Provide accurate contact information</li>
          <li>Attend booked appointments on time</li>
          <li>Respect cancellation and rescheduling rules</li>
        </ul>

        <h2>Appointments & Cancellations</h2>
        <p>
          Appointments may be cancelled or rescheduled according to the barber’s availability.
          Repeated no-shows may result in account restrictions.
        </p>

        <h2>Authentication</h2>
        <p>
          Authentication may be performed using WhatsApp or other supported methods.
          Users are responsible for maintaining the security of their accounts.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Bagigi is not responsible for service quality disputes.
          The application serves only as a booking and communication platform.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to update these terms at any time.
          Continued use of the app constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions regarding these terms, contact:<br />
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
