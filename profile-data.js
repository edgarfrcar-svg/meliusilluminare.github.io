/**
 * PROFILE_DATA — the single source of truth for the "full profile" page
 * (figures/profile.html?id=<key>). This is the scalable architecture asked
 * for in Step 1: every figure is one entry in this object, rendered by the
 * shared engine in js/profile.js. Add a new theologian by adding a new key
 * here — no new HTML/CSS/JS files are required.
 *
 * SCHEMA (all fields optional except id/name — the renderer skips any
 * section whose data is missing, so partial entries degrade gracefully):
 *
 * {
 *   id: string,                 // must match the key this object is stored under
 *   name: string,
 *   centralQuestion: string,  // signature theological question under the name
 *   centralQuestionLabel: string, // e.g. "His Central Question"
 *   portrait: string,           // image URL (public-domain source)
 *   dates: string,
 *   tradition: 'early'|'catholic'|'orthodox'|'protestant',   // keys into TRADITION_COLORS
 *   period: string,             // historical period, e.g. "Patristic Era / Late Antiquity"
 *   roles: string[],            // e.g. ["Bishop of Hippo", "Doctor of the Church"]
 *   epithet: string,
 *   bio: string[],              // short biography, one paragraph per array item —
 *                               // kept intentionally secondary; see intellectualPortrait
 *   intellectualPortrait: {     // THE PRIMARY READING SECTION — rendered first, before bio.
 *     question: string,         // e.g. "What was Augustine trying to understand?"
 *     arc: string[],            // the chain of concepts his thought moves through,
 *                               // e.g. ['Desire','Evil','Truth','Conversion','Grace','Will','Church','Charity']
 *     paragraphs: [{ label: string, text: string }]  // one entry per arc step —
 *                               // label must match (or closely track) an item in arc[]
 *   },
 *   concepts: string[],         // major theological concepts (tag list)
 *   opinions: [{
 *     id: string,               // used as the URL topic key (?topic=id) and anchor (#on-id)
 *     title: string,            // e.g. "On Grace"
 *     thesis: string,           // one-line summary of the position
 *     paragraphs: string[],     // full position: prefer verbatim public-domain quotation with citation;
 *                               // connective tissue kept minimal and clearly secondary to the sources
 *     tags: string[],           // optional short labels, e.g. ["Anti-Pelagian", "Mature period"]
 *     contrasts: [{ figureId, topicKey, label }]   // links to other figures' opinions on the same question
 *   }],
 *   influences:  [{ name, figureId?, note? }],   // figureId links into PROFILE_DATA when present
 *   influenced:  [{ name, figureId?, note? }],
 *   opponents:   [{ name, figureId?, note? }],
 *   controversies: [{ name, summary }],
 *   primarySources: [{ title, url?, note? }]
 * }
 */
// Same tradition color tokens used across the site (figures.js, main.js).
// Duplicated here (rather than imported) so figures/profile.html has no
// dependency on the figure-directory scripts — it only needs this file
// and profile.js to run standalone.
window.TRADITION_COLORS = window.TRADITION_COLORS || {
  early:      { name: 'Early Church (pre-1054)', color: '#a97142', glow: '#e6b988' },
  catholic:   { name: 'Catholic',                 color: '#c9a227', glow: '#ffd98e' },
  orthodox:   { name: 'Eastern Orthodox',         color: '#6b3a76', glow: '#c79bd6' },
  protestant: { name: 'Protestant',               color: '#3a6ea5', glow: '#9ecbff' }};

window.PROFILE_VISUAL_PRESETS = window.PROFILE_VISUAL_PRESETS || {
  augustine: {
    preset: 'augustine',
    palette: {
      hero: 'radial-gradient(ellipse 70% 55% at 75% 40%, rgba(255,190,100,0.18), transparent 50%), radial-gradient(circle at 30% 20%, rgba(255,210,140,0.12), transparent 40%), linear-gradient(165deg, #1a140e 0%, #0e0b0a 55%, #0a0908 100%)',
      surfaceTop: '#17120d',
      surfaceBottom: '#0d0b10',
      panel: '#161310',
      accent: '#d7a75e',
      accentSoft: 'rgba(215,167,94,0.18)',
      glow: 'rgba(255,217,142,0.22)',
      border: 'rgba(231,201,164,0.18)',
      heroInk: '#f8ecdc'
    },
    motif: 'candlelit-arch',
    texture: 'manuscript-grain',
    motion: 'slow-breath',
    typography: 'meditative'
  },
  scholastic: {
    preset: 'scholastic',
    palette: {
      hero: 'radial-gradient(ellipse 65% 50% at 72% 38%, rgba(200,175,120,0.14), transparent 50%), linear-gradient(165deg, #121820 0%, #0b0e12 55%, #080a0c 100%)',
      surfaceTop: '#11171d',
      surfaceBottom: '#0a0d12',
      panel: '#121920',
      accent: '#d2b26a',
      accentSoft: 'rgba(210,178,106,0.15)',
      glow: 'rgba(210,178,106,0.16)',
      border: 'rgba(214,210,193,0.14)',
      heroInk: '#f0ead6'
    },
    motif: 'cathedral-stone',
    texture: 'masonry',
    motion: 'measured-light',
    typography: 'ordered'
  },
  byzantine: {
    preset: 'byzantine',
    palette: {
      hero: 'radial-gradient(circle at 50% 14%, rgba(212,168,70,0.18), transparent 30%), linear-gradient(180deg, rgba(20,11,16,0.97), rgba(7,7,9,0.98))',
      surfaceTop: '#120d13',
      surfaceBottom: '#090a0e',
      panel: '#181115',
      accent: '#d4b66d',
      accentSoft: 'rgba(212,182,109,0.16)',
      glow: 'rgba(212,182,109,0.18)',
      border: 'rgba(236,204,117,0.16)',
      heroInk: '#f4ebd5'
    },
    motif: 'icon-frame',
    texture: 'gold-veil',
    motion: 'sacred-glow',
    typography: 'liturgical'
  },
  reformation: {
    preset: 'reformation',
    palette: {
      hero: 'radial-gradient(ellipse 65% 50% at 72% 38%, rgba(140,165,200,0.14), transparent 50%), linear-gradient(165deg, #12161e 0%, #0a0c10 55%, #07080b 100%)',
      surfaceTop: '#121822',
      surfaceBottom: '#0a0d12',
      panel: '#121a22',
      accent: '#9bb3d0',
      accentSoft: 'rgba(155,179,208,0.12)',
      glow: 'rgba(155,179,208,0.14)',
      border: 'rgba(179,196,216,0.16)',
      heroInk: '#edf4ff'
    },
    motif: 'woodcut-grid',
    texture: 'printed-paper',
    motion: 'press-breath',
    typography: 'polemic'
  }
};

