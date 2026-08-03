import "server-only";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface CreatePaymentInput {
  orderNumber: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentResult {
  gatewayName: string;
  gatewayTxnId: string;
  checkoutUrl?: string;
  status: PaymentStatus;
  raw?: unknown;
}

export interface VerifyPaymentInput {
  gatewayTxnId: string;
}

export interface VerifyPaymentResult {
  status: PaymentStatus;
  gatewayTxnId: string;
  raw?: unknown;
}

export interface WebhookResult {
  orderNumber?: string;
  gatewayTxnId: string;
  status: PaymentStatus;
}

export interface PaymentGateway {
  readonly name: string;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
  handleWebhook(payload: unknown, headers: Headers): Promise<WebhookResult | null>;
}

/**
 * Mock gateway for local preview.
 * Complete checkout via /checkout/mock (or admin "Verify").
 * Swap Stripe/JazzCash later without schema/UI changes.
 */
export class MockPaymentGateway implements PaymentGateway {
  readonly name = "mock";

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const gatewayTxnId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return {
      gatewayName: this.name,
      gatewayTxnId,
      status: "PENDING",
      checkoutUrl: `/checkout/mock?order=${encodeURIComponent(input.orderNumber)}&txn=${encodeURIComponent(gatewayTxnId)}`,
      raw: { simulated: true },
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    if (!input.gatewayTxnId?.startsWith("mock_")) {
      return {
        status: "FAILED",
        gatewayTxnId: input.gatewayTxnId,
        raw: { simulated: true, reason: "unknown_txn" },
      };
    }
    return {
      status: "PAID",
      gatewayTxnId: input.gatewayTxnId,
      raw: { simulated: true, verifiedAt: new Date().toISOString() },
    };
  }

  async handleWebhook(payload: unknown): Promise<WebhookResult | null> {
    if (!payload || typeof payload !== "object") return null;
    const body = payload as Record<string, unknown>;
    const gatewayTxnId = typeof body.txn === "string" ? body.txn : typeof body.gatewayTxnId === "string" ? body.gatewayTxnId : null;
    const orderNumber = typeof body.order === "string" ? body.order : typeof body.orderNumber === "string" ? body.orderNumber : undefined;
    const statusRaw = typeof body.status === "string" ? body.status.toUpperCase() : "PAID";
    const status = (["PENDING", "PAID", "FAILED", "REFUNDED"].includes(statusRaw)
      ? statusRaw
      : "PAID") as PaymentStatus;

    if (!gatewayTxnId?.startsWith("mock_")) return null;

    return { orderNumber, gatewayTxnId, status };
  }
}

let gateway: PaymentGateway | null = null;

export function getPaymentGateway(): PaymentGateway {
  if (!gateway) {
    const name = (process.env.PAYMENT_GATEWAY ?? "mock").toLowerCase();
    switch (name) {
      // case "stripe":
      //   gateway = new StripePaymentGateway();
      //   break;
      case "mock":
        if (process.env.NODE_ENV === "production") {
          throw new Error(
            'PAYMENT_GATEWAY=mock is not allowed in production. Set PAYMENT_GATEWAY to a real provider.',
          );
        }
        gateway = new MockPaymentGateway();
        break;
      default:
        throw new Error(
          `PAYMENT_GATEWAY="${name}" is not implemented. Configure a supported gateway.`,
        );
    }
  }
  return gateway;
}

/** @deprecated Prefer allocateOrderNumber() */
export function generateOrderNumber(seq: number): string {
  return `ORD-${String(seq).padStart(5, "0")}`;
}
