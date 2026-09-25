(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function params() {
    const q = {};
    (location.search || "").replace(/^\?/, "").split("&").forEach(function (pair) {
      const p = pair.split("=");
      if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "");
    });
    return q;
  }

  const main = document.getElementById("mag-controversy-main");
  const id = params().id;
  let controversy = null;
  let parentCentury = null;
  const centuries = (window.MAGISTERIUM && window.MAGISTERIUM.centuries) || [];
  centuries.forEach(function (c) {
    (c.controversies || []).forEach(function (cont) {
      if (cont.id === id) {
        controversy = cont;
        parentCentury = c;
      }
    });
  });

  if (!main) return;
  if (!controversy) {
    main.innerHTML = '<div class="mag-not-found"><p>Controversy not found.</p><p><a href="magisterium.html">← Back to Magisterium</a></p></div>';
    return;
  }

  document.title = controversy.name + " — Magisterium — Melius Illuminare";

  const arc = [
    { key: "question", label: "The Question" },
    { key: "positions", label: "Competing Positions" },
    { key: "intervention", label: "The Church’s Intervention" },
    { key: "magisterialAct", label: "Magisterial Act" },
    { key: "result", label: "Result" },
    { key: "laterDevelopment", label: "Later Development" }
  ];

  let html = "";
  html += '<section class="mag-controversy-hero">';
  html += '<div class="mag-century-hero-inner">';
  if (parentCentury) {
    html += '<a class="mag-back" href="magisterium-century.html?id=' + encodeURIComponent(parentCentury.id) + '">← ' + escapeHtml(parentCentury.name) + "</a>";
  } else {
    html += '<a class="mag-back" href="magisterium.html">← All centuries</a>';
  }
  html += '<span class="hero-eyebrow">Controversy</span>';
  html += "<h1>" + escapeHtml(controversy.name) + "</h1>";
  if (controversy.question) {
    html += '<p class="hero-lede">' + escapeHtml(controversy.question) + "</p>";
  }
  html += "</div></section>";

  html += '<div class="mag-arc">';
  arc.forEach(function (step, i) {
    const body = controversy[step.key];
    if (!body) return;
    html += '<section class="mag-arc-step">';
    html += '<span class="mag-arc-num">' + String(i + 1).padStart(2, "0") + "</span>";
    html += "<h2>" + escapeHtml(step.label) + "</h2>";
    if (Array.isArray(body)) {
      html += "<ul>" + body.map(function (line) {
        return "<li>" + escapeHtml(line) + "</li>";
      }).join("") + "</ul>";
    } else {
      html += "<p>" + escapeHtml(body) + "</p>";
    }
    html += "</section>";
  });
  html += "</div>";

  main.innerHTML = html;
})();
