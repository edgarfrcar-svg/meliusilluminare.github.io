(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function artUrl(filename) {
    if (!filename) return "";
    // Local site assets
    if (filename.indexOf("img/") === 0 || filename.indexOf("./") === 0 || filename.indexOf("/") === 0) {
      return filename;
    }
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(filename) + "?width=640";
  }

  function params() {
    const q = {};
    (location.search || "").replace(/^\?/, "").split("&").forEach(function (pair) {
      const p = pair.split("=");
      if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "");
    });
    return q;
  }

  const main = document.getElementById("mag-century-main");
  const id = params().id;
  const data = window.MAGISTERIUM && window.MAGISTERIUM.centuries;
  const century = data && data.find(function (c) { return c.id === id; });

  if (!main) return;
  if (!century) {
    main.innerHTML = '<div class="mag-not-found"><p>Century not found.</p><p><a href="magisterium.html">← Back to Magisterium</a></p></div>';
    return;
  }

  document.title = century.name + " — Magisterium — Melius Illuminare";

  function listBlock(title, items, renderItem) {
    if (!items || !items.length) {
      return '<section class="mag-block"><h2>' + escapeHtml(title) + '</h2><p class="mag-empty">No entries listed for this century yet.</p></section>';
    }
    return '<section class="mag-block"><h2>' + escapeHtml(title) + '</h2><ul class="mag-item-list">' +
      items.map(renderItem).join("") + "</ul></section>";
  }

  const heroArt = century.art ? artUrl(century.art[0]) : "";
  const heroPos = (century.art && century.art[1]) ? century.art[1] : "center center";
  let html = "";
  html += '<section class="mag-century-hero">';
  if (heroArt) {
    html += '<div class="mag-century-hero-bg" style="background-image:url(\'' + heroArt + '\');background-position:' + heroPos + ';"></div>';
  }
  html += '<div class="mag-century-hero-inner">';
  html += '<a class="mag-back" href="magisterium.html">← All centuries</a>';
  html += '<span class="hero-eyebrow">' + escapeHtml(century.latin || "") + "</span>";
  html += "<h1>" + escapeHtml(century.name) + "</h1>";
  html += '<p class="hero-lede">' + escapeHtml(century.summary || century.short || "") + "</p>";
  html += "</div></section>";

  html += '<div class="mag-century-body">';

  html += listBlock("Councils", century.councils, function (item) {
    return '<li class="mag-item">' +
      '<span class="mag-item-title">' + escapeHtml(item.name) + "</span>" +
      (item.year ? '<span class="mag-item-meta">' + escapeHtml(item.year) + "</span>" : "") +
      (item.summary ? '<p class="mag-item-summary">' + escapeHtml(item.summary) + "</p>" : "") +
      "</li>";
  });

  html += listBlock("Controversies", century.controversies, function (item) {
    const href = "magisterium-controversy.html?id=" + encodeURIComponent(item.id);
    return '<li class="mag-item mag-item-link">' +
      '<a href="' + href + '">' +
        '<span class="mag-item-title">' + escapeHtml(item.name) + " →</span>" +
        (item.question ? '<p class="mag-item-summary">' + escapeHtml(item.question) + "</p>" : "") +
      "</a></li>";
  });

  html += listBlock("Papal Documents", century.papalDocuments, function (item) {
    return '<li class="mag-item">' +
      '<span class="mag-item-title">' + escapeHtml(item.name) + "</span>" +
      (item.pope || item.year ? '<span class="mag-item-meta">' + escapeHtml([item.pope, item.year].filter(Boolean).join(" · ")) + "</span>" : "") +
      (item.summary ? '<p class="mag-item-summary">' + escapeHtml(item.summary) + "</p>" : "") +
      "</li>";
  });

  html += listBlock("Other Magisterial Acts", century.otherActs, function (item) {
    return '<li class="mag-item">' +
      '<span class="mag-item-title">' + escapeHtml(item.name) + "</span>" +
      (item.year ? '<span class="mag-item-meta">' + escapeHtml(item.year) + "</span>" : "") +
      (item.summary ? '<p class="mag-item-summary">' + escapeHtml(item.summary) + "</p>" : "") +
      "</li>";
  });

  html += "</div>";
  main.innerHTML = html;
})();
