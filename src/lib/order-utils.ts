export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `BSH-${timestamp}-${randomStr}`.toUpperCase();
}

export function sendReceiptEmail(orderData: {
  email: string;
  name?: string;
  walletAddress?: string;
  items: any[];
  total: number;
  address?: string;
  phone?: string;
}) {
  const orderNumber = generateOrderNumber();

  return fetch("/api/send-receipt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...orderData,
      orderNumber,
    }),
  });
}
