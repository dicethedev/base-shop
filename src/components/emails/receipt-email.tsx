import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import type { CartItem } from "@/contexts/cart-context";

interface ReceiptEmailProps {
  customerName?: string;
  customerEmail: string;
  walletAddress?: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  shippingAddress?: string;
  phoneNumber?: string;
}

export function ReceiptEmail({
  customerName = "Valued Customer",
  customerEmail,
  walletAddress,
  orderNumber,
  items,
  total,
  shippingAddress,
  phoneNumber,
}: ReceiptEmailProps) {
  const previewText = `Your Base Shop order #${orderNumber} has been confirmed!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Heading style={h1}>Base Shop</Heading>
                <Text style={subtitle}>Smart Wallet E-commerce</Text>
              </Column>
            </Row>
          </Section>

          {/* Order Confirmation */}
          <Section style={section}>
            <Heading style={h2}>Order Confirmation</Heading>
            <Text style={text}>Hi {customerName},</Text>
            <Text style={text}>
              Thank you for your order! Your payment has been successfully
              processed using your Smart Wallet. Here are the details of your
              purchase:
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderSection}>
            <Row>
              <Column style={orderInfo}>
                <Text style={orderLabel}>Order Number:</Text>
                <Text style={orderValue}>#{orderNumber}</Text>
              </Column>
              <Column style={orderInfo}>
                <Text style={orderLabel}>Payment Method:</Text>
                <Text style={orderValue}>USDC (Smart Wallet)</Text>
              </Column>
            </Row>
            <Row>
              <Column style={orderInfo}>
                <Text style={orderLabel}>Order Date:</Text>
                <Text style={orderValue}>
                  {new Date().toLocaleDateString()}
                </Text>
              </Column>
              <Column style={orderInfo}>
                <Text style={orderLabel}>Total Amount:</Text>
                <Text style={orderValue}>{total.toFixed(3)} USDC</Text>
              </Column>
            </Row>
          </Section>

          {/* Items */}
          <Section style={section}>
            <Heading style={h3}>Items Ordered</Heading>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemImageCol}>
                  <Img
                    src={item.product.image || "/placeholder.svg"}
                    width="60"
                    height="60"
                    alt={item.product.title}
                    style={itemImage}
                  />
                </Column>
                <Column style={itemDetailsCol}>
                  <Text style={itemTitle}>{item.product.title}</Text>
                  <Text style={itemDescription}>
                    {item.product.description}
                  </Text>
                  <Text style={itemMeta}>
                    Quantity: {item.quantity} × {item.product.price} USDC
                  </Text>
                </Column>
                <Column style={itemPriceCol}>
                  <Text style={itemPrice}>
                    {(
                      Number.parseFloat(item.product.price) * item.quantity
                    ).toFixed(3)}{" "}
                    USDC
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={hr} />

          {/* Total */}
          <Section style={totalSection}>
            <Row>
              <Column style={totalLabelCol}>
                <Text style={totalLabel}>Total:</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValue}>{total.toFixed(3)} USDC</Text>
                <Text style={totalUsd}>≈ ${(total * 1).toFixed(2)} USD</Text>
              </Column>
            </Row>
          </Section>

          {/* Customer Information */}
          <Section style={section}>
            <Heading style={h3}>Customer Information</Heading>
            <Text style={customerInfo}>
              <strong>Email:</strong> {customerEmail}
            </Text>
            {walletAddress && (
              <Text style={customerInfo}>
                <strong>Wallet Address:</strong> {walletAddress}
              </Text>
            )}
            {shippingAddress && (
              <Text style={customerInfo}>
                <strong>Shipping Address:</strong> {shippingAddress}
              </Text>
            )}
            {phoneNumber && (
              <Text style={customerInfo}>
                <strong>Phone:</strong> {phoneNumber}
              </Text>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Thank you for shopping with Base Shop! If you have any questions
              about your order, please don't hesitate to contact our support
              team.
            </Text>
            <Text style={footerText}>
              This purchase was made using Base Smart Wallet technology for a
              seamless, secure checkout experience.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#1e40af",
  color: "#ffffff",
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
};

const subtitle = {
  color: "#e0e7ff",
  fontSize: "16px",
  margin: "4px 0 0 0",
  padding: "0",
};

const section = {
  padding: "24px",
};

const h2 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px 0",
};

const h3 = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 12px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const orderSection = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  margin: "0 24px",
};

const orderInfo = {
  padding: "8px 0",
};

const orderLabel = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0",
  fontWeight: "500",
};

const orderValue = {
  color: "#1f2937",
  fontSize: "16px",
  margin: "4px 0 0 0",
  fontWeight: "600",
};

const itemRow = {
  padding: "16px 0",
  borderBottom: "1px solid #e5e7eb",
};

const itemImageCol = {
  width: "80px",
  verticalAlign: "top",
};

const itemImage = {
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const itemDetailsCol = {
  paddingLeft: "16px",
  verticalAlign: "top",
};

const itemTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 4px 0",
};

const itemDescription = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 0 8px 0",
  lineHeight: "20px",
};

const itemMeta = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0",
};

const itemPriceCol = {
  textAlign: "right" as const,
  verticalAlign: "top",
  paddingLeft: "16px",
};

const itemPrice = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const totalSection = {
  padding: "0 24px",
};

const totalLabelCol = {
  textAlign: "left" as const,
};

const totalValueCol = {
  textAlign: "right" as const,
};

const totalLabel = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0",
};

const totalValue = {
  color: "#1e40af",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const totalUsd = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "4px 0 0 0",
};

const customerInfo = {
  color: "#374151",
  fontSize: "14px",
  margin: "0 0 8px 0",
  lineHeight: "20px",
};

const footer = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderTop: "1px solid #e5e7eb",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 12px 0",
};
