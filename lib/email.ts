// Email templates and sending functions using Resend
// TODO: Install resend package: pnpm add resend
// TODO: Set RESEND_API_KEY environment variable

const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "noreply@gaadibazaar.in";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: EmailParams) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set. Email would not be sent in production.");
    console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    // TODO: Uncomment when Resend is installed
    /*
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.statusText}`);
    }

    return await response.json();
    */

    console.log(`[Email] Sent to ${to}: ${subject}`);
    return { success: true, id: `mock-${Date.now()}` };
  } catch (error) {
    console.error("[Email Error]", error);
    throw error;
  }
}

// Email Templates

export async function sendSubscriptionReminderEmail(
  dealerName: string,
  dealerEmail: string,
  plan: string,
  expiryDate: Date
) {
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const html = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1628;">Your ${plan} Plan Expires Soon</h2>
          <p style="color: #666; font-size: 16px;">Hi ${dealerName},</p>

          <p style="color: #666; font-size: 16px;">
            Your GaadiBazaar ${plan} plan will expire in <strong>${daysUntilExpiry} days</strong>
            (${expiryDate.toLocaleDateString("en-IN")}).
          </p>

          <p style="color: #666; font-size: 16px;">
            Renew now to keep your listings active and continue receiving buyer inquiries.
          </p>

          <div style="margin: 30px 0;">
            <a href="https://gaadibazaar.in/dealer/subscription" style="background-color: #FF6B2B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Renew Subscription
            </a>
          </div>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            If you have any questions, reply to this email or contact us at support@gaadibazaar.in
          </p>

          <p style="color: #999; font-size: 14px;">Best regards,<br/>GaadiBazaar Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: dealerEmail,
    subject: `Your ${plan} plan expires in ${daysUntilExpiry} days`,
    html,
  });
}

export async function sendListingApprovedEmail(
  sellerName: string,
  sellerEmail: string,
  carTitle: string,
  listingUrl: string
) {
  const html = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1628;">Your Listing is Live! 🎉</h2>
          <p style="color: #666; font-size: 16px;">Hi ${sellerName},</p>

          <p style="color: #666; font-size: 16px;">
            Great news! Your ${carTitle} listing has been approved and is now live on GaadiBazaar.
          </p>

          <p style="color: #666; font-size: 16px;">
            Buyers can now see your listing and contact you with inquiries. You'll receive buyer messages directly on WhatsApp.
          </p>

          <div style="margin: 30px 0;">
            <a href="${listingUrl}" style="background-color: #FF6B2B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              View Your Listing
            </a>
          </div>

          <h3 style="color: #0A1628;">Tips to Get More Inquiries:</h3>
          <ul style="color: #666;">
            <li>Add clear photos of your car from all angles</li>
            <li>Be quick to respond to buyer inquiries</li>
            <li>Share your listing on WhatsApp and social media</li>
            <li>Consider upgrading to Featured for 3x more visibility</li>
          </ul>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            Questions? Contact us: support@gaadibazaar.in
          </p>

          <p style="color: #999; font-size: 14px;">Best regards,<br/>GaadiBazaar Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: sellerEmail,
    subject: `Your ${carTitle} listing is now live!`,
    html,
  });
}

export async function sendLeadNotificationEmail(
  dealerName: string,
  dealerEmail: string,
  buyerName: string,
  buyerPhone: string,
  carTitle: string,
  leadUrl: string
) {
  const html = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1628;">New Buyer Inquiry! 🎯</h2>
          <p style="color: #666; font-size: 16px;">Hi ${dealerName},</p>

          <p style="color: #666; font-size: 16px;">
            <strong>${buyerName}</strong> is interested in your <strong>${carTitle}</strong> listing!
          </p>

          <div style="background-color: #F8F7F4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>Buyer Details:</strong></p>
            <p style="margin: 10px 0 0 0; color: #0A1628;">
              <strong>Phone:</strong> ${buyerPhone}<br/>
              <strong>Name:</strong> ${buyerName}
            </p>
          </div>

          <p style="color: #666; font-size: 16px;">
            We've sent the buyer your contact info. They'll reach out on WhatsApp or call you.
          </p>

          <div style="margin: 30px 0;">
            <a href="${leadUrl}" style="background-color: #FF6B2B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              View All Leads
            </a>
          </div>

          <p style="color: #999; font-size: 14px;">
            Respond quickly to increase your chances of closing the sale!
          </p>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">Best regards,<br/>GaadiBazaar Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: dealerEmail,
    subject: `New inquiry for your ${carTitle}!`,
    html,
  });
}

export async function sendWelcomeDealerEmail(
  dealerName: string,
  dealerEmail: string,
  plan: string,
  dashboardUrl: string
) {
  const html = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1628;">Welcome to GaadiBazaar! 🚗</h2>
          <p style="color: #666; font-size: 16px;">Hi ${dealerName},</p>

          <p style="color: #666; font-size: 16px;">
            Welcome to India's fastest-growing used car platform for dealers. Your ${plan} plan is now active!
          </p>

          <h3 style="color: #0A1628;">Get Started in 3 Steps:</h3>
          <ol style="color: #666;">
            <li><strong>List Your First Car:</strong> Add your inventory and get buyer inquiries instantly</li>
            <li><strong>Manage Leads:</strong> Track all buyer inquiries in one dashboard</li>
            <li><strong>Grow Your Business:</strong> Access tools to help you sell faster and better</li>
          </ol>

          <div style="margin: 30px 0;">
            <a href="${dashboardUrl}" style="background-color: #FF6B2B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Go to Your Dashboard
            </a>
          </div>

          <p style="color: #666; font-size: 16px;">
            Need help? Check out our dealer guide or email us at dealers@gaadibazaar.in
          </p>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">Best regards,<br/>GaadiBazaar Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: dealerEmail,
    subject: `Welcome to GaadiBazaar, ${dealerName}!`,
    html,
  });
}
