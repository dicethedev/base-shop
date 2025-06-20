import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { ReceiptEmail } from "@/components/emails/receipt-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      name,
      walletAddress,
      items,
      total,
      orderNumber,
      address,
      phone,
    } = await request.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Base Shop <noreply@baseshop.com>",
      to: [email],
      subject: `Order Confirmation #${orderNumber} - Base Shop`,
      react: ReceiptEmail({
        customerName: name,
        customerEmail: email,
        walletAddress,
        orderNumber,
        items,
        total,
        shippingAddress: address,
        phoneNumber: phone,
      }),
    });

    if (error) {
      console.error("Email sending error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error("Receipt email error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