window.PROFILE_DATA = {
  "augustine": {
    "id": "augustine",
    "name": "St. Augustine of Hippo",
    "centralQuestion": "How can the restless human will find its true end in God?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Antonio%20Rodr%C3%ADguez%20-%20Saint%20Augustine%20-%20Google%20Art%20Project.jpg",
    "dates": "354–430",
    "tradition": "early",
    "period": "Patristic Era / Late Antiquity",
    "roles": [
      "Bishop of Hippo",
      "Doctor of the Church",
      "Doctor of Grace"
    ],
    "epithet": "Bishop of Hippo, whose account of grace, sin, and the will shaped nearly all subsequent Western theology.",
    "intellectualPortrait": {
      "question": "What was Augustine trying to understand?",
      "arc": [
        "Desire",
        "Evil",
        "Truth",
        "Conversion",
        "Grace",
        "Will",
        "Church",
        "Charity"
      ],
      "paragraphs": [
        {
          "label": "Desire",
          "text": "“Thou madest us for Thyself, and our heart is restless, until it repose in Thee” (Confessions I.1; Pusey). Desire is not accidental to the creature; it is the mark of a nature ordered beyond itself. “I was not yet in love, yet I loved to love… I sought what I might love, in love with loving” (Confessions III.1; Pusey). The problem is not that the will loves, but that it stops at finite goods as if they were the end."
        },
        {
          "label": "Evil",
          "text": "Against Manichaean dualism Augustine learned to deny that evil is a substance: “Evil, then, the origin of which I had been seeking, has no substance at all; for if it were a substance, it would be good. … Whatsoever is, is good. Evil… has no substance at all” (Confessions VII; Outler/Pusey tradition). In the Enchiridion he states the same rule: what is called evil is the privation of good—as sickness is the privation of health, and when health is restored the evil does not “go elsewhere” but ceases to be. Evil is thus parasitic on a good nature that God made; the defect is in the will’s turning, not in a rival eternal principle."
        },
        {
          "label": "Truth",
          "text": "The Platonist books at Milan, on his own account, taught him to seek a non-corporeal truth: God and the soul as real without being bodies. “And being thence admonished to return to myself, I entered even into my inward self, Thou being my Guide… and I entered and beheld with the eye of my soul… the Light Unchangeable” (Confessions VII; Pusey). Yet the books did not give him Christ the Mediator; for that he needed the Church’s preaching and the Apostle."
        },
        {
          "label": "Conversion",
          "text": "Conversion is narrated as the healing of a divided will. “The enemy held my will; and of it he made a chain and bound me. … For of a froward will, was a lust made; and a lust served, became custom; and custom not resisted, became necessity” (Confessions VIII; Pusey). The garden and the “Tolle lege” are not a technique but the moment when grace made continence desirable rather than merely commanded: “all the darkness of doubt vanished away.”"
        },
        {
          "label": "Grace",
          "text": "In On the Spirit and the Letter Augustine states the relation of law and gift in a line that became classic: “The law was therefore given, in order that grace might be sought; grace was given, in order that the law might be fulfilled. Now it was not through any fault of its own that the law was not fulfilled, but by the fault of the carnal mind; and this fault was to be demonstrated by the law, and healed by grace” (De spiritu et littera 19; NPNF). Grace is not a wage for prior willing; it is the gift that makes right willing possible."
        },
        {
          "label": "Will",
          "text": "“The will is that by which we sin and by which we live well.” Freedom remains; the use of freedom after the Fall is wounded. In the Confessions the chain of a “froward will” becomes custom and necessity—not the abolition of voluntary acts, but bondage in the order of love. Grace liberates the will so that it truly wills the good; it does not replace the will with a mechanical impulse."
        },
        {
          "label": "Church",
          "text": "Against the Donatists Augustine insisted that the Church in history is a mixed body—wheat and tares together until the harvest— and that the validity of the sacraments does not stand or fall with the personal holiness of the minister. Christ remains the true agent of baptism; schism in the name of a pure remnant misunderstands where the Church’s holiness resides."
        },
        {
          "label": "Charity",
          "text": "Charity is the form of the will’s true end: love of God for his own sake and of neighbor in God. “Thou hast made us for Thyself” is not only an explanation of restlessness; it is the measure of ordered love. Finite goods are to be used toward that end, not enjoyed as if they were the end (De doctrina christiana I, on uti and frui). The restless heart rests not by the extinction of desire but by its right ordering in charity."
        }
      ]
    },
    "visual": {
      "preset": "augustine",
      "mood": "Late Roman North Africa, interior reflection, and candlelit intellectual solitude.",
      "motif": "Candlelit arches, manuscript grain, and warm twilight.",
      "texture": "manuscript-grain",
      "motion": "slow-breath",
      "typography": "meditative"
    },
    "bio": [
      "Augustine was born at Thagaste on 13 November 354. Of his infancy and dependence he later wrote, addressing God: “Thus there received me the comforts of woman’s milk. For neither my mother nor my nurses stored their own breasts for me; but Thou didst bestow the food of my infancy through them… For from Thee, O God, are all good things, and from my God is all my health” (Confessions I; Pusey). His mother Monica was a Christian; his father Patricius was still a pagan in Augustine’s boyhood.",
      "Of the restlessness that structures the Confessions he says at the outset: “Thou awakest us to delight in Thy praise; for Thou madest us for Thyself, and our heart is restless, until it repose in Thee” (Confessions I.1; Pusey). The same book records the moral and intellectual crisis at Milan and the garden scene that preceded his baptism by Ambrose at Easter 387: the voice as of a child chanting “Tolle lege, tolle lege”—“Take up and read”—and the opening of the Apostle: “Not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying; but put ye on the Lord Jesus Christ, and make not provision for the flesh, in concupiscence.” “No further would I read; nor needed I: for instantly at the end of this sentence, by a light as it were of serenity infused into my heart, all the darkness of doubt vanished away” (Confessions VIII; Pusey).",
      "Ordained at Hippo against his inclination and made bishop about 395–396, he spent the remaining decades in three long controversies—Manichaean dualism, Donatist schism, and the Pelagian dispute on grace—until his death on 28 August 430 during the Vandal siege of Hippo. The doctrinal positions that follow are given, as far as possible, in his own published words rather than in paraphrase."
    ],
    "concepts": [
      "Grace",
      "Original Sin",
      "Free Will",
      "Predestination",
      "The Trinity",
      "The Two Cities",
      "Just War",
      "Time and Eternity",
      "The Problem of Evil",
      "Ecclesiology"
    ],
    "opinions": [
      {
        "id": "grace",
        "title": "On Grace",
        "thesis": "Grace is not a reward for effort but the unmerited gift that makes any good effort possible in the fallen will.",
        "tags": [
          "Anti-Pelagian",
          "Mature period"
        ],
        "paragraphs": [
          "Augustine’s own formula in On the Spirit and the Letter is the center of the position: “The law was therefore given, in order that grace might be sought; grace was given, in order that the law might be fulfilled. Now it was not through any fault of its own that the law was not fulfilled, but by the fault of the carnal mind; and this fault was to be demonstrated by the law, and healed by grace” (De spiritu et littera 19; NPNF trans.). The letter without the Spirit “killeth”; the Spirit gives what the law demands.",
          "He insists that this is not coercion of a weaker will by a stronger force. The appeal of grace is the gift of delight in the good: the will is drawn so that it freely wills what it could not effectively will from its own resources. “Not that we are sufficient of ourselves, to account anything as from ourselves; but our sufficiency is of God” (2 Corinthians 3:5, as deployed in the same treatise).",
          "By the replies to Simplicianus (397) and the later anti-Pelagian works, even the beginning of faith is already gift. “What hast thou that thou didst not receive?” remains the question that excludes boasting. Perseverance, likewise, is gift—not a human completion of a divine down-payment."
        ],
        "contrasts": [
          {
            "figureId": "pelagius",
            "topicKey": "grace",
            "label": "Pelagius on grace"
          },
          {
            "figureId": "aquinas",
            "topicKey": "grace",
            "label": "Aquinas on grace"
          }]
      },
      {
        "id": "free-will",
        "title": "On Free Will",
        "thesis": "The will remains formally free even after the Fall, but it is enslaved in practice to disordered love until grace liberates it.",
        "tags": [
          "Anti-Manichaean",
          "Anti-Pelagian"
        ],
        "paragraphs": [
          "Against the Manichees Augustine defended the will as the seat of moral responsibility: evil is not a substance forced upon us from outside, but a defective movement of a will that turns from higher to lower goods. “The will is that by which we sin and by which we live well.”",
          "Against Pelagius he refused to treat that formal freedom as effective power to will the highest good without grace. In the Confessions the psychology is stated without technical terms: “The enemy held my will; and of it he made a chain and bound me. … Of a froward will was a lust made; and a lust served, became custom; and custom not resisted, became necessity” (Confessions VIII; Pusey).",
          "Grace does not erase the will’s act; it heals the will’s love so that the act is truly ordered to God. Formal freedom (choice) and effective freedom for the supernatural good must be distinguished, or either responsibility or the need for Christ is lost."
        ],
        "contrasts": [
          {
            "figureId": "pelagius",
            "topicKey": "free-will",
            "label": "Pelagius on free will"
          }]
      },
      {
        "id": "original-sin",
        "title": "On Original Sin",
        "thesis": "All humanity inherits, through Adam, both the guilt and the corrupted condition of the first sin.",
        "tags": [
          "Anti-Pelagian"
        ],
        "paragraphs": [
          "Augustine reads Romans 5 as establishing a solidarity in Adam that is more than imitation: “By one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned.” Infant baptism is, for him, a decisive witness of the Church’s sense that newborns need the Savior not only as example but as redeemer from a inherited condition.",
          "The transmission is bound up with the unity of the race and with generation, not with a dualist theory of evil matter. Creation remains good; what is inherited is a wound in a good nature—mortality, ignorance, disordered desire—and, in his mature account, a guilt that makes rebirth necessary.",
          "Christ as the new Adam is the sole remedy: incorporation into his body reverses the solidarity of the fall by a better solidarity of grace."
        ],
        "contrasts": [
          {
            "figureId": "pelagius",
            "topicKey": "original-sin",
            "label": "Pelagius on original sin"
          }
        ]
      },
      {
        "id": "trinity",
        "title": "On the Trinity",
        "thesis": "The Trinity is confessed as one God in three persons; the mind’s inner life offers analogies that help speech without capturing the reality.",
        "tags": [
          "De Trinitate"
        ],
        "paragraphs": [
          "Augustine begins from the baptismal name and the rule of faith: Father, Son, and Holy Spirit—one God, not three gods; three persons, not one person under three masks. “We are speaking of God; so why wonder if you do not comprehend? For if you comprehend, it is not God” (Sermon 117).",
          "The psychological analogies—memory, understanding, will; lover, beloved, love—are exercises of a mind made in the image of God, seeking vestiges of triune life within itself. They are not proofs that bind God to the structure of the mind; they are corrected as soon as they are offered.",
          "The goal of De Trinitate is not cleverness but purified charity and humility before a mystery revealed in the economy of salvation."
        ],
        "contrasts": [
          {
            "figureId": "gregory-nazianzen",
            "topicKey": "trinity",
            "label": "Gregory Nazianzen on the Trinity"
          },
          {
            "figureId": "aquinas",
            "topicKey": "gods-existence",
            "label": "Aquinas on naming God"
          }
        ]
      },
      {
        "id": "evil",
        "title": "On Evil",
        "thesis": "Evil has no independent existence; it is a privation—a corruption or absence of a good that ought to be present.",
        "tags": [
          "Anti-Manichaean"
        ],
        "paragraphs": [
          "“Evil, then, the origin of which I had been seeking, has no substance at all; for if it were a substance, it would be good. … Whatsoever is, is good” (Confessions VII). The Manichaean second principle is refused: there is no eternal evil nature coeval with God.",
          "“What, after all, is anything we call evil except the privation of good? In animal bodies, for instance, sickness and wounds are nothing but the privation of health. When a cure is effected, the evils which were present … do not retreat and go elsewhere. Rather, they simply do not exist any more” (Enchiridion; cf. Confessions VII).",
          "The real in a sinful act is the will and energy of a creature; the evil is the disordered mode of that act. God is not the author of a positive “evil thing,” because there is no such thing—only a good nature wounded by a defective turning."
        ],
        "contrasts": [
          {
            "figureId": "aquinas",
            "topicKey": "gods-existence",
            "label": "Aquinas on evil as privation"
          }
        ]
      },
      {
        "id": "church",
        "title": "On the Church",
        "thesis": "The Church is a mixed body of wheat and tares in this life, and its sacraments are valid regardless of the personal holiness of the minister.",
        "tags": [
          "Anti-Donatist"
        ],
        "paragraphs": [
          "The Donatist claim that traditor clergy could never again validly baptize, and that the true Church must be a visibly pure remnant, is refused from the parable of the wheat and tares and from the unity of baptism in Christ. “Many who seem to be within are without, and many who seem to be without are within.”",
          "Sacramental validity does not depend on the minister’s hidden holiness in the way the Donatists required. Christ is the true agent; the minister is a servant. This protects the faithful from anxiety about secret sins in the clergy and blocks the fragmentation of the Church into rival pure bodies.",
          "Augustine still exhorts holiness and disciplines scandal. The mixed-body doctrine is not laxity; it is a refusal to relocate the Church’s foundation from Christ to the performance of the saints."
        ],
        "contrasts": [
          {
            "figureId": "cyprian",
            "topicKey": "church",
            "label": "Cyprian on the unity of the Church"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Paul the Apostle",
        "note": "Especially Romans and Galatians, the scriptural anchor of his mature theology of grace."
      },
      {
        "name": "St. Ambrose of Milan",
        "note": "Bishop whose preaching and allegorical exegesis opened Augustine to intellectually serious Christianity."
      },
      {
        "name": "Plotinus and the Neoplatonists",
        "note": "Supplied the philosophical vocabulary for his account of evil, the soul, and the ascent to God."
      },
      {
        "name": "Cicero",
        "note": "Augustine's reading of the (now lost) Hortensius as a young man kindled his love of philosophy."
      },
      {
        "name": "Monica, his mother",
        "note": "Her persistence and prayer are presented in the Confessions as instrumental to his conversion."
      }
    ],
    "influenced": [
      {
        "name": "St. Thomas Aquinas",
        "figureId": "aquinas",
        "note": "Cites Augustine more than any other authority besides Scripture and Aristotle."
      },
      {
        "name": "Martin Luther",
        "note": "An Augustinian friar whose reading of Augustine on grace and the will shaped the Reformation break with late medieval theology."
      },
      {
        "name": "John Calvin",
        "note": "Regarded Augustine as the Church Father closest to his own doctrine of predestination."
      },
      {
        "name": "Cornelius Jansen and the Jansenists",
        "note": "A 17th-century movement claiming to recover Augustine's strict doctrine of grace against perceived Jesuit laxity."
      },
      {
        "name": "Medieval Scholasticism generally",
        "note": "His authority on grace, sin, and the Trinity was second only to Scripture for most of the Latin Middle Ages."
      }
    ],
    "opponents": [
      {
        "name": "Pelagius",
        "figureId": "pelagius",
        "note": "British ascetic teacher whose emphasis on human capacity Augustine spent his final two decades opposing."
      },
      {
        "name": "The Donatists",
        "note": "North African rigorists against whom Augustine developed his ecclesiology and sacramental theology."
      },
      {
        "name": "The Manichaeans",
        "note": "Dualist sect Augustine belonged to for nine years before his conversion, later refuted at length."
      },
      {
        "name": "Julian of Eclanum",
        "note": "A Pelagian bishop who mounted the sharpest theological counter-attack on Augustine's doctrine of original sin."
      }
    ],
    "controversies": [
      {
        "name": "The Pelagian Controversy",
        "summary": "A decades-long dispute (c. 411–430) over grace, free will, and original sin, ending in the condemnation of Pelagianism at the Council of Carthage (418) and the Council of Ephesus (431)."
      },
      {
        "name": "The Donatist Controversy",
        "summary": "A North African schism over the validity of sacraments administered by clergy who had lapsed under Roman persecution; Augustine defended the unity of the Church and objective validity of the sacraments."
      },
      {
        "name": "The Manichaean Period and Refutation",
        "summary": "Augustine's own decade within Manichaeism, followed by extensive written refutations after his conversion."
      }
    ],
    "primarySources": [
      {
        "title": "Confessions",
        "workKey": "augustine-confessions",
        "note": "Hosted · 13 books in TOC"
      },
      {
        "title": "The City of God",
        "workKey": "augustine-city-of-god",
        "note": "Hosted · multi-book TOC"
      },
      {
        "title": "On the Trinity",
        "workKey": "augustine-trinity",
        "note": "Hosted"
      },
      {
        "title": "Anti-Pelagian Writings",
        "workKey": "augustine-anti-pelagian",
        "note": "Expanded Grace and Free Will"
      },
      {
        "title": "Enchiridion",
        "workKey": "augustine-enchiridion",
        "note": "Hosted"
      },
      {
        "title": "On Christian Doctrine",
        "workKey": "augustine-doctrine",
        "note": "Hosted"
      }
    ]
  },
  "pelagius": {
    "id": "pelagius",
    "name": "Pelagius",
    "centralQuestion": "Can the human will, by its own freedom, choose the good without the prior gift of grace?",
    "centralQuestionLabel": "His Central Question",
    "portrait": null,
    "dates": "c. 354–c. 418",
    "tradition": "early",
    "period": "Patristic Era / Late Antiquity",
    "roles": [
      "Ascetic teacher",
      "Biblical commentator"
    ],
    "epithet": "A British or Irish ascetic whose teaching on grace and human capacity was condemned as heresy after his confrontation with Augustine.",
    "bio": [
      "Pelagius (early fifth century) is known chiefly through the controversy with Augustine and through fragments and reports of his teaching. He is in the archive as the decisive opponent who forced the Western Church to clarify grace.",
      "His governing concern was moral earnestness: divine commands are not mocked; what God commands is possible. Augustine answered that the law shows what ought to be done, not what fallen nature can do from itself.",
      "The Synod of Carthage and later reception rejected Pelagian denials of the necessity of interior grace for every truly good act ordered to salvation, and of original sin as Augustine taught it. Primary fragments are sparse; the position is reconstructed carefully from the dispute."
    ],
    "concepts": [
      "Human Capacity",
      "Free Will",
      "Asceticism",
      "Moral Responsibility",
      "Law and Grace",
      "Christian Perfection"
    ],
    "opinions": [
      {
        "id": "grace",
        "title": "On Grace",
        "thesis": "Grace assists; the will retains native power to choose the good commanded by God.",
        "tags": [
          "Opponent of Augustine"
        ],
        "paragraphs": [
          "Pelagius treated divine commands as evidence that ability is present. Exhortation presupposes power. Grace includes law, teaching, and the example of Christ.",
          "Augustine’s counter-text remains the measure of the dispute: “The law was therefore given, in order that grace might be sought; grace was given, in order that the law might be fulfilled” (De spiritu et littera 19).",
          "Why is Pelagius in the archive? Because the Church’s doctrine of grace was defined in conflict with this claim. The profile concentrates on that contribution to the controversy, not on a full rival system recovered from complete works."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "grace",
            "label": "Augustine on grace"
          }
        ]
      },
      {
        "id": "free-will",
        "title": "On Free Will",
        "thesis": "Created freedom retains the power to will either side; the Fall does not destroy that power.",
        "tags": [],
        "paragraphs": [
          "For Pelagius, a wounded will that cannot will the good would make command unjust. Responsibility requires ability.",
          "Augustine distinguished formal freedom from effective freedom for the supernatural good, locating inability in disordered love rather than in the absence of voluntary acts."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "free-will",
            "label": "Augustine on free will"
          }
        ]
      },
      {
        "id": "original-sin",
        "title": "On Original Sin",
        "thesis": "Adam’s sin harms by example more than by inherited guilt in newborns.",
        "tags": [],
        "paragraphs": [
          "Pelagius resisted the claim that infants inherit guilt requiring baptismal remission in Augustine’s sense. Death and social imitation explain the spread of sin.",
          "Augustine answered from Romans 5 and from the Church’s practice of infant baptism as witness to a condition needing the Savior from the beginning of life."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "original-sin",
            "label": "Augustine on original sin"
          }
        ]
      },
      {
        "id": "nature",
        "title": "On Nature and Ability",
        "thesis": "Nature remains competent for the moral law; grace is primarily external aid and illumination.",
        "tags": [],
        "paragraphs": [
          "The dispute turns on whether “nature” after Adam still possesses the effective power to love God above all without interior healing grace.",
          "The Church’s subsequent language of the necessity of grace for salutary acts is the rejection of that competence as Pelagius framed it."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "grace",
            "label": "Augustine"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Stoic moral philosophy",
        "note": "Its emphasis on the will's sovereignty over virtue shaped the intellectual climate of his ethics."
      },
      {
        "name": "Roman ascetic movements",
        "note": "The late-4th-century vogue for aristocratic Christian asceticism in Rome was both his context and his audience."
      },
      {
        "name": "Rufinus the Syrian",
        "note": "An Eastern theologian sometimes credited with transmitting ideas about unimpaired free will into Pelagius's circle."
      }
    ],
    "influenced": [
      {
        "name": "Caelestius",
        "note": "His most outspoken disciple, who pressed the logical conclusions of Pelagius's teaching (including on infant baptism) further and more provocatively than Pelagius himself."
      },
      {
        "name": "Julian of Eclanum",
        "figureId": null,
        "note": "Continued the theological defense of the condemned position after Pelagius's disappearance from the record."
      },
      {
        "name": "Later \"semi-Pelagian\" debates",
        "note": "Even after condemnation, questions about the relative roles of grace and will he raised recurred throughout the Middle Ages and Reformation."
      }
    ],
    "opponents": [
      {
        "name": "St. Augustine of Hippo",
        "figureId": "augustine",
        "note": "Augustine's mature theology of grace and original sin was worked out largely in written opposition to Pelagius and his followers."
      },
      {
        "name": "Jerome",
        "note": "Attacked Pelagius sharply in his Dialogue Against the Pelagians and supported his condemnation."
      },
      {
        "name": "Pope Zosimus (eventually)",
        "note": "Initially inclined to leniency, Zosimus reversed course under African pressure and confirmed the condemnation."
      }
    ],
    "controversies": [
      {
        "name": "The Pelagian Controversy",
        "summary": "Examined and provisionally acquitted at the Synod of Diospolis (415), Pelagius was ultimately condemned along with Caelestius by Pope Innocent I, Pope Zosimus, and the Council of Carthage (418), and again at the Council of Ephesus (431)."
      }
    ],
    "primarySources": [
      {
        "title": "Letter to Demetrias (selection)",
        "workKey": "pelagius-demetrias",
        "note": "Hosted · controversy context"
      },
      {
        "title": "On Nature (via Augustine’s rebuttal)",
        "note": "Fragmentary"
      }
    ]
  },
  "aquinas": {
    "id": "aquinas",
    "name": "St. Thomas Aquinas",
    "centralQuestion": "How can finite being participate in the infinite God without ceasing to be creature?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/aquinas.jpg",
    "dates": "1225–1274",
    "tradition": "catholic",
    "period": "High Scholasticism / High Middle Ages",
    "roles": [
      "St. Dominican friar",
      "Doctor of the Church",
      "Doctor Angelicus"
    ],
    "epithet": "Doctor Angelicus, whose synthesis of Aristotelian philosophy and Christian revelation shaped Catholic theology for centuries.",
    "visual": {
      "preset": "scholastic",
      "mood": "Medieval university, cathedral stone, and disciplined intellectual order.",
      "motif": "Cathedral geometry, scholastic structure, and luminous stonework.",
      "texture": "masonry",
      "motion": "measured-light",
      "typography": "ordered"
    },
    "bio": [
      "St. Thomas Aquinas was born at Roccasecca about 1225 and entered the Order of Preachers as a young man. His teacher Albert and the recovery of Aristotle shaped the project of the Summa Theologiae: to order sacred doctrine so that beginners might be instructed. He died in 1274 on the way to the Council of Lyons. The positions below are given, as far as possible, in the words of the Summa (St. Dominican Fathers translation, public domain).",
      "On the relation of grace and nature he states the axiom that governs his synthesis: “Grace does not destroy nature, but perfects it” (Summa Theologiae I, q.1, a.8 ad 2). On God’s existence he holds that it can be demonstrated from effects: “The existence of God can be demonstrated from those of His effects which are known to us” (ST I, q.2, a.2).",
      "On the Eucharist: “The presence of Christ’s true body and blood in this sacrament cannot be detected by sense, nor understanding, but by faith alone, which rests upon Divine authority” (ST III, q.75, a.1). The systematic entries that follow expand these claims from the same text."
    ],
    "concepts": [
      "Natural Law",
      "The Five Ways",
      "Analogy of Being",
      "Grace and Merit",
      "Transubstantiation",
      "Faith and Reason",
      "Virtue Ethics",
      "The Beatific Vision"
    ],
    "opinions": [
      {
        "id": "gods-existence",
        "title": "On God's Existence (The Five Ways)",
        "thesis": "God’s existence, while an article of faith, is also demonstrable by reason from observed features of the world.",
        "tags": [
          "Summa I q.2"
        ],
        "paragraphs": [
          "“The existence of God can be demonstrated from those of His effects which are known to us” (ST I, q.2, a.2). The Five Ways argue from motion, efficient causality, contingency, degrees of perfection, and finality.",
          "Each way terminates in a first that is not itself moved, caused, contingent, deficient, or unordered: “and this all understand to be God” (ST I, q.2, a.3). The arguments do not replace faith in the revealed God; they answer whether belief in God is an offense against reason.",
          "“Although the truth of the Christian faith surpasses the capacity of reason, nevertheless those things which are naturally implanted in reason cannot be contrary to this truth” (Summa contra Gentiles I, ch.7)."
        ],
        "contrasts": [
          {
            "figureId": "anselm",
            "topicKey": "incarnation",
            "label": "Anselm on reason and faith"
          }]
      },
      {
        "id": "grace",
        "title": "On Grace and Free Will",
        "thesis": "Grace elevates and perfects a nature that free will still genuinely operates within.",
        "tags": [
          "ST I-II"
        ],
        "paragraphs": [
          "“Grace does not destroy nature, but perfects it” (ST I, q.1, a.8 ad 2). The more the will is moved by God as first cause, the more perfectly it acts as a secondary cause.",
          "No one merits the first grace. Under grace the will truly consents. Operative and cooperative moments name how God moves the will without erasing its act as will.",
          "The last end— the vision of God—exceeds natural capacity; therefore nature alone cannot claim it. Grace is necessary without making the will a puppet."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "grace",
            "label": "Augustine on grace"
          }]
      },
      {
        "id": "natural-law",
        "title": "On Natural Law",
        "thesis": "Moral knowledge of basic goods is available to all rational creatures through natural law, participation in the eternal law.",
        "tags": [
          "ST I-II q.91"
        ],
        "paragraphs": [
          "“The natural law is nothing else than the rational creature’s participation of the eternal law” (ST I-II, q.91, a.2).",
          "Practical reason apprehends basic goods and formulates precepts such as that good is to be done and evil avoided. Human law is just insofar as it derives from this participation.",
          "Sin can obscure particular applications without erasing first principles. Natural law is not a secular replacement for revelation; it is completed and healed by divine law."
        ],
        "contrasts": [
          
        ]
      },
      {
        "id": "eucharist",
        "title": "On the Eucharist (Transubstantiation)",
        "thesis": "At consecration the whole substance of bread and wine is converted into the substance of Christ’s body and blood; the accidents remain.",
        "tags": [
          "ST III q.75"
        ],
        "paragraphs": [
          "“The presence of Christ’s true body and blood in this sacrament cannot be detected by sense, nor understanding, but by faith alone, which rests upon Divine authority” (ST III, q.75, a.1).",
          "Christ is present whole under each species, not by local motion from heaven, but by conversion of substance. The presence is real and substantial, not a mere sign of an absent body.",
          "Faith is required to receive fruitfully; the presence itself does not depend on the individual’s faith as a mere memorial would."
        ],
        "contrasts": [
          ]
      },
      {
        "id": "faith-reason",
        "title": "On Faith and Reason",
        "thesis": "Faith and reason cannot ultimately conflict, since both originate in God.",
        "tags": [
          "SCG I"
        ],
        "paragraphs": [
          "“Although the truth of the Christian faith surpasses the capacity of reason, nevertheless those things which are naturally implanted in reason cannot be contrary to this truth” (SCG I, ch.7).",
          "Reason has its domain: truths naturally knowable. Faith receives what exceeds natural reason and also secures truths reason often fails to know securely.",
          "When conflict appears, either a philosophical claim has been mistaken for demonstration, or a theological interpretation has overreached. Double truth is refused."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "trinity",
            "label": "Augustine on faith seeking understanding"
          },
          {
            "figureId": "anselm",
            "topicKey": "incarnation",
            "label": "Anselm"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Aristotle",
        "note": "Referred to simply as \"the Philosopher\" in his texts; supplied his logic, metaphysics, and much of his ethical framework."
      },
      {
        "name": "St. Augustine of Hippo",
        "figureId": "augustine",
        "note": "The dominant theological (as opposed to philosophical) authority behind his accounts of grace, sin, and the Trinity."
      },
      {
        "name": "Albert the Great",
        "note": "His teacher in Cologne and Paris, a pioneer in integrating Aristotelian natural philosophy with Christian thought."
      },
      {
        "name": "Pseudo-Dionysius the Areopagite",
        "note": "Shaped his account of the hierarchy of being and negative (apophatic) theology."
      },
      {
        "name": "Ibn Rushd (Averroes) and Ibn Sina (Avicenna)",
        "note": "Muslim Aristotelian commentators whose interpretations Aquinas engaged with closely, both adopting and correcting them."
      }
    ],
    "influenced": [
      {
        "name": "The later St. Dominican and Thomist tradition",
        "note": "Figures such as Cajetan and John of St. Thomas systematized and defended his thought for centuries."
      },
      {
        "name": "The Council of Trent",
        "note": "Drew heavily on Thomistic categories, especially in its decrees on justification and the Eucharist."
      },
      {
        "name": "Modern Catholic social and moral teaching",
        "note": "His natural law theory underlies much of the Church's later teaching on ethics, law, and human dignity."
      }
    ],
    "opponents": [
      {
        "name": "The Latin Averroists (e.g. Siger of Brabant)",
        "note": "Aquinas opposed their claim of a strict \"double truth\" separating philosophical and theological conclusions."
      },
      {
        "name": "Franciscan critics (e.g. later, Duns Scotus)",
        "note": "Disputed his positions on the will, individuation, and the proofs for God's existence within decades of his death."
      },
      {
        "name": "Conservative theologians at Paris",
        "note": "Some of Aquinas's propositions were controversially included in the Condemnations of 1277 in Paris, three years after his death, though later rehabilitated."
      }
    ],
    "controversies": [
      {
        "name": "The Condemnations of 1277",
        "summary": "A list of 219 propositions condemned by the Bishop of Paris, Étienne Tempier, some bearing on positions associated with Aquinas's Aristotelianism; the condemnation was later lifted as his reputation grew."
      },
      {
        "name": "The Correctoria Controversy",
        "summary": "A dispute among Franciscan and St. Dominican theologians in the decades after Aquinas's death over whether his positions required correction on points such as the unicity of substantial form."
      }
    ],
    "primarySources": [
      {
        "title": "Summa Theologiae",
        "note": "Open the full Summa reader on this site",
        "summaLink": true
      }
    ],
    "intellectualPortrait": {
      "question": "What was Aquinas trying to understand?",
      "arc": [
        "Being",
        "God",
        "Creation",
        "Grace",
        "Christ",
        "Sacrament",
        "End"
      ],
      "paragraphs": [
        {
          "label": "Being",
          "text": "“God is not only His own essence… but also His own existence.” In God essence and existence are identical; every creature has existence as received (ST I, q.3, a.4). This is the hinge of participation: the creature is real as caused, not as a fragment of the divine substance."
        },
        {
          "label": "God",
          "text": "The Five Ways conclude not with a full treatise on the Trinity but with the recognition of a first mover, first cause, necessary being, maximal source of perfections, and intelligent orderer—“and this all understand to be God” (ST I, q.2, a.3)."
        },
        {
          "label": "Creation",
          "text": "“It is necessary to say that every being in any way existing is from God” (ST I, q.44, a.1). Creation is the giving of esse, not a change in a pre-existing subject."
        },
        {
          "label": "Grace",
          "text": "“Grace does not destroy nature, but perfects it.” Habitual grace is a created participation in the divine nature, elevating the will toward an end that exceeds natural power without erasing secondary causality."
        },
        {
          "label": "Christ",
          "text": "The Word assumes a human nature so that the person is one and the natures remain distinct. Union without confusion is the pattern for thinking participation without pantheism (ST III, qq.2–6)."
        },
        {
          "label": "Sacrament",
          "text": "“The presence of Christ’s true body and blood in this sacrament cannot be detected by sense, nor understanding, but by faith alone, which rests upon Divine authority” (ST III, q.75, a.1). Transubstantiation names the conversion of the whole substance of bread and wine."
        },
        {
          "label": "End",
          "text": "The last end of the human being is the vision of God. Finite intellect does not comprehend God exhaustively; it is perfected by an infinite object without becoming infinite."
        }
      ]
    }
  },
  "ignatius": {
    "id": "ignatius",
    "name": "St. Ignatius of Antioch",
    "centralQuestion": "How does faithful suffering in union with Christ make the Church's unity visible?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/ignatius.jpg",
    "dates": "c. 35–c. 107",
    "tradition": "early",
    "period": "Apostolic Fathers",
    "roles": [
      "Bishop of Antioch",
      "Apostolic Father",
      "Martyr"
    ],
    "epithet": "Bishop of Antioch, Apostolic Father",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Ignatius of Antioch (d. c. 107–110) wrote letters on the way to martyrdom in Rome. ANF translations are public domain.",
      "“Where the bishop is, there is the Catholic Church.” Unity under the bishop, eucharist as the flesh of Christ, and readiness for martyrdom structure the letters.",
      "Docetism is refused: Christ truly suffered. The archive keeps Ignatius as an early witness to episcopal order and eucharistic realism, not as a full systematic theologian."
    ],
    "concepts": [
      "Episcopacy",
      "Eucharist",
      "Martyrdom",
      "Unity of the Church",
      "Incarnation"
    ],
    "opinions": [
      {
        "id": "unity",
        "title": "On Bishop and Eucharist",
        "thesis": "Unity with the bishop and the one eucharist marks the Church; Christ truly suffered in the flesh.",
        "tags": [
          "Letters"
        ],
        "paragraphs": [
          "Break one eucharist, for one is the flesh of our Lord Jesus Christ. Avoid divisions as the beginning of evils.",
          "Docetists who say he suffered only in appearance are refused. Martyrdom imitates the real passion.",
          "Why in the archive? Because these letters preserve an early, concrete form of catholic order and sacramental confession."
        ],
        "contrasts": [
          {
            "figureId": "cyprian",
            "topicKey": "unity",
            "label": "Cyprian"
          }
        ]
      },
      {
        "id": "martyrdom",
        "title": "On Martyrdom",
        "thesis": "Discipleship may mean becoming the wheat of God, ground by the teeth of beasts.",
        "tags": [],
        "paragraphs": [
          "Ignatius asks the Romans not to intervene to save him from death. The pure bread of Christ is the fruit of martyrdom in his imagery.",
          "The witness is pastoral and personal more than theoretical—an early martyr’s theology of conformity to the passion."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      {
        "name": "The Apostles",
        "note": "Tradition links him to the Johannine circle"
      }
    ],
    "influenced": [
      {
        "name": "Later episcopal theology",
        "note": "Cited throughout patristic and medieval tradition"
      }
    ],
    "opponents": [
      {
        "name": "Docetists",
        "note": "Denied the reality of Christ's flesh and passion"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Epistle to the Ephesians",
        "workKey": "ignatius-ephesians",
        "note": "Hosted · ANF"
      },
      {
        "title": "Epistle to the Romans",
        "workKey": "ignatius-romans",
        "note": "Hosted · ANF"
      },
      {
        "title": "Epistle to the Smyrnaeans",
        "workKey": "ignatius-smyrnaeans",
        "note": "Hosted · ANF"
      },
      {
        "title": "Epistle to the Magnesians",
        "note": "ANF",
        "workKey": "ignatius-magnesians"
      },
      {
        "title": "Epistle to the Trallians",
        "note": "ANF",
        "workKey": "ignatius-trallians"
      }
    ]
  },
  "polycarp": {
    "id": "polycarp",
    "name": "St. Polycarp of Smyrna",
    "centralQuestion": "How does steadfast confession of Christ unto death perfect discipleship?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/polycarp.jpg",
    "dates": "c. 69–c. 155",
    "tradition": "early",
    "period": "Apostolic Fathers",
    "roles": [
      "Bishop of Smyrna",
      "Martyr",
      "Disciple of John"
    ],
    "epithet": "Bishop of Smyrna, disciple of the Apostle John",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "Polycarp was bishop of Smyrna and, according to Irenaeus, a hearer of the Apostle John. His Letter to the Philippians is an early witness to the circulation of Pauline and other New Testament writings.",
      "He was martyred at an advanced age (the Martyrdom of Polycarp places him at eighty-six). The account of his death became a model for later martyr acts."
    ],
    "concepts": [
      "Martyrdom",
      "Apostolic Tradition",
      "Orthodoxy",
      "Scripture"
    ],
    "opinions": [
      {
        "id": "tradition",
        "title": "On Apostolic Tradition",
        "thesis": "The faith received from the apostles is to be guarded and handed on without innovation.",
        "tags": [
          "Apostolic Fathers"
        ],
        "paragraphs": [
          "Polycarp's surviving letter is pastoral rather than speculative: it exhorts to righteousness, warns against false teachers, and treats the writings of Paul as authoritative scripture.",
          "Irenaeus later appealed to Polycarp as a living link to the apostles when opposing Gnostic claims to secret tradition."
        ]
      }
    ],
    "influences": [
      {
        "name": "John the Apostle",
        "note": "According to Irenaeus"
      }
    ],
    "influenced": [
      {
        "name": "St. Irenaeus of Lyons",
        "figureId": "irenaeus",
        "note": "Claimed Polycarp as teacher"
      }
    ],
    "opponents": [
      {
        "name": "Marcionites and Gnostics",
        "note": "Opposed in Asia Minor"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Letter to the Philippians",
        "workKey": "polycarp-philippians",
        "note": "Hosted"
      },
      {
        "title": "Martyrdom of Polycarp",
        "workKey": "polycarp-martyrdom",
        "note": "Hosted"
      }
    ]
  },
  "justin": {
    "id": "justin",
    "name": "St. Justin Martyr",
    "centralQuestion": "How can the truth sought by the philosophers be recognized as fulfilled in Christ the Logos?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/justin.jpg",
    "dates": "c. 100–c. 165",
    "tradition": "early",
    "period": "Apologists",
    "roles": [
      "Philosopher",
      "Apologist",
      "Martyr"
    ],
    "epithet": "Philosopher and Apologist",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "St. Justin Martyr (c. 100–165) defended the faith before the empire and sought the seeds of the Word in philosophy. ANF translations are public domain.",
      "Christ is the Logos in whom all who have lived with the Logos share. Worship is rational; idols are refused. The memoirs of the apostles are read with the prophets in the assembly.",
      "Philosophy is not simply rejected; it is claimed and corrected where the Word has already been at work."
    ],
    "concepts": [
      "Logos",
      "Philosophy and Faith",
      "Apology",
      "Baptism",
      "Eucharist"
    ],
    "opinions": [
      {
        "id": "logos",
        "title": "On the Logos",
        "thesis": "Christ the Logos fulfills what philosophers sought; all truth belongs to the Word.",
        "tags": [
          "Apologies"
        ],
        "paragraphs": [
          "Those who lived according to the Logos are Christians, even before Christ—Justin’s bold claim for Socrates and others, ordered under the one Word made flesh.",
          "The apostles’ memoirs and the prophets form the public reading of the Church. The Eucharist is the flesh and blood of the incarnate Jesus, received with thanksgiving.",
          "Idolatry is refused as the worship of demons and dead matter; the Creator alone is to be adored."
        ],
        "contrasts": [
          {
            "figureId": "irenaeus",
            "topicKey": "recapitulation",
            "label": "Irenaeus"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Plato",
        "note": "Philosophical formation"
      },
      {
        "name": "John the Evangelist",
        "note": "Logos doctrine"
      }
    ],
    "influenced": [
      {
        "name": "Later Apologists",
        "note": "Model of philosophical apology"
      }
    ],
    "opponents": [
      {
        "name": "Pagan critics of Christianity",
        "note": "Celsus generation"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "First Apology",
        "workKey": "justin-first-apology",
        "note": "Hosted · expanded"
      },
      {
        "title": "Second Apology",
        "workKey": "justin-second-apology",
        "note": "Hosted"
      },
      {
        "title": "Dialogue with Trypho",
        "workKey": "justin-trypho",
        "note": "External"
      }
    ]
  },
  "irenaeus": {
    "id": "irenaeus",
    "name": "St. Irenaeus of Lyons",
    "centralQuestion": "How does the incarnate Word recapitulate and heal the whole of human history?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/irenaeus.jpg",
    "dates": "c. 130–c. 202",
    "tradition": "early",
    "period": "Anti-Gnostic Fathers",
    "roles": [
      "Bishop of Lyons",
      "Theologian"
    ],
    "epithet": "Bishop of Lyons, opponent of Gnosticism",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "St. Irenaeus of Lyons (c. 130–202) wrote Against Heresies to defend the apostolic rule of faith against Gnostic systems. ANF translations are public domain.",
      "The Son recapitulates Adam; what is assumed is healed. The one God creates and redeems; the Church’s canon and succession guard the preaching against secret traditions.",
      "“The glory of God is a living man; and the life of man consists in beholding God” (Against Heresies IV, later paraphrase tradition of the famous line on gloria Dei)."
    ],
    "concepts": [
      "Recapitulation",
      "Apostolic Tradition",
      "Rule of Faith",
      "Incarnation",
      "Against Heresies"
    ],
    "opinions": [
      {
        "id": "recapitulation",
        "title": "On Recapitulation",
        "thesis": "In Christ the whole human story is summed up and restored; the visible Church guards the apostolic faith.",
        "tags": [
          "Against Heresies"
        ],
        "paragraphs": [
          "Christ becomes what we are so that we may become what he is—participation, not identity of essence. Adam is recapitulated: the disobedience at the tree is answered by obedience unto the cross.",
          "Gnostic dualism of creator and redeemer is refused. The one God of Israel is the Father of Jesus Christ.",
          "The rule of faith and the succession of teaching in the churches measure private speculation."
        ],
        "contrasts": [
          {
            "figureId": "athanasius",
            "topicKey": "incarnation",
            "label": "Athanasius"
          },
          {
            "figureId": "tertullian",
            "topicKey": "rule",
            "label": "Tertullian"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "St. Polycarp of Smyrna",
        "figureId": "polycarp"
      },
      {
        "name": "John the Apostle"
      }
    ],
    "influenced": [
      {
        "name": "Later Catholic tradition",
        "note": "Rule of faith and fourfold Gospel"
      }
    ],
    "opponents": [
      {
        "name": "Valentinians and other Gnostics",
        "note": "Primary targets of Against Heresies"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Against Heresies",
        "workKey": "irenaeus-heresies",
        "note": "Hosted"
      },
      {
        "title": "Demonstration of the Apostolic Preaching",
        "workKey": "irenaeus-apostolic-preaching",
        "note": "Hosted"
      },
      {
        "title": "Recapitulation (III–V selection)",
        "workKey": "irenaeus-recapitulation",
        "note": "Hosted"
      }
    ]
  },
  "tertullian": {
    "id": "tertullian",
    "name": "Tertullian",
    "centralQuestion": "How can the Church preserve the rule of faith against innovation without becoming merely reactionary?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Tertullian.jpg",
    "dates": "c. 155–c. 220",
    "tradition": "early",
    "period": "Latin Apologists",
    "roles": [
      "Apologist",
      "Theologian",
      "Montanist (later)"
    ],
    "epithet": "Father of Latin theology",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "Tertullian of Carthage (c. 160–225) forged Latin theological vocabulary—trina, persona, sacramentum—and defended the rule of faith. ANF translations are public domain.",
      "“What has Athens to do with Jerusalem?” names a polemic against speculative captivity, not a refusal of all reason. The soul is naturally Christian in the sense that creation points beyond idols.",
      "Later Montanist rigor complicated his legacy; the archive keeps him for the rule of faith and the early Latin confession of the Trinity and the flesh of Christ."
    ],
    "concepts": [
      "Trinity",
      "Incarnation",
      "Prescription against Heretics",
      "Soul",
      "Baptism"
    ],
    "opinions": [
      {
        "id": "rule",
        "title": "On the Rule of Faith",
        "thesis": "The apostolic rule of faith measures doctrine; heresy is novelty against the public tradition.",
        "tags": [
          "Prescription"
        ],
        "paragraphs": [
          "Heretics are to be refused a hearing on Scripture if they do not share the rule of faith that identifies what Scripture is and means in the Church.",
          "The flesh of Christ is real; resurrection is of the flesh. Docetism is refused.",
          "Athens and Jerusalem: philosophy must not master the rule. The claim is jurisdictional as much as epistemic."
        ],
        "contrasts": [
          {
            "figureId": "irenaeus",
            "topicKey": "recapitulation",
            "label": "Irenaeus"
          },
          {
            "figureId": "justin",
            "topicKey": "logos",
            "label": "Justin"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Scripture and Stoic categories",
        "note": "Rhetorical and philosophical tools"
      }
    ],
    "influenced": [
      {
        "name": "St. Cyprian of Carthage",
        "figureId": "cyprian"
      },
      {
        "name": "Latin Trinitarian theology"
      }
    ],
    "opponents": [
      {
        "name": "Praxeas / Modalists",
        "note": "Against Praxeas"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Against Praxeas",
        "workKey": "tertullian-praxeas",
        "note": "Hosted"
      },
      {
        "title": "On the Flesh of Christ",
        "workKey": "tertullian-flesh",
        "note": "Hosted · expanded"
      },
      {
        "title": "On the Soul",
        "workKey": "tertullian-soul",
        "note": "Hosted"
      },
      {
        "title": "On the Resurrection of the Flesh",
        "workKey": "tertullian-resurrection",
        "note": "Hosted"
      },
      {
        "title": "On Baptism",
        "workKey": "tertullian-baptism",
        "note": "Hosted"
      },
      {
        "title": "Prescription Against Heretics",
        "workKey": "tertullian-prescription",
        "note": "Hosted"
      },
      {
        "title": "Apology",
        "workKey": "tertullian-apology",
        "note": "Hosted"
      }
    ]
  },
  "origen": {
    "id": "origen",
    "name": "Origen of Alexandria",
    "centralQuestion": "How can Scripture's spiritual depth be read without abandoning its historical sense?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Origen.jpg",
    "dates": "c. 184–c. 253",
    "tradition": "early",
    "period": "Alexandrian School",
    "roles": [
      "Biblical scholar",
      "Theologian",
      "Teacher"
    ],
    "epithet": "Biblical scholar and speculative theologian",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "Origen of Alexandria was the most prolific and influential Christian scholar of the third century. Head of the catechetical school, he produced the Hexapla, vast commentaries, and On First Principles.",
      "Some of his speculative views (pre-existence of souls, eventual restoration of all) were later condemned, but his biblical method and theological ambition shaped East and West for centuries."
    ],
    "concepts": [
      "Allegory",
      "Apokatastasis",
      "Pre-existence",
      "Free Will",
      "Hexapla"
    ],
    "opinions": [
      {
        "id": "scripture",
        "title": "On Scripture",
        "thesis": "Scripture has a bodily, a psychic, and a spiritual sense; the letter is the starting point, not the end.",
        "tags": [
          "Hermeneutics"
        ],
        "paragraphs": [
          "Origen insisted that every text of Scripture is inspired and useful, and that difficulties in the literal sense invite the reader to a deeper spiritual meaning.",
          "His allegorical method, grounded in a high doctrine of inspiration, became the dominant Christian approach to the Old Testament until the rise of more historical methods."
        ]
      }
    ],
    "influences": [
      {
        "name": "Clement of Alexandria"
      },
      {
        "name": "Platonism"
      }
    ],
    "influenced": [
      {
        "name": "St. Gregory of Nyssa",
        "figureId": "gregory-nyssa"
      },
      {
        "name": "Evagrius",
        "note": "Ascetic Origenism"
      }
    ],
    "opponents": [
      {
        "name": "Later anti-Origenists",
        "note": "Condemnations in the sixth century"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "On First Principles",
        "workKey": "origen-principles",
        "note": "Hosted · expanded"
      },
      {
        "title": "Against Celsus",
        "workKey": "origen-celsus",
        "note": "Books I–III in TOC"
      },
      {
        "title": "On Prayer",
        "workKey": "origen-prayer",
        "note": "Hosted"
      },
      {
        "title": "Exhortation to Martyrdom",
        "workKey": "origen-martyrdom",
        "note": "Hosted"
      }
    ]
  },
  "cyprian": {
    "id": "cyprian",
    "name": "St. Cyprian of Carthage",
    "centralQuestion": "How is the unity of the Church related to the validity of its sacraments and the hope of salvation?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/cyprian.jpg",
    "dates": "c. 200–258",
    "tradition": "early",
    "period": "Latin Fathers",
    "roles": [
      "Bishop of Carthage",
      "Martyr"
    ],
    "epithet": "Bishop of Carthage, martyr",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "St. Cyprian of Carthage (d. 258) wrote On the Unity of the Church under persecution and schism. ANF translations are public domain.",
      "“He cannot have God for his Father who has not the Church for his mother.” Unity is not optional decoration; it belongs to the esse of Christian belonging.",
      "The baptismal controversy with Stephen of Rome shows the stakes: where is the Church, and whose baptism holds? Augustine later revised aspects of Cyprian’s rigor while keeping the passion for unity."
    ],
    "concepts": [
      "Unity of the Church",
      "Baptism",
      "Episcopacy",
      "Lapsed"
    ],
    "opinions": [
      {
        "id": "unity",
        "title": "On the Unity of the Church",
        "thesis": "Outside the one Church there is no salvation in the sense Cyprian intends; schism wounds the body.",
        "tags": [
          "De unitate"
        ],
        "paragraphs": [
          "The chair of Peter and the one episcopate symbolize unity. Division multiplies altars against the one table.",
          "Martyrdom outside unity does not, for Cyprian, automatically heal schism. The claim is severe and historically fateful.",
          "Augustine’s anti-Donatist work inherits the hunger for unity while relocating validity more clearly in Christ’s action than in the minister’s purity."
        ],
        "contrasts": [
          {
            "figureId": "augustine",
            "topicKey": "church",
            "label": "Augustine on the Church"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Tertullian",
        "figureId": "tertullian"
      }
    ],
    "influenced": [
      {
        "name": "St. Augustine of Hippo",
        "figureId": "augustine"
      },
      {
        "name": "Western canon law"
      }
    ],
    "opponents": [
      {
        "name": "Novatianists",
        "note": "Rigorist schism over the lapsed"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Selected Writings",
        "workKey": "cyprian-writings",
        "note": "Unity · Lapsed · Demetrian · Alms · Lord’s Prayer"
      },
      {
        "title": "On the Unity of the Church",
        "workKey": "cyprian-unity",
        "note": "Hosted"
      },
      {
        "title": "On the Lapsed",
        "workKey": "cyprian-lapsed",
        "note": "Hosted"
      }
    ]
  },
    "athanasius": {
    "id": "athanasius",
    "name": "St. Athanasius of Alexandria",
    "centralQuestion": "How can the Word be truly God so that humanity is truly deified in him?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/athanasius.png",
    "dates": "c. 296–373",
    "tradition": "early",
    "period": "Nicene Fathers",
    "roles": [
      "Bishop of Alexandria",
      "Doctor of the Church",
      "Champion of Nicaea"
    ],
    "epithet": "Defender of the Nicene faith against Arianism; the bishop who made homoousios the permanent grammar of Christian confession.",
    "intellectualPortrait": {
      "question": "What was Athanasius trying to secure?",
      "arc": [
        "Creation",
        "Fall",
        "Incarnation",
        "Deification",
        "Homoousios",
        "Worship",
        "Scripture",
        "Church"
      ],
      "paragraphs": [
        {
          "label": "Creation",
          "text": "Everything that is not God is made from nothing by the Word. Creation is not necessary to God; it is a free act of the good will of the Father through the Son. The image of God in humanity is therefore a gift, not a natural right of independence. When that image is corrupted, the remedy must come from the same Word who first gave it."
        },
        {
          "label": "Fall",
          "text": "Humanity, made from nothing, turned back toward nothingness. Sin is not merely a bad choice; it is a drift into corruption and death. The image is being erased. Moral exhortation alone cannot reverse ontological decay. Only the one who made the image can remake it from within."
        },
        {
          "label": "Incarnation",
          "text": "“He was made man that we might be made God” (On the Incarnation 54). The Word takes a body, not as a temporary instrument, but so that death may be abolished in the flesh and the image restored by personal contact with the image’s own Maker. The body is the place of victory, not a barrier to it."
        },
        {
          "label": "Deification",
          "text": "Theosis is participation by grace in the life of the Son—never fusion of essence. Creatures remain creatures; they receive what only God can give. If the Son were himself a creature, however exalted, the gift would be impossible. The soteriological argument is therefore also an argument for full deity."
        },
        {
          "label": "Homoousios",
          "text": "The Nicene term is not philosophical speculation. It is the only grammar that protects the baptismal confession and the Church’s worship. A creature cannot receive the worship of the Church or effect the union of creatures with God. “There is no middle between creature and Creator.”"
        },
        {
          "label": "Worship",
          "text": "The Church already worships the Son. Either that worship is idolatry, or the Son is true God. Athanasius forces the alternative and refuses every compromise that would leave the Son less than the Father while still receiving divine honor."
        },
        {
          "label": "Scripture",
          "text": "The canon is read under the rule of faith. Passages that speak of the Son’s subordination or ignorance are read in the economy of the Incarnation, not as evidence of a second, lesser divine being. Scripture is coherent only when the Son is confessed as homoousios with the Father."
        },
        {
          "label": "Church",
          "text": "The faith of Nicaea is the faith of the apostles and of the martyrs. Athanasius’s long exile is not personal stubbornness; it is the defense of the Church’s own baptismal identity against imperial and episcopal pressure to redefine God."
        }
      ]
    },
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Athanasius of Alexandria (c. 296–373) spent nearly half his episcopate in exile for refusing every formula that would make the Son a creature. His life is the lived form of the Nicene confession: the Church cannot bargain the deity of the Word without losing the possibility of deification.",
      "On the Incarnation states the soteriological criterion with unmatched clarity: only the Creator can restore the corrupted image. The Orations Against the Arians and the Defence of the Nicene Definition develop the same logic against successive attempts to find a middle term between God and creature.",
      "Quotations below follow the public-domain English tradition of those treatises (NPNF / older translations)."
    ],
    "concepts": [
      "Homoousios",
      "Incarnation",
      "Arian controversy",
      "Deification",
      "Canon of Scripture",
      "Recapitulation",
      "Image of God"
    ],
    "opinions": [
      {
        "id": "incarnation",
        "title": "On the Incarnation",
        "thesis": "The Word became human that we might be deified; only the Creator could restore the corrupted image.",
        "tags": [
          "Nicene",
          "On the Incarnation"
        ],
        "paragraphs": [
          "“He was made man that we might be made God; and He manifested Himself by a body that we might receive the idea of the unseen Father; and He endured the insolence of men that we might inherit immortality” (On the Incarnation 54).",
          "Created from nothing, humanity turned toward nothingness in sin; the image was being erased. Repentance alone could not restore the image or abolish death. Only the Word through whom all things were made could remake and indwell the ruined nature.",
          "The body is not a prison but the battlefield. By taking flesh the Word meets death in the place where death had claimed victory, and by rising abolishes its dominion."
        ],
        "contrasts": [
          {
            "figureId": "origen",
            "topicKey": "incarnation",
            "label": "Origen on the Logos"
          }
        ]
      },
      {
        "id": "homoousios",
        "title": "On Homoousios and the Son’s Deity",
        "thesis": "The Son is of one substance with the Father; any lesser status makes deification and worship impossible.",
        "tags": [
          "Against the Arians",
          "Nicaea"
        ],
        "paragraphs": [
          "If the Son were a creature, he could not deify creatures or receive the worship of the Church. Homoousios protects the baptismal faith: the Son does what only God does.",
          "There is no middle between Creator and creature. Every attempt to invent an intermediate divine rank collapses into either full deity or full creatureliness. Athanasius refuses the intermediate as incoherent with Scripture and with the Church’s practice.",
          "The term is not philosophy imposed on the gospel; it is the necessary grammar that prevents the gospel from becoming a story about a high creature saving lesser creatures."
        ],
        "contrasts": [
          {
            "figureId": "origen",
            "topicKey": "trinity",
            "label": "Origen on subordination"
          }
        ]
      },
      {
        "id": "deification",
        "title": "On Deification (Theosis)",
        "thesis": "Humanity is restored by participation in the life of the Son; the gift is real only if the Giver is true God.",
        "tags": [
          "Theosis"
        ],
        "paragraphs": [
          "Deification is not absorption into the divine essence. It is the creature remaining creature while receiving, by grace, a share in the Son’s sonship and immortality.",
          "The logic is strict: only God can give what is proper to God. If the Son is not God, the Church’s promise of divine life is a deception.",
          "This soteriological test becomes the decisive argument against every form of Arianism."
        ],
        "contrasts": []
      },
      {
        "id": "scripture-canon",
        "title": "On Scripture and the Rule of Faith",
        "thesis": "The canon is read under the baptismal confession; subordination texts belong to the economy of the Incarnation.",
        "tags": [
          "Hermeneutics"
        ],
        "paragraphs": [
          "Athanasius’s Festal Letter of 367 is among the earliest complete lists of the New Testament books recognized by the Church of Alexandria.",
          "Passages that speak of the Son’s ignorance, growth, or subordination are interpreted as belonging to the assumed humanity, not as evidence that the Word is less than the Father.",
          "The rule of faith is not an external constraint on Scripture; it is the Church’s recognition of the same Word who speaks in the text."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      {
        "name": "St. Alexander of Alexandria",
        "note": "His predecessor in the see; the first to confront Arius"
      },
      {
        "name": "The Alexandrian tradition",
        "note": "Origen’s legacy filtered through the rule of faith"
      }
    ],
    "influenced": [
      {
        "name": "St. Cyril of Alexandria",
        "figureId": "cyril-alex"
      },
      {
        "name": "The Cappadocians",
        "note": "Gregory Nazianzen and Basil inherit and refine the Nicene settlement"
      },
      {
        "name": "The entire subsequent Orthodox and Catholic tradition",
        "note": "Homoousios becomes the non-negotiable grammar of the Trinity"
      }
    ],
    "opponents": [
      {
        "name": "Arius and the Arians",
        "note": "Principal lifelong opponents; successive formulas that made the Son a creature"
      },
      {
        "name": "Imperial pressure",
        "note": "Constantius and later emperors seeking ecclesiastical peace at the price of doctrine"
      }
    ],
    "controversies": [
      {
        "title": "The Arian controversy",
        "summary": "From the Council of Nicaea (325) through five exiles, Athanasius refused every compromise that would leave the Son less than true God. The controversy forced the Church to decide whether the language of worship and deification could survive without homoousios."
      }
    ],
    "primarySources": [
      {
        "title": "On the Incarnation of the Word",
        "workKey": "athanasius-incarnation",
        "note": "Hosted"
      },
      {
        "title": "Orations Against the Arians",
        "workKey": "athanasius-arians",
        "note": "Orations I–II in TOC"
      },
      {
        "title": "Life of Antony",
        "workKey": "athanasius-antony",
        "note": "Hosted"
      },
      {
        "title": "Defence of the Nicene Definition",
        "workKey": "athanasius-nicene",
        "note": "Hosted"
      }
    ]
  },
  "basil": {
    "id": "basil",
    "name": "St. Basil the Great",
    "centralQuestion": "How can the common life of the Spirit form a people who confess the full divinity of Father, Son, and Spirit?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/basil.png",
    "dates": "c. 330–379",
    "tradition": "early",
    "period": "Cappadocian Fathers",
    "roles": [
      "Bishop of Caesarea",
      "Doctor of the Church",
      "Monastic legislator"
    ],
    "epithet": "Cappadocian Father, Bishop of Caesarea",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Basil the Great (c. 330–379) organized monastic life in the Asceticon and defended the Spirit’s deity in On the Holy Spirit. NPNF translations are public domain.",
      "“We glorify the Spirit with the Father and the Son” becomes the liturgical and dogmatic claim. The Spirit is not a creature; baptism and sanctification require full deity.",
      "The longer and shorter rules order common life, work, and prayer. Social care of the poor in the Basiliad joins doctrine to practice."
    ],
    "concepts": [
      "Trinity",
      "Holy Spirit",
      "Monasticism",
      "Social care",
      "Liturgy"
    ],
    "opinions": [
      {
        "id": "spirit",
        "title": "On the Holy Spirit",
        "thesis": "The Spirit is to be glorified with the Father and the Son as true God.",
        "tags": [
          "On the Holy Spirit"
        ],
        "paragraphs": [
          "Operations of sanctification and the baptismal name place the Spirit within the divine life, not among creatures.",
          "Basil’s careful language under pressure still aims at equal glory. Later reception read him with the Nazianzen orations as a Cappadocian foundation.",
          "Monastic rule: common life is the school of the commandments—doctrine embodied in a people."
        ],
        "contrasts": [
          {
            "figureId": "gregory-nazianzen",
            "topicKey": "trinity",
            "label": "Gregory Nazianzen"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Athanasius",
        "figureId": "athanasius"
      },
      {
        "name": "Origen",
        "figureId": "origen"
      }
    ],
    "influenced": [
      {
        "name": "St. Gregory of Nazianzus",
        "figureId": "gregory-nazianzen"
      },
      {
        "name": "Eastern monasticism"
      }
    ],
    "opponents": [
      {
        "name": "Pneumatomachi",
        "note": "Denied the Spirit's divinity"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "On the Holy Spirit",
        "workKey": "basil-holy-spirit",
        "note": "Hosted"
      },
      {
        "title": "Letters (selection)",
        "workKey": "basil-letters",
        "note": "Hosted"
      },
      {
        "title": "Hexaemeron",
        "workKey": "basil-hexaemeron",
        "note": "NPNF"
      }
    ]
  },
  "gregory-nazianzen": {
    "id": "gregory-nazianzen",
    "name": "St. Gregory of Nazianzus",
    "centralQuestion": "How can the Church speak of the Trinity without dividing the Godhead or confusing the persons?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Gregory_the_Theologian_La_Martorana_Palermo_2008-08-27.jpg",
    "dates": "c. 329–390",
    "tradition": "early",
    "period": "Cappadocian Fathers",
    "roles": [
      "Archbishop of Constantinople",
      "Theologian",
      "Doctor of the Church"
    ],
    "epithet": "The Theologian, Cappadocian Father",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Gregory of Nazianzus (c. 329–390), the “Theologian,” delivered the Theological Orations that disciplined Christian speech about the Trinity. NPNF translations carry his public-domain English voice.",
      "He insists on one Godhead in three hypostases, and on the Spirit’s full deity from the Spirit’s operations in baptism and deification. “Theology is not for all” in the sense that purification of life belongs with precision of speech (Theological Orations).",
      "The monarchy of the Father names the Father as source, not as a higher essence. Begotten and proceeding mark personal distinction; the shared Godhead marks equality."
    ],
    "concepts": [
      "Trinity",
      "Theological Orations",
      "Christology",
      "Pastoral care"
    ],
    "opinions": [
      {
        "id": "trinity",
        "title": "On the Trinity",
        "thesis": "One Godhead in three hypostases; the Spirit is coequal God, known from the economy and baptism.",
        "tags": [
          "Theological Orations"
        ],
        "paragraphs": [
          "Gregory opposes both Arian subordination and Sabellian collapse of the persons into masks of one person. One ousia, three hypostases: united without confusion, distinct without division.",
          "If the Spirit makes us partakers of God, the Spirit is not a creature. The baptismal name places the Spirit with the Father and the Son.",
          "Eternal generation and procession are not events in time. Temporal language is the debt of human speech, corrected by the confession of eternity."
        ],
        "contrasts": [
          {
            "figureId": "athanasius",
            "topicKey": "incarnation",
            "label": "Athanasius"
          },
          {
            "figureId": "augustine",
            "topicKey": "trinity",
            "label": "Augustine on the Trinity"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "St. Basil the Great",
        "figureId": "basil"
      }
    ],
    "influenced": [
      {
        "name": "Eastern Orthodoxy",
        "note": "Title \"Theologian\" shared only with John the Evangelist and Symeon"
      }
    ],
    "opponents": [
      {
        "name": "Arians and Apollinarians"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Theological Orations",
        "workKey": "gregory-nazianzen-theological-orations",
        "note": "Orations 28–31 · TOC by oration"
      },
      {
        "title": "Orations (other)",
        "url": "https://www.newadvent.org/fathers/2001.htm",
        "note": "NPNF external"
      }
    ]
  },
  "gregory-nyssa": {
    "id": "gregory-nyssa",
    "name": "St. Gregory of Nyssa",
    "centralQuestion": "How does the finite soul ascend endlessly into the infinite God without ever exhausting the mystery?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Gregory_of_Nyssa.jpg",
    "dates": "c. 335–c. 395",
    "tradition": "early",
    "period": "Cappadocian Fathers",
    "roles": [
      "Bishop of Nyssa",
      "Mystic",
      "Philosopher"
    ],
    "epithet": "Cappadocian Father, mystical theologian",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "The youngest of the Cappadocian trio, St. Gregory of Nyssa developed a profound speculative and mystical theology. The Life of Moses and the Homilies on the Song of Songs describe the soul's endless ascent into God.",
      "He also wrote against Eunomius and reflected on the image of God, freedom, and the restoration of all things."
    ],
    "concepts": [
      "Epektasis",
      "Image of God",
      "Apokatastasis",
      "Infinite progress",
      "Mysticism"
    ],
    "opinions": [
      {
        "id": "epektasis",
        "title": "On Endless Ascent",
        "thesis": "Perfection is not a static attainment but perpetual progress into the infinite God.",
        "tags": [
          "Mysticism",
          "Life of Moses"
        ],
        "paragraphs": [
          "For Gregory, because God is infinite, the soul's desire is never exhausted; each advance opens a further horizon of participation.",
          "This epektasis (stretching forward) became a hallmark of Eastern mystical theology."
        ]
      }
    ],
    "influences": [
      {
        "name": "St. Basil the Great",
        "figureId": "basil"
      },
      {
        "name": "Origen",
        "figureId": "origen"
      }
    ],
    "influenced": [
      {
        "name": "St. Maximus the Confessor",
        "figureId": "maximus"
      },
      {
        "name": "Eastern mystical tradition"
      }
    ],
    "opponents": [
      {
        "name": "Eunomius",
        "note": "Extreme Arian rationalism"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "The Great Catechism",
        "workKey": "gregory-nyssa-catechism",
        "note": "40 chapters · NPNF"
      },
      {
        "title": "On the Making of Man",
        "workKey": "gregory-nyssa-making-man",
        "note": "Hosted"
      },
      {
        "title": "On the Soul and the Resurrection",
        "workKey": "gregory-nyssa-soul",
        "note": "Hosted"
      },
      { "title": "The Life of Moses", "workKey": "gregory-nyssa-life-moses", "note": "Hosted · De vita Moysis" }
    ]
  },
  "chrysostom": {
    "id": "chrysostom",
    "name": "St. John Chrysostom",
    "centralQuestion": "How does the Word preached form a moral and eucharistic people in the city?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Byzantinischer_Mosaizist_des_9._Jahrhunderts_003.jpg",
    "dates": "c. 347–407",
    "tradition": "early",
    "period": "Golden Age of Greek Fathers",
    "roles": [
      "Archbishop of Constantinople",
      "Doctor of the Church",
      "Preacher"
    ],
    "epithet": "Archbishop of Constantinople, “Golden-Mouthed”",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. John Chrysostom (“Golden-mouthed,” c. 349–407) preached continuous homilies on Matthew, Acts, and Paul in Antioch and Constantinople. NPNF preserves the public-domain English of those homilies.",
      "The preached Word forms a moral and eucharistic people. Severity against the neglect of the poor follows from the common table: one cannot partake of the body while despising the members of the body.",
      "On the Priesthood and the homilies treat the preacher’s charge as soul-care in the city, not as court entertainment. Exile was the cost of that program under imperial pressure."
    ],
    "concepts": [
      "Preaching",
      "Scripture",
      "Care for the poor",
      "Liturgy",
      "Repentance"
    ],
    "opinions": [
      {
        "id": "preaching",
        "title": "On Preaching and the City",
        "thesis": "The Word preached, joined to Eucharist and mercy, forms a people ordered by the gospel in public life.",
        "tags": [
          "Homilies"
        ],
        "paragraphs": [
          "Chrysostom’s homilies apply Scripture to almsgiving, marriage, oaths, theater, and wealth. The gospel claims the whole person in the polis.",
          "Ignorance of Scripture is treated as a source of moral and ecclesial disorder. The preacher opens the text so that it judges and comforts.",
          "The Eucharist intensifies social demand: the same Christ received at the altar judges disparity between rich and poor in the assembly."
        ],
        "contrasts": [
          {
            "figureId": "ambrose",
            "topicKey": "church",
            "label": "Ambrose"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Diodore of Tarsus",
        "note": "Antiochene exegesis"
      }
    ],
    "influenced": [
      {
        "name": "Eastern liturgical and pastoral tradition"
      }
    ],
    "opponents": [
      {
        "name": "Court of Arcadius / Empress Eudoxia",
        "note": "Political conflict leading to exile"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Homilies on the Statues",
        "workKey": "chrysostom-statues",
        "note": "21 homilies"
      },
      {
        "title": "Selected Homilies & On the Priesthood",
        "workKey": "chrysostom-matthew",
        "note": "Multi-part TOC"
      },
      {
        "title": "On the Priesthood",
        "workKey": "chrysostom-priesthood",
        "note": "Hosted complete"
      }
    ]
  },
  "ambrose": {
    "id": "ambrose",
    "name": "St. Ambrose of Milan",
    "centralQuestion": "How does the bishop's teaching and the Church's song order the soul toward baptismal freedom?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/ambrose.jpg",
    "dates": "c. 340–397",
    "tradition": "early",
    "period": "Latin Doctors",
    "roles": [
      "Bishop of Milan",
      "Doctor of the Church"
    ],
    "epithet": "Bishop of Milan, Doctor of the Church",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "St. Ambrose of Milan (c. 340–397) baptized Augustine and defended the Church’s independence against imperial pressure. NPNF translations are public domain.",
      "On the sacraments and the mysteries he teaches the catechumens: what the eye sees is bread; what faith receives is the body of Christ.",
      "Hymns and the daily office formed the people. The archive keeps him as bishop-teacher of sacramental realism and episcopal courage."
    ],
    "concepts": [
      "Church and Empire",
      "Sacraments",
      "Hymnody",
      "Virginity",
      "Scripture"
    ],
    "opinions": [
      {
        "id": "eucharist",
        "title": "On the Mysteries",
        "thesis": "The sacraments effect what they signify; Christ is truly received in the Eucharist.",
        "tags": [
          "De mysteriis"
        ],
        "paragraphs": [
          "Ambrose’s catecheses speak with realist force: the word of Christ, which made all things, changes what is received at the altar.",
          "Augustine heard this preaching at Milan. Later scholastic definition is not yet present; the pastoral realism is.",
          "The Church’s independence under pressure is the public face of the same confession: Christ is Lord of the emperors."
        ],
        "contrasts": [
          {
            "figureId": "aquinas",
            "topicKey": "eucharist",
            "label": "Aquinas on the Eucharist"
          },
          {
            "figureId": "augustine",
            "topicKey": "church",
            "label": "Augustine"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Greek Fathers",
        "note": "Read in translation"
      },
      {
        "name": "Nicaea"
      }
    ],
    "influenced": [
      {
        "name": "St. Augustine of Hippo",
        "figureId": "augustine"
      }
    ],
    "opponents": [
      {
        "name": "Arians in Milan",
        "note": "Conflict over basilicas"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "On the Duties of the Clergy",
        "workKey": "ambrose-duties",
        "note": "Hosted"
      },
      {
        "title": "On the Mysteries",
        "workKey": "ambrose-mysteries",
        "note": "Hosted · fixed"
      },
      {
        "title": "On the Holy Spirit",
        "workKey": "ambrose-holy-spirit",
        "note": "Hosted"
      }
    ]
  },
  "jerome": {
    "id": "jerome",
    "name": "St. Jerome",
    "centralQuestion": "How can the Church hear Scripture accurately across languages without losing its living voice?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Jerome_Writing-Caravaggio_(1605-6).jpg",
    "dates": "c. 347–420",
    "tradition": "early",
    "period": "Latin Doctors",
    "roles": [
      "Priest",
      "Doctor of the Church",
      "Biblical translator"
    ],
    "epithet": "Translator of the Vulgate, Doctor of the Church",
    "visual": {
      "preset": "augustine"
    },
    "bio": [
      "Jerome, the greatest linguist among the Latin Fathers, produced the Vulgate translation of Scripture from Hebrew and Greek. He lived as an ascetic in Bethlehem and corresponded widely.",
      "Irascible and learned, he defended the Hebrew text against exclusive reliance on the Septuagint and left commentaries that fed medieval exegesis."
    ],
    "concepts": [
      "Vulgate",
      "Hebrew truth",
      "Asceticism",
      "Scripture",
      "Origenism controversy"
    ],
    "opinions": [
      {
        "id": "scripture",
        "title": "On the Hebrew Truth",
        "thesis": "The Old Testament is to be translated from the Hebrew; the Church should not be confined to the Greek alone.",
        "tags": [
          "Biblical studies"
        ],
        "paragraphs": [
          "Jerome's appeal to the hebraica veritas was controversial but decisive for the Latin Bible. His Vulgate became the standard Western text for a millennium.",
          "He also insisted on the value of the original languages for serious theological work."
        ]
      }
    ],
    "influences": [
      {
        "name": "Origen",
        "figureId": "origen"
      },
      {
        "name": "Hebrew teachers in Palestine"
      }
    ],
    "influenced": [
      {
        "name": "Medieval Western exegesis"
      },
      {
        "name": "Renaissance humanists"
      }
    ],
    "opponents": [
      {
        "name": "Rufinus",
        "note": "Origenist controversy"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Lives of Illustrious Men",
        "workKey": "jerome-viris",
        "note": "Hosted"
      },
      {
        "title": "Against Helvidius",
        "workKey": "jerome-helvidius",
        "note": "Hosted"
      },
      {
        "title": "Against Jovinian",
        "workKey": "jerome-jovinian"
      }
    ]
  },
  "cyril-alex": {
    "id": "cyril-alex",
    "name": "St. Cyril of Alexandria",
    "centralQuestion": "How can the Word who is truly God be truly born of Mary for the salvation of human nature?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Icon_St._Cyril_of_Alexandria.jpg",
    "dates": "c. 376–444",
    "tradition": "early",
    "period": "Christological Controversies",
    "roles": [
      "Patriarch of Alexandria",
      "Doctor of the Church"
    ],
    "epithet": "Patriarch of Alexandria, champion of the Theotokos",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Cyril of Alexandria (d. 444) fought Nestorius for the unity of the incarnate Word and the title Theotokos. NPNF and older translations carry his public-domain voice.",
      "One Son: the Word personally unites flesh to himself. Mary is Theotokos because the one born of her is the Son of God, not a man merely conjoined to the Word.",
      "The mia physis formula in Cyril’s usage aims at the one incarnate nature of the Word—unity of subject—not a fusion that erases humanity. Chalcedon and later reception negotiated this language carefully."
    ],
    "concepts": [
      "Hypostatic union",
      "Theotokos",
      "One incarnate nature of the Word",
      "Nestorian controversy"
    ],
    "opinions": [
      {
        "id": "incarnation",
        "title": "On the Unity of the Incarnate Word",
        "thesis": "The Word is the one subject of the incarnation; Mary is Theotokos.",
        "tags": [
          "Theotokos"
        ],
        "paragraphs": [
          "Nestorian division of subjects is refused. The one who suffered in the flesh is the same eternal Son.",
          "Theotokos guards the unity: she did not bear a mere man later associated with God.",
          "Communication of idioms follows: properties of either nature are said of the one person."
        ],
        "contrasts": [
          {
            "figureId": "leo",
            "topicKey": "chalcedon",
            "label": "Leo’s Tome"
          },
          {
            "figureId": "athanasius",
            "topicKey": "incarnation",
            "label": "Athanasius"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Athanasius",
        "figureId": "athanasius"
      }
    ],
    "influenced": [
      {
        "name": "Chalcedon and Oriental Orthodoxy"
      }
    ],
    "opponents": [
      {
        "name": "Nestorius",
        "note": "Patriarch of Constantinople, deposed at Ephesus"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "On the Unity of Christ (selection)",
        "workKey": "cyril-incarnation",
        "note": "Hosted"
      },
      {
        "title": "Commentary on John",
        "url": "https://www.newadvent.org/fathers/1015.htm",
        "note": "External"
      }
    ]
  },
  "leo": {
    "id": "leo",
    "name": "St. Leo the Great",
    "centralQuestion": "How does the one person of Christ in two natures secure both the truth of the Incarnation and the hope of salvation?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Greek_Fresco_of_Saint_Leo_I_Pope_of_Rome.jpg",
    "dates": "c. 400–461",
    "tradition": "early",
    "period": "Christological Controversies",
    "roles": [
      "Pope",
      "Doctor of the Church"
    ],
    "epithet": "Pope, Doctor of the Church",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "St. Leo the Great (d. 461) wrote the Tome to Flavian that Chalcedon received: one person, two natures, without confusion or division. NPNF translations are public domain.",
      "“The property of each nature and substance is preserved entire, and comes together into one person.” The same Son who is eternal with the Father is born in time of the Virgin.",
      "Christmas and Passion sermons press the exchange: the impassible takes a passible nature so that the passible may be healed."
    ],
    "concepts": [
      "Tome of Leo",
      "Two natures",
      "Papal authority",
      "Chalcedon"
    ],
    "opinions": [
      {
        "id": "chalcedon",
        "title": "On the Two Natures",
        "thesis": "Christ is one person in two natures, without confusion, change, division, or separation.",
        "tags": [
          "Tome"
        ],
        "paragraphs": [
          "Each nature keeps its property; both concur in one person. The Word does not absorb the flesh; the flesh is not a second subject.",
          "What the Tome refuses: a Christ who is only divine appearance, or only a God-bearing man, or a fused third thing.",
          "The pastoral edge is salvation: only if he is true God and true man is he the Mediator who can save."
        ],
        "contrasts": [
          {
            "figureId": "cyril-alex",
            "topicKey": "incarnation",
            "label": "Cyril"
          },
          {
            "figureId": "athanasius",
            "topicKey": "incarnation",
            "label": "Athanasius"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Augustine",
        "figureId": "augustine"
      },
      {
        "name": "Western tradition"
      }
    ],
    "influenced": [
      {
        "name": "Chalcedonian orthodoxy"
      },
      {
        "name": "Medieval papal theory"
      }
    ],
    "opponents": [
      {
        "name": "Eutyches",
        "note": "Monophysite extreme"
      },
      {
        "name": "Nestorianizing Antiochene extremes"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "The Tome of Leo",
        "workKey": "leo-tome",
        "note": "Hosted"
      },
      {
        "title": "Sermons (selection)",
        "workKey": "leo-sermons",
        "note": "Hosted · fixed"
      },
      {
        "title": "Sermon on the Nativity",
        "workKey": "leo-nativity",
        "note": "Hosted"
      }
    ]
  },
    "maximus": {
    "id": "maximus",
    "name": "St. Maximus the Confessor",
    "centralQuestion": "How does the incarnate Word recapitulate and heal the whole of human nature and history without abolishing the distinction of natures and wills?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Maximus_the_Confessor.jpg",
    "dates": "c. 580–662",
    "tradition": "early",
    "period": "Byzantine / Late Patristic",
    "roles": [
      "Monk",
      "Confessor",
      "Theologian of the two wills"
    ],
    "epithet": "The Confessor who sealed the Chalcedonian settlement by defending two natural wills in Christ against imperial monothelitism.",
    "intellectualPortrait": {
      "question": "What was Maximus trying to hold together?",
      "arc": [
        "Logos",
        "Logoi",
        "Incarnation",
        "Wills",
        "Theosis",
        "Freedom",
        "Love",
        "Recapitulation"
      ],
      "paragraphs": [
        {
          "label": "Logos",
          "text": "The one Logos is the principle of all that is. Every creature exists by a logos—an inner reason or intention—that is a participation in the divine Logos. Creation is therefore already ordered toward the Word; it is not a neutral stage onto which salvation is later imposed."
        },
        {
          "label": "Logoi",
          "text": "The logoi of beings are the eternal intentions of God for each creature. To know a thing truly is to see it in its logos, and to see all logoi gathered in the one Logos. Contemplation is not escape from the world but the recovery of the world’s true order."
        },
        {
          "label": "Incarnation",
          "text": "The Word becomes flesh so that the logoi may be fulfilled and the divisions that fracture human existence healed. The Incarnation is not a temporary remedy; it is the permanent union of the divine and human natures in one hypostasis without confusion or separation."
        },
        {
          "label": "Wills",
          "text": "If there is only one will in Christ, either the human nature is incomplete or the divine will is compromised. Maximus insists that a complete human nature includes a natural human will. The will is not a rival ego but the natural capacity of the nature to desire its proper end. In Christ the human will is deified without being destroyed."
        },
        {
          "label": "Theosis",
          "text": "Deification is the fulfillment of the logoi: the creature becomes by grace what God is by nature, while remaining creature. The movement is not absorption but reciprocal indwelling. Love is the form of this exchange."
        },
        {
          "label": "Freedom",
          "text": "True freedom is not the power of arbitrary choice (gnomic will) but the settled orientation of the natural will toward God. In the fallen state the gnomic will hesitates and deliberates; in the deified state the natural will moves without hesitation toward the Good."
        },
        {
          "label": "Love",
          "text": "The Centuries on Charity present love as the bond that unites the virtues and the goal of the ascetic life. Love of God and love of neighbor are not sequential stages but one movement: the one who loves God truly loves every person as the image of God."
        },
        {
          "label": "Recapitulation",
          "text": "Christ recapitulates every stage of human life and every division that has fractured it—sex, paradise and earth, heaven and earth, created and uncreated. The healing is cosmic in scope because the fall was cosmic in effect."
        }
      ]
    },
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. Maximus the Confessor (c. 580–662) was a monk of Constantinopolitan formation who spent his later life in exile and mutilation for refusing the imperial doctrine of one will in Christ. His thought gathers the Cappadocian and Dionysian inheritance into a comprehensive vision of the Logos, the logoi of beings, and the two natural wills.",
      "Against monothelitism he argued that a complete human nature includes a natural human will; otherwise the Incarnation is incomplete and the healing of human freedom is impossible. The same logic undergirds his teaching on theosis: the creature is deified by participation while remaining creature.",
      "Quotations and positions below draw on the public-domain tradition of the Ambigua, the Questions to Thalassius, and the Centuries on Charity."
    ],
    "concepts": [
      "Two wills (Dyothelitism)",
      "Logoi of beings",
      "Theosis",
      "Natural and gnomic will",
      "Recapitulation",
      "Love as the bond of the virtues",
      "Cosmic liturgy"
    ],
    "opinions": [
      {
        "id": "two-wills",
        "title": "On the Two Natural Wills in Christ",
        "thesis": "Christ has two natural wills, divine and human, corresponding to his two natures; the human will is deified without being abolished.",
        "tags": [
          "Dyothelitism",
          "Against Monothelitism"
        ],
        "paragraphs": [
          "A nature without its natural will is incomplete. If the human will is absent from Christ, the human nature assumed is not the full humanity that needs healing.",
          "The natural will is the capacity of a nature to desire its proper end. It is not a second person or a rival center of choice. In Christ the human will is fully deified and moves in perfect harmony with the divine will, never opposing it.",
          "Monothelitism, by collapsing the wills, either diminishes the humanity or confuses the natures. Maximus’s confession cost him his tongue and his right hand; the Sixth Ecumenical Council later confirmed the doctrine."
        ],
        "contrasts": [
          {
            "figureId": "cyril-alex",
            "topicKey": "incarnation",
            "label": "Cyril on the one subject"
          }
        ]
      },
      {
        "id": "logoi",
        "title": "On the Logoi of Beings",
        "thesis": "Every creature exists by a logos that is a participation in the one Logos; contemplation recovers the world’s true order in the Word.",
        "tags": [
          "Ambigua",
          "Cosmology"
        ],
        "paragraphs": [
          "The logoi are the eternal intentions of God for each being. They are not independent forms but the differentiated expression of the one Logos.",
          "To know a creature truly is to see it in its logos and to see all logoi gathered in Christ. The fall is the loss of this vision; the ascetic and contemplative life is its recovery.",
          "Creation is therefore already ordered toward the Incarnation. The Word does not enter a foreign world; he fulfills the world he has always been speaking."
        ],
        "contrasts": []
      },
      {
        "id": "theosis",
        "title": "On Theosis",
        "thesis": "The creature becomes by grace what God is by nature, while remaining creature; the exchange is reciprocal indwelling in love.",
        "tags": [
          "Deification"
        ],
        "paragraphs": [
          "Deification is the fulfillment of the logoi. It is not the erasure of the creature but the creature’s full participation in the divine life without confusion of essence.",
          "The movement is reciprocal: God becomes human so that the human may become divine by grace. Love is the form of this exchange.",
          "The same logic that requires two wills also requires that deification leave the natural powers intact and elevated rather than replaced."
        ],
        "contrasts": [
          
        ]
      },
      {
        "id": "charity",
        "title": "On Charity",
        "thesis": "Love is the bond that unites the virtues and the goal of the ascetic life; love of God and neighbor are one movement.",
        "tags": [
          "Centuries on Charity"
        ],
        "paragraphs": [
          "The four centuries present love as the fulfillment of the commandments and the form of all the virtues. Without love the other virtues remain incomplete.",
          "Love of God and love of neighbor are not sequential stages. The one who loves God truly sees every person as the image of God and cannot hate.",
          "The ascetic struggle against the passions is ordered toward this freedom of love; the goal is not mere self-mastery but the capacity to love without partiality."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      {
        "name": "St. Gregory Nazianzen",
        "figureId": "gregory-nazianzen",
        "note": "The Ambigua are difficulties on Gregory’s orations"
      },
      {
        "name": "Ps.-Dionysius",
        "note": "Hierarchy, theurgy, and the language of participation"
      },
      {
        "name": "The Cappadocians",
        "note": "Trinitarian and anthropological inheritance"
      },
      {
        "name": "St. Cyril of Alexandria",
        "figureId": "cyril-alex"
      }
    ],
    "influenced": [
      {
        "name": "St. John of Damascus",
        "figureId": "damascene"
      },
      {
        "name": "The Byzantine theological tradition",
        "note": "Dyothelitism and the logoi become permanent landmarks"
      }
    ],
    "opponents": [
      {
        "name": "Monothelites",
        "note": "Imperial and patriarchal policy of one will in Christ"
      }
    ],
    "controversies": [
      {
        "title": "The Monothelite controversy",
        "summary": "Under pressure for political unity with the non-Chalcedonians, the empire promoted the doctrine of one will in Christ. Maximus refused, arguing that a complete human nature requires a natural human will. He was tried, exiled, and mutilated. The Sixth Ecumenical Council (680–681) later confirmed the two wills."
      }
    ],
    "primarySources": [
      { "title": "Mystagogy", "workKey": "maximus-mystagogy", "note": "Hosted" },
      { "title": "Two Hundred Chapters on Theology", "workKey": "maximus-theology-chapters", "note": "Hosted" }
    ]
  },
  "damascene": {
    "id": "damascene",
    "name": "St. John of Damascus",
    "centralQuestion": "How can the Church's confession of the Incarnation be safeguarded in both word and image?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/Ioann_Damaskin_ikona.jpg",
    "dates": "c. 675–749",
    "tradition": "early",
    "period": "Byzantine Theology",
    "roles": [
      "Monk",
      "Doctor of the Church",
      "Hymnographer"
    ],
    "epithet": "Last of the Greek Church Fathers, hymnographer",
    "visual": {
      "preset": "byzantine"
    },
    "bio": [
      "St. John of Damascus (c. 675–749) wrote the Fountain of Knowledge, including the Exposition of Faith, a systematic summary of Eastern dogma. Older English translations exist in the public domain (NPNF).",
      "On the icons: the honor paid to the image passes to the prototype. The incarnation makes limited material representation possible without idolatry.",
      "The Exposition orders Trinity, creation, incarnation, and sacraments for teaching. He is the archive’s witness to mature Chalcedonian orthodoxy in a synthetic handbook."
    ],
    "concepts": [
      "Exact Exposition",
      "Icons",
      "Trinity",
      "Incarnation",
      "Islam"
    ],
    "opinions": [
      {
        "id": "icons",
        "title": "On Holy Images",
        "thesis": "Because the Word took flesh, material images of Christ may be venerated; honor passes to the prototype.",
        "tags": [
          "Iconoclasm"
        ],
        "paragraphs": [
          "Idolatry worships as God what is not God. Veneration of icons is relative honor ordered to the persons depicted.",
          "The incarnation is decisive: the invisible became visible. To refuse all images can threaten the confession that he truly took flesh.",
          "The Seventh Ecumenical Council’s reception sealed this trajectory in the East."
        ],
        "contrasts": [
          {
            "figureId": "leo",
            "topicKey": "chalcedon",
            "label": "Leo on the incarnation"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "St. Maximus the Confessor",
        "figureId": "maximus"
      },
      {
        "name": "Greek Fathers"
      }
    ],
    "influenced": [
      {
        "name": "Eastern Orthodoxy",
        "note": "Standard dogmatic manual"
      },
      {
        "name": "St. Thomas Aquinas",
        "figureId": "aquinas",
        "note": "Latin reception"
      }
    ],
    "opponents": [
      {
        "name": "Iconoclasts",
        "note": "Byzantine imperial policy"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Exposition of Faith",
        "workKey": "damascene-faith",
        "note": "Hosted · Books I–III in TOC"
      }
    ]
  },
  "anselm": {
    "id": "anselm",
    "name": "St. Anselm of Canterbury",
    "centralQuestion": "How can reason, seeking understanding of faith, show why God became human for our salvation?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/anselm.jpg",
    "dates": "1033–1109",
    "tradition": "catholic",
    "period": "Early Scholasticism",
    "roles": [
      "Archbishop of Canterbury",
      "Doctor of the Church"
    ],
    "epithet": "Father of Scholasticism, ontological argument",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "St. Anselm of Canterbury (1033–1109) took as his program fides quaerens intellectum—faith seeking understanding. The Proslogion and Cur Deus Homo are available in public-domain English translations.",
      "From the Proslogion: God is “that than which nothing greater can be thought.” From Cur Deus Homo: only a God-man can render the satisfaction that restores honor and meets human need.",
      "“I do not seek to understand in order that I may believe, but I believe in order that I may understand.” The argument is embedded in prayer, not in pure reason founding faith from nowhere."
    ],
    "concepts": [
      "Ontological argument",
      "Satisfaction",
      "Faith seeking understanding",
      "Trinity"
    ],
    "opinions": [
      {
        "id": "incarnation",
        "title": "On Why God Became Man",
        "thesis": "Only a God-man can offer the satisfaction due for sin while restoring humanity from within.",
        "tags": [
          "Cur Deus Homo"
        ],
        "paragraphs": [
          "Sin is dishonor to God and a debt human beings cannot pay while also restoring themselves. Only a divine person can offer a satisfaction of infinite worth; only a human can offer it on behalf of humans.",
          "Hence the fittingness—and, given God’s purpose, the necessity—of the God-man. God provides what God requires; the Son wills the work freely.",
          "The “must” is the must of consistent goodness and wisdom, not an external force constraining God. Justice and mercy meet in one action."
        ],
        "contrasts": [
          {
            "figureId": "aquinas",
            "topicKey": "faith-reason",
            "label": "Aquinas on faith and reason"
          }]
      }
    ],
    "influences": [
      {
        "name": "Augustine",
        "figureId": "augustine"
      },
      {
        "name": "Benedictine tradition"
      }
    ],
    "influenced": [
      {
        "name": "St. Thomas Aquinas",
        "figureId": "aquinas"
      },
      {
        "name": "Later medieval and Reformation soteriology"
      }
    ],
    "opponents": [
      {
        "name": "Roscelin",
        "note": "Trinitarian controversy"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Selected Writings",
        "workKey": "anselm-writings",
        "note": "Proslogion · Cur Deus Homo"
      },
      {
        "title": "Proslogion",
        "workKey": "anselm-proslogion",
        "note": "Hosted"
      },
      {
        "title": "Cur Deus Homo",
        "workKey": "anselm-cur-deus-homo",
        "note": "Hosted"
      }
    ]
  },
  "bonaventure": {
    "id": "bonaventure",
    "name": "St. Bonaventure",
    "centralQuestion": "How does the mind's journey into God pass through creation, the soul, and grace without leaving the crucified Christ?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/bonaventure.jpg",
    "dates": "c. 1217–1274",
    "tradition": "catholic",
    "period": "High Scholasticism",
    "roles": [
      "Franciscan Minister General",
      "Cardinal",
      "Doctor of the Church"
    ],
    "epithet": "Seraphic Doctor, Franciscan theologian",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "Bonaventure (c. 1217–1274), Franciscan minister general, mapped the mind’s journey into God through vestiges in creation, the image in the soul, and the conformity of grace—always through the Crucified. The Itinerarium is available in public-domain English.",
      "The six-winged seraph of Francis’s vision on La Verna fixes the journey: speculation without the cross is incomplete. The end is darkness of excess light and love that passes understanding.",
      "Poverty of spirit is epistemological as well as social: the mind that clings to its own lights cannot enter the excess of light at the summit."
    ],
    "concepts": [
      "Itinerarium",
      "Exemplarism",
      "Christ the center",
      "Illumination",
      "Franciscan theology"
    ],
    "opinions": [
      {
        "id": "ascent",
        "title": "On the Journey into God",
        "thesis": "The mind rises through creation, soul, and grace, but only through the Crucified.",
        "tags": [
          "Itinerarium"
        ],
        "paragraphs": [
          "Outside ourselves: vestiges of God in the world. Within: the image in memory, understanding, will. Above: grace reforming the image toward the exemplar.",
          "Christ is the medium of all knowledge of God in the present economy. The seraph in the form of the Crucified measures theological wisdom by love of the passion.",
          "The excess of light at the end is the limit of finite concepts before the infinite—not the refusal to use reason along the way."
        ],
        "contrasts": [
          {
            "figureId": "aquinas",
            "topicKey": "faith-reason",
            "label": "Aquinas"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Augustine",
        "figureId": "augustine"
      },
      {
        "name": "St. Francis of Assisi"
      },
      {
        "name": "Anselm",
        "figureId": "anselm"
      }
    ],
    "influenced": [
      {
        "name": "Franciscan school"
      },
      {
        "name": "Later mystical writers"
      }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      {
        "title": "Journey of the Mind into God",
        "workKey": "bonaventure-itinerarium",
        "note": "Hosted · full path chapters"
      },
      {
        "title": "Breviloquium",
        "note": "Short summa of theology"
      },
      {
        "title": "Life of St Francis",
        "note": "Legenda maior"
      }
    ]
  },
  "teresa": {
    "id": "teresa",
    "name": "St. Teresa of Ávila",
    "centralQuestion": "How can friendship with God in prayer grow into union when consolation is withdrawn?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/teresa.jpg",
    "dates": "1515–1582",
    "tradition": "catholic",
    "period": "Catholic Reformation / Carmelite reform",
    "roles": [
      "Carmelite reformer",
      "Mystic",
      "Doctor of the Church"
    ],
    "epithet": "Carmelite mystic, Doctor of the Church",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "St. Teresa of Ávila (1515–1582) defined mental prayer as “intimate sharing between friends… taking time frequently to be alone with Him who we know loves us” (Life / Way of Perfection tradition; English translations in the public domain for older editions).",
      "The Interior Castle maps growth under ordinary conditions: self-knowledge, struggle, detachment, and union as gift. Dryness tests whether the soul loves the Giver or the gifts.",
      "She subjects experiences to confessors and the Church’s rule of faith. The Carmelite reform is the institutional form of the teaching: prayer under a rule, with ordinary work."
    ],
    "concepts": [
      "Interior Castle",
      "Prayer",
      "Mystical marriage",
      "Reform",
      "Spiritual growth"
    ],
    "opinions": [
      {
        "id": "prayer",
        "title": "On Mental Prayer and Union",
        "thesis": "Friendship with God grows through determined prayer even when consolation is withdrawn; union is gift, not technique.",
        "tags": [
          "Interior Castle"
        ],
        "paragraphs": [
          "Mental prayer is intimate sharing between friends—time spent with the One we know loves us. Relationship precedes method; fidelity remains.",
          "The mansions begin with self-knowledge and humility. Without humility, inner rooms become occasions of pride.",
          "When sensible sweetness is withdrawn, the soul learns to love the Giver. Union is compatible with ordinary duties; extraordinary phenomena are neither goal nor measure."
        ],
        "contrasts": [
          {
            "figureId": "john-cross",
            "topicKey": "night",
            "label": "St. John of the Cross on the night"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Augustine",
        "figureId": "augustine"
      },
      {
        "name": "Franciscan and Carmelite sources"
      }
    ],
    "influenced": [
      {
        "name": "St. John of the Cross",
        "figureId": "john-cross"
      },
      {
        "name": "Catholic spiritual theology"
      }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      {
        "title": "The Life of Teresa of Jesus",
        "workKey": "teresa-life",
        "note": "Hosted selection"
      },
      {
        "title": "The Interior Castle",
        "workKey": "teresa-interior-castle",
        "note": "Hosted selection"
      },
      {
        "title": "The Way of Perfection",
        "note": "For the reform"
      }
    ]
  },
  "john-cross": {
    "id": "john-cross",
    "name": "St. John of the Cross",
    "centralQuestion": "How is the soul purified for union with God when every sensible and spiritual prop is stripped away?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/john-cross.jpg",
    "dates": "1542–1591",
    "tradition": "catholic",
    "period": "Catholic Reformation / Carmelite reform",
    "roles": [
      "Carmelite",
      "Mystic",
      "Doctor of the Church"
    ],
    "epithet": "Carmelite mystic, Doctor of the Church",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "St. John of the Cross (1542–1591) described the active and passive nights that strip sensory and spiritual attachments so that faith, hope, and love remain. Older English translations of the Ascent and Dark Night are in the public domain.",
      "The path of nada is ordered to the todo that is God. Detachment is not stoic emptiness; it is liberty for the Beloved. Union is transformation in love, not annihilation of the person.",
      "The dark night is distinguished from ordinary melancholy by its fruits: humility, love, and service. Directors are to test spirits."
    ],
    "concepts": [
      "Dark Night",
      "Ascent of Mount Carmel",
      "Union with God",
      "Nothingness",
      "Poetry"
    ],
    "opinions": [
      {
        "id": "night",
        "title": "On the Dark Night",
        "thesis": "The soul is purified for union when sensible and spiritual props are stripped; faith becomes the proximate means.",
        "tags": [
          "Ascent",
          "Dark Night"
        ],
        "paragraphs": [
          "Active night: what the soul does by mortification and detachment. Passive night: what God does by withdrawing lights and consolations. Both sensory and spiritual levels are addressed.",
          "In the night, particular ideas and feelings fail as means. Faith—dark to the intellect in one sense—becomes the proximate means of union, with hope and love.",
          "The faculties are not destroyed; they are ordered. Memory hopes in God, intellect rests in faith, will loves the Beloved rather than the self’s satisfaction."
        ],
        "contrasts": [
          {
            "figureId": "teresa",
            "topicKey": "prayer",
            "label": "Teresa on prayer"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "St. Teresa of Ávila",
        "figureId": "teresa"
      },
      {
        "name": "Pseudo-Dionysius"
      },
      {
        "name": "Scholastic sources"
      }
    ],
    "influenced": [
      {
        "name": "Catholic and ecumenical mystical theology"
      }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      {
        "title": "Dark Night & Ascent",
        "workKey": "john-cross-writings",
        "note": "Hosted · parts in TOC"
      },
      {
        "title": "Spiritual Canticle",
        "note": "Bride and Bridegroom"
      },
      {
        "title": "Living Flame of Love",
        "note": "Union in love"
      }
    ]
  },
  "newman": {
    "id": "newman",
    "name": "St. John Henry Newman",
    "centralQuestion": "How does the living Church develop doctrine over time without betraying the apostolic deposit?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "https://commons.wikimedia.org/wiki/Special:FilePath/John_Henry_Newman_by_Sir_John_Everett_Millais%2C_1st_Bt.jpg",
    "dates": "1801–1890",
    "tradition": "catholic",
    "period": "Modern Catholic / Oxford Movement",
    "roles": [
      "Cardinal",
      "Theologian",
      "Convert"
    ],
    "epithet": "Cardinal, theorist of the development of doctrine",
    "visual": {
      "preset": "scholastic"
    },
    "bio": [
      "St. John Henry Newman (1801–1890) traced the development of doctrine and the grammar of assent. His major works are not all public domain in every edition; the archive uses careful short quotation from PD-status texts where available and clear paraphrase where not.",
      "Development: authentic growth preserves type, continuity of principles, and power of assimilation—corruptions break the type.",
      "The illative sense names how real assent is reached in concrete reasoning. He is kept as a modern doctor of conscience and development within the Catholic reception."
    ],
    "concepts": [
      "Development of doctrine",
      "Assent",
      "Conscience",
      "University",
      "Via media"
    ],
    "opinions": [
      {
        "id": "development",
        "title": "On Development of Doctrine",
        "thesis": "True developments preserve the type of the original idea; corruptions reverse or shatter it.",
        "tags": [
          "Essay on Development"
        ],
        "paragraphs": [
          "Newman’s notes of a true development include preservation of type, continuity of principles, logical sequence, and chronic vigor.",
          "The claim answers both Protestant charges of Roman novelty and rationalist charges that dogma is static fiction.",
          "Assent in concrete matters is not reducible to formal syllogism alone; the illative sense gathers probabilities into certitude."
        ],
        "contrasts": [
          {
            "figureId": "aquinas",
            "topicKey": "faith-reason",
            "label": "Aquinas on faith and reason"
          }
        ]
      }
    ],
    "influences": [
      {
        "name": "Church Fathers"
      },
      {
        "name": "Anglican divines"
      }
    ],
    "influenced": [
      {
        "name": "Second Vatican Council era theology"
      },
      {
        "name": "Modern Catholic thought"
      }
    ],
    "opponents": [
      {
        "name": "Liberal Protestantism and ultramontane extremes",
        "note": "Critiqued both"
      }
    ],
    "controversies": [],
    "primarySources": [
      {
        "title": "Apologia pro Vita Sua",
        "workKey": "newman-apologia",
        "note": "Hosted"
      },
      {
        "title": "Essay on the Development of Christian Doctrine",
        "note": "1845"
      },
      {
        "title": "An Essay in Aid of a Grammar of Assent",
        "note": "1870"
      },
      {
        "title": "Parochial and Plain Sermons",
        "note": "Anglican period"
      },
      {
        "title": "The Idea of a University",
        "note": "Discourses"
      },
      {
        "title": "Letter to the Duke of Norfolk",
        "note": "On conscience and the Pope"
      }
    ]
  },
  "bernard": {
    "id": "bernard",
    "name": "St. Bernard of Clairvaux",
    "centralQuestion": "How is the soul ordered to God by the degrees of love, and what is the end of loving God for His own sake?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/bernard.jpg",
    "dates": "1090–1153",
    "tradition": "catholic",
    "period": "High Middle Ages",
    "roles": ["Cistercian abbot", "Doctor of the Church"],
    "epithet": "Mellifluous Doctor, reformer and contemplative",
    "visual": { "preset": "scholastic" },
    "bio": [
      "St. Bernard of Clairvaux (1090–1153) entered Cîteaux and founded Clairvaux, becoming the great voice of the Cistercian reform. His On Loving God and Sermons on the Song of Songs map the ascent of charity and the soul’s search for the Word.",
      "He advised popes, opposed Abelard’s excesses, and preached the Second Crusade. Contemplation and public action were, for him, one charity ordered to the Bridegroom’s honor in His Bride.",
      "“The reason for loving God is God; the measure is to love without measure.” The degrees of love culminate in loving God for His own sake."
    ],
    "concepts": ["Charity", "Contemplation", "Monastic reform", "Mystical theology"],
    "opinions": [{
      "id": "loving-god",
      "title": "On Loving God",
      "thesis": "The soul is ordered to God by ascending degrees of love that culminate in loving Him for His own sake.",
      "tags": ["De diligendo Deo"],
      "paragraphs": [
        "Bernard maps four degrees: love of self for self’s sake; love of God for one’s own benefit; love of God for God’s sake; and, rarely in this life, love of self only for God’s sake.",
        "Finite goods are not despised; they are ordered. The soul that stops at any creature remains restless. Charity is the ordered love that finds its rest in God alone."
      ],
      "contrasts": [{ "figureId": "augustine", "topicKey": "will", "label": "Augustine on the restless will" }]
    }],
    "influences": [{ "name": "Augustine", "figureId": "augustine" }, { "name": "Benedict / Cistercian reform" }],
    "influenced": [{ "name": "Cistercian tradition" }, { "name": "Later mystical theology" }],
    "opponents": [{ "name": "Peter Abelard" }],
    "controversies": [{ "name": "Abelard", "summary": "Bernard secured Abelard’s censure for theological excesses while the deeper issues of faith and reason continued in the schools." }],
    "primarySources": [
      { "title": "On Loving God" },
      { "title": "Sermons on the Song of Songs" },
      { "title": "On Consideration" }
    ]
  },
  "albert": {
    "id": "albert",
    "name": "St. Albert the Great",
    "centralQuestion": "How can the whole of natural knowledge and revealed theology be held together under one wisdom whose source is God?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/albert.jpg",
    "dates": "c. 1200–1280",
    "tradition": "catholic",
    "period": "High Scholasticism",
    "roles": ["Dominican", "Bishop of Regensburg", "Doctor of the Church"],
    "epithet": "Universal Doctor, teacher of Aquinas",
    "visual": { "preset": "scholastic" },
    "bio": [
      "St. Albert the Great (c. 1200–1280) taught in Paris and Cologne and numbered Thomas Aquinas among his students. His range—logic, natural philosophy, ethics, metaphysics, and theology—earned him the title Doctor Universalis.",
      "He received Aristotle without fear and ordered natural knowledge to the sacred page. Grace elevates nature without destroying it; the sciences investigate a creation intelligible because it proceeds from the divine intellect.",
      "Without Albert the Aristotelian turn of the thirteenth century would have lacked its great teacher. Aquinas is the greater architect; Albert opened the library."
    ],
    "concepts": ["Faith and reason", "Natural philosophy", "Grace and nature", "Aristotelian reception"],
    "opinions": [{
      "id": "nature-grace",
      "title": "On Nature and Grace",
      "thesis": "Natural knowledge and revealed theology are ordered to one wisdom; grace elevates nature without destroying it.",
      "tags": ["Doctor Universalis"],
      "paragraphs": [
        "Albert treats the natural sciences as the investigation of a creation that is intelligible because it proceeds from God. They are not a threat to faith.",
        "The natural powers are real; they are not sufficient for the beatific end. The distinction is the grammar of a creation ordered to a supernatural destiny that only gift can confer."
      ],
      "contrasts": [{ "figureId": "aquinas", "topicKey": "faith-reason", "label": "Aquinas on faith and reason" }]
    }],
    "influences": [{ "name": "Aristotle" }, { "name": "Augustine", "figureId": "augustine" }, { "name": "Pseudo-Dionysius" }],
    "influenced": [{ "name": "Thomas Aquinas", "figureId": "aquinas" }, { "name": "Dominican school" }],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Commentary on the Sentences" },
      { "title": "Summa Theologiae (incomplete)" },
      { "title": "De Animalibus" }
    ]
  },
  "scotus": {
    "id": "scotus",
    "name": "Bl. John Duns Scotus",
    "centralQuestion": "Was Mary preserved from original sin from the first instant of her conception by a preservative redemption ordered to the merits of Christ?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/scotus.jpg",
    "dates": "c. 1266–1308",
    "tradition": "catholic",
    "period": "High Scholasticism",
    "roles": ["Franciscan", "Subtle Doctor"],
    "epithet": "Subtle Doctor, defender of the Immaculate Conception",
    "visual": { "preset": "scholastic" },
    "bio": [
      "Bl. John Duns Scotus (c. 1266–1308) taught at Oxford and Paris. The Ordinatio and the Paris Reportatio develop a metaphysics of the formal distinction, a primacy of the will in the order of love, and the absolute primacy of Christ.",
      "His most celebrated contribution is the defense of the Immaculate Conception: a perfect Redeemer can redeem by preserving from the fall as well as by healing after it. Potuit, decuit, ergo fecit.",
      "The Church’s definition of the Immaculate Conception receives the Scotist line as the theological path that made the dogma defensible. He was beatified by John Paul II in 1993."
    ],
    "concepts": ["Immaculate Conception", "Primacy of Christ", "Formal distinction", "Primacy of the will"],
    "opinions": [{
      "id": "immaculate",
      "title": "On the Immaculate Conception",
      "thesis": "Mary was preserved from original sin from the first instant by a preservative redemption through Christ’s foreseen merits.",
      "tags": ["Potuit, decuit, ergo fecit"],
      "paragraphs": [
        "A perfect redeemer can redeem not only by healing what is fallen but by preserving from the fall. Mary is redeemed more perfectly by being kept from original sin through the foreseen merits of Christ.",
        "The argument is one of fittingness ordered to the excellence of the Redeemer and the dignity of the Mother—not a formal demonstration from absolute necessity."
      ],
      "contrasts": [{ "figureId": "aquinas", "topicKey": "mary", "label": "Aquinas on the sanctification of Mary" }]
    }],
    "influences": [{ "name": "Augustine", "figureId": "augustine" }, { "name": "Anselm", "figureId": "anselm" }, { "name": "Bonaventure", "figureId": "bonaventure" }],
    "influenced": [{ "name": "Franciscan school" }, { "name": "Later Mariology" }],
    "opponents": [],
    "controversies": [{ "name": "Immaculate Conception debates", "summary": "Scotus’s preservative-redemption argument became the decisive Scholastic path toward the later definition." }],
    "primarySources": [
      { "title": "Ordinatio (Opus Oxoniense)" },
      { "title": "Reportatio Parisiensis" },
      { "title": "De Primo Principio" }
    ]
  },
  "bellarmine": {
    "id": "bellarmine",
    "name": "St. Robert Bellarmine",
    "centralQuestion": "How is the Catholic faith to be defended from Scripture, the Fathers, and the Councils against the controversies of the Reformation?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/bellarmine.jpg",
    "dates": "1542–1621",
    "tradition": "catholic",
    "period": "Counter-Reformation",
    "roles": ["Jesuit", "Cardinal", "Doctor of the Church"],
    "epithet": "Controversist, Doctor of the Church",
    "visual": { "preset": "scholastic" },
    "bio": [
      "St. Robert Bellarmine (1542–1621) was the principal systematic apologete of the Counter-Reformation. His Disputationes de Controversiis ordered the disputed points—Scripture and tradition, the Church, the primacy, the sacraments—and answered from the sources.",
      "He defended the primacy of the Roman Pontiff and the visibility of the Church without making every papal act an irreformable definition. Beside the controversies he wrote the Mind’s Ascent to God, a work of contemplation.",
      "Declared a Doctor of the Church in 1931, he stands for a theology at once polemical when necessary and contemplative in its end."
    ],
    "concepts": ["Ecclesiology", "Primacy", "Scripture and Tradition", "Sacraments"],
    "opinions": [{
      "id": "church-primacy",
      "title": "On the Church and the Roman Pontiff",
      "thesis": "The Church is a visible society with a visible head; the Roman Pontiff holds primacy of jurisdiction ordered to the unity of the faith.",
      "tags": ["De Controversiis"],
      "paragraphs": [
        "Against a purely invisible Church, Bellarmine argues for the visible society founded by Christ, with hierarchy and sacraments. Against sola scriptura, the canon and the rule of faith are received through the Church.",
        "The primacy is defended from Scripture and the Fathers; the conditions of infallible teaching are distinguished from the ordinary exercise of authority."
      ],
      "contrasts": [{ "figureId": "newman", "topicKey": "development", "label": "Newman on development of doctrine" }]
    }],
    "influences": [{ "name": "Augustine", "figureId": "augustine" }, { "name": "Aquinas", "figureId": "aquinas" }, { "name": "Trent" }],
    "influenced": [{ "name": "Catholic apologetics" }, { "name": "Later ecclesiology" }],
    "opponents": [{ "name": "Reformation controversists" }],
    "controversies": [{ "name": "Counter-Reformation debates", "summary": "Bellarmine’s Controversies became the standard Catholic response on Scripture, Church, and primacy." }],
    "primarySources": [
      { "title": "Disputations on the Controversies" },
      { "title": "De Romano Pontifice" },
      { "title": "The Mind's Ascent to God" }
    ]
  },
  "suarez": {
    "id": "suarez",
    "name": "Francisco Suárez",
    "centralQuestion": "How can the efficacy of grace and the real freedom of the created will both be preserved in a single account of the divine aids?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/suarez.png",
    "dates": "1548–1617",
    "tradition": "catholic",
    "period": "Baroque Scholasticism",
    "roles": ["Jesuit", "Metaphysician", "Theologian"],
    "epithet": "Doctor Eximius",
    "visual": { "preset": "scholastic" },
    "bio": [
      "Francisco Suárez (1548–1617) was the leading Jesuit metaphysician and theologian of the late Scholastic period. His Metaphysical Disputations became the handbook of the schools; De Legibus shaped Catholic legal and political thought; his work on grace developed the congruist line in the de auxiliis controversy.",
      "He defines law as an ordinance of reason for the common good and treats natural law as participation in the eternal law. In the theology of grace he preserves both the priority of divine help and the freedom of the will through middle knowledge and congruous graces.",
      "The Congregatio de Auxiliis left the dispute with the Thomists undefined. Suárez remains a principal doctor of the Jesuit school and a major source for early modern philosophy."
    ],
    "concepts": ["Metaphysics", "Natural law", "Grace and freedom", "Congruism"],
    "opinions": [{
      "id": "grace-freedom",
      "title": "On Grace and Freedom",
      "thesis": "God gives graces fitted to circumstances in which He knows the will will consent, preserving both efficacy and freedom without physical premotion.",
      "tags": ["Congruism", "De auxiliis"],
      "paragraphs": [
        "Sufficient grace truly enables; efficacious grace is the grace under which consent occurs. Suárez explains the latter by congruity and middle knowledge rather than by a premotion that determines the act.",
        "Both poles of the dogma remain: grace is prior; the will is free. The mechanism is theology; the ridge is dogma."
      ],
      "contrasts": [{ "figureId": "aquinas", "topicKey": "grace", "label": "Thomist account of efficacious grace" }]
    }],
    "influences": [{ "name": "Aquinas", "figureId": "aquinas" }, { "name": "Molina" }, { "name": "Augustine", "figureId": "augustine" }],
    "influenced": [{ "name": "Jesuit school" }, { "name": "Early modern philosophy" }, { "name": "Catholic legal thought" }],
    "opponents": [{ "name": "Dominican Thomists (Báñez)" }],
    "controversies": [{ "name": "De auxiliis", "summary": "Suárez’s congruism was a principal Jesuit answer in the dispute left undefined by the Holy See." }],
    "primarySources": [
      { "title": "Metaphysical Disputations" },
      { "title": "De Legibus" },
      { "title": "De Gratia" }
    ]
  }
,
"giles-rome": {
    "id": "giles-rome",
    "name": "Giles of Rome",
    "centralQuestion": "How can Aristotelian philosophy serve an Augustinian account of grace, hierarchy, and the common good?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/giles-rome.jpg",
    "dates": "c. 1243–1316",
    "tradition": "medieval",
    "period": "High Scholasticism · Order of St. Augustine",
    "roles": [
      "Prior General of the Augustinians",
      "Archbishop of Bourges",
      "Doctor Fundatissimus"
    ],
    "epithet": "Doctor Fundatissimus of the Augustinian Order, whose political and metaphysical works shaped later scholastic Augustinianism.",
    "intellectualPortrait": {
      "question": "What was Giles trying to hold together?",
      "arc": ["Aristotle", "Augustine", "Grace", "Hierarchy", "Papacy", "Common good"],
      "paragraphs": [
        {
          "label": "Aristotle",
          "text": "Giles, a pupil of Aquinas, received Aristotle not as a rival to the Fathers but as an instrument. Form, potency, and the structure of the sciences become tools for clarifying questions Augustine had already posed about God, the soul, and ordered society."
        },
        {
          "label": "Augustine",
          "text": "His loyalty remains Augustinian: grace is prior; the will is wounded; the Church is the historical form of Christ’s body. Philosophy is ordered under theology, not set free as an autonomous court of appeal against revelation."
        },
        {
          "label": "Hierarchy",
          "text": "In De ecclesiastica potestate he argues a strong account of spiritual authority’s priority over temporal power. The political order is real and good, yet it is not ultimate; the care of souls and the keys of the Church claim a higher jurisdiction."
        },
        {
          "label": "Common good",
          "text": "Rule is justified by service of the common good under God. The ruler is not a private proprietor of the realm. Augustinian suspicion of pure self-love in politics remains: disordered desire in the prince damages the whole."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "University halls, Augustinian black habit, and the tension of throne and altar.",
      "motif": "Manuscript margins, mitre and book.",
      "typography": "scholastic"
    },
    "bio": [
      "Aegidius Romanus (Giles of Rome) entered the Order of the Hermits of St. Augustine and studied at Paris under Thomas Aquinas. He became a leading master of the Augustinian school and later prior general of the order (1292–1295).",
      "His commentary work and treatises range across metaphysics, theology, and politics. De regimine principum, written for the young Philip the Fair, became one of the most widely copied mirrors-of-princes of the later Middle Ages.",
      "As archbishop of Bourges he remained a public voice in the conflicts of Boniface VIII’s age. Later Augustinians called him Doctor Fundatissimus—the most firmly founded doctor—signaling his role as a founding scholastic authority for the order."
    ],
    "concepts": [
      "Ecclesiastical power",
      "Grace and nature",
      "Common good",
      "Augustinian scholasticism"
    ],
    "opinions": [
      {
        "id": "ecclesiastical-power",
        "title": "On Spiritual and Temporal Power",
        "thesis": "Spiritual authority has priority over temporal power because the care of souls and eternal end outrank earthly peace.",
        "tags": ["Politics", "Papacy"],
        "paragraphs": [
          "Giles does not deny the legitimacy of kings. He denies that temporal power is ultimate or unaccountable to the spiritual order.",
          "The Church’s jurisdiction is ordered to salvation; the prince’s is ordered to temporal peace. When they conflict over the higher end, the lower yields.",
          "This is an Augustinian political instinct: cities are judged by the love that founds them—love of God or love of self."
        ],
        "contrasts": [
          { "figureId": "aquinas", "topicKey": "church", "label": "Aquinas" },
          { "figureId": "augustine", "topicKey": "church", "label": "Augustine" }
        ]
      },
      {
        "id": "grace-nature",
        "title": "On Grace and Intellectual Life",
        "thesis": "Philosophy prepares and serves theology; it does not replace grace as the principle of return to God.",
        "tags": ["Grace", "Scholastic method"],
        "paragraphs": [
          "Giles inherits both Aristotelian method and Augustinian dependence on grace.",
          "Study is itself a work of ordered love when directed beyond curiosity to wisdom and charity."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "St. Thomas Aquinas", "figureId": "aquinas" },
      { "name": "Aristotle" }
    ],
    "influenced": [
      { "name": "Later Augustinian school" },
      { "name": "Medieval political theology" },
      { "name": "Gregory of Rimini" }
    ],
    "opponents": [
      { "name": "Extreme defenders of pure royal autonomy", "note": "In the Boniface VIII conflicts" }
    ],
    "controversies": [
      {
        "id": "boniface-philip",
        "title": "Church and Crown under Boniface VIII",
        "summary": "Giles’s strong papalism belonged to the same generation as Unam Sanctam and the struggle with Philip the Fair."
      }
    ],
    "primarySources": [
      { "title": "De ecclesiastica potestate", "note": "On ecclesiastical power" },
      { "title": "De regimine principum", "note": "Mirror of princes for Philip IV" },
      { "title": "Theoremata de esse et essentia", "note": "Metaphysical theses" }
    ]
  },
  "nicholas-tolentine": {
    "id": "nicholas-tolentine",
    "name": "St. Nicholas of Tolentine",
    "centralQuestion": "How does Augustinian common life become a ministry of intercession for the living and the dead?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/nicholas-tolentine.jpg",
    "dates": "1245–1305",
    "tradition": "medieval",
    "period": "Medieval Augustinian reform",
    "roles": [
      "Augustinian friar",
      "Preacher",
      "Patron of the Holy Souls"
    ],
    "epithet": "Wonder-working Augustinian of Tolentino, invoked especially for the souls in purgatory.",
    "intellectualPortrait": {
      "question": "What form did Augustinian holiness take in Nicholas?",
      "arc": ["Conversion", "Common life", "Penance", "Preaching", "Purgatory", "Charity"],
      "paragraphs": [
        {
          "label": "Conversion",
          "text": "Nicholas’s vocation is Augustinian not by speculation but by a life ordered under the Rule: shared prayer, poverty, and the restless heart turned toward God in the cloister and the street."
        },
        {
          "label": "Penance",
          "text": "His austerity is not self-hatred. It is participation in Christ’s passion for the sake of sinners—an applied theology of the Cross in daily mortification and intercession."
        },
        {
          "label": "Purgatory",
          "text": "Popular devotion remembers him as advocate of the holy souls. The Augustinian sense of unfinished purification after death meets pastoral charity: the Church on earth is not cut off from those being made ready for the vision of God."
        },
        {
          "label": "Preaching",
          "text": "As a mendicant preacher he translates interior conversion into public call to repentance—Augustine’s restless heart spoken to the towns of the Marches."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Umbrian light, black Augustinian habit, star and lily of popular devotion.",
      "motif": "Bread of the poor, star on the breast.",
      "typography": "meditative"
    },
    "bio": [
      "Nicholas was born near Ancona in 1245 and entered the Hermits of St. Augustine as a young man. He lived most of his religious life at Tolentino, where his preaching, confessions, and care for the poor made him a local apostle.",
      "Witnesses after his death (10 September 1305) testified to a life of severe fasting, night prayer, and extraordinary charity. He was canonized by Eugene IV in 1446—the first Augustinian friar raised to the altars.",
      "Iconography often shows him with a star, a lily, or bread for the hungry. The Church names him among the principal patrons of the souls in purgatory, binding Augustinian eschatology to popular intercession."
    ],
    "concepts": [
      "Purgatory",
      "Intercession",
      "Augustinian Rule",
      "Penitential life"
    ],
    "opinions": [
      {
        "id": "intercession-dead",
        "title": "On Prayer for the Dead",
        "thesis": "Charity does not end at death; the living assist the dead by prayer, sacrifice, and penance in the communion of saints.",
        "tags": ["Purgatory", "Charity"],
        "paragraphs": [
          "Nicholas’s cult focuses a doctrine already Catholic: the Church’s prayer helps those undergoing purification.",
          "Augustinian spirituality here is communal. The friar’s penance is not private perfectionism but solidarity with sinners still on the way."
        ],
        "contrasts": [
          { "figureId": "augustine", "topicKey": "purgatory", "label": "Augustine" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of St. Augustine" }
    ],
    "influenced": [
      { "name": "Augustinian popular piety" },
      { "name": "Devotion to the holy souls" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Acts of canonization (Eugene IV, 1446)", "note": "Process and bull" },
      { "title": "Medieval lives and legendaria", "note": "Local Umbrian tradition" }
    ]
  },
  "thomas-villanova": {
    "id": "thomas-villanova",
    "name": "St. Thomas of Villanova",
    "centralQuestion": "How does Augustinian interior poverty become concrete mercy toward the poor?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/thomas-villanova.jpg",
    "dates": "1488–1555",
    "tradition": "early-modern",
    "period": "Catholic Reform · Spanish Golden Age",
    "roles": [
      "Augustinian friar",
      "Archbishop of Valencia",
      "Father of the Poor"
    ],
    "epithet": "Augustinian archbishop whose almsgiving and reform earned the title Father of the Poor.",
    "intellectualPortrait": {
      "question": "What did Thomas join that many separate?",
      "arc": ["Study", "Poverty", "Preaching", "Episcopacy", "Mercy", "Reform"],
      "paragraphs": [
        {
          "label": "Study",
          "text": "A master of theology at Alcalá, Thomas refused to let learning float free of the Rule. Augustinian interiority here means the mind ordered by Scripture and the Fathers toward charity."
        },
        {
          "label": "Poverty",
          "text": "He kept a severe personal poverty as archbishop. The goods of the see were treated as the patrimony of the poor—an enacted commentary on Acts and on Augustine’s common life."
        },
        {
          "label": "Mercy",
          "text": "Hospitals, dowries for poor girls, grain in famine, ransoms for captives: administration becomes spiritual discipline. The restless heart rests not in accumulation but in givenness."
        },
        {
          "label": "Reform",
          "text": "In the age of Trent he models a bishop who reforms by holiness and alms before by decree alone—Catholic Reform as Augustinian ordo amoris in public office."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Spanish light, black habit under a simple pectoral cross, bread and coins for the poor.",
      "motif": "Open hand, empty purse.",
      "typography": "meditative"
    },
    "bio": [
      "Tomás de Villanueva was born at Fuenllana in 1488, studied at Alcalá, and entered the Augustinians. He became a renowned preacher and provincial, known for refusing honors until obedience forced them upon him.",
      "As archbishop of Valencia (from 1544) he lived frugally, visited the poor, and organized systematic relief. Contemporaries said he died with little of his own because he had given the rest away.",
      "He was beatified in 1618 and canonized in 1658. Spanish art—Zurbarán above all—fixed his image as the bishop who empties his chest for the beggar at the door."
    ],
    "concepts": [
      "Evangelical poverty",
      "Episcopal charity",
      "Catholic Reform",
      "Augustinian common life"
    ],
    "opinions": [
      {
        "id": "goods-of-the-church",
        "title": "On the Goods of the Church",
        "thesis": "Ecclesiastical revenues are held in trust for the worship of God and the relief of the poor; the prelate is a steward, not an owner.",
        "tags": ["Poverty", "Office"],
        "paragraphs": [
          "Thomas’s practice preaches louder than a treatise: the archbishop’s table and wardrobe stay lean so that hospitals and families may live.",
          "This is Augustinian politics of love applied to money: disordered attachment to income is a form of the restless heart stopping at a finite good."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of St. Augustine" },
      { "name": "Spanish Catholic Reform" }
    ],
    "influenced": [
      { "name": "Baroque Catholic charity" },
      { "name": "Augustinian episcopal ideal" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Sermons of St. Thomas of Villanova", "note": "Spanish and Latin collections" },
      { "title": "Early modern biographies", "note": "Process of canonization" }
    ]
  },
  "leo-xiv": {
    "id": "leo-xiv",
    "name": "Pope Leo XIV",
    "centralQuestion": "How can an Augustinian pope serve the unity of the Church in a fractured global age?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/leo-xiv.jpg",
    "dates": "b. 1955 · elected 2025",
    "tradition": "modern",
    "period": "Contemporary Church",
    "roles": [
      "Pope",
      "Bishop of Rome",
      "Augustinian friar"
    ],
    "epithet": "First pope from the Order of St. Augustine in the modern era, chosen in the conclave of 2025.",
    "intellectualPortrait": {
      "question": "What Augustinian notes mark this pontificate?",
      "arc": ["Rule", "Interiority", "Communion", "Mission", "Unity", "Hope"],
      "paragraphs": [
        {
          "label": "Rule",
          "text": "Formed in the Order of St. Augustine, Leo XIV inherits the Rule’s stress on common life, shared goods, and hearts lifted to God together—not solitary spiritual consumerism."
        },
        {
          "label": "Interiority",
          "text": "Augustinian interiority is not withdrawal from history. It is truthfulness before God about desire and sin, so that public ministry does not become performance."
        },
        {
          "label": "Communion",
          "text": "The restless heart finds rest in God and, derivatively, in the Church as communion. A pope in this tradition is measured by service of unity, not by private vision."
        },
        {
          "label": "Hope",
          "text": "Against despair in a polarized age, Augustinian hope trusts grace more than programs—while still demanding concrete love of neighbor and the poor."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "White cassock, Augustinian memory, and the weight of the keys in the twenty-first century.",
      "motif": "Keys, black sash of memory, open book of the Confessions.",
      "typography": "meditative"
    },
    "bio": [
      "Robert Francis Prevost was born in Chicago in 1955, entered the Order of St. Augustine, and served as a missionary and bishop in Peru before leading the order as prior general and later heading the Dicastery for Bishops.",
      "Elected Bishop of Rome in 2025, he took the name Leo XIV—signaling continuity with social teaching and with the Leonine concern for the Church in the modern world.",
      "As the first Augustinian pope of the modern period, his formation under the Rule of St. Augustine places common life, interior conversion, and ecclesial communion at the center of his public ministry."
    ],
    "concepts": [
      "Petrine ministry",
      "Augustinian common life",
      "Ecclesial communion",
      "Mission"
    ],
    "opinions": [
      {
        "id": "service-of-unity",
        "title": "On the Service of Unity",
        "thesis": "The pope’s office is ordered to the visible unity of the Church in truth and charity, not to personal innovation as an end in itself.",
        "tags": ["Petrine office", "Communion"],
        "paragraphs": [
          "Augustinian ecclesiology resists both pure congregational fragmentation and pure personality cult.",
          "Unity is a work of the Spirit through ordered love—ordo amoris at the scale of the whole Church."
        ],
        "contrasts": [
          { "figureId": "leo", "topicKey": "church", "label": "Leo the Great" },
          { "figureId": "augustine", "topicKey": "church", "label": "Augustine" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of St. Augustine" },
      { "name": "Recent papal magisterium" }
    ],
    "influenced": [
      { "name": "Contemporary Augustinian witness" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Conclave and early addresses (2025–)", "note": "Acta Apostolicae Sedis" },
      { "title": "Prior general letters (Order of St. Augustine)", "note": "Pre-pontifical teaching" }
    ]
  },
  "rita-cascia": {
    "id": "rita-cascia",
    "name": "St. Rita of Cascia",
    "centralQuestion": "How does patient love under impossible wounds become a path of union with the Crucified?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/rita-cascia.jpg",
    "dates": "1381–1457",
    "tradition": "medieval",
    "period": "Late Medieval Augustinian holiness",
    "roles": [
      "Wife and mother",
      "Augustinian nun",
      "Patron of impossible causes"
    ],
    "epithet": "Augustinian of Cascia, marked by the thorn of Christ’s Passion and invoked in desperate cases.",
    "intellectualPortrait": {
      "question": "What does Rita teach about suffering and vocation?",
      "arc": ["Marriage", "Forgiveness", "Cloister", "Passion", "Intercession", "Hope"],
      "paragraphs": [
        {
          "label": "Marriage",
          "text": "Before the cloister, Rita lived the Augustinian test of ordered love in a difficult marriage and in the blood-feuds of her Umbrian town—learning forgiveness as the only way out of cycles of violence."
        },
        {
          "label": "Forgiveness",
          "text": "The conversion of enemies and the refusal of revenge are not soft options; they are participation in the Cross. Charity reorders the restless heart away from retaliation."
        },
        {
          "label": "Passion",
          "text": "The partial stigmata of the thorn in her forehead binds her story to Christ’s suffering. Augustinian spirituality here is Christocentric: the interior wound is not spectacle but conformity."
        },
        {
          "label": "Hope",
          "text": "Popular title—saint of the impossible—names trust in grace when human means fail. That is Augustinian to the core: not optimism, but reliance on the God who raises the dead."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Umbrian roses, black veil, and the single thorn of the Passion.",
      "motif": "Rose, thorn, crucifix.",
      "typography": "meditative"
    },
    "bio": [
      "Rita was born at Roccaporena near Cascia in 1381. Married young, she endured a turbulent marriage and the murder of her husband in a local feud. She worked for reconciliation between families and eventually saw her sons spared a life of revenge.",
      "Widowed, she sought entry among the Augustinian nuns of Cascia; after initial refusal she was admitted and lived a hidden life of prayer, penance, and charity until her death in 1457.",
      "Canonized in 1900, she remains one of the most beloved Augustinian saints. Pilgrims still come to Cascia asking her intercession in marriages, illnesses, and causes that seem beyond hope."
    ],
    "concepts": [
      "Forgiveness",
      "Conformity to the Passion",
      "Augustinian Rule",
      "Intercession"
    ],
    "opinions": [
      {
        "id": "forgiveness-feud",
        "title": "On Forgiveness and the Feud",
        "thesis": "Christian love breaks the chain of revenge; reconciliation is a work of grace stronger than blood honor.",
        "tags": ["Charity", "Peace"],
        "paragraphs": [
          "Rita’s story is Augustinian ethics in narrative form: disordered love of clan and honor yields to ordered love of God and enemy.",
          "The cloister does not erase her earlier vocation; it deepens the same charity under a new form of life."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of St. Augustine" },
      { "name": "Passion devotion of the late Middle Ages" }
    ],
    "influenced": [
      { "name": "Popular Catholic devotion" },
      { "name": "Augustinian women’s sanctity" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Early modern lives of St. Rita", "note": "Cascia tradition" },
      { "title": "Canonization acts (1900)", "note": "Leo XIII" }
    ]
  }
,
"prosper-aquitaine": {
    "id": "prosper-aquitaine",
    "name": "Prosper of Aquitaine",
    "centralQuestion": "How is Augustine’s teaching on grace to be defended and handed on without collapsing into fatalism or Pelagian self-reliance?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/prosper-aquitaine.jpg",
    "dates": "c. 390–c. 463",
    "tradition": "early",
    "period": "Post-Augustinian controversies · 5th century",
    "roles": [
      "Lay theologian",
      "Secretary to Pope Leo the Great",
      "Transmitter of Augustinian grace"
    ],
    "epithet": "Chief early defender and popularizer of Augustine’s doctrine of grace after the bishop’s death.",
    "intellectualPortrait": {
      "question": "What was Prosper trying to secure?",
      "arc": ["Grace", "Predestination", "Free will", "Prayer", "Church", "Tradition"],
      "paragraphs": [
        {
          "label": "Grace",
          "text": "Prosper stands in the line of Augustine against residual Pelagian and semi-Pelagian instincts in Gaul: the beginning of faith, perseverance, and every salutary act are gifts of prevenient grace, not the secure achievement of unaided will."
        },
        {
          "label": "Predestination",
          "text": "He defends a strong reading of predestination as God’s merciful election, while insisting that this does not make God the author of sin. Reprobation is permission and just judgment, not a symmetric positive decree of damnation for its own sake."
        },
        {
          "label": "Prayer",
          "text": "The Church’s liturgy becomes evidence: the Church prays for the conversion of unbelievers and the perseverance of the faithful precisely because grace is needed. Lex orandi supports lex credendi against any theology that makes grace optional at the start."
        },
        {
          "label": "Tradition",
          "text": "Prosper’s work is transmission as much as invention. He epitomizes Augustine, answers objections from Gaul, and helps the Roman see receive an Augustinian grammar of grace that later Western theology will assume."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Late antique parchment, Gallic controversies, and the shadow of Hippo.",
      "motif": "Open codex, stylus, distant basilica.",
      "typography": "meditative"
    },
    "bio": [
      "Prosper of Aquitaine was a layman of literary and theological culture who became one of Augustine’s most important early interpreters. From southern Gaul he corresponded about the reception of Augustine’s late anti-Pelagian writings.",
      "He wrote against the so-called Massilians (often labeled semi-Pelagians), arguing that the initium fidei itself is a gift of grace. His Liber contra collatorem and the Carmen de ingratis press the point with both prose and verse.",
      "Later tradition associates him with the circle of Pope Leo the Great in Rome. Whether or not every secretarial detail is certain, his role as a bridge between Augustine and the Western magisterial reception of grace is secure."
    ],
    "concepts": [
      "Prevenient grace",
      "Predestination",
      "Initium fidei",
      "Lex orandi"
    ],
    "opinions": [
      {
        "id": "initium-fidei",
        "title": "On the Beginning of Faith",
        "thesis": "Even the first movement of faith is a work of grace; the will does not prepare itself by pure nature for justification.",
        "tags": ["Grace", "Faith"],
        "paragraphs": [
          "Against any scheme that grants nature the first step and grace only the rest, Prosper holds Augustine’s line: without grace we cannot please God in the order of salvation.",
          "This is pastoral as well as speculative: it underwrites humility in conversion and confidence in prayer for those still outside the faith."
        ],
        "contrasts": [
          { "figureId": "augustine", "topicKey": "grace", "label": "Augustine" },
          { "figureId": "pelagius", "topicKey": "grace", "label": "Pelagius" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "St. Leo the Great", "figureId": "leo" }
    ],
    "influenced": [
      { "name": "Western doctrine of grace" },
      { "name": "Carolingian and scholastic Augustinianism" }
    ],
    "opponents": [
      { "name": "Massilian / semi-Pelagian teachers", "note": "Emphasis on unaided beginning of faith" }
    ],
    "controversies": [
      {
        "id": "gaul-grace",
        "title": "The Gallic controversy on grace",
        "summary": "Prosper fought for an Augustinian account of grace against milder positions in southern Gaul after Augustine’s death."
      }
    ],
    "primarySources": [
      { "title": "Pro Augustino responsiones", "note": "Defenses of Augustine" },
      { "title": "Liber contra collatorem", "note": "Against Cassian’s Collator" },
      { "title": "Carmen de ingratis", "note": "Verse on grace and ingratitude" },
      { "title": "Epigrams / Sentences from Augustine", "note": "Transmission of Augustinian maxims" }
    ]
  },
  "hugh-st-victor": {
    "id": "hugh-st-victor",
    "name": "Hugh of St. Victor",
    "centralQuestion": "How does the restless heart learn God through ordered study, allegory, and interior restoration?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/hugh-st-victor.jpg",
    "dates": "c. 1096–1141",
    "tradition": "medieval",
    "period": "12th-century Renaissance · School of St. Victor",
    "roles": [
      "Victorine master",
      "Theologian",
      "Spiritual teacher"
    ],
    "epithet": "Master of the Parisian abbey of St. Victor, uniting Augustinian interiority with a program of sacred learning.",
    "intellectualPortrait": {
      "question": "What did Hugh join that others split?",
      "arc": ["Learning", "Scripture", "Allegory", "Sacraments", "Interiority", "Rest"],
      "paragraphs": [
        {
          "label": "Learning",
          "text": "Hugh refuses the false choice between school and cloister. The Didascalicon maps the arts as a path of restoration: fallen man recovers, through disciplined study, a share of the wisdom he lost."
        },
        {
          "label": "Scripture",
          "text": "Reading is threefold—history, allegory, tropology—yet always ordered to the reformation of life. The letter is not despised; it is the foundation on which spiritual sense stands."
        },
        {
          "label": "Interiority",
          "text": "Augustinian to the core, Hugh treats the soul’s return to itself and to God as the point of knowledge. Curiosity that does not turn into love is incomplete science."
        },
        {
          "label": "Sacraments",
          "text": "In De sacramentis he offers an early systematic sacramental theology: the works of restoration answer the works of foundation, and the Church’s signs heal the wound of the fall."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Parisian cloister light, lectern, and the quiet of Victorine study.",
      "motif": "Open book, ladder of the arts, abbey arcade.",
      "typography": "meditative"
    },
    "bio": [
      "Hugh of St. Victor (c. 1096–1141) was the leading master of the abbey of St. Victor in Paris, a house of canons regular living under a form of the Augustinian Rule.",
      "His Didascalicon became a medieval classic of educational theory; De sacramentis christianae fidei a major summa of sacred doctrine before the high scholastic summae.",
      "Victorine spirituality after him keeps his balance: rigorous reading, affective contemplation, and communal life ordered to the restoration of the image of God in the soul."
    ],
    "concepts": [
      "Sacred study",
      "Threefold sense of Scripture",
      "Sacraments of restoration",
      "Augustinian interiority"
    ],
    "opinions": [
      {
        "id": "ordered-learning",
        "title": "On Ordered Learning",
        "thesis": "The liberal arts and sacred reading are means of restoring the image of God; knowledge is ordered to wisdom and love, not to vanity.",
        "tags": ["Education", "Scripture"],
        "paragraphs": [
          "Hugh’s program is Augustinian pedagogy: the mind is healed as it is ordered.",
          "Study without conversion is a truncated ascent; conversion without doctrine risks enthusiasm without form."
        ],
        "contrasts": [
          { "figureId": "augustine", "topicKey": "grace", "label": "Augustine" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of St. Augustine" },
      { "name": "Carolingian and early scholastic tradition" }
    ],
    "influenced": [
      { "name": "Richard of St. Victor" },
      { "name": "Victorine spirituality" },
      { "name": "Medieval sacramental theology" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Didascalicon", "note": "On the arts and sacred study" },
      { "title": "De sacramentis christianae fidei", "note": "On the sacraments" },
      { "title": "De arca Noe / mystical ark writings", "note": "Contemplative symbolism" }
    ]
  },
  "gregory-rimini": {
    "id": "gregory-rimini",
    "name": "Gregory of Rimini",
    "centralQuestion": "How should an Augustinian read Aristotle and the Sentences so that grace remains utterly prior to the fallen will?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/gregory-rimini.jpg",
    "dates": "c. 1300–1358",
    "tradition": "medieval",
    "period": "14th-century scholasticism · Order of St. Augustine",
    "roles": [
      "Augustinian friar",
      "Parisian master",
      "Doctor Authenticus"
    ],
    "epithet": "Leading fourteenth-century Augustinian, called Doctor Authenticus for his strict reading of Augustine on grace and the will.",
    "intellectualPortrait": {
      "question": "What made Gregory’s Augustinianism distinctive?",
      "arc": ["Sentences", "Grace", "Will", "Merit", "Scripture", "School"],
      "paragraphs": [
        {
          "label": "Grace",
          "text": "Gregory intensifies the Augustinian claim: after the fall, the will does not prepare itself for justification by purely natural acts that God must accept. Grace is the beginning, middle, and end of the return to God."
        },
        {
          "label": "Will",
          "text": "He is often grouped with a ‘modern’ Augustinian school that stresses the frailty of the fallen will and the gratuity of election—against any softening that would make nature a partner on equal terms."
        },
        {
          "label": "School",
          "text": "As a Parisian master and later a leader among the Augustinians, he forms a scholastic style: Sentences commentary, careful distinctions, and a determined appeal to Augustine’s anti-Pelagian corpus."
        },
        {
          "label": "Merit",
          "text": "Merit is real but secondary and graced. There is no path of condign merit that begins outside the help of God; what the will does in the order of salvation, it does as moved and healed."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Black Augustinian habit, Parisian disputation, and the late medieval classroom.",
      "motif": "Sentences book, lectern, seal of the order.",
      "typography": "scholastic"
    },
    "bio": [
      "Gregory of Rimini (c. 1300–1358) entered the Order of the Hermits of St. Augustine and became one of the most influential theologians of the fourteenth century at Paris.",
      "His commentary on the Sentences earned him the title Doctor Authenticus among Augustinians—signaling fidelity to Augustine’s authentic teaching on grace against what he saw as dilutions.",
      "He died in 1358 after serving in high office in the order. Later Reformation and Counter-Reformation readers both remembered him as a hard Augustinian, for praise or for blame."
    ],
    "concepts": [
      "Prevenient grace",
      "Fallen will",
      "Merit and acceptation",
      "Augustinian scholasticism"
    ],
    "opinions": [
      {
        "id": "fallen-will",
        "title": "On the Fallen Will and Grace",
        "thesis": "In the state of fallen nature the will cannot, by its own natural powers alone, elicit acts that begin the order of justification; grace must precede.",
        "tags": ["Grace", "Will"],
        "paragraphs": [
          "Gregory’s Augustinianism is rigorous: he closes doors that semi-Pelagian or purely synergistic schemes leave open.",
          "The pastoral face of the thesis is dependence—prayer, humility, and distrust of spiritual self-construction."
        ],
        "contrasts": [
          { "figureId": "augustine", "topicKey": "grace", "label": "Augustine" },
          { "figureId": "giles-rome", "topicKey": "grace", "label": "Giles of Rome" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Giles of Rome", "figureId": "giles-rome" },
      { "name": "Parisian scholastic method" }
    ],
    "influenced": [
      { "name": "Later Augustinian school" },
      { "name": "Late medieval debates on grace and merit" }
    ],
    "opponents": [
      { "name": "Softer synergistic accounts of the initium fidei", "note": "In fourteenth-century schools" }
    ],
    "controversies": [
      {
        "id": "augustinian-school",
        "title": "The late medieval Augustinian school",
        "summary": "Gregory became a reference point for a strict reading of Augustine on grace within and beyond the order."
      }
    ],
    "primarySources": [
      { "title": "Lectura on the Sentences", "note": "Principal theological work" },
      { "title": "Other academic questions and treatises", "note": "Parisian corpus" }
    ]
  }
,
"benedict": {
    "id": "benedict",
    "name": "St. Benedict of Nursia",
    "centralQuestion": "How can ordinary time become a school of the Lord’s service through stability, prayer, and work?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/benedict.jpg",
    "dates": "c. 480–c. 547",
    "tradition": "early",
    "period": "Early Western monasticism",
    "roles": [
      "Abbot",
      "Father of Western monasticism",
      "Author of the Rule"
    ],
    "epithet": "Father of Western monasticism, whose Rule ordered prayer, work, and community for centuries of religious life.",
    "intellectualPortrait": {
      "question": "What was Benedict ordering?",
      "arc": ["Listening", "Stability", "Obedience", "Prayer", "Work", "Hospitality"],
      "paragraphs": [
        {
          "label": "Listening",
          "text": "The Rule opens with Obsculta—“Listen, O my son, to the precepts of the master.” Benedictine life begins in receptive attention to the Word and to the abbot, not in self-designed spirituality."
        },
        {
          "label": "Stability",
          "text": "Stability of place and community resists the restless urge to wander. Holiness is learned by staying, not by collecting experiences."
        },
        {
          "label": "Prayer",
          "text": "The opus Dei—the liturgical hours—structures the day so that time itself answers to God. Prayer is work, and work is gathered back into prayer."
        },
        {
          "label": "Hospitality",
          "text": "Guests are received as Christ. Enclosure is not contempt for the world but a school of charity that opens the door to the stranger."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Monte Cassino light, black habit, rule-book and broken cup of legend.",
      "motif": "Rule, raven, crozier.",
      "typography": "meditative"
    },
    "bio": [
      "Benedict was born at Nursia in central Italy around 480. After leaving studies in Rome, he lived as a hermit at Subiaco and later founded the monastery of Monte Cassino.",
      "His Rule for monasteries—moderate, biblical, and practical—became the foundational charter of Western monasticism. Gregory the Great’s Dialogues preserve the earliest life of the saint.",
      "He died around 547. The Church names him patron of Europe; the Rule remains the backbone of Benedictine and Cistercian life."
    ],
    "concepts": [
      "Rule of St. Benedict",
      "Stability",
      "Ora et labora",
      "Conversatio morum"
    ],
    "opinions": [
      {
        "id": "school-of-service",
        "title": "On the Monastery as School",
        "thesis": "The monastery is a school of the Lord’s service in which obedience, humility, and liturgical rhythm form the whole person.",
        "tags": ["Rule", "Formation"],
        "paragraphs": [
          "Benedict does not offer a technique of peak experience. He offers a pattern of life: fixed prayer, shared goods, mutual obedience, and conversion of manners.",
          "The abbot is spiritual father, not manager; the monk learns to prefer nothing to the love of Christ."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "Desert monasticism" },
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "Rule of the Master" }
    ],
    "influenced": [
      { "name": "St. Gregory the Great", "figureId": "gregory-great" },
      { "name": "All later Benedictine and Cistercian life" },
      { "name": "St. Bernard of Clairvaux", "figureId": "bernard" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Rule of St. Benedict", "note": "Foundational text" },
      { "title": "Gregory the Great, Dialogues II", "note": "Life of Benedict" }
    ]
  },
  "scholastica": {
    "id": "scholastica",
    "name": "St. Scholastica",
    "centralQuestion": "How does monastic charity between brother and sister image the primacy of love over rigid schedule?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/scholastica.jpg",
    "dates": "c. 480–c. 543",
    "tradition": "early",
    "period": "Early Western monasticism",
    "roles": [
      "Abbess",
      "Sister of St. Benedict",
      "Patron of Benedictine nuns"
    ],
    "epithet": "Sister of St. Benedict, whose last conversation with him Gregory recounts as a triumph of charity over rule-bound haste.",
    "intellectualPortrait": {
      "question": "What does Scholastica teach within the Benedictine family?",
      "arc": ["Kinship", "Prayer", "Charity", "Listening", "Death", "Glory"],
      "paragraphs": [
        {
          "label": "Kinship",
          "text": "Scholastica’s vocation is woven with Benedict’s. The family bond is not erased by the cloister; it is transfigured into shared seeking of God."
        },
        {
          "label": "Charity",
          "text": "In Gregory’s famous story she prevails in prayer so that the night of conversation may continue: love of holy speech outranks a rigid return to the cell."
        },
        {
          "label": "Prayer",
          "text": "Her power is not domination but petition. The storm that keeps Benedict from leaving is an answer to a sister’s desire for one more hour of God-talk."
        },
        {
          "label": "Death",
          "text": "Benedict sees her soul rise like a dove. The Benedictine imagination links holy death to communion already begun in shared prayer."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Quiet Umbrian hills, dove, and the last supper of holy conversation.",
      "motif": "Dove, book, storm-cloud.",
      "typography": "meditative"
    },
    "bio": [
      "Scholastica, according to tradition, was Benedict’s twin sister and consecrated to God from early life. She led a community of nuns near Monte Cassino.",
      "Gregory the Great’s Dialogues tell of their yearly meeting and of her death around 543, three days after their final conversation.",
      "She is the patron of Benedictine nuns; her feast is celebrated on 10 February."
    ],
    "concepts": [
      "Monastic charity",
      "Holy conversation",
      "Benedictine women"
    ],
    "opinions": [
      {
        "id": "charity-over-rigor",
        "title": "On Charity and the Rule",
        "thesis": "The Rule serves charity; when holy love rightly asks for more prayer and speech about God, rigid custom yields.",
        "tags": ["Charity", "Rule"],
        "paragraphs": [
          "Gregory presents Scholastica as prevailing because she loved more. The point is not antinomianism but the primacy of caritas."
        ],
        "contrasts": [
          { "figureId": "benedict", "topicKey": "church", "label": "Benedict" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Benedict of Nursia", "figureId": "benedict" }
    ],
    "influenced": [
      { "name": "Benedictine women’s communities" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Gregory the Great, Dialogues II", "note": "Principal narrative source" }
    ]
  },
  "gregory-great": {
    "id": "gregory-great",
    "name": "St. Gregory the Great",
    "centralQuestion": "How does the contemplative pastor govern the Church without losing the life of prayer?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/gregory-great.jpg",
    "dates": "c. 540–604",
    "tradition": "early",
    "period": "Early medieval papacy",
    "roles": [
      "Pope",
      "Doctor of the Church",
      "Biographer of St. Benedict"
    ],
    "epithet": "Pope and Doctor who shaped Western pastoral care, liturgy, and the memory of St. Benedict.",
    "intellectualPortrait": {
      "question": "What did Gregory hold together?",
      "arc": ["Contemplation", "Pastoral care", "Scripture", "Benedict", "Mission", "Humility"],
      "paragraphs": [
        {
          "label": "Contemplation",
          "text": "Gregory never treats office as a substitute for prayer. The pastor is drawn from contemplation into service and must return again and again to the sources."
        },
        {
          "label": "Pastoral care",
          "text": "The Regula pastoralis is a charter of episcopal responsibility: different souls need different medicines; authority is burden, not privilege."
        },
        {
          "label": "Benedict",
          "text": "Book II of the Dialogues gives the West its classic life of Benedict and helps establish the Rule’s prestige across Europe."
        },
        {
          "label": "Mission",
          "text": "The mission to the English—Augustine of Canterbury sent from Rome—shows Gregory’s horizon: a pastoral papacy concerned with peoples still outside the fold."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Roman basilica light, dove of inspiration, and the weight of the keys.",
      "motif": "Dove, book, tiara of memory.",
      "typography": "meditative"
    },
    "bio": [
      "Gregory was born to a senatorial Roman family around 540, served as prefect of the city, then sold his inheritance for monastic foundations and entered religious life.",
      "As pope (590–604) he organized relief, negotiated with Lombards, wrote extensively, and sent missionaries to Britain. His name is linked to the Roman liturgy and chant tradition.",
      "He died in 604. The Church counts him among the four great Latin Doctors."
    ],
    "concepts": [
      "Pastoral rule",
      "Contemplation and action",
      "Mission to England",
      "Life of Benedict"
    ],
    "opinions": [
      {
        "id": "pastoral-rule",
        "title": "On the Pastoral Office",
        "thesis": "The ruler of souls must be a servant who knows how to discern different conditions of heart and who does not abandon contemplation.",
        "tags": ["Pastoral care", "Office"],
        "paragraphs": [
          "Gregory’s pastor is neither a careerist nor a pure solitary. He is a man interrupted by charity yet fed by prayer."
        ],
        "contrasts": [
          { "figureId": "benedict", "topicKey": "church", "label": "Benedict" },
          { "figureId": "leo", "topicKey": "church", "label": "Leo the Great" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Augustine", "figureId": "augustine" },
      { "name": "St. Benedict of Nursia", "figureId": "benedict" },
      { "name": "St. Leo the Great", "figureId": "leo" }
    ],
    "influenced": [
      { "name": "Western pastoral theology" },
      { "name": "English Church (via Augustine of Canterbury)" },
      { "name": "Medieval Benedictine memory" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Regula pastoralis", "note": "Pastoral Rule" },
      { "title": "Dialogues", "note": "Includes Life of Benedict" },
      { "title": "Moralia in Job", "note": "Moral commentary" },
      { "title": "Homilies and Letters", "note": "Extensive correspondence" }
    ]
  },
  "bede": {
    "id": "bede",
    "name": "St. Bede the Venerable",
    "centralQuestion": "How does monastic scholarship serve the memory of God’s work among a people?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/bede.jpg",
    "dates": "c. 673–735",
    "tradition": "early",
    "period": "Northumbrian Benedictine culture",
    "roles": [
      "Monk of Wearmouth–Jarrow",
      "Historian",
      "Doctor of the Church"
    ],
    "epithet": "Benedictine scholar of Northumbria, Doctor of the Church, and father of English history.",
    "intellectualPortrait": {
      "question": "What was Bede’s service?",
      "arc": ["Monastery", "Scripture", "History", "Time", "Teaching", "Death"],
      "paragraphs": [
        {
          "label": "Monastery",
          "text": "Bede spent nearly his whole life under the Rule at Wearmouth and Jarrow. Scholarship was not a career path; it was an extension of conversatio morum."
        },
        {
          "label": "Scripture",
          "text": "His biblical commentaries and preaching feed the Church’s lectio. Learning is ordered to the understanding of the sacred page."
        },
        {
          "label": "History",
          "text": "The Ecclesiastical History of the English People narrates conversion, mission, and monastic foundations as the story of grace among the gens Anglorum."
        },
        {
          "label": "Time",
          "text": "Bede’s work on chronology and the calendar is pastoral science: the Church must know how to keep Easter and measure the years under providence."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Northumbrian scriptorium, stone church, and the quiet of the Rule.",
      "motif": "Manuscript, quill, coastal light.",
      "typography": "meditative"
    },
    "bio": [
      "Bede was born around 673 and given as a child to the monasteries founded by Benedict Biscop. He was ordained deacon and priest and rarely left Jarrow.",
      "Besides the Ecclesiastical History he wrote biblical commentaries, lives of abbots, hymns, and scientific works. He died on the vigil of the Ascension in 735, still teaching and praying.",
      "Leo XIII declared him a Doctor of the Church in 1899. He remains the type of the Benedictine scholar: stable, learned, and doxological."
    ],
    "concepts": [
      "Ecclesiastical history",
      "Monastic scholarship",
      "Sacred chronology",
      "Lectio"
    ],
    "opinions": [
      {
        "id": "history-as-providence",
        "title": "On History and Providence",
        "thesis": "The story of a people’s conversion is rightly told as the work of God through missionaries, monks, and pastors—not as bare secular chronicle.",
        "tags": ["History", "Mission"],
        "paragraphs": [
          "Bede’s history is theological memory. Dates and kings matter because grace has a timeline in real places."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "Rule of St. Benedict", "figureId": "benedict" },
      { "name": "St. Gregory the Great", "figureId": "gregory-great" },
      { "name": "Northumbrian monastic founders" }
    ],
    "influenced": [
      { "name": "English historical writing" },
      { "name": "Medieval biblical scholarship" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Ecclesiastical History of the English People", "note": "Principal historical work" },
      { "title": "Biblical commentaries", "note": "Extensive corpus" },
      { "title": "Lives of the Abbots of Wearmouth and Jarrow", "note": "Monastic memory" }
    ]
  }
,
"francis": {
    "id": "francis",
    "name": "St. Francis of Assisi",
    "centralQuestion": "How does following the poor Christ reshape possession, status, and kinship with all creatures?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/francis.jpg",
    "dates": "1181/82–1226",
    "tradition": "medieval",
    "period": "High Middle Ages · Mendicant awakening",
    "roles": [
      "Founder of the Friars Minor",
      "Stigmatist",
      "Il Poverello"
    ],
    "epithet": "The poor man of Assisi, whose Gospel literalness, stigmata, and Canticle reshaped Western religious life.",
    "intellectualPortrait": {
      "question": "What was Francis enacting?",
      "arc": ["Conversion", "Poverty", "Fraternity", "Creation", "Cross", "Peace"],
      "paragraphs": [
        {
          "label": "Conversion",
          "text": "Francis’s turn from merchant’s son to mendicant is not a career change. It is a decision to take the Gospel without gloss—rebuild the Church, kiss the leper, and own nothing."
        },
        {
          "label": "Poverty",
          "text": "Poverty is evangelical dependence, not hatred of matter. Goods are received as gift and shared; status and security are refused so that Christ poor may be followed without reserve."
        },
        {
          "label": "Creation",
          "text": "The Canticle of the Creatures praises sun, moon, water, and death as brothers and sisters. Creation is not divine, but it is kin under the Father."
        },
        {
          "label": "Cross",
          "text": "The stigmata seal a life conformed to the Crucified. Franciscan holiness is not technique; it is configuration to Jesus poor and wounded."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Umbrian hills, rough habit, birds, and the wounds of the Passion.",
      "motif": "Cross, birds, broken sandals.",
      "typography": "meditative"
    },
    "bio": [
      "Giovanni di Pietro di Bernardone was born in Assisi around 1181/82. After illness and imprisonment as a young soldier, he embraced radical Gospel poverty and gathered companions.",
      "Innocent III approved his way of life; the Order of Friars Minor grew with startling speed. Clare of Assisi received the same form of life for women. Francis received the stigmata at La Verna in 1224.",
      "He died at the Porziuncola on 3 October 1226 and was canonized in 1228. His Testament and the early legends remain primary witnesses to his intention."
    ],
    "concepts": [
      "Evangelical poverty",
      "Minority",
      "Canticle of the Creatures",
      "Stigmata"
    ],
    "opinions": [
      {
        "id": "gospel-without-gloss",
        "title": "On Living the Gospel without Gloss",
        "thesis": "The Rule is to live the Gospel of Jesus Christ; poverty and minority are not optional ornaments but the form of that following.",
        "tags": ["Poverty", "Gospel"],
        "paragraphs": [
          "Francis resists soft readings that keep the words of Jesus while retaining soft security.",
          "Fraternity and peace follow: the friar stands without privilege among the least."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "The Gospel of Jesus Christ" },
      { "name": "Desert and monastic poverty traditions" }
    ],
    "influenced": [
      { "name": "St. Clare of Assisi", "figureId": "clare" },
      { "name": "St. Bonaventure", "figureId": "bonaventure" },
      { "name": "All later Franciscan life" }
    ],
    "opponents": [],
    "controversies": [
      {
        "id": "poverty-disputes",
        "title": "Later poverty controversies",
        "summary": "After Francis’s death, the order debated how absolute poverty should be lived and interpreted—disputes that shaped Franciscan history for a century."
      }
    ],
    "primarySources": [
      { "title": "Regula bullata / Earlier Rule", "note": "Approved rules" },
      { "title": "Testament", "note": "Francis’s last will for the brothers" },
      { "title": "Canticle of the Creatures", "note": "Praise of creation" },
      { "title": "Early legends (Celano, Assisi Compilation)", "note": "Biographical sources" }
    ]
  },
  "clare": {
    "id": "clare",
    "name": "St. Clare of Assisi",
    "centralQuestion": "How can enclosed poverty become a mirror of contemplative fidelity to the poor Christ?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/clare.jpg",
    "dates": "1194–1253",
    "tradition": "medieval",
    "period": "Early Franciscan movement",
    "roles": [
      "Foundress of the Poor Clares",
      "Abbess of San Damiano",
      "Contemplative of poverty"
    ],
    "epithet": "First Franciscan woman, whose privilege of poverty defended the right to own nothing for Christ’s sake.",
    "intellectualPortrait": {
      "question": "What did Clare secure?",
      "arc": ["Calling", "Enclosure", "Poverty", "Eucharist", "Mirror", "Fidelity"],
      "paragraphs": [
        {
          "label": "Calling",
          "text": "Clare flees a noble marriage for the Gospel Francis preached. Her vocation is not a softer parallel; it is the same poverty in a contemplative key."
        },
        {
          "label": "Poverty",
          "text": "She fights for the privilege of poverty—the legal right to refuse property—so that the sisters may remain without possessions as Francis intended."
        },
        {
          "label": "Mirror",
          "text": "Her letters, especially to Agnes of Prague, speak of the poor Crucified as the mirror in which the soul sees what to become."
        },
        {
          "label": "Eucharist",
          "text": "Tradition remembers her trust in the Blessed Sacrament in the face of danger—contemplative courage flowing from the same poverty."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "San Damiano light, monstrance, and the quiet of enclosure.",
      "motif": "Monstrance, lily, rough veil.",
      "typography": "meditative"
    },
    "bio": [
      "Chiara Offreduccio was born in Assisi in 1194. Moved by Francis’s preaching, she left home in 1212 and was received at the Porziuncola; San Damiano became her monastery.",
      "She governed her sisters for decades and obtained papal confirmation of their radical poverty shortly before her death in 1253.",
      "Canonized in 1255, she is the mother of the Second Order—the Poor Clares—and a primary witness to contemplative Franciscan life."
    ],
    "concepts": [
      "Privilege of poverty",
      "Enclosed Franciscan life",
      "Christ as mirror",
      "Contemplative fidelity"
    ],
    "opinions": [
      {
        "id": "privilege-of-poverty",
        "title": "On the Privilege of Poverty",
        "thesis": "The sisters must be free to own nothing, so that poverty remains a living form of the Gospel rather than a mitigated religious routine.",
        "tags": ["Poverty", "Rule"],
        "paragraphs": [
          "Clare’s insistence is juridical and spiritual at once: without the right to dispossess, the form of life collapses into ordinary endowment."
        ],
        "contrasts": [
          { "figureId": "francis", "topicKey": "church", "label": "Francis" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Francis of Assisi", "figureId": "francis" }
    ],
    "influenced": [
      { "name": "Poor Clare tradition" },
      { "name": "Contemplative Franciscan women" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Rule of St. Clare", "note": "Confirmed 1253" },
      { "title": "Letters to Agnes of Prague", "note": "Spiritual teaching" },
      { "title": "Testament and Blessing", "note": "Last words to the sisters" }
    ]
  },
  "anthony-padua": {
    "id": "anthony-padua",
    "name": "St. Anthony of Padua",
    "centralQuestion": "How does evangelical preaching unite learning, miracles, and care for the poor?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/anthony-padua.jpg",
    "dates": "1195–1231",
    "tradition": "medieval",
    "period": "Early Franciscan expansion",
    "roles": [
      "Franciscan preacher",
      "Doctor of the Church",
      "Evangelical Doctor"
    ],
    "epithet": "Portuguese Franciscan preacher and Doctor, invoked as wonder-worker and teacher of the Gospel.",
    "intellectualPortrait": {
      "question": "What marked Anthony’s ministry?",
      "arc": ["Augustinians", "Franciscans", "Preaching", "Scripture", "Miracles", "Padua"],
      "paragraphs": [
        {
          "label": "Scripture",
          "text": "Anthony’s sermons are soaked in the Bible. Learning serves proclamation; the Doctor’s title rests on evangelical exposition, not abstract system alone."
        },
        {
          "label": "Preaching",
          "text": "He preaches against usury, heresy, and spiritual mediocrity—Franciscan minority with a public voice."
        },
        {
          "label": "Miracles",
          "text": "Popular memory of wonders is not the heart of his teaching, but it signals a life perceived as transparent to divine help for the poor and distressed."
        },
        {
          "label": "Padua",
          "text": "His death near Padua fixed the city as a center of his cult; the Church later named him Evangelical Doctor."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Lily, Child Jesus, and the open book of the preacher.",
      "motif": "Lily, book, Child.",
      "typography": "meditative"
    },
    "bio": [
      "Fernando Martins de Bulhões was born in Lisbon in 1195, first joined the Augustinian canons, then transferred to the Friars Minor after the martyrdom of Franciscan missionaries in Morocco stirred him.",
      "His gift for preaching unfolded in Italy and southern France. He died at Arcella near Padua in 1231 and was canonized within a year.",
      "Pius XII declared him a Doctor of the Church in 1946 with the title Doctor Evangelicus."
    ],
    "concepts": [
      "Evangelical preaching",
      "Scripture and sermon",
      "Care for the poor",
      "Franciscan mission"
    ],
    "opinions": [
      {
        "id": "word-and-life",
        "title": "On Preaching and Life",
        "thesis": "The preacher’s word must be matched by a poor and coherent life; doctrine without conversion is empty sound.",
        "tags": ["Preaching", "Poverty"],
        "paragraphs": [
          "Anthony stands in the Franciscan conviction that the Gospel is taught first by form of life, then by speech."
        ],
        "contrasts": [
          { "figureId": "francis", "topicKey": "church", "label": "Francis" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Francis of Assisi", "figureId": "francis" },
      { "name": "Scripture and the Fathers" }
    ],
    "influenced": [
      { "name": "Franciscan preaching tradition" },
      { "name": "Popular Catholic devotion" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Sermones", "note": "Principal preaching corpus" },
      { "title": "Early legends and canonization acts", "note": "Historical memory" }
    ]
  },
  "angela-foligno": {
    "id": "angela-foligno",
    "name": "St. Angela of Foligno",
    "centralQuestion": "How does the Passion of Christ become the path of mystical transformation for a penitent soul?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/angela-foligno.jpg",
    "dates": "1248–1309",
    "tradition": "medieval",
    "period": "Later Franciscan mysticism",
    "roles": [
      "Franciscan tertiary",
      "Mystic",
      "Teacher of the theologians"
    ],
    "epithet": "Franciscan penitent and mystic whose Book of Divine Consolation charts the way of the Cross.",
    "intellectualPortrait": {
      "question": "What was Angela shown?",
      "arc": ["Conversion", "Penance", "Passion", "Darkness", "Union", "Instruction"],
      "paragraphs": [
        {
          "label": "Conversion",
          "text": "A wife and mother of Foligno, Angela turns from worldly life through a profound conversion and places herself under Franciscan guidance as a tertiary."
        },
        {
          "label": "Passion",
          "text": "Her revelations center on the suffering Christ. Knowledge of God arrives through participation in the Cross, not through flight from history."
        },
        {
          "label": "Darkness",
          "text": "She describes stages of affliction and unknowing—anticipating later mystical maps—in which the soul is stripped for a truer love."
        },
        {
          "label": "Instruction",
          "text": "Dictated to a relative who was a friar, her Book became a school text of Franciscan affectivity; later readers called her teacher of the theologians."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Umbrian penitence, crucifix, and the intimacy of dictated revelation.",
      "motif": "Crucifix, tertiary cord, open book.",
      "typography": "meditative"
    },
    "bio": [
      "Angela was born in Foligno in 1248. After a conversion in adulthood she embraced Franciscan penance, was widowed, and lived in close association with the friars.",
      "Her Memorial (or Book) records a series of steps and visions focused on Christ’s Passion. She died in 1309.",
      "Franciscans and later spiritual writers prized her as a guide of interior purification; she was canonized by Pope Francis in 2013."
    ],
    "concepts": [
      "Passion mysticism",
      "Penitential path",
      "Franciscan tertiary life",
      "Mystical darkness"
    ],
    "opinions": [
      {
        "id": "via-passionis",
        "title": "On the Way of the Passion",
        "thesis": "True knowledge of God is given through conformity to the suffering Christ; consolation without the Cross is incomplete.",
        "tags": ["Passion", "Mysticism"],
        "paragraphs": [
          "Angela’s teaching is Franciscan in structure: the poor and crucified Jesus is the door, not a preliminary to a purely abstract Absolute."
        ],
        "contrasts": [
          { "figureId": "francis", "topicKey": "church", "label": "Francis" },
          { "figureId": "bonaventure", "topicKey": "church", "label": "Bonaventure" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Francis of Assisi", "figureId": "francis" },
      { "name": "Franciscan Passion devotion" }
    ],
    "influenced": [
      { "name": "Later Franciscan mysticism" },
      { "name": "Affective theology of the Cross" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Liber / Book of Divine Consolation", "note": "Memorial of her experiences" },
      { "title": "Instructions to disciples", "note": "Later teaching sections" }
    ]
  }
,
"simon-stock": {
    "id": "simon-stock",
    "name": "St. Simon Stock",
    "centralQuestion": "How does Carmelite life under Mary’s protection form contemplatives in the world of the medieval West?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/simon-stock.jpg",
    "dates": "c. 1165–1265",
    "tradition": "medieval",
    "period": "Early Carmelite expansion in Europe",
    "roles": [
      "Prior General of the Carmelites",
      "English Carmelite",
      "Scapular tradition"
    ],
    "epithet": "Carmelite prior general associated with the Brown Scapular and the order’s Western expansion.",
    "intellectualPortrait": {
      "question": "What did Simon Stock represent for Carmel?",
      "arc": ["Hermits", "West", "Rule", "Mary", "Scapular", "Habit"],
      "paragraphs": [
        {
          "label": "West",
          "text": "Under leaders like Simon Stock the Carmelites adapted from the Holy Land hermit tradition to mendicant and communal life in Europe, without abandoning contemplative identity."
        },
        {
          "label": "Mary",
          "text": "Carmelite devotion to Our Lady of Mount Carmel is not ornament; it is the order’s sense that contemplative life stands under Mary’s mantle."
        },
        {
          "label": "Scapular",
          "text": "The Brown Scapular tradition, linked to Simon Stock in later piety, became a popular sign of consecration and trust in Mary’s intercession—Carmel’s charism extended to the laity."
        },
        {
          "label": "Habit",
          "text": "The habit and scapular mark a form of life: poverty, chastity, obedience, and a heart ordered to God in prayer."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Medieval Carmelite habit, scapular, and Marian light.",
      "motif": "Scapular, lily, Mount Carmel.",
      "typography": "meditative"
    },
    "bio": [
      "Simon Stock was an English Carmelite of the thirteenth century, remembered as prior general during the order’s settlement in the West.",
      "Later devotion associates him with the vision of Our Lady giving the Brown Scapular. Whatever the precise historical layers of that tradition, his name became bound to Carmelite Marian identity.",
      "He died in the mid-thirteenth century; his cult remains strong in Carmelite and popular Catholic piety."
    ],
    "concepts": [
      "Our Lady of Mount Carmel",
      "Brown Scapular",
      "Carmelite expansion",
      "Contemplative identity"
    ],
    "opinions": [
      {
        "id": "marian-carmel",
        "title": "On Mary and Carmel",
        "thesis": "Carmelite life is lived under Mary’s protection; devotion to her is interior to the order’s contemplative vocation, not an optional extra.",
        "tags": ["Mary", "Carmel"],
        "paragraphs": [
          "The scapular tradition popularized a simple form of belonging to Carmel’s Marian spirit."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "Carmelite Rule / Albert of Jerusalem" },
      { "name": "Marian devotion of the medieval Church" }
    ],
    "influenced": [
      { "name": "Carmelite Marian piety" },
      { "name": "Scapular devotion among the faithful" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Carmelite constitutions and early lives", "note": "Medieval Carmelite memory" },
      { "title": "Scapular tradition texts", "note": "Later pious accounts" }
    ]
  },
  "therese": {
    "id": "therese",
    "name": "St. Thérèse of Lisieux",
    "centralQuestion": "How can ordinary acts done with love become a little way of holiness for the smallest souls?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/therese.jpg",
    "dates": "1873–1897",
    "tradition": "modern",
    "period": "Fin-de-siècle Carmel · Third French Republic",
    "roles": [
      "Discalced Carmelite",
      "Doctor of the Church",
      "Patroness of missions"
    ],
    "epithet": "The Little Flower, Doctor of the Church, whose Little Way teaches trust and love in small things.",
    "intellectualPortrait": {
      "question": "What did Thérèse simplify without diluting?",
      "arc": ["Childhood", "Carmel", "Love", "Trust", "Night", "Mission"],
      "paragraphs": [
        {
          "label": "Love",
          "text": "Thérèse discovers that her vocation is love at the heart of the Church. Holiness is not reserved for great deeds but for great love in little duties."
        },
        {
          "label": "Trust",
          "text": "The Little Way is confidence in God’s fatherly mercy—remaining small, daring to expect everything from grace rather than from spiritual athleticism."
        },
        {
          "label": "Night",
          "text": "Her trial of faith near the end is not a contradiction of the Little Way; it is its testing: love without sensible consolation."
        },
        {
          "label": "Mission",
          "text": "Declared patroness of missions, she shows that contemplative love participates in the Church’s apostolic work by prayer and sacrifice."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Lisieux Carmel, roses, and the simplicity of a novice’s cell.",
      "motif": "Roses, crucifix, notebook.",
      "typography": "meditative"
    },
    "bio": [
      "Thérèse Martin was born in Alençon in 1873, entered the Lisieux Carmel at fifteen, and lived a hidden life of prayer until her death from tuberculosis in 1897.",
      "Her autobiography, written under obedience, spread rapidly after her death. Pius XI beatified and canonized her; John Paul II declared her a Doctor of the Church in 1997.",
      "She remains one of the most beloved modern saints—proof that doctrinal depth can speak in the language of ordinary love."
    ],
    "concepts": [
      "Little Way",
      "Spiritual childhood",
      "Trust in mercy",
      "Love as vocation"
    ],
    "opinions": [
      {
        "id": "little-way",
        "title": "On the Little Way",
        "thesis": "Holiness consists in doing ordinary things with extraordinary love and filial trust in God, not in extraordinary performances.",
        "tags": ["Holiness", "Trust"],
        "paragraphs": [
          "Thérèse refuses both laxity and spiritual ambition. The little soul goes to God by the elevator of Jesus’ arms—grace, not self-constructed ladders."
        ],
        "contrasts": [
          { "figureId": "teresa", "topicKey": "grace", "label": "Teresa of Ávila" },
          { "figureId": "john-cross", "topicKey": "grace", "label": "John of the Cross" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Teresa of Ávila", "figureId": "teresa" },
      { "name": "St. John of the Cross", "figureId": "john-cross" },
      { "name": "The Gospel and the Imitation of Christ" }
    ],
    "influenced": [
      { "name": "Twentieth-century Catholic spirituality" },
      { "name": "Missionary and lay holiness movements" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Story of a Soul", "note": "Autobiography" },
      { "title": "Letters and last conversations", "note": "Novissima verba" },
      { "title": "Poems and prayers", "note": "Carmelite corpus" }
    ]
  },
  "elizabeth-trinity": {
    "id": "elizabeth-trinity",
    "name": "St. Elizabeth of the Trinity",
    "centralQuestion": "How does the indwelling Trinity become the soul’s home and the form of its praise?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/elizabeth-trinity.jpg",
    "dates": "1880–1906",
    "tradition": "modern",
    "period": "Early twentieth-century French Carmel",
    "roles": [
      "Discalced Carmelite of Dijon",
      "Mystic of the indwelling",
      "Teacher of praise"
    ],
    "epithet": "Carmelite of Dijon who taught the soul to live as praise of the Trinity’s indwelling glory.",
    "intellectualPortrait": {
      "question": "What was Elizabeth’s center?",
      "arc": ["Baptism", "Carmel", "Indwelling", "Praise", "Silence", "Heaven"],
      "paragraphs": [
        {
          "label": "Indwelling",
          "text": "Elizabeth takes seriously the New Testament promise that the Trinity dwells in the justified soul. Interior life is not self-analysis; it is hospitality to God."
        },
        {
          "label": "Praise",
          "text": "She wants to be laudem gloriae—praise of glory—letting her life become an echo of the Trinity’s own beatitude."
        },
        {
          "label": "Silence",
          "text": "Carmelite silence is the condition for attending to the Guest within. Noise is not only external; it is the scattered self."
        },
        {
          "label": "Heaven",
          "text": "Heaven begins where the soul consents to be inhabited. Death is not interruption of that life but its unveiling."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Dijon Carmel, white choir mantle, and quiet Trinitarian light.",
      "motif": "Trinity, cell window, open Pauline epistle.",
      "typography": "meditative"
    },
    "bio": [
      "Elizabeth Catez was born in 1880, entered the Dijon Carmel in 1901, and took the name Elizabeth of the Trinity. She died in 1906 after a brief, intense religious life.",
      "Her letters and retreat notes circle continually around Ephesians and the indwelling of the divine Persons.",
      "Canonized in 2016, she stands as a modern Carmelite voice of contemplative Trinitarian spirituality."
    ],
    "concepts": [
      "Indwelling of the Trinity",
      "Laudem gloriae",
      "Contemplative silence",
      "Baptismal interiority"
    ],
    "opinions": [
      {
        "id": "laudem-gloriae",
        "title": "On Being Praise of Glory",
        "thesis": "The Christian vocation is to become a living praise of the Trinity who dwells in the soul by grace.",
        "tags": ["Trinity", "Contemplation"],
        "paragraphs": [
          "Elizabeth’s doctrine is simple and radical: believe in the indwelling, and let every act be ordered as worship."
        ],
        "contrasts": [
          { "figureId": "teresa", "topicKey": "grace", "label": "Teresa of Ávila" },
          { "figureId": "therese", "topicKey": "grace", "label": "Thérèse" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Teresa of Ávila", "figureId": "teresa" },
      { "name": "St. John of the Cross", "figureId": "john-cross" },
      { "name": "St. Paul (Ephesians)" }
    ],
    "influenced": [
      { "name": "Contemporary contemplative renewal" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Letters", "note": "Extensive correspondence" },
      { "title": "Heaven in Faith / Last retreat", "note": "Spiritual treatises" }
    ]
  },
  "edith-stein": {
    "id": "edith-stein",
    "name": "St. Teresa Benedicta of the Cross (Edith Stein)",
    "centralQuestion": "How does the Cross of Christ claim the philosopher’s mind and the Jewish woman’s destiny in a century of violence?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/edith-stein.jpg",
    "dates": "1891–1942",
    "tradition": "modern",
    "period": "Twentieth century · Shoah",
    "roles": [
      "Philosopher",
      "Discalced Carmelite",
      "Martyr",
      "Co-patroness of Europe"
    ],
    "epithet": "Jewish philosopher who became a Carmelite and was murdered at Auschwitz; co-patroness of Europe.",
    "intellectualPortrait": {
      "question": "What path did Edith Stein walk?",
      "arc": ["Phenomenology", "Conversion", "Carmel", "Cross", "Empathy", "Martyrdom"],
      "paragraphs": [
        {
          "label": "Phenomenology",
          "text": "Trained under Husserl, she brought rigorous attention to experience into her later Christian thought—empathy, the person, and the structure of the soul."
        },
        {
          "label": "Conversion",
          "text": "Reading Teresa of Ávila catalyzed her entry into the Church. Philosophy did not end; it was baptized."
        },
        {
          "label": "Cross",
          "text": "As Teresa Benedicta of the Cross she understood her vocation as participation in Christ’s redemptive suffering—for her people and for the world."
        },
        {
          "label": "Martyrdom",
          "text": "Arrested by the Nazis and killed at Auschwitz in 1942, she stands as a witness that Carmelite contemplation does not flee history’s darkest hour."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Carmelite veil, scholar’s books, and the shadow of the Cross in the twentieth century.",
      "motif": "Star of David memory, crucifix, manuscript.",
      "typography": "meditative"
    },
    "bio": [
      "Edith Stein was born in Breslau in 1891 to a Jewish family, earned a doctorate in philosophy, and converted to Catholicism in 1922 after reading Teresa of Ávila.",
      "She entered the Cologne Carmel in 1933, transferred to Echt in the Netherlands, and was deported to Auschwitz in 1942, where she died.",
      "John Paul II canonized her in 1998 and named her a co-patroness of Europe—philosopher, contemplative, and martyr."
    ],
    "concepts": [
      "Cross and philosophy",
      "Person and empathy",
      "Jewish-Christian destiny",
      "Carmelite martyrdom"
    ],
    "opinions": [
      {
        "id": "science-of-the-cross",
        "title": "On the Science of the Cross",
        "thesis": "Christian wisdom culminates in configuration to the crucified Christ; intellectual life is fulfilled, not cancelled, by that participation.",
        "tags": ["Cross", "Contemplation"],
        "paragraphs": [
          "Her unfinished work on John of the Cross joins phenomenological clarity to Carmelite doctrine of the night and union."
        ],
        "contrasts": [
          { "figureId": "john-cross", "topicKey": "grace", "label": "John of the Cross" },
          { "figureId": "teresa", "topicKey": "grace", "label": "Teresa of Ávila" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Teresa of Ávila", "figureId": "teresa" },
      { "name": "St. John of the Cross", "figureId": "john-cross" },
      { "name": "Edmund Husserl" }
    ],
    "influenced": [
      { "name": "Catholic philosophy of the person" },
      { "name": "Modern Carmelite witness" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Finite and Eternal Being", "note": "Philosophical-theological work" },
      { "title": "The Science of the Cross", "note": "On John of the Cross" },
      { "title": "Essays on woman and education", "note": "Earlier writings" }
    ]
  }
,
"elijah": {
    "id": "elijah",
    "name": "Elijah the Prophet",
    "centralQuestion": "How does solitary zeal for the living God on the mountain become the pattern of contemplative life?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/elijah.jpg",
    "dates": "9th century BC",
    "tradition": "early",
    "period": "Kingdom of Israel · Prophetic age",
    "roles": [
      "Prophet",
      "Man of Mount Carmel",
      "Spiritual father of the Carmelites"
    ],
    "epithet": "Prophet of fire and silence, claimed by the Carmelite order as its spiritual founder on Mount Carmel.",
    "intellectualPortrait": {
      "question": "What does Elijah give to Carmel?",
      "arc": ["Zeal", "Solitude", "Word", "Fire", "Horeb", "Succession"],
      "paragraphs": [
        {
          "label": "Zeal",
          "text": "Elijah’s cry—“I have been very zealous for the Lord”—is the root of Carmelite spirit: undivided loyalty to the living God against every idol."
        },
        {
          "label": "Solitude",
          "text": "The brook Cherith, the desert, and the mountain are not escapes from mission; they are the places where the prophet is fed and purified for speech."
        },
        {
          "label": "Horeb",
          "text": "At Horeb God is not in wind, earthquake, or fire, but in the still small voice. Carmelite contemplation hears that same quiet Word."
        },
        {
          "label": "Succession",
          "text": "The mantle passed to Elisha images a spiritual lineage. Carmelites receive Elijah not as a private hero but as father of a way of life."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Mount Carmel, raven, fire from heaven, and the cave of Horeb.",
      "motif": "Raven, mantle, mountain.",
      "typography": "meditative"
    },
    "bio": [
      "Elijah the Tishbite appears in the Books of Kings as the prophet who confronts Ahab and Jezebel, calls down fire on Mount Carmel, and flees to Horeb where he hears the still small voice of God.",
      "Fed by ravens at Cherith and by the widow of Zarephath, he lives a life of radical dependence. He is taken up in the whirlwind; Malachi and the New Testament remember him as the figure of eschatological return.",
      "From the early hermits on Mount Carmel through the medieval order, Carmelites have claimed Elijah as spiritual founder: solitude, zeal, and contemplative listening under Mary’s protection on the same mountain."
    ],
    "concepts": [
      "Zeal for the Lord",
      "Prophetic solitude",
      "Still small voice",
      "Mount Carmel"
    ],
    "opinions": [
      {
        "id": "still-small-voice",
        "title": "On the Still Small Voice",
        "thesis": "God’s decisive self-communication is often not in spectacular force but in the quiet word heard in solitude.",
        "tags": ["Contemplation", "Prophecy"],
        "paragraphs": [
          "Carmelite tradition reads Horeb as a charter of interior prayer: the prophet must pass beyond noise to the gentle presence of God.",
          "Zeal without listening becomes violence; listening without zeal becomes quietism. Elijah holds both."
        ],
        "contrasts": [
          { "figureId": "teresa", "topicKey": "grace", "label": "Teresa of Ávila" },
          { "figureId": "john-cross", "topicKey": "grace", "label": "John of the Cross" }
        ]
      }
    ],
    "influences": [
      { "name": "The Torah and the prophetic tradition of Israel" }
    ],
    "influenced": [
      { "name": "Carmelite order", "note": "Spiritual foundation on Mount Carmel" },
      { "name": "St. John the Baptist", "note": "New Testament Elijah typology" },
      { "name": "Christian eremitic and contemplative life" }
    ],
    "opponents": [
      { "name": "Ahab and Jezebel", "note": "Baal worship and injustice in Israel" }
    ],
    "controversies": [],
    "primarySources": [
      { "title": "1 Kings 17–19; 2 Kings 1–2", "note": "Principal biblical narratives" },
      { "title": "Malachi 3–4; Sirach 48", "note": "Later biblical memory" },
      { "title": "New Testament Elijah typology", "note": "Matthew 17; Luke 1; James 5" }
    ]
  }
,
"xavier": {
    "id": "xavier",
    "name": "St. Francis Xavier",
    "centralQuestion": "How does Ignatian discernment become a life poured out on the missions of the Far East?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/xavier.jpg",
    "dates": "1506–1552",
    "tradition": "early-modern",
    "period": "Age of Discovery · Early Society of Jesus",
    "roles": [
      "Jesuit missionary",
      "Apostle of the Indies",
      "Companion of Ignatius"
    ],
    "epithet": "First great Jesuit missionary, who carried the Exercises’ zeal from Paris to India, Japan, and the threshold of China.",
    "intellectualPortrait": {
      "question": "What was Xavier’s form of the Exercises?",
      "arc": ["Paris", "Vow", "India", "Japan", "Baptism", "Death"],
      "paragraphs": [
        {
          "label": "Paris",
          "text": "Xavier meets Ignatius at the University of Paris. The ambitious scholar is slowly won to a companionship that reorders desire toward mission."
        },
        {
          "label": "India",
          "text": "In Goa and along the Fishery Coast he preaches, baptizes, and organizes. The missionary is not a tourist of cultures; he is a man under obedience with a fixed intention."
        },
        {
          "label": "Japan",
          "text": "He adapts methods, learns to respect local forms, and plants the Church in a new world—Ignatian magis under Asian skies."
        },
        {
          "label": "Death",
          "text": "He dies on Shangchuan Island within sight of China, still reaching. The unfinished mission is part of the Jesuit imagination of holy restlessness."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Ship, crucifix, and the horizon of Asia.",
      "motif": "Crucifix, shell, map.",
      "typography": "meditative"
    },
    "bio": [
      "Francisco de Jasso y Azpilcueta was born in Navarre in 1506, studied in Paris, and became one of Ignatius’s first companions. Ordained and sent east by the Pope and the Society, he landed in Goa in 1542.",
      "His letters to Europe remain classics of missionary correspondence. He worked in India, the Malay Archipelago, and Japan before dying in 1552 on the approach to China.",
      "Canonized with Ignatius in 1622, he is patron of the foreign missions and a permanent measure of Jesuit apostolic reach."
    ],
    "concepts": [
      "Missionary obedience",
      "Inculturation and proclamation",
      "Magis",
      "Baptismal zeal"
    ],
    "opinions": [
      {
        "id": "mission-obedience",
        "title": "On Mission under Obedience",
        "thesis": "The Jesuit missionary is sent, not self-appointed; effectiveness is measured by fidelity to the mission received and the salvation of souls.",
        "tags": ["Mission", "Obedience"],
        "paragraphs": [
          "Xavier’s letters show both urgency and accountability to Ignatius and the Pope."
        ],
        "contrasts": [
          { "figureId": "ignatius", "topicKey": "church", "label": "Ignatius" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Ignatius of Loyola", "figureId": "ignatius" },
      { "name": "Spiritual Exercises" }
    ],
    "influenced": [
      { "name": "Jesuit missions worldwide" },
      { "name": "Modern missionary spirituality" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Letters of St. Francis Xavier", "note": "Principal primary source" },
      { "title": "Early Jesuit biographies", "note": "Torsellino and others" }
    ]
  },
  "faber": {
    "id": "faber",
    "name": "St. Peter Faber",
    "centralQuestion": "How does gentle spiritual conversation reform souls without crushing them?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/faber.jpg",
    "dates": "1506–1546",
    "tradition": "early-modern",
    "period": "Founding generation of the Society of Jesus",
    "roles": [
      "First companion of Ignatius",
      "Priest of spiritual conversation",
      "Reformer by gentleness"
    ],
    "epithet": "The first priest among Ignatius’s companions, master of mild and effective spiritual direction.",
    "intellectualPortrait": {
      "question": "What was Faber’s gift?",
      "arc": ["Savoy", "Paris", "Exercises", "Germany", "Conversation", "Memory"],
      "paragraphs": [
        {
          "label": "Conversation",
          "text": "Faber excelled at the Ignatian art of spiritual conversation—meeting people where they are, proposing the Exercises without violence, healing by patience."
        },
        {
          "label": "Germany",
          "text": "In the heated atmosphere of the Reformation he worked for reform of clergy and laity by presence and direction rather than by polemic alone."
        },
        {
          "label": "Exercises",
          "text": "He gave the Spiritual Exercises widely. His Memoriale reveals a soul sensitive to consolation, desolation, and the movements of the spirits."
        },
        {
          "label": "Memory",
          "text": "Ignatius valued him highly; later Jesuits recovered him as the model of gentle apostolic accompaniment."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Quiet room, companionable speech, and the book of the Exercises.",
      "motif": "Open Exercises, road, mild light.",
      "typography": "meditative"
    },
    "bio": [
      "Pierre Favre was born in Savoy in 1506, roomed with Francis Xavier at Paris, and was the first of the companions ordained. He helped shape the early Society’s practice of the Exercises.",
      "He worked in Italy, Germany, and Spain, and died in Rome in 1546 on the eve of being sent to Trent.",
      "Beatified in 1872 and canonized by Pope Francis in 2013, he stands for a Jesuitism of listening and interior reform."
    ],
    "concepts": [
      "Spiritual conversation",
      "Discernment",
      "Gentle reform",
      "Memoriale"
    ],
    "opinions": [
      {
        "id": "gentle-direction",
        "title": "On Gentle Spiritual Direction",
        "thesis": "Souls are led more surely by patient conversation and the Exercises than by harshness; the director must discern spirits, not impose a template.",
        "tags": ["Discernment", "Direction"],
        "paragraphs": [
          "Faber’s way is Ignatian: find God in the person before you, and adapt the means."
        ],
        "contrasts": [
          { "figureId": "ignatius", "topicKey": "church", "label": "Ignatius" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Ignatius of Loyola", "figureId": "ignatius" }
    ],
    "influenced": [
      { "name": "Jesuit spiritual direction" },
      { "name": "Contemporary practice of the Exercises" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Memoriale", "note": "Spiritual diary" },
      { "title": "Letters", "note": "Correspondence" }
    ]
  },
  "canisius": {
    "id": "canisius",
    "name": "St. Peter Canisius",
    "centralQuestion": "How can clear catechesis and patient presence rebuild Catholic life in a divided Germany?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/canisius.jpg",
    "dates": "1521–1597",
    "tradition": "early-modern",
    "period": "Catholic Reformation · Holy Roman Empire",
    "roles": [
      "Jesuit",
      "Doctor of the Church",
      "Catechist of Germany"
    ],
    "epithet": "Second Apostle of Germany, Doctor of the Church, whose catechisms formed generations.",
    "intellectualPortrait": {
      "question": "What was Canisius’s strategy?",
      "arc": ["Nijmegen", "Jesuits", "Catechism", "Colleges", "Patience", "Doctrine"],
      "paragraphs": [
        {
          "label": "Catechism",
          "text": "His catechisms—large and small—gave clergy and laity a clear, structured account of the faith without needless bitterness."
        },
        {
          "label": "Colleges",
          "text": "He founded and strengthened Jesuit colleges as engines of Catholic education and culture in the Empire."
        },
        {
          "label": "Patience",
          "text": "He preferred long presence to quick victory. Reform of the Church in German lands required stamina and charity."
        },
        {
          "label": "Doctrine",
          "text": "Named Doctor of the Church, he joins learning to pastoral usefulness—the Jesuit ideal of contemplatives in action for a whole region."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "German college, catechism book, and the sober light of reform.",
      "motif": "Catechism, quill, Jesuit seal.",
      "typography": "scholastic"
    },
    "bio": [
      "Pieter Kanis was born in Nijmegen in 1521, joined the Society of Jesus, and became the leading Jesuit of the German-speaking world.",
      "He wrote catechisms, preached, advised princes and bishops, and established colleges. He died at Fribourg in 1597.",
      "Pius XI declared him a Doctor of the Church in 1925."
    ],
    "concepts": [
      "Catechesis",
      "Catholic education",
      "Patient reform",
      "Doctrinal clarity"
    ],
    "opinions": [
      {
        "id": "catechesis",
        "title": "On Catechesis",
        "thesis": "The faith must be taught clearly and systematically so that the baptized know what they believe and can live it under pressure.",
        "tags": ["Catechism", "Education"],
        "paragraphs": [
          "Canisius’s method is formation, not mere argument: schools, books, and long fidelity to place."
        ],
        "contrasts": [
          { "figureId": "bellarmine", "topicKey": "church", "label": "Bellarmine" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Ignatius of Loyola", "figureId": "ignatius" },
      { "name": "Spiritual Exercises" }
    ],
    "influenced": [
      { "name": "Catholic education in Central Europe" },
      { "name": "Catechetical tradition" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Catechismi", "note": "Major and minor catechisms" },
      { "title": "Letters and sermons", "note": "Pastoral corpus" }
    ]
  },
  "aloysius": {
    "id": "aloysius",
    "name": "St. Aloysius Gonzaga",
    "centralQuestion": "How does a young Jesuit live purity, obedience, and charity when death is near?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/aloysius.jpg",
    "dates": "1568–1591",
    "tradition": "early-modern",
    "period": "Late sixteenth-century Rome",
    "roles": [
      "Jesuit scholastic",
      "Patron of youth",
      "Servant of the plague-stricken"
    ],
    "epithet": "Young Jesuit who renounced princely inheritance and died serving plague victims in Rome.",
    "intellectualPortrait": {
      "question": "What does Aloysius show?",
      "arc": ["Court", "Renunciation", "Novitiate", "Purity", "Plague", "Death"],
      "paragraphs": [
        {
          "label": "Renunciation",
          "text": "Heir to a princely house, he renounces succession to enter the Society—magis as loss of status for the sake of Christ."
        },
        {
          "label": "Purity",
          "text": "His reputation for chastity is not fragility; it is ordered love under the Exercises’ demand to order affections."
        },
        {
          "label": "Plague",
          "text": "When plague strikes Rome he nurses the sick and contracts the disease—charity as the form of Jesuit formation."
        },
        {
          "label": "Youth",
          "text": "As patron of youth he embodies an early, total gift of life rather than delayed seriousness."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Roman novitiate, lily, and the shadow of the hospital.",
      "motif": "Lily, crucifix, young face.",
      "typography": "meditative"
    },
    "bio": [
      "Aloysius (Luigi) Gonzaga was born in 1568 to the princely family of Castiglione. After struggles with his father he entered the Society of Jesus in 1585.",
      "As a scholastic in Rome he served victims of the 1591 epidemic and died at twenty-three.",
      "Beatified in 1605 and canonized in 1726, he is patron of young students and a model of early consecration."
    ],
    "concepts": [
      "Youthful consecration",
      "Purity of heart",
      "Charity in plague",
      "Renunciation of rank"
    ],
    "opinions": [
      {
        "id": "early-gift",
        "title": "On the Early Gift of Life",
        "thesis": "Holiness does not wait for middle age; a young person can give a whole life to obedience and charity under the Exercises.",
        "tags": ["Youth", "Charity"],
        "paragraphs": [
          "Aloysius’s short life is not incomplete Jesuitism; it is Jesuitism concentrated."
        ],
        "contrasts": [
          { "figureId": "ignatius", "topicKey": "church", "label": "Ignatius" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Ignatius of Loyola", "figureId": "ignatius" },
      { "name": "Spiritual Exercises" }
    ],
    "influenced": [
      { "name": "Jesuit education and youth spirituality" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Early Jesuit lives of Aloysius", "note": "Cepari and others" },
      { "title": "Letters", "note": "Family and Society correspondence" }
    ]
  }
,
"dominic": {
    "id": "dominic",
    "name": "St. Dominic de Guzmán",
    "centralQuestion": "How can itinerant preaching, study, and apostolic poverty renew the Church against error and indifference?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/dominic.jpg",
    "dates": "c. 1170–1221",
    "tradition": "medieval",
    "period": "Albigensian crisis · Rise of the mendicants",
    "roles": [
      "Founder of the Order of Preachers",
      "Itinerant preacher",
      "Organizer of apostolic life"
    ],
    "epithet": "Founder of the Dominicans, who joined study, poverty, and preaching in one apostolic form of life.",
    "intellectualPortrait": {
      "question": "What did Dominic found?",
      "arc": ["Osma", "Languedoc", "Preaching", "Poverty", "Study", "Order"],
      "paragraphs": [
        {
          "label": "Preaching",
          "text": "Dominic’s response to heresy is not first the sword but the Word: learned, poor, mobile preachers who live what they teach."
        },
        {
          "label": "Poverty",
          "text": "Apostolic poverty is credibility. The preacher who owns little can speak freely of the Gospel without the weight of benefice."
        },
        {
          "label": "Study",
          "text": "The Order of Preachers is built for study ordered to preaching—contemplata aliis tradere before the motto is fixed in words."
        },
        {
          "label": "Order",
          "text": "He leaves not a private circle but a structured order: convents, provinces, and a mission to the whole Church."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Road, star, and the black-and-white habit of the Preachers.",
      "motif": "Star, dog with torch, book.",
      "typography": "meditative"
    },
    "bio": [
      "Domingo de Guzmán was born in Castile around 1170, became a canon of Osma, and was drawn into preaching against the Albigensian movement in Languedoc.",
      "He founded the Order of Preachers, approved by Honorius III in 1216, uniting contemplative study with itinerant preaching under a form of mendicant poverty.",
      "He died in Bologna in 1221 and was canonized in 1234. The Dominicans remain his living commentary."
    ],
    "concepts": [
      "Order of Preachers",
      "Apostolic poverty",
      "Study for preaching",
      "Contemplata aliis tradere"
    ],
    "opinions": [
      {
        "id": "preach-and-study",
        "title": "On Preaching and Study",
        "thesis": "True preaching requires a life of study and prayer; the Order exists to hand on the fruits of contemplation.",
        "tags": ["Preaching", "Study"],
        "paragraphs": [
          "Dominic’s intuition becomes the Dominican charism: truth is not private property; it is received and given."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "Canonical life of Osma" },
      { "name": "Apostolic life in the Gospels" }
    ],
    "influenced": [
      { "name": "St. Thomas Aquinas", "figureId": "aquinas" },
      { "name": "St. Albert the Great", "figureId": "albert" },
      { "name": "All later Dominican life" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Early lives of St. Dominic", "note": "Jordan of Saxony and others" },
      { "title": "Primitive constitutions of the Order", "note": "Organizational charter" }
    ]
  },
  "catherine-siena": {
    "id": "catherine-siena",
    "name": "St. Catherine of Siena",
    "centralQuestion": "How does mystical union with Christ become public service of Church reform and charity?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/catherine-siena.jpg",
    "dates": "1347–1380",
    "tradition": "medieval",
    "period": "Avignon papacy · Western Schism threshold",
    "roles": [
      "Dominican tertiary",
      "Doctor of the Church",
      "Mystic and reformer"
    ],
    "epithet": "Dominican tertiary and Doctor whose Dialogue and letters joined contemplation to ecclesial courage.",
    "intellectualPortrait": {
      "question": "What did Catherine unite?",
      "arc": ["Cell", "Blood", "Truth", "Church", "Peace", "Dialogue"],
      "paragraphs": [
        {
          "label": "Cell",
          "text": "Her interior cell is the place of encounter with Christ. Contemplation is not escape; it is the source of her public speech."
        },
        {
          "label": "Blood",
          "text": "Catherine’s spirituality is Christocentric and cruciform—the blood of Christ as mercy poured out for the world’s salvation."
        },
        {
          "label": "Church",
          "text": "She urges the Pope to return to Rome and later labors for unity. Mysticism here serves the visible Church, not private rapture."
        },
        {
          "label": "Dialogue",
          "text": "The Dialogue records a theology of providence, sin, and love in the form of conversation between the soul and God."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Sienese light, white veil, lily, and the book of the Dialogue.",
      "motif": "Lily, stigmata tradition, papal keys of concern.",
      "typography": "meditative"
    },
    "bio": [
      "Caterina di Jacopo di Benincasa was born in Siena in 1347, joined the Mantellate (Dominican tertiaries), and became a counselor of souls and of public figures.",
      "She worked for the return of the papacy to Rome and for peace among Italian cities. She died in Rome in 1380.",
      "Pius II canonized her in 1461; Paul VI declared her a Doctor of the Church in 1970."
    ],
    "concepts": [
      "Mystical dialogue",
      "Church reform",
      "Christ’s blood",
      "Dominican tertiary vocation"
    ],
    "opinions": [
      {
        "id": "truth-and-love",
        "title": "On Truth and Love in the Church",
        "thesis": "Authentic contemplation produces courageous charity toward the Church’s visible life, including frank speech to those in authority.",
        "tags": ["Church", "Mysticism"],
        "paragraphs": [
          "Catherine refuses both quietism and mere politics. The soul that knows God must serve the body of Christ."
        ],
        "contrasts": [
          { "figureId": "dominic", "topicKey": "church", "label": "Dominic" },
          { "figureId": "aquinas", "topicKey": "church", "label": "Aquinas" }
        ]
      }
    ],
    "influences": [
      { "name": "Dominican spirituality", "figureId": "dominic" },
      { "name": "Scripture and the Fathers" }
    ],
    "influenced": [
      { "name": "Dominican and lay mysticism" },
      { "name": "Theology of the laity and reform" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "The Dialogue", "note": "Principal mystical-theological work" },
      { "title": "Letters", "note": "Extensive correspondence" },
      { "title": "Prayers", "note": "Short texts" }
    ]
  },
  "vincent-ferrer": {
    "id": "vincent-ferrer",
    "name": "St. Vincent Ferrer",
    "centralQuestion": "How does Dominican preaching call a late-medieval world to conversion under the shadow of judgment?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/vincent-ferrer.jpg",
    "dates": "1350–1419",
    "tradition": "medieval",
    "period": "Western Schism · Late medieval mission",
    "roles": [
      "Dominican friar",
      "Apostolic preacher",
      "Missionary of conversion"
    ],
    "epithet": "Valencian Dominican whose preaching missions stirred mass conversion and repentance across Western Europe.",
    "intellectualPortrait": {
      "question": "What marked Vincent’s preaching?",
      "arc": ["Valencia", "Schism", "Mission", "Judgment", "Conversion", "Order"],
      "paragraphs": [
        {
          "label": "Mission",
          "text": "Vincent travels with a company, preaching in town after town—Dominican itinerancy on a continental scale."
        },
        {
          "label": "Judgment",
          "text": "His emphasis on the last things is pastoral urgency, not spectacle: repent, be reconciled, return to the sacraments."
        },
        {
          "label": "Schism",
          "text": "He navigates the Western Schism with a conscience strained by competing obediences—a reminder that even holy preachers live inside history’s wounds."
        },
        {
          "label": "Conversion",
          "text": "Jewish and Muslim conversions attributed to his missions belong to a complex age; the enduring core is the call to Christian repentance."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Open-air pulpit, trumpet of judgment, Dominican habit.",
      "motif": "Trumpet, flame, book.",
      "typography": "meditative"
    },
    "bio": [
      "Vincent Ferrer was born in Valencia in 1350, entered the Order of Preachers, and became one of the most famous preachers of the later Middle Ages.",
      "He conducted extensive missions in France, Spain, and beyond, and died in Vannes in 1419. He was canonized in 1455.",
      "Art often shows him with the trumpet of the last judgment—an icon of his urgent Dominican word."
    ],
    "concepts": [
      "Apostolic preaching",
      "Conversion and penance",
      "Last things",
      "Dominican mission"
    ],
    "opinions": [
      {
        "id": "urgent-word",
        "title": "On Urgent Preaching",
        "thesis": "The preacher must speak of judgment and mercy together, calling hearers to immediate conversion of life.",
        "tags": ["Preaching", "Penance"],
        "paragraphs": [
          "Vincent’s style is dramatic; its content remains Dominican: truth ordered to the salvation of souls."
        ],
        "contrasts": [
          { "figureId": "dominic", "topicKey": "church", "label": "Dominic" }
        ]
      }
    ],
    "influences": [
      { "name": "St. Dominic", "figureId": "dominic" },
      { "name": "Dominican scholastic formation" }
    ],
    "influenced": [
      { "name": "Late medieval popular preaching" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Sermons", "note": "Extant preaching corpus" },
      { "title": "Treatise on the Spiritual Life", "note": "Attributed works" }
    ]
  },
  "martin-porres": {
    "id": "martin-porres",
    "name": "St. Martin de Porres",
    "centralQuestion": "How does Dominican charity cross the barriers of race and class in ordinary service?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/martin-porres.jpg",
    "dates": "1579–1639",
    "tradition": "early-modern",
    "period": "Colonial Lima · Baroque holiness",
    "roles": [
      "Dominican lay brother",
      "Servant of the poor",
      "Patron of mixed-race peoples"
    ],
    "epithet": "Dominican brother of Lima whose humility and care for the sick made him a universal figure of charity.",
    "intellectualPortrait": {
      "question": "What does Martin teach?",
      "arc": ["Lima", "Race", "Infirmary", "Humility", "Animals", "Glory"],
      "paragraphs": [
        {
          "label": "Race",
          "text": "Born of a Spanish father and a freed African mother, Martin enters Dominican life from the margins and becomes a center of holiness."
        },
        {
          "label": "Infirmary",
          "text": "His days are medicine, sweeping, and care of the sick—contemplata aliis tradere in the key of the body."
        },
        {
          "label": "Humility",
          "text": "He refuses status. Dominican study’s fruit in him is not a chair but a broom and a clinic."
        },
        {
          "label": "Charity",
          "text": "Popular memory of miracles and care for animals points to a life transparent to providence and kindness."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Lima convent, broom, bowl of medicine, and quiet light.",
      "motif": "Broom, dog and cat, crucifix.",
      "typography": "meditative"
    },
    "bio": [
      "Martín de Porres Velázquez was born in Lima in 1579. He entered the Dominican convent of the Holy Rosary as a lay brother and spent his life in humble offices and care of the poor.",
      "He died in 1639, was beatified in 1837, and canonized by John XXIII in 1962.",
      "He is patron of mixed-race people, public health workers, and those seeking interracial justice—always as a Dominican of charity."
    ],
    "concepts": [
      "Humble service",
      "Charity across barriers",
      "Dominican lay brotherhood",
      "Care of the sick"
    ],
    "opinions": [
      {
        "id": "charity-barriers",
        "title": "On Charity across Barriers",
        "thesis": "Holiness measures a community by how it receives the one who serves from below; charity is the proof of contemplation.",
        "tags": ["Charity", "Humility"],
        "paragraphs": [
          "Martin’s life is a Dominican sermon without a pulpit."
        ],
        "contrasts": [
          { "figureId": "dominic", "topicKey": "church", "label": "Dominic" },
          { "figureId": "catherine-siena", "topicKey": "church", "label": "Catherine" }
        ]
      }
    ],
    "influences": [
      { "name": "Dominican Rule and community", "figureId": "dominic" }
    ],
    "influenced": [
      { "name": "Latin American Catholic devotion" },
      { "name": "Spirituality of racial reconciliation" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Process of beatification and early lives", "note": "Lima tradition" }
    ]
  }
,
"anthony-great": {
    "id": "anthony-great",
    "name": "St. Anthony the Great",
    "centralQuestion": "How does solitary endurance against the demons become the pattern of Christian monastic life?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/anthony-great.jpg",
    "dates": "c. 251–356",
    "tradition": "early",
    "period": "Egyptian Desert · Age of the martyrs’ aftermath",
    "roles": [
      "Hermit",
      "Father of Monks",
      "Archetype of the Desert"
    ],
    "epithet": "Father of Western and Eastern monastic imagination, whose Life by Athanasius defined the hermit ideal.",
    "intellectualPortrait": {
      "question": "What did Anthony enact?",
      "arc": ["Call", "Tomb", "Desert", "Demons", "Disciples", "Empire"],
      "paragraphs": [
        {
          "label": "Call",
          "text": "Hearing the Gospel—“If you would be perfect, sell what you possess”—Anthony renounces inheritance and follows Christ into radical simplicity."
        },
        {
          "label": "Demons",
          "text": "The desert is a battlefield. Temptation is not metaphor only; the Life of Anthony dramatizes spiritual warfare as the hermit’s daily work."
        },
        {
          "label": "Disciples",
          "text": "Though he flees crowds, disciples gather. The solitary becomes father; the desert becomes a city of monks."
        },
        {
          "label": "Empire",
          "text": "Athanasius’s Life presents Anthony as a living argument against pagan wisdom—unlettered yet wiser than philosophers, fearless before emperors’ world."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Egyptian waste, tau cross, and the long endurance of the hermit.",
      "motif": "Tau cross, pigs of legend, cave.",
      "typography": "meditative"
    },
    "bio": [
      "Anthony was born in Middle Egypt around 251. After his parents’ death he embraced the Gospel counsel of poverty and withdrew progressively into solitude.",
      "Athanasius of Alexandria wrote his Life soon after Anthony’s death in 356; it became the foundational hagiography of Christian monasticism.",
      "From the Thebaid to the Latin West, Anthony remains the type of the monk who fights for purity of heart in the desert."
    ],
    "concepts": [
      "Hermit life",
      "Spiritual warfare",
      "Gospel poverty",
      "Purity of heart"
    ],
    "opinions": [
      {
        "id": "desert-battle",
        "title": "On the Desert as Battlefield",
        "thesis": "Withdrawal is not escape from struggle but entry into a clearer fight against the passions and the demons.",
        "tags": ["Asceticism", "Temptation"],
        "paragraphs": [
          "Anthony’s authority rests on long tested endurance, not on novelty of technique."
        ],
        "contrasts": []
      }
    ],
    "influences": [
      { "name": "The Gospel and Egyptian Christianity" },
      { "name": "Martyr tradition" }
    ],
    "influenced": [
      { "name": "All later monasticism" },
      { "name": "St. Athanasius", "figureId": "athanasius" },
      { "name": "St. John Cassian", "figureId": "cassian" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Athanasius, Life of Anthony", "note": "Principal source" },
      { "title": "Sayings of the Desert Fathers (Apophthegmata)", "note": "Attributed sayings" }
    ]
  },
  "syncletica": {
    "id": "syncletica",
    "name": "St. Syncletica of Alexandria",
    "centralQuestion": "How do humility, endurance, and discernment form the Desert Mother’s path?",
    "centralQuestionLabel": "Her Central Question",
    "portrait": "img/figures/syncletica.jpg",
    "dates": "c. 270–c. 350",
    "tradition": "early",
    "period": "Egyptian Desert · Desert Mothers",
    "roles": [
      "Desert Mother",
      "Abbess-teacher",
      "Guide of women ascetics"
    ],
    "epithet": "Alexandrian Desert Mother whose sayings teach endurance, humility, and sober discernment.",
    "intellectualPortrait": {
      "question": "What did Syncletica emphasize?",
      "arc": ["Renunciation", "Humility", "Illness", "Discernment", "Endurance", "Community"],
      "paragraphs": [
        {
          "label": "Humility",
          "text": "Syncletica warns that ascetic feats without humility are empty. The true measure is the heart’s lowliness before God."
        },
        {
          "label": "Discernment",
          "text": "Not every hardship is holy; not every consolation is pure. The Desert Mother trains judgment about thoughts and practices."
        },
        {
          "label": "Endurance",
          "text": "Illness and long trial become her school. Patience under the body’s weakness is part of the monastic way."
        },
        {
          "label": "Women",
          "text": "Her sayings show that the desert’s wisdom is not reserved to men; Amma Syncletica speaks with equal authority in the Apophthegmata."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Alexandrian simplicity, veil, and the quiet of the women’s community.",
      "motif": "Lamp, veil, desert horizon.",
      "typography": "meditative"
    },
    "bio": [
      "Syncletica of Alexandria, according to tradition, renounced wealth and lived as an amma among desert women in the fourth century.",
      "Her sayings are preserved in the alphabetical Apophthegmata Patrum and related collections.",
      "She is remembered as a principal Desert Mother—teacher of endurance when the body fails and the heart must still choose humility."
    ],
    "concepts": [
      "Desert Mothers",
      "Humility",
      "Discernment of practices",
      "Endurance in illness"
    ],
    "opinions": [
      {
        "id": "humility-over-feat",
        "title": "On Humility over Ascetic Display",
        "thesis": "Without humility, fasting and vigil are a show; with humility, even small endurance becomes great.",
        "tags": ["Humility", "Asceticism"],
        "paragraphs": [
          "Syncletica’s counsel guards the desert against spiritual pride."
        ],
        "contrasts": [
          { "figureId": "anthony-great", "topicKey": "grace", "label": "Anthony" }
        ]
      }
    ],
    "influences": [
      { "name": "Egyptian desert tradition", "figureId": "anthony-great" }
    ],
    "influenced": [
      { "name": "Tradition of the Desert Mothers" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Apophthegmata Patrum (Syncletica sayings)", "note": "Alphabetical collection" },
      { "title": "Life of Syncletica (attributed)", "note": "Later hagiographic tradition" }
    ]
  },
  "pachomius": {
    "id": "pachomius",
    "name": "St. Pachomius the Great",
    "centralQuestion": "How can common life under a rule form monks without losing the desert’s radical edge?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/pachomius.jpg",
    "dates": "c. 292–348",
    "tradition": "early",
    "period": "Egyptian cenobitism",
    "roles": [
      "Founder of cenobitic monasticism",
      "Abba of Tabennisi",
      "Legislator of common life"
    ],
    "epithet": "Father of communal monasticism, who organized monks under a shared rule and obedience.",
    "intellectualPortrait": {
      "question": "What did Pachomius invent?",
      "arc": ["Soldier", "Conversion", "Tabennisi", "Rule", "Federation", "Obedience"],
      "paragraphs": [
        {
          "label": "Cenobium",
          "text": "Against pure solitude as the only way, Pachomius builds villages of monks—shared prayer, work, and meals under an abba."
        },
        {
          "label": "Rule",
          "text": "Written and unwritten regulations order the day. The desert’s intensity is channeled through structure."
        },
        {
          "label": "Obedience",
          "text": "The monk learns Christ through obedience to the superior and the brothers—not as bureaucracy, but as training of the will."
        },
        {
          "label": "Federation",
          "text": "Multiple houses under one spirit: Pachomian monasteries become a network, a social form of the desert."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Nile monastery walls, common table, and ordered ranks of monks.",
      "motif": "Rule scroll, river, enclosure.",
      "typography": "meditative"
    },
    "bio": [
      "Pachomius was born in Upper Egypt around 292, served as a conscript, converted, and after a time as a hermit founded the monastery at Tabennisi.",
      "He established a network of cenobia with a common rule. He died in 348 during a plague while caring for brothers.",
      "Basil and Benedict later stand downstream of the Pachomian insight that monks can be formed together."
    ],
    "concepts": [
      "Cenobitic life",
      "Monastic rule",
      "Obedience",
      "Common work and prayer"
    ],
    "opinions": [
      {
        "id": "common-life",
        "title": "On Common Life",
        "thesis": "The monastery as a structured community is a legitimate and fruitful form of desert Christianity, not a betrayal of solitude.",
        "tags": ["Cenobium", "Rule"],
        "paragraphs": [
          "Pachomius complements Anthony: the desert has both cave and cloister."
        ],
        "contrasts": [
          { "figureId": "anthony-great", "topicKey": "church", "label": "Anthony" }
        ]
      }
    ],
    "influences": [
      { "name": "Egyptian hermit tradition", "figureId": "anthony-great" }
    ],
    "influenced": [
      { "name": "St. Basil", "figureId": "basil" },
      { "name": "St. Benedict", "figureId": "benedict" },
      { "name": "Cenobitic monasticism worldwide" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Pachomian rules and lives", "note": "Bohairic and Greek traditions" }
    ]
  },
  "macarius": {
    "id": "macarius",
    "name": "St. Macarius of Egypt",
    "centralQuestion": "How do mercy, silence, and pure prayer heal the heart in the desert of Scetis?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/macarius.jpg",
    "dates": "c. 300–391",
    "tradition": "early",
    "period": "Scetis · Golden age of the Desert Fathers",
    "roles": [
      "Abba of Scetis",
      "Desert Father",
      "Teacher of pure prayer"
    ],
    "epithet": "Macarius the Great of Egypt, abba of Scetis, remembered for mercy and deep prayer.",
    "intellectualPortrait": {
      "question": "What was Macarius’s charism?",
      "arc": ["Scetis", "Mercy", "Silence", "Prayer", "Sayings", "Spirit"],
      "paragraphs": [
        {
          "label": "Mercy",
          "text": "Sayings about Macarius stress gentleness toward sinners—covering another’s fault as a form of desert love."
        },
        {
          "label": "Prayer",
          "text": "Homilies associated with his name (and the Macarian corpus) describe the soul’s progress toward pure prayer and the indwelling of the Spirit."
        },
        {
          "label": "Scetis",
          "text": "As a leading abba of the Wadi El Natrun, he represents the classical desert of cells, elders, and short sharp sayings."
        },
        {
          "label": "Silence",
          "text": "Words are few because attention is costly. The abba speaks to heal, not to display."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Scetis cells, sand, and the soft light of an elder’s doorway.",
      "motif": "Cell, staff, open hand of mercy.",
      "typography": "meditative"
    },
    "bio": [
      "Macarius the Egyptian was born around 300 and became a principal abba of Scetis. Disciples gathered to him for a word of salvation.",
      "He is distinct from Macarius of Alexandria; both appear in desert tradition. He died around 391.",
      "The Macarian Homilies, whether all by his hand or of his school, carried desert interiority into later Byzantine and Syriac spirituality."
    ],
    "concepts": [
      "Pure prayer",
      "Mercy covering sin",
      "Abba and disciple",
      "Scetis"
    ],
    "opinions": [
      {
        "id": "mercy-desert",
        "title": "On Mercy in the Desert",
        "thesis": "The elder’s authority is shown in compassion that heals the brother’s shame without flattering the sin.",
        "tags": ["Mercy", "Direction"],
        "paragraphs": [
          "Macarius’s sayings refuse both harshness and laxity."
        ],
        "contrasts": [
          { "figureId": "anthony-great", "topicKey": "grace", "label": "Anthony" }
        ]
      }
    ],
    "influences": [
      { "name": "Anthony and the Egyptian desert", "figureId": "anthony-great" }
    ],
    "influenced": [
      { "name": "Macarian homiletic tradition" },
      { "name": "Byzantine hesychasm (indirectly)" }
    ],
    "opponents": [],
    "controversies": [],
    "primarySources": [
      { "title": "Apophthegmata (Macarius sayings)", "note": "Desert sayings" },
      { "title": "Spiritual Homilies (Macarian corpus)", "note": "Attributed school" }
    ]
  },
  "evagrius": {
    "id": "evagrius",
    "name": "Evagrius Ponticus",
    "centralQuestion": "How can watchfulness over thoughts (logismoi) purify the mind for pure prayer?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/evagrius.jpg",
    "dates": "345–399",
    "tradition": "early",
    "period": "Nitria and Kellia · Intellectual desert",
    "roles": [
      "Desert monk",
      "Theorist of the eight thoughts",
      "Teacher of pure prayer"
    ],
    "epithet": "Pontic intellectual who mapped the eight evil thoughts and the path to pure prayer in the Egyptian desert.",
    "intellectualPortrait": {
      "question": "What did Evagrius map?",
      "arc": ["Pontus", "Constantinople", "Desert", "Logismoi", "Prayer", "Controversy"],
      "paragraphs": [
        {
          "label": "Logismoi",
          "text": "Evagrius classifies the eight principal thoughts—gluttony, lust, avarice, sadness, anger, acedia, vainglory, pride—as the battlefield of the mind."
        },
        {
          "label": "Prayer",
          "text": "Pure prayer is the mind’s stripped attention to God, beyond images and distraction—the goal of ascetic warfare."
        },
        {
          "label": "Watchfulness",
          "text": "The monk observes thoughts as they arise, neither consenting nor panicking—a clinical and spiritual attention."
        },
        {
          "label": "Legacy",
          "text": "Later condemned in part for Origenist speculations, his ascetic psychology survived through Cassian, Maximus, and the Philokalia under other names."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Cell at Kellia, scroll, and the quiet tracing of thoughts.",
      "motif": "Scroll, eightfold diagram of memory, lamp.",
      "typography": "scholastic"
    },
    "bio": [
      "Evagrius was born in Pontus in 345, served in Constantinople, then fled to the Egyptian desert, settling among the monks of Nitria and Kellia.",
      "He wrote extensively on prayer and the passions. He died in 399.",
      "Though later Origenist controversies shadowed his name, his analysis of the thoughts became standard monastic psychology in East and West."
    ],
    "concepts": [
      "Eight thoughts (logismoi)",
      "Acedia",
      "Pure prayer",
      "Watchfulness (nēpsis)"
    ],
    "opinions": [
      {
        "id": "eight-thoughts",
        "title": "On the Eight Thoughts",
        "thesis": "Spiritual combat is clarified by naming the principal thoughts that assault the monk; healing begins with recognition and refusal of consent.",
        "tags": ["Asceticism", "Prayer"],
        "paragraphs": [
          "Cassian will transmit a closely related scheme of eight principal faults to the Latin West."
        ],
        "contrasts": [
          { "figureId": "cassian", "topicKey": "grace", "label": "Cassian" }
        ]
      }
    ],
    "influences": [
      { "name": "Origen" },
      { "name": "Egyptian desert elders", "figureId": "anthony-great" },
      { "name": "Cappadocian milieu" }
    ],
    "influenced": [
      { "name": "St. John Cassian", "figureId": "cassian" },
      { "name": "Philokalic tradition" },
      { "name": "Western teaching on capital sins (via Cassian)" }
    ],
    "opponents": [],
    "controversies": [
      {
        "id": "origenism",
        "title": "Origenist controversy",
        "summary": "Speculative elements associated with Evagrius were later condemned; his ascetic writings continued to be used, often anonymously or under other names."
      }
    ],
    "primarySources": [
      { "title": "Praktikos", "note": "Ascetic treatise" },
      { "title": "Chapters on Prayer", "note": "On pure prayer" },
      { "title": "Kephalaia Gnostika", "note": "Speculative chapters—read with caution" }
    ]
  },
  "cassian": {
    "id": "cassian",
    "name": "St. John Cassian",
    "centralQuestion": "How can the wisdom of the Egyptian desert be transplanted into Latin monastic life?",
    "centralQuestionLabel": "His Central Question",
    "portrait": "img/figures/cassian.jpg",
    "dates": "c. 360–c. 435",
    "tradition": "early",
    "period": "Bridge from Egypt to Gaul",
    "roles": [
      "Monk and priest",
      "Founder of abbeys near Marseille",
      "Transmitter of Desert wisdom"
    ],
    "epithet": "The great translator of Egyptian monastic experience into Latin Institutes and Conferences.",
    "intellectualPortrait": {
      "question": "What did Cassian transmit?",
      "arc": ["Palestine", "Egypt", "Constantinople", "Gaul", "Institutes", "Conferences"],
      "paragraphs": [
        {
          "label": "Egypt",
          "text": "Cassian learns from the abbas of the desert—the Conferences stage long dialogues on prayer, discretion, and the goal of the monk."
        },
        {
          "label": "Institutes",
          "text": "He describes habit, prayer hours, and the eight principal faults—practical architecture for Western monasteries."
        },
        {
          "label": "Discretion",
          "text": "Discretion is the mother of virtues: without it, fasting and vigil become self-will. The desert’s gold is judgment, not extremity."
        },
        {
          "label": "West",
          "text": "Benedict will recommend Cassian by name. Through him the desert speaks Latin."
        }
      ]
    },
    "visual": {
      "preset": "scholastic",
      "mood": "Marseille cloister, Egyptian memory, and an open book of Conferences.",
      "motif": "Book, Mediterranean light, monk’s staff.",
      "typography": "meditative"
    },
    "bio": [
      "John Cassian was born around 360, spent years among the monks of Egypt, served in Constantinople, and finally settled in Gaul, founding monasteries near Marseille.",
      "His Institutes and Conferences became manuals of Western monasticism. He died around 435.",
      "Though later debates touched his views on grace relative to Augustine, his ascetic authority remained immense—especially through Benedict’s Rule."
    ],
    "concepts": [
      "Discretion",
      "Eight principal faults",
      "Purity of heart",
      "Conferences of the Fathers"
    ],
    "opinions": [
      {
        "id": "discretion",
        "title": "On Discretion",
        "thesis": "Discretion is the guiding virtue of the ascetic life; without it, every other practice can become harmful.",
        "tags": ["Discretion", "Asceticism"],
        "paragraphs": [
          "Cassian’s desert is not maximalism; it is measured zeal under an elder’s wisdom."
        ],
        "contrasts": [
          { "figureId": "evagrius", "topicKey": "grace", "label": "Evagrius" },
          { "figureId": "benedict", "topicKey": "church", "label": "Benedict" }
        ]
      }
    ],
    "influences": [
      { "name": "Egyptian Desert Fathers", "figureId": "anthony-great" },
      { "name": "Evagrius Ponticus", "figureId": "evagrius" }
    ],
    "influenced": [
      { "name": "St. Benedict", "figureId": "benedict" },
      { "name": "Western monasticism" }
    ],
    "opponents": [],
    "controversies": [
      {
        "id": "grace-debate",
        "title": "Cassian and Augustinian grace",
        "summary": "Cassian’s Conference 13 on grace and free will was later read against Augustine’s late anti-Pelagian line; Prosper of Aquitaine responded. His ascetic works remained standard."
      }
    ],
    "primarySources": [
      { "title": "Institutes", "note": "Monastic organization and vices" },
      { "title": "Conferences", "note": "Dialogues with Desert abbas" }
    ]
  }

};
