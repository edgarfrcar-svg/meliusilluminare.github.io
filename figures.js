// Tradition colors
const TRADITION_COLORS = {
  early:         { name: 'Early Church (pre-1054)', color: '#a97142', glow: '#e6b988' },
  medieval:      { name: 'Medieval',                color: '#8b7355', glow: '#d4b896' },
  'early-modern':{ name: 'Early Modern',            color: '#6b5b7a', glow: '#c4b0d4' },
  modern:        { name: 'Modern',                  color: '#5a6b7a', glow: '#a8c0d4' },
  catholic:      { name: 'Catholic',                color: '#c9a227', glow: '#ffd98e' },
};

const FIGURES = [
  {
    "id": "ignatius",
    "name": "St. Ignatius of Antioch",
    "dates": "c. 35–c. 107",
    "tradition": "early",
    "epithet": "Bishop of Antioch, Apostolic Father",
    "img": "img/figures/ignatius.jpg",
    "works": [
      {
        "title": "Epistle to the Ephesians",
        "url": "texts/work.html?id=ignatius-ephesians"
      },
      {
        "title": "Epistle to the Romans",
        "url": "texts/work.html?id=ignatius-romans"
      },
      {
        "title": "Epistle to the Smyrnaeans",
        "url": "texts/work.html?id=ignatius-smyrnaeans"
      },
      {
        "title": "Epistle to the Magnesians",
        "url": "texts/work.html?id=ignatius-magnesians"
      },
      {
        "title": "Epistle to the Trallians",
        "url": "texts/work.html?id=ignatius-trallians"
      }
    ]
  },
  {
    "id": "polycarp",
    "name": "St. Polycarp of Smyrna",
    "dates": "c. 69–c. 155",
    "tradition": "early",
    "epithet": "Bishop of Smyrna, disciple of the Apostle John",
    "img": "img/figures/polycarp.jpg",
    "works": [
      {
        "title": "Letter to the Philippians",
        "url": "texts/work.html?id=polycarp-philippians"
      },
      {
        "title": "Martyrdom of Polycarp",
        "url": "texts/work.html?id=polycarp-martyrdom"
      }
    ]
  },
  {
    "id": "justin",
    "name": "St. Justin Martyr",
    "dates": "c. 100–c. 165",
    "tradition": "early",
    "epithet": "Philosopher and Apologist",
    "img": "img/figures/justin.jpg",
    "works": [
      {
        "title": "First Apology",
        "url": "texts/work.html?id=justin-first-apology"
      },
      {
        "title": "Second Apology",
        "url": "texts/work.html?id=justin-second-apology"
      },
      {
        "title": "Dialogue with Trypho",
        "url": "texts/work.html?id=justin-trypho"
      }
    ]
  },
  {
    "id": "irenaeus",
    "name": "St. Irenaeus of Lyons",
    "dates": "c. 130–c. 202",
    "tradition": "early",
    "epithet": "Bishop of Lyons, opponent of Gnosticism",
    "img": "img/figures/irenaeus.jpg",
    "works": [
      {
        "title": "Against Heresies",
        "url": "texts/work.html?id=irenaeus-heresies"
      },
      {
        "title": "Fragments",
        "url": "texts/work.html?id=irenaeus-fragments"
      }
    ]
  },
  {
    "id": "tertullian",
    "name": "Tertullian",
    "dates": "c. 155–c. 220",
    "tradition": "early",
    "epithet": "Father of Latin theology",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Tertullian.jpg",
    "works": [
      {
        "title": "The Apology",
        "url": "texts/work.html?id=tertullian-apology"
      },
      {
        "title": "Prescription Against Heretics",
        "url": "texts/work.html?id=tertullian-prescription"
      },
      {
        "title": "On Baptism",
        "url": "texts/work.html?id=tertullian-baptism"
      },
      {
        "title": "Against Praxeas",
        "url": "texts/work.html?id=tertullian-praxeas"
      },
      {
        "title": "On the Flesh of Christ",
        "url": "texts/work.html?id=tertullian-flesh"
      },
      {
        "title": "On the Resurrection of the Flesh",
        "url": "texts/work.html?id=tertullian-resurrection"
      },
      {
        "title": "On the Soul",
        "url": "texts/work.html?id=tertullian-soul"
      }
    ]
  },
  {
    "id": "origen",
    "name": "Origen of Alexandria",
    "dates": "c. 184–c. 253",
    "tradition": "early",
    "epithet": "Biblical scholar and speculative theologian",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Origen.jpg",
    "works": [
      {
        "title": "On First Principles",
        "url": "texts/work.html?id=origen-principles"
      },
      {
        "title": "Against Celsus",
        "url": "texts/work.html?id=origen-celsus"
      },
      {
        "title": "On Prayer",
        "url": "texts/work.html?id=origen-prayer"
      },
      {
        "title": "Exhortation to Martyrdom",
        "url": "texts/work.html?id=origen-martyrdom"
      }
    ]
  },
  {
    "id": "cyprian",
    "name": "St. Cyprian of Carthage",
    "dates": "c. 200–258",
    "tradition": "early",
    "epithet": "Bishop of Carthage, martyr",
    "img": "img/figures/cyprian.jpg",
    "works": [
      {
        "title": "Treatises",
        "url": "texts/work.html?id=cyprian-writings"
      },
      {
        "title": "On the Unity of the Church",
        "url": "texts/work.html?id=cyprian-unity"
      },
      {
        "title": "On Works and Alms",
        "url": "texts/work.html?id=cyprian-alms"
      },
      {
        "title": "To Demetrian",
        "url": "texts/work.html?id=cyprian-demetrian"
      }
    ]
  },
  {
    "id": "athanasius",
    "name": "St. Athanasius of Alexandria",
    "dates": "c. 296–373",
    "tradition": "early",
    "epithet": "Defender of the Nicene faith against Arianism",
    "img": "img/figures/athanasius.png",
    "works": [
      {
        "title": "On the Incarnation of the Word",
        "url": "texts/work.html?id=athanasius-incarnation"
      },
      {
        "title": "Orations Against the Arians",
        "url": "texts/work.html?id=athanasius-arians"
      },
      {
        "title": "Defence of the Nicene Definition",
        "url": "texts/work.html?id=athanasius-nicene"
      },
      {
        "title": "Life of Antony",
        "url": "texts/work.html?id=athanasius-antony"
      }
    ]
  },
  {
    "id": "basil",
    "name": "St. Basil the Great",
    "dates": "c. 330–379",
    "tradition": "early",
    "epithet": "Cappadocian Father, Bishop of Caesarea",
    "img": "img/figures/basil.png",
    "works": [
      {
        "title": "Hexaemeron",
        "url": "texts/work.html?id=basil-hexaemeron"
      },
      {
        "title": "Letters",
        "url": "texts/work.html?id=basil-letters"
      },
      {
        "title": "On the Holy Spirit",
        "url": "texts/work.html?id=basil-holy-spirit"
      }
    ]
  },
  {
    "id": "gregory-nazianzen",
    "name": "St. Gregory of Nazianzus",
    "dates": "c. 329–390",
    "tradition": "early",
    "epithet": "The Theologian, Cappadocian Father",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Gregory_the_Theologian_La_Martorana_Palermo_2008-08-27.jpg",
    "works": [
      {
        "title": "Theological Orations",
        "url": "texts/work.html?id=gregory-nazianzen-theological-orations"
      }
    ]
  },
  {
    "id": "gregory-nyssa",
    "name": "St. Gregory of Nyssa",
    "dates": "c. 335–c. 395",
    "tradition": "early",
    "epithet": "Cappadocian Father, mystical theologian",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Gregory_of_Nyssa.jpg",
    "works": [
      {
        "title": "The Great Catechism",
        "url": "texts/work.html?id=gregory-nyssa-catechism"
      },
      {
        "title": "On the Making of Man",
        "url": "texts/work.html?id=gregory-nyssa-making-man"
      },
      {
        "title": "On the Soul and the Resurrection",
        "url": "texts/work.html?id=gregory-nyssa-soul"
      },
      {
        "title": "The Life of Moses",
        "url": "texts/work.html?id=gregory-nyssa-life-moses"
      }
    ]
  },
  {
    "id": "chrysostom",
    "name": "St. John Chrysostom",
    "dates": "c. 347–407",
    "tradition": "early",
    "epithet": "Archbishop of Constantinople, “Golden-Mouthed”",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Byzantinischer_Mosaizist_des_9._Jahrhunderts_003.jpg",
    "works": [
      {
        "title": "Homilies on the Statues",
        "url": "texts/work.html?id=chrysostom-statues"
      },
      {
        "title": "Homilies on Matthew",
        "url": "texts/work.html?id=chrysostom-matthew"
      },
      {
        "title": "On the Priesthood",
        "url": "texts/work.html?id=chrysostom-priesthood"
      }
    ]
  },
  {
    "id": "ambrose",
    "name": "St. Ambrose of Milan",
    "dates": "c. 340–397",
    "tradition": "early",
    "epithet": "Bishop of Milan, Doctor of the Church",
    "img": "img/figures/ambrose.jpg",
    "works": [
      {
        "title": "On the Duties of the Clergy (complete)",
        "url": "texts/work.html?id=ambrose-duties"
      },
      {
        "title": "On the Mysteries",
        "url": "texts/work.html?id=ambrose-mysteries"
      },
      {
        "title": "On the Holy Spirit",
        "url": "texts/work.html?id=ambrose-holy-spirit"
      }
    ]
  },
  {
    "id": "jerome",
    "name": "St. Jerome",
    "dates": "c. 347–420",
    "tradition": "early",
    "epithet": "Translator of the Vulgate, Doctor of the Church",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Jerome_Writing-Caravaggio_(1605-6).jpg",
    "works": [
      {
        "title": "Lives of Illustrious Men (De Viris Illustribus)",
        "url": "texts/work.html?id=jerome-viris"
      },
      {
        "title": "Against Helvidius",
        "url": "texts/work.html?id=jerome-helvidius"
      },
      {
        "title": "Against Jovinianus",
        "url": "texts/work.html?id=jerome-jovinian"
      }
    ]
  },
  {
    "id": "augustine",
    "name": "St. Augustine of Hippo",
    "dates": "354–430",
    "tradition": "early",
    "epithet": "Bishop of Hippo, Doctor of Grace",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Antonio%20Rodr%C3%ADguez%20-%20Saint%20Augustine%20-%20Google%20Art%20Project.jpg",
    "slug": "figures/profile.html?id=augustine",
    "works": [
      {
        "title": "The City of God",
        "url": "texts/work.html?id=augustine-city-of-god"
      },
      {
        "title": "Confessions",
        "url": "texts/work.html?id=augustine-confessions"
      },
      {
        "title": "Enchiridion on Faith, Hope, and Love",
        "url": "texts/work.html?id=augustine-enchiridion"
      },
      {
        "title": "On Christian Doctrine — Book I",
        "url": "texts/work.html?id=augustine-doctrine"
      },
      {
        "title": "On the Spirit and the Letter",
        "url": "texts/work.html?id=augustine-spirit-letter"
      },
      {
        "title": "On Grace and Free Will",
        "url": "texts/work.html?id=augustine-grace-free-will"
      },
      {
        "title": "On Nature and Grace",
        "url": "texts/work.html?id=augustine-nature-grace"
      },
      {
        "title": "On the Trinity",
        "url": "texts/work.html?id=augustine-trinity"
      },
      {
        "title": "Anti-Pelagian Writings",
        "url": "texts/work.html?id=augustine-anti-pelagian"
      }
    ]
  },
  {
    "id": "pelagius",
    "name": "Pelagius",
    "dates": "c. 354–c. 418",
    "tradition": "early",
    "epithet": "Ascetic teacher condemned as a heretic after his controversy with Augustine",
    "img": null,
    "slug": "figures/profile.html?id=pelagius",
    "works": [
      {
        "title": "Letter to Demetrias"
      },
      {
        "title": "Commentary on Paul's Epistles"
      }
    ]
  },
  {
    "id": "cyril-alex",
    "name": "St. Cyril of Alexandria",
    "dates": "c. 376–444",
    "tradition": "early",
    "epithet": "Patriarch of Alexandria, champion of the Theotokos",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Icon_St._Cyril_of_Alexandria.jpg",
    "works": [
      {
        "title": "That Christ is One",
        "url": "texts/work.html?id=cyril-incarnation"
      }
    ]
  },
  {
    "id": "leo",
    "name": "St. Leo the Great",
    "dates": "c. 400–461",
    "tradition": "early",
    "epithet": "Pope, Doctor of the Church",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Greek_Fresco_of_Saint_Leo_I_Pope_of_Rome.jpg",
    "works": [
      {
        "title": "The Tome of Leo",
        "url": "texts/work.html?id=leo-tome"
      },
      {
        "title": "Sermons",
        "url": "texts/work.html?id=leo-sermons"
      },
      {
        "title": "Sermon on the Nativity",
        "url": "texts/work.html?id=leo-nativity"
      }
    ]
  },
  {
    "id": "maximus",
    "name": "St. Maximus the Confessor",
    "dates": "c. 580–662",
    "tradition": "early",
    "epithet": "Monk and theologian of the dyothelite controversy",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Maximus_the_Confessor.jpg",
    "works": [
      {
        "title": "Mystagogy",
        "url": "texts/work.html?id=maximus-mystagogy"
      },
      {
        "title": "Two Hundred Chapters on Theology",
        "url": "texts/work.html?id=maximus-theology-chapters"
      }
    ]
  },
  {
    "id": "damascene",
    "name": "St. John of Damascus",
    "dates": "c. 675–749",
    "tradition": "early",
    "epithet": "Last of the Greek Church Fathers, hymnographer",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Ioann_Damaskin_ikona.jpg",
    "works": [
      {
        "title": "An Exposition of Faith",
        "url": "texts/work.html?id=damascene-faith"
      }
    ]
  },
  {
    "id": "anselm",
    "name": "St. Anselm of Canterbury",
    "dates": "1033–1109",
    "tradition": "catholic",
    "epithet": "Father of Scholasticism, ontological argument",
    "img": "img/figures/anselm.jpg",
    "works": [
      {
        "title": "Proslogion",
        "url": "texts/work.html?id=anselm-proslogion"
      },
      {
        "title": "Monologion",
        "url": "texts/work.html?id=anselm-monologion"
      },
      {
        "title": "Cur Deus Homo",
        "url": "texts/work.html?id=anselm-cur-deus-homo"
      }
    ]
  },
  {
    "id": "aquinas",
    "name": "St. Thomas Aquinas",
    "dates": "1225–1274",
    "tradition": "catholic",
    "epithet": "Doctor Angelicus, author of the Summa Theologiae",
    "img": "img/figures/aquinas.jpg",
    "slug": "figures/profile.html?id=aquinas",
    "works": [
      {
        "title": "Summa Theologiae",
        "url": "texts/summa.html"
      }
    ]
  },
  {
    "id": "bonaventure",
    "name": "St. Bonaventure",
    "dates": "c. 1217–1274",
    "tradition": "catholic",
    "epithet": "Seraphic Doctor, Franciscan theologian",
    "img": "img/figures/bonaventure.jpg",
    "works": [
      {
        "title": "Journey of the Mind into God (Itinerarium mentis in Deum)",
        "url": "texts/work.html?id=bonaventure-itinerarium"
      }
    ]
  },
  {
    "id": "teresa",
    "name": "St. Teresa of Ávila",
    "dates": "1515–1582",
    "tradition": "catholic",
    "epithet": "Carmelite mystic, Doctor of the Church",
    "img": "img/figures/teresa.jpg",
    "works": [
      {
        "title": "The Life of Teresa of Jesus",
        "url": "texts/work.html?id=teresa-life"
      },
      {
        "title": "The Interior Castle",
        "url": "texts/work.html?id=teresa-interior-castle"
      }
    ]
  },
  {
    "id": "john-cross",
    "name": "St. John of the Cross",
    "dates": "1542–1591",
    "tradition": "catholic",
    "epithet": "Carmelite mystic, Doctor of the Church",
    "img": "img/figures/john-cross.jpg",
    "works": [
      {
        "title": "Ascent of Mount Carmel",
        "url": "texts/work.html?id=john-cross-ascent"
      },
      {
        "title": "Dark Night of the Soul",
        "url": "texts/work.html?id=john-cross-dark-night"
      },
      {
        "title": "Ascent & Dark Night (combined)",
        "url": "texts/work.html?id=john-cross-writings"
      }
    ]
  },
  {
    "id": "newman",
    "name": "St. John Henry Newman",
    "dates": "1801–1890",
    "tradition": "catholic",
    "epithet": "Cardinal, theorist of the development of doctrine",
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/John_Henry_Newman_by_Sir_John_Everett_Millais%2C_1st_Bt.jpg",
    "works": [
      {
        "title": "Apologia pro Vita Sua",
        "url": "texts/work.html?id=newman-apologia"
      }
    ]
  },
  {
    "id": "bernard",
    "name": "St. Bernard of Clairvaux",
    "dates": "1090–1153",
    "tradition": "catholic",
    "epithet": "Cistercian abbot, Doctor of the Church, Mellifluous Doctor",
    "img": "img/figures/bernard.jpg",
    "works": [
      {
        "title": "On Loving God",
        "url": "texts/work.html?id=bernard-loving-god"
      },
      {
        "title": "Sermons on the Song of Songs (1–43)",
        "url": "texts/work.html?id=bernard-song-sermons"
      }
    ]
  },
  {
    "id": "albert",
    "name": "St. Albert the Great",
    "dates": "c. 1200–1280",
    "tradition": "catholic",
    "epithet": "Dominican, Doctor of the Church, Universal Doctor, teacher of Aquinas",
    "img": "img/figures/albert.jpg",
    "works": [
      {
        "title": "On Cleaving to God",
        "url": "texts/work.html?id=albert-cleaving"
      }
    ]
  },
  {
    "id": "scotus",
    "name": "Bl. John Duns Scotus",
    "dates": "c. 1266–1308",
    "tradition": "catholic",
    "epithet": "Franciscan, Subtle Doctor, defender of the Immaculate Conception",
    "img": "img/figures/scotus.jpg",
    "works": [
      {
        "title": "On God as First Principle",
        "url": "texts/work.html?id=scotus-primo-principio"
      }
    ]
  },
  {
    "id": "bellarmine",
    "name": "St. Robert Bellarmine",
    "dates": "1542–1621",
    "tradition": "catholic",
    "epithet": "Jesuit cardinal, Doctor of the Church, Controversist",
    "img": "img/figures/bellarmine.jpg",
    "works": [
      {
        "title": "The Mind's Ascent to God",
        "url": "texts/work.html?id=bellarmine-ascent"
      }
    ]
  },
  {
    "id": "suarez",
    "name": "Francisco Suárez",
    "dates": "1548–1617",
    "tradition": "catholic",
    "epithet": "Jesuit, Doctor Eximius, metaphysician and theologian",
    "img": "img/figures/suarez.png",
    "works": [
      {
        "title": "Selections on Laws, Faith, and the Virtues",
        "url": "texts/work.html?id=suarez-selections"
      }
    ]
  }
,
  {
    "id": "giles-rome",
    "name": "Giles of Rome",
    "dates": "c. 1243–1316",
    "tradition": "medieval",
    "epithet": "Doctor Fundatissimus · Augustinian theologian",
    "img": "img/figures/giles-rome.jpg",
    "slug": "figures/profile.html?id=giles-rome",
    "works": []
  },
  {
    "id": "nicholas-tolentine",
    "name": "St. Nicholas of Tolentine",
    "dates": "1245–1305",
    "tradition": "medieval",
    "epithet": "Augustinian friar · Patron of the Holy Souls",
    "img": "img/figures/nicholas-tolentine.jpg",
    "slug": "figures/profile.html?id=nicholas-tolentine",
    "works": []
  },
  {
    "id": "thomas-villanova",
    "name": "St. Thomas of Villanova",
    "dates": "1488–1555",
    "tradition": "early-modern",
    "epithet": "Archbishop of Valencia · Father of the Poor",
    "img": "img/figures/thomas-villanova.jpg",
    "slug": "figures/profile.html?id=thomas-villanova",
    "works": []
  },
  {
    "id": "leo-xiv",
    "name": "Pope Leo XIV",
    "dates": "b. 1955 · elected 2025",
    "tradition": "modern",
    "epithet": "First Augustinian pope · Bishop of Rome",
    "img": "img/figures/leo-xiv.jpg",
    "slug": "figures/profile.html?id=leo-xiv",
    "works": []
  }
,
  {
    "id": "rita-cascia",
    "name": "St. Rita of Cascia",
    "dates": "1381–1457",
    "tradition": "medieval",
    "epithet": "Augustinian nun · Patron of impossible causes",
    "img": "img/figures/rita-cascia.jpg",
    "slug": "figures/profile.html?id=rita-cascia",
    "works": []
  }
,
  {
    "id": "prosper-aquitaine",
    "name": "Prosper of Aquitaine",
    "dates": "c. 390–c. 463",
    "tradition": "early",
    "epithet": "Disciple of Augustine · Defender of the doctrine of grace",
    "img": "img/figures/prosper-aquitaine.jpg",
    "slug": "figures/profile.html?id=prosper-aquitaine",
    "works": []
  },
  {
    "id": "hugh-st-victor",
    "name": "Hugh of St. Victor",
    "dates": "c. 1096–1141",
    "tradition": "medieval",
    "epithet": "Victorine master · Augustinian of the heart and of study",
    "img": "img/figures/hugh-st-victor.jpg",
    "slug": "figures/profile.html?id=hugh-st-victor",
    "works": []
  },
  {
    "id": "gregory-rimini",
    "name": "Gregory of Rimini",
    "dates": "c. 1300–1358",
    "tradition": "medieval",
    "epithet": "Doctor Authenticus · Augustinian of grace and the will",
    "img": "img/figures/gregory-rimini.jpg",
    "slug": "figures/profile.html?id=gregory-rimini",
    "works": []
  }
,
  {
    "id": "benedict",
    "name": "St. Benedict of Nursia",
    "dates": "c. 480–c. 547",
    "tradition": "early",
    "epithet": "Father of Western monasticism · Author of the Rule",
    "img": "img/figures/benedict.jpg",
    "slug": "figures/profile.html?id=benedict",
    "works": []
  },
  {
    "id": "scholastica",
    "name": "St. Scholastica",
    "dates": "c. 480–c. 543",
    "tradition": "early",
    "epithet": "Sister of St. Benedict · Patron of Benedictine nuns",
    "img": "img/figures/scholastica.jpg",
    "slug": "figures/profile.html?id=scholastica",
    "works": []
  },
  {
    "id": "gregory-great",
    "name": "St. Gregory the Great",
    "dates": "c. 540–604",
    "tradition": "early",
    "epithet": "Pope · Doctor of the Church · Biographer of Benedict",
    "img": "img/figures/gregory-great.jpg",
    "slug": "figures/profile.html?id=gregory-great",
    "works": []
  },
  {
    "id": "bede",
    "name": "St. Bede the Venerable",
    "dates": "c. 673–735",
    "tradition": "early",
    "epithet": "Doctor of the Church · Historian of the English people",
    "img": "img/figures/bede.jpg",
    "slug": "figures/profile.html?id=bede",
    "works": []
  }
,
  {
    "id": "francis",
    "name": "St. Francis of Assisi",
    "dates": "1181/82–1226",
    "tradition": "medieval",
    "epithet": "Il Poverello · Founder of the Friars Minor",
    "img": "img/figures/francis.jpg",
    "slug": "figures/profile.html?id=francis",
    "works": []
  },
  {
    "id": "clare",
    "name": "St. Clare of Assisi",
    "dates": "1194–1253",
    "tradition": "medieval",
    "epithet": "Foundress of the Poor Clares · Mirror of Franciscan poverty",
    "img": "img/figures/clare.jpg",
    "slug": "figures/profile.html?id=clare",
    "works": []
  },
  {
    "id": "anthony-padua",
    "name": "St. Anthony of Padua",
    "dates": "1195–1231",
    "tradition": "medieval",
    "epithet": "Evangelical Doctor · Wonder-worker of Padua",
    "img": "img/figures/anthony-padua.jpg",
    "slug": "figures/profile.html?id=anthony-padua",
    "works": []
  },
  {
    "id": "angela-foligno",
    "name": "St. Angela of Foligno",
    "dates": "1248–1309",
    "tradition": "medieval",
    "epithet": "Franciscan tertiary · Teacher of the theologians",
    "img": "img/figures/angela-foligno.jpg",
    "slug": "figures/profile.html?id=angela-foligno",
    "works": []
  }
,
  {
    "id": "simon-stock",
    "name": "St. Simon Stock",
    "dates": "c. 1165–1265",
    "tradition": "medieval",
    "epithet": "Carmelite prior general · Brown Scapular",
    "img": "img/figures/simon-stock.jpg",
    "slug": "figures/profile.html?id=simon-stock",
    "works": []
  },
  {
    "id": "therese",
    "name": "St. Thérèse of Lisieux",
    "dates": "1873–1897",
    "tradition": "modern",
    "epithet": "Doctor of the Church · Little Way",
    "img": "img/figures/therese.jpg",
    "slug": "figures/profile.html?id=therese",
    "works": []
  },
  {
    "id": "elizabeth-trinity",
    "name": "St. Elizabeth of the Trinity",
    "dates": "1880–1906",
    "tradition": "modern",
    "epithet": "Carmelite of Dijon · Indwelling of the Trinity",
    "img": "img/figures/elizabeth-trinity.jpg",
    "slug": "figures/profile.html?id=elizabeth-trinity",
    "works": []
  },
  {
    "id": "edith-stein",
    "name": "St. Teresa Benedicta of the Cross (Edith Stein)",
    "dates": "1891–1942",
    "tradition": "modern",
    "epithet": "Philosopher · Carmelite martyr · Co-patroness of Europe",
    "img": "img/figures/edith-stein.jpg",
    "slug": "figures/profile.html?id=edith-stein",
    "works": []
  }
,
  {
    "id": "elijah",
    "name": "Elijah the Prophet",
    "dates": "9th c. BC",
    "tradition": "early",
    "epithet": "Prophet of Mount Carmel · Spiritual father of the Carmelites",
    "img": "img/figures/elijah.jpg",
    "slug": "figures/profile.html?id=elijah",
    "works": []
  }
,
  {
    "id": "xavier",
    "name": "St. Francis Xavier",
    "dates": "1506–1552",
    "tradition": "early-modern",
    "epithet": "Apostle of the Indies · Jesuit missionary",
    "img": "img/figures/xavier.jpg",
    "slug": "figures/profile.html?id=xavier",
    "works": []
  },
  {
    "id": "faber",
    "name": "St. Peter Faber",
    "dates": "1506–1546",
    "tradition": "early-modern",
    "epithet": "First companion of Ignatius · Master of spiritual conversation",
    "img": "img/figures/faber.jpg",
    "slug": "figures/profile.html?id=faber",
    "works": []
  },
  {
    "id": "canisius",
    "name": "St. Peter Canisius",
    "dates": "1521–1597",
    "tradition": "early-modern",
    "epithet": "Doctor of the Church · Second Apostle of Germany",
    "img": "img/figures/canisius.jpg",
    "slug": "figures/profile.html?id=canisius",
    "works": []
  },
  {
    "id": "aloysius",
    "name": "St. Aloysius Gonzaga",
    "dates": "1568–1591",
    "tradition": "early-modern",
    "epithet": "Jesuit scholastic · Patron of youth",
    "img": "img/figures/aloysius.jpg",
    "slug": "figures/profile.html?id=aloysius",
    "works": []
  }
,
  {
    "id": "dominic",
    "name": "St. Dominic de Guzmán",
    "dates": "c. 1170–1221",
    "tradition": "medieval",
    "epithet": "Founder of the Order of Preachers",
    "img": "img/figures/dominic.jpg",
    "slug": "figures/profile.html?id=dominic",
    "works": []
  },
  {
    "id": "catherine-siena",
    "name": "St. Catherine of Siena",
    "dates": "1347–1380",
    "tradition": "medieval",
    "epithet": "Doctor of the Church · Dominican tertiary",
    "img": "img/figures/catherine-siena.jpg",
    "slug": "figures/profile.html?id=catherine-siena",
    "works": []
  },
  {
    "id": "vincent-ferrer",
    "name": "St. Vincent Ferrer",
    "dates": "1350–1419",
    "tradition": "medieval",
    "epithet": "Dominican preacher · Angel of the Judgment",
    "img": "img/figures/vincent-ferrer.jpg",
    "slug": "figures/profile.html?id=vincent-ferrer",
    "works": []
  },
  {
    "id": "martin-porres",
    "name": "St. Martin de Porres",
    "dates": "1579–1639",
    "tradition": "early-modern",
    "epithet": "Dominican brother · Patron of mixed-race people and the poor",
    "img": "img/figures/martin-porres.jpg",
    "slug": "figures/profile.html?id=martin-porres",
    "works": []
  }
,
  {
    "id": "anthony-great",
    "name": "St. Anthony the Great",
    "dates": "c. 251–356",
    "tradition": "early",
    "epithet": "Father of Monks · Desert hermit",
    "img": "img/figures/anthony-great.jpg",
    "slug": "figures/profile.html?id=anthony-great",
    "works": []
  },
  {
    "id": "syncletica",
    "name": "St. Syncletica of Alexandria",
    "dates": "c. 270–c. 350",
    "tradition": "early",
    "epithet": "Desert Mother · teacher of endurance",
    "img": "img/figures/syncletica.jpg",
    "slug": "figures/profile.html?id=syncletica",
    "works": []
  },
  {
    "id": "pachomius",
    "name": "St. Pachomius the Great",
    "dates": "c. 292–348",
    "tradition": "early",
    "epithet": "Father of cenobitic monasticism",
    "img": "img/figures/pachomius.jpg",
    "slug": "figures/profile.html?id=pachomius",
    "works": []
  },
  {
    "id": "macarius",
    "name": "St. Macarius of Egypt",
    "dates": "c. 300–391",
    "tradition": "early",
    "epithet": "Abba of Scetis · Desert father",
    "img": "img/figures/macarius.jpg",
    "slug": "figures/profile.html?id=macarius",
    "works": []
  },
  {
    "id": "evagrius",
    "name": "Evagrius Ponticus",
    "dates": "345–399",
    "tradition": "early",
    "epithet": "Theorist of the eight thoughts · Desert ascetic",
    "img": "img/figures/evagrius.jpg",
    "slug": "figures/profile.html?id=evagrius",
    "works": []
  },
  {
    "id": "cassian",
    "name": "St. John Cassian",
    "dates": "c. 360–c. 435",
    "tradition": "early",
    "epithet": "Bridge of Desert wisdom to the Latin West",
    "img": "img/figures/cassian.jpg",
    "slug": "figures/profile.html?id=cassian",
    "works": []
  }
,
  {
    "id": "moses-black",
    "name": "St. Moses the Black",
    "dates": "c. 330–405",
    "tradition": "early",
    "epithet": "Desert Father · repentance",
    "img": "img/figures/moses-black.jpg",
    "slug": "figures/profile.html?id=moses-black",
    "works": []
  },
  {
    "id": "arsenius",
    "name": "St. Arsenius the Great",
    "dates": "c. 354–449",
    "tradition": "early",
    "epithet": "Desert solitary · silence",
    "img": "img/figures/arsenius.jpg",
    "slug": "figures/profile.html?id=arsenius",
    "works": []
  },
  {
    "id": "poemen",
    "name": "Abba Poemen",
    "dates": "c. 340–450",
    "tradition": "early",
    "epithet": "Desert abba · sayings",
    "img": "img/figures/poemen.jpg",
    "slug": "figures/profile.html?id=poemen",
    "works": []
  },
  {
    "id": "odo-cluny",
    "name": "St. Odo of Cluny",
    "dates": "c. 878–942",
    "tradition": "medieval",
    "epithet": "Cluniac reformer",
    "img": "img/figures/odo-cluny.jpg",
    "slug": "figures/profile.html?id=odo-cluny",
    "works": []
  },
  {
    "id": "hildegard",
    "name": "St. Hildegard of Bingen",
    "dates": "1098–1179",
    "tradition": "medieval",
    "epithet": "Doctor · abbess · visionary",
    "img": "img/figures/hildegard.jpg",
    "slug": "figures/profile.html?id=hildegard",
    "works": []
  },
  {
    "id": "gertrude",
    "name": "St. Gertrude the Great",
    "dates": "1256–1302",
    "tradition": "medieval",
    "epithet": "Benedictine mystic",
    "img": "img/figures/gertrude.jpg",
    "slug": "figures/profile.html?id=gertrude",
    "works": []
  },
  {
    "id": "magdalene-pazzi",
    "name": "St. Mary Magdalene de Pazzi",
    "dates": "1566–1607",
    "tradition": "early-modern",
    "epithet": "Carmelite mystic",
    "img": "img/figures/teresa.jpg",
    "slug": "figures/profile.html?id=magdalene-pazzi",
    "works": []
  },
  {
    "id": "titus-brandsma",
    "name": "St. Titus Brandsma",
    "dates": "1881–1942",
    "tradition": "modern",
    "epithet": "Carmelite martyr",
    "img": "img/figures/titus-brandsma.jpg",
    "slug": "figures/profile.html?id=titus-brandsma",
    "works": []
  },
  {
    "id": "colette",
    "name": "St. Colette of Corbie",
    "dates": "1381–1447",
    "tradition": "medieval",
    "epithet": "Poor Clare reformer",
    "img": "img/figures/colette.jpg",
    "slug": "figures/profile.html?id=colette",
    "works": []
  },
  {
    "id": "kolbe",
    "name": "St. Maximilian Kolbe",
    "dates": "1894–1941",
    "tradition": "modern",
    "epithet": "Franciscan martyr",
    "img": "img/figures/kolbe.jpg",
    "slug": "figures/profile.html?id=kolbe",
    "works": []
  },
  {
    "id": "elizabeth-hungary",
    "name": "St. Elizabeth of Hungary",
    "dates": "1207–1231",
    "tradition": "medieval",
    "epithet": "Franciscan tertiary",
    "img": "img/figures/scholastica.jpg",
    "slug": "figures/profile.html?id=elizabeth-hungary",
    "works": []
  },
  {
    "id": "hyacinth",
    "name": "St. Hyacinth of Poland",
    "dates": "c. 1185–1257",
    "tradition": "medieval",
    "epithet": "Dominican apostle",
    "img": "img/figures/hyacinth.jpg",
    "slug": "figures/profile.html?id=hyacinth",
    "works": []
  },
  {
    "id": "pius-v",
    "name": "St. Pius V",
    "dates": "1504–1572",
    "tradition": "early-modern",
    "epithet": "Dominican pope",
    "img": "img/figures/pius-v.jpg",
    "slug": "figures/profile.html?id=pius-v",
    "works": []
  },
  {
    "id": "rose-lima",
    "name": "St. Rose of Lima",
    "dates": "1586–1617",
    "tradition": "early-modern",
    "epithet": "First saint of the Americas",
    "img": "img/figures/rose-lima.jpg",
    "slug": "figures/profile.html?id=rose-lima",
    "works": []
  },
  {
    "id": "stanislaus",
    "name": "St. Stanislaus Kostka",
    "dates": "1550–1568",
    "tradition": "early-modern",
    "epithet": "Jesuit novice",
    "img": "img/figures/stanislaus.jpg",
    "slug": "figures/profile.html?id=stanislaus",
    "works": []
  },
  {
    "id": "campion",
    "name": "St. Edmund Campion",
    "dates": "1540–1581",
    "tradition": "early-modern",
    "epithet": "Jesuit martyr",
    "img": "img/figures/bellarmine.jpg",
    "slug": "figures/profile.html?id=campion",
    "works": []
  },
  {
    "id": "colombiere",
    "name": "St. Claude de la Colombière",
    "dates": "1641–1682",
    "tradition": "early-modern",
    "epithet": "Sacred Heart apostle",
    "img": "img/figures/faber.jpg",
    "slug": "figures/profile.html?id=colombiere",
    "works": []
  }];

function monogram(name) {
  const parts = String(name || '')
    .replace(/^St\.?\s+/i, '')
    .replace(/of\s|the\s/gi, '')
    .split(/\s+/)
    .filter(Boolean);
  return ((parts[0] && parts[0][0]) || '?') + ((parts[1] && parts[1][0]) || '');
}

/** Monogram only — used in the directory list so we never load 30+ remote images at once. */
function monogramHTML(fig) {
  const t = TRADITION_COLORS[fig.tradition] || TRADITION_COLORS.catholic;
  return '<span class="monogram" style="color:' + t.color + '">' + monogram(fig.name).toUpperCase() + '</span>';
}

/** Full portrait for the selected profile only. */
function portraitHTML(fig) {
  const t = TRADITION_COLORS[fig.tradition] || TRADITION_COLORS.catholic;
  if (fig.img) {
    const mono = monogram(fig.name).toUpperCase();
    return '<img src="' + fig.img + '" alt="Portrait of ' + fig.name + '" loading="lazy" decoding="async" width="120" height="120" onerror="this.outerHTML=\'<span class=monogram style=color:' + t.color + '>' + mono + '</span>\'">';
  }
  return monogramHTML(fig);
}
