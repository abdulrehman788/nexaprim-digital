import { notFound } from "next/navigation";
import { Suspense } from "react";

import { MockCheckoutClient } from "./MockCheckoutClient";

export default function MockCheckoutPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <Suspense fallback={<main className="p-10 text-sm text-gray-500">Loading checkout…</main>}>
      <MockCheckoutClient />
    </Suspense>
  );
}
