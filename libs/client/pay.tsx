import { loadTossPayments } from "@tosspayments/payment-sdk";
import { PaymentMethodType } from "@tosspayments/payment__types";

interface PayInfo {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}

export default async function pay(name: PaymentMethodType, payInfo: PayInfo) {
  console.log("test_ck_O6BYq7GWPVvQOxmgnOl3NE5vbo1d");
  const tossPay = await loadTossPayments(
    "test_ck_O6BYq7GWPVvQOxmgnOl3NE5vbo1d"
  );
  tossPay.requestPayment(name, payInfo);
}
