#!/usr/bin/env python3
"""Generate js/concept-exhibits-data.js — four-tradition encyclopedia exhibits."""
import json
from pathlib import Path

COLS = [
    {"key": "catholic", "label": "Catholic", "anchor": "trad-catholic"},
    {"key": "orthodox", "label": "Eastern Orthodox", "anchor": "trad-orthodox"},
    {"key": "lutheran", "label": "Lutheran", "anchor": "trad-lutheran"},
    {"key": "reformed", "label": "Reformed", "anchor": "trad-reformed"},
]
LBL = ["Catholic", "Eastern Orthodox", "Lutheran", "Reformed"]


def trad(key, name, subtitle, account, argument, objection, response, figures):
    return {
        "id": "trad-" + key,
        "key": key,
        "name": name,
        "subtitle": subtitle,
        "account": account if isinstance(account, list) else [account],
        "argument": argument,
        "objection": objection,
        "response": response,
        "figures": figures,
    }


def clash(title, texts, flow=None):
    d = {
        "title": title,
        "cells": [{"label": LBL[i], "text": texts[i]} for i in range(4)],
    }
    if flow:
        d["flow"] = flow
    return d


def src(author, title, href, note):
    return {"author": author, "title": title, "href": href, "note": note}


def glance_rows(pairs):
    rows = []
    for label, cells in pairs:
        rows.append({"label": label, "cells": dict(zip(("catholic", "orthodox", "lutheran", "reformed"), cells))})
    return rows


def exhibit(**kw):
    kw.setdefault("glanceTitle", kw["title"] + " at a Glance")
    if "glance" in kw and "columns" not in kw["glance"]:
        kw["glance"] = {"columns": COLS, "rows": kw["glance"]["rows"]}
    return kw


EXHIBITS = {}

