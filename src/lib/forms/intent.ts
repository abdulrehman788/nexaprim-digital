export const STRATEGY_CALL_INTENTS = new Set([
  "strategy-call",
  "book-a-call",
  "book-call",
  "consultation",
]);

export function formNameForIntent(intent: string): "book-a-call" | "contact-us" {
  return STRATEGY_CALL_INTENTS.has(intent.trim().toLowerCase())
    ? "book-a-call"
    : "contact-us";
}

export function isStrategyCallIntent(intent: string): boolean {
  return STRATEGY_CALL_INTENTS.has(intent.trim().toLowerCase());
}
