<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">

  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>XML Sitemap — Expandova</title>
        <style type="text/css">
          :root {
            --bg: #f8fafc;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --line: #e2e8f0;
            --accent: #7c3aed;
            --accent2: #f97316;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.5;
          }
          .wrap {
            max-width: 960px;
            margin: 0 auto;
            padding: 2.5rem 1.25rem 3.5rem;
          }
          h1 {
            margin: 0 0 0.35rem;
            font-size: 1.75rem;
            letter-spacing: -0.02em;
          }
          .sub {
            margin: 0 0 1.75rem;
            color: var(--muted);
            font-size: 0.95rem;
          }
          .sub a { color: var(--accent); }
          .card {
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px -16px rgba(15, 23, 42, 0.25);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          }
          th {
            text-align: left;
            padding: 0.85rem 1rem;
            background: #0b1220;
            color: #e2e8f0;
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          td {
            padding: 0.8rem 1rem;
            border-top: 1px solid var(--line);
            vertical-align: top;
          }
          tr:nth-child(even) td { background: #f8fafc; }
          td a {
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
          }
          td a:hover { color: var(--accent2); text-decoration: underline; }
          .meta { color: var(--muted); white-space: nowrap; }
          .count {
            display: inline-block;
            margin-bottom: 1rem;
            padding: 0.35rem 0.7rem;
            border-radius: 999px;
            background: #ede9fe;
            color: #5b21b6;
            font-size: 0.8rem;
            font-weight: 700;
          }
          @media (max-width: 720px) {
            .hide-sm { display: none; }
            td, th { padding: 0.7rem 0.75rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>XML Sitemap</h1>
          <p class="sub">
            This is an XML sitemap for search engines.
            You can also browse the
            <a href="/sitemap">HTML sitemap</a>.
          </p>
          <div class="count">
            <xsl:value-of select="count(s:urlset/s:url)" />
            <xsl:text> URLs</xsl:text>
          </div>
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th class="hide-sm">Last Modified</th>
                  <th class="hide-sm">Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td>
                      <a href="{s:loc}">
                        <xsl:value-of select="s:loc" />
                      </a>
                    </td>
                    <td class="meta hide-sm">
                      <xsl:value-of select="s:lastmod" />
                    </td>
                    <td class="meta hide-sm">
                      <xsl:value-of select="s:changefreq" />
                    </td>
                    <td class="meta">
                      <xsl:value-of select="s:priority" />
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
