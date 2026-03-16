/* FIX 404 — Forza output "file piatto" per tutte le pagine
   Senza: src/quartieri.html → _site/quartieri/index.html  (404!)
   Con:   src/quartieri.html → _site/quartieri.html         (✅)   */

module.exports = {
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}.html`
  }
};
