/**
 * Profile rendering + routing engine for figures/profile.html
 *
 * URL contract (the "contextual navigation" architecture):
 *   figures/profile.html?id=<figureId>            → full profile, no foregrounding
 *   figures/profile.html?id=<figureId>&topic=<key> → profile with that opinion
 *                                                     foregrounded (moved first,
 *                                                     highlighted, scrolled to,
 *                                                     with a "you arrived from…"
 *                                                     banner)
 *
 * A permalink to one specific position also works without JS-driven context,
 * via the plain anchor: figures/profile.html?id=augustine#on-grace
 *
 * Any page in the site can link into a figure's specific position — e.g. a
 * doctrine page for "Free Will" links to
 * figures/profile.html?id=augustine&topic=free-will — without either page
 * needing to know about the other's internals. That decoupling is what lets
 * this scale to many figures and many linking pages.
 */
(function () {
  const DATA = window.PROFILE_DATA || {};
  const TRADITIONS = window.TRADITION_COLORS || {};
  const VISUAL_PRESETS = window.PROFILE_VISUAL_PRESETS || {};
  const raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (fn) { setTimeout(fn, 0); };

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function paras(list) {
    return (list || []).map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
  }

  function slugify(str) {
    return String(str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function monogram(name) {
    const parts = String(name || '?').replace(/of\s|the\s/gi, '').split(' ').filter(Boolean);
    return (parts[0] ? parts[0][0] : '?') + (parts[1] ? parts[1][0] : '');
  }

  // A "relation card" links to another figure's profile when we have data for
  // them (figureId present in PROFILE_DATA), preserving topic context where
  // it makes sense; otherwise it renders as an inert card with just the note.
  function relCard(rel, opts) {
    opts = opts || {};
    const hasProfile = rel.figureId && DATA[rel.figureId];
    const name = escapeHtml(rel.name);
    const note = rel.note ? '<span class="fp-rel-note">' + escapeHtml(rel.note) + '</span>' : '';
    if (hasProfile) {
      let href = 'profile.html?id=' + encodeURIComponent(rel.figureId);
      if (opts.topicKey) href += '&topic=' + encodeURIComponent(opts.topicKey);
      return '<a class="fp-rel-card" href="' + href + '">' +
        '<span class="fp-rel-name">' + name + ' →</span>' + note + '</a>';
    }
    return '<div class="fp-rel-card fp-rel-inert"><span class="fp-rel-name">' + name + '</span>' + note + '</div>';
  }

  function traditionMeta(key) {
    return TRADITIONS[key] || { name: key || 'Unclassified', color: '#a39a86', glow: 'transparent' };
  }


  function resolveVisualIdentity(figure) {
    const base = {
      preset: 'default',
      mood: 'quiet scholarly atmosphere',
      motif: 'subtle illumination',
      texture: 'none',
      motion: 'slow-breath',
      typography: 'meditative',
      palette: {}
    };
    const preset = figure && figure.visual && figure.visual.preset && VISUAL_PRESETS[figure.visual.preset]
      ? VISUAL_PRESETS[figure.visual.preset]
      : {};
    return Object.assign(base, preset, figure && figure.visual ? figure.visual : {});
  }

  function applyVisualIdentity(figure) {
    const shell = document.querySelector('.fp-shell');
    if (!shell) return;
    const identity = resolveVisualIdentity(figure);
    const palette = identity.palette || {};

    shell.setAttribute('data-identity', identity.preset || 'default');
    shell.style.setProperty('--fp-hero-bg', palette.hero || 'radial-gradient(circle at 50% 10%, rgba(201,162,39,0.12), transparent 34%), linear-gradient(180deg, rgba(13,16,20,0.95), rgba(8,9,12,0.98))');
    shell.style.setProperty('--fp-surface-top', palette.surfaceTop || '#12141d');
    shell.style.setProperty('--fp-surface-bottom', palette.surfaceBottom || '#0a0d12');
    shell.style.setProperty('--fp-panel', palette.panel || '#12141d');
    shell.style.setProperty('--fp-accent', palette.accent || '#c9a227');
    shell.style.setProperty('--fp-accent-soft', palette.accentSoft || 'rgba(201,162,39,0.18)');
    shell.style.setProperty('--fp-glow', palette.glow || 'rgba(201,162,39,0.18)');
    shell.style.setProperty('--fp-border', palette.border || 'rgba(236,229,212,0.12)');
    shell.style.setProperty('--fp-hero-ink', palette.heroInk || '#ece5d4');
    shell.style.setProperty('--fp-display-font', identity.typography === 'ordered' ? '"Cinzel", serif' : '"Cinzel", serif');
    shell.dataset.motif = identity.motif || 'subtle-illumination';
    shell.dataset.texture = identity.texture || 'none';
    shell.dataset.motion = identity.motion || 'slow-breath';
  }

  function render(figure, topicKey) {
    const main = document.getElementById('fp-main');
    const nav = document.getElementById('fp-nav');
    const banner = document.getElementById('fp-context-banner');
    const t = traditionMeta(figure.tradition);
    applyVisualIdentity(figure);

    document.title = figure.name + ' — Melius Illuminare';

    // Reorder opinions so a requested topic is foregrounded first, if present.
    const opinions = (figure.opinions || []).slice();
    let matchedOpinion = null;
    if (topicKey) {
      const idx = opinions.findIndex(function (o) { return o.id === topicKey; });
      if (idx > 0) {
        matchedOpinion = opinions.splice(idx, 1)[0];
        opinions.unshift(matchedOpinion);
      } else if (idx === 0) {
        matchedOpinion = opinions[0];
      }
    }

    // ---- Context banner ----
    if (matchedOpinion) {
      banner.classList.add('is-visible');
      banner.innerHTML =
        '<span>Arrived via <strong>' + escapeHtml(topicLabel(topicKey)) + '</strong> — ' +
        '<strong>' + escapeHtml(matchedOpinion.title) + '</strong>.</span>' +
        '<a class="fp-banner-exhibit" href="opinion.html?id=' + encodeURIComponent(figure.id) +
        '&topic=' + encodeURIComponent(matchedOpinion.id) + '">Open intellectual exhibit →</a>' +
        '<button type="button" id="fp-clear-context">View full profile</button>';
      const clearBtn = document.getElementById('fp-clear-context');
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          const url = new URL(window.location.href);
          url.searchParams.delete('topic');
          window.location.href = url.pathname + (url.search || '');
        });
      }
    } else {
      banner.classList.remove('is-visible');
      banner.innerHTML = '';
    }

    // ---- Hero (mystical two-column, mockup-aligned) ----
    // Profile pages live under figures/, so local img/ paths need ../
    function mediaUrl(src) {
      if (!src) return '';
      if (/^https?:\/\//i.test(src) || src.indexOf('../') === 0 || src.charAt(0) === '/') return src;
      if (src.indexOf('img/') === 0) return '../' + src;
      return src;
    }
    const portraitSrc = mediaUrl(figure.portrait);
    const portraitInner = portraitSrc
      ? '<img src="' + escapeHtml(portraitSrc) + '" alt="Portrait of ' + escapeHtml(figure.name) + '" loading="lazy" onerror="this.style.display=\'none\'">'
      : monogram(figure.name);

    const rolesHtml = (figure.roles || []).map(function (r) {
      return '<span class="fp-role-pill">' + escapeHtml(r) + '</span>';
    }).join('');

    // Honorific for major doctors (visual only)
    let honorific = '';
    if (figure.id === 'augustine' || figure.id === 'aquinas') honorific = 'SAINT';
    else if (figure.id === 'luther') honorific = 'DR.';

    const identity = resolveVisualIdentity(figure);
    let html = '';
    html += '<div class="fp-hero" style="--ring-color:' + t.color + '; --ring-glow:' + (t.glow || 'transparent') + '">';
    html += '<div class="fp-hero-atmosphere" aria-hidden="true"></div>';
    html += '<div class="fp-hero-rays" aria-hidden="true"></div>';
    html += '<div class="fp-ornamental-frame" aria-hidden="true">';
    html += '<span class="fp-ornament fp-ornament-a"></span>';
    html += '<span class="fp-ornament fp-ornament-b"></span>';
    html += '</div>';
    html += '<div class="fp-hero-grid">';
    html += '<div class="fp-hero-copy">';
    if (honorific) html += '<span class="fp-honorific">' + honorific + '</span>';
    html += '<h1>' + escapeHtml(figure.name) + '</h1>';
    if (figure.centralQuestion) {
      const hasAnswer = !!(window.CENTRAL_ANSWERS && window.CENTRAL_ANSWERS[figure.id]);
      html += '<div class="fp-central-question' + (hasAnswer ? ' is-openable' : '') + '">';
      html += '<span class="fp-cq-label">' + escapeHtml(figure.centralQuestionLabel || 'Central Question') + '</span>';
      html += '<p class="fp-cq-text">' + escapeHtml(figure.centralQuestion) + '</p>';
      if (hasAnswer) {
        html += '<a class="fp-cq-open" href="central-answer.html?id=' + encodeURIComponent(figure.id) + '">Open the answer →</a>';
      }
      html += '</div>';
    }
    if (figure.epithet) html += '<p class="fp-epithet">' + escapeHtml(figure.epithet) + '</p>';
    html += '<div class="fp-dates">' + escapeHtml(figure.dates || '') + '</div>';
    if (figure.period) {
      html += '<div class="fp-meta-row"><span>' + escapeHtml(figure.period) + '</span></div>';
    }
    if (rolesHtml) html += '<div class="fp-roles">' + rolesHtml + '</div>';
    html += '<span class="tag-pill" style="border-color:' + t.color + '; color:' + t.color + '">' + escapeHtml(t.name) + '</span>';
    html += '</div>';
    html += '<div class="fp-portrait-wrap">';
    html += '<div class="fp-portrait-glow" aria-hidden="true"></div>';
    html += '<div class="fp-portrait">' + portraitInner + '</div>';
    html += '<span class="fp-portrait-credit">Public-domain portrait</span>';
    html += '</div>';
    html += '</div>'; // grid
    html += '</div>'; // hero

    // ---- Biography (restored to first reading position) ----
    if (figure.bio && figure.bio.length) {
      html += '<section class="fp-section" id="overview"><h2>Biography</h2>' + paras(figure.bio) + '</section>';
    }

    // ---- The Intellectual Portrait (primary reading section) ----
    if (figure.intellectualPortrait && figure.intellectualPortrait.paragraphs && figure.intellectualPortrait.paragraphs.length) {
      const ip = figure.intellectualPortrait;
      html += '<section class="fp-section fp-intellectual-portrait" id="portrait">';
      html += '<p class="fp-ip-eyebrow">The Intellectual Portrait</p>';
      if (ip.question) html += '<h2 class="fp-ip-question">' + escapeHtml(ip.question) + '</h2>';
      if (ip.arc && ip.arc.length) {
        html += '<div class="fp-ip-arc" aria-hidden="true">';
        html += ip.arc.map(function (step, i) {
          const arrow = i < ip.arc.length - 1 ? '<span class="fp-ip-arc-arrow">→</span>' : '';
          return '<a class="fp-ip-arc-node" href="#ip-' + slugify(step) + '">' + escapeHtml(step) + '</a>' + arrow;
        }).join('');
        html += '</div>';
      }
      html += '<div class="fp-ip-narrative">';
      html += ip.paragraphs.map(function (p) {
        return '<div class="fp-ip-step" id="ip-' + slugify(p.label) + '">' +
          '<h3>' + escapeHtml(p.label) + '</h3>' +
          '<p>' + escapeHtml(p.text) + '</p>' +
        '</div>';
      }).join('');
      html += '</div>';
      html += '</section>';
    }

    // ---- Major theological concepts ----
    if (figure.concepts && figure.concepts.length) {
      html += '<section class="fp-section" id="concepts"><h2>Major Theological Concepts</h2>';
      html += '<div class="fp-concept-chips">' + figure.concepts.map(function (c) {
        return '<span class="fp-concept-chip">' + escapeHtml(c) + '</span>';
      }).join('') + '</div></section>';
    }

    // ---- Opinions (independently addressable) ----
    if (opinions.length) {
      html += '<section class="fp-section" id="opinions"><h2>Major Opinions &amp; Positions</h2>';
      html += '<p class="fp-opinions-intro">Each position opens as an intellectual exhibit: the question, the argument, sources, and later reception.</p>';
      opinions.forEach(function (op) {
        const isForegrounded = matchedOpinion && op.id === matchedOpinion.id;
        const exhibitHref = 'opinion.html?id=' + encodeURIComponent(figure.id) + '&topic=' + encodeURIComponent(op.id);
        html += '<article class="fp-opinion fp-opinion-card' + (isForegrounded ? ' is-foregrounded' : '') + '" id="on-' + escapeHtml(op.id) + '">';
        if (op.tags && op.tags.length) {
          html += '<div class="fp-opinion-tags">' + op.tags.map(function (tag) { return '<span class="fp-opinion-tag">' + escapeHtml(tag) + '</span>'; }).join(' ') + '</div>';
        }
        html += '<h3><a class="fp-opinion-title-link" href="' + exhibitHref + '">' + escapeHtml(op.title) + '</a></h3>';
        if (op.thesis) html += '<p class="fp-opinion-thesis">' + escapeHtml(op.thesis) + '</p>';
        // short teaser only — full argument lives on the exhibit page
        if (op.paragraphs && op.paragraphs.length) {
          html += '<p class="fp-opinion-teaser">' + escapeHtml(op.paragraphs[0]) + '</p>';
        }
        html += '<a class="fp-opinion-open" href="' + exhibitHref + '">Open the exhibit →</a>';
        if (op.contrasts && op.contrasts.length) {
          html += '<div class="fp-opinion-links">';
          html += op.contrasts.map(function (c) {
            if (!DATA[c.figureId]) return '';
            let href = 'profile.html?id=' + encodeURIComponent(c.figureId);
            if (c.topicKey) href += '&topic=' + encodeURIComponent(c.topicKey);
            return '<a href="' + href + '">' + escapeHtml(c.label || ('See ' + c.figureId)) + ' →</a>';
          }).join(' &nbsp;·&nbsp; ');
          html += '</div>';
        }
        html += '</article>';
      });
      html += '</section>';
    }

    // ---- Influences / Influenced / Opponents ----
    function relSection(id, label, list) {
      if (!list || !list.length) return '';
      let out = '<section class="fp-section" id="' + id + '"><h2>' + escapeHtml(label) + '</h2>';
      out += '<div class="fp-rel-grid">' + list.map(function (rel) { return relCard(rel); }).join('') + '</div>';
      out += '</section>';
      return out;
    }
    html += relSection('influences', 'Influences', figure.influences);
    html += relSection('influenced', 'People Influenced', figure.influenced);
    html += relSection('opponents', 'Major Opponents', figure.opponents);

    // ---- Controversies ----
    if (figure.controversies && figure.controversies.length) {
      html += '<section class="fp-section" id="controversies"><h2>Related Controversies</h2>';
      html += figure.controversies.map(function (c) {
        return '<div class="fp-controversy-card"><h4>' + escapeHtml(c.name) + '</h4><p>' + escapeHtml(c.summary || '') + '</p></div>';
      }).join('');
      html += '</section>';
    }

    // ---- Primary sources: links open dedicated work reader ----
    if (figure.primarySources && figure.primarySources.length) {
      const WORKS = window.WORKS || {};
      html += '<section class="fp-section" id="sources"><h2>Primary Sources</h2>';
      html += '<p class="fp-sources-intro">Open a work to read it on its own page. You can bookmark your place and highlight passages — saved in this browser.</p>';
      html += '<ul class="fp-sources-list">';
      figure.primarySources.forEach(function (s) {
        const title = escapeHtml(s.title);
        const note = s.note ? escapeHtml(s.note) : '';
        const workKey = s.workKey || null;
        const work = workKey && WORKS[workKey] ? WORKS[workKey] : null;
        html += '<li class="fp-source-row">';
        if (s.summaLink) {
          html += '<a class="fp-source-link" href="../texts/summa.html">';
          html += '<span class="fp-source-title">' + title + '</span>';
          html += '<span class="fp-source-badge">Open Summa reader →</span>';
          html += '</a>';
          if (note) html += '<span class="fp-source-note">' + note + '</span>';
        } else if (workKey === 'aquinas-summa-prima' || workKey === 'aquinas-summa') {
          html += '<a class="fp-source-link" href="../texts/summa.html">';
          html += '<span class="fp-source-title">' + title + '</span>';
          html += '<span class="fp-source-badge">Open Summa reader →</span>';
          html += '</a>';
          if (note) html += '<span class="fp-source-note">' + note + '</span>';
        } else if (work) {
          html += '<a class="fp-source-link" href="../texts/work.html?id=' + encodeURIComponent(workKey) + '">';
          html += '<span class="fp-source-title">' + title + '</span>';
          html += '<span class="fp-source-badge">Read work →</span>';
          html += '</a>';
          if (note) html += '<span class="fp-source-note">' + note + '</span>';
          else if (work.translation) html += '<span class="fp-source-note">' + escapeHtml(work.translation) + '</span>';
        } else if (s.url) {
          html += '<a class="fp-source-link fp-source-ext" href="' + escapeHtml(s.url) + '" target="_blank" rel="noopener">';
          html += '<span class="fp-source-title">' + title + '</span>';
          html += '<span class="fp-source-badge">External</span>';
          html += '</a>';
          if (note) html += '<span class="fp-source-note">' + note + '</span>';
        } else {
          html += '<span class="fp-source-title">' + title + '</span>';
          if (note) html += '<span class="fp-source-note">' + note + '</span>';
          html += '<span class="fp-source-pending">Text forthcoming</span>';
        }
        html += '</li>';
      });
      html += '</ul></section>';
    }

    main.innerHTML = html;

    // ---- Side nav ----
    let navHtml = '';
    const overviewItems = [];
    if (figure.centralQuestion && window.CENTRAL_ANSWERS && window.CENTRAL_ANSWERS[figure.id]) {
      overviewItems.push({ href: 'central-answer.html?id=' + encodeURIComponent(figure.id), label: 'Central Answer' });
    }
    if (figure.bio && figure.bio.length) overviewItems.push({ href: '#overview', label: 'Biography' });
    if (figure.intellectualPortrait && figure.intellectualPortrait.paragraphs && figure.intellectualPortrait.paragraphs.length) {
      overviewItems.push({ href: '#portrait', label: 'Intellectual Portrait' });
    }
    if (figure.concepts && figure.concepts.length) overviewItems.push({ href: '#concepts', label: 'Key Concepts' });
    navHtml += navGroup('Overview', overviewItems);
    if (opinions.length) {
      navHtml += navGroup('Opinions', opinions.map(function (op) {
        return {
          href: 'opinion.html?id=' + encodeURIComponent(figure.id) + '&topic=' + encodeURIComponent(op.id),
          label: op.title
        };
      }));
    }
    navHtml += navGroup('Connections', [
      figure.influences && figure.influences.length ? { href: '#influences', label: 'Influences' } : null,
      figure.influenced && figure.influenced.length ? { href: '#influenced', label: 'People Influenced' } : null,
      figure.opponents && figure.opponents.length ? { href: '#opponents', label: 'Major Opponents' } : null,
      figure.controversies && figure.controversies.length ? { href: '#controversies', label: 'Controversies' } : null
    ].filter(Boolean));
    if (figure.primarySources && figure.primarySources.length) {
      navHtml += navGroup('Reference', [{ href: '#sources', label: 'Primary Sources' }]);
    }
    nav.innerHTML = navHtml;

    // Scroll + focus behavior for a foregrounded topic
    if (matchedOpinion) {
      raf(function () {
        const el = document.getElementById('on-' + matchedOpinion.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) raf(function () { target.scrollIntoView({ block: 'start' }); });
    }

    setupScrollSpy();
  }

  function navGroup(label, items) {
    if (!items || !items.length) return '';
    const labelHtml = label ? '<p class="fp-nav-label">' + escapeHtml(label) + '</p>' : '';
    return '<div class="fp-nav-group">' + labelHtml + '<ul class="fp-nav-list">' +
      items.map(function (i) { return '<li><a href="' + i.href + '">' + escapeHtml(i.label) + '</a></li>'; }).join('') +
      '</ul></div>';
  }

  function topicLabel(key) {
    // Human-friendly label for the context banner when we don't have the
    // originating page's own label for the concept — derive from the key.
    return key.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function setupScrollSpy() {
    const links = Array.prototype.slice.call(document.querySelectorAll('.fp-nav-list a'));
    const sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length) return;

    function onScroll() {
      let activeId = sections[0].id;
      sections.forEach(function (sec) {
        if (sec.getBoundingClientRect().top - 120 <= 0) activeId = sec.id;
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + activeId);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function renderNotFound(id) {
    const main = document.getElementById('fp-main');
    const nav = document.getElementById('fp-nav');
    nav.innerHTML = '';
    document.title = 'Figure not found — Melius Illuminare';
    main.innerHTML =
      '<div class="fp-not-found">' +
      '<h1>No profile found for “' + escapeHtml(id || '') + '”</h1>' +
      '<p>This figure may not yet be populated in the profile architecture. ' +
      '<a href="../figures.html">Browse all figures →</a></p>' +
      '</div>';
  }

  function init() {
    const id = qs('id');
    const topic = qs('topic');
    const figure = id ? DATA[id] : null;
    if (!figure) {
      renderNotFound(id);
      return;
    }
    render(figure, topic);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
