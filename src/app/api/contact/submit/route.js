import { sendEmail } from "../../utils/send-email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, organisation, contactNumber, email, message } = body;

    // Validate required fields
    if (!name || !organisation || !contactNumber || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Send email to admin
    await sendEmail({
      to: "admin@emdee.in",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #FF6B35 0%, #0B3D91 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-top: none;
              }
              .field {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
              }
              .field:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: bold;
                color: #FF6B35;
                font-size: 14px;
                text-transform: uppercase;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-left: 4px solid #0B3D91;
                margin-top: 10px;
                border-radius: 4px;
              }
              .footer {
                background: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 10px 10px;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Organisation</div>
                <div class="value">${organisation}</div>
              </div>
              <div class="field">
                <div class="label">Contact Number</div>
                <div class="value">${contactNumber}</div>
              </div>
              <div class="field">
                <div class="label">Email ID</div>
                <div class="value"><a href="mailto:${email}" style="color: #0B3D91; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated message from your website contact form.</p>
              <p style="margin: 10px 0 0 0;">Powering Digital Governance and Public Service Innovation Across India</p>
            </div>
          </body>
        </html>
      `,
    });

    return Response.json(
      { message: "Contact form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return Response.json(
      { error: "Failed to submit contact form" },
      { status: 500 },
    );
  }
}
