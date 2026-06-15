export async function POST(request) {
  try {
    console.log("Starting tender submission...");
    const data = await request.json();
    console.log("Received tender submission:", {
      vendorName: data.vendorName,
      email: data.email,
      tenderNo: data.tenderNo,
    });

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(to bottom, #FF6B35, #E55A28);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 30px;
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section-title {
              color: #FF6B35;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              border-bottom: 2px solid #FF6B35;
              padding-bottom: 8px;
            }
            .field {
              margin-bottom: 12px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
              display: inline-block;
              min-width: 150px;
            }
            .field-value {
              color: #333;
            }
            .document-link {
              color: #0066cc;
              text-decoration: none;
              word-break: break-all;
            }
            .document-link:hover {
              text-decoration: underline;
            }
            .tender-badge {
              display: inline-block;
              background: #0B3D91;
              color: white;
              padding: 8px 16px;
              border-radius: 6px;
              font-weight: bold;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Tender Submission</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            </div>
            
            <div class="content">
              <!-- Vendor Information -->
              <div class="section">
                <div class="section-title">Vendor Information</div>
                <div class="field">
                  <span class="field-label">Vendor Name:</span>
                  <span class="field-value">${data.vendorName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Vendor Address:</span>
                  <span class="field-value">${data.vendorAddress}</span>
                </div>
                <div class="field">
                  <span class="field-label">Contact No:</span>
                  <span class="field-value">${data.contactNo}</span>
                </div>
                <div class="field">
                  <span class="field-label">Email ID:</span>
                  <span class="field-value">${data.email}</span>
                </div>
              </div>

              <!-- Tender Details -->
              <div class="section">
                <div class="section-title">Tender Details</div>
                <div class="field">
                  <span class="field-label">Tender No:</span>
                  <div class="tender-badge">${data.tenderNo}</div>
                </div>
              </div>

              <!-- Submitted Documents -->
              <div class="section">
                <div class="section-title">Submitted Documents</div>
                <div class="field">
                  <span class="field-label">Tender File:</span>
                  <a href="${data.files.tenderFile}" class="document-link" target="_blank">View Document</a>
                </div>
                <div class="field">
                  <span class="field-label">BOQ File:</span>
                  <a href="${data.files.boqFile}" class="document-link" target="_blank">View Document</a>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log("Attempting to send email via Resend...");
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tender Submission System <noreply@emdee.in>",
        to: ["tender@emdee.in", "admin@emdee.in"],
        subject: `New Tender Submission - ${data.tenderNo} - ${data.vendorName}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();
    console.log("Resend response:", resendData);

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return Response.json(
        {
          success: false,
          message: `Email sending failed: ${resendData.message || "Unknown error"}`,
          details: resendData,
        },
        { status: 500 },
      );
    }

    console.log("Email sent successfully");
    return Response.json({
      success: true,
      message: "Tender submitted successfully",
    });
  } catch (error) {
    console.error("Error processing tender submission:", error);
    return Response.json(
      {
        success: false,
        message: `Error: ${error.message}`,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
