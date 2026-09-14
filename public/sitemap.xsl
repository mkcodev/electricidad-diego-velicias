<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sitemap — Diego Velicias Electricidad</title>
      <style>
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 0;
          background: #F2F2F2;
          font-family: Montserrat, Arial, sans-serif;
          color: #1A1A1A;
        }
        header {
          background: #1A1A1A;
          color: #FFFFFF;
          padding: 2.5rem 1.5rem;
        }
        header .inner { max-width: 960px; margin: 0 auto; }
        header p.eyebrow {
          color: #F7B904;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }
        header h1 { margin: 0; font-size: 1.6rem; }
        header p.sub { margin: 0.5rem 0 0; color: #E5E5E5; font-size: 0.9rem; }
        main { max-width: 960px; margin: -1.5rem auto 2rem; padding: 0 1.5rem; }
        .count {
          background: #FFFFFF;
          border-radius: 1rem;
          box-shadow: 0 4px 20px 0 rgba(26,26,26,0.08);
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #6B6B6B;
        }
        .count strong { color: #1A1A1A; }
        table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 20px 0 rgba(26,26,26,0.08);
        }
        thead th {
          text-align: left;
          background: #1A1A1A;
          color: #FFFFFF;
          padding: 0.85rem 1rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        tbody td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #E5E5E5;
          font-size: 0.9rem;
          vertical-align: top;
        }
        tbody tr:last-child td { border-bottom: none; }
        tbody tr:hover { background: #FFF3CC; }
        a { color: #1A1A1A; font-weight: 600; text-decoration: none; }
        a:hover { color: #D99F00; text-decoration: underline; }
        .badge {
          display: inline-block;
          background: #F2F2F2;
          color: #6B6B6B;
          border-radius: 0.625rem;
          padding: 0.15rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
        }
        footer {
          max-width: 960px; margin: 0 auto; padding: 0 1.5rem 2.5rem;
          font-size: 0.8rem; color: #6B6B6B;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="inner">
          <p class="eyebrow">Sitemap XML</p>
          <h1>Diego Velicias Electricidad</h1>
          <p class="sub">Índice de páginas enviado a los buscadores. Generado automáticamente en cada despliegue.</p>
        </div>
      </header>
      <main>
        <div class="count">
          <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></strong> URLs indexables en este sitemap.
        </div>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Prioridad</th>
              <th>Frecuencia</th>
              <th>Última modificación</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a>
                </td>
                <td><span class="badge"><xsl:value-of select="sitemap:priority" /></span></td>
                <td><xsl:value-of select="sitemap:changefreq" /></td>
                <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </main>
      <footer>
        Este archivo sigue el protocolo estándar de sitemaps.org — es legible por Google, Bing y el resto de buscadores.
      </footer>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
