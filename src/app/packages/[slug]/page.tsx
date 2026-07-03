import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PackageDetailSection } from "@/components/sections/packages/PackageDetailSection";
import { getPackageById, packages } from "@/data/packages";
import { generatePageMetadata } from "@/lib/seo";

interface PackagePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.id }));
}

export function generateMetadata({ params }: PackagePageProps): Metadata {
  const pkg = getPackageById(params.slug);

  if (!pkg) {
    return generatePageMetadata({ title: "Package Not Found", path: "/packages", noIndex: true });
  }

  return generatePageMetadata({
    title: pkg.title,
    description: pkg.description,
    path: `/packages/${pkg.id}`,
  });
}

export default function PackagePage({ params }: PackagePageProps) {
  const pkg = getPackageById(params.slug);

  if (!pkg) {
    notFound();
  }

  return (
    <main>
      <PackageDetailSection pkg={pkg} />
    </main>
  );
}
