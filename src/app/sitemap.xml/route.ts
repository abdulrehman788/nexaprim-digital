import { siteConfig } from "@/lib/constants";
import { siteRoutes } from "@/lib/site-routes";

export const revalidate = 3600;

/** XML sitemap with XSL so browsers show the usual table UI. */
export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date().toISOString();

  const urls = siteRoutes
    .map(({ path, priority, changeFrequency }) => {
      const loc = `${baseUrl}${path || "/"}`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
