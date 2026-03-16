module.exports = function(eleventyConfig) {
  // Copia la cartella assets e mappa.html (file standalone senza layout)
  eleventyConfig.addPassthroughCopy({"assets": "assets"});
  eleventyConfig.addPassthroughCopy({"mappa.html": "mappa.html"});

  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts"
    },
    htmlTemplateEngine: "njk"
  };
};
