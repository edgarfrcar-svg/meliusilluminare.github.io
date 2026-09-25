(function () {
  "use strict";

  /**
   * MAGISTERIUM — chronological spine of the Church's teaching office.
   * Centuries → Councils, Controversies, Papal Documents, Other Acts.
   * Controversies use the arc: question → positions → intervention → act → result → later development.
   */

  window.MAGISTERIUM = {
    centuries: [
      {
        id: "1st",
        century: 1,
        name: "1st Century",
        latin: "Saeculum I",
        short: "Apostolic foundation",
        summary: "The apostolic age: the preaching of the Apostles, the formation of the New Testament writings, and the first structures of episcopal and conciliar authority in local churches.",
        art: ["Christ Handing the Keys to St. Peter by Pietro Perugino (crop).jpg", "center 48%"],
        councils: [
          { name: "Council of Jerusalem", year: "c. 49", summary: "The apostles and elders settle the question of Gentile converts and the Mosaic law (Acts 15)—the prototype of later councils." }
        ],
        controversies: [
          {
            id: "judaizers",
            name: "The Judaizing Controversy",
            question: "Must Gentile converts keep the full Mosaic law, including circumcision, to be saved?",
            positions: [
              "Judaizers: circumcision and Torah observance are required for full membership in the people of God.",
              "Paul and the party of freedom: justification is by faith in Christ; the ceremonial law is not imposed on the Gentiles."
            ],
            intervention: "The apostles and elders gather at Jerusalem; Peter, Paul, Barnabas, and James speak; the assembly issues a letter.",
            magisterialAct: "The decree of Acts 15: Gentiles need not be circumcised; they abstain from idolatry, blood, strangled things, and porneia.",
            result: "The Church’s mission to the nations proceeds without requiring full Torah observance of Gentiles.",
            laterDevelopment: "The principle that a synod of the apostolic college can bind the Church becomes the model for later ecumenical councils."
          }
        ],
        papalDocuments: [
          { name: "First Epistle of Clement", pope: "Clement of Rome", year: "c. 96", summary: "Rome intervenes in the Corinthian schism—early evidence of Roman concern for other churches." }
        ],
        otherActs: [
          { name: "Apostolic preaching and succession", year: "c. 30–100", summary: "The deposit of faith is handed on in Scripture and living Tradition under the care of the apostolic ministry." }
        ]
      },
      {
        id: "2nd",
        century: 2,
        name: "2nd Century",
        latin: "Saeculum II",
        short: "Rule of faith against heresy",
        summary: "The Church articulates the rule of faith against Gnosticism and Marcionism; the episcopal structure and the New Testament canon begin to stabilize.",
        art: ["img/magisterium/century-2nd.jpg", "center 48%"],
        councils: [],
        controversies: [
          {
            id: "gnosticism",
            name: "Gnosticism and the Rule of Faith",
            question: "Is salvation secret knowledge for the few, and is the Creator of the material world the true God?",
            positions: [
              "Gnostic systems: a distant high God, a lesser demiurge, secret knowledge (gnosis) as the path of liberation from matter.",
              "Catholic rule of faith: one God, Creator of all; the same Christ suffered in the flesh; the faith is public and apostolic."
            ],
            intervention: "Irenaeus, Tertullian, and other Fathers expose Gnostic myths and appeal to succession from the Apostles and the common creed of the churches.",
            magisterialAct: "No single ecumenical definition in this century; the rule of faith and the emerging canon function as the Church’s public criterion.",
            result: "Gnostic systems are excluded from the mainstream of the Church; the unity of Old and New Testaments is defended.",
            laterDevelopment: "Later anti-heretical canons and creeds presuppose this second-century defense of creation, Incarnation, and public tradition."
          },
          {
            id: "marcionism",
            name: "Marcionism",
            question: "Does the Church retain the Old Testament and the Creator as the Father of Jesus Christ?",
            positions: [
              "Marcion: the God of the Old Testament is distinct from and inferior to the Father of Jesus; a truncated Paul and a reduced Gospel form the canon.",
              "Catholic response: one God of both Testaments; the Law and the Prophets are fulfilled, not discarded."
            ],
            intervention: "Bishops and teachers reject Marcion’s dualism; Rome and other churches exclude his community.",
            magisterialAct: "Exclusion of Marcionite teaching from communion; reinforcement of the fourfold Gospel and the Old Testament.",
            result: "The Church’s Bible remains the dual Testament; Marcionite churches become a separate movement.",
            laterDevelopment: "The struggle accelerates the clarification of the New Testament canon."
          }
        ],
        papalDocuments: [],
        otherActs: [
          { name: "Paschal controversies (Quartodeciman)", year: "c. 190", summary: "Disputes over the date of Easter; Victor of Rome presses for unity of practice." }
        ]
      },
      {
        id: "3rd",
        century: 3,
        name: "3rd Century",
        latin: "Saeculum III",
        short: "Baptism, penance, and schism",
        summary: "Persecution and the problem of the lapsed force the Church to clarify baptism, penance, and the unity of the episcopate.",
        art: ["img/magisterium/century-3rd.jpg", "center 55%"],
        councils: [
          { name: "African and Eastern synods on baptism", year: "c. 250–256", summary: "Synods under Cyprian debate the rebaptism of heretics; Rome under Stephen upholds the validity of Trinitarian baptism outside the Church." }
        ],
        controversies: [
          {
            id: "rebaptism",
            name: "The Rebaptism Controversy",
            question: "Is baptism conferred by heretics valid, or must those returning to the Church be baptized again?",
            positions: [
              "Cyprian and many African and Eastern bishops: baptism outside the one Church is null; reconciling heretics requires baptism.",
              "Stephen of Rome: the Trinitarian baptism is not repeated; the returning heretic is received by imposition of hands."
            ],
            intervention: "Correspondence and synods; Stephen appeals to tradition against innovation.",
            magisterialAct: "Rome’s practice of not rebaptizing prevails in the long run and is confirmed by later councils (e.g. Arles 314).",
            result: "The indelible character of baptism and the distinction between validity and fruitfulness are secured.",
            laterDevelopment: "Augustine’s anti-Donatist theology and medieval sacramental theology build on this settlement."
          }
        ],
        papalDocuments: [
          { name: "Letters of Stephen I", pope: "Stephen I", year: "c. 254–257", summary: "Defends the Roman tradition on baptism against Cyprian." }
        ],
        otherActs: [
          { name: "Disciplinary canons under persecution", year: "c. 250", summary: "Orders of penitents and conditions for the return of the lapsed." }
        ]
      },
      {
        id: "4th",
        century: 4,
        name: "4th Century",
        latin: "Saeculum IV",
        short: "Nicaea, Constantinople, and the Trinity",
        summary: "The first two ecumenical councils define the consubstantiality of the Son and the full divinity of the Holy Spirit against Arian and Pneumatomachian errors.",
        art: ["Nicaea icon.jpg", "center 45%"],
        councils: [
          { name: "Nicaea I", year: "325", summary: "Consubstantial (homoousios) Son with the Father; Creed against Arius; canons on Church order." },
          { name: "Constantinople I", year: "381", summary: "Full divinity of the Holy Spirit; expansion of the Creed; condemnation of remaining Arian and Pneumatomachian errors." },
          { name: "Synod of Arles", year: "314", summary: "Western discipline; baptism; Donatist questions." }
        ],
        controversies: [
          {
            id: "arian",
            name: "Arian Controversy",
            question: "Is the Son true God, consubstantial with the Father, or a creature—however exalted?",
            positions: [
              "Arius and Arians: there was when the Son was not; the Son is created and not of the same substance as the Father.",
              "Alexander, Athanasius, and the Nicene party: the Son is begotten, not made, homoousios with the Father."
            ],
            intervention: "Constantine calls Nicaea (325); decades of imperial politics and exile follow; Athanasius and the Cappadocians defend the Nicene faith.",
            magisterialAct: "Nicaea I defines homoousios; Constantinople I (381) reaffirms and completes the creed.",
            result: "The Nicene-Constantinopolitan Creed becomes the Church’s standard confession of the Trinity.",
            laterDevelopment: "Christological debates of the fifth century presuppose Nicene divinity of the Son."
          },
          {
            id: "pneumatomachian",
            name: "Pneumatomachian Controversy",
            question: "Is the Holy Spirit truly God, or a ministering creature?",
            positions: [
              "Pneumatomachi (‘Spirit-fighters’): deny the full divinity of the Spirit.",
              "Basil, Gregory of Nazianzus, and the pro-Nicene consensus: the Spirit is Lord and Giver of life, worshiped with the Father and the Son."
            ],
            intervention: "Cappadocian theology and the Council of Constantinople (381).",
            magisterialAct: "Constantinople I confesses the Holy Spirit as Lord and Giver of life, who proceeds from the Father, worshiped and glorified with the Father and the Son.",
            result: "Trinitarian dogma is completed in creed form.",
            laterDevelopment: "Later Filioque disputes concern procession, not the Spirit’s divinity."
          }
        ],
        papalDocuments: [
          { name: "Letters of Julius I", pope: "Julius I", year: "c. 340", summary: "Defense of Athanasius and appeal to Roman scrutiny of episcopal cases." },
          { name: "Tomos and letters of Damasus", pope: "Damasus I", year: "c. 366–384", summary: "Support for the Nicene faith and the Roman see’s authority." }
        ],
        otherActs: [
          { name: "Recognition of the Nicene Creed in the liturgy", year: "late 4th c.", summary: "The creed enters baptismal and eucharistic life as the Church’s public faith." }
        ]
      },
      {
        id: "5th",
        century: 5,
        name: "5th Century",
        latin: "Saeculum V",
        short: "Ephesus, Chalcedon, and Christology",
        summary: "The Church defines Mary as Theotokos and confesses one Christ in two natures against Nestorian and Monophysite extremes.",
        art: ["img/magisterium/century-5th.jpg", "center 48%"],
        councils: [
          { name: "Ephesus", year: "431", summary: "Mary is Theotokos; condemnation of Nestorius; unity of the person of Christ." },
          { name: "Chalcedon", year: "451", summary: "One and the same Christ in two natures, without confusion, change, division, or separation." },
          { name: "Orange (local)", year: "529", summary: "Though early sixth century in date, the anti-Pelagian canons of Orange settle Western grace debates begun in the fifth." }
        ],
        controversies: [
          {
            id: "nestorian",
            name: "Nestorian Controversy",
            question: "May Mary be called Mother of God (Theotokos), and is Christ one person or a conjunction of two?",
            positions: [
              "Nestorius and some Antiochenes: prefer Christotokos; fear of confusing the natures.",
              "Cyril of Alexandria and Ephesus: Mary is Theotokos because the one born of her is the eternal Son."
            ],
            intervention: "Cyril’s letters; Council of Ephesus (431); later Formula of Reunion (433).",
            magisterialAct: "Ephesus: Theotokos; deposition of Nestorius.",
            result: "The title Theotokos is secured; Christological unity of person is affirmed.",
            laterDevelopment: "Chalcedon refines the two-natures language without abandoning Ephesus."
          },
          {
            id: "monophysite",
            name: "Eutychian / Monophysite Controversy",
            question: "After the union, is there one nature only in Christ, or two natures unconfused?",
            positions: [
              "Eutyches and extreme Monophysites: after the union, one nature; the human is absorbed.",
              "Leo and Chalcedon: two natures remain after the union, in one person and hypostasis."
            ],
            intervention: "Leo’s Tome; Council of Chalcedon (451).",
            magisterialAct: "Chalcedonian Definition: one Christ in two natures, without confusion, change, division, or separation.",
            result: "The dyophysite confession becomes the standard of the Catholic and later Chalcedonian churches.",
            laterDevelopment: "Non-Chalcedonian churches continue a miaphysite tradition; later councils address remaining Christological questions."
          },
          {
            id: "pelagian",
            name: "Pelagian Controversy",
            question: "Can the human will, without interior grace, fulfill God’s law and merit salvation?",
            positions: [
              "Pelagius and disciples: strong emphasis on created free will; downplaying of original sin’s transmission.",
              "Augustine and the African bishops: grace is necessary for every good act ordered to salvation; infants need baptism for original sin."
            ],
            intervention: "African councils; papal condemnations; later Council of Orange (529).",
            magisterialAct: "Condemnation of Pelagian theses; Orange’s canons on grace and free will.",
            result: "The Western Church binds itself to the necessity of grace without denying free will.",
            laterDevelopment: "Medieval and Tridentine teaching on justification continues this line."
          }
        ],
        papalDocuments: [
          { name: "Tome of Leo", pope: "Leo the Great", year: "449", summary: "Christological letter received at Chalcedon as the voice of Peter." },
          { name: "Letters against Pelagianism", pope: "Innocent I / Zosimus", year: "c. 417–418", summary: "Papal confirmation of African condemnations of Pelagius." }
        ],
        otherActs: []
      },
      {
        id: "6th",
        century: 6,
        name: "6th Century",
        latin: "Saeculum VI",
        short: "Constantinople II and the Three Chapters",
        summary: "Justinian’s age: Constantinople II (553) and the ongoing reception of Chalcedon.",
        art: ["img/magisterium/century-6th.jpg", "center 45%"],
        councils: [
          { name: "Constantinople II", year: "553", summary: "Condemnation of the Three Chapters; defense of Chalcedon against Nestorianizing readings." },
          { name: "Orange II", year: "529", summary: "Canons on grace against semi-Pelagianism." }
        ],
        controversies: [
          {
            id: "three-chapters",
            name: "Three Chapters Controversy",
            question: "May certain writings of Theodore, Theodoret, and Ibas be condemned without betraying Chalcedon?",
            positions: [
              "Imperial and some Eastern pressure: condemn the Three Chapters to win non-Chalcedonians.",
              "Many Western bishops: fear that condemning them undermines Chalcedon."
            ],
            intervention: "Justinian and Constantinople II (553); papal involvement under Vigilius.",
            magisterialAct: "Constantinople II condemns the Three Chapters while upholding Chalcedon.",
            result: "Further clarification of Chalcedonian orthodoxy; lasting Western unease in some regions.",
            laterDevelopment: "Later Christological debates continue under the Chalcedonian umbrella."
          }
        ],
        papalDocuments: [],
        otherActs: [
          { name: "Canons of Orange", year: "529", summary: "Grace is needed for the beginning of faith; free will is not destroyed but healed." }
        ]
      },
      {
        id: "7th",
        century: 7,
        name: "7th Century",
        latin: "Saeculum VII",
        short: "Two wills in Christ",
        summary: "Constantinople III defines that Christ has two natural wills and two natural operations.",
        art: ["img/magisterium/century-7th.jpg", "center 48%"],
        councils: [
          { name: "Constantinople III", year: "680–681", summary: "Dyothelitism: two natural wills and operations in Christ, the human will following the divine." },
          { name: "Lateran Synod", year: "649", summary: "Martin I and Maximus against Monothelitism." }
        ],
        controversies: [
          {
            id: "monothelite",
            name: "Monothelite Controversy",
            question: "Does the incarnate Word have one will and operation, or two—divine and human?",
            positions: [
              "Monothelites / Monenergists: one will or one theandric operation to safeguard unity.",
              "Maximus the Confessor and Rome: two natural wills; the human will is not opposed to the divine."
            ],
            intervention: "Lateran 649; suffering of Martin and Maximus; Constantinople III.",
            magisterialAct: "Constantinople III: two natural wills and operations, without division or opposition.",
            result: "Dyothelite Christology becomes dogma.",
            laterDevelopment: "Medieval scholastic Christology assumes two wills in Christ."
          }
        ],
        papalDocuments: [
          { name: "Lateran decrees under Martin I", pope: "Martin I", year: "649", summary: "Condemnation of Monothelitism before the ecumenical settlement." }
        ],
        otherActs: []
      },
      {
        id: "8th",
        century: 8,
        name: "8th Century",
        latin: "Saeculum VIII",
        short: "Icons and Nicaea II",
        summary: "The seventh ecumenical council defends the veneration of holy images against iconoclasm.",
        art: ["img/magisterium/century-8th.jpg", "center 48%"],
        councils: [
          { name: "Nicaea II", year: "787", summary: "Veneration (proskynesis) of icons is legitimate; worship (latria) belongs to God alone." }
        ],
        controversies: [
          {
            id: "iconoclasm",
            name: "Iconoclast Controversy",
            question: "May Christians make and venerate images of Christ and the saints?",
            positions: [
              "Iconoclasts: images violate the commandment against idols; the Eucharist is the only true image of Christ.",
              "Iconodules (John of Damascus, Nicaea II): the Incarnation makes depiction possible; veneration passes to the prototype."
            ],
            intervention: "Imperial iconoclasm; defense by monks and Rome; Nicaea II (787).",
            magisterialAct: "Nicaea II restores icons and defines the distinction between veneration and adoration.",
            result: "Sacred images remain in the Church’s worship (with a second iconoclast wave later resolved in 843).",
            laterDevelopment: "The ‘Triumph of Orthodoxy’ and Western medieval image theology continue this line."
          }
        ],
        papalDocuments: [
          { name: "Hadrian I’s letters on images", pope: "Hadrian I", year: "c. 787", summary: "Roman support for Nicaea II." }
        ],
        otherActs: []
      },
      {
        id: "9th",
        century: 9,
        name: "9th Century",
        latin: "Saeculum IX",
        short: "Photian issues and the Filioque",
        summary: "East–West tensions over Photius, Bulgaria, and the Filioque enter the historical record.",
        art: ["img/magisterium/century-9th.jpg", "center 42%"],
        councils: [
          { name: "Constantinople IV (Roman Catholic count)", year: "869–870", summary: "Counted as eighth ecumenical council in the Latin tradition; Photian dispute." }
        ],
        controversies: [
          {
            id: "filioque-photian",
            name: "Photian / Filioque Tensions",
            question: "May the Latin Church confess that the Spirit proceeds from the Father and the Son, and who holds jurisdiction in contested sees?",
            positions: [
              "Photius and many Greeks: Filioque is an illegitimate addition; Rome overreaches in Bulgaria.",
              "Latin West: Filioque expresses the consubstantial communion of Father and Son; Roman primacy is appealed to."
            ],
            intervention: "Councils at Constantinople; papal legates; fluctuating reconciliations.",
            magisterialAct: "No final joint definition; Latin and Greek paths diverge in practice and memory of councils.",
            result: "Seeds of the later schism; Filioque remains in the Latin Creed.",
            laterDevelopment: "Lyons II and Florence attempt reunion formulas; the issue remains a dialogue point today."
          }
        ],
        papalDocuments: [],
        otherActs: [
          { name: "Carolingian theological synods", year: "9th c.", summary: "Western synods on images, the creed, and predestination debates (Gottschalk)." }
        ]
      },
      {
        id: "10th",
        century: 10,
        name: "10th Century",
        latin: "Saeculum X",
        short: "Reform amid the saeculum obscurum",
        summary: "A quieter century for dogmatic definition; monastic and papal reform movements begin to gather strength.",
        art: ["img/magisterium/century-10th.jpg", "center 48%"],
        councils: [],
        controversies: [],
        papalDocuments: [],
        otherActs: [
          { name: "Cluniac reform", year: "10th–11th c.", summary: "Monastic renewal that prepares the later Gregorian reform of the papacy and clergy." }
        ]
      },
      {
        id: "11th",
        century: 11,
        name: "11th Century",
        latin: "Saeculum XI",
        short: "Gregorian reform and 1054",
        summary: "Papal reform under Gregory VII; the breach of 1054 marks a deepening East–West separation.",
        art: ["img/magisterium/century-11th.jpg", "center 48%"],
        councils: [
          { name: "Roman reform synods", year: "c. 1074–1080", summary: "Celibacy, simony, and investiture under Gregory VII." }
        ],
        controversies: [
          {
            id: "investiture",
            name: "Investiture Controversy",
            question: "Who invests bishops with ring and staff—the emperor or the Church?",
            positions: [
              "Imperial party: rulers confer temporal and often spiritual symbols of office.",
              "Gregorian reformers: lay investiture is simoniacal interference; the Church must be free."
            ],
            intervention: "Gregory VII’s decrees; conflict with Henry IV; eventual Concordat of Worms (1122).",
            magisterialAct: "Reform canons against simony and lay investiture; later concordat settlement.",
            result: "Greater distinction of spiritual office from royal appointment in the West.",
            laterDevelopment: "The liberty of the Church becomes a lasting medieval theme."
          }
        ],
        papalDocuments: [
          { name: "Dictatus papae", pope: "Gregory VII", year: "1075", summary: "Propositions on papal authority in the reform program." }
        ],
        otherActs: [
          { name: "Mutual excommunications of 1054", year: "1054", summary: "Legates and Cerularius; a symbolic date in the long East–West estrangement." }
        ]
      },
      {
        id: "12th",
        century: 12,
        name: "12th Century",
        latin: "Saeculum XII",
        short: "Scholastic dawn and sacramental order",
        summary: "Canon law and early scholastic theology organize the Church’s teaching and discipline.",
        art: ["img/magisterium/century-12th.jpg", "center 48%"],
        councils: [
          { name: "Lateran I–III", year: "1123–1179", summary: "Reform, crusade, papal elections, and discipline." }
        ],
        controversies: [],
        papalDocuments: [],
        otherActs: [
          { name: "Gratian’s Decretum", year: "c. 1140", summary: "Foundation of classical canon law." },
          { name: "Peter Lombard’s Sentences", year: "c. 1150", summary: "Standard theological textbook of the medieval schools." }
        ]
      },
      {
        id: "13th",
        century: 13,
        name: "13th Century",
        latin: "Saeculum XIII",
        short: "Lateran IV and the mendicant age",
        summary: "Fourth Lateran Council; the height of scholastic theology; attempts at reunion with the East.",
        art: ["img/magisterium/century-13th.jpg", "center 45%"],
        councils: [
          { name: "Lateran IV", year: "1215", summary: "Confession, Transubstantiation language, yearly communion, crusade, reform." },
          { name: "Lyons I", year: "1245", summary: "Frederick II; Church reform." },
          { name: "Lyons II", year: "1274", summary: "Attempted reunion with the Greeks; Filioque discussions." }
        ],
        controversies: [],
        papalDocuments: [
          { name: "Unam sanctam", pope: "Boniface VIII", year: "1302", summary: "Late in the century’s turn: strong claim of spiritual authority (often dated 1302)." }
        ],
        otherActs: [
          { name: "Rise of universities and mendicant orders", year: "13th c.", summary: "Dominican and Franciscan theology in the service of preaching and doctrine." }
        ]
      },
      {
        id: "14th",
        century: 14,
        name: "14th Century",
        latin: "Saeculum XIV",
        short: "Avignon and the Western Schism’s seeds",
        summary: "Papacy at Avignon; conciliar tensions begin that will explode in the next century.",
        art: ["img/magisterium/century-14th.jpg", "center 42%"],
        councils: [
          { name: "Vienne", year: "1311–1312", summary: "Templars; reform; theoretical questions on the soul." }
        ],
        controversies: [],
        papalDocuments: [
          { name: "Clementine constitutions", pope: "Clement V", year: "early 14th c.", summary: "Avignon-era legislation." }
        ],
        otherActs: []
      },
      {
        id: "15th",
        century: 15,
        name: "15th Century",
        latin: "Saeculum XV",
        short: "Constance, Florence, and reunion attempts",
        summary: "The Western Schism is healed at Constance; Florence seeks union with the Greeks.",
        art: ["img/magisterium/century-15th.jpg", "center 48%"],
        councils: [
          { name: "Constance", year: "1414–1418", summary: "End of the Western Schism; reform; condemnation of Wycliffe and Hus." },
          { name: "Florence (Ferrara–Florence)", year: "1438–1445", summary: "Decrees on union with Greeks, Armenians, and others; Filioque, primacy, purgatory, azymes." }
        ],
        controversies: [
          {
            id: "western-schism",
            name: "Western Schism",
            question: "Which claimant is the true pope when multiple lines claim the see of Peter?",
            positions: [
              "Roman, Avignon, and later Pisan obediences each claim legitimacy.",
              "Conciliarists: a general council may judge and depose popes to restore unity."
            ],
            intervention: "Council of Constance; resignation and new election.",
            magisterialAct: "Constance secures a single pope (Martin V); Haec sancta and Frequens express conciliarist claims later restricted.",
            result: "Visible unity of the Western papacy is restored.",
            laterDevelopment: "Vatican I’s definition of primacy and infallibility answers lingering conciliarist theories."
          }
        ],
        papalDocuments: [
          { name: "Laetentur caeli", pope: "Eugene IV", year: "1439", summary: "Bull of union with the Greeks at Florence." }
        ],
        otherActs: []
      },
      {
        id: "16th",
        century: 16,
        name: "16th Century",
        latin: "Saeculum XVI",
        short: "Trent and the Catholic Reformation",
        summary: "The Council of Trent defines justification, the sacraments, and the canon in response to the Protestant Reformation.",
        art: ["img/magisterium/century-16th.jpg", "center 48%"],
        councils: [
          { name: "Lateran V", year: "1512–1517", summary: "Reform attempts on the eve of the Reformation." },
          { name: "Trent", year: "1545–1563", summary: "Justification, sacraments, Scripture and Tradition, Mass, reform decrees." }
        ],
        controversies: [
          {
            id: "reformation-justification",
            name: "Justification and the Reformation",
            question: "How is the sinner justified—by faith alone as a purely forensic act, or by faith and interior renewal through grace?",
            positions: [
              "Protestant Reformers: varied, but often justification by faith alone and imputed righteousness as decisive.",
              "Catholic response at Trent: justification is both forgiveness and sanctification; faith is the beginning, formed by charity."
            ],
            intervention: "Decades of controversy; Council of Trent.",
            magisterialAct: "Decree on Justification (1547); canons on the sacraments; decree on Scripture and Tradition.",
            result: "Tridentine dogma becomes the standard of early modern Catholicism.",
            laterDevelopment: "Joint Declaration on Justification (1999) seeks differentiated consensus without repealing Trent."
          }
        ],
        papalDocuments: [
          { name: "Exsurge Domine", pope: "Leo X", year: "1520", summary: "Condemnation of errors of Luther." },
          { name: "Professio fidei Tridentina", pope: "Pius IV", year: "1564", summary: "Profession of faith implementing Trent." }
        ],
        otherActs: [
          { name: "Roman Catechism", year: "1566", summary: "Catechism of the Council of Trent for parish clergy." }
        ]
      },
      {
        id: "17th",
        century: 17,
        name: "17th Century",
        latin: "Saeculum XVII",
        short: "Jansenism and post-Tridentine theology",
        summary: "Debates on grace (De auxiliis aftermath, Jansenism) and the consolidation of Tridentine reform.",
        art: ["img/magisterium/century-17th.jpg", "center 48%"],
        councils: [],
        controversies: [
          {
            id: "jansenism",
            name: "Jansenist Controversy",
            question: "How are Augustine’s teachings on grace and predestination to be read without falling into determinism or semi-Pelagianism?",
            positions: [
              "Jansenists: strict reading of Augustine in Augustinus; suspicion of frequent communion and Jesuit moral theology.",
              "Jesuit and papal line: condemnations of specific propositions as heretical or scandalous."
            ],
            intervention: "Cum occasione (1653), further bulls; Unigenitus (1713) in the next century.",
            magisterialAct: "Condemnation of five propositions of Jansenius.",
            result: "Jansenism is excluded as a system; tensions persist in France.",
            laterDevelopment: "Moral theology and frequency of communion develop under later papal teaching."
          }
        ],
        papalDocuments: [
          { name: "Cum occasione", pope: "Innocent X", year: "1653", summary: "Condemns five Jansenist propositions." }
        ],
        otherActs: []
      },
      {
        id: "18th",
        century: 18,
        name: "18th Century",
        latin: "Saeculum XVIII",
        short: "Unigenitus and Enlightenment pressures",
        summary: "Continued anti-Jansenist measures; the Church faces Gallicanism and the rising Enlightenment.",
        art: ["img/magisterium/century-18th.jpg", "center 50%"],
        councils: [],
        controversies: [],
        papalDocuments: [
          { name: "Unigenitus", pope: "Clement XI", year: "1713", summary: "Condemnation of Quesnel’s propositions; anti-Jansenist watershed." },
          { name: "Auctorem fidei", pope: "Pius VI", year: "1794", summary: "Condemnation of errors of the Synod of Pistoia." }
        ],
        otherActs: []
      },
      {
        id: "19th",
        century: 19,
        name: "19th Century",
        latin: "Saeculum XIX",
        short: "Immaculate Conception and Vatican I",
        summary: "Marian dogma; the First Vatican Council defines papal primacy and infallibility.",
        art: ["img/magisterium/century-19th.jpg", "center 40%"],
        councils: [
          { name: "Vatican I", year: "1869–1870", summary: "Dei Filius (faith and reason); Pastor aeternus (primacy and infallibility)." }
        ],
        controversies: [
          {
            id: "infallibility",
            name: "Papal Infallibility Debate",
            question: "Under what conditions is the pope’s teaching irreformable of itself, not from the consent of the Church?",
            positions: [
              "Ultramontanes: clear definition of personal infallibility when teaching ex cathedra on faith or morals.",
              "Minority at Vatican I: fears of over-definition or political misuse; some prefer fuller conciliar framing."
            ],
            intervention: "Vatican I debates; Pastor aeternus (1870).",
            magisterialAct: "Definition of the pope’s primacy and infallible magisterium under strict conditions.",
            result: "The dogma is received by the Catholic Church; Old Catholic separation among opponents.",
            laterDevelopment: "Vatican II’s Lumen gentium situates papal infallibility within the collegial and sensus fidei context."
          }
        ],
        papalDocuments: [
          { name: "Ineffabilis Deus", pope: "Pius IX", year: "1854", summary: "Definition of the Immaculate Conception." },
          { name: "Pastor aeternus", pope: "Vatican I / Pius IX", year: "1870", summary: "Primacy and infallibility." },
          { name: "Aeterni Patris", pope: "Leo XIII", year: "1879", summary: "Revival of Thomistic philosophy." },
          { name: "Rerum novarum", pope: "Leo XIII", year: "1891", summary: "Foundational social encyclical." }
        ],
        otherActs: [
          { name: "Syllabus of Errors", year: "1864", summary: "Condemned modern errors attached to Quanta cura." }
        ]
      },
      {
        id: "20th",
        century: 20,
        name: "20th Century",
        latin: "Saeculum XX",
        short: "Assumption and Vatican II",
        summary: "The Assumption; the Second Vatican Council; a century of social teaching and ressourcement.",
        art: ["img/magisterium/century-20th.jpg", "center 50%"],
        councils: [
          { name: "Vatican II", year: "1962–1965", summary: "Church, liturgy, revelation, ecumenism, religious liberty, modern world." }
        ],
        controversies: [
          {
            id: "modernism",
            name: "Modernist Crisis",
            question: "How may historical-critical methods and modern philosophy relate to defined dogma without dissolving it?",
            positions: [
              "Modernist currents: dogma as evolving symbolic expression of religious experience.",
              "Pius X and anti-modernist measures: dogma has determinate truth content; condemnations of specific errors."
            ],
            intervention: "Pascendi and Lamentabili (1907); Anti-Modernist Oath.",
            magisterialAct: "Condemnation of modernism as the ‘synthesis of all heresies’ in Pascendi.",
            result: "Tight control of theological education in the early twentieth century.",
            laterDevelopment: "Mid-century ressourcement and Vatican II reopen historical theology within orthodoxy."
          }
        ],
        papalDocuments: [
          { name: "Pascendi Dominici gregis", pope: "Pius X", year: "1907", summary: "Condemnation of modernism." },
          { name: "Munificentissimus Deus", pope: "Pius XII", year: "1950", summary: "Definition of the Assumption of Mary." },
          { name: "Humanae vitae", pope: "Paul VI", year: "1968", summary: "Teaching on the regulation of birth." },
          { name: "Lumen gentium, Dei verbum, et al.", pope: "Vatican II", year: "1964–1965", summary: "Conciliar constitutions of the Second Vatican Council." }
        ],
        otherActs: [
          { name: "Code of Canon Law (1917)", year: "1917", summary: "First comprehensive codification of Latin canon law." }
        ]
      },
      {
        id: "21st",
        century: 21,
        name: "21st Century",
        latin: "Saeculum XXI",
        short: "Living magisterium today",
        summary: "Ongoing ordinary and extraordinary magisterium: social teaching, synodality, and the reception of Vatican II.",
        art: ["img/magisterium/century-21st.jpg", "center 35%"],
        councils: [],
        controversies: [],
        papalDocuments: [
          { name: "Deus caritas est", pope: "Benedict XVI", year: "2005", summary: "Encyclical on Christian love." },
          { name: "Laudato si’", pope: "Francis", year: "2015", summary: "Care for our common home." },
          { name: "Amoris laetitia", pope: "Francis", year: "2016", summary: "Apostolic exhortation on love in the family." },
          { name: "Fiducia supplicans", pope: "Dicastery for the Doctrine of the Faith", year: "2023", summary: "Declaration on blessings—ordinary magisterium of the Roman Curia under the pope." }
        ],
        otherActs: [
          { name: "Synods of Bishops", year: "ongoing", summary: "Synodal path as a form of consultation under the primacy." }
        ]
      }
    ]
  };
})();
