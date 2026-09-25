/**
 * The Theological Tree — Data Model
 * ----------------------------------------------------------------------------
 * A structured, expandable model of the historical development, relationships,
 * disagreements, and controversies of Christian theological thought.
 *
 * Designed to scale to hundreds of entities. This first seed centres on the
 * concept of GRACE as a proof-of-concept of the architecture.
 *
 * ── Entity types ──────────────────────────────────────────────────────────
 *   concept   A theological idea or doctrine (e.g. Grace). Central, prominent.
 *   figure    A historical person. Portrait / name-based node.
 *   tradition A broad Christian tradition / branch-level node.
 *   movement  A theological or ecclesial movement.
 *   event     A historical controversy, council, or junction.
 *
 * ── Two layers of connection ─────────────────────────────────────────────
 *   1. `branches`  — the curated VISUAL TREE. Clean parent→child structural
 *      links that form the default genealogy. These are the lines you see by
 *      default. They carry no permanent labels. Some coincide with a real
 *      relationship edge (and so carry a `type` for the hover tooltip); others
 *      are pure display links (historical/structural layout) with no typed
 *      theological claim, marked `display: true`.
 *   2. `edges`     — the typed THEOLOGICAL RELATIONSHIPS (directed, read as
 *      "source [type] target"). These are NOT drawn by default. They appear as
 *      overlays only through interaction: hovering/clicking a node (focus), or
 *      toggling a relationship-category filter. This preserves every
 *      relationship while keeping the default map uncluttered.
 *
 * ── Detail levels ────────────────────────────────────────────────────────
 *   Each node has `level` (1–3):
 *     1 Overview   — major concepts, figures, traditions, controversies
 *     2 Development — additional theologians appear
 *     3 Detailed   — later controversies + secondary relationships
 *   The tree reveals progressively; it is never all visible at once.
 *
 * Historical summaries are deliberately cautious and provisional — they assert
 * the architecture, not settled scholarship. Source and refine later.
 */
