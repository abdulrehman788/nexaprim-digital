import "server-only";

/**
 * Fail closed in production when critical secrets are missing or still placeholders.
 * Call from sensitive admin entrypoints (login) and optionally from instrumentation.
 */
export function assertProductionSecrets(): void {
  if (process.env.NODE_ENV !== "production") return;

  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";

  const weakPassword =
    !password ||
    password.length < 12 ||
    /change-me|password|admin123|secret/i.test(password);

  const weakSecret =
    !secret ||
    secret.length < 32 ||
    /change-me|generate-a-long|secret/i.test(secret);

  if (weakPassword || weakSecret) {
    throw new Error(
      "Refusing to start admin auth: set strong ADMIN_PASSWORD (12+) and ADMIN_SESSION_SECRET (32+) in production.",
    );
  }
}
