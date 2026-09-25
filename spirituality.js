(function () {
  "use strict";

  var list = window.SPIRITUALITIES || [];
  var id = new URLSearchParams(window.location.search).get("id") || "augustinian";
  var s = list.find(function (x) {
    return x.id === id;
  }) || list[0];

  var root = document.getElementById("spir-root");
  if (!root || !s) return;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  document.title = s.name + " — Spiritual Traditions — Melius Illuminare";
  document.body.style.setProperty("--spir-accent", s.accent || "#c9a227");

  var progress = document.getElementById("spir-progress-inner");
  var sections = [
    { id: "vision", label: "Vision" },
    { id: "charism", label: "Charism" },
    { id: "theology", label: "Theology" },
    { id: "goal", label: "Goal" },
    { id: "teachers", label: "Teachers" },
    { id: "path", label: "Path" },
    { id: "disciplines", label: "Disciplines" },
    { id: "dangers", label: "Dangers" },
    { id: "day", label: "A Day" },
    { id: "texts", label: "Texts" },
    { id: "begin", label: "Begin" }
  ];
  if (progress) {
    progress.innerHTML = sections
      .map(function (sec) {
        return '<a href="#' + sec.id + '">' + sec.label + "</a>";
      })
      .join("");
  }

  function theologyHtml() {
    return (s.theology || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("");
  }

  function emphasesHtml() {
    return (s.keyEmphases || []).map(function (item) { return '<span class="spir-emphasis">' + esc(item) + "</span>"; }).join("");
  }

  function teachersHtml() {
    return (s.teachers || [])
      .map(function (t) {
        var isFounder = !!t.founder;
        var classes = "spir-teacher" + (isFounder ? " is-founder" : "") + (t.figureId ? "" : " no-link");
        var portrait = "";
        if (t.img) {
          portrait =
            '<span class="spir-teacher-portrait' + (isFounder ? " is-founder-portrait" : "") + '">' +
            (isFounder ? '<span class="spir-founder-ornament" aria-hidden="true"></span>' : "") +
            '<img src="' + esc(t.img) + '" alt="" loading="lazy" decoding="async" onerror="this.parentElement.classList.add(\'is-broken\');this.remove();" />' +
            "</span>";
        } else {
          portrait =
            '<span class="spir-teacher-portrait spir-teacher-mono' + (isFounder ? " is-founder-portrait" : "") + '">' +
            (isFounder ? '<span class="spir-founder-ornament" aria-hidden="true"></span>' : "") +
            '<span class="spir-teacher-initials">' + esc((t.name || "?").replace(/^(St\.|Pope)\s+/i, "").split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase()) + "</span>" +
            "</span>";
        }
        var label =
          (isFounder ? '<span class="spir-founder-badge">Founder</span>' : "") +
          '<span class="spir-teacher-name">' + esc(t.name) + "</span>" +
          '<span class="spir-teacher-role">' + esc(t.role || "") + "</span>";
        var inner = portrait + '<span class="spir-teacher-text">' + label + "</span>";
        if (t.figureId) {
          return (
            '<a class="' + classes + '" href="figures/profile.html?id=' +
            encodeURIComponent(t.figureId) +
            '">' + inner + "</a>"
          );
        }
        return '<div class="' + classes + '">' + inner + "</div>";
      })
      .join("");
  }

  function pathHtml() {
    return (s.path || [])
      .map(function (p) {
        return (
          '<div class="spir-path-step">' +
          '<div class="spir-path-stage">' +
          esc(p.stage) +
          "</div>" +
          "<div><h3>" +
          esc(p.title) +
          "</h3><p>" +
          esc(p.body) +
          "</p></div></div>"
        );
      })
      .join("");
  }

  function disciplinesHtml() {
    return (s.disciplines || [])
      .map(function (d) {
        var steps = (d.steps || [])
          .map(function (step) {
            return "<li>" + esc(step) + "</li>";
          })
          .join("");
        return (
          '<article class="spir-discipline">' +
          "<h3>" +
          esc(d.name) +
          "</h3>" +
          "<p>" +
          esc(d.summary) +
          "</p>" +
          '<ol class="spir-steps">' +
          steps +
          "</ol></article>"
        );
      })
      .join("");
  }

  function dangersHtml() {
    return (
      '<ul class="spir-dangers">' +
      (s.dangers || [])
        .map(function (d) {
          return (
            "<li><strong>" +
            esc(d.title) +
            ".</strong> " +
            esc(d.body) +
            "</li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function dayHtml() {
    return (s.day || [])
      .map(function (row) {
        return (
          '<div class="spir-day-row">' +
          '<span class="spir-day-time">' +
          esc(row.time) +
          "</span>" +
          "<span>" +
          esc(row.activity) +
          "</span></div>"
        );
      })
      .join("");
  }

  function textsHtml() {
    return (s.texts || [])
      .map(function (t) {
        var inner =
          '<span class="spir-text-title">' +
          esc(t.title) +
          "</span>" +
          '<span class="spir-text-meta">' +
          esc(t.author || "") +
          (t.note ? " — " + esc(t.note) : "") +
          "</span>";
        if (t.href) {
          var isInternal = t.href.indexOf("http") !== 0;
          return (
            '<a class="spir-text" href="' +
            esc(t.href) +
            '"' +
            (isInternal ? "" : ' target="_blank" rel="noopener"') +
            ">" +
            inner +
            "</a>"
          );
        }
        return '<div class="spir-text">' + inner + "</div>";
      })
      .join("");
  }

  function beginHtml() {
    var b = s.beginHere || {};
    var steps = (b.steps || [])
      .map(function (step) {
        return "<li>" + esc(step) + "</li>";
      })
      .join("");
    return (
      '<div class="spir-begin">' +
      "<h3>" +
      esc(b.title || "Begin here") +
      "</h3>" +
      "<p>" +
      esc(b.intro || "") +
      "</p>" +
      '<ol class="spir-steps">' +
      steps +
      "</ol></div>"
    );
  }


  function galleryHtml() {
    var g = s.gallery || [];
    if (!g.length && s.hero) {
      g = [{ src: s.hero, title: s.name, credit: s.heroCredit || "" }];
    }
    if (!g.length) return "";
    return (
      '<div class="spir-gallery">' +
      g
        .map(function (item) {
          return (
            '<figure class="spir-gallery-item">' +
            '<img src="' +
            esc(item.src) +
            '" alt="' +
            esc(item.title || s.name) +
            '" loading="lazy" />' +
            "<figcaption>" +
            "<strong>" +
            esc(item.title || "") +
            "</strong>" +
            (item.credit ? "<span>" + esc(item.credit) + "</span>" : "") +
            "</figcaption></figure>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function relatedHtml() {
    var concepts = (s.relatedConcepts || [])
      .map(function (c) {
        return (
          '<a href="concept.html?id=' +
          encodeURIComponent(c.id) +
          '">' +
          esc(c.name) +
          "</a>"
        );
      })
      .join("");
    return concepts
      ? '<div class="spir-related">' + concepts + "</div>"
      : "";
  }

  var heroImg = s.hero || (s.gallery && s.gallery[0] && s.gallery[0].src) || "";
  root.innerHTML =
    '<header class="spir-detail-hero' +
    (heroImg ? " has-art" : "") +
    '">' +
    (heroImg
      ? '<div class="spir-cine-img" style="background-image:url(\'' +
        esc(heroImg).replace(/'/g, "%27") +
        "')" +
        '"></div><div class="spir-cine-veil"></div>'
      : "") +
    '<div class="spir-cine-copy">' +
    '<a class="back" href="spiritualities.html">← All spiritual traditions</a>' +
    '<span class="eyebrow">' +
    esc(s.era || "Spiritual school") +
    "</span>" +
    "<h1>" +
    esc(s.name) +
    "</h1>" +
    '<p class="latin">' +
    esc(s.latin || "") +
    "</p>" +
    '<p class="lead">' +
    esc(s.tagline || "") +
    "</p>" +
    (s.heroCredit
      ? '<p class="spir-art-credit">' + esc(s.heroCredit) + "</p>"
      : "") +
    "</div></header>" +
    '<section class="spir-section is-backed" id="vision">' +
    '<span class="spir-kicker">Spiritual vision</span>' +
    "<h2>What the spiritual life is about</h2>" +
    '<div class="spir-prose"><p>' +
    esc(s.vision) +
    "</p></div></section>" +
    '<section class="spir-section spir-feature-section" id="charism">' +
    '<span class="spir-kicker">Unique charism</span>' +
    "<h2>What makes this tradition distinctive</h2>" +
    '<div class="spir-prose spir-charism"><p>' + esc(s.charism || "") + "</p></div>" +
    '<div class="spir-emphases">' + emphasesHtml() + "</div></section>" +
    '<section class="spir-section" id="theology">' +
    '<span class="spir-kicker">Theological center</span>' +
    "<h2>Beliefs and theological emphases</h2>" +
    '<div class="spir-theology"><ul>' + theologyHtml() + "</ul></div></section>" +
    '<section class="spir-section" id="goal">' +
    '<span class="spir-kicker">Ultimate goal</span>' +
    "<h2>The kind of person this path forms</h2>" +
    '<div class="spir-prose"><p>' +
    esc(s.goal) +
    "</p></div></section>" +
    '<section class="spir-section is-backed" id="teachers">' +
    '<span class="spir-kicker">Master teachers</span>' +
    "<h2>Saints and writers of the school</h2>" +
    '<div class="spir-teachers">' +
    teachersHtml() +
    "</div></section>" +
    '<section class="spir-section" id="path">' +
    '<span class="spir-kicker">Path of formation</span>' +
    "<h2>From first steps to deeper life</h2>" +
    '<div class="spir-path">' +
    pathHtml() +
    "</div></section>" +
    '<section class="spir-section" id="disciplines">' +
    '<span class="spir-kicker">Core disciplines</span>' +
    "<h2>How to practice</h2>" +
    '<div class="spir-disciplines">' +
    disciplinesHtml() +
    "</div></section>" +
    '<section class="spir-section" id="dangers">' +
    '<span class="spir-kicker">Spiritual dangers</span>' +
    "<h2>What this tradition warns against</h2>" +
    dangersHtml() +
    "</section>" +
    '<section class="spir-section" id="day">' +
    '<span class="spir-kicker">A day in the life</span>' +
    "<h2>An example rhythm</h2>" +
    '<div class="spir-day">' +
    dayHtml() +
    "</div></section>" +
    '<section class="spir-section" id="texts">' +
    '<span class="spir-kicker">Master texts</span>' +
    "<h2>Primary works to read</h2>" +
    '<div class="spir-texts">' +
    textsHtml() +
    "</div></section>" +
    '<section class="spir-section" id="begin">' +
    '<span class="spir-kicker">Begin here</span>' +
    "<h2>One practice for today</h2>" +
    beginHtml() +
    "</section>" +
    (s.relatedConcepts && s.relatedConcepts.length
      ? '<section class="spir-section" id="related">' +
        '<span class="spir-kicker">In the encyclopedia</span>' +
        "<h2>Related concepts</h2>" +
        relatedHtml() +
        "</section>"
      : "");

  // Backdrop image for backed sections
  if (heroImg) {
    root.querySelectorAll(".spir-section.is-backed").forEach(function (sec) {
      sec.style.setProperty("--spir-section-bg", "url('" + heroImg.replace(/'/g, "%27") + "')");
    });
  }

})();