# ---------------------------------------------------------------------------
# GRACE
# ---------------------------------------------------------------------------
EXHIBITS["grace"] = exhibit(
    id="grace",
    domain="Salvation",
    title="Grace",
    latin="Gratia",
    centralQuestion="How does God save a human being who cannot save himself?",
    definition="Grace is the free and unmerited action and gift of God by which human beings are called, forgiven, healed, justified, sanctified, and brought into communion with Him.",
    lead="Catholic, Eastern Orthodox, Lutheran, and Reformed Christians all affirm that fallen humanity cannot save itself and that salvation begins with God’s free gift. They diverge over how grace relates to the will, whether grace transforms the person, whether justifying grace is forensic or also interior, whether grace can be resisted, and how election belongs to the economy of salvation.",
    questionQuote="If salvation is entirely God’s gift, what role remains for human freedom?",
    questionNote="The controversy is not whether grace is necessary. All four traditions affirm that it is. The deeper questions are these:",
    deeperQuestions=[
        "Does grace merely forgive, or does it transform?",
        "How does grace affect the human will?",
        "Can grace be resisted?",
        "Does the human person cooperate with grace?",
        "Is justification primarily forensic, transformative, or both?",
        "How are grace and predestination related?",
        "How does grace lead to final perseverance?",
    ],
    glance={"rows": glance_rows([
        ("Understanding of grace", [
            "Grace heals and elevates human nature.",
            "Grace is participation in the divine life (energies).",
            "Grace is God’s free mercy in Christ, given through the Gospel.",
            "Grace is God’s sovereign and efficacious work in salvation.",
        ]),
        ("Human response", [
            "Cooperation is real and itself grace-enabled.",
            "Synergy: the person freely responds within God’s initiating action.",
            "In conversion the sinner is passive; faith receives what God gives.",
            "The regenerated will responds freely; regeneration precedes faith.",
        ]),
        ("Free will", [
            "Will remains after the Fall, but wounded; healed by grace.",
            "Freedom belongs to the image of God; impaired, not erased.",
            "The bound will cannot turn to God until the Spirit works through the Word.",
            "Total inability apart from regenerating grace; then free response.",
        ]),
        ("Can grace be resisted?", [
            "Actual graces may be resisted; final perseverance is gift.",
            "God does not compel; refusal remains possible.",
            "Grace is resistible; the Spirit can be rejected.",
            "Effectual calling is not successfully resisted by the elect.",
        ]),
        ("Justification", [
            "Forgiveness and interior renewal by sanctifying grace.",
            "Righteousness is life in communion; healing and theosis.",
            "Forensic: Christ’s righteousness received by faith.",
            "Forensic, grounded in union with Christ; distinct from sanctification.",
        ]),
        ("Election", [
            "God predestines to life; does not positively predestine to evil.",
            "Foreknowledge and call without a decree that cancels synergy.",
            "Election to salvation affirmed; reprobation treated with restraint.",
            "Unconditional election and effectual grace for the elect.",
        ]),
    ])},
    traditions=[
        trad("catholic", "Catholic", "Grace heals and elevates nature.",
             ["In Catholic teaching, grace is not a wage God owes to unaided effort. It is God’s free gift, ordered to a supernatural end that exceeds the powers of nature. Actual graces illuminate the mind and move the will; sanctifying (habitual) grace is a stable gift by which the soul is made a partaker of the divine nature and capable of meritorious acts of faith, hope, and charity.",
              "Justification is both forgiveness of sins and interior renewal. Faith is the beginning, foundation, and root, yet living faith is formed by charity. The sacraments are ordinary instruments of grace. Merit is always secondary: no one places God in debt. Final perseverance remains a gift to be prayed for."],
             "The same God who made human freedom does not save by abolishing it, nor by treating grace as a mere external declaration. If the end is supernatural communion, nature must be elevated, not only acquitted. Against Pelagius, grace is absolutely prior; against a purely extrinsic account, grace is also interior and sacramental.",
             "Classical Lutheran and Reformed critics argue that infused habitual grace and talk of merit reintroduce human contribution into the ground of acceptance with God. If cooperation belongs to justification itself, the conscience cannot rest on Christ’s finished work alone.",
             "Catholic replies distinguish the cause of justification from its fruit. Nothing preceding grace earns the first justification; works done in grace are gifts of God in us. Merit language protects secondary causality under grace, not a debt God owes.",
             [{"id": "augustine", "name": "Augustine"}, {"id": "aquinas", "name": "Thomas Aquinas"}, {"id": None, "name": "Council of Trent"}]),
        trad("orthodox", "Eastern Orthodox", "Grace, synergy, and theosis.",
             ["Eastern theology frames grace less as a created quality interposed between God and the soul and more as God’s own action toward the creature. The goal is theosis: participation in the divine life without confusion of natures. Athanasius’s dictum—God became human that humans might become divine—sets the horizon.",
              "Synergy names the conviction that God initiates and sustains while the person freely responds. Later Byzantine theology, especially Palamas, distinguishes the incommunicable essence from the uncreated energies, the mode of real participation. Liturgy, asceticism, and the mysteries are the ordinary path."],
             "If salvation is life in God, grace must be more than a courtroom verdict. The Incarnation and Pascha heal human nature. Synergy protects both divine priority and the integrity of the person who must repent and struggle—always under grace.",
             "Western critics worry that synergy and theosis understate the bondage of the will and blur justification with progressive transformation. Some charge the East with insufficient metaphysical precision about created grace.",
             "Orthodoxy answers that juridical metaphors are real but not exhaustive. Synergy is not equal partnership in originating salvation; it is the free response of a healed will within the Spirit’s work. Essence–energies language keeps participation from pantheism.",
             [{"id": "athanasius", "name": "Athanasius"}, {"id": "maximus", "name": "Maximus the Confessor"}, {"id": "palamas", "name": "Gregory of Palamas"}]),
        trad("lutheran", "Lutheran", "Grace is God’s free mercy in Christ, received through faith.",
             ["Lutheran theology centers grace in the Gospel: the promise of forgiveness for Christ’s sake. Justification is forensic—God declares the sinner righteous because of Christ, received by faith alone. The bound will cannot prepare itself; conversion is God’s work through Word and Sacrament.",
              "Grace is resistible: the Spirit can be rejected. Believers remain simultaneously righteous and sinners. Good works follow living faith as fruit, not as the cause of justification. Election to salvation is confessed; a symmetrical decree of reprobation is typically refused."],
             "The driving concern is the terrified conscience. If acceptance depends on interior transformation measured as one’s own, assurance collapses. Scripture’s ‘faith is counted as righteousness’ demands a justification that is gift, not process.",
             "Catholic and Orthodox critics argue that a purely forensic justification risks leaving the person unchanged. Reformed critics argue that resistible grace fails to secure the sovereignty of grace or the perseverance of the saints.",
             "Lutherans reply that forensic justification does not exclude new life; it grounds it. Mixing justification and sanctification as the basis of acceptance returns the sinner to the law. The Word truly offers grace universally; resistance is a tragic reality of the fallen will.",
             [{"id": "luther", "name": "Martin Luther"}, {"id": "melanchthon", "name": "Philip Melanchthon"}, {"id": None, "name": "Formula of Concord"}]),
        trad("reformed", "Reformed / Calvinist", "Grace sovereignly regenerates the elect.",
             ["Reformed theology teaches radical inability: apart from regenerating grace the sinner will not submit to God. Election is unconditional. Effectual calling and regeneration precede saving faith; the Spirit renews the will so that the person freely believes. This is later summarized as ‘irresistible grace’: not coercion, but the certain success of God’s purpose.",
              "Justification is forensic and grounded in union with Christ. Sanctification is distinct yet inseparable. Perseverance of the saints follows. The Synod of Dort defined this complex against Arminian revisions that made election conditional and grace finally resistible."],
             "If grace could finally fail wherever it is sincerely given, salvation would rest on the mutable will. Scripture’s language of new birth and God’s purpose according to election presses toward a grace that accomplishes what God intends for the elect.",
             "Lutheran, Catholic, Orthodox, and Arminian critics argue that effectual calling and unconditional election threaten the universal offer of the Gospel, or make God the author of reprobation in a morally troubling way.",
             "Reformed theologians distinguish moral force from physical compulsion: the Spirit changes what the sinner wants, so faith is free. The external call is genuine; the effectual call is inward work in the elect. Reprobation is typically framed as preterition, not as God injecting evil.",
             [{"id": "calvin", "name": "John Calvin"}, {"id": None, "name": "Theodore Beza"}, {"id": None, "name": "Synod of Dort"}]),
    ],
    agreements=[
        "Salvation originates in God’s grace, not in unaided human achievement.",
        "Fallen humanity cannot save itself.",
        "Christ is the source and center of salvation.",
        "Grace is not something humans can use to place God in their debt.",
        "Faith is indispensable to the Christian reception of salvation.",
        "The Christian life requires ongoing divine assistance.",
        "Salvation ultimately depends upon God’s initiative.",
    ],
    clashes=[
        clash("I. Does grace transform the person?", [
            "Yes: sanctifying grace is interior renewal together with forgiveness.",
            "Yes: healing and theosis define the path of salvation.",
            "Justification is forensic and distinct from sanctification; grace nonetheless creates new life.",
            "Union with Christ yields both; justifying righteousness remains Christ’s, imputed.",
        ]),
        clash("II. Can the human will cooperate with grace?", [
            "Yes—cooperation is real and is itself enabled by grace.",
            "Yes; synergy is central to the Orthodox account.",
            "Not in the initial conversion of the bound will.",
            "Regeneration precedes the saving response; then the renewed will responds freely.",
        ]),
        clash("III. Can grace be resisted?", [
            "Actual graces can be resisted; perseverance is not automatic.",
            "God does not compel; human refusal remains possible.",
            "Yes; grace is resistible even as faith, when given, is wholly gift.",
            "Effectual calling of the elect is not finally defeated.",
        ]),
        clash("IV. How does grace relate to justification?", [
            "Justifying grace forgives and inwardly renews.",
            "‘Justification’ is held within healing and communion.",
            "The Gospel justifies by faith alone; sanctification follows without becoming the basis of acceptance.",
            "Grace unites to Christ; justification is forensic; sanctification is distinct.",
        ], "Grace → Justification → Sanctification"),
        clash("V. How does grace relate to election?", [
            "Predestination to life; God does not positively will evil.",
            "Foreknowledge and call without cancelling synergy.",
            "Election to salvation confessed; symmetrical double decrees typically refused.",
            "Unconditional election, effectual grace, and perseverance form one chain.",
        ]),
    ],
    timeline=[
        {"date": "c. 400–418", "title": "Pelagius", "figureId": "pelagius",
         "significance": "Denied the necessity of interior preventing grace; provoked the crisis that defined Western grace theology.",
         "extra": "The Church’s rejection of Pelagianism became a fixed boundary for Catholic, Lutheran, and Reformed orthodoxy."},
        {"date": "c. 412–430", "title": "Augustine of Hippo", "figureId": "augustine",
         "significance": "Defended the priority of grace and the wounded will against Pelagius.",
         "extra": "On Nature and Grace, On the Spirit and the Letter, and On Grace and Free Will remain primary texts. Later Catholics, Lutherans, and Reformed all claim Augustine while reading him differently."},
        {"date": "13th century", "title": "Thomas Aquinas", "figureId": "aquinas",
         "significance": "Scholastic analysis of habitual and actual grace, merit, and the supernatural end.",
         "extra": "This precision became both a resource for Trent and a target for Reformation critique."},
        {"date": "1525", "title": "Luther — Bondage of the Will", "figureId": "luther",
         "significance": "Against Erasmus, Luther argued the bound will and the freeness of justifying grace.",
         "extra": "The debate fixed Lutheran monergism in conversion and the forensic shape of justification."},
        {"date": "1536–1559", "title": "Calvin — Institutes", "figureId": "calvin",
         "significance": "Systematized election, effectual calling, and forensic justification.",
         "extra": "Calvin’s synthesis shaped Reformed confessions and the debates settled at Dort."},
        {"date": "1545–1563", "title": "Council of Trent", "figureId": None,
         "significance": "Defined justification as forgiveness and interior renewal.",
         "extra": "Trent remains the authoritative Catholic response to the Reformation on grace."},
        {"date": "1618–1619", "title": "Synod of Dort", "figureId": None,
         "significance": "Reformed churches defined unconditional election, effectual grace, and perseverance.",
         "extra": "Dort is to the Reformed tradition what Trent is to Catholic controversy with Protestantism."},
    ],
    sources=[
        src("Augustine", "On Grace and Free Will", "https://www.newadvent.org/fathers/1510.htm", "New Advent · Church Fathers"),
        src("Augustine", "On Nature and Grace", "https://www.newadvent.org/fathers/1503.htm", "New Advent · against Pelagius"),
        src("Augustine", "On the Spirit and the Letter", "https://www.newadvent.org/fathers/1502.htm", "New Advent · grace and law"),
        src("Thomas Aquinas", "Summa Theologiae — Treatise on Grace", "texts/summa.html?part=prima-sec&q=109&a=1", "ST I-II QQ.109–114"),
        src("Council of Trent", "Decree on Justification (Session VI)", "https://www.newadvent.org/cathen/08573a.htm", "New Advent"),
        src("Martin Luther", "The Bondage of the Will", "https://www.ccel.org/ccel/luther", "CCEL · PD editions"),
        src("John Calvin", "Institutes of the Christian Religion", "https://www.ccel.org/ccel/calvin/institutes", "CCEL"),
        src("Formula of Concord", "Free Will, Justification, Election", "https://bookofconcord.org/", "Book of Concord"),
        src("Catholic Encyclopedia", "Grace", "https://www.newadvent.org/cathen/06689x.htm", "New Advent"),
    ],
    thread=[{"id": "original-sin", "name": "Original Sin"}, {"id": "grace", "name": "Grace", "current": True},
            {"id": "free-will", "name": "Free Will"}, {"id": "justification", "name": "Justification"},
            {"id": "faith-works", "name": "Faith & Works"}, {"id": "predestination", "name": "Predestination"}],
    related=[{"id": "original-sin", "name": "Original Sin"}, {"id": "free-will", "name": "Free Will"},
             {"id": "justification", "name": "Justification"}, {"id": "faith-works", "name": "Faith & Works"},
             {"id": "predestination", "name": "Predestination"}, {"id": "sacraments", "name": "Sacraments"},
             {"id": "theosis", "name": "Theosis"}, {"id": "baptism", "name": "Baptism"}],
)

print("grace ok", len(EXHIBITS))
Path("/tmp/exhibits_partial.json").write_text("partial")
print("helpers ready")
