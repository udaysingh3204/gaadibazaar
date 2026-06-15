interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
    return { success: true, id: `mock-${Date.now()}` };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "noreply@gaadibazaar.in",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) throw new Error(`Email send failed: ${res.statusText}`);
  return res.json();
}