const TREE_DATA = {
  meta: {
    title: "Theological Tree Categories",
    activeCategory: "grace",
    categories: ["grace", "justification"],
    note: "Doctrinal families are grouped into separate trees so each category can be studied on its own.",
  },

  relationshipTypes: {
    developed_from: { label: "Developed From", category: "lineage", group: "development" },
    continued_by: { label: "Continued By", category: "lineage", group: "development" },
    represented_at: { label: "Represented At", category: "lineage", group: "development" },
    drifted_from: { label: "Drifted From", category: "conflict", group: "opposition" },
    directly_opposed: { label: "Directly Opposed", category: "conflict", group: "opposition" },
    rejected: { label: "Rejected", category: "judgment", group: "opposition" },
    debated_during: { label: "Debated During", category: "conflict", group: "controversy" },
    condemned_during: { label: "Condemned During", category: "conflict", group: "controversy" },
    split_during: { label: "Split During", category: "conflict", group: "controversy" },
    influenced: { label: "Influenced", category: "lineage", group: "influence" },
    inspired_by: { label: "Inspired By", category: "lineage", group: "influence" },
    affirmed: { label: "Affirmed", category: "judgment", group: "influence" },
  },

  categories: {
    grace: {
      label: "Grace",
      summary: "The doctrine of God's free and transformative favor in salvation.",
      nodes: [
        { id: "grace", type: "concept", title: "Grace", subtitle: "Gratia", dates: "Foundational concept", tradition: "core", summary: "The free, unmerited favor of God that heals, transforms, and enables the moral life.", x: 600, y: 120, tier: 0, level: 1 },
        { id: "augustine", type: "figure", title: "St. Augustine of Hippo", dates: "354 – 430", tradition: "early", summary: "The bishop whose mature account of grace, sin, and the will shaped the Western theological imagination.", x: 380, y: 330, tier: 1, level: 1 },
        { id: "pelagius", type: "figure", title: "Pelagius", dates: "c. 354 – c. 418", tradition: "early", summary: "A teacher who insisted human beings retain moral capacity without the necessity of an inward, prior grace.", x: 820, y: 330, tier: 1, level: 1 },
        { id: "pelagian_controversy", type: "event", title: "Pelagian Controversy", dates: "c. 411 – 431", tradition: "early", summary: "The decisive early controversy over original sin, free will, and the necessity of grace.", x: 600, y: 560, tier: 2, level: 1 },
        { id: "catholic_tradition", type: "tradition", title: "Catholic Tradition", dates: "1st c. – present", tradition: "catholic", summary: "The Latin Church's sacramental and scholastic account of grace as both gift and participation.", x: 300, y: 830, tier: 3, level: 1 },
        { id: "orthodox_tradition", type: "tradition", title: "Eastern Orthodox Tradition", dates: "1st c. – present", tradition: "orthodox", summary: "The Eastern tradition's account of divine energies and theosis under the action of grace.", x: 600, y: 830, tier: 3, level: 1 },
        { id: "protestant_tradition", type: "tradition", title: "Protestant Tradition", dates: "16th c. – present", tradition: "protestant", summary: "The Reformation's renewed insistence upon sola gratia and the gift of righteous standing before God.", x: 900, y: 830, tier: 3, level: 1 },
        { id: "aquinas", type: "figure", title: "St. Thomas Aquinas", dates: "1225 – 1274", tradition: "catholic", summary: "He reframed grace in scholastic terms as nature perfected by divine gift and habit.", x: 300, y: 1090, tier: 4, level: 2 },
        { id: "luther", type: "figure", title: "Martin Luther", dates: "1483 – 1546", tradition: "protestant", summary: "He radicalized the Augustinian doctrine of grace as the unmerited righteousness of Christ received by faith.", x: 900, y: 1090, tier: 4, level: 2 },
        { id: "trent", type: "event", title: "Council of Trent", dates: "1545 – 1563", tradition: "catholic", summary: "The Catholic response that clarified grace, justification, and the ratio of faith, works, and justification.", x: 650, y: 980, tier: 4, level: 2 },
        { id: "de_auxiliis", type: "event", title: "De Auxiliis Controversy", dates: "1582 – 1607", tradition: "catholic", summary: "The later debate over the cooperation between grace and free choice.", x: 300, y: 1330, tier: 5, level: 3 },
      ],
      branches: [
        { parent: "grace", child: "augustine", type: "developed_from" },
        { parent: "grace", child: "pelagius", type: "drifted_from" },
        { parent: "augustine", child: "pelagian_controversy", type: "debated_during" },
        { parent: "pelagius", child: "pelagian_controversy", type: "condemned_during" },
        { parent: "pelagian_controversy", child: "catholic_tradition", type: "continued_by", display: true },
        { parent: "pelagian_controversy", child: "orthodox_tradition", type: "continued_by", display: true },
        { parent: "pelagian_controversy", child: "protestant_tradition", type: "continued_by", display: true },
        { parent: "catholic_tradition", child: "aquinas", type: "continued_by" },
        { parent: "protestant_tradition", child: "luther", type: "continued_by" },
        { parent: "catholic_tradition", child: "de_auxiliis", type: "split_during" },
        { parent: "aquinas", child: "de_auxiliis", type: "developed_from", display: true },
        { parent: "grace", child: "trent", type: "continued_by", display: true },
      ],
      edges: [
        { source: "augustine", target: "grace", type: "developed_from", prominence: "primary" },
        { source: "pelagius", target: "grace", type: "drifted_from", prominence: "primary" },
        { source: "augustine", target: "pelagius", type: "directly_opposed", prominence: "primary", c1: { x: 480, y: 270 }, c2: { x: 720, y: 270 } },
        { source: "augustine", target: "pelagian_controversy", type: "debated_during", prominence: "primary", c1: { x: 430, y: 440 }, c2: { x: 520, y: 440 } },
        { source: "pelagius", target: "pelagian_controversy", type: "condemned_during", prominence: "primary", c1: { x: 770, y: 440 }, c2: { x: 680, y: 440 } },
        { source: "catholic_tradition", target: "aquinas", type: "continued_by", prominence: "primary" },
        { source: "protestant_tradition", target: "luther", type: "continued_by", prominence: "primary" },
        { source: "de_auxiliis", target: "aquinas", type: "developed_from", prominence: "primary" },
        { source: "catholic_tradition", target: "de_auxiliis", type: "split_during", prominence: "primary", c1: { x: 180, y: 980 }, c2: { x: 180, y: 1230 } },
        { source: "luther", target: "grace", type: "developed_from", prominence: "secondary" },
        { source: "grace", target: "catholic_tradition", type: "continued_by", prominence: "secondary", c1: { x: 150, y: 430 }, c2: { x: 150, y: 720 } },
        { source: "grace", target: "protestant_tradition", type: "continued_by", prominence: "secondary", c1: { x: 1050, y: 430 }, c2: { x: 1050, y: 720 } },
      ],
    },

    justification: {
      label: "Justification",
      summary: "The doctrine of how God declares the sinner righteous in Christ.",
      nodes: [
        { id: "justification", type: "concept", title: "Justification", subtitle: "Declaring righteous", dates: "Patristic to Reformation", tradition: "core", summary: "The doctrine by which God, in Christ, declares the sinner righteous and acts to make that declaration effective by grace.", x: 600, y: 100, tier: 0, level: 1 },
        { id: "paul", type: "figure", title: "St Paul", dates: "1st century", tradition: "early", summary: "The apostolic source whose letters, especially Romans and Galatians, form the scriptural center of the doctrine.", x: 600, y: 320, tier: 1, level: 1 },
        { id: "augustine", type: "figure", title: "St St. Augustine of Hippo", dates: "354 – 430", tradition: "early", summary: "He grounded justification in the gift of grace and the divine initiative in the heart of the sinner.", x: 600, y: 540, tier: 2, level: 1 },
        { id: "aquinas", type: "figure", title: "St St. Thomas Aquinas", dates: "1225 – 1274", tradition: "catholic", summary: "He placed justification within a sacramental and habitual account of grace and sanctifying transformation.", x: 600, y: 760, tier: 3, level: 1 },
        { id: "cajetan", type: "figure", title: "Cardinal Cajetan", dates: "1469 – 1534", tradition: "catholic", summary: "A leading Thomist whose defense of Catholic teaching on justification brought the scholastic tradition into direct encounter with Luther.", x: 390, y: 980, tier: 4, level: 1 },
        { id: "luther", type: "figure", title: "Martin Luther", dates: "1483 – 1546", tradition: "protestant", summary: "He taught that the sinner is justified by faith alone, by the righteousness of Christ imputed to the believer.", x: 810, y: 980, tier: 4, level: 1 },
        { id: "trent", type: "event", title: "Council of Trent", dates: "1545 – 1563", tradition: "catholic", summary: "The Catholic council clarified the relation between faith, grace, works, and the process of justification in response to the Reformation.", x: 600, y: 1200, tier: 5, level: 1 },
        { id: "catholic_tradition", type: "tradition", title: "Catholic Tradition", dates: "1st c. – present", tradition: "catholic", summary: "The Catholic account of justification as grace that forgives, renews, and makes righteous through faith working in charity.", x: 350, y: 1430, tier: 6, level: 1 },
        { id: "protestant_tradition", type: "tradition", title: "Protestant Tradition", dates: "16th c. – present", tradition: "protestant", summary: "The Reformation account of justification by grace through faith, centered on the imputed righteousness of Christ.", x: 850, y: 1430, tier: 6, level: 1 },
      ],
      branches: [
        { parent: "justification", child: "paul", type: "developed_from" },
        { parent: "paul", child: "augustine", type: "developed_from" },
        { parent: "augustine", child: "aquinas", type: "continued_by" },
        { parent: "aquinas", child: "cajetan", type: "continued_by" },
        { parent: "aquinas", child: "luther", type: "drifted_from" },
        { parent: "trent", child: "catholic_tradition", type: "continued_by" },
        { parent: "trent", child: "protestant_tradition", type: "drifted_from" },
      ],
      edges: [
        { source: "justification", target: "paul", type: "developed_from", prominence: "primary" },
        { source: "paul", target: "augustine", type: "developed_from", prominence: "primary" },
        { source: "augustine", target: "aquinas", type: "continued_by", prominence: "primary" },
        { source: "aquinas", target: "cajetan", type: "continued_by", prominence: "primary" },
        { source: "aquinas", target: "luther", type: "drifted_from", prominence: "primary", c1: { x: 680, y: 860 }, c2: { x: 810, y: 860 } },
        { source: "cajetan", target: "trent", type: "represented_at", prominence: "primary", c1: { x: 390, y: 1080 }, c2: { x: 500, y: 1130 } },
        { source: "luther", target: "trent", type: "debated_during", prominence: "primary", c1: { x: 810, y: 1080 }, c2: { x: 700, y: 1130 } },
        { source: "trent", target: "catholic_tradition", type: "continued_by", prominence: "primary", c1: { x: 550, y: 1280 }, c2: { x: 410, y: 1360 } },
        { source: "trent", target: "protestant_tradition", type: "drifted_from", prominence: "primary", c1: { x: 650, y: 1280 }, c2: { x: 790, y: 1360 } },
        { source: "cajetan", target: "catholic_tradition", type: "continued_by", prominence: "primary", c1: { x: 260, y: 1110 }, c2: { x: 220, y: 1320 } },
        { source: "luther", target: "protestant_tradition", type: "continued_by", prominence: "primary", c1: { x: 940, y: 1110 }, c2: { x: 980, y: 1320 } },
      ],
    },
  },
};

const defaultCategory = TREE_DATA.categories[TREE_DATA.meta.activeCategory] || Object.values(TREE_DATA.categories)[0];
TREE_DATA.nodes = defaultCategory.nodes;
TREE_DATA.branches = defaultCategory.branches;
TREE_DATA.edges = defaultCategory.edges;

if (typeof module !== "undefined" && module.exports) {
  module.exports = TREE_DATA;
}
