const SUPABASE_URL = "DEINE_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "DEIN_SUPABASE_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const storageKey = "matchlab-football-state-v1";
const colors = ["#247a52", "#ba4a43", "#247983", "#b66d1f", "#6a5b95", "#8a6f37"];
const venueTypes = ["Heim", "Auswärts"];
const competitionTypes = ["Liga", "Pokal", "Freundschaftsspiel", "Interner Test"];
const defaultFilters = { venue: "all", competition: "all", period: "all", dateFrom: "", dateTo: "" };
const periodTypes = ["all", "last3", "last5", "last30", "firstHalf", "secondHalf", "custom"];
const trainingTypes = ["Mannschaftstraining", "Taktiktraining", "Athletiktraining", "Regeneration", "Torabschluss", "Standards", "Individualtraining", "Video + Platz"];
const trainingPriorities = ["Normal", "Hoch", "Sehr hoch"];
const trainingIntensities = ["Niedrig", "Mittel", "Hoch", "Sehr hoch"];
const availabilityStatuses = ["Offen", "Zusage", "Absage", "Verletzt", "Unentschuldigt", "Fraglich"];
const seedPlayerIds = ["p1", "p2", "p3", "p4", "p5", "p6"];
const calendarEventTypes = ["Team-Event", "Besprechung", "Athletiktest", "Medizin", "Vereinstermin", "Sonstiges"];
const calendarItemTypes = [
  { id: "training", label: "Training" },
  { id: "match", label: "Spiel" },
  { id: "event", label: "Event" },
];
const calendarTimelineFilters = ["upcoming", "past"];
const rankingTabs = ["overall", "match", "training"];
const injuryTypes = ["Muskelverletzung", "Bänderverletzung", "Gelenkproblem", "Prellung", "Knochenverletzung", "Sehne / Überlastung", "Kopfverletzung", "Krankheit", "Sonstiges"];
const injuryBodyAreas = ["Oberschenkel", "Wade", "Knie", "Sprunggelenk", "Fuß", "Hüfte / Leiste", "Rücken", "Schulter", "Arm / Hand", "Kopf", "Allgemein", "Sonstiges"];
const injurySeverities = ["Leicht", "Mittel", "Schwer"];
const injuryStatuses = ["Aktiv", "Reha", "Aufbautraining", "Ausgeheilt"];
const injuryTrainingLoads = ["Kein Training", "Nur Reha", "Niedrig", "Niedrig bis mittel", "Mittel", "Voll belastbar"];
const defaultInjuryFilters = { player: "all", status: "open" };
const globalAvailabilityStatuses = ["Absage", "Verletzt", "Fraglich"];
const availabilityWeekdays = [
  { id: "all", label: "Alle Tage" },
  { id: "1", label: "Montag" },
  { id: "2", label: "Dienstag" },
  { id: "3", label: "Mittwoch" },
  { id: "4", label: "Donnerstag" },
  { id: "5", label: "Freitag" },
  { id: "6", label: "Samstag" },
  { id: "7", label: "Sonntag" },
];
const defaultAvailabilityFilters = { player: "all", status: "all" };
const absenceReasons = [
  "Krank",
  "Verletzt",
  "Reha / Belastungssteuerung",
  "Schule / Ausbildung",
  "Arbeit",
  "Privater Termin",
  "Familie",
  "Urlaub",
  "Fahrtproblem",
  "Zu spät gemeldet",
  "Keine Rückmeldung",
  "Unentschuldigt",
  "Sonstiges",
];
const defaultTrainingFilters = { type: "all", priority: "all", intensity: "all" };
const goalTypeGroups = [
  {
    group: "Standard",
    options: [
      ["corner", "Tor nach Eckball"],
      ["corner-left", "Ecke von links"],
      ["corner-right", "Ecke von rechts"],
      ["direct-free-kick", "Direkter Freistoß"],
      ["indirect-free-kick", "Indirekter Freistoß"],
      ["penalty", "Elfmeter"],
      ["throw-in", "Nach Einwurf"],
      ["second-ball-set-piece", "Zweiter Ball nach Standard"],
    ],
  },
  {
    group: "Entstehung",
    options: [
      ["cross-left", "Tor nach Flanke von links"],
      ["cross-right", "Tor nach Flanke von rechts"],
      ["cutback", "Rückpass / Cutback"],
      ["through-ball", "Schnittstellenpass"],
      ["counter", "Konter / Umschaltmoment"],
      ["high-press", "Ballgewinn hohes Pressing"],
      ["combination", "Kombination"],
      ["solo", "Einzelaktion / Dribbling"],
      ["rebound", "Abpraller / zweiter Ball"],
      ["own-goal", "Eigentor"],
    ],
  },
  {
    group: "Abschluss",
    options: [
      ["header", "Kopfball"],
      ["right-foot", "Rechter Fuß"],
      ["left-foot", "Linker Fuß"],
      ["volley", "Volley"],
      ["direct-shot", "Direktabnahme"],
      ["inside-box", "Abschluss im Strafraum"],
      ["outside-box", "Distanzschuss"],
      ["one-v-one", "1-gegen-1 gegen Torwart"],
      ["tap-in", "Abstauber"],
    ],
  },
];
const goalTypeOptions = goalTypeGroups.flatMap((group) => group.options.map(([id, label]) => ({ id, label, group: group.group })));
const cardTypes = ["Gelb", "Gelb-Rot", "Rot"];
const playerPositions = [
  "Torhüter",
  "Innenverteidiger",
  "Außenverteidiger",
  "Flügelverteidiger",
  "Defensives Mittelfeld",
  "Zentrales Mittelfeld",
  "Offensives Mittelfeld",
  "Außenspieler",
  "Stürmer",
];
const possessionRoles = {
  "Torhüter": ["Torhüter – Torwart", "Torhüter – Kompromissloser Torhüter", "Torhüter – Ballspielender Torhüter"],
  "Innenverteidiger": ["Innenverteidiger – Innenverteidiger", "Innenverteidiger – Ballspielender Innenverteidiger", "Innenverteidiger – Kompromissloser Innenverteidiger", "Innenverteidiger – Aufrückender Innenverteidiger", "Innenverteidiger – Halbraumverteidiger", "Innenverteidiger – Hinterlaufender Halbraumverteidiger"],
  "Außenverteidiger": ["Außenverteidiger – Außenverteidiger", "Außenverteidiger – Flügelverteidiger", "Außenverteidiger – Inverser Außenverteidiger", "Außenverteidiger – Inverser Flügelverteidiger", "Außenverteidiger – Spielmachender Flügelverteidiger"],
  "Flügelverteidiger": ["Flügelverteidiger – Flügelverteidiger", "Flügelverteidiger – Inverser Flügelverteidiger", "Flügelverteidiger – Spielmachender Flügelverteidiger", "Flügelverteidiger – Vorgeschobener Flügelverteidiger"],
  "Defensives Mittelfeld": ["Defensives Mittelfeld – Defensiver Mittelfeldspieler", "Defensives Mittelfeld – Tiefer Spielmacher", "Defensives Mittelfeld – Abkippender Sechser", "Defensives Mittelfeld – Box-to-Box-Spieler", "Defensives Mittelfeld – Box-to-Box-Spielmacher"],
  "Zentrales Mittelfeld": ["Zentrales Mittelfeld – Zentraler Mittelfeldspieler", "Zentrales Mittelfeld – Spielmacher", "Zentrales Mittelfeld – Weiter Achter", "Zentrales Mittelfeld – Vorgeschobener Spielmacher"],
  "Offensives Mittelfeld": ["Offensives Mittelfeld – Offensiver Mittelfeldspieler", "Offensives Mittelfeld – Vorgeschobener Spielmacher", "Offensives Mittelfeld – Freigeist / Freirolle", "Offensives Mittelfeld – Halbraumspieler", "Offensives Mittelfeld – Zweiter Stürmer"],
  "Außenspieler": ["Außenspieler – Äußerer Mittelfeldspieler", "Außenspieler – Flügelspieler", "Außenspieler – Halbraumflügel", "Außenspieler – Äußerer Spielmacher", "Außenspieler – Inverser Außenstürmer", "Außenspieler – Außenstürmer"],
  "Stürmer": ["Stürmer – Mittelstürmer", "Stürmer – Hängende Spitze", "Stürmer – Falsche Neun", "Stürmer – Zielspieler", "Stürmer – Knipser", "Stürmer – Halbraumstürmer"],
};
const outOfPossessionRoles = {
  "Torhüter": ["Torhüter – Libero-Torwart", "Torhüter – Linientorhüter"],
  "Innenverteidiger": ["Innenverteidiger – Herausrückender Innenverteidiger", "Innenverteidiger – Absichernder Innenverteidiger", "Breiter Innenverteidiger – Absichernder breiter Innenverteidiger", "Breiter Innenverteidiger – Herausrückender breiter Innenverteidiger"],
  "Außenverteidiger": ["Außenverteidiger – Pressender Außenverteidiger", "Außenverteidiger – Absichernder Außenverteidiger"],
  "Flügelverteidiger": ["Flügelverteidiger – Pressender Flügelverteidiger", "Flügelverteidiger – Absichernder Flügelverteidiger"],
  "Defensives Mittelfeld": ["Defensives Mittelfeld – Pressender defensiver Mittelfeldspieler", "Defensives Mittelfeld – Abkippender defensiver Mittelfeldspieler", "Defensives Mittelfeld – Abschirmender defensiver Mittelfeldspieler", "Defensives Mittelfeld – Flügelabsichernder defensiver Mittelfeldspieler"],
  "Zentrales Mittelfeld": ["Zentrales Mittelfeld – Pressender zentraler Mittelfeldspieler", "Zentrales Mittelfeld – Abschirmender zentraler Mittelfeldspieler", "Zentrales Mittelfeld – Flügelabsichernder zentraler Mittelfeldspieler"],
  "Offensives Mittelfeld": ["Offensives Mittelfeld – Zentraler Umschaltspieler", "Offensives Mittelfeld – Ausweichender Umschaltspieler", "Offensives Mittelfeld – Mitverteidigender offensiver Mittelfeldspieler"],
  "Außenspieler": ["Breites Mittelfeld – Mitverteidigender breiter Mittelfeldspieler", "Breites Mittelfeld – Breiter Umschaltspieler", "Außenstürmer – Breiter Umschaltspieler", "Außenstürmer – Mitverteidigender Flügelspieler", "Außenstürmer – Einrückender Umschaltspieler"],
  "Stürmer": ["Stürmer – Mitverteidigender Mittelstürmer", "Stürmer – Zentraler Umschaltstürmer", "Stürmer – Ausweichender Umschaltstürmer"],
};

const statFields = [
  "minutes",
  "passesCompleted",
  "passesAttempted",
  "goals",
  "assists",
  "shots",
  "dribblesCompleted",
  "dribblesAttempted",
  "crossesCompleted",
  "crossesAttempted",
  "tacklesWon",
  "duelsWon",
  "interceptions",
  "ballLosses",
  "rating",
  "saves",
  "shotsOnTargetAgainst",
  "penaltiesSaved",
  "penaltiesFaced",
  "clearances",
  "aerialDuelsWon",
  "tacklesAttempted",
  "duelsAttempted",
  "foulsCommittedPlayer",
  "blockedShots",
  "progressivePasses",
  "xAOpenPlay",
  "nonPenaltyXgStat",
  "keyPasses",
];

const positionSpecificFields = [
  "saves",
  "shotsOnTargetAgainst",
  "penaltiesSaved",
  "penaltiesFaced",
  "clearances",
  "aerialDuelsWon",
  "tacklesAttempted",
  "duelsAttempted",
  "foulsCommittedPlayer",
  "blockedShots",
  "progressivePasses",
  "xAOpenPlay",
  "nonPenaltyXgStat",
  "keyPasses",
];

const leaderboardMetrics = [
  { id: "index", label: "Leistungsindex", mode: "average", suffix: "", value: (aggregate) => aggregate.averageIndex },
  { id: "minutes", label: "Minuten", mode: "sum", suffix: " Min.", value: (aggregate) => aggregate.minutes },
  { id: "passAccuracy", label: "Passquote", mode: "quote", suffix: "%", value: (aggregate) => aggregate.passAccuracy },
  { id: "passesCompleted", label: "Pässe angekommen", mode: "sum", suffix: "", value: (aggregate) => aggregate.passesCompleted },
  { id: "passesAttempted", label: "Pässe gesamt", mode: "sum", suffix: "", value: (aggregate) => aggregate.passesAttempted },
  { id: "goals", label: "Tore", mode: "sum", suffix: "", value: (aggregate) => aggregate.goals },
  { id: "assists", label: "Assists", mode: "sum", suffix: "", value: (aggregate) => aggregate.assists },
  { id: "shots", label: "Abschlüsse", mode: "sum", suffix: "", value: (aggregate) => aggregate.shots },
  { id: "dribblesCompleted", label: "Dribblings erfolgreich", mode: "sum", suffix: "", value: (aggregate) => aggregate.dribblesCompleted },
  { id: "dribblesAttempted", label: "Dribblings gesamt", mode: "sum", suffix: "", value: (aggregate) => aggregate.dribblesAttempted },
  { id: "dribbleSuccess", label: "Dribblingquote", mode: "quote", suffix: "%", value: (aggregate) => aggregate.dribbleSuccess },
  { id: "crossesCompleted", label: "Flanken angekommen", mode: "sum", suffix: "", value: (aggregate) => aggregate.crossesCompleted },
  { id: "crossesAttempted", label: "Flanken gesamt", mode: "sum", suffix: "", value: (aggregate) => aggregate.crossesAttempted },
  { id: "crossAccuracy", label: "Flankenquote", mode: "quote", suffix: "%", value: (aggregate) => aggregate.crossAccuracy },
  { id: "tacklesWon", label: "Tacklings gewonnen", mode: "sum", suffix: "", value: (aggregate) => aggregate.tacklesWon },
  { id: "duelsWon", label: "Zweikämpfe gewonnen", mode: "sum", suffix: "", value: (aggregate) => aggregate.duelsWon },
  { id: "interceptions", label: "Balleroberungen", mode: "sum", suffix: "", value: (aggregate) => aggregate.interceptions },
  { id: "ballLosses", label: "Ballverluste", mode: "sum", suffix: "", lowerBetter: true, value: (aggregate) => aggregate.ballLosses },
  { id: "rating", label: "Bewertung", mode: "average", suffix: "", value: (aggregate) => aggregate.averageRating },
];

const seedState = {
  players: [
    { id: "p1", name: "Noah Weber", position: "Mittelfeld", number: 8, birthYear: 2007, height: 178, foot: "Rechts", role: "Box-to-Box", profileNote: "Sehr gutes Freilaufverhalten, sucht früh den vertikalen Pass.", trainingGoal: "Unter Gegnerdruck schneller aufdrehen und den ersten vertikalen Pass sauber vorbereiten." },
    { id: "p2", name: "Leon Hartmann", position: "Sturm", number: 9, birthYear: 2006, height: 184, foot: "Rechts", role: "Zielspieler", profileNote: "Stark im Strafraum, soll die Verbindung zum Mittelfeld konstanter halten.", trainingGoal: "Ablagen nach langen Bällen sichern und Anschlussaktionen zum Mittelfeld verbessern." },
    { id: "p3", name: "Mats Keller", position: "Abwehr", number: 4, birthYear: 2007, height: 186, foot: "Links", role: "Innenverteidiger links", profileNote: "Ruhig im Aufbau, gutes Timing in direkten Duellen.", trainingGoal: "Offene Stellung im linken Aufbaukanal und diagonale Spieleröffnung schärfen." },
    { id: "p4", name: "Elias Sommer", position: "Flügel", number: 11, birthYear: 2008, height: 173, foot: "Links", role: "Inverser Flügel", profileNote: "Explosiv im Eins-gegen-eins, Entscheidungsfindung im letzten Drittel beobachten.", trainingGoal: "Eins-gegen-eins mit klarer Anschlussentscheidung und Rückraum-Cutback trainieren." },
    { id: "p5", name: "Jonas Brandt", position: "Mittelfeld", number: 6, birthYear: 2006, height: 181, foot: "Beidfüßig", role: "Sechser", profileNote: "Gibt Stabilität, erkennt Gegenpressingmomente früh.", trainingGoal: "Vororientierung vor der Ballannahme und Gegenpressing-Kommandos konsequent setzen." },
    { id: "p6", name: "Finn Richter", position: "Tor", number: 1, birthYear: 2007, height: 190, foot: "Rechts", role: "Mitspielender Torwart", profileNote: "Sicher im kurzen Aufbau, lange Spieleröffnung weiter schärfen.", trainingGoal: "Lange Spieleröffnung gezielter platzieren und nach Rückpass schneller verlagern." },
  ],
  matches: [
    { id: "m1", date: "2025-09-06", opponent: "SV Nord", venue: "Heim", competition: "Liga", goalsFor: 2, goalsAgainst: 1, nonPenaltyXg: 1.9, opponentXg: 0.9, shotsOnTarget: 6, foulsWon: 14, foulsCommitted: 9, opponentFinalThirdPasses: 42, ppda: 8.2, duelQuote: 57 },
    { id: "m2", date: "2025-09-13", opponent: "FC Hafen", venue: "Auswärts", competition: "Liga", goalsFor: 1, goalsAgainst: 1, nonPenaltyXg: 1.2, opponentXg: 1.1, shotsOnTarget: 5, foulsWon: 11, foulsCommitted: 12, opponentFinalThirdPasses: 50, ppda: 10.5, duelQuote: 54 },
    { id: "m3", date: "2025-09-20", opponent: "VfL Stadt", venue: "Heim", competition: "Pokal", goalsFor: 3, goalsAgainst: 2, nonPenaltyXg: 2.4, opponentXg: 1.5, shotsOnTarget: 8, foulsWon: 16, foulsCommitted: 14, opponentFinalThirdPasses: 58, ppda: 9.1, duelQuote: 61 },
    { id: "m4", date: "2025-09-27", opponent: "TSG West", venue: "Auswärts", competition: "Liga", goalsFor: 0, goalsAgainst: 1, nonPenaltyXg: 0.9, opponentXg: 1.4, shotsOnTarget: 3, foulsWon: 8, foulsCommitted: 13, opponentFinalThirdPasses: 66, ppda: 13.4, duelQuote: 49 },
  ],
  stats: [
    createSeedStat("m1", "p1", 90, 48, 56, 0, 1, 2, 4, 7, 5, 8, 8.2, "Viele gute Anschlussaktionen zwischen den Linien."),
    createSeedStat("m1", "p2", 84, 18, 25, 1, 0, 4, 1, 5, 1, 5, 7.7, "Sehr aktiv im Strafraum, Abschlussqualität gut."),
    createSeedStat("m1", "p3", 90, 42, 49, 0, 0, 0, 7, 9, 8, 4, 8.0, "Stark in der Restverteidigung und ruhig im Aufbau."),
    createSeedStat("m1", "p4", 76, 22, 31, 1, 0, 3, 2, 6, 2, 7, 7.5, "Gute Tiefe, im letzten Drittel etwas hektisch."),
    createSeedStat("m1", "p5", 90, 50, 61, 0, 0, 1, 5, 8, 6, 6, 7.8, "Ordnete das Zentrum, gute Gegenpressingmomente."),
    createSeedStat("m2", "p1", 90, 53, 62, 0, 0, 1, 5, 8, 6, 6, 8.0, "Kontrollierte das Tempo, gute Seitenwechsel."),
    createSeedStat("m2", "p2", 90, 20, 29, 1, 0, 5, 1, 4, 1, 6, 7.6, "Tor aus wenig Raum, Bindung zum Spiel ausbaubar."),
    createSeedStat("m2", "p3", 90, 45, 54, 0, 0, 1, 6, 10, 7, 5, 7.9, "Viele wichtige Klärungen, Aufbau solide."),
    createSeedStat("m2", "p4", 68, 19, 30, 0, 1, 2, 2, 5, 3, 8, 7.1, "Assist stark vorbereitet, sonst schwankende Passwahl."),
    createSeedStat("m2", "p5", 88, 57, 66, 0, 0, 1, 4, 7, 4, 5, 8.1, "Sehr sicher unter Druck."),
    createSeedStat("m3", "p1", 90, 61, 70, 1, 1, 3, 3, 6, 4, 5, 8.8, "Bestes Saisonspiel, viele progressive Pässe."),
    createSeedStat("m3", "p2", 82, 17, 24, 1, 1, 4, 2, 6, 1, 4, 8.4, "Sehr effizient und präsent in Umschaltmomenten."),
    createSeedStat("m3", "p3", 90, 39, 47, 0, 0, 0, 8, 11, 8, 3, 8.2, "Gewann fast alle entscheidenden Duelle."),
    createSeedStat("m3", "p4", 86, 29, 38, 1, 0, 5, 1, 7, 2, 9, 7.8, "Viel Gefahr, aber einige unnötige Ballverluste."),
    createSeedStat("m3", "p5", 90, 60, 72, 0, 1, 2, 5, 9, 7, 7, 8.3, "Sehr guter Rhythmusgeber."),
    createSeedStat("m4", "p1", 90, 43, 57, 0, 0, 1, 3, 5, 3, 9, 6.9, "Unter Druck weniger sauber als sonst."),
    createSeedStat("m4", "p2", 90, 15, 24, 0, 0, 3, 1, 4, 0, 7, 6.8, "Kam zu Chancen, aber wenig Verbindung zum Mittelfeld."),
    createSeedStat("m4", "p3", 90, 44, 53, 0, 0, 0, 7, 8, 6, 4, 7.6, "Defensiv stabil, im Aufbau teils zu vertikal."),
    createSeedStat("m4", "p4", 74, 20, 35, 0, 0, 2, 2, 5, 2, 10, 6.5, "Mutig, aber viele riskante Aktionen verloren."),
    createSeedStat("m4", "p5", 90, 52, 68, 0, 0, 1, 6, 8, 5, 8, 7.2, "Gute Arbeit gegen den Ball, Passschärfe fehlte."),
  ],
  trainings: [
    createSeedTraining("t1", "2025-09-09", "Mannschaftstraining", "Hoch", "Mittel", ["p1", "p2", "p3", "p5", "p6"], [{ playerId: "p4", status: "Verletzt", reason: "Reha / Belastungssteuerung" }]),
    createSeedTraining("t2", "2025-09-16", "Taktiktraining", "Sehr hoch", "Hoch", ["p1", "p3", "p4", "p5", "p6"], [{ playerId: "p2", status: "Absage", reason: "Schule / Ausbildung" }]),
    createSeedTraining("t3", "2025-09-23", "Torabschluss", "Hoch", "Hoch", ["p1", "p2", "p4", "p5"], [{ playerId: "p3", status: "Absage", reason: "Arbeit" }, { playerId: "p6", status: "Verletzt", reason: "Verletzt" }]),
  ],
  injuries: [
    {
      id: "inj1",
      playerId: "p4",
      type: "Muskelverletzung",
      bodyArea: "Oberschenkel",
      severity: "Leicht",
      status: "Aufbautraining",
      startDate: "2025-09-08",
      endDate: "2025-09-11",
      diagnosis: "Leichte muskuläre Reaktion im vorderen Oberschenkel.",
      doctorAssessment: "Keine Wettkampfbelastung bis schmerzfreie Beschleunigungen möglich sind.",
      physioAssessment: "Mobilität, isometrische Kraft und kurze Steigerungsläufe stufenweise aufbauen.",
      rehabPlan: "Aktivierung, leichte Laufschule, anschließend kontrollierte Richtungswechsel.",
      trainingLoad: "Niedrig bis mittel",
      returnGuidance: "Erster Einsatz maximal 20-30 Minuten, keine Maximalsprints ohne Beschwerdefreiheit.",
      note: "Nach Belastung Schmerzreaktion prüfen.",
    },
  ],
  availabilityBlocks: [
    {
      id: "ab1",
      playerId: "p2",
      status: "Absage",
      reason: "Schule / Ausbildung",
      startDate: "2025-09-01",
      endDate: "2025-10-31",
      weekday: "3",
      note: "Mittwochs nicht verfügbar, vor Wochenplanung berücksichtigen.",
    },
  ],
  calendarEvents: [
    { id: "e1", date: "2025-09-18", startTime: "19:00", endTime: "20:00", title: "Teammeeting Videoanalyse", type: "Besprechung", location: "Kabine", note: "Schwerpunkte vor dem Pokalspiel festlegen." },
  ],
  comparisonPlayers: ["p1", "p2", "p3"],
  selectedMetric: "index",
  teamMetric: "index",
  activeLeaderboard: "passAccuracy",
  activeSeasonMetric: "index",
  seasonMode: "overview",
  playerPositionFilter: "all",
  playerSearchFilter: "",
  playerFootFilter: "all",
  playerStatsFilter: "all",
  playerSort: "number",
  playerRosterView: "cards",
  analysisFilters: { ...defaultFilters },
  matchFilters: { ...defaultFilters },
  seasonFilters: { ...defaultFilters },
  trainingFilters: { ...defaultTrainingFilters },
  injuryFilters: { ...defaultInjuryFilters },
  availabilityFilters: { ...defaultAvailabilityFilters },
  calendarMonth: "2025-09",
  calendarViewMode: "month",
  calendarTimelineFilter: "upcoming",
  calendarSelectedDate: "2025-09-18",
  activeRankingTab: "overall",
  rankingBasisVisible: false,
  analystFilters: { ...defaultFilters },
  analystPlayer: "p1",
};

let state = loadState();
let pendingPlayerPhoto = "";
let activeProfilePlayerId = "";
let activeProfileMatchId = "";
let activeProfileTab = "overview";
let positionProfileComparePlayers = [];
let activeMatchId = "";
let activeMatchTab = "overview";
let activeGoalTypeFilter = "all";
let editingPlayerId = "";
let editingTrainingId = "";
let editingInjuryId = "";
let editingAvailabilityBlockId = "";
let activeTrainingId = "";
let activeTrainingTab = "overview";
let pendingDelete = null;
let activeAssistantSlide = 0;

const dom = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  bindEvents();
  renderAll();
});

function createSeedStat(matchId, playerId, minutes, passesCompleted, passesAttempted, goals, assists, shots, tacklesWon, duelsWon, interceptions, ballLosses, rating, note) {
  const extra = seedTechnicalStats(playerId, shots, assists, goals, passesAttempted);
  const positionExtra = seedPositionSpecificStats(playerId, minutes, passesCompleted, passesAttempted, goals, assists, shots, tacklesWon, duelsWon, interceptions, ballLosses);
  return {
    id: `${matchId}-${playerId}`,
    matchId,
    playerId,
    minutes,
    passesCompleted,
    passesAttempted,
    goals,
    assists,
    shots,
    ...extra,
    ...positionExtra,
    tacklesWon,
    duelsWon,
    interceptions,
    ballLosses,
    rating,
    note,
  };
}

function createSeedTraining(id, date, type, priority, intensity, presentIds, absences = []) {
  const absenceMap = new Map(absences.map((item) => [item.playerId, item]));
  const availability = seedPlayerIds
    .map((playerId) => {
        const absence = absenceMap.get(playerId);
        return {
          playerId,
          status: absence?.status || (presentIds.includes(playerId) ? "Zusage" : "Fraglich"),
          reason: absence?.reason || "",
          note: absence?.note || "",
        };
      });
  return {
    id,
    date,
    startTime: "18:30",
    endTime: "20:00",
    meetTime: "18:10",
    location: "Trainingsplatz",
    type,
    priority,
    intensity,
    topic: type === "Torabschluss" ? "Letztes Drittel und Boxbesetzung" : "Spielidee, Belastung und Anschlussaktionen",
    coachNote: "Schwerpunkte nach Videoanalyse setzen und Belastung der Rückkehrer beobachten.",
    availability,
    ratings: presentIds.map((playerId, index) => ({
      playerId,
      rating: roundTo(7.2 + (index % 3) * 0.4, 1),
      effort: 8 - (index % 2),
      focus: 7 + (index % 3),
      intensityLoad: intensity,
      note: index % 2 ? "Konzentriert, gute Kommunikation." : "Aktiv, sauber in den Anschlussaktionen.",
    })),
    groups: [
      { id: `${id}-g1`, name: "Aufbau / Ballzirkulation", playerIds: presentIds.slice(0, Math.ceil(presentIds.length / 2)) },
      { id: `${id}-g2`, name: "Letztes Drittel", playerIds: presentIds.slice(Math.ceil(presentIds.length / 2)) },
    ],
    plan: {
      warmup: "Aktivierung, Passdreiecke, Vororientierung.",
      main: "Positionsspiel mit klaren Auslösern und Anschlussaktion.",
      game: "Abschlussspiel mit Coachingzonen.",
      coachingPoints: "Kommunikation, Abstände, Tempo nach Ballgewinn.",
    },
  };
}

function seedTechnicalStats(playerId, shots, assists, goals, passesAttempted) {
  const profile = {
    p1: { dribbleBase: 4, crossBase: 2 },
    p2: { dribbleBase: 2, crossBase: 1 },
    p3: { dribbleBase: 1, crossBase: 1 },
    p4: { dribbleBase: 7, crossBase: 5 },
    p5: { dribbleBase: 3, crossBase: 2 },
    p6: { dribbleBase: 0, crossBase: 0 },
  }[playerId] || { dribbleBase: 2, crossBase: 1 };
  const dribblesAttempted = Math.max(0, profile.dribbleBase + shots + goals);
  const dribblesCompleted = Math.max(0, Math.round(dribblesAttempted * (playerId === "p4" ? 0.58 : 0.66)));
  const crossesAttempted = Math.max(0, profile.crossBase + assists + Math.round(passesAttempted / 28));
  const crossesCompleted = Math.max(0, Math.round(crossesAttempted * (playerId === "p4" ? 0.38 : 0.44)));
  return { dribblesCompleted, dribblesAttempted, crossesCompleted, crossesAttempted };
}

function seedPositionSpecificStats(playerId, minutes, passesCompleted, passesAttempted, goals, assists, shots, tacklesWon, duelsWon, interceptions, ballLosses) {
  const safeMinutes = Math.max(1, Number(minutes || 0));
  const base = {
    saves: 0,
    shotsOnTargetAgainst: 0,
    penaltiesSaved: 0,
    penaltiesFaced: 0,
    clearances: Math.max(0, Math.round(Number(interceptions || 0) * 0.45)),
    aerialDuelsWon: Math.max(0, Math.round(Number(duelsWon || 0) * 0.25)),
    tacklesAttempted: Math.max(Number(tacklesWon || 0), Math.round(Number(tacklesWon || 0) * 1.45)),
    duelsAttempted: Math.max(Number(duelsWon || 0), Math.round(Number(duelsWon || 0) * 1.55)),
    foulsCommittedPlayer: Math.max(0, Math.round(Number(ballLosses || 0) * 0.35)),
    blockedShots: Math.max(0, Math.round(Number(interceptions || 0) * 0.18)),
    progressivePasses: Math.max(0, Math.round(Number(passesCompleted || 0) * 0.22 + Number(assists || 0))),
    xAOpenPlay: roundTo(Number(assists || 0) * 0.34 + Number(passesAttempted || 0) * 0.004, 1),
    nonPenaltyXgStat: roundTo(Number(goals || 0) * 0.45 + Number(shots || 0) * 0.12, 1),
    keyPasses: Math.max(Number(assists || 0), Math.round(Number(shots || 0) * 0.55 + Number(assists || 0))),
  };

  if (playerId === "p6") {
    const saves = Math.max(1, Math.round(safeMinutes / 34 + Number(passesAttempted || 0) % 3));
    const shotsOnTargetAgainst = saves + Math.max(1, Number(ballLosses || 0) % 3);
    const penaltiesFaced = Number(passesAttempted || 0) > 38 ? 1 : 0;
    return {
      ...base,
      saves,
      shotsOnTargetAgainst,
      penaltiesFaced,
      penaltiesSaved: penaltiesFaced && Number(passesCompleted || 0) % 2 === 0 ? 1 : 0,
      progressivePasses: Math.max(0, Math.round(Number(passesCompleted || 0) * 0.18)),
      xAOpenPlay: 0,
      nonPenaltyXgStat: 0,
      keyPasses: 0,
    };
  }

  if (playerId === "p3") {
    return {
      ...base,
      clearances: Math.max(base.clearances, Number(interceptions || 0) + 3 + Math.round(Number(duelsWon || 0) / 3)),
      aerialDuelsWon: Math.max(base.aerialDuelsWon, Math.round(Number(duelsWon || 0) * 0.45)),
      foulsCommittedPlayer: Math.max(base.foulsCommittedPlayer, Math.round(Number(tacklesWon || 0) * 0.45)),
      blockedShots: Math.max(1, Math.round(Number(interceptions || 0) * 0.28)),
      progressivePasses: Math.max(base.progressivePasses, Math.round(Number(passesCompleted || 0) * 0.16)),
    };
  }

  if (playerId === "p1" || playerId === "p5") {
    return {
      ...base,
      progressivePasses: Math.max(base.progressivePasses, Math.round(Number(passesCompleted || 0) * 0.28)),
      xAOpenPlay: roundTo(Number(assists || 0) * 0.38 + Number(shots || 0) * 0.05 + Number(passesAttempted || 0) * 0.005, 1),
      keyPasses: Math.max(base.keyPasses, Math.round(Number(passesAttempted || 0) * 0.07 + Number(assists || 0))),
      clearances: Math.max(base.clearances, Math.round(Number(interceptions || 0) * 0.65)),
      blockedShots: Math.max(base.blockedShots, Math.round(Number(tacklesWon || 0) * 0.22)),
    };
  }

  return {
    ...base,
    progressivePasses: Math.max(base.progressivePasses, Math.round(Number(passesCompleted || 0) * 0.18)),
    xAOpenPlay: roundTo(Number(assists || 0) * 0.42 + Number(shots || 0) * 0.06, 1),
    nonPenaltyXgStat: roundTo(Number(goals || 0) * 0.55 + Number(shots || 0) * 0.15, 1),
    keyPasses: Math.max(base.keyPasses, Math.round(Number(shots || 0) * 0.65 + Number(assists || 0) * 2)),
  };
}

function cacheDom() {
  dom.viewTitle = document.querySelector("#viewTitle");
  dom.navItems = document.querySelectorAll(".nav-item");
  dom.views = document.querySelectorAll(".view");
  dom.jumpButtons = document.querySelectorAll("[data-jump]");
  dom.dashboardCalendarSummary = document.querySelector("#dashboardCalendarSummary");
  dom.dashboardAssistant = document.querySelector("#dashboardAssistant");
  dom.dashboardMetrics = document.querySelector("#dashboardMetrics");
  dom.teamFormChart = document.querySelector("#teamFormChart");
  dom.topPlayersChart = document.querySelector("#topPlayersChart");
  dom.recentMatchesTable = document.querySelector("#recentMatchesTable");
  dom.teamMetricSelect = document.querySelector("#teamMetricSelect");
  dom.resetDemoButton = document.querySelector("#resetDemoButton");
  dom.statForm = document.querySelector("#statForm");
  dom.statMatch = document.querySelector("#statMatch");
  dom.statPlayer = document.querySelector("#statPlayer");
  dom.analysisVenueFilter = document.querySelector("#analysisVenueFilter");
  dom.analysisCompetitionFilter = document.querySelector("#analysisCompetitionFilter");
  dom.analysisMatchTitle = document.querySelector("#analysisMatchTitle");
  dom.matchPassChart = document.querySelector("#matchPassChart");
  dom.matchStatsTable = document.querySelector("#matchStatsTable");
  dom.clearStatButton = document.querySelector("#clearStatButton");
  dom.statLeaderboard = document.querySelector("#statLeaderboard");
  dom.statLeaderboardTitle = document.querySelector("#statLeaderboardTitle");
  dom.statLeaderboardHint = document.querySelector("#statLeaderboardHint");
  dom.leaderboardMetricTabs = document.querySelector("#leaderboardMetricTabs");
  dom.statLabelButtons = document.querySelectorAll(".stat-label-button");
  dom.comparisonPicker = document.querySelector("#comparisonPicker");
  dom.comparisonMetric = document.querySelector("#comparisonMetric");
  dom.comparisonLineChart = document.querySelector("#comparisonLineChart");
  dom.radarChart = document.querySelector("#radarChart");
  dom.comparisonTable = document.querySelector("#comparisonTable");
  dom.notesTimeline = document.querySelector("#notesTimeline");
  dom.playerForm = document.querySelector("#playerForm");
  dom.playerName = document.querySelector("#playerName");
  dom.playerPosition = document.querySelector("#playerPosition");
  dom.playerPositionFilter = document.querySelector("#playerPositionFilter");
  dom.playerSearchFilter = document.querySelector("#playerSearchFilter");
  dom.playerFootFilter = document.querySelector("#playerFootFilter");
  dom.playerStatsFilter = document.querySelector("#playerStatsFilter");
  dom.playerSortSelect = document.querySelector("#playerSortSelect");
  dom.playerViewButtons = document.querySelectorAll("[data-player-view]");
  dom.playerSecondaryPositions = document.querySelector("#playerSecondaryPositions");
  dom.playerNumber = document.querySelector("#playerNumber");
  dom.playerBirthYear = document.querySelector("#playerBirthYear");
  dom.playerHeight = document.querySelector("#playerHeight");
  dom.playerFoot = document.querySelector("#playerFoot");
  dom.playerRoleInPossession = document.querySelector("#playerRoleInPossession");
  dom.playerRoleOutOfPossession = document.querySelector("#playerRoleOutOfPossession");
  dom.playerProfileNote = document.querySelector("#playerProfileNote");
  dom.playerTrainingGoal = document.querySelector("#playerTrainingGoal");
  dom.playerPhoto = document.querySelector("#playerPhoto");
  dom.playerPhotoPreview = document.querySelector("#playerPhotoPreview");
  dom.playerFormTitle = document.querySelector("#playerFormTitle");
  dom.playerSubmitButton = document.querySelector("#playerSubmitButton");
  dom.cancelPlayerEdit = document.querySelector("#cancelPlayerEdit");
  dom.removePlayerPhoto = document.querySelector("#removePlayerPhoto");
  dom.rosterGrid = document.querySelector("#rosterGrid");
  dom.playerProfileModal = document.querySelector("#playerProfileModal");
  dom.playerProfileContent = document.querySelector("#playerProfileContent");
  dom.playerProfileTitle = document.querySelector("#playerProfileTitle");
  dom.closePlayerProfile = document.querySelector("#closePlayerProfile");
  dom.editProfilePlayer = document.querySelector("#editProfilePlayer");
  dom.downloadPlayerReport = document.querySelector("#downloadPlayerReport");
  dom.matchDetailModal = document.querySelector("#matchDetailModal");
  dom.matchDetailContent = document.querySelector("#matchDetailContent");
  dom.matchDetailTitle = document.querySelector("#matchDetailTitle");
  dom.closeMatchDetail = document.querySelector("#closeMatchDetail");
  dom.deleteConfirmModal = document.querySelector("#deleteConfirmModal");
  dom.deleteConfirmTitle = document.querySelector("#deleteConfirmTitle");
  dom.deleteConfirmMessage = document.querySelector("#deleteConfirmMessage");
  dom.confirmDeleteButton = document.querySelector("#confirmDeleteButton");
  dom.cancelDeleteButton = document.querySelector("#cancelDeleteButton");
  dom.closeDeleteConfirm = document.querySelector("#closeDeleteConfirm");
  dom.matchForm = document.querySelector("#matchForm");
  dom.matchDate = document.querySelector("#matchDate");
  dom.matchOpponent = document.querySelector("#matchOpponent");
  dom.matchVenue = document.querySelector("#matchVenue");
  dom.matchCompetition = document.querySelector("#matchCompetition");
  dom.matchGoalsFor = document.querySelector("#matchGoalsFor");
  dom.matchGoalsAgainst = document.querySelector("#matchGoalsAgainst");
  dom.matchNonPenaltyXg = document.querySelector("#matchNonPenaltyXg");
  dom.matchOpponentXg = document.querySelector("#matchOpponentXg");
  dom.matchShotsOnTarget = document.querySelector("#matchShotsOnTarget");
  dom.matchFoulsWon = document.querySelector("#matchFoulsWon");
  dom.matchFoulsCommitted = document.querySelector("#matchFoulsCommitted");
  dom.matchOpponentFinalThirdPasses = document.querySelector("#matchOpponentFinalThirdPasses");
  dom.matchPpda = document.querySelector("#matchPpda");
  dom.matchDuelQuote = document.querySelector("#matchDuelQuote");
  dom.matchVenueFilter = document.querySelector("#matchVenueFilter");
  dom.matchCompetitionFilter = document.querySelector("#matchCompetitionFilter");
  dom.matchList = document.querySelector("#matchList");
  dom.seasonModeButtons = document.querySelectorAll("[data-season-mode]");
  dom.seasonOverviewContent = document.querySelector("#seasonOverviewContent");
  dom.seasonDetailedContent = document.querySelector("#seasonDetailedContent");
  dom.seasonRadarGrid = document.querySelector("#seasonRadarGrid");
  dom.seasonMetricSelect = document.querySelector("#seasonMetricSelect");
  dom.seasonPeriodFilter = document.querySelector("#seasonPeriodFilter");
  dom.seasonVenueFilter = document.querySelector("#seasonVenueFilter");
  dom.seasonCompetitionFilter = document.querySelector("#seasonCompetitionFilter");
  dom.seasonDateFromFilter = document.querySelector("#seasonDateFromFilter");
  dom.seasonDateToFilter = document.querySelector("#seasonDateToFilter");
  dom.seasonSummaryMetrics = document.querySelector("#seasonSummaryMetrics");
  dom.seasonGoalMetrics = document.querySelector("#seasonGoalMetrics");
  dom.seasonGoalTypeChart = document.querySelector("#seasonGoalTypeChart");
  dom.seasonGoalTimingChart = document.querySelector("#seasonGoalTimingChart");
  dom.seasonGoalRankings = document.querySelector("#seasonGoalRankings");
  dom.seasonGoalTimeline = document.querySelector("#seasonGoalTimeline");
  dom.seasonFormTitle = document.querySelector("#seasonFormTitle");
  dom.seasonFormChart = document.querySelector("#seasonFormChart");
  dom.seasonLeaderboardTitle = document.querySelector("#seasonLeaderboardTitle");
  dom.seasonLeaderboard = document.querySelector("#seasonLeaderboard");
  dom.seasonTeamOverview = document.querySelector("#seasonTeamOverview");
  dom.seasonPlayerTable = document.querySelector("#seasonPlayerTable");
  dom.analystPlayerSelect = document.querySelector("#analystPlayerSelect");
  dom.analystVenueFilter = document.querySelector("#analystVenueFilter");
  dom.analystCompetitionFilter = document.querySelector("#analystCompetitionFilter");
  dom.analystMetrics = document.querySelector("#analystMetrics");
  dom.teamAnalystReport = document.querySelector("#teamAnalystReport");
  dom.playerAnalystTitle = document.querySelector("#playerAnalystTitle");
  dom.playerAnalystReport = document.querySelector("#playerAnalystReport");
  dom.analystRecommendations = document.querySelector("#analystRecommendations");
  dom.analystAssignments = document.querySelector("#analystAssignments");
  dom.calendarMonthTitle = document.querySelector("#calendarMonthTitle");
  dom.calendarPrevMonth = document.querySelector("#calendarPrevMonth");
  dom.calendarNextMonth = document.querySelector("#calendarNextMonth");
  dom.calendarTodayButton = document.querySelector("#calendarTodayButton");
  dom.calendarViewButtons = document.querySelectorAll("[data-calendar-view]");
  dom.calendarTimelineFilter = document.querySelector("#calendarTimelineFilter");
  dom.calendarOverviewList = document.querySelector("#calendarOverviewList");
  dom.calendarTimelineTitle = document.querySelector("#calendarTimelineTitle");
  dom.calendarListTitle = document.querySelector("#calendarListTitle");
  dom.calendarMonthPane = document.querySelector("#calendarMonthPane");
  dom.calendarListPane = document.querySelector("#calendarListPane");
  dom.calendarGrid = document.querySelector("#calendarGrid");
  dom.calendarList = document.querySelector("#calendarList");
  dom.calendarEventForm = document.querySelector("#calendarEventForm");
  dom.calendarCreateType = document.querySelector("#calendarCreateType");
  dom.calendarDate = document.querySelector("#calendarDate");
  dom.calendarStartTime = document.querySelector("#calendarStartTime");
  dom.calendarEndTime = document.querySelector("#calendarEndTime");
  dom.calendarMeetTime = document.querySelector("#calendarMeetTime");
  dom.calendarTitle = document.querySelector("#calendarTitle");
  dom.calendarLocation = document.querySelector("#calendarLocation");
  dom.calendarTrainingType = document.querySelector("#calendarTrainingType");
  dom.calendarTrainingPriority = document.querySelector("#calendarTrainingPriority");
  dom.calendarTrainingIntensity = document.querySelector("#calendarTrainingIntensity");
  dom.calendarTrainingRepeat = document.querySelector("#calendarTrainingRepeat");
  dom.calendarRepeatUntilWrap = document.querySelector("#calendarRepeatUntilWrap");
  dom.calendarRepeatUntil = document.querySelector("#calendarRepeatUntil");
  dom.calendarMatchOpponent = document.querySelector("#calendarMatchOpponent");
  dom.calendarMatchVenue = document.querySelector("#calendarMatchVenue");
  dom.calendarMatchCompetition = document.querySelector("#calendarMatchCompetition");
  dom.calendarEventType = document.querySelector("#calendarEventType");
  dom.calendarNote = document.querySelector("#calendarNote");
  dom.trainingForm = document.querySelector("#trainingForm");
  dom.trainingFormTitle = document.querySelector("#trainingFormTitle");
  dom.trainingDate = document.querySelector("#trainingDate");
  dom.trainingStartTime = document.querySelector("#trainingStartTime");
  dom.trainingEndTime = document.querySelector("#trainingEndTime");
  dom.trainingMeetTime = document.querySelector("#trainingMeetTime");
  dom.trainingLocation = document.querySelector("#trainingLocation");
  dom.trainingType = document.querySelector("#trainingType");
  dom.trainingPriority = document.querySelector("#trainingPriority");
  dom.trainingIntensity = document.querySelector("#trainingIntensity");
  dom.trainingTopic = document.querySelector("#trainingTopic");
  dom.trainingCoachNote = document.querySelector("#trainingCoachNote");
  dom.trainingSubmitButton = document.querySelector("#trainingSubmitButton");
  dom.cancelTrainingEdit = document.querySelector("#cancelTrainingEdit");
  dom.trainingTypeFilter = document.querySelector("#trainingTypeFilter");
  dom.trainingPriorityFilter = document.querySelector("#trainingPriorityFilter");
  dom.trainingIntensityFilter = document.querySelector("#trainingIntensityFilter");
  dom.trainingStatsTypeFilter = document.querySelector("#trainingStatsTypeFilter");
  dom.trainingStatsPriorityFilter = document.querySelector("#trainingStatsPriorityFilter");
  dom.trainingStatsIntensityFilter = document.querySelector("#trainingStatsIntensityFilter");
  dom.trainingPlayerGoals = document.querySelector("#trainingPlayerGoals");
  dom.trainingList = document.querySelector("#trainingList");
  dom.trainingStatsMetrics = document.querySelector("#trainingStatsMetrics");
  dom.trainingAttendanceChart = document.querySelector("#trainingAttendanceChart");
  dom.trainingAbsenceReasons = document.querySelector("#trainingAbsenceReasons");
  dom.trainingStatsTable = document.querySelector("#trainingStatsTable");
  dom.rankingTabButtons = document.querySelectorAll("[data-ranking-tab]");
  dom.rankingBasisToggle = document.querySelector("#rankingBasisToggle");
  dom.rankingBasisPanel = document.querySelector("#rankingBasisPanel");
  dom.rankingSummaryMetrics = document.querySelector("#rankingSummaryMetrics");
  dom.rankingTableTitle = document.querySelector("#rankingTableTitle");
  dom.rankingTable = document.querySelector("#rankingTable");
  dom.injuryForm = document.querySelector("#injuryForm");
  dom.injuryFormTitle = document.querySelector("#injuryFormTitle");
  dom.injuryPlayer = document.querySelector("#injuryPlayer");
  dom.injuryType = document.querySelector("#injuryType");
  dom.injuryBodyArea = document.querySelector("#injuryBodyArea");
  dom.injurySeverity = document.querySelector("#injurySeverity");
  dom.injuryStatus = document.querySelector("#injuryStatus");
  dom.injuryStartDate = document.querySelector("#injuryStartDate");
  dom.injuryEndDate = document.querySelector("#injuryEndDate");
  dom.injuryDiagnosis = document.querySelector("#injuryDiagnosis");
  dom.injuryDoctorAssessment = document.querySelector("#injuryDoctorAssessment");
  dom.injuryPhysioAssessment = document.querySelector("#injuryPhysioAssessment");
  dom.injuryRehabPlan = document.querySelector("#injuryRehabPlan");
  dom.injuryTrainingLoad = document.querySelector("#injuryTrainingLoad");
  dom.injuryReturnGuidance = document.querySelector("#injuryReturnGuidance");
  dom.injuryNote = document.querySelector("#injuryNote");
  dom.injurySubmitButton = document.querySelector("#injurySubmitButton");
  dom.cancelInjuryEdit = document.querySelector("#cancelInjuryEdit");
  dom.injuryPlayerFilter = document.querySelector("#injuryPlayerFilter");
  dom.injuryStatusFilter = document.querySelector("#injuryStatusFilter");
  dom.injurySummaryMetrics = document.querySelector("#injurySummaryMetrics");
  dom.injuryList = document.querySelector("#injuryList");
  dom.availabilityForm = document.querySelector("#availabilityForm");
  dom.availabilityFormTitle = document.querySelector("#availabilityFormTitle");
  dom.availabilityPlayer = document.querySelector("#availabilityPlayer");
  dom.availabilityStatus = document.querySelector("#availabilityStatus");
  dom.availabilityReason = document.querySelector("#availabilityReason");
  dom.availabilityStartDate = document.querySelector("#availabilityStartDate");
  dom.availabilityEndDate = document.querySelector("#availabilityEndDate");
  dom.availabilityWeekday = document.querySelector("#availabilityWeekday");
  dom.availabilityNote = document.querySelector("#availabilityNote");
  dom.availabilitySubmitButton = document.querySelector("#availabilitySubmitButton");
  dom.cancelAvailabilityEdit = document.querySelector("#cancelAvailabilityEdit");
  dom.availabilityPlayerFilter = document.querySelector("#availabilityPlayerFilter");
  dom.availabilityStatusFilter = document.querySelector("#availabilityStatusFilter");
  dom.availabilitySummaryMetrics = document.querySelector("#availabilitySummaryMetrics");
  dom.availabilityPlayerList = document.querySelector("#availabilityPlayerList");
  dom.trainingDetailModal = document.querySelector("#trainingDetailModal");
  dom.trainingDetailContent = document.querySelector("#trainingDetailContent");
  dom.trainingDetailTitle = document.querySelector("#trainingDetailTitle");
  dom.closeTrainingDetail = document.querySelector("#closeTrainingDetail");
}

function bindEvents() {
  dom.navItems.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  dom.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.jump));
  });

  dom.teamMetricSelect.addEventListener("change", () => {
    state.teamMetric = dom.teamMetricSelect.value;
    persist();
    renderDashboard();
  });

  dom.comparisonMetric.addEventListener("change", () => {
    state.selectedMetric = dom.comparisonMetric.value;
    persist();
    renderCompare();
  });

  dom.statMatch.addEventListener("change", () => {
    renderStatPlayerOptions();
    syncStatForm();
    renderAnalysis();
  });

  dom.statPlayer.addEventListener("change", syncStatForm);
  dom.playerPosition.addEventListener("change", () => {
    renderPlayerPositionControls(dom.playerPosition.value, selectedSecondaryPositionsFromForm());
  });
  dom.playerPositionFilter.addEventListener("change", () => {
    state.playerPositionFilter = dom.playerPositionFilter.value;
    persist();
    renderPlayers();
  });
  dom.playerSearchFilter.addEventListener("input", () => {
    state.playerSearchFilter = dom.playerSearchFilter.value;
    persist();
    renderPlayers();
  });
  dom.playerFootFilter.addEventListener("change", () => {
    state.playerFootFilter = dom.playerFootFilter.value;
    persist();
    renderPlayers();
  });
  dom.playerStatsFilter.addEventListener("change", () => {
    state.playerStatsFilter = dom.playerStatsFilter.value;
    persist();
    renderPlayers();
  });
  dom.playerSortSelect.addEventListener("change", () => {
    state.playerSort = dom.playerSortSelect.value;
    persist();
    renderPlayers();
  });
  dom.playerViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.playerRosterView = button.dataset.playerView;
      persist();
      renderPlayers();
    });
  });

  document.addEventListener("dblclick", (event) => {
    const nameTarget = event.target.closest("[data-profile-player]");
    if (!nameTarget) return;
    event.preventDefault();
    event.stopPropagation();
    openPlayerProfile(nameTarget.dataset.profilePlayer);
  });

  bindFilterSelect(dom.analysisVenueFilter, "analysisFilters", "venue", () => {
    renderControls();
    renderAnalysis();
  });
  bindFilterSelect(dom.analysisCompetitionFilter, "analysisFilters", "competition", () => {
    renderControls();
    renderAnalysis();
  });
  bindFilterSelect(dom.matchVenueFilter, "matchFilters", "venue", renderMatches);
  bindFilterSelect(dom.matchCompetitionFilter, "matchFilters", "competition", renderMatches);
  bindFilterSelect(dom.seasonPeriodFilter, "seasonFilters", "period", renderSeason);
  bindFilterSelect(dom.seasonVenueFilter, "seasonFilters", "venue", renderSeason);
  bindFilterSelect(dom.seasonCompetitionFilter, "seasonFilters", "competition", renderSeason);
  bindFilterSelect(dom.seasonDateFromFilter, "seasonFilters", "dateFrom", renderSeason);
  bindFilterSelect(dom.seasonDateToFilter, "seasonFilters", "dateTo", renderSeason);
  bindFilterSelect(dom.analystVenueFilter, "analystFilters", "venue", renderAnalyst);
  bindFilterSelect(dom.analystCompetitionFilter, "analystFilters", "competition", renderAnalyst);
  bindTrainingFilterSelect(dom.trainingTypeFilter, "type", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  bindTrainingFilterSelect(dom.trainingPriorityFilter, "priority", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  bindTrainingFilterSelect(dom.trainingIntensityFilter, "intensity", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  bindTrainingFilterSelect(dom.trainingStatsTypeFilter, "type", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  bindTrainingFilterSelect(dom.trainingStatsPriorityFilter, "priority", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  bindTrainingFilterSelect(dom.trainingStatsIntensityFilter, "intensity", () => {
    renderTraining();
    renderTrainingStats();
    renderAnalyst();
  });
  dom.rankingTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeRankingTab = rankingTabs.includes(button.dataset.rankingTab) ? button.dataset.rankingTab : "overall";
      persist();
      renderRanking();
    });
  });
  dom.rankingBasisToggle.addEventListener("click", () => {
    state.rankingBasisVisible = !state.rankingBasisVisible;
    persist();
    renderRanking();
  });
  dom.injuryForm.addEventListener("submit", handleInjurySubmit);
  dom.cancelInjuryEdit.addEventListener("click", clearInjuryForm);
  dom.injuryPlayerFilter.addEventListener("change", () => {
    state.injuryFilters = { ...(state.injuryFilters || defaultInjuryFilters), player: dom.injuryPlayerFilter.value };
    persist();
    renderInjuries();
  });
  dom.injuryStatusFilter.addEventListener("change", () => {
    state.injuryFilters = { ...(state.injuryFilters || defaultInjuryFilters), status: dom.injuryStatusFilter.value };
    persist();
    renderInjuries();
  });
  dom.availabilityForm.addEventListener("submit", handleAvailabilitySubmit);
  dom.cancelAvailabilityEdit.addEventListener("click", clearAvailabilityForm);
  dom.availabilityPlayerFilter.addEventListener("change", () => {
    state.availabilityFilters = { ...(state.availabilityFilters || defaultAvailabilityFilters), player: dom.availabilityPlayerFilter.value };
    persist();
    renderAvailability();
  });
  dom.availabilityStatusFilter.addEventListener("change", () => {
    state.availabilityFilters = { ...(state.availabilityFilters || defaultAvailabilityFilters), status: dom.availabilityStatusFilter.value };
    persist();
    renderAvailability();
  });
  dom.seasonModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.seasonMode = button.dataset.seasonMode;
      persist();
      renderSeason();
    });
  });
  dom.seasonMetricSelect.addEventListener("change", () => {
    state.activeSeasonMetric = dom.seasonMetricSelect.value;
    persist();
    renderSeason();
  });
  dom.analystPlayerSelect.addEventListener("change", () => {
    state.analystPlayer = dom.analystPlayerSelect.value;
    persist();
    renderAnalyst();
  });
  dom.calendarPrevMonth.addEventListener("click", () => shiftCalendarMonth(-1));
  dom.calendarNextMonth.addEventListener("click", () => shiftCalendarMonth(1));
  dom.calendarTodayButton.addEventListener("click", () => {
    const today = isoDate(new Date());
    state.calendarMonth = calendarMonthFromDate(today);
    state.calendarSelectedDate = today;
    persist();
    renderCalendar();
  });
  dom.calendarViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.calendarViewMode = button.dataset.calendarView;
      persist();
      renderCalendar();
    });
  });
  dom.calendarTimelineFilter.addEventListener("change", () => {
    state.calendarTimelineFilter = calendarTimelineFilters.includes(dom.calendarTimelineFilter.value) ? dom.calendarTimelineFilter.value : "upcoming";
    persist();
    renderCalendar();
  });
  dom.calendarCreateType.addEventListener("change", renderCalendarEventTypeFields);
  dom.calendarTrainingRepeat.addEventListener("change", renderCalendarEventTypeFields);
  dom.calendarEventForm.addEventListener("submit", handleCalendarSubmit);

  dom.statLabelButtons.forEach((button) => {
    button.addEventListener("click", () => setLeaderboard(button.dataset.leaderboard));
  });

  dom.statForm.addEventListener("submit", handleStatSubmit);
  dom.clearStatButton.addEventListener("click", clearStatInputs);
  dom.playerForm.addEventListener("submit", handlePlayerSubmit);
  dom.trainingForm.addEventListener("submit", handleTrainingSubmit);
  dom.cancelTrainingEdit.addEventListener("click", clearTrainingForm);
  dom.playerPhoto.addEventListener("change", handlePlayerPhotoChange);
  dom.cancelPlayerEdit.addEventListener("click", clearPlayerForm);
  dom.removePlayerPhoto.addEventListener("click", () => {
    pendingPlayerPhoto = "";
    dom.playerPhoto.value = "";
    renderPlayerPhotoPreview();
    renderPlayerFormMode();
  });
  dom.closePlayerProfile.addEventListener("click", closePlayerProfile);
  dom.editProfilePlayer.addEventListener("click", editActiveProfilePlayer);
  dom.downloadPlayerReport.addEventListener("click", downloadPlayerReport);
  dom.playerProfileModal.addEventListener("click", (event) => {
    if (event.target === dom.playerProfileModal) closePlayerProfile();
  });
  dom.closeMatchDetail.addEventListener("click", closeMatchDetail);
  dom.matchDetailModal.addEventListener("click", (event) => {
    if (event.target === dom.matchDetailModal) closeMatchDetail();
  });
  dom.closeTrainingDetail.addEventListener("click", closeTrainingDetail);
  dom.trainingDetailModal.addEventListener("click", (event) => {
    if (event.target === dom.trainingDetailModal) closeTrainingDetail();
  });
  dom.cancelDeleteButton.addEventListener("click", closeDeleteConfirmation);
  dom.closeDeleteConfirm.addEventListener("click", closeDeleteConfirmation);
  dom.confirmDeleteButton.addEventListener("click", confirmPendingDelete);
  dom.deleteConfirmModal.addEventListener("click", (event) => {
    if (event.target === dom.deleteConfirmModal) closeDeleteConfirmation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (dom.deleteConfirmModal.classList.contains("is-visible")) {
      closeDeleteConfirmation();
    } else if (dom.trainingDetailModal.classList.contains("is-visible")) {
      closeTrainingDetail();
    } else if (dom.matchDetailModal.classList.contains("is-visible")) {
      closeMatchDetail();
    } else if (dom.playerProfileModal.classList.contains("is-visible")) {
      closePlayerProfile();
    }
  });
  dom.matchForm.addEventListener("submit", handleMatchSubmit);
  dom.resetDemoButton.addEventListener("click", () => {
    state = normalizeState(structuredClone(seedState));
    clearPlayerForm();
    clearTrainingForm();
    clearInjuryForm();
    clearAvailabilityForm();
    persist();
    renderAll();
  });
}

function bindFilterSelect(select, filterKey, field, callback) {
  select.addEventListener("change", () => {
    state[filterKey] = { ...(state[filterKey] || defaultFilters), [field]: select.value };
    persist();
    callback();
  });
}

function bindTrainingFilterSelect(select, field, callback) {
  select.addEventListener("change", () => {
    state.trainingFilters = { ...(state.trainingFilters || defaultTrainingFilters), [field]: select.value };
    persist();
    callback();
  });
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return normalizeState(structuredClone(seedState));

  try {
    return normalizeState({ ...structuredClone(seedState), ...JSON.parse(saved) });
  } catch {
    return normalizeState(structuredClone(seedState));
  }
}

function normalizeState(nextState) {
  const seededPlayers = new Map(seedState.players.map((player) => [player.id, player]));
  const seededStats = new Map(seedState.stats.map((stat) => [stat.id, stat]));
  const seededMatches = new Map(seedState.matches.map((match) => [match.id, match]));
  const seededTrainings = new Map((seedState.trainings || []).map((training) => [training.id, training]));
  const seededInjuries = new Map((seedState.injuries || []).map((injury) => [injury.id, injury]));
  const seededAvailabilityBlocks = new Map((seedState.availabilityBlocks || []).map((block) => [block.id, block]));
  const seededCalendarEvents = new Map((seedState.calendarEvents || []).map((event) => [event.id, event]));
  nextState.players = (nextState.players || []).map((player) => ({
    ...normalizePlayer({
      birthYear: "",
      height: "",
      foot: "Rechts",
      role: "",
      profileNote: "",
      trainingGoal: "",
      photo: "",
      ...(seededPlayers.get(player.id) || {}),
      ...player,
    }),
  }));
  const playerIds = new Set(nextState.players.map((player) => player.id));
  nextState.availabilityBlocks = (nextState.availabilityBlocks || [])
    .map((block) => normalizeAvailabilityBlock({ ...(seededAvailabilityBlocks.get(block.id) || {}), ...block }))
    .filter((block) => playerIds.has(block.playerId) && block.startDate);
  nextState.injuries = (nextState.injuries || [])
    .map((injury) => normalizeInjury({ ...(seededInjuries.get(injury.id) || {}), ...injury }))
    .filter((injury) => playerIds.has(injury.playerId) && injury.startDate);
  nextState.stats = (nextState.stats || []).map((stat) => normalizeStat(stat, seededStats.get(stat.id)));
  nextState.matches = (nextState.matches || []).map((match) => normalizeMatch(match, seededMatches.get(match.id), nextState.players, nextState.stats, nextState.injuries, nextState.availabilityBlocks));
  nextState.trainings = (nextState.trainings || []).map((training) => normalizeTraining(training, seededTrainings.get(training.id), nextState.players, nextState.injuries, nextState.availabilityBlocks));
  nextState.calendarEvents = (nextState.calendarEvents || []).map((event) => normalizeCalendarEvent({ ...(seededCalendarEvents.get(event.id) || {}), ...event })).filter(Boolean);
  nextState.comparisonPlayers = nextState.comparisonPlayers || [];
  nextState.activeLeaderboard = nextState.activeLeaderboard || "passAccuracy";
  nextState.activeSeasonMetric = nextState.activeSeasonMetric || "index";
  nextState.seasonMode = nextState.seasonMode === "details" ? "details" : "overview";
  nextState.playerPositionFilter = nextState.playerPositionFilter === "all" || playerPositions.includes(nextState.playerPositionFilter) ? nextState.playerPositionFilter : "all";
  nextState.playerSearchFilter = String(nextState.playerSearchFilter || "");
  nextState.playerFootFilter = ["all", "Rechts", "Links", "Beidfüßig", "open"].includes(nextState.playerFootFilter) ? nextState.playerFootFilter : "all";
  nextState.playerStatsFilter = ["all", "withStats", "withoutStats", "topIndex"].includes(nextState.playerStatsFilter) ? nextState.playerStatsFilter : "all";
  nextState.playerSort = ["number", "name", "index", "games", "passAccuracy"].includes(nextState.playerSort) ? nextState.playerSort : "number";
  nextState.playerRosterView = nextState.playerRosterView === "list" ? "list" : "cards";
  nextState.analysisFilters = normalizeFilters(nextState.analysisFilters);
  nextState.matchFilters = normalizeFilters(nextState.matchFilters);
  nextState.seasonFilters = normalizeFilters(nextState.seasonFilters);
  nextState.trainingFilters = normalizeTrainingFilters(nextState.trainingFilters);
  nextState.injuryFilters = normalizeInjuryFilters(nextState.injuryFilters, nextState.players);
  nextState.availabilityFilters = normalizeAvailabilityFilters(nextState.availabilityFilters, nextState.players);
  nextState.calendarMonth = normalizeCalendarMonth(nextState.calendarMonth) || calendarMonthFromDate(calendarItems(nextState)[0]?.date || isoDate(new Date()));
  nextState.calendarViewMode = nextState.calendarViewMode === "list" ? "list" : "month";
  nextState.calendarTimelineFilter = calendarTimelineFilters.includes(nextState.calendarTimelineFilter) ? nextState.calendarTimelineFilter : "upcoming";
  nextState.calendarSelectedDate = normalizeIsoDate(nextState.calendarSelectedDate) || `${nextState.calendarMonth}-01`;
  nextState.activeRankingTab = rankingTabs.includes(nextState.activeRankingTab) ? nextState.activeRankingTab : "overall";
  nextState.rankingBasisVisible = Boolean(nextState.rankingBasisVisible);
  nextState.analystFilters = normalizeFilters(nextState.analystFilters);
  nextState.analystPlayer = nextState.analystPlayer === "team"
    ? "team"
    : nextState.players.some((player) => player.id === nextState.analystPlayer)
    ? nextState.analystPlayer
    : nextState.players[0]?.id || "";
  return nextState;
}

function normalizePlayer(player) {
  const primaryPosition = normalizePlayerPosition(player.primaryPosition || player.position);
  const secondaryPositions = Array.isArray(player.secondaryPositions)
    ? player.secondaryPositions.map(normalizePlayerPosition).filter((position) => position !== primaryPosition)
    : [];
  const uniqueSecondary = [...new Set(secondaryPositions)];
  const roleInPossession = normalizePossessionRole(primaryPosition, player.roleInPossession || player.role);
  const roleOutOfPossession = normalizeOutOfPossessionRole(primaryPosition, player.roleOutOfPossession);

  return {
    ...player,
    position: primaryPosition,
    primaryPosition,
    secondaryPositions: uniqueSecondary,
    role: roleInPossession,
    roleInPossession,
    roleOutOfPossession,
    trainingGoal: String(player.trainingGoal || "").trim(),
  };
}

function normalizeInjury(injury = {}) {
  const startDate = normalizeIsoDate(injury.startDate);
  let endDate = normalizeIsoDate(injury.endDate);
  if (startDate && endDate && endDate < startDate) endDate = startDate;
  const type = injuryTypes.includes(injury.type) ? injury.type : injuryTypes[0];
  const bodyArea = injuryBodyAreas.includes(injury.bodyArea) ? injury.bodyArea : injuryBodyAreas[0];
  const severity = injurySeverities.includes(injury.severity) ? injury.severity : "Mittel";
  const status = injuryStatuses.includes(injury.status) ? injury.status : "Aktiv";
  const trainingLoad = injuryTrainingLoads.includes(injury.trainingLoad)
    ? injury.trainingLoad
    : suggestedTrainingLoad({ ...injury, severity, status });
  return {
    id: String(injury.id || `inj${Date.now()}`),
    playerId: String(injury.playerId || ""),
    type,
    bodyArea,
    severity,
    status,
    startDate,
    endDate,
    diagnosis: String(injury.diagnosis || "").trim(),
    doctorAssessment: String(injury.doctorAssessment || "").trim(),
    physioAssessment: String(injury.physioAssessment || "").trim(),
    rehabPlan: String(injury.rehabPlan || "").trim(),
    trainingLoad,
    returnGuidance: String(injury.returnGuidance || "").trim(),
    note: String(injury.note || "").trim(),
  };
}

function normalizeAvailabilityBlock(block = {}) {
  const startDate = normalizeIsoDate(block.startDate);
  let endDate = normalizeIsoDate(block.endDate);
  if (startDate && endDate && endDate < startDate) endDate = startDate;
  const status = globalAvailabilityStatuses.includes(block.status) ? block.status : "Absage";
  const reason = absenceReasons.includes(block.reason) ? block.reason : status === "Verletzt" ? "Verletzt" : String(block.reason || "Sonstiges").trim();
  const weekday = availabilityWeekdays.some((item) => item.id === String(block.weekday || "all")) ? String(block.weekday || "all") : "all";
  return {
    id: String(block.id || `ab${Date.now()}`),
    playerId: String(block.playerId || ""),
    status,
    reason,
    startDate,
    endDate,
    weekday,
    note: String(block.note || "").trim(),
  };
}

function normalizePlayerPosition(value) {
  const text = String(value || "").trim();
  if (playerPositions.includes(text)) return text;
  if (/tor/i.test(text)) return "Torhüter";
  if (/außen|aussen|flügelverteidiger|fluegelverteidiger/i.test(text) && /verteid/i.test(text)) return "Außenverteidiger";
  if (/abwehr|innenverteid/i.test(text)) return "Innenverteidiger";
  if (/defensiv.*mittel|sechser/i.test(text)) return "Defensives Mittelfeld";
  if (/offensiv.*mittel|zehner/i.test(text)) return "Offensives Mittelfeld";
  if (/flügel|fluegel|außenstürmer|aussenstürmer|außenspieler|aussenspieler/i.test(text)) return "Außenspieler";
  if (/sturm|stürmer/i.test(text)) return "Stürmer";
  if (/mittel/i.test(text)) return "Zentrales Mittelfeld";
  return "Zentrales Mittelfeld";
}

function normalizePossessionRole(position, role) {
  return normalizeRoleFor(position, role, possessionRoles);
}

function normalizeOutOfPossessionRole(position, role) {
  return normalizeRoleFor(position, role, outOfPossessionRoles);
}

function normalizeRoleFor(position, role, roleMap) {
  const options = roleMap[position] || [];
  if (!options.length) return "";
  const text = String(role || "").trim();
  if (options.includes(text)) return text;
  const relaxed = text.toLowerCase();
  const match = options.find((option) => option.toLowerCase().includes(relaxed) || relaxed.includes(option.toLowerCase().split("–").pop().trim()));
  return match || options[0];
}

function normalizeMatch(match, seededMatch = {}, players = [], stats = state.stats, injuries = state.injuries || [], availabilityBlocks = state.availabilityBlocks || []) {
  const merged = {
    ...seededMatch,
    ...match,
    venue: seededMatch.venue || (venueTypes.includes(match.venue) ? match.venue : "Heim"),
    competition: normalizeCompetition(seededMatch.competition || match.competition),
    formation: match.formation || seededMatch.formation || "4-3-3",
  };

  ["nonPenaltyXg", "opponentXg", "shotsOnTarget", "foulsWon", "foulsCommitted", "opponentFinalThirdPasses", "ppda", "duelQuote"].forEach((field) => {
    if (merged[field] === "" || merged[field] === undefined || merged[field] === null) return;
    merged[field] = Number(merged[field] || 0);
  });

  merged.availability = normalizeMatchAvailability(merged, players, stats, injuries, availabilityBlocks);
  merged.lineup = normalizeLineup(merged, players, stats);
  merged.events = normalizeMatchEvents(merged, stats, players).filter((event) => matchEventAllowed(merged, event));
  if (Array.isArray(match.events) && merged.events.some((event) => event.kind === "goal")) {
    Object.assign(merged, scoreFromGoalEvents(merged.events));
  }

  return merged;
}

function normalizeMatchAvailability(match, players = state.players, stats = state.stats, injuries = state.injuries || [], availabilityBlocks = state.availabilityBlocks || []) {
  const existing = new Map((match.availability || []).map((item) => [item.playerId, item]));
  const statMap = new Map(stats.filter((stat) => stat.matchId === match.id).map((stat) => [stat.playerId, stat]));
  const lineupMap = new Map((match.lineup || []).map((item) => [item.playerId, item]));
  return players
    .slice()
    .sort(sortByNumber)
    .map((player) => {
      const current = existing.get(player.id) || {};
      const globalAvailability = globalAvailabilityForPlayerOnDate(player.id, match.date, injuries, availabilityBlocks);
      const isGlobalSource = /^(injury|availability):/.test(String(current.source || ""));
      const status = globalAvailability
        ? globalAvailability.status
        : availabilityStatuses.includes(current.status) && !isGlobalSource
        ? current.status
        : defaultMatchAvailabilityStatus(statMap.get(player.id), lineupMap.get(player.id));
      const reason = absenceReasons.includes(current.reason) ? current.reason : String(current.reason || "");
      return {
        playerId: player.id,
        status,
        reason: globalAvailability ? globalAvailability.reason : isUnavailableStatus(status) ? reason || defaultAbsenceReason(status) : "",
        note: globalAvailability ? globalAvailability.note : isGlobalSource ? "" : String(current.note || "").trim(),
        source: globalAvailability ? globalAvailability.source : "",
      };
    });
}

function defaultMatchAvailabilityStatus(stat, lineup) {
  if (stat) return "Zusage";
  if (lineup && ["Startelf", "Bank", "Kader"].includes(lineup.status)) return "Zusage";
  return "Offen";
}

function defaultAbsenceReason(status) {
  if (status === "Verletzt") return "Verletzt";
  if (status === "Unentschuldigt") return "Unentschuldigt";
  return "Sonstiges";
}

function normalizeTraining(training, seededTraining = {}, players = state.players, injuries = state.injuries || [], availabilityBlocks = state.availabilityBlocks || []) {
  const merged = {
    ...seededTraining,
    ...training,
    date: training.date || seededTraining.date || "",
    startTime: training.startTime || seededTraining.startTime || "18:30",
    endTime: training.endTime || seededTraining.endTime || "20:00",
    meetTime: training.meetTime || seededTraining.meetTime || "",
    location: String(training.location || seededTraining.location || "Trainingsplatz").trim(),
    type: trainingTypes.includes(training.type) ? training.type : trainingTypes.includes(seededTraining.type) ? seededTraining.type : trainingTypes[0],
    priority: trainingPriorities.includes(training.priority) ? training.priority : trainingPriorities.includes(seededTraining.priority) ? seededTraining.priority : "Normal",
    intensity: trainingIntensities.includes(training.intensity) ? training.intensity : trainingIntensities.includes(seededTraining.intensity) ? seededTraining.intensity : "Mittel",
    topic: String(training.topic || seededTraining.topic || "").trim(),
    coachNote: String(training.coachNote || seededTraining.coachNote || "").trim(),
    plan: normalizeTrainingPlan(training.plan || seededTraining.plan || {}),
  };

  merged.availability = normalizeTrainingAvailability(merged, players, injuries, availabilityBlocks);
  merged.ratings = normalizeTrainingRatings(merged, players);
  merged.groups = normalizeTrainingGroups(merged, players);
  return merged;
}

function normalizeTrainingPlan(plan = {}) {
  return {
    warmup: String(plan.warmup || "").trim(),
    main: String(plan.main || "").trim(),
    game: String(plan.game || "").trim(),
    coachingPoints: String(plan.coachingPoints || "").trim(),
  };
}

function normalizeTrainingAvailability(training, players = state.players, injuries = state.injuries || [], availabilityBlocks = state.availabilityBlocks || []) {
  const existing = new Map((training.availability || []).map((item) => [item.playerId, item]));
  return players
    .slice()
    .sort(sortByNumber)
    .map((player) => {
      const current = existing.get(player.id) || {};
      const globalAvailability = globalAvailabilityForPlayerOnDate(player.id, training.date, injuries, availabilityBlocks);
      const isGlobalSource = /^(injury|availability):/.test(String(current.source || ""));
      const status = globalAvailability ? globalAvailability.status : availabilityStatuses.includes(current.status) && !isGlobalSource ? current.status : "Offen";
      const reason = absenceReasons.includes(current.reason) ? current.reason : String(current.reason || "");
      return {
        playerId: player.id,
        status,
        reason: globalAvailability ? globalAvailability.reason : isUnavailableStatus(status) ? reason || defaultAbsenceReason(status) : "",
        note: globalAvailability ? globalAvailability.note : isGlobalSource ? "" : String(current.note || "").trim(),
        source: globalAvailability ? globalAvailability.source : "",
      };
    });
}

function normalizeTrainingRatings(training, players = state.players) {
  const playerIds = new Set(players.map((player) => player.id));
  return (training.ratings || [])
    .filter((rating) => playerIds.has(rating.playerId))
    .map((rating) => ({
      playerId: rating.playerId,
      rating: clampNumber(Number(rating.rating || 0), 0, 10),
      effort: clampNumber(Number(rating.effort || 0), 0, 10),
      focus: clampNumber(Number(rating.focus || 0), 0, 10),
      intensityLoad: trainingIntensities.includes(rating.intensityLoad) ? rating.intensityLoad : training.intensity || "Mittel",
      note: String(rating.note || "").trim(),
    }));
}

function normalizeTrainingGroups(training, players = state.players) {
  const availableIds = new Set(trainingAvailablePlayerIds(training));
  const used = new Set();
  const groups = (training.groups || []).map((group, index) => {
    const playerIds = [...new Set(group.playerIds || [])].filter((id) => availableIds.has(id) && !used.has(id));
    playerIds.forEach((id) => used.add(id));
    return {
      id: group.id || `${training.id}-group-${index + 1}`,
      name: String(group.name || `Gruppe ${index + 1}`).trim(),
      playerIds,
    };
  });
  return groups.length ? groups : [{ id: `${training.id || Date.now()}-group-1`, name: "Gruppe 1", playerIds: [] }];
}

function normalizeMatchEvents(match, stats = state.stats, players = state.players) {
  if (!Array.isArray(match.events)) return seedMatchEvents(match, stats, players);
  return match.events
    .map((event, index) => normalizeMatchEvent(event, match, index))
    .filter(Boolean);
}

function normalizeMatchEvent(event, match, index = 0) {
  const kind = event.kind === "card" ? "card" : "goal";
  const minute = clampNumber(Number(event.minute || 0), 0, 130);
  if (kind === "card") {
    return {
      id: event.id || `${match.id}-card-${Date.now()}-${index}`,
      kind,
      minute,
      team: event.team === "opponent" ? "opponent" : "own",
      cardType: cardTypes.includes(event.cardType) ? event.cardType : "Gelb",
      playerId: event.playerId || "",
      playerName: String(event.playerName || "").trim(),
      note: String(event.note || "").trim(),
    };
  }

  const goalTypes = Array.isArray(event.goalTypes) ? event.goalTypes.filter((type) => goalTypeOptions.some((option) => option.id === type)) : [];
  return {
    id: event.id || `${match.id}-goal-${Date.now()}-${index}`,
    kind,
    minute,
    team: event.team === "opponent" ? "opponent" : "own",
    playerId: event.playerId || "",
    playerName: String(event.playerName || "").trim(),
    assistPlayerId: event.assistPlayerId || "",
    assistName: String(event.assistName || "").trim(),
    goalTypes,
    note: String(event.note || "").trim(),
  };
}

function seedMatchEvents(match, stats = state.stats, players = state.players) {
  const matchStats = stats.filter((stat) => stat.matchId === match.id);
  const ownGoals = [];
  matchStats.forEach((stat) => {
    const goalCount = Number(stat.goals || 0);
    for (let index = 0; index < goalCount; index += 1) ownGoals.push({ stat, index });
  });

  const assists = [];
  matchStats.forEach((stat) => {
    const assistCount = Number(stat.assists || 0);
    for (let index = 0; index < assistCount; index += 1) assists.push(stat);
  });

  const events = ownGoals.map(({ stat }, index) => {
    const player = players.find((item) => item.id === stat.playerId);
    const assistStat = assists[index] && assists[index].playerId !== stat.playerId ? assists[index] : assists.find((item) => item.playerId !== stat.playerId);
    return {
      id: `${match.id}-goal-own-${index}`,
      kind: "goal",
      minute: clampNumber(18 + index * 24, 1, 90),
      team: "own",
      playerId: stat.playerId,
      playerName: "",
      assistPlayerId: assistStat?.playerId || "",
      assistName: "",
      goalTypes: seedGoalTypes(player, index, false),
      note: "",
    };
  });

  const conceded = Number(match.goalsAgainst || 0);
  for (let index = 0; index < conceded; index += 1) {
    events.push({
      id: `${match.id}-goal-opponent-${index}`,
      kind: "goal",
      minute: clampNumber(30 + index * 19, 1, 90),
      team: "opponent",
      playerId: "",
      playerName: `Gegner ${index + 1}`,
      assistPlayerId: "",
      assistName: "",
      goalTypes: seedGoalTypes(null, index, true),
      note: "",
    });
  }

  const cardCandidate = matchStats.slice().sort((a, b) => Number(b.ballLosses || 0) - Number(a.ballLosses || 0))[0];
  if (cardCandidate && Number(match.foulsCommitted || 0) >= 12) {
    events.push({
      id: `${match.id}-card-own-0`,
      kind: "card",
      minute: 64,
      team: "own",
      cardType: "Gelb",
      playerId: cardCandidate.playerId,
      playerName: "",
      note: "Taktisches Foul",
    });
  }

  return events;
}

function seedGoalTypes(player, index, opponent = false) {
  if (opponent && index % 2 === 0) return ["cross-left", "header", "inside-box"];
  if (opponent) return ["counter", "right-foot", "inside-box"];
  if (formationLineForPosition(player?.position) === "Angriff" || player?.position === "Stürmer") return ["through-ball", "right-foot", "inside-box"];
  if (player?.position === "Außenspieler") return ["solo", player.foot === "Links" ? "left-foot" : "right-foot", "inside-box"];
  if (formationLineForPosition(player?.position) === "Abwehr") return ["corner", "header", "inside-box"];
  return index % 2 === 0 ? ["combination", "right-foot", "inside-box"] : ["rebound", "left-foot", "inside-box"];
}

function normalizeLineup(match, players = state.players, stats = state.stats) {
  const existing = new Map((match.lineup || []).map((item) => [item.playerId, item]));
  const statMap = new Map(stats.filter((stat) => stat.matchId === match.id).map((stat) => [stat.playerId, stat]));
  const unavailable = unavailablePlayerIdsForMatch(match);

  return players
    .slice()
    .sort(sortByNumber)
    .filter((player) => !unavailable.has(player.id))
    .map((player) => {
      const current = existing.get(player.id) || {};
      const stat = statMap.get(player.id);
      return {
        playerId: player.id,
        status: normalizeLineupStatus(current.status || defaultLineupStatus(stat)),
        number: current.number !== undefined && current.number !== "" ? Number(current.number) : Number(player.number || 0),
        position: normalizePlayerPosition(current.position || player.primaryPosition || player.position),
        roleInPossession: normalizePossessionRole(current.position || player.primaryPosition || player.position, current.roleInPossession || defaultRoleInPossession(player)),
        roleOutOfPossession: normalizeOutOfPossessionRole(current.position || player.primaryPosition || player.position, current.roleOutOfPossession || defaultRoleOutOfPossession(player)),
      };
    });
}

function defaultLineupStatus(stat) {
  if (!stat) return "Kader";
  return Number(stat.minutes || 0) >= 60 ? "Startelf" : "Bank";
}

function normalizeLineupStatus(status) {
  return ["Startelf", "Bank", "Kader", "Nicht im Kader"].includes(status) ? status : "Kader";
}

function defaultRoleInPossession(player) {
  return normalizePossessionRole(player.primaryPosition || player.position, player.roleInPossession || player.role);
}

function defaultRoleOutOfPossession(player) {
  return normalizeOutOfPossessionRole(player.primaryPosition || player.position, player.roleOutOfPossession);
}

function isUnavailableStatus(status) {
  return ["Absage", "Verletzt", "Unentschuldigt"].includes(status);
}

function injuryForPlayerOnDate(playerId, date, injuries = state.injuries || []) {
  const day = normalizeIsoDate(date);
  if (!playerId || !day) return null;
  return injuries
    .filter((injury) => injury.playerId === playerId && injuryAffectsDate(injury, day))
    .sort((a, b) => b.startDate.localeCompare(a.startDate))[0] || null;
}

function availabilityBlockForPlayerOnDate(playerId, date, blocks = state.availabilityBlocks || []) {
  const day = normalizeIsoDate(date);
  if (!playerId || !day) return null;
  return blocks
    .filter((block) => block.playerId === playerId && availabilityBlockAffectsDate(block, day))
    .sort((a, b) => b.startDate.localeCompare(a.startDate))[0] || null;
}

function globalAvailabilityForPlayerOnDate(playerId, date, injuries = state.injuries || [], blocks = state.availabilityBlocks || []) {
  const injury = injuryForPlayerOnDate(playerId, date, injuries);
  if (injury) {
    return {
      status: "Verletzt",
      reason: "Verletzt",
      note: injuryAvailabilityNote(injury),
      source: `injury:${injury.id}`,
      item: injury,
    };
  }
  const block = availabilityBlockForPlayerOnDate(playerId, date, blocks);
  if (!block) return null;
  return {
    status: block.status,
    reason: block.reason || defaultAbsenceReason(block.status),
    note: availabilityBlockNote(block),
    source: `availability:${block.id}`,
    item: block,
  };
}

function injuryAffectsDate(injury, date) {
  if (!injury?.startDate || !date) return false;
  if (date < injury.startDate) return false;
  if (injury.endDate && date > injury.endDate) return false;
  if (!injury.endDate && injury.status === "Ausgeheilt") return false;
  return true;
}

function availabilityBlockAffectsDate(block, date) {
  if (!block?.startDate || !date) return false;
  if (date < block.startDate) return false;
  if (block.endDate && date > block.endDate) return false;
  if (block.weekday && block.weekday !== "all" && block.weekday !== isoWeekday(date)) return false;
  return true;
}

function openInjuries(injuries = state.injuries || []) {
  return injuries.filter((injury) => injury.status !== "Ausgeheilt");
}

function currentPlayerInjury(playerId) {
  return openInjuries().filter((injury) => injury.playerId === playerId).sort((a, b) => b.startDate.localeCompare(a.startDate))[0] || null;
}

function availabilityBlockNote(block) {
  const repeat = block.weekday && block.weekday !== "all" ? `${weekdayLabel(block.weekday)} · ` : "";
  return `${repeat}${block.reason || block.status}${block.note ? ` · ${block.note}` : ""}`;
}

function injuryAvailabilityNote(injury) {
  const parts = [
    `${injury.type} ${injury.bodyArea}`,
    injury.returnGuidance,
    injury.trainingLoad ? `Belastung: ${injury.trainingLoad}` : "",
  ].filter(Boolean);
  return `Verletzung: ${parts.join(" · ")}`;
}

function isoWeekday(date) {
  const parsed = parseIsoDate(date);
  if (!parsed) return "all";
  const day = parsed.getDay();
  return String(day === 0 ? 7 : day);
}

function weekdayLabel(value) {
  return availabilityWeekdays.find((item) => item.id === String(value))?.label || "Alle Tage";
}

function injuryDays(injury) {
  const start = parseIsoDate(injury.startDate);
  const end = parseIsoDate(injury.endDate || isoDate(new Date()));
  if (!start || !end || end < start) return 0;
  return Math.round((end - start) / 86400000) + 1;
}

function unavailablePlayerIdsForMatch(match) {
  return new Set((match.availability || []).filter((item) => isUnavailableStatus(item.status)).map((item) => item.playerId));
}

function playerCanHaveMatchStats(match, playerId) {
  if (!match) return true;
  const availability = (match.availability || []).find((item) => item.playerId === playerId);
  return !availability || !isUnavailableStatus(availability.status);
}

function matchAvailablePlayers(match) {
  return state.players.filter((player) => playerCanHaveMatchStats(match, player.id)).sort(sortByNumber);
}

function matchEventAllowed(match, event) {
  if (event.team !== "own") return true;
  if (event.playerId && !playerCanHaveMatchStats(match, event.playerId)) return false;
  if (event.assistPlayerId && !playerCanHaveMatchStats(match, event.assistPlayerId)) return false;
  return true;
}

function formationLineForPosition(position) {
  const normalized = normalizePlayerPosition(position);
  if (normalized === "Torhüter") return "Tor";
  if (["Innenverteidiger", "Außenverteidiger", "Flügelverteidiger"].includes(normalized)) return "Abwehr";
  if (["Defensives Mittelfeld", "Zentrales Mittelfeld", "Offensives Mittelfeld"].includes(normalized)) return "Mittelfeld";
  return "Angriff";
}

function normalizeFilters(filters = defaultFilters) {
  const period = periodTypes.includes(filters.period) ? filters.period : "all";
  return {
    venue: filters.venue && (filters.venue === "all" || venueTypes.includes(filters.venue)) ? filters.venue : "all",
    competition: filters.competition && (filters.competition === "all" || competitionTypes.includes(filters.competition)) ? filters.competition : "all",
    period,
    dateFrom: period === "custom" ? normalizeIsoDate(filters.dateFrom) : "",
    dateTo: period === "custom" ? normalizeIsoDate(filters.dateTo) : "",
  };
}

function normalizeTrainingFilters(filters = defaultTrainingFilters) {
  return {
    type: filters.type && (filters.type === "all" || trainingTypes.includes(filters.type)) ? filters.type : "all",
    priority: filters.priority && (filters.priority === "all" || trainingPriorities.includes(filters.priority)) ? filters.priority : "all",
    intensity: filters.intensity && (filters.intensity === "all" || trainingIntensities.includes(filters.intensity)) ? filters.intensity : "all",
  };
}

function normalizeInjuryFilters(filters = defaultInjuryFilters, players = state.players) {
  filters = { ...defaultInjuryFilters, ...(filters || {}) };
  const playerIds = new Set(players.map((player) => player.id));
  const status = filters.status && ["all", "open", ...injuryStatuses].includes(filters.status) ? filters.status : "open";
  return {
    player: filters.player && (filters.player === "all" || playerIds.has(filters.player)) ? filters.player : "all",
    status,
  };
}

function normalizeAvailabilityFilters(filters = defaultAvailabilityFilters, players = state.players) {
  filters = { ...defaultAvailabilityFilters, ...(filters || {}) };
  const playerIds = new Set(players.map((player) => player.id));
  const statusOptions = ["all", "open", ...globalAvailabilityStatuses, "Verletzung"];
  return {
    player: filters.player && (filters.player === "all" || playerIds.has(filters.player)) ? filters.player : "all",
    status: filters.status && statusOptions.includes(filters.status) ? filters.status : "all",
  };
}

function normalizeCompetition(value) {
  const text = String(value || "Liga").trim();
  if (competitionTypes.includes(text)) return text;
  if (/pokal/i.test(text)) return "Pokal";
  if (/freund|testspiel/i.test(text)) return "Freundschaftsspiel";
  if (/intern/i.test(text)) return "Interner Test";
  return "Liga";
}

function normalizeStat(stat, seededStat) {
  const generated = seededStat || seedTechnicalStats(stat.playerId, Number(stat.shots || 0), Number(stat.assists || 0), Number(stat.goals || 0), Number(stat.passesAttempted || 0));
  const generatedPosition = seededStat || seedPositionSpecificStats(
    stat.playerId,
    Number(stat.minutes || 0),
    Number(stat.passesCompleted || 0),
    Number(stat.passesAttempted || 0),
    Number(stat.goals || 0),
    Number(stat.assists || 0),
    Number(stat.shots || 0),
    Number(stat.tacklesWon || 0),
    Number(stat.duelsWon || 0),
    Number(stat.interceptions || 0),
    Number(stat.ballLosses || 0),
  );
  const current = { ...stat };
  const technicalFields = ["dribblesCompleted", "dribblesAttempted", "crossesCompleted", "crossesAttempted"];
  const hasOnlyEmptyTechnicalValues = technicalFields.every((field) => current[field] === undefined || Number(current[field] || 0) === 0);

  technicalFields.forEach((field) => {
    if (current[field] === undefined || (seededStat && hasOnlyEmptyTechnicalValues)) {
      current[field] = generated[field] || 0;
    }
  });

  positionSpecificFields.forEach((field) => {
    if (current[field] === undefined) {
      current[field] = generatedPosition[field] || 0;
    }
  });

  return current;
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function renderAll() {
  renderControls();
  renderDashboard();
  renderAnalysis();
  renderCompare();
  renderSeason();
  renderAnalyst();
  renderCalendar();
  renderTraining();
  renderTrainingStats();
  renderRanking();
  renderInjuries();
  renderAvailability();
  renderPlayers();
  renderMatches();
  renderPlayerPhotoPreview();
  renderPlayerFormMode();
  syncStatForm();
}

function setView(viewName) {
  dom.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === viewName));
  dom.views.forEach((view) => {
    const isVisible = view.id === `${viewName}View`;
    view.classList.toggle("is-visible", isVisible);
    if (isVisible) dom.viewTitle.textContent = view.dataset.title;
  });
}

function renderControls() {
  const filteredAnalysisMatches = filteredMatches(state.analysisFilters);
  dom.statMatch.innerHTML = filteredAnalysisMatches
    .map((match) => `<option value="${match.id}">${formatDate(match.date)} · ${escapeHtml(match.opponent)}</option>`)
    .join("");

  renderStatPlayerOptions();

  dom.teamMetricSelect.value = state.teamMetric || "index";
  dom.comparisonMetric.value = state.selectedMetric || "index";
  dom.playerPositionFilter.innerHTML = [`<option value="all">Alle Hauptpositionen</option>`, ...playerPositions.map((position) => `<option value="${escapeHtml(position)}">${escapeHtml(position)}</option>`)].join("");
  dom.playerPositionFilter.value = state.playerPositionFilter || "all";
  dom.playerSearchFilter.value = state.playerSearchFilter || "";
  dom.playerFootFilter.value = state.playerFootFilter || "all";
  dom.playerStatsFilter.value = state.playerStatsFilter || "all";
  dom.playerSortSelect.value = state.playerSort || "number";
  dom.playerViewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.playerView === (state.playerRosterView || "cards"));
  });
  dom.analysisVenueFilter.value = state.analysisFilters.venue;
  dom.analysisCompetitionFilter.value = state.analysisFilters.competition;
  dom.matchVenueFilter.value = state.matchFilters.venue;
  dom.matchCompetitionFilter.value = state.matchFilters.competition;
  dom.seasonPeriodFilter.value = state.seasonFilters.period;
  dom.seasonVenueFilter.value = state.seasonFilters.venue;
  dom.seasonCompetitionFilter.value = state.seasonFilters.competition;
  dom.seasonDateFromFilter.value = state.seasonFilters.dateFrom || "";
  dom.seasonDateToFilter.value = state.seasonFilters.dateTo || "";
  dom.seasonMetricSelect.innerHTML = leaderboardMetrics
    .map((metric) => `<option value="${metric.id}">${escapeHtml(metric.label)}</option>`)
    .join("");
  dom.seasonMetricSelect.value = state.activeSeasonMetric || "index";
  dom.analystPlayerSelect.innerHTML = [
    `<option value="team">Gesamte Mannschaft</option>`,
    ...state.players
    .slice()
    .sort(sortByNumber)
    .map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`),
  ].join("");
  dom.analystPlayerSelect.value = state.analystPlayer || "team";
  dom.analystVenueFilter.value = state.analystFilters.venue;
  dom.analystCompetitionFilter.value = state.analystFilters.competition;
  dom.trainingType.innerHTML = trainingTypes.map((type) => `<option>${escapeHtml(type)}</option>`).join("");
  dom.trainingPriority.innerHTML = trainingPriorities.map((priority) => `<option>${escapeHtml(priority)}</option>`).join("");
  dom.trainingIntensity.innerHTML = trainingIntensities.map((intensity) => `<option>${escapeHtml(intensity)}</option>`).join("");
  dom.injuryPlayer.innerHTML = state.players.slice().sort(sortByNumber).map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`).join("");
  dom.injuryType.innerHTML = injuryTypes.map((type) => `<option>${escapeHtml(type)}</option>`).join("");
  dom.injuryBodyArea.innerHTML = injuryBodyAreas.map((area) => `<option>${escapeHtml(area)}</option>`).join("");
  dom.injurySeverity.innerHTML = injurySeverities.map((severity) => `<option>${escapeHtml(severity)}</option>`).join("");
  dom.injuryStatus.innerHTML = injuryStatuses.map((status) => `<option>${escapeHtml(status)}</option>`).join("");
  dom.injuryTrainingLoad.innerHTML = injuryTrainingLoads.map((load) => `<option>${escapeHtml(load)}</option>`).join("");
  dom.availabilityPlayer.innerHTML = state.players.slice().sort(sortByNumber).map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`).join("");
  dom.availabilityStatus.innerHTML = globalAvailabilityStatuses.map((status) => `<option>${escapeHtml(status)}</option>`).join("");
  dom.availabilityReason.innerHTML = absenceReasons.map((reason) => `<option value="${escapeHtml(reason)}">${escapeHtml(reason)}</option>`).join("");
  dom.availabilityWeekday.innerHTML = availabilityWeekdays.map((weekday) => `<option value="${weekday.id}">${escapeHtml(weekday.label)}</option>`).join("");
  dom.calendarCreateType.innerHTML = calendarItemTypes.map((type) => `<option value="${type.id}">${escapeHtml(type.label)}</option>`).join("");
  dom.calendarTrainingType.innerHTML = trainingTypes.map((type) => `<option>${escapeHtml(type)}</option>`).join("");
  dom.calendarTrainingPriority.innerHTML = trainingPriorities.map((priority) => `<option>${escapeHtml(priority)}</option>`).join("");
  dom.calendarTrainingIntensity.innerHTML = trainingIntensities.map((intensity) => `<option>${escapeHtml(intensity)}</option>`).join("");
  dom.calendarEventType.innerHTML = calendarEventTypes.map((type) => `<option>${escapeHtml(type)}</option>`).join("");
  renderTrainingFilterControls();
  renderPlayerPositionControls();
}

function renderStatPlayerOptions() {
  const selectedPlayer = dom.statPlayer.value;
  const match = getMatch(dom.statMatch.value) || filteredMatches(state.analysisFilters)[0];
  const players = match ? matchAvailablePlayers(match) : state.players.slice().sort(sortByNumber);
  dom.statPlayer.innerHTML = players
    .map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`)
    .join("");
  if (players.some((player) => player.id === selectedPlayer)) dom.statPlayer.value = selectedPlayer;
}

function renderTrainingFilterControls() {
  const filters = normalizeTrainingFilters(state.trainingFilters);
  const typeOptions = [`<option value="all">Alle Trainingsarten</option>`, ...trainingTypes.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`)].join("");
  const priorityOptions = [`<option value="all">Alle Prioritäten</option>`, ...trainingPriorities.map((priority) => `<option value="${escapeHtml(priority)}">${escapeHtml(priority)}</option>`)].join("");
  const intensityOptions = [`<option value="all">Alle Intensitäten</option>`, ...trainingIntensities.map((intensity) => `<option value="${escapeHtml(intensity)}">${escapeHtml(intensity)}</option>`)].join("");
  [dom.trainingTypeFilter, dom.trainingStatsTypeFilter].forEach((select) => {
    select.innerHTML = typeOptions;
    select.value = filters.type;
  });
  [dom.trainingPriorityFilter, dom.trainingStatsPriorityFilter].forEach((select) => {
    select.innerHTML = priorityOptions;
    select.value = filters.priority;
  });
  [dom.trainingIntensityFilter, dom.trainingStatsIntensityFilter].forEach((select) => {
    select.innerHTML = intensityOptions;
    select.value = filters.intensity;
  });
}

function renderPlayerPositionControls(primary = dom.playerPosition.value, secondary = selectedSecondaryPositionsFromForm(), roleIn = dom.playerRoleInPossession.value, roleOut = dom.playerRoleOutOfPossession.value) {
  const primaryPosition = normalizePlayerPosition(primary);
  const secondarySet = new Set((secondary || []).map(normalizePlayerPosition).filter((position) => position !== primaryPosition));

  dom.playerPosition.innerHTML = playerPositions
    .map((position) => `<option value="${escapeHtml(position)}" ${position === primaryPosition ? "selected" : ""}>${escapeHtml(position)}</option>`)
    .join("");

  dom.playerSecondaryPositions.innerHTML = playerPositions
    .filter((position) => position !== primaryPosition)
    .map(
      (position) => `
        <label class="position-option">
          <input type="checkbox" value="${escapeHtml(position)}" ${secondarySet.has(position) ? "checked" : ""} />
          <span>${escapeHtml(position)}</span>
        </label>
      `,
    )
    .join("");

  renderRoleSelect(dom.playerRoleInPossession, possessionRoles[primaryPosition], roleIn);
  renderRoleSelect(dom.playerRoleOutOfPossession, outOfPossessionRoles[primaryPosition], roleOut);
}

function renderRoleSelect(select, options = [], selectedValue = "") {
  const selected = options.includes(selectedValue) ? selectedValue : options[0] || "";
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("");
  select.value = selected;
}

function selectedSecondaryPositionsFromForm() {
  if (!dom.playerSecondaryPositions) return [];
  return Array.from(dom.playerSecondaryPositions.querySelectorAll("input:checked")).map((input) => input.value);
}

function renderDashboardCalendarSummary() {
  if (!dom.dashboardCalendarSummary) return;
  const items = dashboardCalendarItems(5);
  dom.dashboardCalendarSummary.innerHTML = `
    <div class="calendar-strip-head">
      <div>
        <span class="eyebrow">Kalender</span>
        <h2>N\u00e4chste 5 Termine</h2>
      </div>
      <button class="ghost-button" data-dashboard-open-calendar type="button">Kalender anzeigen</button>
    </div>
    <div class="calendar-strip-list">
      ${items.length ? items.map(dashboardCalendarItemHtml).join("") : `<div class="empty-state small-empty">Keine anstehenden Termine im Kalender.</div>`}
    </div>
  `;
  dom.dashboardCalendarSummary.querySelector("[data-dashboard-open-calendar]")?.addEventListener("click", () => setView("calendar"));
  bindCalendarItemActions(dom.dashboardCalendarSummary);
}

function dashboardCalendarItems(limit = 5) {
  return calendarTimelineItems("upcoming").slice(0, limit);
}

function dashboardCalendarItemHtml(item) {
  const status = dashboardCalendarStatus(item);
  return `
    <article class="calendar-strip-item ${item.kind}">
      <button class="calendar-strip-main" data-calendar-open="${item.kind}" data-calendar-id="${item.id}" type="button">
        <span>${escapeHtml(item.typeLabel)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <em>${escapeHtml([formatDate(item.date), item.startTime, item.location].filter(Boolean).join(" · "))}</em>
      </button>
      <div class="calendar-strip-status">
        ${status.map((entry) => `<span class="${entry.tone || ""}">${escapeHtml(entry.label)} <strong>${escapeHtml(entry.value)}</strong></span>`).join("")}
      </div>
    </article>
  `;
}

function dashboardCalendarStatus(item) {
  if (item.kind === "training") {
    const training = getTraining(item.id);
    const summary = training ? trainingSummary(training) : null;
    return summary
      ? [
          { label: "Zu", value: summary.confirmed },
          { label: "Ab", value: summary.cancelled },
          { label: "Verl.", value: summary.injured },
          { label: "Unent.", value: summary.unexcused, tone: summary.unexcused ? "danger" : "" },
        ]
      : [{ label: "Status", value: "offen" }];
  }
  if (item.kind === "match") {
    const match = getMatch(item.id);
    const summary = match ? availabilitySummary(match.availability || []) : null;
    return summary
      ? [
          { label: "Zu", value: summary.confirmed },
          { label: "Ab", value: summary.cancelled },
          { label: "Fragl.", value: summary.questionable },
          { label: "Unent.", value: summary.unexcused, tone: summary.unexcused ? "danger" : "" },
        ]
      : [{ label: "Status", value: "offen" }];
  }
  return [
    { label: "Termin", value: item.startTime || "offen" },
    { label: "Ort", value: item.location || "offen" },
  ];
}

function renderDashboardAssistant() {
  if (!dom.dashboardAssistant) return;
  const news = dailyTeamNews();
  activeAssistantSlide = clampNumber(activeAssistantSlide, 0, Math.max(0, news.length - 1));
  const active = news[activeAssistantSlide] || news[0];
  const todayLabel = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit" });

  dom.dashboardAssistant.innerHTML = `
    <div class="assistant-intro">
      <span class="eyebrow">Assistent</span>
      <h2>Teamnews heute</h2>
      <p>Stand ${escapeHtml(todayLabel)} · die wichtigsten Signale aus Spielen, Training, Kalender und Verf\u00fcgbarkeit.</p>
    </div>
    <article class="assistant-slide ${active.tone || ""}">
      <div class="assistant-slide-head">
        <span class="tag ${active.tone === "critical" ? "danger" : active.tone === "positive" ? "teal" : "amber"}">${escapeHtml(active.label)}</span>
        <strong>${activeAssistantSlide + 1}/5</strong>
      </div>
      <h3>${escapeHtml(active.title)}</h3>
      <p>${escapeHtml(active.text)}</p>
      <small>${escapeHtml(active.meta)}</small>
    </article>
    <div class="assistant-news-list" aria-label="Teamnews">
      ${news.map((item, index) => `
        <button class="${index === activeAssistantSlide ? "is-active" : ""}" data-assistant-slide="${index}" type="button">
          <span>${index + 1}</span>
          <strong>${escapeHtml(item.title)}</strong>
        </button>
      `).join("")}
    </div>
    <div class="assistant-controls">
      <button class="ghost-button" data-assistant-step="-1" type="button">Zur\u00fcck</button>
      <button class="ghost-button" data-assistant-step="1" type="button">Weiter</button>
    </div>
  `;

  dom.dashboardAssistant.querySelectorAll("[data-assistant-slide]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAssistantSlide = Number(button.dataset.assistantSlide || 0);
      renderDashboardAssistant();
    });
  });
  dom.dashboardAssistant.querySelectorAll("[data-assistant-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.assistantStep || 0);
      activeAssistantSlide = (activeAssistantSlide + step + news.length) % news.length;
      renderDashboardAssistant();
    });
  });
}

function dailyTeamNews() {
  const matches = state.matches.slice().sort(sortByDateDesc);
  const latestMatch = matches[0];
  const latestAggregate = latestMatch ? aggregateMatch(latestMatch.id) : null;
  const latestIndex = latestMatch ? average(statsForMatch(latestMatch.id).map((stat) => calculateIndex(stat))) : 0;
  const team = aggregateTeam();
  const matchAbsences = matchAvailabilitySeasonSummary(state.matches);
  const trainingAbsences = trainingSeasonSummary(state.trainings || []);
  const injuries = openInjuries();
  const totalUnexcused = matchAbsences.unexcused + trainingAbsences.unexcused;
  const totalEvents = state.matches.length + (state.trainings || []).length;
  const possible = totalEvents * state.players.length;
  const unexcusedRate = possible ? (totalUnexcused / possible) * 100 : 0;
  const today = isoDate(new Date());
  const training = (state.trainings || [])
    .slice()
    .sort((a, b) => {
      const aUpcoming = a.date >= today ? 0 : 1;
      const bUpcoming = b.date >= today ? 0 : 1;
      return aUpcoming - bUpcoming || (aUpcoming === 0 ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
    })[0];
  const trainingRow = training ? trainingSummary(training) : null;
  const upcoming = calendarItems()
    .slice()
    .sort((a, b) => {
      const aUpcoming = a.date >= today ? 0 : 1;
      const bUpcoming = b.date >= today ? 0 : 1;
      return aUpcoming - bUpcoming || (aUpcoming === 0 ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
    })[0];
  const topPlayer = state.players
    .map((player) => ({ player, aggregate: aggregatePlayer(player.id) }))
    .filter((row) => row.aggregate.games > 0)
    .sort((a, b) => b.aggregate.averageIndex - a.aggregate.averageIndex)[0];
  const indexPoints = teamSeries("index").points.filter((point) => Number.isFinite(Number(point.value)));
  const lastPoint = indexPoints[indexPoints.length - 1];
  const previousPoint = indexPoints[indexPoints.length - 2];
  const trendDelta = lastPoint && previousPoint ? Number(lastPoint.value) - Number(previousPoint.value) : 0;

  const news = [
    {
      label: injuries.length ? "Verletzungen" : "Kadergesundheit",
      title: injuries.length ? `${injuries.length} offene Verletzungen` : "Keine offenen Verletzungen",
      text: injuries.length
        ? `${new Set(injuries.map((injury) => injury.playerId)).size} Spieler sind aktuell im Verletzungs- oder Reha-Status. Belastung und Verfügbarkeit werden automatisch berücksichtigt.`
        : "Aktuell sind keine offenen Verletzungen im Kader hinterlegt.",
      meta: injuries.length ? injuries.map((injury) => getPlayer(injury.playerId)?.name).filter(Boolean).slice(0, 3).join(" · ") : "Kader vollständig verfügbar",
      priority: injuries.length ? 98 : 50,
      tone: injuries.length ? "critical" : "positive",
    },
    {
      label: totalUnexcused ? "Dringend" : "Kaderstatus",
      title: totalUnexcused ? "Unentschuldigtes Fehlen pr\u00fcfen" : "Keine unentschuldigten Fehlzeiten",
      text: totalUnexcused
        ? `${totalUnexcused} unentschuldigte Fehlzeiten sind erfasst. Das entspricht ${formatNumber(unexcusedRate)}% aller Spiel- und Trainingstermine.`
        : `Aktuell sind keine unentschuldigten Fehlzeiten in Spielen oder Trainings hinterlegt. Die Verf\u00fcgbarkeit bleibt damit sauber dokumentiert.`,
      meta: `Spiele: ${matchAbsences.unexcused} · Training: ${trainingAbsences.unexcused}`,
      priority: totalUnexcused ? 100 : 72,
      tone: totalUnexcused ? "critical" : "positive",
    },
    {
      label: "Letzte Analyse",
      title: latestMatch ? `${latestMatch.opponent} im Kurzcheck` : "Noch kein Spiel ausgewertet",
      text: latestMatch
        ? `Endstand ${latestMatch.goalsFor}:${latestMatch.goalsAgainst}, Index ${formatNumber(latestIndex)} und ${formatNumber(latestAggregate.passAccuracy)}% Passquote.`
        : "Sobald ein Spiel angelegt ist, fasst der Assistent die wichtigsten Signale hier zusammen.",
      meta: latestMatch ? `${formatDate(latestMatch.date)} · ${latestMatch.competition || "Spiel"}` : "Spieltag offen",
      priority: latestMatch ? 92 : 35,
      tone: latestIndex >= 85 ? "positive" : latestIndex >= 70 ? "warning" : "critical",
    },
    {
      label: "Form",
      title: trendDelta >= 4 ? "Formkurve zeigt nach oben" : trendDelta <= -4 ? "Formkurve f\u00e4llt ab" : "Formkurve bleibt stabil",
      text: indexPoints.length >= 2
        ? `Der letzte Teamindex liegt bei ${formatNumber(lastPoint.value)}. Gegen\u00fcber dem vorherigen Spiel sind das ${trendDelta >= 0 ? "+" : ""}${formatNumber(trendDelta)} Punkte.`
        : "F\u00fcr eine belastbare Formkurve werden mindestens zwei Spiele ben\u00f6tigt.",
      meta: `${matches.length} Spiele im Verlauf`,
      priority: 78,
      tone: trendDelta >= 4 ? "positive" : trendDelta <= -4 ? "critical" : "warning",
    },
    {
      label: "Training",
      title: training ? `${training.type}: ${training.topic || "Schwerpunkt offen"}` : "Trainingsplanung offen",
      text: training
        ? `${formatDate(training.date)} · ${trainingRow.confirmed} Zusagen, ${trainingRow.cancelled} Absagen, ${trainingRow.unexcused} unentschuldigt.`
        : "Lege ein Training an, damit der Assistent Teilnahme, Belastung und Bewertungen verfolgt.",
      meta: training ? `${training.location || "Ort offen"} · ${training.intensity} Intensit\u00e4t` : "Noch kein Training",
      priority: training ? 74 : 30,
      tone: trainingRow?.unexcused ? "critical" : "positive",
    },
    {
      label: "Top-Spieler",
      title: topPlayer ? `${topPlayer.player.name} f\u00fchrt das Ranking an` : "Top-Spieler offen",
      text: topPlayer
        ? `${formatNumber(topPlayer.aggregate.averageIndex)} Index, ${formatNumber(topPlayer.aggregate.passAccuracy)}% Passquote und ${topPlayer.aggregate.goals + topPlayer.aggregate.assists} direkte Torbeteiligungen.`
        : "Sobald Spielerwerte erfasst sind, erscheint hier der auff\u00e4lligste Spieler.",
      meta: topPlayer ? `#${topPlayer.player.number} · ${topPlayer.player.primaryPosition || topPlayer.player.position}` : "Noch keine Spielerwerte",
      priority: topPlayer ? 70 : 25,
      tone: "positive",
    },
    {
      label: "Kalender",
      title: upcoming ? `N\u00e4chster Termin: ${upcoming.title}` : "Kalender ohne Termine",
      text: upcoming
        ? `${formatDate(upcoming.date)} · ${upcoming.startTime || "Zeit offen"} · ${upcoming.typeLabel}.`
        : "Trage Spiele, Trainings oder Events ein, damit der Assistent die n\u00e4chsten Termine meldet.",
      meta: upcoming ? upcoming.location || "Ort offen" : "Termin offen",
      priority: upcoming ? 66 : 20,
      tone: "warning",
    },
  ];

  return news
    .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title, "de"))
    .slice(0, 5);
}

function renderDashboard() {
  renderDashboardCalendarSummary();
  renderDashboardAssistant();
  const team = aggregateTeam();
  const latestMatch = state.matches.slice().sort(sortByDateDesc)[0];
  const latestStats = latestMatch ? statsForMatch(latestMatch.id) : [];
  const latestIndex = average(latestStats.map((stat) => calculateIndex(stat)));
  const matchAbsences = matchAvailabilitySeasonSummary(state.matches);
  const trainingAbsences = trainingSeasonSummary(state.trainings || []);
  const absenceEvents = state.matches.length + (state.trainings || []).length;
  const absencePossible = absenceEvents * state.players.length;
  const teamUnexcused = matchAbsences.unexcused + trainingAbsences.unexcused;
  const teamUnexcusedRate = absencePossible ? (teamUnexcused / absencePossible) * 100 : 0;
  const injuryData = injurySummary(state.injuries || []);

  const metrics = [
    {
      label: "Analysierte Spiele",
      value: state.matches.length,
      hint: `${activeStats().length} Spieler-Auswertungen gespeichert`,
    },
    {
      label: "Spieler im Kader",
      value: state.players.length,
      hint: "Für Vergleiche und Saisonwerte verfügbar",
    },
    {
      label: "Team-Passquote",
      value: `${formatNumber(team.passAccuracy)}%`,
      hint: `${team.passesCompleted} von ${team.passesAttempted} Pässen angekommen`,
    },
    {
      label: "Letzter Index",
      value: formatNumber(latestIndex),
      hint: latestMatch ? `Gegen ${latestMatch.opponent}` : "Noch kein Spiel erfasst",
    },
    {
      label: "Unentschuldigt",
      value: teamUnexcused,
      hint: `${formatNumber(teamUnexcusedRate)}% aus Spielen und Trainings`,
      tone: "critical",
    },
    {
      label: "Offene Verletzungen",
      value: injuryData.open,
      hint: `${injuryData.affectedPlayers} Spieler · ${injuryData.rehab} in Reha/Aufbau`,
      tone: injuryData.open ? "critical" : "",
    },
  ];

  dom.dashboardMetrics.innerHTML = metrics
    .map(
      (item) => `
      <article class="metric-card ${item.tone || ""}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.hint}</p>
      </article>
    `,
    )
    .join("");

  renderLineChart(dom.teamFormChart, [teamSeries(state.teamMetric || "index")], {
    yMax: metricMax(state.teamMetric || "index"),
    suffix: metricSuffix(state.teamMetric || "index"),
  });

  const topData = state.players
    .map((player) => {
      const aggregate = aggregatePlayer(player.id);
      return { label: player.name, value: aggregate.averageIndex, color: colors[0] };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
  renderBarChart(dom.topPlayersChart, topData, { suffix: "" });

  dom.recentMatchesTable.innerHTML = state.matches
    .slice()
    .sort(sortByDateDesc)
    .slice(0, 5)
    .map((match) => {
      const matchAgg = aggregateMatch(match.id);
      const note = bestNoteForMatch(match.id);
      return `
        <tr>
          <td>${formatDate(match.date)}</td>
          <td>${escapeHtml(match.opponent)}<br><span class="muted">${escapeHtml(match.competition || "Spiel")}</span></td>
          <td>${match.goalsFor}:${match.goalsAgainst}</td>
          <td>${formatNumber(matchAgg.passAccuracy)}%</td>
          <td>${escapeHtml(note || "Keine Notiz")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderAnalysis() {
  const analysisMatches = filteredMatches(state.analysisFilters);
  const match = analysisMatches.find((item) => item.id === dom.statMatch.value) || analysisMatches[0];
  if (!match) {
    dom.analysisMatchTitle.textContent = "Kein Spiel im Filter";
    dom.matchPassChart.innerHTML = emptySvg("Lege zuerst ein Spiel an.");
    dom.matchStatsTable.innerHTML = "";
    renderLeaderboard();
    return;
  }

  dom.statMatch.value = match.id;
  renderStatPlayerOptions();
  dom.analysisMatchTitle.textContent = `${match.opponent} · ${match.goalsFor}:${match.goalsAgainst}`;
  const rows = statsForMatch(match.id)
    .map((stat) => {
      const officialStat = statWithOfficialScoring(stat);
      const player = getPlayer(stat.playerId);
      return {
        stat: officialStat,
        player,
        passAccuracy: passAccuracy(stat),
        index: calculateIndex(officialStat),
      };
    })
    .sort((a, b) => b.index - a.index);

  renderBarChart(
    dom.matchPassChart,
    rows.map((row, index) => ({
      label: row.player?.name || "Unbekannt",
      value: row.passAccuracy,
      color: colors[index % colors.length],
    })),
    { suffix: "%", max: 100 },
  );

  dom.matchStatsTable.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.player ? playerNameLink(row.player) : "Unbekannt"}</td>
          <td>${formatNumber(row.passAccuracy)}%</td>
          <td>${Number(row.stat.dribblesCompleted || 0)}/${Number(row.stat.dribblesAttempted || 0)}</td>
          <td>${Number(row.stat.crossesCompleted || 0)}/${Number(row.stat.crossesAttempted || 0)}</td>
          <td>${formatNumber(row.index)}</td>
          <td>${escapeHtml(row.stat.note || "Keine Notiz")}</td>
        </tr>
      `,
    )
    .join("");

  renderLeaderboard();
}

function setLeaderboard(metricId) {
  if (!getLeaderboardDefinition(metricId)) return;
  state.activeLeaderboard = metricId;
  persist();
  renderLeaderboard();
}

function renderLeaderboard() {
  const activeMetric = state.activeLeaderboard || "passAccuracy";
  const definition = getLeaderboardDefinition(activeMetric) || getLeaderboardDefinition("passAccuracy");
  dom.statLeaderboardTitle.textContent = definition.label;
  dom.statLeaderboardHint.textContent = definition.lowerBetter ? "Saison · weniger ist besser" : "Saison";

  dom.statLabelButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.leaderboard === definition.id);
  });

  dom.leaderboardMetricTabs.innerHTML = leaderboardMetrics
    .map(
      (metric) => `
        <button class="leaderboard-tab ${metric.id === definition.id ? "is-active" : ""}" data-leaderboard-tab="${metric.id}" type="button">
          ${escapeHtml(metric.label)}
        </button>
      `,
    )
    .join("");

  dom.leaderboardMetricTabs.querySelectorAll("[data-leaderboard-tab]").forEach((button) => {
    button.addEventListener("click", () => setLeaderboard(button.dataset.leaderboardTab));
  });

  const rows = state.players
    .map((player) => {
      const aggregate = aggregatePlayerFiltered(player.id, state.analysisFilters);
      return {
        player,
        aggregate,
        value: Number(definition.value(aggregate) || 0),
      };
    })
    .filter((row) => row.aggregate.entries > 0 && shouldIncludeLeaderboardRow(row.aggregate, definition))
    .sort((a, b) => (definition.lowerBetter ? a.value - b.value : b.value - a.value))
    .slice(0, 8);

  if (!rows.length) {
    dom.statLeaderboard.innerHTML = `<div class="empty-state">Noch keine Daten für diese Statistik.</div>`;
    return;
  }

  dom.statLeaderboard.innerHTML = rows
    .map(
      (row, index) => `
        <article class="leaderboard-row">
          <span class="leaderboard-rank">${index + 1}</span>
          <div class="leaderboard-player">
            <strong>${playerNameLink(row.player)}</strong>
            <span>#${row.player.number} · ${escapeHtml(row.player.position)} · ${row.aggregate.games} Spiele</span>
          </div>
          <div class="leaderboard-value">
            <strong>${formatLeaderboardValue(row.value, definition)}</strong>
            <span>${leaderboardDetail(row.aggregate, definition)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function getLeaderboardDefinition(metricId) {
  return leaderboardMetrics.find((metric) => metric.id === metricId);
}

function shouldIncludeLeaderboardRow(aggregate, definition) {
  if (definition.id === "passAccuracy") return aggregate.passesAttempted > 0;
  if (definition.id === "dribbleSuccess") return aggregate.dribblesAttempted > 0;
  if (definition.id === "crossAccuracy") return aggregate.crossesAttempted > 0;
  if (definition.id === "rating") return aggregate.ratings.length > 0;
  return true;
}

function formatLeaderboardValue(value, definition) {
  return `${formatNumber(value)}${definition.suffix || ""}`;
}

function leaderboardDetail(aggregate, definition) {
  if (definition.id === "passAccuracy") return `${aggregate.passesCompleted}/${aggregate.passesAttempted} Pässe`;
  if (definition.id === "dribbleSuccess") return `${aggregate.dribblesCompleted}/${aggregate.dribblesAttempted} Dribblings`;
  if (definition.id === "crossAccuracy") return `${aggregate.crossesCompleted}/${aggregate.crossesAttempted} Flanken`;
  if (definition.mode === "average") return "Durchschnitt";
  return definition.lowerBetter ? "weniger ist besser" : "Summe";
}

function renderSeason() {
  const filters = normalizeFilters(state.seasonFilters);
  const definition = getLeaderboardDefinition(state.activeSeasonMetric) || getLeaderboardDefinition("index");
  const matches = filteredMatches(filters);
  const team = aggregateTeamFiltered(filters);
  const matchAvailability = matchAvailabilitySeasonSummary(matches);
  const isDetailMode = state.seasonMode === "details";

  dom.seasonVenueFilter.value = filters.venue;
  dom.seasonCompetitionFilter.value = filters.competition;
  dom.seasonPeriodFilter.value = filters.period;
  dom.seasonDateFromFilter.value = filters.dateFrom || "";
  dom.seasonDateToFilter.value = filters.dateTo || "";
  dom.seasonDateFromFilter.disabled = filters.period !== "custom";
  dom.seasonDateToFilter.disabled = filters.period !== "custom";
  dom.seasonMetricSelect.value = definition.id;
  dom.seasonMetricSelect.hidden = isDetailMode;
  dom.seasonOverviewContent.style.display = isDetailMode ? "none" : "grid";
  dom.seasonDetailedContent.style.display = isDetailMode ? "grid" : "none";
  dom.seasonModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.seasonMode === (isDetailMode ? "details" : "overview"));
  });

  dom.seasonSummaryMetrics.innerHTML = [
    { label: "Spiele im Filter", value: matches.length, hint: filterLabel(filters) },
    { label: "Spielerwerte", value: team.entries, hint: "Auswertungen in dieser Auswahl" },
    { label: "Team-Passquote", value: `${formatNumber(team.passAccuracy)}%`, hint: `${team.passesCompleted}/${team.passesAttempted} Pässe` },
    { label: "Ø Leistungsindex", value: formatNumber(team.averageIndex), hint: `${team.goals} Tore · ${team.assists} Assists` },
    { label: "Unentschuldigt", value: matchAvailability.unexcused, hint: `${formatNumber(matchAvailability.unexcusedRate)}% im Spieltagsfilter`, tone: "critical" },
  ]
    .map(
      (item) => `
        <article class="metric-card ${item.tone || ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.hint)}</p>
        </article>
      `,
    )
    .join("");

  dom.seasonFormTitle.textContent = `${definition.label} · Teamverlauf`;
  renderLineChart(dom.seasonFormChart, [seasonTeamSeries(definition.id, filters)], {
    yMax: metricMax(definition.id),
    suffix: definition.suffix || metricSuffix(definition.id),
  });

  renderSeasonLeaderboard(definition, filters);
  renderSeasonGoalAnalytics(filters);
  renderSeasonTeamOverview(team);
  renderSeasonPlayerTable(filters);
  renderSeasonDetailedAnalysis(filters);
}

function renderSeasonLeaderboard(definition, filters) {
  dom.seasonLeaderboardTitle.textContent = definition.label;
  const rows = state.players
    .map((player) => {
      const aggregate = aggregatePlayerFiltered(player.id, filters);
      return { player, aggregate, value: Number(definition.value(aggregate) || 0) };
    })
    .filter((row) => row.aggregate.entries > 0 && shouldIncludeLeaderboardRow(row.aggregate, definition))
    .sort((a, b) => (definition.lowerBetter ? a.value - b.value : b.value - a.value))
    .slice(0, 8);

  if (!rows.length) {
    dom.seasonLeaderboard.innerHTML = `<div class="empty-state">Keine Daten für diese Filterauswahl.</div>`;
    return;
  }

  dom.seasonLeaderboard.innerHTML = rows
    .map(
      (row, index) => `
        <article class="leaderboard-row">
          <span class="leaderboard-rank">${index + 1}</span>
          <div class="leaderboard-player">
            <strong>${playerNameLink(row.player)}</strong>
            <span>#${row.player.number} · ${escapeHtml(row.player.position)} · ${row.aggregate.games} Spiele</span>
          </div>
          <div class="leaderboard-value">
            <strong>${formatLeaderboardValue(row.value, definition)}</strong>
            <span>${leaderboardDetail(row.aggregate, definition)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderSeasonGoalAnalytics(filters) {
  const data = seasonGoalAnalytics(filters);
  const games = data.matches.length;
  const topScorer = data.scorers[0];
  const topAssist = data.assists[0];
  const topType = data.goalTypes[0];

  dom.seasonGoalMetrics.innerHTML = [
    { label: "Tore", value: data.ownGoals.length, hint: `${formatNumber(perGame(data.ownGoals.length, games))} pro Spiel` },
    { label: "Gegentore", value: data.opponentGoals.length, hint: `${formatNumber(perGame(data.opponentGoals.length, games))} pro Spiel` },
    { label: "Vorlagen", value: data.assistCount, hint: `${formatNumber(data.assistRate)}% der Tore mit Assist` },
    { label: "Top-Torschütze", value: topScorer?.name || "Offen", hint: topScorer ? `${topScorer.value} Tore` : "Noch kein eigener Torschütze" },
    { label: "Top-Vorlagengeber", value: topAssist?.name || "Offen", hint: topAssist ? `${topAssist.value} Assists` : "Noch keine Vorlage" },
    { label: "Häufigste Torart", value: topType?.label || "Offen", hint: topType ? `${topType.value} Einträge` : "Noch keine Torart erfasst" },
  ].map(goalMetricCardHtml).join("");

  renderBarChart(
    dom.seasonGoalTypeChart,
    data.goalTypes.slice(0, 8).map((row, index) => ({ label: row.label, value: row.value, color: colors[index % colors.length] })),
    { suffix: "" },
  );
  renderStackedGoalTimingChart(dom.seasonGoalTimingChart, data.minuteBuckets);
  dom.seasonGoalRankings.innerHTML = `
    ${seasonGoalRankingBlock("Torschützen", data.scorers, "Noch keine eigenen Tore.")}
    ${seasonGoalRankingBlock("Vorlagengeber", data.assists, "Noch keine Vorlagen erfasst.")}
    ${seasonGoalRankingBlock("Abschlussarten", data.finishes, "Noch keine Abschlussarten erfasst.")}
    ${seasonGoalRankingBlock("Entstehung", data.groupBreakdown, "Noch keine Torarten erfasst.")}
  `;
  dom.seasonGoalTimeline.innerHTML = data.timeline.length
    ? data.timeline.map(seasonGoalTimelineRow).join("")
    : `<div class="empty-state">Noch keine Tore im Spieltagsmodul für diese Filterauswahl erfasst.</div>`;
}

function goalMetricCardHtml(item) {
  return `
    <article class="metric-card goal-metric-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.hint)}</p>
    </article>
  `;
}

function seasonGoalAnalytics(filters) {
  const matches = filteredMatches(filters).slice().sort(sortByDateAsc);
  const allGoals = matches.flatMap((match) => matchGoalEvents(match).map((event) => ({ match, event })));
  const ownGoals = allGoals.filter(({ event }) => event.team === "own");
  const opponentGoals = allGoals.filter(({ event }) => event.team === "opponent");
  const typeCounts = new Map();
  const finishCounts = new Map();
  const groupCounts = new Map();
  const scorerCounts = new Map();
  const assistCounts = new Map();

  ownGoals.forEach(({ event }) => {
    addEventCount(scorerCounts, eventParticipantName(event, "scorer"));
    const assistName = eventParticipantName(event, "assist");
    if (assistName) addEventCount(assistCounts, assistName);

    (event.goalTypes || []).forEach((type) => {
      const label = goalTypeLabel(type);
      typeCounts.set(type, { id: type, label, value: (typeCounts.get(type)?.value || 0) + 1 });
      if (finishGoalTypeIds.has(type)) {
        finishCounts.set(type, { id: type, label, value: (finishCounts.get(type)?.value || 0) + 1 });
      }
      const group = goalTypeOptions.find((option) => option.id === type)?.group || "Sonstige";
      groupCounts.set(group, { name: group, value: (groupCounts.get(group)?.value || 0) + 1 });
    });
  });

  const minuteBuckets = goalMinuteBuckets(allGoals);
  const assistCount = ownGoals.filter(({ event }) => event.assistPlayerId || event.assistName).length;

  return {
    matches,
    allGoals,
    ownGoals,
    opponentGoals,
    assistCount,
    assistRate: ownGoals.length ? (assistCount / ownGoals.length) * 100 : 0,
    goalTypes: Array.from(typeCounts.values()).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label)),
    finishes: Array.from(finishCounts.values()).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label)),
    groupBreakdown: Array.from(groupCounts.values()).sort((a, b) => b.value - a.value || a.name.localeCompare(b.name)),
    scorers: mapToRanking(scorerCounts),
    assists: mapToRanking(assistCounts),
    minuteBuckets,
    timeline: allGoals.slice().sort((a, b) => b.match.date.localeCompare(a.match.date) || Number(b.event.minute || 0) - Number(a.event.minute || 0)).slice(0, 10),
  };
}

const finishGoalTypeIds = new Set(["header", "right-foot", "left-foot", "volley", "first-time", "inside-box", "distance-shot", "one-v-one", "tap-in"]);

function goalMinuteBuckets(goalRows) {
  const buckets = [
    { label: "0-15", own: 0, opponent: 0 },
    { label: "16-30", own: 0, opponent: 0 },
    { label: "31-45+", own: 0, opponent: 0 },
    { label: "46-60", own: 0, opponent: 0 },
    { label: "61-75", own: 0, opponent: 0 },
    { label: "76-90+", own: 0, opponent: 0 },
  ];
  goalRows.forEach(({ event }) => {
    const minute = Number(event.minute || 0);
    const index = minute <= 15 ? 0 : minute <= 30 ? 1 : minute <= 45 ? 2 : minute <= 60 ? 3 : minute <= 75 ? 4 : 5;
    buckets[index][event.team === "opponent" ? "opponent" : "own"] += 1;
  });
  return buckets;
}

function seasonGoalRankingBlock(title, rows, emptyText) {
  return `
    <div class="event-ranking-block season-goal-ranking-block">
      <h4>${escapeHtml(title)}</h4>
      ${rows.length
        ? rows.slice(0, 5).map((row, index) => `
            <div class="event-ranking-row">
              <span>${index + 1}</span>
              <strong>${escapeHtml(row.name || row.label)}</strong>
              <em>${row.value}</em>
            </div>
          `).join("")
        : `<p class="muted">${escapeHtml(emptyText)}</p>`}
    </div>
  `;
}

function seasonGoalTimelineRow({ match, event }) {
  const scorer = eventParticipantName(event, "scorer") || (event.team === "opponent" ? "Gegner" : "Unbekannt");
  const assist = eventParticipantName(event, "assist");
  return `
    <article class="event-row season-goal-row">
      <div class="event-minute">${Number(event.minute || 0)}'</div>
      <div>
        <strong>${event.team === "opponent" ? "Gegentor" : "Tor"} · ${escapeHtml(scorer)}</strong>
        <p>${formatDate(match.date)} · ${escapeHtml(match.opponent)} · Endstand ${Number(match.goalsFor || 0)}:${Number(match.goalsAgainst || 0)}${assist ? ` · Assist: ${escapeHtml(assist)}` : ""}</p>
        <div class="event-tags">${(event.goalTypes || []).map((type) => `<span class="tag">${escapeHtml(goalTypeLabel(type))}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function renderStackedGoalTimingChart(container, buckets) {
  const total = buckets.reduce((sum, bucket) => sum + bucket.own + bucket.opponent, 0);
  if (!total) {
    container.innerHTML = emptySvg("Noch keine Tore nach Minuten erfasst.");
    return;
  }

  const width = 620;
  const rowHeight = 36;
  const margin = { top: 26, right: 28, bottom: 34, left: 96 };
  const height = Math.max(270, margin.top + margin.bottom + buckets.length * rowHeight);
  const max = Math.max(...buckets.map((bucket) => bucket.own + bucket.opponent), 1);
  const barMaxWidth = width - margin.left - margin.right - 68;
  const rows = buckets.map((bucket, index) => {
    const y = margin.top + index * rowHeight;
    const ownWidth = (bucket.own / max) * barMaxWidth;
    const opponentWidth = (bucket.opponent / max) * barMaxWidth;
    return `
      <text class="chart-label" x="${margin.left - 12}" y="${y + 18}" text-anchor="end">${escapeSvg(bucket.label)}</text>
      <rect x="${margin.left}" y="${y + 4}" width="${barMaxWidth}" height="18" rx="4" fill="#ede7dc" />
      <rect x="${margin.left}" y="${y + 4}" width="${ownWidth}" height="18" rx="4" fill="${colors[0]}" />
      <rect x="${margin.left + ownWidth}" y="${y + 4}" width="${opponentWidth}" height="18" rx="4" fill="${colors[1]}" />
      <text class="chart-value" x="${margin.left + ownWidth + opponentWidth + 8}" y="${y + 18}">${bucket.own}:${bucket.opponent}</text>
    `;
  }).join("");
  const legendY = height - 18;

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Tore nach Spielminute">
      ${rows}
      <g transform="translate(${margin.left}, ${legendY - 10})">
        <rect width="10" height="10" rx="2" fill="${colors[0]}" />
        <text class="chart-label" x="16" y="10">Tore</text>
        <rect x="86" width="10" height="10" rx="2" fill="${colors[1]}" />
        <text class="chart-label" x="102" y="10">Gegentore</text>
      </g>
    </svg>
  `;
}

function renderSeasonTeamOverview(team) {
  const items = [
    ["Tore", team.goals],
    ["Assists", team.assists],
    ["Abschlüsse", team.shots],
    ["Dribblingquote", `${formatNumber(team.dribbleSuccess)}%`],
    ["Flankenquote", `${formatNumber(team.crossAccuracy)}%`],
    ["Zweikämpfe", team.duelsWon],
    ["Balleroberungen", team.interceptions],
    ["Ballverluste", team.ballLosses],
  ];

  dom.seasonTeamOverview.innerHTML = items
    .map(
      ([label, value]) => `
        <div class="season-team-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderSeasonPlayerTable(filters) {
  const rows = state.players
    .map((player) => ({ player, aggregate: aggregatePlayerFiltered(player.id, filters) }))
    .filter((row) => row.aggregate.entries > 0)
    .sort((a, b) => b.aggregate.averageIndex - a.aggregate.averageIndex);

  if (!rows.length) {
    dom.seasonPlayerTable.innerHTML = `<tr><td colspan="9">Keine Spielerwerte für diese Filterauswahl.</td></tr>`;
    return;
  }

  dom.seasonPlayerTable.innerHTML = rows
    .map(
      ({ player, aggregate }) => `
        <tr>
          <td><strong>${playerNameLink(player)}</strong><br><span class="muted">#${player.number} · ${escapeHtml(player.position)}</span></td>
          <td>${aggregate.games}</td>
          <td>${aggregate.minutes}</td>
          <td>${formatNumber(aggregate.passAccuracy)}%</td>
          <td>${aggregate.dribblesCompleted}/${aggregate.dribblesAttempted}</td>
          <td>${aggregate.crossesCompleted}/${aggregate.crossesAttempted}</td>
          <td>${aggregate.goals}</td>
          <td>${aggregate.assists}</td>
          <td>${formatNumber(aggregate.averageIndex)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderSeasonDetailedAnalysis(filters) {
  const matches = filteredMatches(filters);
  if (!matches.length) {
    dom.seasonRadarGrid.innerHTML = `<div class="empty-state">Keine Spiele für diese Filterauswahl.</div>`;
    return;
  }

  const profile = aggregateTeamDetail(filters);
  dom.seasonRadarGrid.innerHTML = seasonRadarGroups(profile)
    .map(
      (group) => `
        <article class="season-radar-card">
          <div>
            <span class="eyebrow">${escapeHtml(group.eyebrow)}</span>
            <h3>${escapeHtml(group.title)}</h3>
            <p>${escapeHtml(group.description)}</p>
          </div>
          <div class="chart-box">${renderTeamRadarSvg(group.metrics, group.title)}</div>
          <div class="radar-value-list">
            ${group.metrics
              .map(
                (metric) => `
                  <div class="radar-value-item">
                    <span>${escapeHtml(metric.label)}${metric.lowerBetter ? " · niedriger ist besser" : ""}</span>
                    <strong>${escapeHtml(formatRadarMetricValue(metric))}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function seasonRadarGroups(profile) {
  return [
    {
      eyebrow: "Allgemeine Leistung",
      title: "Allgemeine Leistung",
      description: "Gesamtbild aus Ballbesitzqualität, Chancen, defensiver Stabilität und Abschlusswerten.",
      metrics: [
        radarMetric("Passquote", "Passquote", profile.passAccuracy, "%", 100),
        radarMetric("Zweikampfquote", "Duellquote", profile.duelQuote, "%", 100),
        radarMetric("Tore", "Tore", profile.goalsPerGame, "pro Spiel", 4),
        radarMetric("Expected Goals ohne Elfmeter", "xG oE", profile.nonPenaltyXgPer90, "xG/90", 3),
        radarMetric("Gegentore", "Gegentore", profile.goalsAgainstPerGame, "pro Spiel", 3, true),
        radarMetric("Expected Goals Gegner", "xGA", profile.opponentXgPerGame, "xG/Spiel", 3, true),
        radarMetric("Schüsse", "Schüsse", profile.shotsPerGame, "pro Spiel", 22),
        radarMetric("Schüsse aufs Tor", "SoT %", profile.shotsOnTargetRate, "%", 100),
      ],
    },
    {
      eyebrow: "Offensivarbeit",
      title: "Offensivarbeit",
      description: "Wie sauber das Team Angriffe vorbereitet, Druck erzeugt und in Abschlüsse kommt.",
      metrics: [
        radarMetric("Passquote", "Passquote", profile.passAccuracy, "%", 100),
        radarMetric("Erlittene Fouls", "Fouls erl.", profile.foulsWonPerGame, "pro Spiel", 18),
        radarMetric("Tore", "Tore", profile.goalsPerGame, "pro Spiel", 4),
        radarMetric("Expected Goals ohne Elfmeter", "xG oE", profile.nonPenaltyXgPer90, "xG/90", 3),
        radarMetric("Schüsse", "Schüsse", profile.shotsPerGame, "pro Spiel", 22),
        radarMetric("Schüsse aufs Tor", "SoT %", profile.shotsOnTargetRate, "%", 100),
        radarMetric("Dribblings", "Dribblings", profile.dribblesPerGame, "pro Spiel", 34),
        radarMetric("Angekommene Flanken", "Flanken %", profile.crossAccuracy, "%", 100),
      ],
    },
    {
      eyebrow: "Defensivarbeit",
      title: "Defensivarbeit",
      description: "Stabilität gegen den Ball, Pressingzugriff und wie viel Gefahr der Gegner entwickeln darf.",
      metrics: [
        radarMetric("Gegnerische Pässe im letzten Drittel", "Geg. Pässe 3/3", profile.opponentFinalThirdPassesPerGame, "pro Spiel", 90, true),
        radarMetric("Begangene Fouls", "Fouls", profile.foulsCommittedPerGame, "pro Spiel", 20, true),
        radarMetric("Gegentore", "Gegentore", profile.goalsAgainstPerGame, "pro Spiel", 3, true),
        radarMetric("Expected Goals Gegner", "xGA", profile.opponentXgPerGame, "xG/Spiel", 3, true),
        radarMetric("Ohne Gegentor", "Zu Null", profile.cleanSheets, "Spiele", Math.max(profile.games, 1)),
        radarMetric("Zweikampfquote", "Duellquote", profile.duelQuote, "%", 100),
        radarMetric("Gegnerische Pässe pro Defensivaktion", "PPDA", profile.ppda, "PPDA", 24, true),
        radarMetric("Ballgewinne", "Ballgewinne", profile.ballWinsPerGame, "pro Spiel", 28),
      ],
    },
  ];
}

function radarMetric(label, axisLabel, value, unit, max, lowerBetter = false) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const safeMax = Math.max(Number(max || 1), 1);
  const ratio = clampNumber(safeValue / safeMax, 0, 1);
  return {
    label,
    axisLabel,
    value: safeValue,
    unit,
    max: safeMax,
    lowerBetter,
    score: lowerBetter ? 1 - ratio : ratio,
  };
}

function renderTeamRadarSvg(metrics, title) {
  const width = 440;
  const height = 330;
  const center = { x: 220, y: 158 };
  const radius = 92;
  const angleFor = (index) => (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
  const pointFor = (index, scale) => {
    const angle = angleFor(index);
    return {
      x: center.x + Math.cos(angle) * radius * scale,
      y: center.y + Math.sin(angle) * radius * scale,
    };
  };

  const rings = [0.25, 0.5, 0.75, 1]
    .map((scale) => {
      const points = metrics.map((_, index) => pointFor(index, scale)).map((point) => `${point.x},${point.y}`).join(" ");
      return `<polygon points="${points}" fill="none" stroke="#e5ded2" />`;
    })
    .join("");

  const axisLines = metrics
    .map((metric, index) => {
      const end = pointFor(index, 1.18);
      const labelAnchor = end.x < center.x - 12 ? "end" : end.x > center.x + 12 ? "start" : "middle";
      return `
        <line x1="${center.x}" y1="${center.y}" x2="${end.x}" y2="${end.y}" stroke="#ded6ca" />
        <text class="axis-label" x="${end.x}" y="${end.y + 4}" text-anchor="${labelAnchor}">${escapeSvg(metric.axisLabel)}</text>
      `;
    })
    .join("");

  const radarPoints = metrics.map((metric, index) => pointFor(index, metric.score)).map((point) => `${point.x},${point.y}`).join(" ");
  const dots = metrics
    .map((metric, index) => {
      const point = pointFor(index, metric.score);
      return `<circle cx="${point.x}" cy="${point.y}" r="3.6" fill="${colors[index % colors.length]}" />`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)} Radar">
      ${rings}
      ${axisLines}
      <polygon points="${radarPoints}" fill="${colors[0]}30" stroke="${colors[0]}" stroke-width="2.5" />
      ${dots}
    </svg>
  `;
}

function formatRadarMetricValue(metric) {
  if (metric.unit === "%") return `${formatNumber(metric.value)}%`;
  if (metric.unit === "PPDA") return formatNumber(metric.value);
  return `${formatNumber(metric.value)} ${metric.unit}`;
}

function renderAnalyst() {
  const filters = normalizeFilters(state.analystFilters);
  const isTeamFocus = state.analystPlayer === "team";
  const player = isTeamFocus ? null : getPlayer(state.analystPlayer) || state.players[0];
  if (!player && !isTeamFocus) {
    dom.analystMetrics.innerHTML = "";
    dom.teamAnalystReport.innerHTML = `<div class="empty-state">Lege zuerst Spieler an.</div>`;
    dom.playerAnalystReport.innerHTML = "";
    dom.analystRecommendations.innerHTML = "";
    dom.analystAssignments.innerHTML = "";
    return;
  }

  state.analystPlayer = isTeamFocus ? "team" : player.id;
  dom.analystPlayerSelect.value = state.analystPlayer;
  dom.analystVenueFilter.value = filters.venue;
  dom.analystCompetitionFilter.value = filters.competition;

  const matches = filteredMatches(filters);
  const team = aggregateTeamFiltered(filters);
  const filteredTrainingRows = filteredTrainings(state.trainingFilters);
  const trainingSummaryAll = trainingSeasonSummary(filteredTrainingRows);
  const playerAggregate = player ? aggregatePlayerFiltered(player.id, filters) : null;
  const playerTraining = player ? playerTrainingSummary(player.id, filteredTrainingRows) : null;
  const filteredMatchIds = new Set(matches.map((match) => match.id));
  const playerEntries = player
    ? playerStatsWithMatches(player.id)
        .filter((entry) => filteredMatchIds.has(entry.match.id))
        .sort((a, b) => a.match.date.localeCompare(b.match.date))
    : [];
  const trend = trendFromEntries(playerEntries);
  const goalsPerMatch = matches.length ? team.goals / matches.length : 0;
  const lossesPerEntry = team.entries ? team.ballLosses / team.entries : 0;
  const matchAvailability = matchAvailabilitySeasonSummary(matches);

  dom.analystMetrics.innerHTML = [
    { label: "Filter", value: matches.length, hint: filterLabel(filters) },
    { label: "Team-Passquote", value: `${formatNumber(team.passAccuracy)}%`, hint: `${team.passesCompleted}/${team.passesAttempted} Pässe` },
    { label: "Trainingsteilnahme", value: `${formatNumber(trainingSummaryAll.attendanceRate)}%`, hint: trainingFilterLabel(state.trainingFilters) },
    isTeamFocus
      ? { label: "Mannschaft", value: formatNumber(team.averageIndex), hint: `${team.goals} Tore · ${team.assists} Assists` }
      : { label: `${player.name}`, value: formatNumber(playerAggregate.averageIndex), hint: `Ø Index · ${trend.delta >= 0 ? "+" : ""}${formatNumber(trend.delta)} Trend` },
  ]
    .map(
      (item) => `
        <article class="metric-card ${item.tone || ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.hint)}</p>
        </article>
      `,
    )
    .join("");

  dom.teamAnalystReport.innerHTML = analystCards([...teamAnalystCards(team, matches, lossesPerEntry), ...trainingAnalystCards(trainingSummaryAll)]);
  if (isTeamFocus) {
    dom.playerAnalystTitle.textContent = "Gesamte Mannschaft · Analyse";
    dom.playerAnalystReport.innerHTML = analystCards(teamFocusAnalystCards(team, matches, trainingSummaryAll, matchAvailability, goalsPerMatch));
    dom.analystRecommendations.innerHTML = analystActions(teamFocusRecommendations(team, matches, trainingSummaryAll, matchAvailability, lossesPerEntry).slice(0, 5));
    dom.analystAssignments.innerHTML = analystActions(teamVideoAssignments(team, matches, trainingSummaryAll));
    return;
  }
  dom.playerAnalystTitle.innerHTML = `${playerNameLink(player)} · Analyse`;
  dom.playerAnalystReport.innerHTML = analystCards([...playerAnalystCards(player, playerAggregate, trend), ...playerTrainingAnalystCards(player, playerTraining)]);
  dom.analystRecommendations.innerHTML = analystActions([...trainingRecommendations(team, player, playerAggregate, trend), ...trainingAnalystActions(trainingSummaryAll, player, playerTraining)].slice(0, 5));
  dom.analystAssignments.innerHTML = analystActions(videoAssignments(team, player, playerAggregate, trend));
}

function teamAnalystCards(team, matches, lossesPerEntry) {
  const cards = [];
  if (!matches.length || !team.entries) {
    return [{ title: "Noch keine belastbare Datenbasis", text: "Für diese Filterauswahl liegen noch keine Spielerwerte vor. Erfasse mindestens ein Spiel, damit der Analyst Muster erkennen kann.", tone: "warning" }];
  }

  cards.push({
    title: team.passAccuracy >= 82 ? "Aufbau wirkt stabil" : team.passAccuracy >= 74 ? "Aufbau ist brauchbar, aber noch schwankend" : "Passsicherheit ist der erste Hebel",
    text: `Die Mannschaft liegt bei ${formatNumber(team.passAccuracy)}% Passquote. ${team.passAccuracy >= 82 ? "Das spricht für klare Anschlussoptionen und gute Abstände." : team.passAccuracy >= 74 ? "Gegen Druckphasen sollte die Ballzirkulation noch ruhiger werden." : "Zu viele Ballbesitze enden früh, dadurch entstehen unnötige Umschaltmomente."}`,
    tone: team.passAccuracy >= 82 ? "positive" : team.passAccuracy >= 74 ? "warning" : "critical",
  });

  cards.push({
    title: matches.length ? `${formatNumber(team.goals / matches.length)} Tore pro Spiel` : "Offensivwert offen",
    text: team.goals / matches.length >= 2 ? "Die Abschlussproduktion ist gut. Jetzt lohnt sich der Fokus auf Qualität der letzten Aktion statt nur auf Volumen." : "Die Offensive braucht klarere Wege in den Strafraum: Tiefenläufe, Rückraumstaffelung und bessere Besetzung der Box.",
    tone: team.goals / matches.length >= 2 ? "positive" : "warning",
  });

  cards.push({
    title: lossesPerEntry <= 5 ? "Restverteidigung bekommt Hilfe durch Ballsicherheit" : "Ballverluste erzeugen Risiko",
    text: `Im Schnitt entstehen ${formatNumber(lossesPerEntry)} Ballverluste pro Spieler-Auswertung. ${lossesPerEntry <= 5 ? "Das ist kontrollierbar, solange die Absicherung hinter dem Ball stimmt." : "Hier sollte die Mannschaft nach riskanten Aktionen sofort enger sichern."}`,
    tone: lossesPerEntry <= 5 ? "positive" : "warning",
  });

  return cards;
}

function teamFocusAnalystCards(team, matches, trainingSummary, matchAvailability, goalsPerMatch) {
  if (!matches.length || !team.entries) {
    return [{ title: "Mannschaftsanalyse offen", text: "Für die gesamte Mannschaft liegen in dieser Filterauswahl noch keine Spielwerte vor.", tone: "warning" }];
  }

  return [
    {
      title: `${formatNumber(team.averageIndex)} Ø Teamindex`,
      text: `Über ${matches.length} Spiele liegt die Mannschaft bei ${formatNumber(team.passAccuracy)}% Passquote und ${formatNumber(goalsPerMatch)} Toren pro Spiel.`,
      tone: team.averageIndex >= 85 ? "positive" : team.averageIndex >= 72 ? "warning" : "critical",
    },
    {
      title: `${matchAvailability.confirmed} Zusagen im Spieltagsfilter`,
      text: `Unentschuldigt: ${matchAvailability.unexcused} (${formatNumber(matchAvailability.unexcusedRate)}%). Verletzt oder abgesagt: ${matchAvailability.cancelled}.`,
      tone: matchAvailability.unexcused ? "critical" : "positive",
    },
    {
      title: `${formatNumber(trainingSummary.attendanceRate)}% Trainingsteilnahme`,
      text: `${trainingSummary.confirmed} Zusagen, ${trainingSummary.cancelled} Absagen und ${trainingSummary.ratingCount} Trainingsbewertungen in der aktuellen Trainingsauswahl.`,
      tone: trainingSummary.attendanceRate >= 80 ? "positive" : trainingSummary.attendanceRate >= 65 ? "warning" : "critical",
    },
  ];
}

function teamFocusRecommendations(team, matches, trainingSummary, matchAvailability, lossesPerEntry) {
  const actions = [];
  if (team.passAccuracy < 78) {
    actions.push(["Mannschaft: Passsicherheit", "Im nächsten Training Spielformen mit klarer Anschlussoption und maximal zwei Kontakten einbauen."]);
  } else {
    actions.push(["Mannschaft: Tempo nach Seitenwechsel", "Passsicherheit nutzen und nach Verlagerung gezielt Tiefenläufe oder Cutbacks triggern."]);
  }
  if (lossesPerEntry > 5) {
    actions.push(["Restverteidigung absichern", "Nach Ballverlusten die Staffelung hinter dem Ball prüfen und klare Gegenpressing-Kommandos setzen."]);
  }
  if (matchAvailability.unexcused) {
    actions.push(["Verfügbarkeit verbindlich klären", "Unentschuldigte Fehlzeiten vor der nächsten Einheit direkt mit den Spielern besprechen."]);
  }
  if (trainingSummary.attendanceRate < 75) {
    actions.push(["Trainingsrhythmus stabilisieren", "Absagegründe bündeln und wiederkehrende Muster in der Wochenplanung berücksichtigen."]);
  }
  if (!actions.length) {
    actions.push(["Stärken stabilisieren", "Die aktuelle Mannschaftsbasis ist solide: Standards, letzte Aktion und Rückraumstaffelung gezielt schärfen."]);
  }
  return actions;
}

function teamVideoAssignments(team, matches, trainingSummary) {
  return [
    ["Mannschaftsstruktur im Aufbau", "Alle Spielaufbauten markieren: Abstände, Anschlussoptionen und Absicherung nach Ballverlust bewerten."],
    ["Box-Besetzung und letzte Aktion", "Bei jedem Angriff zählen: erster Pfosten, Elfmeterpunkt, zweiter Pfosten und Rückraum besetzt?"],
    ["Trainingsübertrag", `Nach dem nächsten Training mit ${formatNumber(trainingSummary.attendanceRate)}% Teilnahme prüfen: Welche Inhalte waren im folgenden Spiel sichtbar?`],
  ];
}

function playerAnalystCards(player, aggregate, trend) {
  if (!aggregate.entries) {
    return [{ title: "Noch keine Spielerwerte", text: `${player.name} hat in dieser Auswahl noch keine erfassten Statistiken. Nach der nächsten Datenerfassung kann der Analyst Stärken, Risiken und Trend sauber bewerten.`, tone: "warning" }];
  }

  const cards = [];
  cards.push({
    title: trend.delta >= 6 ? "Formkurve zeigt klar nach oben" : trend.delta <= -6 ? "Formkurve fällt ab" : "Form ist weitgehend stabil",
    text: `Der Trend der letzten Spiele liegt bei ${trend.delta >= 0 ? "+" : ""}${formatNumber(trend.delta)} Indexpunkten. Ø Index: ${formatNumber(aggregate.averageIndex)}, Ø Bewertung: ${formatNumber(aggregate.averageRating)}.`,
    tone: trend.delta >= 6 ? "positive" : trend.delta <= -6 ? "critical" : "warning",
  });

  cards.push({
    title: aggregate.passAccuracy >= 82 ? "Sicher im Passspiel" : "Passspiel als Entwicklungsfeld",
    text: `${formatNumber(aggregate.passAccuracy)}% Passquote bei ${aggregate.passesAttempted} Pässen. ${aggregate.passAccuracy >= 82 ? "Er kann als verlässlicher Verbindungsspieler eingeplant werden." : "Unter Druck sollte die Vororientierung und Anschlussaktion gezielt beobachtet werden."}`,
    tone: aggregate.passAccuracy >= 82 ? "positive" : "warning",
  });

  cards.push({
    title: aggregate.goals + aggregate.assists > 0 ? "Direkter Einfluss auf Torchancen" : "Mehr Wirkung im letzten Drittel suchen",
    text: `${aggregate.goals} Tore und ${aggregate.assists} Assists. ${aggregate.goals + aggregate.assists > 0 ? "Die Aktionen haben bereits Output; wichtig ist die Wiederholbarkeit." : "Für mehr Output braucht es klarere Abschluss- oder Vorbereitungszonen."}`,
    tone: aggregate.goals + aggregate.assists > 0 ? "positive" : "warning",
  });

  return cards;
}

function trainingAnalystCards(summary) {
  if (!state.trainings?.length) {
    return [{ title: "Trainingsdaten fehlen noch", text: "Lege Trainings mit Verfügbarkeiten und Bewertungen an, damit Belastung, Teilnahme und Ausfallmuster bewertet werden können.", tone: "warning" }];
  }
  return [
    {
      title: summary.attendanceRate >= 80 ? "Trainingsbeteiligung ist stabil" : summary.attendanceRate >= 65 ? "Trainingsbeteiligung beobachten" : "Trainingsverfügbarkeit ist kritisch",
      text: `Die Teilnahmequote liegt bei ${formatNumber(summary.attendanceRate)}%. Unentschuldigtes Fehlen: ${summary.unexcused} (${formatNumber(summary.unexcusedRate)}%). ${summary.injured ? `${summary.injured} verletzte Absagen sollten in der Belastungssteuerung gesondert betrachtet werden.` : "Verletzte Absagen sind aktuell kein dominantes Muster."}`,
      tone: summary.unexcused ? "critical" : summary.attendanceRate >= 80 ? "positive" : summary.attendanceRate >= 65 ? "warning" : "critical",
    },
  ];
}

function playerTrainingAnalystCards(player, summary) {
  if (!summary.total) {
    return [{ title: "Noch kein Trainingsprofil", text: `${player.name} hat noch keine Trainingshistorie. Nach den ersten Zu-/Absagen und Bewertungen entsteht ein belastbares Bild.`, tone: "warning" }];
  }
  return [
    {
      title: `${formatNumber(summary.attendanceRate)}% Trainingsteilnahme`,
      text: `${player.name} war bei ${summary.confirmed} von ${summary.total} erfassten Trainings zugesagt. Unentschuldigt: ${summary.unexcused} (${formatNumber(summary.unexcusedRate)}%). Ø Trainingsbewertung: ${formatNumber(summary.averageRating)}.`,
      tone: summary.unexcused ? "critical" : summary.attendanceRate >= 80 ? "positive" : summary.attendanceRate >= 65 ? "warning" : "critical",
    },
  ];
}

function trainingAnalystActions(summary, player, playerTraining) {
  const actions = [];
  if (summary.attendanceRate < 75) {
    actions.push(["Trainingsverfügbarkeit klären", "Absagegründe bündeln und vor der Wochenplanung prüfen: wiederholen sich Schule, Arbeit, Krankheit oder Verletzung?"]);
  }
  if (summary.injured >= 2) {
    actions.push(["Belastungssteuerung priorisieren", "Verletzte Absagen markieren und für Rückkehrer eigene Belastungsgruppen im Trainingsplan anlegen."]);
  }
  if (summary.unexcused) {
    actions.push(["Unentschuldigtes Fehlen direkt klären", "Unentschuldigte Abwesenheiten separat nachhalten und vor der nächsten Trainingswoche verbindlich mit den Spielern besprechen."]);
  }
  if (playerTraining.total && playerTraining.attendanceRate < 70) {
    actions.push([`${player.name}: Trainingsrhythmus sichern`, "Kurzgespräch planen: Absagegründe, Belastung und Verfügbarkeit klären, bevor Rollen- oder Leistungsurteile gezogen werden."]);
  }
  if (playerTraining.ratingCount && playerTraining.averageRating < 6.5) {
    actions.push([`${player.name}: Trainingsqualität`, "Nach dem Training zwei konkrete Aktionen notieren: Entscheidungsverhalten und Intensität getrennt bewerten."]);
  }
  return actions;
}

function trainingRecommendations(team, player, aggregate, trend) {
  const recommendations = [];
  if (team.passAccuracy < 78) {
    recommendations.push(["Passrhythmus unter Gegnerdruck", "Rondo mit Anschlussaktion: nach jedem Klatschball sofort dritte-Mann-Lösung oder Tiefenpass suchen."]);
  } else {
    recommendations.push(["Positionsspiel mit Tempo-Wechsel", "Aufbauqualität halten, aber gezielt Tempoverschärfung nach Seitenverlagerung trainieren."]);
  }

  if (aggregate.entries && aggregate.passAccuracy < 78) {
    recommendations.push([`${player.name}: Vororientierung`, "Video-Clips vor Ballannahme stoppen: Schulterblick, Körperstellung und erste Anschlussoption bewerten."]);
  }

  if (aggregate.dribblesAttempted > 0 && aggregate.dribbleSuccess < 55) {
    recommendations.push([`${player.name}: 1-gegen-1 Entscheidung`, "Dribbling nur mit Anschlussplan: Gegner binden, dann Passfenster oder Abschlusszone erkennen."]);
  }

  if (trend.delta < -6) {
    recommendations.push([`${player.name}: Belastung und Rolle prüfen`, "Die letzten Spiele vergleichen: Position, Gegnerdruck und Aufgabenprofil checken, bevor nur technische Fehler bewertet werden."]);
  }

  if (recommendations.length < 3) {
    recommendations.push(["Letztes Drittel", "Abläufe über Außen mit Rückraumstaffelung trainieren: Flanke, Cutback und zweite Welle klar besetzen."]);
  }

  return recommendations.slice(0, 4);
}

function videoAssignments(team, player, aggregate, trend) {
  const assignments = [
    ["Umschaltmomente nach Ballverlust", "Alle Ballverluste markieren: war die Mannschaft hinter dem Ball abgesichert oder offen?"],
    ["Box-Besetzung", "Bei jedem Angriff über außen zählen: erster Pfosten, Elfmeterpunkt, zweiter Pfosten, Rückraum."],
  ];

  if (aggregate.entries) {
    assignments.unshift([`${player.name}: beste und schwächste 5 Aktionen`, "Je fünf Szenen sammeln und vergleichen: Auslöser, Entscheidung, Technik, Anschlusswirkung."]);
  }

  if (team.crossesAttempted > 0 && team.crossAccuracy < 38) {
    assignments.push(["Flankenqualität", "Nicht nur Trefferquote bewerten: Druck auf Flankengeber, Laufwege in der Box und Timing getrennt notieren."]);
  }

  return assignments.slice(0, 4);
}

function analystCards(cards) {
  return cards
    .map(
      (card) => `
        <article class="analyst-card ${card.tone || ""}">
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");
}

function analystActions(actions) {
  return actions
    .map(
      ([title, text], index) => `
        <article class="analyst-action">
          <span class="analyst-number">${index + 1}</span>
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(text)}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderCalendar() {
  const month = normalizeCalendarMonth(state.calendarMonth) || calendarMonthFromDate(isoDate(new Date()));
  state.calendarMonth = month;
  const selectedDate = normalizeIsoDate(state.calendarSelectedDate) || `${month}-01`;
  state.calendarSelectedDate = selectedDate;
  const mode = state.calendarViewMode === "list" ? "list" : "month";
  const timelineFilter = calendarTimelineFilters.includes(state.calendarTimelineFilter) ? state.calendarTimelineFilter : "upcoming";
  state.calendarTimelineFilter = timelineFilter;
  const items = calendarItems().filter((item) => calendarMonthFromDate(item.date) === month);
  const timelineItems = calendarTimelineItems(timelineFilter);

  dom.calendarMonthTitle.textContent = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(calendarMonthDate(month));
  dom.calendarViewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.calendarView === mode));
  dom.calendarTimelineFilter.value = timelineFilter;
  dom.calendarListTitle.textContent = timelineFilter === "past" ? "Vergangene Termine" : "Anstehende Termine";
  dom.calendarMonthPane.style.display = mode === "month" ? "" : "none";
  dom.calendarListPane.style.display = mode === "list" ? "" : "none";
  dom.calendarDate.value = selectedDate;
  renderCalendarEventTypeFields();
  renderCalendarOverview(timelineFilter, timelineItems);
  renderCalendarGrid(month, items);
  renderCalendarList(timelineItems, timelineFilter);
}

function renderCalendarOverview(filter, items) {
  const topItems = items.slice(0, 5);
  dom.calendarTimelineTitle.textContent = filter === "past" ? "Letzte 5 vergangene Termine" : "Nächste 5 anstehende Termine";
  dom.calendarOverviewList.innerHTML = topItems.length
    ? topItems.map(calendarListItemHtml).join("")
    : `<div class="empty-state">Keine ${filter === "past" ? "vergangenen" : "anstehenden"} Termine gefunden.</div>`;
  bindCalendarItemActions(dom.calendarOverviewList);
}

function renderCalendarGrid(month, items) {
  const [year, monthIndex] = month.split("-").map(Number);
  const first = new Date(year, monthIndex - 1, 1);
  const daysInMonth = new Date(year, monthIndex, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7;
  const cells = [];
  const itemsByDate = groupCalendarItemsByDate(items);

  ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].forEach((day) => {
    cells.push(`<div class="calendar-weekday">${day}</div>`);
  });
  for (let index = 0; index < startOffset; index += 1) {
    cells.push(`<div class="calendar-day is-empty"></div>`);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${month}-${String(day).padStart(2, "0")}`;
    const dayItems = itemsByDate.get(date) || [];
    cells.push(`
      <div class="calendar-day ${date === state.calendarSelectedDate ? "is-selected" : ""}" data-calendar-day="${date}" role="button" tabindex="0">
        <div class="calendar-day-head">
          <strong>${day}</strong>
          <span>${dayItems.length || ""}</span>
        </div>
        <div class="calendar-day-items">
          ${dayItems.slice(0, 4).map(calendarDayItemHtml).join("")}
          ${dayItems.length > 4 ? `<em>+${dayItems.length - 4} weitere</em>` : ""}
        </div>
      </div>
    `);
  }
  dom.calendarGrid.innerHTML = cells.join("");
  dom.calendarGrid.querySelectorAll("[data-calendar-day]").forEach((cell) => {
    const selectDay = () => {
      state.calendarSelectedDate = cell.dataset.calendarDay;
      persist();
      renderCalendar();
    };
    cell.addEventListener("click", (event) => {
      if (event.target.closest("[data-calendar-open]")) return;
      selectDay();
    });
    cell.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectDay();
    });
  });
  bindCalendarItemActions(dom.calendarGrid);
}

function renderCalendarList(items, filter = "upcoming") {
  dom.calendarList.innerHTML = items.length
    ? items.map(calendarListItemHtml).join("")
    : `<div class="empty-state">Keine ${filter === "past" ? "vergangenen" : "anstehenden"} Termine gefunden.</div>`;
  bindCalendarItemActions(dom.calendarList);
}

function calendarDayItemHtml(item) {
  return `
    <button class="calendar-item ${item.kind}" data-calendar-open="${item.kind}" data-calendar-id="${item.id}" type="button">
      <span>${escapeHtml(item.startTime || "")}</span>
      <strong>${escapeHtml(item.title)}</strong>
    </button>
  `;
}

function calendarListItemHtml(item) {
  return `
    <article class="calendar-list-item ${item.kind}">
      <div>
        <span class="eyebrow">${escapeHtml(item.typeLabel)} · ${formatDate(item.date)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml([item.startTime && `${item.startTime}${item.endTime ? ` - ${item.endTime}` : ""}`, item.location, item.meta].filter(Boolean).join(" · "))}</p>
      </div>
      <div class="card-actions">
        ${item.kind === "event" ? `<button class="danger-button" data-delete-calendar-event="${item.id}" type="button">Entfernen</button>` : `<button class="ghost-button" data-calendar-open="${item.kind}" data-calendar-id="${item.id}" type="button">Öffnen</button>`}
      </div>
    </article>
  `;
}

function bindCalendarItemActions(root) {
  root.querySelectorAll("[data-calendar-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openCalendarItem(button.dataset.calendarOpen, button.dataset.calendarId);
    });
  });
  root.querySelectorAll("[data-delete-calendar-event]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openDeleteConfirmation("calendarEvent", button.dataset.deleteCalendarEvent);
    });
  });
}

function openCalendarItem(kind, id) {
  if (kind === "training") openTrainingDetail(id);
  if (kind === "match") openMatchDetail(id);
  if (kind === "event") {
    const item = getCalendarEvent(id);
    if (item) {
      state.calendarSelectedDate = item.date;
      state.calendarMonth = calendarMonthFromDate(item.date);
      persist();
      renderCalendar();
    }
    setView("calendar");
  }
}

function renderCalendarEventTypeFields() {
  const type = dom.calendarCreateType.value || "training";
  document.querySelectorAll(".calendar-type-fields").forEach((section) => {
    section.style.display = "none";
  });
  document.querySelectorAll(".calendar-training-field").forEach((section) => {
    section.style.display = type === "training" ? "" : "none";
  });
  const activeClass = type === "training" ? ".calendar-training-fields" : type === "match" ? ".calendar-match-fields" : ".calendar-event-fields";
  document.querySelectorAll(activeClass).forEach((section) => {
    section.style.display = "grid";
  });
  dom.calendarRepeatUntilWrap.classList.toggle("is-hidden", type !== "training" || !dom.calendarTrainingRepeat.checked);
  dom.calendarTitle.placeholder = type === "match" ? "z. B. SV Nord" : type === "event" ? "z. B. Elternabend, Teammeeting" : "z. B. Training Schwerpunkt Pressing";
}

function handleCalendarSubmit(event) {
  event.preventDefault();
  const type = dom.calendarCreateType.value || "training";
  const date = normalizeIsoDate(dom.calendarDate.value);
  if (!date) return;
  state.calendarSelectedDate = date;
  state.calendarMonth = calendarMonthFromDate(date);

  if (type === "training") {
    const dates = dom.calendarTrainingRepeat.checked ? weeklyDatesUntil(date, dom.calendarRepeatUntil.value) : [date];
    dates.forEach((trainingDate, index) => {
      const id = `t${Date.now()}-${index}`;
      state.trainings.push(normalizeTraining({
        id,
        date: trainingDate,
        startTime: dom.calendarStartTime.value || "18:30",
        endTime: dom.calendarEndTime.value || "20:00",
        meetTime: dom.calendarMeetTime.value || "",
        location: dom.calendarLocation.value.trim() || "Trainingsplatz",
        type: dom.calendarTrainingType.value,
        priority: dom.calendarTrainingPriority.value,
        intensity: dom.calendarTrainingIntensity.value,
        topic: dom.calendarTitle.value.trim() || dom.calendarTrainingType.value,
        coachNote: dom.calendarNote.value.trim(),
        availability: state.players.map((player) => ({ playerId: player.id, status: "Offen", reason: "", note: "" })),
        ratings: [],
        groups: [{ id: `${id}-group-1`, name: "Gruppe 1", playerIds: [] }],
        plan: { warmup: "", main: "", game: "", coachingPoints: "" },
      }, {}, state.players));
    });
  }

  if (type === "match") {
    const id = `m${Date.now()}`;
    const opponent = dom.calendarMatchOpponent.value.trim() || dom.calendarTitle.value.trim();
    if (!opponent) return;
    state.matches.push(normalizeMatch({
      id,
      date,
      opponent,
      venue: dom.calendarMatchVenue.value,
      competition: normalizeCompetition(dom.calendarMatchCompetition.value),
      goalsFor: 0,
      goalsAgainst: 0,
      formation: "4-3-3",
      lineup: [],
    }, {}, state.players, state.stats));
  }

  if (type === "event") {
    state.calendarEvents.push(normalizeCalendarEvent({
      id: `e${Date.now()}`,
      date,
      startTime: dom.calendarStartTime.value,
      endTime: dom.calendarEndTime.value,
      title: dom.calendarTitle.value.trim() || dom.calendarEventType.value,
      type: dom.calendarEventType.value,
      location: dom.calendarLocation.value.trim(),
      note: dom.calendarNote.value.trim(),
    }));
  }

  dom.calendarEventForm.reset();
  dom.calendarDate.value = date;
  dom.calendarCreateType.value = type;
  persist();
  renderAll();
  setView("calendar");
}

function shiftCalendarMonth(delta) {
  const current = calendarMonthDate(state.calendarMonth);
  current.setMonth(current.getMonth() + delta);
  state.calendarMonth = calendarMonthFromDate(isoDate(current));
  state.calendarSelectedDate = `${state.calendarMonth}-01`;
  persist();
  renderCalendar();
}

function calendarItems(sourceState = state) {
  const matches = (sourceState.matches || []).map((match) => ({
    id: match.id,
    kind: "match",
    date: match.date,
    startTime: match.startTime || "",
    endTime: "",
    title: match.opponent,
    typeLabel: "Spiel",
    location: match.venue || "",
    meta: `${match.competition || "Spiel"} · ${Number(match.goalsFor || 0)}:${Number(match.goalsAgainst || 0)}`,
  }));
  const trainings = (sourceState.trainings || []).map((training) => ({
    id: training.id,
    kind: "training",
    date: training.date,
    startTime: training.startTime || "",
    endTime: training.endTime || "",
    title: training.topic || training.type,
    typeLabel: "Training",
    location: training.location || "",
    meta: `${training.type} · ${training.intensity} Intensität`,
  }));
  const events = (sourceState.calendarEvents || []).map((item) => ({
    id: item.id,
    kind: "event",
    date: item.date,
    startTime: item.startTime || "",
    endTime: item.endTime || "",
    title: item.title,
    typeLabel: item.type || "Event",
    location: item.location || "",
    meta: item.note || "",
  }));
  return [...matches, ...trainings, ...events]
    .filter((item) => normalizeIsoDate(item.date))
    .sort(calendarItemSortAsc);
}

function calendarTimelineItems(filter = "upcoming") {
  const today = isoDate(new Date());
  const items = calendarItems();
  if (filter === "past") {
    return items
      .filter((item) => item.date < today)
      .sort((a, b) => calendarItemSortAsc(b, a));
  }
  const upcoming = items
    .filter((item) => item.date >= today)
    .sort(calendarItemSortAsc);
  return upcoming.length ? upcoming : items.sort(calendarItemSortAsc);
}

function calendarItemSortAsc(a, b) {
  return a.date.localeCompare(b.date) || String(a.startTime || "").localeCompare(String(b.startTime || "")) || a.title.localeCompare(b.title);
}

function groupCalendarItemsByDate(items) {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(item.date)) map.set(item.date, []);
    map.get(item.date).push(item);
  });
  return map;
}

function normalizeCalendarEvent(event) {
  const date = normalizeIsoDate(event.date);
  if (!date) return null;
  return {
    id: event.id || `e${Date.now()}`,
    date,
    startTime: String(event.startTime || "").trim(),
    endTime: String(event.endTime || "").trim(),
    title: String(event.title || "Event").trim(),
    type: calendarEventTypes.includes(event.type) ? event.type : "Sonstiges",
    location: String(event.location || "").trim(),
    note: String(event.note || "").trim(),
  };
}

function weeklyDatesUntil(startDate, endDate) {
  const start = parseIsoDate(startDate);
  const end = parseIsoDate(endDate);
  if (!start || !end || end < start) return [startDate];
  const dates = [];
  const cursor = new Date(start);
  while (cursor <= end && dates.length < 80) {
    dates.push(isoDate(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }
  return dates;
}

function normalizeCalendarMonth(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}$/.test(text) ? text : "";
}

function calendarMonthFromDate(value) {
  const date = normalizeIsoDate(value);
  return date ? date.slice(0, 7) : "";
}

function calendarMonthDate(month) {
  const normalized = normalizeCalendarMonth(month) || calendarMonthFromDate(isoDate(new Date()));
  const [year, monthIndex] = normalized.split("-").map(Number);
  return new Date(year, monthIndex - 1, 1, 12);
}

function renderTraining() {
  renderTrainingFormMode();
  renderTrainingFilterControls();
  renderTrainingPlayerGoals();
  const trainings = filteredTrainings(state.trainingFilters);
  if (!trainings.length) {
    dom.trainingList.innerHTML = `<div class="empty-state">Keine Trainings für diese Filterauswahl.</div>`;
    return;
  }

  dom.trainingList.innerHTML = trainings
    .map((training) => {
      const summary = trainingSummary(training);
      return `
        <article class="match-card training-card" data-open-training="${training.id}" role="button" tabindex="0" aria-label="Training am ${formatDate(training.date)} öffnen">
          <div>
            <h3>${escapeHtml(training.topic || training.type)}</h3>
            <div class="match-meta">
              <span class="tag">${formatDate(training.date)}</span>
              <span class="tag">${escapeHtml(training.startTime || "Zeit offen")} - ${escapeHtml(training.endTime || "offen")}</span>
              <span class="tag teal">${escapeHtml(training.type)}</span>
              <span class="tag">${escapeHtml(training.priority)}</span>
              <span class="tag amber">${escapeHtml(training.intensity)} Intensität</span>
              <span class="tag">${summary.confirmed} da</span>
              <span class="tag">${summary.cancelled} abgesagt</span>
              <span class="tag">${summary.injured} verletzt</span>
              <span class="tag danger">${summary.unexcused} unentschuldigt</span>
            </div>
          </div>
          <div>
            <div class="match-score">${summary.confirmed}/${state.players.length}</div>
            <div class="card-actions">
              <button class="ghost-button" data-edit-training="${training.id}" type="button">Bearbeiten</button>
              <button class="danger-button" data-delete-training="${training.id}" type="button">Entfernen</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  dom.trainingList.querySelectorAll("[data-edit-training]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      editTraining(button.dataset.editTraining);
    });
  });
  dom.trainingList.querySelectorAll("[data-delete-training]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openDeleteConfirmation("training", button.dataset.deleteTraining);
    });
  });
  dom.trainingList.querySelectorAll("[data-open-training]").forEach((card) => {
    card.addEventListener("click", () => openTrainingDetail(card.dataset.openTraining));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openTrainingDetail(card.dataset.openTraining);
    });
  });
}

function renderTrainingPlayerGoals() {
  if (!dom.trainingPlayerGoals) return;
  const players = state.players.slice().sort(sortByNumber);
  dom.trainingPlayerGoals.innerHTML = `
    <div class="training-goal-head">
      <div>
        <span class="eyebrow">Spielerziele</span>
        <h3>Individuelle Trainingsziele</h3>
      </div>
    </div>
    <div class="training-goal-list">
      ${players.length ? players.map(trainingGoalItemHtml).join("") : `<div class="empty-state small-empty">Noch keine Spieler angelegt.</div>`}
    </div>
  `;
}

function trainingGoalItemHtml(player) {
  const goal = player.trainingGoal || "Noch kein individuelles Trainingsziel hinterlegt.";
  return `
    <article class="training-goal-item">
      <div>
        ${playerAvatar(player)}
        <div>
          <strong>${playerNameLink(player)}</strong>
          <span>#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span>
        </div>
      </div>
      <p>${escapeHtml(goal)}</p>
    </article>
  `;
}

function renderTrainingStats() {
  renderTrainingFilterControls();
  const trainings = filteredTrainings(state.trainingFilters);
  const summary = trainingSeasonSummary(trainings);
  dom.trainingStatsMetrics.innerHTML = [
    { label: "Trainings", value: trainings.length, hint: trainingFilterLabel(state.trainingFilters) },
    { label: "Zusagen", value: summary.confirmed, hint: `${formatNumber(summary.attendanceRate)}% Teilnahmequote` },
    { label: "Absagen", value: summary.cancelled, hint: `${summary.injured} davon verletzt` },
    { label: "Unentschuldigt", value: summary.unexcused, hint: `${formatNumber(summary.unexcusedRate)}% aller möglichen Teilnahmen`, tone: "critical" },
    { label: "Ø Bewertung", value: formatNumber(summary.averageRating), hint: `${summary.ratingCount} Spielerbewertungen` },
  ]
    .map(
      (item) => `
        <article class="metric-card ${item.tone || ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.hint)}</p>
        </article>
      `,
    )
    .join("");

  dom.trainingAttendanceChart.innerHTML = trainingAttendanceChart(trainings);
  dom.trainingAbsenceReasons.innerHTML = absenceReasonRanking(trainings);
  dom.trainingStatsTable.innerHTML = state.players
    .slice()
    .sort(sortByNumber)
    .map((player) => trainingStatsRow(player, trainings))
    .join("");
}

function trainingStatsRow(player, trainings) {
  const summary = playerTrainingSummary(player.id, trainings);
  return `
    <tr>
      <td>${playerNameLink(player)}<br><span class="muted">#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span></td>
      <td>${summary.total}</td>
      <td>${summary.confirmed}</td>
      <td>${summary.cancelled}</td>
      <td>${summary.injured}</td>
      <td class="${summary.unexcused ? "critical-cell" : ""}">${summary.unexcused}</td>
      <td class="${summary.unexcused ? "critical-cell" : ""}">${formatNumber(summary.unexcusedRate)}%</td>
      <td>${formatNumber(summary.attendanceRate)}%</td>
      <td>${formatNumber(summary.averageRating)}</td>
      <td>${escapeHtml(summary.latestStatus || "Offen")}</td>
    </tr>
  `;
}

function metricCardHtml(item) {
  return `
    <article class="metric-card ${item.tone || ""}">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.hint || "")}</p>
    </article>
  `;
}

function renderInjuries() {
  renderInjuryFormMode();
  renderInjuryFilterControls();
  const filters = normalizeInjuryFilters(state.injuryFilters, state.players);
  const injuries = filteredInjuries(filters);
  const summary = injurySummary(state.injuries || []);

  dom.injurySummaryMetrics.innerHTML = [
    { label: "Offene Verletzungen", value: summary.open, hint: `${summary.affectedPlayers} Spieler betroffen`, tone: summary.open ? "critical" : "" },
    { label: "Reha / Aufbau", value: summary.rehab, hint: "Belastung aktiv steuern" },
    { label: "Ausgeheilt", value: summary.cleared, hint: "Historisch dokumentiert" },
    { label: "Ausfalltage", value: summary.days, hint: "Summe aus allen Zeiträumen" },
  ].map(metricCardHtml).join("");

  dom.injuryList.innerHTML = injuries.length
    ? injuries.map(injuryCardHtml).join("")
    : `<div class="empty-state">Keine Verletzungen passend zu diesen Filtern.</div>`;

  dom.injuryList.querySelectorAll("[data-edit-injury]").forEach((button) => {
    button.addEventListener("click", () => startInjuryEdit(button.dataset.editInjury));
  });
  dom.injuryList.querySelectorAll("[data-delete-injury]").forEach((button) => {
    button.addEventListener("click", () => openDeleteConfirmation("injury", button.dataset.deleteInjury));
  });
}

function renderInjuryFilterControls() {
  const filters = normalizeInjuryFilters(state.injuryFilters, state.players);
  dom.injuryPlayerFilter.innerHTML = [
    `<option value="all">Alle Spieler</option>`,
    ...state.players.slice().sort(sortByNumber).map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`),
  ].join("");
  dom.injuryStatusFilter.innerHTML = [
    `<option value="open">Offene Verletzungen</option>`,
    `<option value="all">Alle Status</option>`,
    ...injuryStatuses.map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`),
  ].join("");
  dom.injuryPlayerFilter.value = filters.player;
  dom.injuryStatusFilter.value = filters.status;
}

function filteredInjuries(filters = state.injuryFilters) {
  const normalized = normalizeInjuryFilters(filters, state.players);
  return (state.injuries || [])
    .filter((injury) => normalized.player === "all" || injury.playerId === normalized.player)
    .filter((injury) => normalized.status === "all" || (normalized.status === "open" ? injury.status !== "Ausgeheilt" : injury.status === normalized.status))
    .slice()
    .sort((a, b) => {
      const openDiff = Number(a.status === "Ausgeheilt") - Number(b.status === "Ausgeheilt");
      return openDiff || b.startDate.localeCompare(a.startDate);
    });
}

function injurySummary(injuries = []) {
  const open = openInjuries(injuries);
  return {
    total: injuries.length,
    open: open.length,
    rehab: injuries.filter((injury) => ["Reha", "Aufbautraining"].includes(injury.status)).length,
    cleared: injuries.filter((injury) => injury.status === "Ausgeheilt").length,
    affectedPlayers: new Set(open.map((injury) => injury.playerId)).size,
    days: injuries.reduce((sum, injury) => sum + injuryDays(injury), 0),
  };
}

function injuryCardHtml(injury) {
  const player = getPlayer(injury.playerId);
  const guidance = injuryGuidance(injury);
  return `
    <article class="injury-card ${injury.status === "Ausgeheilt" ? "" : "is-active"}">
      <div class="injury-card-head">
        <div>
          <span class="eyebrow">${escapeHtml(injury.status)}</span>
          <h3>${player ? playerNameLink(player) : "Unbekannter Spieler"} · ${escapeHtml(injury.type)}</h3>
          <div class="match-meta">
            <span class="tag danger">${escapeHtml(injury.bodyArea)}</span>
            <span class="tag amber">${escapeHtml(injury.severity)}</span>
            <span class="tag">${formatDate(injury.startDate)}${injury.endDate ? ` - ${formatDate(injury.endDate)}` : " - offen"}</span>
            <span class="tag">${injuryDays(injury)} Tage</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="ghost-button" data-edit-injury="${injury.id}" type="button">Bearbeiten</button>
          <button class="danger-button" data-delete-injury="${injury.id}" type="button">Entfernen</button>
        </div>
      </div>
      <div class="injury-advice-grid">
        <section>
          <span>Arbeitsdiagnose</span>
          <p>${escapeHtml(injury.diagnosis || guidance.diagnosis)}</p>
        </section>
        <section>
          <span>Mannschaftsarzt</span>
          <p>${escapeHtml(injury.doctorAssessment || guidance.doctor)}</p>
        </section>
        <section>
          <span>Physiotherapeut</span>
          <p>${escapeHtml(injury.physioAssessment || guidance.physio)}</p>
        </section>
        <section>
          <span>Reha / Belastung</span>
          <p>${escapeHtml(injury.rehabPlan || guidance.rehab)}</p>
        </section>
      </div>
      <div class="injury-footer">
        <span class="tag teal">Training: ${escapeHtml(injury.trainingLoad || guidance.trainingLoad)}</span>
        <span class="tag">Einsatz: ${escapeHtml(injury.returnGuidance || guidance.returnGuidance)}</span>
      </div>
      ${injury.note ? `<p class="profile-note">${escapeHtml(injury.note)}</p>` : ""}
      <p class="report-subline">Hinweis: Diese Einschätzung ist eine Trainerhilfe und ersetzt keine medizinische Freigabe.</p>
    </article>
  `;
}

function injuryGuidance(injury) {
  const load = suggestedTrainingLoad(injury);
  const maxMinutes = injury.severity === "Schwer"
    ? "nur nach Freigabe, zunächst Teileinsatz"
    : injury.severity === "Mittel"
    ? "15-30 Minuten im ersten Spiel, keine Belastungsspitzen"
    : "20-45 Minuten möglich, wenn die Belastungsreaktion unauffällig bleibt";
  const intensity = load === "Kein Training" || load === "Nur Reha" ? "keine Spielformen" : load === "Niedrig" ? "reduzierte Spielformen" : "kontrollierter Mannschaftsanschluss";
  return {
    diagnosis: `${injury.type} im Bereich ${injury.bodyArea}. Bei Schmerz, Schwellung oder Unsicherheit ärztlich abklären.`,
    doctor: `Belastung erst steigern, wenn Alltag, Laufbewegungen und Richtungswechsel beschwerdearm möglich sind. Warnzeichen eng kontrollieren.`,
    physio: `Schwerpunkt auf Beweglichkeit, Stabilität und stufenweisem Belastungsaufbau. Reaktion 24 Stunden nach Training prüfen.`,
    rehab: `${intensity}; Umfang schrittweise erhöhen und Zweikämpfe erst nach stabiler Reaktion zulassen.`,
    trainingLoad: load,
    returnGuidance: maxMinutes,
  };
}

function suggestedTrainingLoad(injury) {
  if (injury.status === "Ausgeheilt") return "Voll belastbar";
  if (injury.status === "Reha") return "Nur Reha";
  if (injury.status === "Aufbautraining") return injury.severity === "Schwer" ? "Niedrig" : "Niedrig bis mittel";
  if (injury.severity === "Schwer") return "Kein Training";
  if (injury.severity === "Mittel") return "Nur Reha";
  return "Niedrig";
}

function handleInjurySubmit(event) {
  event.preventDefault();
  const injuryDetails = normalizeInjury({
    id: editingInjuryId || `inj${Date.now()}`,
    playerId: dom.injuryPlayer.value,
    type: dom.injuryType.value,
    bodyArea: dom.injuryBodyArea.value,
    severity: dom.injurySeverity.value,
    status: dom.injuryStatus.value,
    startDate: dom.injuryStartDate.value,
    endDate: dom.injuryEndDate.value,
    diagnosis: dom.injuryDiagnosis.value,
    doctorAssessment: dom.injuryDoctorAssessment.value,
    physioAssessment: dom.injuryPhysioAssessment.value,
    rehabPlan: dom.injuryRehabPlan.value,
    trainingLoad: dom.injuryTrainingLoad.value,
    returnGuidance: dom.injuryReturnGuidance.value,
    note: dom.injuryNote.value,
  });
  if (!injuryDetails.playerId || !injuryDetails.startDate) return;

  if (editingInjuryId) {
    const index = state.injuries.findIndex((injury) => injury.id === editingInjuryId);
    if (index >= 0) state.injuries[index] = injuryDetails;
  } else {
    state.injuries.push(injuryDetails);
  }
  clearInjuryForm();
  reconcileScheduleWithInjuries();
  persist();
  renderAll();
}

function startInjuryEdit(injuryId) {
  const injury = state.injuries.find((item) => item.id === injuryId);
  if (!injury) return;
  editingInjuryId = injuryId;
  dom.injuryPlayer.value = injury.playerId;
  dom.injuryType.value = injury.type;
  dom.injuryBodyArea.value = injury.bodyArea;
  dom.injurySeverity.value = injury.severity;
  dom.injuryStatus.value = injury.status;
  dom.injuryStartDate.value = injury.startDate;
  dom.injuryEndDate.value = injury.endDate || "";
  dom.injuryDiagnosis.value = injury.diagnosis || "";
  dom.injuryDoctorAssessment.value = injury.doctorAssessment || "";
  dom.injuryPhysioAssessment.value = injury.physioAssessment || "";
  dom.injuryRehabPlan.value = injury.rehabPlan || "";
  dom.injuryTrainingLoad.value = injury.trainingLoad || suggestedTrainingLoad(injury);
  dom.injuryReturnGuidance.value = injury.returnGuidance || "";
  dom.injuryNote.value = injury.note || "";
  renderInjuryFormMode();
  dom.injuryForm.scrollIntoView({ block: "start", behavior: "smooth" });
}

function clearInjuryForm() {
  editingInjuryId = "";
  dom.injuryForm.reset();
  renderInjuryFormMode();
}

function renderInjuryFormMode() {
  const isEditing = Boolean(editingInjuryId);
  dom.injuryFormTitle.textContent = isEditing ? "Verletzung bearbeiten" : "Verletzung erfassen";
  dom.injurySubmitButton.textContent = isEditing ? "Änderungen speichern" : "Verletzung speichern";
  dom.cancelInjuryEdit.classList.toggle("is-hidden", !isEditing);
}

function renderAvailability() {
  renderAvailabilityFormMode();
  renderAvailabilityFilterControls();
  const filters = normalizeAvailabilityFilters(state.availabilityFilters, state.players);
  const players = state.players
    .slice()
    .sort(sortByNumber)
    .filter((player) => filters.player === "all" || player.id === filters.player);
  const records = players.flatMap((player) => availabilityRecordsForPlayer(player.id, filters.status));
  const summary = availabilityOverviewSummary(records);

  dom.availabilitySummaryMetrics.innerHTML = [
    { label: "Spieler", value: players.length, hint: "In dieser Auswahl" },
    { label: "Aktive Einträge", value: summary.open, hint: "Laufende Zeiträume oder Serien", tone: summary.open ? "critical" : "" },
    { label: "Wiederkehrend", value: summary.recurring, hint: "Wochentage mit Abwesenheit" },
    { label: "Verletzt", value: summary.injured, hint: "Aus Verletzungen oder Verfügbarkeiten", tone: summary.injured ? "critical" : "" },
  ].map(metricCardHtml).join("");

  dom.availabilityPlayerList.innerHTML = players.length
    ? players.map((player) => availabilityPlayerRowHtml(player, filters.status)).join("")
    : `<div class="empty-state">Keine Spieler passend zu diesen Filtern.</div>`;

  dom.availabilityPlayerList.querySelectorAll("[data-edit-availability]").forEach((button) => {
    button.addEventListener("click", () => startAvailabilityEdit(button.dataset.editAvailability));
  });
  dom.availabilityPlayerList.querySelectorAll("[data-delete-availability]").forEach((button) => {
    button.addEventListener("click", () => openDeleteConfirmation("availabilityBlock", button.dataset.deleteAvailability));
  });
  dom.availabilityPlayerList.querySelectorAll("[data-edit-injury-from-availability]").forEach((button) => {
    button.addEventListener("click", () => {
      setView("injuries");
      startInjuryEdit(button.dataset.editInjuryFromAvailability);
    });
  });
}

function renderAvailabilityFilterControls() {
  const filters = normalizeAvailabilityFilters(state.availabilityFilters, state.players);
  dom.availabilityPlayerFilter.innerHTML = [
    `<option value="all">Alle Spieler</option>`,
    ...state.players.slice().sort(sortByNumber).map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`),
  ].join("");
  dom.availabilityStatusFilter.innerHTML = [
    `<option value="all">Alle Einträge</option>`,
    `<option value="open">Aktiv / offen</option>`,
    `<option value="Absage">Nicht verfügbar</option>`,
    `<option value="Verletzt">Verletzt</option>`,
    `<option value="Fraglich">Fraglich</option>`,
  ].join("");
  dom.availabilityPlayerFilter.value = filters.player;
  dom.availabilityStatusFilter.value = filters.status;
}

function availabilityRecordsForPlayer(playerId, statusFilter = "all") {
  const injuryRecords = (state.injuries || [])
    .filter((injury) => injury.playerId === playerId)
    .map((injury) => ({
      id: injury.id,
      kind: "injury",
      status: injury.status === "Ausgeheilt" ? "Ausgeheilt" : "Verletzt",
      title: `${injury.type} · ${injury.bodyArea}`,
      startDate: injury.startDate,
      endDate: injury.endDate,
      weekday: "",
      note: injury.returnGuidance || injury.note || injuryGuidance(injury).returnGuidance,
      open: injury.status !== "Ausgeheilt",
    }));
  const blockRecords = (state.availabilityBlocks || [])
    .filter((block) => block.playerId === playerId)
    .map((block) => ({
      id: block.id,
      kind: "block",
      status: block.status,
      title: block.reason || block.status,
      startDate: block.startDate,
      endDate: block.endDate,
      weekday: block.weekday,
      note: block.note,
      open: !block.endDate || block.endDate >= isoDate(new Date()),
    }));
  return [...injuryRecords, ...blockRecords]
    .filter((record) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "open") return record.open;
      if (statusFilter === "Verletzt") return record.status === "Verletzt";
      return record.status === statusFilter;
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function availabilityOverviewSummary(records) {
  return {
    total: records.length,
    open: records.filter((record) => record.open).length,
    recurring: records.filter((record) => record.weekday && record.weekday !== "all").length,
    injured: records.filter((record) => record.status === "Verletzt").length,
  };
}

function availabilityPlayerRowHtml(player, statusFilter) {
  const records = availabilityRecordsForPlayer(player.id, statusFilter);
  const matchSummary = playerMatchAvailabilitySummary(player.id);
  const trainingSummaryData = playerTrainingSummary(player.id);
  const totalUnavailable = records.filter((record) => record.open && ["Absage", "Verletzt"].includes(record.status)).length;
  return `
    <article class="availability-player-row">
      <div class="availability-player-main">
        ${playerAvatar(player)}
        <div>
          <h3>${playerNameLink(player)}</h3>
          <span>#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span>
        </div>
      </div>
      <div class="availability-periods">
        ${records.length ? records.map(availabilityRecordChipHtml).join("") : `<span class="availability-empty">Keine Zeiträume hinterlegt.</span>`}
      </div>
      <div class="availability-row-stats">
        <div><span>Spiel</span><strong>${formatNumber(matchSummary.attendanceRate)}%</strong></div>
        <div><span>Training</span><strong>${formatNumber(trainingSummaryData.attendanceRate)}%</strong></div>
        <div class="${totalUnavailable ? "is-critical" : ""}"><span>Aktiv</span><strong>${totalUnavailable}</strong></div>
      </div>
    </article>
  `;
}

function availabilityRecordChipHtml(record) {
  const dateText = `${formatDate(record.startDate)}${record.endDate ? ` - ${formatDate(record.endDate)}` : " - offen"}`;
  const repeat = record.weekday && record.weekday !== "all" ? ` · ${weekdayLabel(record.weekday)}` : "";
  const actions = record.kind === "block"
    ? `<button class="ghost-button" data-edit-availability="${record.id}" type="button">Bearbeiten</button><button class="danger-button" data-delete-availability="${record.id}" type="button">Entfernen</button>`
    : `<button class="ghost-button" data-edit-injury-from-availability="${record.id}" type="button">Verletzung bearbeiten</button>`;
  return `
    <section class="availability-period-card ${record.status === "Verletzt" ? "is-injury" : ""}">
      <div>
        <span class="tag ${record.status === "Verletzt" || record.status === "Absage" ? "danger" : "amber"}">${escapeHtml(record.status)}</span>
        <strong>${escapeHtml(record.title)}</strong>
        <p>${dateText}${repeat}</p>
        ${record.note ? `<em>${escapeHtml(record.note)}</em>` : ""}
      </div>
      <div class="card-actions">${actions}</div>
    </section>
  `;
}

function handleAvailabilitySubmit(event) {
  event.preventDefault();
  const block = normalizeAvailabilityBlock({
    id: editingAvailabilityBlockId || `ab${Date.now()}`,
    playerId: dom.availabilityPlayer.value,
    status: dom.availabilityStatus.value,
    reason: dom.availabilityReason.value,
    startDate: dom.availabilityStartDate.value,
    endDate: dom.availabilityEndDate.value,
    weekday: dom.availabilityWeekday.value,
    note: dom.availabilityNote.value,
  });
  if (!block.playerId || !block.startDate) return;
  if (editingAvailabilityBlockId) {
    const index = state.availabilityBlocks.findIndex((item) => item.id === editingAvailabilityBlockId);
    if (index >= 0) state.availabilityBlocks[index] = block;
  } else {
    state.availabilityBlocks.push(block);
  }
  clearAvailabilityForm();
  reconcileScheduleWithInjuries();
  persist();
  renderAll();
}

function startAvailabilityEdit(blockId) {
  const block = (state.availabilityBlocks || []).find((item) => item.id === blockId);
  if (!block) return;
  editingAvailabilityBlockId = blockId;
  dom.availabilityPlayer.value = block.playerId;
  dom.availabilityStatus.value = block.status;
  dom.availabilityReason.value = block.reason || defaultAbsenceReason(block.status);
  dom.availabilityStartDate.value = block.startDate;
  dom.availabilityEndDate.value = block.endDate || "";
  dom.availabilityWeekday.value = block.weekday || "all";
  dom.availabilityNote.value = block.note || "";
  renderAvailabilityFormMode();
  dom.availabilityForm.scrollIntoView({ block: "start", behavior: "smooth" });
}

function clearAvailabilityForm() {
  editingAvailabilityBlockId = "";
  dom.availabilityForm.reset();
  renderAvailabilityFormMode();
}

function renderAvailabilityFormMode() {
  const isEditing = Boolean(editingAvailabilityBlockId);
  dom.availabilityFormTitle.textContent = isEditing ? "Verfügbarkeit bearbeiten" : "Verfügbarkeit eintragen";
  dom.availabilitySubmitButton.textContent = isEditing ? "Änderungen speichern" : "Verfügbarkeit speichern";
  dom.cancelAvailabilityEdit.classList.toggle("is-hidden", !isEditing);
}

function renderRanking() {
  const mode = rankingTabs.includes(state.activeRankingTab) ? state.activeRankingTab : "overall";
  state.activeRankingTab = mode;
  const rows = playerRankingRows(mode);
  const top = rows[0];
  const averageScore = average(rows.map((row) => row.score));
  const totalUnexcused = rows.reduce((sum, row) => sum + row.match.unexcused + row.training.unexcused, 0);

  dom.rankingTabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.rankingTab === mode));
  dom.rankingBasisToggle.textContent = state.rankingBasisVisible ? "Berechnung ausblenden" : "Berechnung anzeigen";
  dom.rankingBasisPanel.classList.toggle("is-hidden", !state.rankingBasisVisible);
  dom.rankingBasisPanel.innerHTML = rankingBasisHtml(mode);
  dom.rankingTableTitle.textContent = rankingModeTitle(mode);

  dom.rankingSummaryMetrics.innerHTML = [
    { label: "Top-Spieler", value: top ? `#${top.player.number}` : "-", hint: top ? `${top.player.name} · ${formatNumber(top.score)} Punkte` : "Noch keine Spieler" },
    { label: "Ø Punkte", value: formatNumber(averageScore), hint: `${rows.length} Spieler in der Wertung` },
    { label: "Spielgewicht", value: mode === "training" ? "0%" : mode === "match" ? "100%" : "62%", hint: "Tore und Assists sind gedeckelt" },
    { label: "Training", value: mode === "match" ? "0%" : mode === "training" ? "100%" : "38%", hint: "Teilnahme und Bewertung zählen mit" },
    { label: "Unentschuldigt", value: totalUnexcused, hint: "Spiel fehlt stärker als Training", tone: totalUnexcused ? "critical" : "" },
  ]
    .map(
      (item) => `
        <article class="metric-card ${item.tone || ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.hint)}</p>
        </article>
      `,
    )
    .join("");

  dom.rankingTable.innerHTML = rows
    .map((row, index) => rankingTableRow(row, index, mode))
    .join("");
}

function playerRankingRows(mode = "overall") {
  return state.players
    .slice()
    .sort(sortByNumber)
    .map((player) => {
      const match = playerMatchRankingScore(player.id);
      const training = playerTrainingRankingScore(player.id);
      const overallScore = clampNumber(match.score * 0.62 + training.score * 0.38, 0, 100);
      const score = mode === "match" ? match.score : mode === "training" ? training.score : overallScore;
      return {
        player,
        mode,
        score,
        match,
        training,
        overallScore,
        profile: rankingProfileText(match, training),
      };
    })
    .sort((a, b) => b.score - a.score || b.match.score - a.match.score || sortByNumber(a.player, b.player));
}

function playerMatchRankingScore(playerId) {
  const aggregate = aggregatePlayer(playerId);
  const availability = playerMatchAvailabilitySummary(playerId);
  const games = Math.max(aggregate.games, 1);
  const possibleMatches = Math.max(state.matches.length, 1);
  const actionImpact = perGame(aggregate.tacklesWon + aggregate.duelsWon + aggregate.interceptions, games);
  const attackImpact = perGame(
    aggregate.goals * 1.8
      + aggregate.assists * 1.5
      + aggregate.shots * 0.35
      + aggregate.dribblesCompleted * 0.3
      + aggregate.crossesCompleted * 0.25
      + aggregate.keyPasses * 0.35,
    games,
  );
  const components = {
    index: scaleScore(aggregate.averageIndex, 110, 30),
    rating: scaleScore(aggregate.averageRating, 10, 15),
    pass: scaleScore(aggregate.passAccuracy, 100, 12),
    actions: scaleScore(actionImpact, 14, 14),
    offense: scaleScore(attackImpact, 4, 12),
    minutes: scaleScore(aggregate.minutes / games, 90, 8),
    availability: scaleScore(availability.confirmed, possibleMatches, 9),
  };
  const base = Object.values(components).reduce((sum, value) => sum + value, 0);
  const penalty = availability.unexcused * 10;
  return {
    ...availability,
    score: clampNumber(base - penalty, 0, 100),
    base,
    penalty,
    components,
    aggregate,
  };
}

function playerTrainingRankingScore(playerId) {
  const summary = playerTrainingSummary(playerId);
  const possibleTrainings = Math.max(state.trainings.length, 1);
  const effortFocusValues = summary.rows
    .flatMap((row) => [Number(row.rating?.effort || 0), Number(row.rating?.focus || 0)])
    .filter((value) => value > 0);
  const effortFocus = average(effortFocusValues);
  const components = {
    attendance: scaleScore(summary.attendanceRate, 100, 38),
    rating: scaleScore(summary.averageRating, 10, 28),
    effortFocus: scaleScore(effortFocus, 10, 18),
    reliability: scaleScore(summary.confirmed + summary.questionable * 0.5, Math.max(summary.total, 1), 10),
    volume: scaleScore(summary.total, possibleTrainings, 6),
  };
  const base = Object.values(components).reduce((sum, value) => sum + value, 0);
  const penalty = summary.unexcused * 4;
  return {
    ...summary,
    score: clampNumber(base - penalty, 0, 100),
    base,
    penalty,
    components,
    effortFocus,
  };
}

function playerMatchAvailabilitySummary(playerId, matches = state.matches) {
  const rows = matches.map((match) => (match.availability || []).find((item) => item.playerId === playerId) || { status: "Offen", reason: "", note: "" });
  const confirmed = rows.filter((row) => row.status === "Zusage").length;
  const unexcused = rows.filter((row) => row.status === "Unentschuldigt").length;
  const injured = rows.filter((row) => row.status === "Verletzt").length;
  const cancelled = rows.filter((row) => isUnavailableStatus(row.status)).length;
  const questionable = rows.filter((row) => row.status === "Fraglich").length;
  const total = rows.length;
  return {
    rows,
    total,
    confirmed,
    cancelled,
    injured,
    unexcused,
    questionable,
    attendanceRate: total ? (confirmed / total) * 100 : 0,
    unexcusedRate: total ? (unexcused / total) * 100 : 0,
  };
}

function scaleScore(value, max, weight) {
  return clampNumber(Number(value || 0) / Math.max(Number(max || 1), 1), 0, 1) * weight;
}

function rankingTableRow(row, index, mode) {
  return `
    <tr>
      <td><span class="ranking-rank">${index + 1}</span></td>
      <td>${playerNameLink(row.player)}<br><span class="muted">#${row.player.number} · ${escapeHtml(row.player.primaryPosition || row.player.position)}</span></td>
      <td>
        <div class="ranking-score">
          <strong>${formatNumber(row.score)}</strong>
          <span><i style="width: ${clampNumber(row.score, 0, 100)}%"></i></span>
        </div>
      </td>
      <td>${formatNumber(row.match.score)}<br><span class="muted">${row.match.aggregate.games} Spiele</span></td>
      <td>${formatNumber(row.training.score)}<br><span class="muted">${formatNumber(row.training.attendanceRate)}% Teilnahme</span></td>
      <td class="${row.match.unexcused + row.training.unexcused ? "critical-cell" : ""}">
        ${row.match.unexcused + row.training.unexcused}<br>
        <span class="muted">Spiel ${row.match.unexcused} · Training ${row.training.unexcused}</span>
      </td>
      <td>${escapeHtml(rankingModeProfile(row, mode))}</td>
    </tr>
  `;
}

function rankingModeProfile(row, mode) {
  if (mode === "match") {
    return `${formatNumber(row.match.aggregate.averageIndex)} Ø Index, ${formatNumber(row.match.aggregate.passAccuracy)}% Passquote, ${row.match.aggregate.goals}+${row.match.aggregate.assists} Scorer.`;
  }
  if (mode === "training") {
    return `${row.training.confirmed}/${row.training.total} Zusagen, ${formatNumber(row.training.averageRating)} Ø Bewertung, ${formatNumber(row.training.effortFocus)} Ø Einsatz/Fokus.`;
  }
  return row.profile;
}

function rankingProfileText(match, training) {
  const parts = [];
  if (match.aggregate.games) parts.push(`${formatNumber(match.aggregate.averageIndex)} Ø Spielindex`);
  if (training.ratingCount) parts.push(`${formatNumber(training.averageRating)} Ø Training`);
  if (match.unexcused || training.unexcused) parts.push(`${match.unexcused + training.unexcused} unentschuldigt`);
  return parts.length ? parts.join(" · ") : "Noch wenig Datenbasis.";
}

function rankingModeTitle(mode) {
  if (mode === "match") return "Spielbestenliste";
  if (mode === "training") return "Trainingsbestenliste";
  return "Gesamtwertung";
}

function rankingBasisHtml(mode) {
  const active = rankingModeTitle(mode);
  return `
    <div class="ranking-basis-grid">
      <article>
        <h3>${escapeHtml(active)}</h3>
        <p>Die Gesamtwertung besteht aus 62% Spielbestenliste und 38% Trainingsbestenliste. In den Einzelreitern wird jeweils nur der entsprechende Bereich bewertet.</p>
      </article>
      <article>
        <h3>Spielpunkte</h3>
        <p>Max. 100 Punkte: Leistungsindex 30, Trainerbewertung 15, Passquote 12, Defensiv-/Aktionswert 14, gedeckelter Offensivoutput 12, Einsatzminuten 8, Spieltagsverfügbarkeit 9. Unentschuldigt beim Spiel: -10 Punkte je Fehltermin.</p>
      </article>
      <article>
        <h3>Trainingspunkte</h3>
        <p>Max. 100 Punkte: Teilnahme 38, Trainingsbewertung 28, Einsatz/Fokus 18, Verlässlichkeit 10, Datenumfang 6. Unentschuldigt beim Training: -4 Punkte je Fehltermin.</p>
      </article>
      <article>
        <h3>Ausgewogenheit</h3>
        <p>Tore, Assists, Abschlüsse, Dribblings und Flanken zählen nur in einem gedeckelten Offensivblock. So kann ein Stürmer profitieren, aber nicht allein durch Tore automatisch die Liste dominieren.</p>
      </article>
    </div>
  `;
}

function trainingAttendanceChart(trainings) {
  if (!trainings.length) return emptySvg("Noch keine Trainings im Filter.");
  const sorted = trainings.slice().sort(sortByDateAsc);
  const width = 720;
  const height = 300;
  const padding = { top: 28, right: 24, bottom: 52, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, state.players.length);
  const barWidth = Math.max(20, chartWidth / sorted.length - 14);
  const bars = sorted
    .map((training, index) => {
      const summary = trainingSummary(training);
      const x = padding.left + index * (chartWidth / sorted.length) + 7;
      const cancelledOther = Math.max(0, summary.cancelled - summary.injured - summary.unexcused);
      const confirmedHeight = (summary.confirmed / maxValue) * chartHeight;
      const cancelledHeight = (cancelledOther / maxValue) * chartHeight;
      const injuredHeight = (summary.injured / maxValue) * chartHeight;
      const unexcusedHeight = (summary.unexcused / maxValue) * chartHeight;
      const yConfirmed = padding.top + chartHeight - confirmedHeight;
      const yCancelled = yConfirmed - cancelledHeight;
      const yInjured = yCancelled - injuredHeight;
      const yUnexcused = yInjured - unexcusedHeight;
      return `
        <rect x="${x}" y="${yConfirmed}" width="${barWidth}" height="${confirmedHeight}" rx="5" fill="${colors[0]}" />
        <rect x="${x}" y="${yCancelled}" width="${barWidth}" height="${cancelledHeight}" rx="5" fill="${colors[3]}" />
        <rect x="${x}" y="${yInjured}" width="${barWidth}" height="${injuredHeight}" rx="5" fill="${colors[1]}" />
        <rect x="${x}" y="${yUnexcused}" width="${barWidth}" height="${unexcusedHeight}" rx="5" fill="#b9382e" />
        <text class="chart-value" x="${x + barWidth / 2}" y="${Math.max(18, yUnexcused - 8)}" text-anchor="middle">${summary.confirmed}</text>
        <text class="chart-label" x="${x + barWidth / 2}" y="${height - 18}" text-anchor="middle">${escapeSvg(formatDate(training.date).slice(0, 5))}</text>
      `;
    })
    .join("");
  const grid = [0, 0.5, 1]
    .map((step) => {
      const y = padding.top + chartHeight - step * chartHeight;
      return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e8dfd2" /><text class="chart-label" x="14" y="${y + 4}">${Math.round(step * maxValue)}</text>`;
    })
    .join("");
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Trainingsbeteiligung">
      ${grid}
      ${bars}
      <g transform="translate(${padding.left}, 16)">
        <rect width="10" height="10" fill="${colors[0]}" rx="2" /><text class="chart-label" x="16" y="10">Zusagen</text>
        <rect x="92" width="10" height="10" fill="${colors[3]}" rx="2" /><text class="chart-label" x="108" y="10">Absagen</text>
        <rect x="184" width="10" height="10" fill="${colors[1]}" rx="2" /><text class="chart-label" x="200" y="10">Verletzt</text>
        <rect x="282" width="10" height="10" fill="#b9382e" rx="2" /><text class="chart-label" x="298" y="10">Unentschuldigt</text>
      </g>
    </svg>
  `;
}

function absenceReasonRanking(trainings) {
  const map = new Map();
  trainings.forEach((training) => {
    training.availability.forEach((item) => {
      if (!isUnavailableStatus(item.status)) return;
      addEventCount(map, item.reason || item.status);
    });
  });
  const rows = mapToRanking(map);
  if (!rows.length) return `<div class="empty-state small-empty">Noch keine Absagegründe erfasst.</div>`;
  return rows
    .map(
      (row, index) => `
        <article class="leaderboard-row">
          <span>${index + 1}</span>
          <div>
            <strong>${escapeHtml(row.name)}</strong>
            <small>Absagegrund</small>
          </div>
          <b>${row.value}</b>
        </article>
      `,
    )
    .join("");
}

function openTrainingDetail(trainingId) {
  const training = getTraining(trainingId);
  if (!training) return;
  activeTrainingId = trainingId;
  activeTrainingTab = "overview";
  renderTrainingDetail();
  dom.trainingDetailModal.classList.add("is-visible");
  dom.trainingDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTrainingDetail() {
  dom.trainingDetailModal.classList.remove("is-visible");
  dom.trainingDetailModal.setAttribute("aria-hidden", "true");
  if (!dom.playerProfileModal.classList.contains("is-visible") && !dom.deleteConfirmModal.classList.contains("is-visible") && !dom.matchDetailModal.classList.contains("is-visible")) {
    document.body.style.overflow = "";
  }
}

function renderTrainingDetail() {
  const training = getTraining(activeTrainingId);
  if (!training) {
    closeTrainingDetail();
    return;
  }
  const summary = trainingSummary(training);
  dom.trainingDetailTitle.textContent = `${training.type} · ${formatDate(training.date)}`;
  dom.trainingDetailContent.innerHTML = `
    <div class="match-detail training-detail">
      <section class="match-detail-hero">
        <div>
          <span class="eyebrow">${escapeHtml(training.type)} · ${escapeHtml(training.priority)}</span>
          <h3>${escapeHtml(training.topic || training.location || "Training")}</h3>
          <p>${formatDate(training.date)} · ${escapeHtml(training.startTime || "Zeit offen")} - ${escapeHtml(training.endTime || "offen")} · Treffzeit ${escapeHtml(training.meetTime || "offen")}</p>
        </div>
        <div class="match-detail-score">${summary.confirmed}/${state.players.length}</div>
      </section>
      <div class="view-tabs match-detail-tabs" aria-label="Trainingsdetails">
        ${trainingDetailTab("overview", "Überblick")}
        ${trainingDetailTab("availability", "Verfügbarkeit")}
        ${trainingDetailTab("ratings", "Bewertungen")}
        ${trainingDetailTab("plan", "Trainingsplan")}
      </div>
      <div class="match-detail-pane">
        ${trainingDetailPane(training)}
      </div>
    </div>
  `;

  dom.trainingDetailContent.querySelectorAll("[data-training-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTrainingTab = button.dataset.trainingTab;
      renderTrainingDetail();
    });
  });

  const availabilityForm = dom.trainingDetailContent.querySelector("#trainingAvailabilityForm");
  if (availabilityForm) availabilityForm.addEventListener("submit", saveTrainingAvailability);
  const ratingForm = dom.trainingDetailContent.querySelector("#trainingRatingForm");
  if (ratingForm) ratingForm.addEventListener("submit", saveTrainingRatings);
  const planForm = dom.trainingDetailContent.querySelector("#trainingPlanForm");
  if (planForm) planForm.addEventListener("submit", saveTrainingPlan);
  const groupForm = dom.trainingDetailContent.querySelector("#trainingGroupForm");
  if (groupForm) groupForm.addEventListener("submit", addTrainingGroup);
  bindTrainingGroupBoard();
}

function trainingDetailTab(tab, label) {
  return `<button class="view-tab ${activeTrainingTab === tab ? "is-active" : ""}" data-training-tab="${tab}" type="button">${escapeHtml(label)}</button>`;
}

function trainingDetailPane(training) {
  if (activeTrainingTab === "availability") return trainingAvailabilityPane(training);
  if (activeTrainingTab === "ratings") return trainingRatingsPane(training);
  if (activeTrainingTab === "plan") return trainingPlanPane(training);
  return trainingOverviewPane(training);
}

function trainingOverviewPane(training) {
  const summary = trainingSummary(training);
  return `
    <div class="match-overview-grid">
      <section class="report-card">
        <span class="eyebrow">Status</span>
        <h3>Verfügbarkeit</h3>
        <div class="report-metric-grid report-metric-grid-wide">
          ${[
            { label: "Zusagen", value: summary.confirmed },
            { label: "Absagen", value: summary.cancelled },
            { label: "Verletzt", value: summary.injured },
            { label: "Unentschuldigt", value: `${summary.unexcused} · ${formatNumber(summary.unexcusedRate)}%`, tone: "critical" },
            { label: "Offen", value: summary.open },
            { label: "Fraglich", value: summary.questionable },
            { label: "Ø Bewertung", value: formatNumber(summary.averageRating) },
            { label: "Gruppen", value: training.groups.length },
            { label: "Intensität", value: training.intensity },
          ].map(reportMetricHtml).join("")}
        </div>
        ${training.coachNote ? `<p class="report-note">${escapeHtml(training.coachNote)}</p>` : ""}
      </section>
      <section class="report-card">
        <span class="eyebrow">Plan</span>
        <h3>${escapeHtml(training.topic || "Trainingsschwerpunkt offen")}</h3>
        <div class="season-team-grid">
          ${[
            ["Ort", training.location || "offen"],
            ["Treffzeit", training.meetTime || "offen"],
            ["Beginn", training.startTime || "offen"],
            ["Ende", training.endTime || "offen"],
          ].map(([label, value]) => `<div class="season-team-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function trainingAvailabilityPane(training) {
  const availability = new Map(training.availability.map((item) => [item.playerId, item]));
  return `
    <form id="trainingAvailabilityForm" class="training-detail-form">
      <section class="report-card">
        <div class="event-section-heading">
          <div>
            <span class="eyebrow">Verfügbarkeiten</span>
            <h3>Zu- und Absagen</h3>
          </div>
        </div>
        <div class="table-wrap">
          <table class="training-table">
            <thead>
              <tr>
                <th>Spieler</th>
                <th>Status</th>
                <th>Absagegrund</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${state.players.slice().sort(sortByNumber).map((player) => trainingAvailabilityRow(player, availability.get(player.id))).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <button class="primary-button" type="submit">Verfügbarkeiten speichern</button>
    </form>
  `;
}

function trainingAvailabilityRow(player, availability) {
  const status = availability?.status || "Offen";
  return `
    <tr data-training-player="${player.id}">
      <td>${playerNameLink(player)}<br><span class="muted">#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span></td>
      <td>
        <select data-training-field="status">
          ${availabilityStatuses.map((option) => `<option ${status === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-training-field="reason">
          <option value="">Kein Absagegrund</option>
          ${absenceReasons.map((reason) => `<option value="${escapeHtml(reason)}" ${availability?.reason === reason ? "selected" : ""}>${escapeHtml(reason)}</option>`).join("")}
        </select>
      </td>
      <td><input data-training-field="note" type="text" value="${escapeHtml(availability?.note || "")}" placeholder="kurze Info" /></td>
    </tr>
  `;
}

function trainingRatingsPane(training) {
  const ratingMap = new Map(training.ratings.map((rating) => [rating.playerId, rating]));
  const players = trainingAvailablePlayers(training);
  return `
    <form id="trainingRatingForm" class="training-detail-form">
      <section class="report-card">
        <div class="event-section-heading">
          <div>
            <span class="eyebrow">Nachbereitung</span>
            <h3>Spielerbewertung</h3>
            <p class="report-subline">Nur Spieler mit Zusage werden hier bewertet.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="training-table">
            <thead>
              <tr>
                <th>Spieler</th>
                <th>Bewertung</th>
                <th>Einsatz</th>
                <th>Fokus</th>
                <th>Belastung</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${players.length ? players.map((player) => trainingRatingRow(player, ratingMap.get(player.id), training)).join("") : `<tr><td colspan="6">Noch keine Zusagen für dieses Training.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
      <button class="primary-button" type="submit">Bewertungen speichern</button>
    </form>
  `;
}

function trainingRatingRow(player, rating, training) {
  return `
    <tr data-training-player="${player.id}">
      <td>
        ${playerNameLink(player)}<br>
        <span class="muted">#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span>
        <br>
        <span class="muted">Ziel: ${escapeHtml(player.trainingGoal || "noch offen")}</span>
      </td>
      <td><input data-rating-field="rating" type="number" min="0" max="10" step="0.1" value="${escapeHtml(rating?.rating || "")}" /></td>
      <td><input data-rating-field="effort" type="number" min="0" max="10" step="0.1" value="${escapeHtml(rating?.effort || "")}" /></td>
      <td><input data-rating-field="focus" type="number" min="0" max="10" step="0.1" value="${escapeHtml(rating?.focus || "")}" /></td>
      <td>
        <select data-rating-field="intensityLoad">
          ${trainingIntensities.map((option) => `<option ${option === (rating?.intensityLoad || training.intensity) ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </td>
      <td><input data-rating-field="note" type="text" value="${escapeHtml(rating?.note || "")}" placeholder="z. B. sehr präsent" /></td>
    </tr>
  `;
}

function trainingPlanPane(training) {
  const availablePlayers = trainingAvailablePlayers(training);
  const groupedIds = new Set(training.groups.flatMap((group) => group.playerIds));
  const unassigned = availablePlayers.filter((player) => !groupedIds.has(player.id));
  return `
    <div class="training-plan-grid">
      <section class="report-card">
        <span class="eyebrow">Trainingsplan</span>
        <h3>Inhalte</h3>
        <form id="trainingPlanForm" class="stack-form">
          <label>
            Aktivierung
            <textarea id="trainingPlanWarmup" rows="3">${escapeHtml(training.plan.warmup || "")}</textarea>
          </label>
          <label>
            Hauptteil
            <textarea id="trainingPlanMain" rows="3">${escapeHtml(training.plan.main || "")}</textarea>
          </label>
          <label>
            Spielform
            <textarea id="trainingPlanGame" rows="3">${escapeHtml(training.plan.game || "")}</textarea>
          </label>
          <label>
            Coachingpunkte
            <textarea id="trainingPlanCoaching" rows="3">${escapeHtml(training.plan.coachingPoints || "")}</textarea>
          </label>
          <button class="primary-button" type="submit">Plan speichern</button>
        </form>
      </section>
      <section class="report-card report-card-large">
        <div class="event-section-heading">
          <div>
            <span class="eyebrow">Gruppen</span>
            <h3>Drag-and-drop Gruppenplanung</h3>
            <p class="report-subline">Spieler mit Absage oder Verletzung erscheinen hier nicht.</p>
          </div>
        </div>
        <form id="trainingGroupForm" class="training-group-form">
          <input id="trainingGroupName" type="text" placeholder="Neue Gruppe, z. B. Umschaltmoment" />
          <button class="ghost-button" type="submit">Gruppe hinzufügen</button>
        </form>
        <div class="training-group-board">
          <div class="training-unassigned training-dropzone" data-training-group="unassigned">
            <h4>Verfügbare Spieler</h4>
            <div class="training-player-pool">
              ${unassigned.length ? unassigned.map(trainingDraggablePlayer).join("") : `<p class="muted">Alle verfügbaren Spieler sind Gruppen zugeordnet.</p>`}
            </div>
          </div>
          ${training.groups.map((group) => trainingGroupColumn(group)).join("")}
        </div>
      </section>
    </div>
  `;
}

function trainingGroupColumn(group) {
  return `
    <div class="training-group training-dropzone" data-training-group="${escapeHtml(group.id)}">
      <div class="training-group-head">
        <h4>${escapeHtml(group.name)}</h4>
        <span class="tag">${group.playerIds.length}</span>
      </div>
      <div class="training-player-pool">
        ${group.playerIds.map((playerId) => getPlayer(playerId)).filter(Boolean).map(trainingDraggablePlayer).join("") || `<p class="muted">Spieler hier ablegen.</p>`}
      </div>
    </div>
  `;
}

function trainingDraggablePlayer(player) {
  return `<button class="training-player-chip" draggable="true" data-drag-player="${player.id}" type="button">#${player.number} ${escapeHtml(player.name)}</button>`;
}

function bindTrainingGroupBoard() {
  const board = dom.trainingDetailContent.querySelector(".training-group-board");
  if (!board) return;
  board.querySelectorAll("[data-drag-player]").forEach((chip) => {
    chip.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", chip.dataset.dragPlayer);
      event.dataTransfer.effectAllowed = "move";
    });
  });
  board.querySelectorAll(".training-dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-over");
      moveTrainingPlayerToGroup(event.dataTransfer.getData("text/plain"), zone.dataset.trainingGroup);
    });
  });
}

function saveTrainingAvailability(event) {
  event.preventDefault();
  const training = getTraining(activeTrainingId);
  if (!training) return;
  const availability = Array.from(event.currentTarget.querySelectorAll("[data-training-player]")).map((row) => {
    const status = row.querySelector('[data-training-field="status"]').value;
    const reason = row.querySelector('[data-training-field="reason"]').value;
    return {
      playerId: row.dataset.trainingPlayer,
      status,
      reason: isUnavailableStatus(status) ? reason || defaultAbsenceReason(status) : "",
      note: row.querySelector('[data-training-field="note"]').value.trim(),
    };
  });
  updateTraining(activeTrainingId, { availability });
}

function saveTrainingRatings(event) {
  event.preventDefault();
  const training = getTraining(activeTrainingId);
  if (!training) return;
  const ratings = Array.from(event.currentTarget.querySelectorAll("[data-training-player]"))
    .map((row) => ({
      playerId: row.dataset.trainingPlayer,
      rating: Number(row.querySelector('[data-rating-field="rating"]').value || 0),
      effort: Number(row.querySelector('[data-rating-field="effort"]').value || 0),
      focus: Number(row.querySelector('[data-rating-field="focus"]').value || 0),
      intensityLoad: row.querySelector('[data-rating-field="intensityLoad"]').value,
      note: row.querySelector('[data-rating-field="note"]').value.trim(),
    }))
    .filter((rating) => rating.rating || rating.effort || rating.focus || rating.note);
  updateTraining(activeTrainingId, { ratings });
}

function saveTrainingPlan(event) {
  event.preventDefault();
  updateTraining(activeTrainingId, {
    plan: {
      warmup: document.querySelector("#trainingPlanWarmup").value.trim(),
      main: document.querySelector("#trainingPlanMain").value.trim(),
      game: document.querySelector("#trainingPlanGame").value.trim(),
      coachingPoints: document.querySelector("#trainingPlanCoaching").value.trim(),
    },
  });
}

function addTrainingGroup(event) {
  event.preventDefault();
  const training = getTraining(activeTrainingId);
  if (!training) return;
  const input = event.currentTarget.querySelector("#trainingGroupName");
  const name = input.value.trim() || `Gruppe ${training.groups.length + 1}`;
  const groups = [...training.groups, { id: `tg${Date.now()}`, name, playerIds: [] }];
  input.value = "";
  updateTraining(activeTrainingId, { groups });
}

function moveTrainingPlayerToGroup(playerId, groupId) {
  const training = getTraining(activeTrainingId);
  if (!training || !playerId) return;
  const groups = training.groups.map((group) => ({
    ...group,
    playerIds: group.playerIds.filter((id) => id !== playerId),
  }));
  if (groupId !== "unassigned") {
    const target = groups.find((group) => group.id === groupId);
    if (target && !target.playerIds.includes(playerId)) target.playerIds.push(playerId);
  }
  updateTraining(activeTrainingId, { groups });
}

function updateTraining(trainingId, patch) {
  const index = state.trainings.findIndex((training) => training.id === trainingId);
  if (index === -1) return;
  state.trainings[index] = normalizeTraining({ ...state.trainings[index], ...patch }, {}, state.players);
  persist();
  renderTraining();
  renderTrainingStats();
  renderRanking();
  renderAnalyst();
  if (dom.trainingDetailModal.classList.contains("is-visible")) renderTrainingDetail();
}

function handleTrainingSubmit(event) {
  event.preventDefault();
  const trainingDetails = {
    date: dom.trainingDate.value,
    startTime: dom.trainingStartTime.value,
    endTime: dom.trainingEndTime.value,
    meetTime: dom.trainingMeetTime.value,
    location: dom.trainingLocation.value.trim(),
    type: dom.trainingType.value,
    priority: dom.trainingPriority.value,
    intensity: dom.trainingIntensity.value,
    topic: dom.trainingTopic.value.trim(),
    coachNote: dom.trainingCoachNote.value.trim(),
  };
  if (!trainingDetails.date) return;

  if (editingTrainingId) {
    const index = state.trainings.findIndex((training) => training.id === editingTrainingId);
    if (index === -1) return;
    state.trainings[index] = normalizeTraining({ ...state.trainings[index], ...trainingDetails }, {}, state.players);
  } else {
    const id = `t${Date.now()}`;
    state.trainings.push(normalizeTraining({
      id,
      ...trainingDetails,
      availability: state.players.map((player) => ({ playerId: player.id, status: "Offen", reason: "", note: "" })),
      ratings: [],
      groups: [{ id: `${id}-group-1`, name: "Gruppe 1", playerIds: [] }],
      plan: { warmup: "", main: "", game: "", coachingPoints: "" },
    }, {}, state.players));
  }

  clearTrainingForm();
  persist();
  renderTraining();
  renderTrainingStats();
  renderRanking();
  renderAnalyst();
}

function editTraining(trainingId) {
  const training = getTraining(trainingId);
  if (!training) return;
  editingTrainingId = trainingId;
  dom.trainingDate.value = training.date || "";
  dom.trainingStartTime.value = training.startTime || "";
  dom.trainingEndTime.value = training.endTime || "";
  dom.trainingMeetTime.value = training.meetTime || "";
  dom.trainingLocation.value = training.location || "";
  dom.trainingType.value = training.type || trainingTypes[0];
  dom.trainingPriority.value = training.priority || "Normal";
  dom.trainingIntensity.value = training.intensity || "Mittel";
  dom.trainingTopic.value = training.topic || "";
  dom.trainingCoachNote.value = training.coachNote || "";
  renderTrainingFormMode();
  dom.trainingForm.scrollIntoView({ block: "start", behavior: "smooth" });
}

function clearTrainingForm() {
  editingTrainingId = "";
  dom.trainingForm.reset();
  dom.trainingType.value = trainingTypes[0];
  dom.trainingPriority.value = "Normal";
  dom.trainingIntensity.value = "Mittel";
  renderTrainingFormMode();
}

function renderTrainingFormMode() {
  dom.trainingFormTitle.textContent = editingTrainingId ? "Training bearbeiten" : "Training anlegen";
  dom.trainingSubmitButton.textContent = editingTrainingId ? "Änderungen speichern" : "Training speichern";
  dom.cancelTrainingEdit.classList.toggle("is-hidden", !editingTrainingId);
}

function filteredTrainings(filters = defaultTrainingFilters) {
  const normalized = normalizeTrainingFilters(filters);
  return (state.trainings || [])
    .filter((training) => trainingPassesFilters(training, normalized))
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

function trainingPassesFilters(training, filters) {
  if (filters.type !== "all" && training.type !== filters.type) return false;
  if (filters.priority !== "all" && training.priority !== filters.priority) return false;
  if (filters.intensity !== "all" && training.intensity !== filters.intensity) return false;
  return true;
}

function trainingFilterLabel(filters = defaultTrainingFilters) {
  const normalized = normalizeTrainingFilters(filters);
  const parts = [];
  if (normalized.type !== "all") parts.push(normalized.type);
  if (normalized.priority !== "all") parts.push(normalized.priority);
  if (normalized.intensity !== "all") parts.push(`${normalized.intensity} Intensität`);
  return parts.length ? parts.join(" · ") : "Alle Trainings";
}

function availabilitySummary(items = []) {
  const summary = items.reduce(
    (summary, item) => {
      if (item.status === "Zusage") summary.confirmed += 1;
      else if (item.status === "Verletzt") {
        summary.cancelled += 1;
        summary.injured += 1;
      } else if (item.status === "Unentschuldigt") {
        summary.cancelled += 1;
        summary.unexcused += 1;
      } else if (item.status === "Absage") summary.cancelled += 1;
      else if (item.status === "Fraglich") summary.questionable += 1;
      else summary.open += 1;
      return summary;
    },
    { confirmed: 0, cancelled: 0, injured: 0, unexcused: 0, questionable: 0, open: 0 },
  );
  const possible = items.length || state.players.length;
  return {
    ...summary,
    attendanceRate: possible ? (summary.confirmed / possible) * 100 : 0,
    unexcusedRate: possible ? (summary.unexcused / possible) * 100 : 0,
  };
}

function matchAvailabilitySeasonSummary(matches = state.matches) {
  const totals = matches.reduce(
    (summary, match) => {
      const row = availabilitySummary(match.availability || []);
      summary.confirmed += row.confirmed;
      summary.cancelled += row.cancelled;
      summary.injured += row.injured;
      summary.unexcused += row.unexcused;
      summary.open += row.open;
      summary.questionable += row.questionable;
      return summary;
    },
    { confirmed: 0, cancelled: 0, injured: 0, unexcused: 0, open: 0, questionable: 0 },
  );
  const possible = matches.length * state.players.length;
  return {
    ...totals,
    attendanceRate: possible ? (totals.confirmed / possible) * 100 : 0,
    unexcusedRate: possible ? (totals.unexcused / possible) * 100 : 0,
  };
}

function trainingSummary(training) {
  const ratings = (training.ratings || []).map((rating) => Number(rating.rating || 0)).filter((value) => value > 0);
  const summary = (training.availability || []).reduce(
    (summary, item) => {
      if (item.status === "Zusage") summary.confirmed += 1;
      else if (item.status === "Absage") summary.cancelled += 1;
      else if (item.status === "Verletzt") {
        summary.cancelled += 1;
        summary.injured += 1;
      } else if (item.status === "Unentschuldigt") {
        summary.cancelled += 1;
        summary.unexcused += 1;
      } else if (item.status === "Fraglich") summary.questionable += 1;
      else summary.open += 1;
      return summary;
    },
    {
      confirmed: 0,
      cancelled: 0,
      injured: 0,
      unexcused: 0,
      questionable: 0,
      open: 0,
      averageRating: average(ratings),
      ratingCount: ratings.length,
    },
  );
  const possible = (training.availability || []).length || state.players.length;
  return {
    ...summary,
    attendanceRate: possible ? (summary.confirmed / possible) * 100 : 0,
    unexcusedRate: possible ? (summary.unexcused / possible) * 100 : 0,
  };
}

function trainingSeasonSummary(trainings = state.trainings) {
  const totals = trainings.reduce(
    (summary, training) => {
      const row = trainingSummary(training);
      summary.confirmed += row.confirmed;
      summary.cancelled += row.cancelled;
      summary.injured += row.injured;
      summary.unexcused += row.unexcused;
      summary.open += row.open;
      summary.questionable += row.questionable;
      summary.ratingValues.push(...(training.ratings || []).map((rating) => Number(rating.rating || 0)).filter((value) => value > 0));
      return summary;
    },
    { confirmed: 0, cancelled: 0, injured: 0, unexcused: 0, open: 0, questionable: 0, ratingValues: [] },
  );
  const possible = trainings.length * state.players.length;
  return {
    ...totals,
    attendanceRate: possible ? (totals.confirmed / possible) * 100 : 0,
    unexcusedRate: possible ? (totals.unexcused / possible) * 100 : 0,
    averageRating: average(totals.ratingValues),
    ratingCount: totals.ratingValues.length,
  };
}

function playerTrainingSummary(playerId, trainings = state.trainings) {
  const rows = trainings
    .slice()
    .sort(sortByDateAsc)
    .map((training) => {
      const availability = training.availability.find((item) => item.playerId === playerId);
      const rating = training.ratings.find((item) => item.playerId === playerId);
      if (!availability && !rating) return null;
      return { training, availability: availability || { status: "Offen", reason: "", note: "" }, rating };
    })
    .filter(Boolean);
  const ratings = rows.map((row) => Number(row.rating?.rating || 0)).filter((value) => value > 0);
  const total = rows.length;
  const confirmed = rows.filter((row) => row.availability.status === "Zusage").length;
  const cancelled = rows.filter((row) => isUnavailableStatus(row.availability.status)).length;
  const injured = rows.filter((row) => row.availability.status === "Verletzt").length;
  const unexcused = rows.filter((row) => row.availability.status === "Unentschuldigt").length;
  const latest = rows.slice().sort((a, b) => b.training.date.localeCompare(a.training.date))[0];
  return {
    rows,
    total,
    confirmed,
    cancelled,
    injured,
    unexcused,
    questionable: rows.filter((row) => row.availability.status === "Fraglich").length,
    open: rows.filter((row) => row.availability.status === "Offen").length,
    attendanceRate: total ? (confirmed / total) * 100 : 0,
    unexcusedRate: total ? (unexcused / total) * 100 : 0,
    averageRating: average(ratings),
    ratingCount: ratings.length,
    latestStatus: latest?.availability.status || "",
  };
}

function trainingAvailablePlayerIds(training) {
  return (training.availability || [])
    .filter((item) => item.status === "Zusage")
    .map((item) => item.playerId);
}

function trainingAvailablePlayers(training) {
  const ids = new Set(trainingAvailablePlayerIds(training));
  return state.players.filter((player) => ids.has(player.id)).sort(sortByNumber);
}

function getTraining(trainingId) {
  return state.trainings.find((training) => training.id === trainingId);
}

function getCalendarEvent(eventId) {
  return state.calendarEvents.find((event) => event.id === eventId);
}

function renderCompare() {
  const selected = new Set(state.comparisonPlayers || []);
  dom.comparisonPicker.innerHTML = state.players
    .slice()
    .sort(sortByNumber)
    .map(
      (player) => `
        <label class="player-chip">
          <input type="checkbox" value="${player.id}" ${selected.has(player.id) ? "checked" : ""} />
          #${player.number} ${playerNameLink(player)}
        </label>
      `,
    )
    .join("");

  dom.comparisonPicker.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const checked = Array.from(dom.comparisonPicker.querySelectorAll("input:checked")).map((item) => item.value);
      state.comparisonPlayers = checked.slice(0, 6);
      persist();
      renderCompare();
    });
  });

  const selectedPlayers = state.players.filter((player) => selected.has(player.id)).slice(0, 6);
  const metric = state.selectedMetric || "index";
  const lineSeries = selectedPlayers.map((player, index) => playerSeries(player.id, metric, colors[index % colors.length]));
  renderLineChart(dom.comparisonLineChart, lineSeries, {
    yMax: metricMax(metric),
    suffix: metricSuffix(metric),
  });
  renderRadarChart(dom.radarChart, selectedPlayers);

  dom.comparisonTable.innerHTML = selectedPlayers
    .map((player) => {
      const aggregate = aggregatePlayer(player.id);
      return `
        <tr>
          <td><strong>${playerNameLink(player)}</strong><br><span class="muted">#${player.number} · ${escapeHtml(player.position)}</span></td>
          <td>${aggregate.games}</td>
          <td>${formatNumber(aggregate.passAccuracy)}%</td>
          <td>${aggregate.goals}</td>
          <td>${aggregate.assists}</td>
          <td>${formatNumber(aggregate.averageIndex)}</td>
          <td>${formatNumber(aggregate.averageRating)}</td>
        </tr>
      `;
    })
    .join("");

  if (!selectedPlayers.length) {
    dom.comparisonTable.innerHTML = `<tr><td colspan="7">Wähle mindestens einen Spieler aus.</td></tr>`;
  }

  renderNotesTimeline(selectedPlayers);
}

function renderPlayers() {
  const positionFilter = state.playerPositionFilter || "all";
  const searchTerm = normalizeSearchText(state.playerSearchFilter);
  const footFilter = state.playerFootFilter || "all";
  const statsFilter = state.playerStatsFilter || "all";
  const sortMode = state.playerSort || "number";
  const players = state.players
    .map((player) => {
      const matchAvailability = playerMatchAvailabilitySummary(player.id);
      const trainingAvailability = playerTrainingSummary(player.id);
      const unexcused = matchAvailability.unexcused + trainingAvailability.unexcused;
      const totalAvailability = matchAvailability.total + trainingAvailability.total;
      const injury = currentPlayerInjury(player.id);
      return {
        player,
        aggregate: aggregatePlayer(player.id),
        trend: playerTrend(player.id),
        injury,
        availability: {
          unexcused,
          unexcusedRate: totalAvailability ? (unexcused / totalAvailability) * 100 : 0,
        },
      };
    })
    .filter(({ player, aggregate }) => {
      const matchesPosition = positionFilter === "all" || (player.primaryPosition || player.position) === positionFilter;
      const normalizedFoot = player.foot || "";
      const matchesFoot =
        footFilter === "all"
        || (footFilter === "open" && !normalizedFoot)
        || normalizedFoot === footFilter;
      const matchesStats =
        statsFilter === "all"
        || (statsFilter === "withStats" && aggregate.games > 0)
        || (statsFilter === "withoutStats" && aggregate.games === 0)
        || (statsFilter === "topIndex" && aggregate.averageIndex >= 80);
      const searchHaystack = normalizeSearchText([
        player.name,
        player.number,
        player.primaryPosition || player.position,
        player.roleInPossession || player.role,
        player.roleOutOfPossession,
        player.foot,
        player.profileNote,
        player.trainingGoal,
      ].join(" "));
      return matchesPosition && matchesFoot && matchesStats && (!searchTerm || searchHaystack.includes(searchTerm));
    })
    .slice()
    .sort((a, b) => sortRosterPlayers(a, b, sortMode));

  dom.playerPositionFilter.value = positionFilter;
  dom.playerSearchFilter.value = state.playerSearchFilter || "";
  dom.playerFootFilter.value = footFilter;
  dom.playerStatsFilter.value = statsFilter;
  dom.playerSortSelect.value = sortMode;
  dom.playerViewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.playerView === (state.playerRosterView || "cards"));
  });
  dom.rosterGrid.classList.toggle("is-list", state.playerRosterView === "list");

  if (!state.players.length) {
    dom.rosterGrid.innerHTML = `<div class="empty-state">Noch keine Spieler angelegt.</div>`;
    return;
  }

  if (!players.length) {
    dom.rosterGrid.innerHTML = `<div class="empty-state">Keine Spieler passend zu diesen Filtern.</div>`;
    return;
  }

  dom.rosterGrid.innerHTML = players
    .map(({ player, aggregate, trend, injury, availability }) => {
      return `
        <article class="roster-card" data-open-player="${player.id}" role="button" tabindex="0" aria-label="Spielerprofil von ${escapeHtml(player.name)} öffnen">
          <div class="roster-header">
            ${playerAvatar(player)}
            <div>
              <h3>#${player.number} ${playerNameLink(player)}</h3>
              <span class="tag">${escapeHtml(player.primaryPosition || player.position)}</span>
            </div>
          </div>
          ${player.secondaryPositions?.length ? `<div class="position-tags">${player.secondaryPositions.map((position) => `<span>${escapeHtml(position)}</span>`).join("")}</div>` : ""}
          <div class="player-detail-list">
            <div class="player-detail">
              <span>Jahrgang</span>
              <strong>${player.birthYear || "Offen"}</strong>
            </div>
            <div class="player-detail">
              <span>Größe</span>
              <strong>${player.height ? `${player.height} cm` : "Offen"}</strong>
            </div>
            <div class="player-detail">
              <span>Fuß</span>
              <strong>${escapeHtml(player.foot || "Offen")}</strong>
            </div>
            <div class="player-detail">
              <span>Mit Ball</span>
              <strong>${escapeHtml(shortRole(player.roleInPossession || player.role || "Offen"))}</strong>
            </div>
            <div class="player-detail">
              <span>Gegen Ball</span>
              <strong>${escapeHtml(shortRole(player.roleOutOfPossession || "Offen"))}</strong>
            </div>
          </div>
          <div class="roster-meta">
            <span class="tag teal">${aggregate.games} Spiele</span>
            <span class="tag amber">${formatNumber(aggregate.averageIndex)} Index</span>
            ${injury ? `<span class="tag danger">${escapeHtml(injury.status)} · ${escapeHtml(injury.bodyArea)}</span>` : ""}
            <span class="tag danger">${availability.unexcused} unentschuldigt</span>
            <span class="tag">${formatNumber(aggregate.passAccuracy)}% Pässe</span>
          </div>
          ${player.profileNote ? `<p class="profile-note">${escapeHtml(player.profileNote)}</p>` : ""}
          ${playerHoverCard(player, aggregate, trend, availability)}
          <div class="card-actions">
            <button class="ghost-button" data-edit-player="${player.id}" type="button">Bearbeiten</button>
            <button class="danger-button" data-delete-player="${player.id}" type="button">Entfernen</button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.rosterGrid.querySelectorAll("[data-delete-player]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openDeleteConfirmation("player", button.dataset.deletePlayer);
    });
  });

  dom.rosterGrid.querySelectorAll("[data-edit-player]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      startPlayerEdit(button.dataset.editPlayer);
    });
  });

  dom.rosterGrid.querySelectorAll("[data-open-player]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-delete-player], [data-edit-player]")) return;
      openPlayerProfile(card.dataset.openPlayer);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPlayerProfile(card.dataset.openPlayer);
    });
  });
}

function sortRosterPlayers(a, b, sortMode) {
  if (sortMode === "name") return a.player.name.localeCompare(b.player.name, "de");
  if (sortMode === "index") return b.aggregate.averageIndex - a.aggregate.averageIndex || sortByNumber(a.player, b.player);
  if (sortMode === "games") return b.aggregate.games - a.aggregate.games || sortByNumber(a.player, b.player);
  if (sortMode === "passAccuracy") return b.aggregate.passAccuracy - a.aggregate.passAccuracy || sortByNumber(a.player, b.player);
  return sortByNumber(a.player, b.player);
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .trim();
}

function playerHoverCard(player, aggregate, trend, availability = {}) {
  const delta = Number(trend.delta || 0);
  return `
    <aside class="player-hover-card" aria-hidden="true">
      <div class="hover-card-head">
        ${playerAvatar(player)}
        <div>
          <strong>#${player.number} ${escapeHtml(player.name)}</strong>
          <span>${escapeHtml(player.primaryPosition || player.position)} · ${escapeHtml(shortRole(player.roleInPossession || player.role || "Rolle offen"))}</span>
        </div>
      </div>
      <div class="hover-stat-grid">
        <div><span>Spiele</span><strong>${aggregate.games}</strong></div>
        <div><span>Index</span><strong>${formatNumber(aggregate.averageIndex)}</strong></div>
        <div><span>Passquote</span><strong>${formatNumber(aggregate.passAccuracy)}%</strong></div>
        <div><span>Score</span><strong>${aggregate.goals}+${aggregate.assists}</strong></div>
        <div class="${availability.unexcused ? "is-critical" : ""}"><span>Unentsch.</span><strong>${availability.unexcused || 0}</strong></div>
        <div class="${availability.unexcused ? "is-critical" : ""}"><span>Unent. %</span><strong>${formatNumber(availability.unexcusedRate || 0)}%</strong></div>
      </div>
      <div class="hover-trend ${delta >= 0 ? "positive" : "negative"}">
        <span>Trend letzte 5</span>
        <strong>${delta >= 0 ? "+" : ""}${formatNumber(delta)} Index</strong>
      </div>
      <p>${escapeHtml(player.profileNote || "Noch keine Profilnotiz hinterlegt.")}</p>
    </aside>
  `;
}

function startPlayerEdit(playerId) {
  const player = getPlayer(playerId);
  if (!player) return;

  editingPlayerId = playerId;
  pendingPlayerPhoto = player.photo || "";
  dom.playerName.value = player.name || "";
  renderPlayerPositionControls(player.primaryPosition || player.position, player.secondaryPositions || [], player.roleInPossession, player.roleOutOfPossession);
  dom.playerNumber.value = player.number || "";
  dom.playerBirthYear.value = player.birthYear || "";
  dom.playerHeight.value = player.height || "";
  dom.playerFoot.value = player.foot || "Rechts";
  dom.playerProfileNote.value = player.profileNote || "";
  dom.playerTrainingGoal.value = player.trainingGoal || "";
  dom.playerPhoto.value = "";
  renderPlayerPhotoPreview();
  renderPlayerFormMode();
  dom.playerForm.scrollIntoView({ block: "start", behavior: "smooth" });
  dom.playerName.focus();
}

function openPlayerProfile(playerId) {
  const player = getPlayer(playerId);
  if (!player) return;

  activeProfilePlayerId = playerId;
  const playerStats = playerStatsWithMatches(playerId).sort((a, b) => b.match.date.localeCompare(a.match.date));
  if (activeProfileMatchId !== "season" && !playerStats.some((item) => item.match.id === activeProfileMatchId)) {
    activeProfileMatchId = "season";
  }

  dom.playerProfileModal.classList.add("is-visible");
  dom.playerProfileModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  activeProfileTab = "overview";
  positionProfileComparePlayers = [];
  renderPlayerProfile();
}

function closePlayerProfile() {
  dom.playerProfileModal.classList.remove("is-visible");
  dom.playerProfileModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function editActiveProfilePlayer() {
  const playerId = activeProfilePlayerId;
  if (!getPlayer(playerId)) return;
  closePlayerProfile();
  setView("players");
  startPlayerEdit(playerId);
}

function renderPlayerProfile() {
  const data = playerReportData(activeProfilePlayerId, activeProfileMatchId);
  if (!data) return;

  const { player, aggregate, selected, trend, reportMode } = data;
  dom.playerProfileTitle.textContent = `${player.name} · Spielerbericht`;
  activeProfileMatchId = reportMode === "season" ? "season" : selected?.match.id || "season";
  const reportTitle = reportMode === "season" ? "Saisonstatistik" : `${escapeHtml(selected.match.opponent)} · ${selected.match.goalsFor}:${selected.match.goalsAgainst}`;
  const reportSubtitle = reportMode === "season" ? `${aggregate.games} Spiele · ${aggregate.minutes} Minuten` : `${formatDate(selected.match.date)} · ${escapeHtml(selected.match.venue || "Heim")} · ${escapeHtml(selected.match.competition || "Spiel")}`;
  const reportMetrics = reportMode === "season" ? reportSeasonMetrics(aggregate) : reportMatchMetrics(selected);
  const overviewContent = `
    <div class="report-grid">
      <section class="report-card report-card-large">
        <span class="eyebrow">${reportMode === "season" ? "Saison" : "Einzelspiel"}</span>
        <h3>${reportTitle}</h3>
        <p class="report-subline">${reportSubtitle}</p>
        <div class="report-metric-grid report-metric-grid-wide">
          ${reportMetrics.map(reportMetricHtml).join("")}
        </div>
        ${reportMode === "match" && selected?.stat.note ? `<p class="report-note">${escapeHtml(selected.stat.note)}</p>` : ""}
      </section>

      <section class="report-card">
        <span class="eyebrow">Trend</span>
        <h3>Letzte 5 Spiele</h3>
        <div class="trend-summary">
          <span class="tag ${trend.delta >= 0 ? "teal" : "amber"}">${trend.delta >= 0 ? "+" : ""}${formatNumber(trend.delta)} Index</span>
          <span class="tag">${formatNumber(trend.average)} Ø Index</span>
          <span class="tag amber">${formatNumber(trend.best)} Topwert</span>
        </div>
        <div class="chart-box compact trend-chart" id="profileTrendChart"></div>
      </section>
    </div>

    ${reportMode === "match" ? `<section class="report-card">
      <span class="eyebrow">Saisonprofil</span>
      <h3>Übersicht Saison</h3>
      <div class="report-metric-grid">
        ${reportSeasonMetrics(aggregate).map(reportMetricHtml).join("")}
      </div>
    </section>` : ""}

    ${renderPlayerEventProfile(player, reportMode === "match" ? selected?.match.id : "")}
    ${renderPlayerLineupUsage(player)}
  `;

  dom.playerProfileContent.innerHTML = `
    <div class="player-report">
      <section class="report-hero">
        ${reportPhoto(player)}
        <div>
          <h3>#${player.number} ${escapeHtml(player.name)}</h3>
          <div class="roster-meta">
            <span class="tag">${escapeHtml(player.primaryPosition || player.position)}</span>
            <span class="tag teal">${escapeHtml(shortRole(player.roleInPossession || player.role || "Rolle offen"))}</span>
            <span class="tag">${escapeHtml(shortRole(player.roleOutOfPossession || "Gegen Ball offen"))}</span>
            <span class="tag amber">${escapeHtml(player.foot || "Fuß offen")}</span>
          </div>
          ${player.secondaryPositions?.length ? `<div class="position-tags inverted">${player.secondaryPositions.map((position) => `<span>${escapeHtml(position)}</span>`).join("")}</div>` : ""}
          <p>${escapeHtml(player.profileNote || "Noch keine Profilnotiz hinterlegt.")}</p>
          <p><strong>Trainingsziel:</strong> ${escapeHtml(player.trainingGoal || "noch offen")}</p>
        </div>
        <div class="report-match-select">
          <label>
            Bericht anzeigen
            <select id="profileReportSelect">
              <option value="season" ${reportMode === "season" ? "selected" : ""}>Saisonstatistik</option>
              ${data.entries.map((entry) => `<option value="${entry.match.id}" ${entry.match.id === activeProfileMatchId ? "selected" : ""}>${formatDate(entry.match.date)} · ${escapeHtml(entry.match.opponent)}</option>`).join("")}
            </select>
          </label>
        </div>
      </section>

      <div class="view-tabs profile-tabs" role="tablist" aria-label="Spielerprofil">
        <button class="view-tab ${activeProfileTab === "overview" ? "is-active" : ""}" data-profile-tab="overview" type="button">Spielerbericht</button>
        <button class="view-tab ${activeProfileTab === "position" ? "is-active" : ""}" data-profile-tab="position" type="button">Positionsspezifische Statistiken</button>
        <button class="view-tab ${activeProfileTab === "training" ? "is-active" : ""}" data-profile-tab="training" type="button">Trainingsstatistik</button>
        <button class="view-tab ${activeProfileTab === "availability" ? "is-active" : ""}" data-profile-tab="availability" type="button">Verfügbarkeit</button>
      </div>

      ${activeProfileTab === "position" ? renderPositionSpecificProfile(player) : activeProfileTab === "training" ? renderPlayerTrainingProfile(player) : activeProfileTab === "availability" ? renderPlayerAvailabilityProfile(player) : overviewContent}
    </div>
  `;

  const select = document.querySelector("#profileReportSelect");
  if (select) {
    select.addEventListener("change", () => {
      activeProfileMatchId = select.value;
      activeProfileTab = "overview";
      renderPlayerProfile();
    });
  }

  document.querySelectorAll("[data-profile-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProfileTab = button.dataset.profileTab;
      renderPlayerProfile();
    });
  });
  bindPositionCompareControls();
  renderProfileTrendChart(trend);
}

function reportMatchMetrics(selected) {
  if (!selected) {
    return emptyReportMetrics();
  }

  const stat = statWithOfficialScoring(selected.stat);
  return [
    { label: "Index", value: formatNumber(calculateIndex(stat)) },
    { label: "Minuten", value: Number(stat.minutes || 0) },
    { label: "Bewertung", value: formatNumber(Number(stat.rating || 0)) },
    { label: "Passquote", value: `${formatNumber(passAccuracy(stat))}%` },
    { label: "Pässe angekommen", value: Number(stat.passesCompleted || 0) },
    { label: "Pässe gesamt", value: Number(stat.passesAttempted || 0) },
    { label: "Tore", value: Number(stat.goals || 0) },
    { label: "Assists", value: Number(stat.assists || 0) },
    { label: "Tore + Assists", value: Number(stat.goals || 0) + Number(stat.assists || 0) },
    { label: "Abschlüsse", value: Number(stat.shots || 0) },
    { label: "Dribblings", value: `${Number(stat.dribblesCompleted || 0)}/${Number(stat.dribblesAttempted || 0)}` },
    { label: "Dribblingquote", value: `${formatNumber(stat.dribblesAttempted ? (stat.dribblesCompleted / stat.dribblesAttempted) * 100 : 0)}%` },
    { label: "Flanken", value: `${Number(stat.crossesCompleted || 0)}/${Number(stat.crossesAttempted || 0)}` },
    { label: "Flankenquote", value: `${formatNumber(stat.crossesAttempted ? (stat.crossesCompleted / stat.crossesAttempted) * 100 : 0)}%` },
    { label: "Tacklings", value: Number(stat.tacklesWon || 0) },
    { label: "Zweikämpfe", value: Number(stat.duelsWon || 0) },
    { label: "Balleroberungen", value: Number(stat.interceptions || 0) },
    { label: "Ballverluste", value: Number(stat.ballLosses || 0) },
  ];
}

function reportSeasonMetrics(aggregate) {
  return [
    { label: "Spiele", value: aggregate.games },
    { label: "Minuten", value: aggregate.minutes },
    { label: "Ø Index", value: formatNumber(aggregate.averageIndex) },
    { label: "Ø Bewertung", value: formatNumber(aggregate.averageRating) },
    { label: "Passquote", value: `${formatNumber(aggregate.passAccuracy)}%` },
    { label: "Pässe angekommen", value: aggregate.passesCompleted },
    { label: "Pässe gesamt", value: aggregate.passesAttempted },
    { label: "Tore", value: aggregate.goals },
    { label: "Assists", value: aggregate.assists },
    { label: "Tore + Assists", value: aggregate.goals + aggregate.assists },
    { label: "Abschlüsse", value: aggregate.shots },
    { label: "Dribblings", value: `${aggregate.dribblesCompleted}/${aggregate.dribblesAttempted}` },
    { label: "Dribblingquote", value: `${formatNumber(aggregate.dribbleSuccess)}%` },
    { label: "Flanken", value: `${aggregate.crossesCompleted}/${aggregate.crossesAttempted}` },
    { label: "Flankenquote", value: `${formatNumber(aggregate.crossAccuracy)}%` },
    { label: "Tacklings", value: aggregate.tacklesWon },
    { label: "Zweikämpfe", value: aggregate.duelsWon },
    { label: "Balleroberungen", value: aggregate.interceptions },
    { label: "Ballverluste", value: aggregate.ballLosses },
  ];
}

function emptyReportMetrics() {
  return [
    { label: "Index", value: "0" },
    { label: "Minuten", value: "0" },
    { label: "Bewertung", value: "0" },
    { label: "Passquote", value: "0%" },
    { label: "Tore", value: "0" },
    { label: "Assists", value: "0" },
    { label: "Dribblings", value: "0/0" },
    { label: "Flanken", value: "0/0" },
  ];
}

function reportMetricHtml(metric) {
  return `
    <div class="report-metric ${metric.tone || ""}">
      <span>${escapeHtml(metric.label)}</span>
      <strong>${escapeHtml(metric.value)}</strong>
    </div>
  `;
}

function renderPlayerEventProfile(player, matchId = "") {
  const summary = playerEventSummary(player.id, matchId);
  const goals = playerEventRows(player.id, "goal", matchId);
  const assists = playerEventRows(player.id, "assist", matchId);
  const cards = playerEventRows(player.id, "card", matchId);
  const context = matchId ? getMatch(matchId) : null;

  return `
    <section class="report-card player-event-card">
      <div class="event-section-heading">
        <div>
          <span class="eyebrow">${context ? "Einzelspiel" : "Saison"}</span>
          <h3>Tore, Vorlagen & Karten</h3>
          <p class="report-subline">${context ? `${formatDate(context.date)} · ${escapeHtml(context.opponent)}` : "Offizielle Werte aus dem Spieltagsmodul"}</p>
        </div>
      </div>
      <div class="report-metric-grid report-metric-grid-wide">
        ${[
          { label: "Tore", value: summary.goals },
          { label: "Vorlagen", value: summary.assists },
          { label: "Gelb", value: summary.yellow },
          { label: "Gelb-Rot", value: summary.secondYellow },
          { label: "Rot", value: summary.red },
          { label: "Karten gesamt", value: summary.cards },
          { label: "Kopfballtore", value: summary.goalTypes.header || 0 },
          { label: "Rechter Fuß", value: summary.goalTypes["right-foot"] || 0 },
        ].map(reportMetricHtml).join("")}
      </div>
      <div class="player-event-columns">
        ${playerEventList("Tore", goals, "Noch kein Tor im Spieltagsmodul erfasst.")}
        ${playerEventList("Vorlagen", assists, "Noch keine Vorlage im Spieltagsmodul erfasst.")}
        ${playerEventList("Karten", cards, "Noch keine Karte für diesen Spieler erfasst.")}
      </div>
    </section>
  `;
}

function renderPlayerLineupUsage(player) {
  const usage = playerLineupUsage(player.id);
  const latestRows = usage.rows.slice().sort((a, b) => b.match.date.localeCompare(a.match.date)).slice(0, 8);

  return `
    <section class="report-card player-lineup-card">
      <div class="event-section-heading">
        <div>
          <span class="eyebrow">Aufstellung</span>
          <h3>Positions- & Rollenhistorie</h3>
          <p class="report-subline">Auswertung aus den gespeicherten Aufstellungen im Spieltagsmodul.</p>
        </div>
      </div>
      <div class="report-metric-grid report-metric-grid-wide">
        ${[
          { label: "Einsätze", value: usage.appearances },
          { label: "Startelf", value: usage.statusCounts.get("Startelf") || 0 },
          { label: "Bank", value: usage.statusCounts.get("Bank") || 0 },
          { label: "Häufigste Position", value: topUsageLabel(usage.positionCounts) },
          { label: "Top-Rolle mit Ball", value: shortRole(topUsageLabel(usage.roleInCounts)) },
          { label: "Top-Rolle gegen Ball", value: shortRole(topUsageLabel(usage.roleOutCounts)) },
        ].map(reportMetricHtml).join("")}
      </div>
      <div class="player-lineup-usage-grid">
        ${usageRankingBlock("Positionen", usage.positionCounts)}
        ${usageRankingBlock("Rollen mit Ball", usage.roleInCounts, true)}
        ${usageRankingBlock("Rollen gegen Ball", usage.roleOutCounts, true)}
      </div>
      <div class="table-wrap slim">
        <table class="usage-table">
          <thead>
            <tr>
              <th>Spiel</th>
              <th>Status</th>
              <th>Position</th>
              <th>Mit Ball</th>
              <th>Gegen Ball</th>
              <th>Min.</th>
            </tr>
          </thead>
          <tbody>
            ${latestRows.length ? latestRows.map(lineupUsageTableRow).join("") : `<tr><td colspan="6">Noch keine Aufstellungsdaten für diesen Spieler.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function playerLineupUsage(playerId) {
  const player = getPlayer(playerId);
  const positionCounts = new Map();
  const roleInCounts = new Map();
  const roleOutCounts = new Map();
  const statusCounts = new Map();
  const rows = state.matches
    .slice()
    .sort(sortByDateAsc)
    .map((match) => {
      const lineup = normalizeLineup(match);
      const item = lineup.find((entry) => entry.playerId === playerId);
      const stat = statsForMatch(match.id).find((entry) => entry.playerId === playerId);
      if (!item || !player) return null;
      return {
        match,
        status: normalizeLineupStatus(item.status),
        position: normalizePlayerPosition(item.position || player.primaryPosition || player.position),
        roleInPossession: normalizePossessionRole(item.position || player.primaryPosition || player.position, item.roleInPossession),
        roleOutOfPossession: normalizeOutOfPossessionRole(item.position || player.primaryPosition || player.position, item.roleOutOfPossession),
        minutes: Number(stat?.minutes || 0),
      };
    })
    .filter(Boolean)
    .filter((row) => row.status === "Startelf" || row.status === "Bank" || row.minutes > 0);

  rows.forEach((row) => {
    addEventCount(statusCounts, row.status);
    addEventCount(positionCounts, row.position);
    addEventCount(roleInCounts, row.roleInPossession);
    addEventCount(roleOutCounts, row.roleOutOfPossession);
  });

  return {
    rows,
    appearances: rows.length,
    statusCounts,
    positionCounts,
    roleInCounts,
    roleOutCounts,
  };
}

function usageRankingBlock(title, map, shorten = false) {
  const rows = mapToRanking(map);
  return `
    <div class="event-ranking-block usage-ranking-block">
      <h4>${escapeHtml(title)}</h4>
      ${rows.length
        ? rows.map((row, index) => `
            <div class="event-ranking-row">
              <span>${index + 1}</span>
              <strong>${escapeHtml(shorten ? shortRole(row.name) : row.name)}</strong>
              <em>${row.value}</em>
            </div>
          `).join("")
        : `<p class="muted">Noch keine Einsätze.</p>`}
    </div>
  `;
}

function lineupUsageTableRow(row) {
  return `
    <tr>
      <td><strong>${formatDate(row.match.date)}</strong><br><span class="muted">${escapeHtml(row.match.opponent)}</span></td>
      <td>${escapeHtml(row.status)}</td>
      <td>${escapeHtml(row.position)}</td>
      <td>${escapeHtml(shortRole(row.roleInPossession))}</td>
      <td>${escapeHtml(shortRole(row.roleOutOfPossession))}</td>
      <td>${row.minutes || "–"}</td>
    </tr>
  `;
}

function topUsageLabel(map) {
  return mapToRanking(map)[0]?.name || "Offen";
}

function renderPlayerTrainingProfile(player) {
  const summary = playerTrainingSummary(player.id, filteredTrainings(defaultTrainingFilters));
  const recentRows = summary.rows.slice().sort((a, b) => b.training.date.localeCompare(a.training.date)).slice(0, 10);
  const reasonMap = new Map();
  summary.rows.forEach((row) => {
    if (!isUnavailableStatus(row.availability.status)) return;
    addEventCount(reasonMap, row.availability.reason || row.availability.status);
  });
  return `
    <div class="player-training-profile">
      <section class="report-card">
        <span class="eyebrow">Training</span>
        <h3>Saison-Trainingsprofil</h3>
        <p class="report-subline">Individuelles Trainingsziel: ${escapeHtml(player.trainingGoal || "noch offen")}</p>
        <div class="report-metric-grid report-metric-grid-wide">
          ${[
            { label: "Trainings", value: summary.total },
            { label: "Zusagen", value: summary.confirmed },
            { label: "Absagen", value: summary.cancelled },
            { label: "Verletzt", value: summary.injured },
            { label: "Unentschuldigt", value: `${summary.unexcused} · ${formatNumber(summary.unexcusedRate)}%`, tone: "critical" },
            { label: "Teilnahme", value: `${formatNumber(summary.attendanceRate)}%` },
            { label: "Ø Bewertung", value: formatNumber(summary.averageRating) },
            { label: "Bewertungen", value: summary.ratingCount },
            { label: "Letzter Status", value: summary.latestStatus || "Offen" },
          ].map(reportMetricHtml).join("")}
        </div>
      </section>

      <div class="report-grid">
        <section class="report-card">
          <span class="eyebrow">Form</span>
          <h3>Trainingsbewertungen</h3>
          <div class="chart-box compact">${trainingPlayerRatingChart(summary.rows)}</div>
        </section>
        <section class="report-card">
          <span class="eyebrow">Absagen</span>
          <h3>Gründe</h3>
          <div class="event-list">
            ${mapToRanking(reasonMap).length ? mapToRanking(reasonMap).map((row, index) => `
              <article class="event-ranking-row">
                <span>${index + 1}</span>
                <strong>${escapeHtml(row.name)}</strong>
                <em>${row.value}</em>
              </article>
            `).join("") : `<div class="empty-state small-empty">Keine Absagegründe erfasst.</div>`}
          </div>
        </section>
      </div>

      <section class="report-card">
        <span class="eyebrow">Historie</span>
        <h3>Letzte Trainings</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Training</th>
                <th>Status</th>
                <th>Grund</th>
                <th>Bewertung</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${recentRows.length ? recentRows.map(playerTrainingRowHtml).join("") : `<tr><td colspan="6">Noch keine Trainingsdaten für diesen Spieler.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function trainingPlayerRatingChart(rows) {
  const entries = rows
    .filter((row) => Number(row.rating?.rating || 0) > 0)
    .slice(-8);
  if (!entries.length) return emptySvg("Noch keine Trainingsbewertungen.");
  const width = 620;
  const height = 240;
  const padding = { top: 26, right: 28, bottom: 44, left: 38 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const xFor = (index) => padding.left + (entries.length === 1 ? chartWidth / 2 : (index / (entries.length - 1)) * chartWidth);
  const yFor = (value) => padding.top + chartHeight - (Number(value || 0) / 10) * chartHeight;
  const points = entries.map((entry, index) => `${xFor(index)},${yFor(entry.rating.rating)}`).join(" ");
  const labels = entries.map((entry, index) => `<text class="chart-label" x="${xFor(index)}" y="${height - 16}" text-anchor="middle">${escapeSvg(formatDate(entry.training.date).slice(0, 5))}</text>`).join("");
  const dots = entries.map((entry, index) => `<circle cx="${xFor(index)}" cy="${yFor(entry.rating.rating)}" r="4" fill="${colors[index % colors.length]}" /><text class="chart-value" x="${xFor(index)}" y="${yFor(entry.rating.rating) - 9}" text-anchor="middle">${formatNumber(entry.rating.rating)}</text>`).join("");
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Trainingsbewertung">
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}" stroke="#ded6ca" />
      <line x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" stroke="#ded6ca" />
      <polyline points="${points}" fill="none" stroke="${colors[0]}" stroke-width="3" />
      ${dots}
      ${labels}
    </svg>
  `;
}

function playerMatchAvailabilitySummary(playerId, matches = state.matches) {
  const rows = matches
    .slice()
    .sort(sortByDateAsc)
    .map((match) => {
      const availability = (match.availability || []).find((item) => item.playerId === playerId) || { status: "Offen", reason: "", note: "" };
      return { match, availability };
    });
  const total = rows.length;
  const confirmed = rows.filter((row) => row.availability.status === "Zusage").length;
  const cancelled = rows.filter((row) => isUnavailableStatus(row.availability.status)).length;
  const injured = rows.filter((row) => row.availability.status === "Verletzt").length;
  const unexcused = rows.filter((row) => row.availability.status === "Unentschuldigt").length;
  const latest = rows.slice().sort((a, b) => b.match.date.localeCompare(a.match.date))[0];
  return {
    rows,
    total,
    confirmed,
    cancelled,
    injured,
    unexcused,
    questionable: rows.filter((row) => row.availability.status === "Fraglich").length,
    open: rows.filter((row) => row.availability.status === "Offen").length,
    attendanceRate: total ? (confirmed / total) * 100 : 0,
    unexcusedRate: total ? (unexcused / total) * 100 : 0,
    latestStatus: latest?.availability.status || "",
  };
}

function renderPlayerAvailabilityProfile(player) {
  const matchSummary = playerMatchAvailabilitySummary(player.id, filteredMatches(defaultFilters));
  const trainingSummaryData = playerTrainingSummary(player.id, filteredTrainings(defaultTrainingFilters));
  const injuries = (state.injuries || []).filter((injury) => injury.playerId === player.id).sort((a, b) => b.startDate.localeCompare(a.startDate));
  const recentMatches = matchSummary.rows.slice().sort((a, b) => b.match.date.localeCompare(a.match.date)).slice(0, 10);
  return `
    <div class="player-training-profile">
      <div class="report-grid">
        <section class="report-card">
          <span class="eyebrow">Spiele</span>
          <h3>Spiel-Verfügbarkeit</h3>
          <div class="report-metric-grid report-metric-grid-wide">
            ${[
              { label: "Spiele", value: matchSummary.total },
              { label: "Zusagen", value: matchSummary.confirmed },
              { label: "Absagen", value: matchSummary.cancelled },
              { label: "Verletzt", value: matchSummary.injured },
              { label: "Unentschuldigt", value: `${matchSummary.unexcused} · ${formatNumber(matchSummary.unexcusedRate)}%`, tone: "critical" },
              { label: "Teilnahme", value: `${formatNumber(matchSummary.attendanceRate)}%` },
              { label: "Fraglich", value: matchSummary.questionable },
              { label: "Letzter Status", value: matchSummary.latestStatus || "Offen" },
            ].map(reportMetricHtml).join("")}
          </div>
        </section>

        <section class="report-card">
          <span class="eyebrow">Training</span>
          <h3>Trainings-Verfügbarkeit</h3>
          <div class="report-metric-grid report-metric-grid-wide">
            ${[
              { label: "Trainings", value: trainingSummaryData.total },
              { label: "Zusagen", value: trainingSummaryData.confirmed },
              { label: "Absagen", value: trainingSummaryData.cancelled },
              { label: "Verletzt", value: trainingSummaryData.injured },
              { label: "Unentschuldigt", value: `${trainingSummaryData.unexcused} · ${formatNumber(trainingSummaryData.unexcusedRate)}%`, tone: "critical" },
              { label: "Teilnahme", value: `${formatNumber(trainingSummaryData.attendanceRate)}%` },
              { label: "Fraglich", value: trainingSummaryData.questionable },
              { label: "Letzter Status", value: trainingSummaryData.latestStatus || "Offen" },
            ].map(reportMetricHtml).join("")}
          </div>
        </section>
      </div>

      <section class="report-card">
        <span class="eyebrow">Medizin</span>
        <h3>Verletzungshistorie</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Zeitraum</th>
                <th>Verletzung</th>
                <th>Status</th>
                <th>Belastung</th>
                <th>Hinweis</th>
              </tr>
            </thead>
            <tbody>
              ${injuries.length ? injuries.map(playerInjuryHistoryRow).join("") : `<tr><td colspan="5">Keine Verletzungen erfasst.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>

      <section class="report-card">
        <span class="eyebrow">Spieltag</span>
        <h3>Letzte Zu-/Absagen</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Spiel</th>
                <th>Status</th>
                <th>Grund</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${recentMatches.length ? recentMatches.map(playerAvailabilityHistoryRow).join("") : `<tr><td colspan="5">Noch keine Spieldaten.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function playerInjuryHistoryRow(injury) {
  const guidance = injuryGuidance(injury);
  const statusClass = injury.status === "Ausgeheilt" ? "" : "critical-cell";
  return `
    <tr>
      <td>${formatDate(injury.startDate)}${injury.endDate ? ` - ${formatDate(injury.endDate)}` : " - offen"}</td>
      <td><strong>${escapeHtml(injury.type)}</strong><br><span class="muted">${escapeHtml(injury.bodyArea)} · ${escapeHtml(injury.severity)}</span></td>
      <td class="${statusClass}">${escapeHtml(injury.status)}</td>
      <td>${escapeHtml(injury.trainingLoad || guidance.trainingLoad)}</td>
      <td>${escapeHtml(injury.returnGuidance || guidance.returnGuidance)}</td>
    </tr>
  `;
}

function playerAvailabilityHistoryRow(row) {
  const statusClass = row.availability.status === "Unentschuldigt" ? "critical-cell" : "";
  return `
    <tr>
      <td>${formatDate(row.match.date)}</td>
      <td>${escapeHtml(row.match.opponent)}<br><span class="muted">${escapeHtml(row.match.competition || "Spiel")}</span></td>
      <td class="${statusClass}">${escapeHtml(row.availability.status || "Offen")}</td>
      <td>${escapeHtml(row.availability.reason || "—")}</td>
      <td>${escapeHtml(row.availability.note || "—")}</td>
    </tr>
  `;
}

function playerTrainingRowHtml(row) {
  return `
    <tr>
      <td>${formatDate(row.training.date)}</td>
      <td><strong>${escapeHtml(row.training.type)}</strong><br><span class="muted">${escapeHtml(row.training.topic || row.training.location || "")}</span></td>
      <td>${escapeHtml(row.availability.status)}</td>
      <td>${escapeHtml(row.availability.reason || "-")}</td>
      <td>${row.rating?.rating ? formatNumber(row.rating.rating) : "-"}</td>
      <td>${escapeHtml(row.rating?.note || row.availability.note || "")}</td>
    </tr>
  `;
}

function playerEventRows(playerId, type, matchId = "") {
  const matches = matchId ? [getMatch(matchId)].filter(Boolean) : state.matches.slice().sort(sortByDateDesc);
  return matches.flatMap((match) => {
    if (type === "card") {
      return matchCardEvents(match)
        .filter((event) => event.team === "own" && event.playerId === playerId)
        .map((event) => ({ match, event, type }));
    }

    return matchGoalEvents(match)
      .filter((event) => event.team === "own")
      .filter((event) => (type === "goal" ? event.playerId === playerId : event.assistPlayerId === playerId))
      .map((event) => ({ match, event, type }));
  });
}

function playerEventList(title, rows, emptyText) {
  return `
    <div class="player-event-list">
      <h4>${escapeHtml(title)}</h4>
      <div class="event-list">
        ${rows.length ? rows.map(playerEventRowHtml).join("") : `<div class="empty-state small-empty">${escapeHtml(emptyText)}</div>`}
      </div>
    </div>
  `;
}

function playerEventRowHtml(row) {
  const { match, event, type } = row;
  const isCard = type === "card";
  const title = isCard
    ? event.cardType
    : type === "assist"
      ? `Vorlage für ${eventParticipantName(event, "scorer") || "Tor"}`
      : eventParticipantName(event, "scorer") || "Tor";
  const detail = isCard
    ? `${formatDate(match.date)} · ${match.opponent}${event.note ? ` · ${event.note}` : ""}`
    : `${formatDate(match.date)} · ${match.opponent}${eventParticipantName(event, "assist") && type === "goal" ? ` · Assist: ${eventParticipantName(event, "assist")}` : ""}`;

  return `
    <article class="event-row player-event-row">
      <div class="event-minute">${Number(event.minute || 0)}'</div>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(detail)}</p>
        ${!isCard && event.goalTypes?.length ? `<div class="event-tags">${event.goalTypes.map((goalType) => `<span class="tag">${escapeHtml(goalTypeLabel(goalType))}</span>`).join("")}</div>` : ""}
      </div>
    </article>
  `;
}

function renderPositionSpecificProfile(player) {
  const family = playerPositionFamily(player);
  const groups = positionSpecificRadarGroups(family);
  const candidates = state.players
    .filter((candidate) => playerPositionFamily(candidate) === family)
    .sort(sortByNumber);
  const selectedIds = normalizePositionCompareSelection(player.id, candidates);
  const comparisons = selectedIds
    .map((playerId, index) => {
      const comparePlayer = getPlayer(playerId);
      if (!comparePlayer) return null;
      return {
        player: comparePlayer,
        profile: positionSpecificProfile(playerId),
        color: colors[index % colors.length],
      };
    })
    .filter(Boolean);
  const currentComparison = comparisons.find((comparison) => comparison.player.id === player.id) || comparisons[0];

  return `
    <section class="report-card position-profile-intro">
      <div>
        <span class="eyebrow">Positionsprofil</span>
        <h3>${escapeHtml(positionFamilyTitle(family))}</h3>
        <p class="report-subline">Radarwerte basieren auf den erfassten Spielerwerten und werden pro 90 Minuten, als Quote oder als Saisonwert angezeigt.</p>
      </div>
      <div class="position-compare-picker" id="positionComparePicker">
        ${candidates.map((candidate) => `
          <label class="player-chip">
            <input data-position-compare="${escapeHtml(candidate.id)}" type="checkbox" ${selectedIds.includes(candidate.id) ? "checked" : ""} ${candidate.id === player.id ? "disabled" : ""} />
            ${escapeHtml(shortPlayerLabel(candidate))}
          </label>
        `).join("")}
      </div>
    </section>

    <div class="position-radar-grid">
      ${groups.map((group) => `
        <section class="report-card position-radar-card">
          <span class="eyebrow">Positionsspezifische Statistiken</span>
          <h3>${escapeHtml(group.title)}</h3>
          <div class="chart-box position-radar-chart">${renderPositionRadarSvg(group, comparisons)}</div>
          ${currentComparison ? renderPositionMetricList(group, currentComparison.profile) : ""}
        </section>
      `).join("")}
    </div>
  `;
}

function normalizePositionCompareSelection(playerId, candidates) {
  const candidateIds = new Set(candidates.map((candidate) => candidate.id));
  const currentSelection = (positionProfileComparePlayers || []).filter((id) => candidateIds.has(id));
  const hasManualSelection = currentSelection.length > 0;
  const selected = [playerId, ...currentSelection.filter((id) => id !== playerId)];

  if (!hasManualSelection) {
    candidates.forEach((candidate) => {
      if (selected.length >= 4) return;
      if (!selected.includes(candidate.id)) selected.push(candidate.id);
    });
  }

  positionProfileComparePlayers = selected.slice(0, 4);
  return positionProfileComparePlayers;
}

function bindPositionCompareControls() {
  const controls = document.querySelectorAll("[data-position-compare]");
  if (!controls.length) return;

  controls.forEach((control) => {
    control.addEventListener("change", () => {
      const checked = Array.from(document.querySelectorAll("[data-position-compare]:checked"))
        .map((input) => input.dataset.positionCompare)
        .filter(Boolean);
      positionProfileComparePlayers = [activeProfilePlayerId, ...checked.filter((id) => id !== activeProfilePlayerId)].slice(0, 4);
      renderPlayerProfile();
    });
  });
}

function playerPositionFamily(player) {
  const position = normalizePlayerPosition(player?.primaryPosition || player?.position);
  if (position === "Torhüter") return "goalkeeper";
  if (["Innenverteidiger", "Außenverteidiger", "Flügelverteidiger"].includes(position)) return "defender";
  if (["Defensives Mittelfeld", "Zentrales Mittelfeld", "Offensives Mittelfeld"].includes(position)) return "midfielder";
  return "attacker";
}

function positionFamilyTitle(family) {
  return {
    goalkeeper: "Torwartprofil",
    defender: "Verteidigerprofil",
    midfielder: "Mittelfeldprofil",
    attacker: "Flügel- und Stürmerprofil",
  }[family] || "Positionsprofil";
}

function positionSpecificProfile(playerId) {
  const aggregate = aggregatePlayer(playerId);
  const entries = playerStatsWithMatches(playerId).filter((entry) => Number(entry.stat.minutes || 0) > 0);
  const minutes = Math.max(0, Number(aggregate.minutes || 0));
  const matchTotals = entries.reduce(
    (sum, entry) => {
      const minutesShare = Math.min(Number(entry.stat.minutes || 0), 90) / 90;
      const details = matchDetailStats(entry.match);
      sum.goalsAgainst += Number(entry.match.goalsAgainst || 0) * minutesShare;
      sum.opponentXg += Number(details.opponentXg || 0) * minutesShare;
      if (Number(entry.match.goalsAgainst || 0) === 0) sum.cleanSheets += 1;
      return sum;
    },
    { goalsAgainst: 0, opponentXg: 0, cleanSheets: 0 },
  );

  return {
    aggregate,
    minutes,
    passAccuracy: aggregate.passAccuracy,
    cleanSheets: matchTotals.cleanSheets,
    goalsAgainstPer90: per90(matchTotals.goalsAgainst, minutes),
    opponentXgPer90: per90(matchTotals.opponentXg, minutes),
    savesPer90: per90(aggregate.saves, minutes),
    saveRate: aggregate.shotsOnTargetAgainst ? (aggregate.saves / aggregate.shotsOnTargetAgainst) * 100 : 0,
    penaltySaveRate: aggregate.penaltiesFaced ? (aggregate.penaltiesSaved / aggregate.penaltiesFaced) * 100 : 0,
    passesAttemptedPer90: per90(aggregate.passesAttempted, minutes),
    clearancesPer90: per90(aggregate.clearances, minutes),
    aerialDuelsWonPer90: per90(aggregate.aerialDuelsWon, minutes),
    tacklesAttemptedPer90: per90(aggregate.tacklesAttempted, minutes),
    duelWinRate: aggregate.duelsAttempted ? (aggregate.duelsWon / aggregate.duelsAttempted) * 100 : 0,
    interceptionsPer90: per90(aggregate.interceptions, minutes),
    foulsCommittedPer90: per90(aggregate.foulsCommittedPlayer, minutes),
    blockedShotsPer90: per90(aggregate.blockedShots, minutes),
    progressivePassesPer90: per90(aggregate.progressivePasses, minutes),
    xAOpenPlayPer90: per90(aggregate.xAOpenPlay, minutes),
    goalsPer90: per90(aggregate.goals, minutes),
    nonPenaltyXgPer90: per90(aggregate.nonPenaltyXgStat, minutes),
    assistsPer90: per90(aggregate.assists, minutes),
    keyPassesPer90: per90(aggregate.keyPasses, minutes),
    chanceConversion: aggregate.shots ? (aggregate.goals / aggregate.shots) * 100 : 0,
    dribblesPer90: per90(aggregate.dribblesCompleted, minutes),
    crossAccuracy: aggregate.crossAccuracy,
  };
}

function positionSpecificRadarGroups(family) {
  const goalkeeperMetrics = [
    positionMetric("Passquote", "Pass%", "%", 100, (profile) => profile.passAccuracy),
    positionMetric("Ohne Gegentor", "Zu 0", "", 8, (profile) => profile.cleanSheets),
    positionMetric("Gegentore pro 90", "GT/90", "", 3, (profile) => profile.goalsAgainstPer90, true),
    positionMetric("xG Gegner pro 90", "xGA/90", "", 3, (profile) => profile.opponentXgPer90, true),
    positionMetric("Paraden pro 90", "Paraden", "", 8, (profile) => profile.savesPer90),
    positionMetric("Paradenquote", "Paraden%", "%", 100, (profile) => profile.saveRate),
    positionMetric("Gehaltene Elfmeter", "Elfer%", "%", 100, (profile) => profile.penaltySaveRate),
    positionMetric("Versuchte Pässe pro 90", "Pässe", "", 70, (profile) => profile.passesAttemptedPer90),
  ];

  const defensiveMetrics = [
    positionMetric("Geklärte Bälle pro 90", "Klär.", "", 10, (profile) => profile.clearancesPer90),
    positionMetric("Kopfballduelle gewonnen pro 90", "Kopf", "", 8, (profile) => profile.aerialDuelsWonPer90),
    positionMetric("Passquote", "Pass%", "%", 100, (profile) => profile.passAccuracy),
    positionMetric("Versuchte Tacklings pro 90", "Tack.", "", 8, (profile) => profile.tacklesAttemptedPer90),
    positionMetric("Gewonnene Zweikämpfe", "Zweik.%", "%", 100, (profile) => profile.duelWinRate),
    positionMetric("Abgefangene Bälle pro 90", "Inter.", "", 8, (profile) => profile.interceptionsPer90),
    positionMetric("Begangene Fouls pro 90", "Fouls", "", 5, (profile) => profile.foulsCommittedPer90, true),
    positionMetric("Geblockte Schüsse pro 90", "Blocks", "", 5, (profile) => profile.blockedShotsPer90),
  ];

  const midfieldGeneral = [
    positionMetric("Progressive Pässe pro 90", "Prog.", "", 20, (profile) => profile.progressivePassesPer90),
    positionMetric("xA aus dem Spiel pro 90", "xA", "", 1.2, (profile) => profile.xAOpenPlayPer90),
    positionMetric("Tore pro 90", "Tore", "", 1.2, (profile) => profile.goalsPer90),
    positionMetric("xG ohne Elfmeter pro 90", "xG", "", 1.2, (profile) => profile.nonPenaltyXgPer90),
    positionMetric("Vorlagen pro 90", "Ass.", "", 1.2, (profile) => profile.assistsPer90),
    positionMetric("Entscheidende Pässe pro 90", "Key", "", 5, (profile) => profile.keyPassesPer90),
    positionMetric("Passquote", "Pass%", "%", 100, (profile) => profile.passAccuracy),
    positionMetric("Gewonnene Zweikämpfe", "Zweik.%", "%", 100, (profile) => profile.duelWinRate),
  ];

  const finalThird = [
    positionMetric("xA aus dem Spiel pro 90", "xA", "", 1.4, (profile) => profile.xAOpenPlayPer90),
    positionMetric("Chancenverwertung", "Verw.%", "%", 100, (profile) => profile.chanceConversion),
    positionMetric("Tore pro 90", "Tore", "", 1.4, (profile) => profile.goalsPer90),
    positionMetric("xG ohne Elfmeter pro 90", "xG", "", 1.4, (profile) => profile.nonPenaltyXgPer90),
    positionMetric("Vorlagen pro 90", "Ass.", "", 1.2, (profile) => profile.assistsPer90),
    positionMetric("Entscheidende Pässe pro 90", "Key", "", 5, (profile) => profile.keyPassesPer90),
    positionMetric("Dribblings pro 90", "Drib.", "", 8, (profile) => profile.dribblesPer90),
    positionMetric("Progressive Pässe pro 90", "Prog.", "", 16, (profile) => profile.progressivePassesPer90),
  ];

  const creativity = [
    positionMetric("Angekommene Flanken", "Flanken%", "%", 100, (profile) => profile.crossAccuracy),
    positionMetric("Progressive Pässe pro 90", "Prog.", "", 16, (profile) => profile.progressivePassesPer90),
    positionMetric("Tore pro 90", "Tore", "", 1.4, (profile) => profile.goalsPer90),
    positionMetric("xG ohne Elfmeter pro 90", "xG", "", 1.4, (profile) => profile.nonPenaltyXgPer90),
    positionMetric("Vorlagen pro 90", "Ass.", "", 1.2, (profile) => profile.assistsPer90),
    positionMetric("xA aus dem Spiel pro 90", "xA", "", 1.4, (profile) => profile.xAOpenPlayPer90),
    positionMetric("Dribblings pro 90", "Drib.", "", 8, (profile) => profile.dribblesPer90),
    positionMetric("Passquote", "Pass%", "%", 100, (profile) => profile.passAccuracy),
  ];

  if (family === "goalkeeper") {
    return [
      { title: "Offensive Torwartaktionen", metrics: goalkeeperMetrics },
      { title: "Defensive Torwartaktionen", metrics: goalkeeperMetrics },
    ];
  }

  if (family === "defender") return [{ title: "Verteidiger", metrics: defensiveMetrics }];
  if (family === "midfielder") {
    return [
      { title: "Allgemein", metrics: midfieldGeneral },
      { title: "Defensivaktionen", metrics: defensiveMetrics },
    ];
  }

  return [
    { title: "Kreativität im letzten Drittel", metrics: finalThird },
    { title: "Kreativität", metrics: creativity },
  ];
}

function positionMetric(label, axisLabel, unit, max, value, lowerBetter = false) {
  return { label, axisLabel, unit, max, value, lowerBetter };
}

function renderPositionRadarSvg(group, comparisons) {
  if (!comparisons.length) return emptySvg("Noch keine Vergleichsdaten verfügbar.");

  const width = 540;
  const height = 370;
  const center = { x: 270, y: 166 };
  const radius = 104;
  const metrics = group.metrics;
  const angleFor = (index) => (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
  const pointFor = (index, scale) => {
    const angle = angleFor(index);
    return {
      x: center.x + Math.cos(angle) * radius * scale,
      y: center.y + Math.sin(angle) * radius * scale,
    };
  };

  const rings = [0.25, 0.5, 0.75, 1]
    .map((scale) => {
      const points = metrics.map((_, index) => pointFor(index, scale)).map((point) => `${point.x},${point.y}`).join(" ");
      return `<polygon points="${points}" fill="none" stroke="#e5ded2" />`;
    })
    .join("");
  const axisLines = metrics
    .map((metric, index) => {
      const end = pointFor(index, 1.18);
      const labelAnchor = end.x < center.x - 12 ? "end" : end.x > center.x + 12 ? "start" : "middle";
      return `
        <line x1="${center.x}" y1="${center.y}" x2="${end.x}" y2="${end.y}" stroke="#ded6ca" />
        <text class="axis-label" x="${end.x}" y="${end.y + 4}" text-anchor="${labelAnchor}">${escapeSvg(metric.axisLabel)}</text>
      `;
    })
    .join("");
  const polygons = comparisons
    .map((comparison) => {
      const points = metrics
        .map((metric, index) => {
          const rawValue = safeMetricValue(metric.value(comparison.profile));
          const ratio = clampNumber(rawValue / Math.max(Number(metric.max || 1), 1), 0, 1);
          const score = metric.lowerBetter ? 1 - ratio : ratio;
          return pointFor(index, score);
        })
        .map((point) => `${point.x},${point.y}`)
        .join(" ");
      return `<polygon points="${points}" fill="${comparison.color}22" stroke="${comparison.color}" stroke-width="2.4" />`;
    })
    .join("");
  const dots = comparisons
    .flatMap((comparison) => metrics.map((metric, index) => {
      const rawValue = safeMetricValue(metric.value(comparison.profile));
      const ratio = clampNumber(rawValue / Math.max(Number(metric.max || 1), 1), 0, 1);
      const score = metric.lowerBetter ? 1 - ratio : ratio;
      const point = pointFor(index, score);
      return `<circle cx="${point.x}" cy="${point.y}" r="3.4" fill="${comparison.color}" />`;
    }))
    .join("");
  const legend = comparisons
    .map((comparison, index) => {
      const x = 36 + (index % 2) * 242;
      const y = 318 + Math.floor(index / 2) * 24;
      return `
        <g transform="translate(${x} ${y})">
          <rect width="12" height="12" rx="3" fill="${comparison.color}" />
          <text x="18" y="10" class="chart-label">${escapeSvg(shortPlayerLabel(comparison.player))}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(group.title)} Radarvergleich">
      ${rings}
      ${axisLines}
      ${polygons}
      ${dots}
      ${legend}
    </svg>
  `;
}

function renderPositionMetricList(group, profile) {
  return `
    <div class="position-metric-list">
      ${group.metrics.map((metric) => `
        <div class="position-metric-pill">
          <span>${escapeHtml(metric.label)}</span>
          <strong>${formatPositionMetric(metric, safeMetricValue(metric.value(profile)))}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function formatPositionMetric(metric, value) {
  if (metric.unit === "%") return `${formatNumber(value)}%`;
  return formatNumber(value);
}

function safeMetricValue(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function per90(value, minutes) {
  return minutes ? (Number(value || 0) / minutes) * 90 : 0;
}

function shortPlayerLabel(player) {
  const parts = String(player?.name || "Spieler").split(/\s+/).filter(Boolean);
  const lastName = parts[parts.length - 1] || player?.name || "Spieler";
  return `#${player?.number || "-"} ${lastName}`;
}

function renderProfileTrendChart(trend) {
  const container = document.querySelector("#profileTrendChart");
  if (!container) return;
  if (!trend.points.length) {
    container.innerHTML = emptySvg("Noch kein Trend verfügbar.");
    return;
  }

  renderLineChart(
    container,
    [
      {
        name: "Index",
        color: colors[0],
        points: trend.points,
      },
    ],
    { yMax: Math.max(100, trend.best + 10), suffix: "" },
  );
}

function playerReportData(playerId, reportKey = "season") {
  const player = getPlayer(playerId);
  if (!player) return null;

  const entries = playerStatsWithMatches(playerId).sort((a, b) => b.match.date.localeCompare(a.match.date));
  const reportMode = reportKey && reportKey !== "season" ? "match" : "season";
  const selected = reportMode === "match" ? entries.find((entry) => entry.match.id === reportKey) || null : null;
  return {
    player,
    aggregate: aggregatePlayer(playerId),
    entries,
    selected,
    reportMode: selected ? "match" : "season",
    trend: playerTrend(playerId),
  };
}

function playerStatsWithMatches(playerId) {
  return activeStats()
    .filter((stat) => stat.playerId === playerId)
    .map((stat) => ({
      stat,
      match: state.matches.find((match) => match.id === stat.matchId),
    }))
    .filter((entry) => entry.match);
}

function playerTrend(playerId) {
  const entries = playerStatsWithMatches(playerId)
    .sort((a, b) => a.match.date.localeCompare(b.match.date))
    .slice(-5);
  return trendFromEntries(entries);
}

function trendFromEntries(entries) {
  const values = entries.map((entry) => calculateIndex(entry.stat));
  const first = values[0] || 0;
  const last = values[values.length - 1] || 0;
  return {
    points: entries.map((entry) => ({
      label: shortOpponent(entry.match.opponent),
      value: calculateIndex(entry.stat),
    })),
    delta: values.length > 1 ? last - first : 0,
    average: average(values),
    best: values.length ? Math.max(...values) : 0,
  };
}

function reportPhoto(player) {
  if (player.photo) {
    return `<div class="report-photo"><img src="${player.photo}" alt="" /></div>`;
  }
  return `<div class="report-photo" aria-hidden="true">${escapeHtml(initials(player.name))}</div>`;
}

async function downloadPlayerReport() {
  const data = playerReportData(activeProfilePlayerId, activeProfileMatchId);
  if (!data) return;

  const canvas = await renderPlayerReportCanvas(data);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    const selectedDate = data.selected?.match.date || "saison";
    link.download = `${slugify(data.player.name)}-${selectedDate}-spielerbericht.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }, "image/png");
}

async function renderPlayerReportCanvas(data) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = data.reportMode === "season" ? 1320 : 1680;
  const ctx = canvas.getContext("2d");
  const { player, aggregate, selected, trend, reportMode } = data;
  const isSeason = reportMode === "season";
  const reportTitle = isSeason ? "Saisonstatistik" : `${selected.match.opponent} ${selected.match.goalsFor}:${selected.match.goalsAgainst}`;
  const reportSubtitle = isSeason
    ? `${aggregate.games} Spiele · ${aggregate.minutes} Minuten`
    : `${formatDate(selected.match.date)} · ${selected.match.venue || "Heim"} · ${selected.match.competition || "Spiel"}`;
  const reportMetrics = isSeason ? reportSeasonMetrics(aggregate) : reportMatchMetrics(selected);

  ctx.fillStyle = "#f4f2ee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  roundRect(ctx, 50, 46, 980, 224, 16, "#26352e");
  await drawReportCanvasPhoto(ctx, player, 82, 82, 150);

  ctx.fillStyle = "#f8f5ef";
  ctx.font = "800 54px Segoe UI, Arial, sans-serif";
  ctx.fillText(`#${player.number} ${player.name}`, 262, 122);
  ctx.font = "700 25px Segoe UI, Arial, sans-serif";
  ctx.fillStyle = "#e0a549";
  ctx.fillText(`${player.primaryPosition || player.position} · ${shortRole(player.roleInPossession || player.role || "Rolle offen")}`, 264, 166);
  ctx.font = "500 23px Segoe UI, Arial, sans-serif";
  ctx.fillStyle = "rgba(248,245,239,0.82)";
  wrapCanvasText(ctx, player.profileNote || "Noch keine Profilnotiz hinterlegt.", 264, 206, 690, 30, 2);

  drawCanvasSection(ctx, 50, 300, 980, 560, isSeason ? "Saison" : "Einzelspiel", reportTitle, reportSubtitle);
  drawCanvasMetrics(ctx, reportMetrics, 82, 392, 916, 4);

  drawCanvasSection(ctx, 50, 890, 980, 255, "Trend", "Letzte 5 Spiele", `${trend.delta >= 0 ? "+" : ""}${formatNumber(trend.delta)} Index · ${formatNumber(trend.average)} Ø`);
  drawCanvasTrend(ctx, trend.points, 92, 980, 884, 120);

  if (!isSeason) {
    drawCanvasSection(ctx, 50, 1175, 980, 365, "Saisonprofil", "Übersicht", `${aggregate.games} Spiele · ${aggregate.minutes} Minuten`);
    drawCanvasMetrics(ctx, reportSeasonMetrics(aggregate), 82, 1265, 916, 4, 12);
  }

  ctx.fillStyle = "#6b7169";
  ctx.font = "600 20px Segoe UI, Arial, sans-serif";
  ctx.fillText("MatchLab Fußballanalyse", 50, canvas.height - 36);

  return canvas;
}

async function drawReportCanvasPhoto(ctx, player, x, y, size) {
  roundRect(ctx, x, y, size, size, 14, "#1f2c25");
  ctx.strokeStyle = "#e0a549";
  ctx.lineWidth = 5;
  strokeRoundRect(ctx, x, y, size, size, 14);

  if (player.photo) {
    try {
      const image = await loadImage(player.photo);
      ctx.save();
      roundedClip(ctx, x, y, size, size, 14);
      ctx.drawImage(image, x, y, size, size);
      ctx.restore();
      return;
    } catch {
      // Fall through to initials.
    }
  }

  ctx.fillStyle = "#f8f5ef";
  ctx.font = "900 44px Segoe UI, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials(player.name), x + size / 2, y + size / 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawCanvasSection(ctx, x, y, width, height, eyebrow, title, subtitle) {
  roundRect(ctx, x, y, width, height, 16, "#ffffff");
  ctx.strokeStyle = "#ded8cc";
  ctx.lineWidth = 2;
  strokeRoundRect(ctx, x, y, width, height, 16);
  ctx.fillStyle = "#247a52";
  ctx.font = "800 20px Segoe UI, Arial, sans-serif";
  ctx.fillText(eyebrow.toUpperCase(), x + 32, y + 42);
  ctx.fillStyle = "#232722";
  ctx.font = "800 34px Segoe UI, Arial, sans-serif";
  ctx.fillText(title, x + 32, y + 84);
  ctx.fillStyle = "#6b7169";
  ctx.font = "700 21px Segoe UI, Arial, sans-serif";
  ctx.fillText(subtitle, x + 32, y + 116);
}

function drawCanvasMetrics(ctx, metrics, x, y, width, columns, limit = metrics.length) {
  const gap = 16;
  const cardWidth = (width - gap * (columns - 1)) / columns;
  const cardHeight = 72;
  metrics.slice(0, limit).forEach((metric, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const cx = x + col * (cardWidth + gap);
    const cy = y + row * (cardHeight + gap);
    roundRect(ctx, cx, cy, cardWidth, cardHeight, 12, "#f9f7f2");
    ctx.strokeStyle = "#e4dccf";
    ctx.lineWidth = 1.5;
    strokeRoundRect(ctx, cx, cy, cardWidth, cardHeight, 12);
    ctx.fillStyle = "#6b7169";
    ctx.font = "800 16px Segoe UI, Arial, sans-serif";
    ctx.fillText(String(metric.label).toUpperCase(), cx + 16, cy + 25);
    ctx.fillStyle = "#232722";
    ctx.font = "900 26px Segoe UI, Arial, sans-serif";
    ctx.fillText(String(metric.value), cx + 16, cy + 56);
  });
}

function drawCanvasTrend(ctx, points, x, y, width, height) {
  if (!points.length) {
    ctx.fillStyle = "#6b7169";
    ctx.font = "700 22px Segoe UI, Arial, sans-serif";
    ctx.fillText("Noch kein Trend verfügbar.", x, y + 58);
    return;
  }

  const max = Math.max(100, Math.max(...points.map((point) => point.value)) + 10);
  const min = 0;
  ctx.strokeStyle = "#e6ded1";
  ctx.lineWidth = 2;
  [0, 0.5, 1].forEach((step) => {
    const gy = y + height - step * height;
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + width, gy);
    ctx.stroke();
  });

  const coords = points.map((point, index) => ({
    x: x + (points.length === 1 ? width / 2 : (index / (points.length - 1)) * width),
    y: y + height - ((point.value - min) / (max - min)) * height,
    point,
  }));

  ctx.strokeStyle = "#247a52";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  coords.forEach((coord, index) => {
    if (index === 0) ctx.moveTo(coord.x, coord.y);
    else ctx.lineTo(coord.x, coord.y);
  });
  ctx.stroke();

  coords.forEach((coord) => {
    ctx.fillStyle = "#247a52";
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#232722";
    ctx.font = "800 18px Segoe UI, Arial, sans-serif";
    ctx.fillText(formatNumber(coord.point.value), coord.x + 10, coord.y - 8);
    ctx.fillStyle = "#6b7169";
    ctx.font = "700 16px Segoe UI, Arial, sans-serif";
    ctx.fillText(coord.point.label, coord.x - 22, y + height + 34);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.fillStyle = fillStyle;
  roundedPath(ctx, x, y, width, height, radius);
  ctx.fill();
}

function strokeRoundRect(ctx, x, y, width, height, radius) {
  roundedPath(ctx, x, y, width, height, radius);
  ctx.stroke();
}

function roundedClip(ctx, x, y, width, height, radius) {
  roundedPath(ctx, x, y, width, height, radius);
  ctx.clip();
}

function roundedPath(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/);
  let line = "";
  let lineCount = 0;
  words.forEach((word, index) => {
    if (lineCount >= maxLines) return;
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = word;
      lineCount += 1;
    } else {
      line = testLine;
    }
    if (index === words.length - 1 && lineCount < maxLines) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
    }
  });
}

function renderMatches() {
  const matches = filteredMatches(state.matchFilters);
  if (!matches.length) {
    dom.matchVenueFilter.value = state.matchFilters.venue;
    dom.matchCompetitionFilter.value = state.matchFilters.competition;
    dom.matchList.innerHTML = `<div class="empty-state">Keine Spiele für diese Filterauswahl.</div>`;
    return;
  }

  dom.matchVenueFilter.value = state.matchFilters.venue;
  dom.matchCompetitionFilter.value = state.matchFilters.competition;
  dom.matchList.innerHTML = matches
    .map((match) => {
      const aggregate = aggregateMatch(match.id);
      const lineup = normalizeLineup(match);
      const starters = lineup.filter((item) => item.status === "Startelf").length;
      const bench = lineup.filter((item) => item.status === "Bank").length;
      const goals = matchGoalEvents(match).length;
      const cards = matchCardEvents(match).length;
      const availability = availabilitySummary(match.availability || []);
      return `
        <article class="match-card" data-open-match="${match.id}" role="button" tabindex="0" aria-label="Spiel gegen ${escapeHtml(match.opponent)} öffnen">
          <div>
            <h3>${escapeHtml(match.opponent)}</h3>
            <div class="match-meta">
              <span class="tag">${formatDate(match.date)}</span>
              <span class="tag">${escapeHtml(match.venue || "Heim")}</span>
              <span class="tag teal">${escapeHtml(match.competition || "Spiel")}</span>
              <span class="tag">${escapeHtml(match.formation || "4-3-3")}</span>
              <span class="tag">${starters} Start · ${bench} Bank</span>
              <span class="tag">${goals} Tore · ${cards} Karten</span>
              <span class="tag">${availability.confirmed} Zusagen</span>
              <span class="tag danger">${availability.unexcused} unentschuldigt</span>
              <span class="tag amber">${formatNumber(aggregate.passAccuracy)}% Passquote</span>
              <span class="tag">${formatNumber(aggregate.averageIndex)} Index</span>
            </div>
          </div>
          <div>
            <div class="match-score ${matchResultClass(match)}">${match.goalsFor}:${match.goalsAgainst}</div>
            <div class="card-actions">
              <button class="danger-button" data-delete-match="${match.id}" type="button">Entfernen</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  dom.matchList.querySelectorAll("[data-delete-match]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openDeleteConfirmation("match", button.dataset.deleteMatch);
    });
  });

  dom.matchList.querySelectorAll("[data-open-match]").forEach((card) => {
    card.addEventListener("click", () => openMatchDetail(card.dataset.openMatch));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openMatchDetail(card.dataset.openMatch);
    });
  });
}

function matchResultClass(match) {
  const goalsFor = Number(match.goalsFor || 0);
  const goalsAgainst = Number(match.goalsAgainst || 0);
  if (goalsFor > goalsAgainst) return "is-win";
  if (goalsFor === goalsAgainst) return "is-draw";
  return "is-loss";
}

function openMatchDetail(matchId) {
  const match = getMatch(matchId);
  if (!match) return;
  activeMatchId = matchId;
  activeMatchTab = "overview";
  renderMatchDetail();
  dom.matchDetailModal.classList.add("is-visible");
  dom.matchDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMatchDetail() {
  dom.matchDetailModal.classList.remove("is-visible");
  dom.matchDetailModal.setAttribute("aria-hidden", "true");
  if (!dom.playerProfileModal.classList.contains("is-visible") && !dom.deleteConfirmModal.classList.contains("is-visible")) {
    document.body.style.overflow = "";
  }
}

function renderMatchDetail() {
  const match = getMatch(activeMatchId);
  if (!match) {
    closeMatchDetail();
    return;
  }

  const aggregate = aggregateMatch(match.id);
  const detail = matchDetailStats(match);
  dom.matchDetailTitle.textContent = `${match.opponent} · ${match.goalsFor}:${match.goalsAgainst}`;

  dom.matchDetailContent.innerHTML = `
    <div class="match-detail">
      <section class="match-detail-hero">
        <div>
          <span class="eyebrow">${escapeHtml(match.competition || "Spiel")} · ${escapeHtml(match.venue || "Heim")}</span>
          <h3>${escapeHtml(match.opponent)}</h3>
          <p>${formatDate(match.date)} · Formation ${escapeHtml(match.formation || "4-3-3")}</p>
        </div>
        <div class="match-detail-score">${Number(match.goalsFor || 0)}:${Number(match.goalsAgainst || 0)}</div>
      </section>
      <div class="view-tabs match-detail-tabs" aria-label="Spieldetails">
        ${matchDetailTab("overview", "Überblick")}
        ${matchDetailTab("availability", "Zu-/Absagen")}
        ${matchDetailTab("lineup", "Aufstellung")}
        ${matchDetailTab("events", "Tore & Karten")}
        ${matchDetailTab("timeline", "Spielverlauf")}
        ${matchDetailTab("stats", "Statistiken")}
      </div>
      <div class="match-detail-pane">
        ${matchDetailPane(match, aggregate, detail)}
      </div>
    </div>
  `;

  dom.matchDetailContent.querySelectorAll("[data-match-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeMatchTab = button.dataset.matchTab;
      renderMatchDetail();
    });
  });

  const lineupForm = dom.matchDetailContent.querySelector("#matchLineupForm");
  if (lineupForm) {
    lineupForm.addEventListener("submit", saveMatchLineup);
    bindLineupRoleSelects(lineupForm);
    bindLineupFormInteractions(lineupForm);
  }
  const goalForm = dom.matchDetailContent.querySelector("#goalEventForm");
  if (goalForm) goalForm.addEventListener("submit", saveGoalEvent);
  const cardForm = dom.matchDetailContent.querySelector("#cardEventForm");
  if (cardForm) cardForm.addEventListener("submit", saveCardEvent);
  const matchAvailabilityForm = dom.matchDetailContent.querySelector("#matchAvailabilityForm");
  if (matchAvailabilityForm) matchAvailabilityForm.addEventListener("submit", saveMatchAvailability);
  const goalTypeFilter = dom.matchDetailContent.querySelector("#goalTypeFilter");
  if (goalTypeFilter) {
    goalTypeFilter.addEventListener("change", () => {
      activeGoalTypeFilter = goalTypeFilter.value;
      renderMatchDetail();
    });
  }
  dom.matchDetailContent.querySelectorAll("[data-delete-event]").forEach((button) => {
    button.addEventListener("click", () => deleteMatchEvent(button.dataset.deleteEvent));
  });
}

function matchDetailTab(tab, label) {
  return `<button class="view-tab ${activeMatchTab === tab ? "is-active" : ""}" data-match-tab="${tab}" type="button">${escapeHtml(label)}</button>`;
}

function matchDetailPane(match, aggregate, detail) {
  if (activeMatchTab === "availability") return matchAvailabilityPane(match);
  if (activeMatchTab === "lineup") return matchLineupPane(match);
  if (activeMatchTab === "events") return matchEventsPane(match);
  if (activeMatchTab === "timeline") return matchTimelinePane(match, aggregate, detail);
  if (activeMatchTab === "stats") return matchStatsPane(match, aggregate, detail);
  return matchOverviewPane(match, aggregate, detail);
}

function matchOverviewPane(match, aggregate, detail) {
  const rows = matchPlayerRows(match).slice(0, 5);
  const availability = availabilitySummary(match.availability || []);
  return `
    <div class="match-overview-grid">
      <section class="report-card report-card-large">
        <span class="eyebrow">Überblick</span>
        <h3>Spielprofil</h3>
        <div class="report-metric-grid report-metric-grid-wide">
          ${[
            { label: "Passquote", value: `${formatNumber(aggregate.passAccuracy)}%` },
            { label: "xG ohne Elfmeter", value: formatNumber(detail.nonPenaltyXg) },
            { label: "xG Gegner", value: formatNumber(detail.opponentXg) },
            { label: "Schüsse", value: aggregate.shots },
            { label: "Schüsse aufs Tor", value: detail.shotsOnTarget },
            { label: "PPDA", value: formatNumber(detail.ppda) },
            { label: "Zweikampfquote", value: `${formatNumber(detail.duelQuote)}%` },
            { label: "Ballgewinne", value: aggregate.tacklesWon + aggregate.interceptions },
            { label: "Zusagen", value: availability.confirmed },
            { label: "Absagen", value: availability.cancelled },
            { label: "Unentschuldigt", value: `${availability.unexcused} · ${formatNumber(availability.unexcusedRate)}%`, tone: "critical" },
          ].map(reportMetricHtml).join("")}
        </div>
      </section>
      <section class="report-card">
        <span class="eyebrow">Top-Spieler</span>
        <h3>Beste Auswertungen</h3>
        <div class="leaderboard-list">
          ${rows.length ? rows.map((row, index) => matchPlayerMiniRow(row, index)).join("") : `<div class="empty-state">Noch keine Spielerwerte für dieses Spiel.</div>`}
        </div>
      </section>
    </div>
  `;
}

function matchAvailabilityPane(match) {
  const availability = new Map((match.availability || []).map((item) => [item.playerId, item]));
  const summary = availabilitySummary(match.availability || []);
  return `
    <form id="matchAvailabilityForm" class="training-detail-form">
      <section class="report-card">
        <div class="event-section-heading">
          <div>
            <span class="eyebrow">Spieltag</span>
            <h3>Zu- und Absagen</h3>
          </div>
        </div>
        <div class="report-metric-grid report-metric-grid-wide">
          ${[
            { label: "Zusagen", value: summary.confirmed },
            { label: "Absagen", value: summary.cancelled },
            { label: "Verletzt", value: summary.injured },
            { label: "Unentschuldigt", value: `${summary.unexcused} · ${formatNumber(summary.unexcusedRate)}%`, tone: "critical" },
          ].map(reportMetricHtml).join("")}
        </div>
        <div class="table-wrap">
          <table class="training-table">
            <thead>
              <tr>
                <th>Spieler</th>
                <th>Status</th>
                <th>Absagegrund</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${state.players.slice().sort(sortByNumber).map((player) => matchAvailabilityRow(player, availability.get(player.id))).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <button class="primary-button" type="submit">Zu-/Absagen speichern</button>
    </form>
  `;
}

function matchAvailabilityRow(player, availability) {
  const status = availability?.status || "Offen";
  const rowClass = status === "Unentschuldigt" ? "availability-alert-row" : status === "Verletzt" ? "availability-injury-row" : "";
  return `
    <tr class="${rowClass}" data-match-availability-player="${player.id}">
      <td>${playerNameLink(player)}<br><span class="muted">#${player.number} · ${escapeHtml(player.primaryPosition || player.position)}</span></td>
      <td>
        <select data-match-field="status">
          ${availabilityStatuses.map((option) => `<option ${status === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-match-field="reason">
          <option value="">Kein Absagegrund</option>
          ${absenceReasons.map((reason) => `<option value="${escapeHtml(reason)}" ${availability?.reason === reason ? "selected" : ""}>${escapeHtml(reason)}</option>`).join("")}
        </select>
      </td>
      <td><input data-match-field="note" type="text" value="${escapeHtml(availability?.note || "")}" placeholder="kurze Info" /></td>
    </tr>
  `;
}

function matchLineupPane(match) {
  const lineup = normalizeLineup(match);
  const starters = lineup.filter((item) => item.status === "Startelf");
  const bench = lineup.filter((item) => item.status === "Bank");
  const squad = lineup.filter((item) => item.status === "Kader");
  return `
    <form id="matchLineupForm" class="match-lineup-form">
      <div class="lineup-toolbar">
        <label>
          Formation
          <select id="matchFormationSelect">
            ${["4-3-3", "4-2-3-1", "4-4-2", "3-4-3", "3-5-2", "3-2-2-3", "5-3-2"].map((formation) => `<option ${formation === (match.formation || "4-3-3") ? "selected" : ""}>${formation}</option>`).join("")}
          </select>
        </label>
        <div class="lineup-summary">
          <span class="tag">${starters.length} Startelf</span>
          <span class="tag">${bench.length} Bank</span>
          <span class="tag">${squad.length} Kader</span>
        </div>
        <button class="primary-button" type="submit">Aufstellung speichern</button>
      </div>
      <div class="lineup-layout">
        ${lineupVisualLayoutHtml(lineup, match.formation || "4-3-3")}
      </div>
      <div class="table-wrap">
        <table class="lineup-table">
          <thead>
            <tr>
              <th>Spieler</th>
              <th>Status</th>
              <th>Nr.</th>
              <th>Position</th>
              <th>Rolle Ballbesitz</th>
              <th>Rolle gegen Ball</th>
            </tr>
          </thead>
          <tbody>
            ${lineup.map(lineupEditRow).join("")}
          </tbody>
        </table>
      </div>
    </form>
  `;
}

function matchEventsPane(match) {
  const goalEvents = matchGoalEvents(match, activeGoalTypeFilter);
  const cardEvents = matchCardEvents(match);
  const goalStats = summarizeGoalEvents(goalEvents);
  const cardStats = summarizeCardEvents(cardEvents);

  return `
    <div class="event-workspace">
      <section class="report-card">
        <div class="event-section-heading">
          <div>
            <span class="eyebrow">Torstatistik</span>
            <h3>Tore erfassen</h3>
            <p class="report-subline">Endergebnis aus erfassten Toren: ${Number(match.goalsFor || 0)}:${Number(match.goalsAgainst || 0)}</p>
          </div>
          <label>
            Torart filtern
            <select id="goalTypeFilter">
              <option value="all">Alle Torarten</option>
              ${goalTypeOptions.map((option) => `<option value="${option.id}" ${activeGoalTypeFilter === option.id ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
            </select>
          </label>
        </div>
        <form id="goalEventForm" class="event-form">
          <div class="event-form-grid">
            <label>
              Team
              <select id="goalTeam">
                <option value="own">Eigenes Tor</option>
                <option value="opponent">Gegentor</option>
              </select>
            </label>
            <label>
              Minute
              <input id="goalMinute" min="0" max="130" type="number" placeholder="z. B. 37" />
            </label>
            <label>
              Torschütze
              <select id="goalScorerPlayer">
                <option value="">Gegner / unbekannt</option>
                ${playerOptionsHtml()}
              </select>
            </label>
            <label>
              Name Gegner / frei
              <input id="goalScorerName" type="text" placeholder="z. B. Nr. 10" />
            </label>
            <label>
              Vorlagengeber
              <select id="goalAssistPlayer">
                <option value="">Keine Vorlage</option>
                ${playerOptionsHtml()}
              </select>
            </label>
            <label>
              Assist Gegner / frei
              <input id="goalAssistName" type="text" placeholder="optional" />
            </label>
          </div>
          ${goalTypePickerHtml()}
          <button class="primary-button" type="submit">Tor speichern</button>
        </form>
        <div class="event-summary-grid">
          ${[
            ["Eigene Tore", goalStats.own],
            ["Gegentore", goalStats.opponent],
            ["Rechter Fuß", goalStats.byType["right-foot"] || 0],
            ["Kopfball", goalStats.byType.header || 0],
          ].map(([label, value]) => `<div class="season-team-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </div>
        <div class="event-list">
          ${goalEvents.length ? goalEvents.map(goalEventRow).join("") : `<div class="empty-state">Keine Tore für diese Torart-Auswahl.</div>`}
        </div>
      </section>

      <section class="report-card">
        <span class="eyebrow">Karten</span>
        <h3>Karten erfassen</h3>
        <form id="cardEventForm" class="event-form">
          <div class="event-form-grid cards">
            <label>
              Team
              <select id="cardTeam">
                <option value="own">Eigenes Team</option>
                <option value="opponent">Gegner</option>
              </select>
            </label>
            <label>
              Minute
              <input id="cardMinute" min="0" max="130" type="number" placeholder="z. B. 71" />
            </label>
            <label>
              Karte
              <select id="cardType">
                ${cardTypes.map((type) => `<option>${type}</option>`).join("")}
              </select>
            </label>
            <label>
              Spieler
              <select id="cardPlayer">
                <option value="">Gegner / unbekannt</option>
                ${playerOptionsHtml()}
              </select>
            </label>
            <label>
              Name Gegner / frei
              <input id="cardPlayerName" type="text" placeholder="optional" />
            </label>
            <label>
              Notiz
              <input id="cardNote" type="text" placeholder="z. B. taktisches Foul" />
            </label>
          </div>
          <button class="primary-button" type="submit">Karte speichern</button>
        </form>
        <div class="event-summary-grid">
          ${[
            ["Gelbe Karten", cardStats.yellow],
            ["Gelb-Rot", cardStats.secondYellow],
            ["Rote Karten", cardStats.red],
            ["Eigene Karten", cardStats.own],
          ].map(([label, value]) => `<div class="season-team-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </div>
        <div class="event-list">
          ${cardEvents.length ? cardEvents.map(cardEventRow).join("") : `<div class="empty-state">Noch keine Karten erfasst.</div>`}
        </div>
      </section>

      <section class="report-card report-card-large">
        <span class="eyebrow">Bestenlisten</span>
        <h3>Tore, Assists und Karten</h3>
        <div class="event-ranking-grid">
          ${eventRankingBlock("Torschützen", goalStats.scorers)}
          ${eventRankingBlock("Vorlagengeber", goalStats.assists)}
          ${eventRankingBlock("Karten", cardStats.players)}
        </div>
      </section>
    </div>
  `;
}

function playerOptionsHtml(match = getMatch(activeMatchId)) {
  const players = match ? matchAvailablePlayers(match) : state.players.slice().sort(sortByNumber);
  return players
    .map((player) => `<option value="${player.id}">#${player.number} ${escapeHtml(player.name)}</option>`)
    .join("");
}

function goalTypePickerHtml(selected = []) {
  const selectedSet = new Set(selected);
  return `
    <div class="goal-type-picker">
      ${goalTypeGroups
        .map(
          (group) => `
            <fieldset>
              <legend>${escapeHtml(group.group)}</legend>
              <div>
                ${group.options
                  .map(
                    ([id, label]) => `
                      <label class="goal-type-option">
                        <input name="goalType" value="${id}" type="checkbox" ${selectedSet.has(id) ? "checked" : ""} />
                        <span>${escapeHtml(label)}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </fieldset>
          `,
        )
        .join("")}
    </div>
  `;
}

function matchGoalEvents(match, filter = "all") {
  return (match.events || [])
    .filter((event) => event.kind === "goal" && (filter === "all" || (event.goalTypes || []).includes(filter)))
    .slice()
    .sort(sortEventsByMinute);
}

function matchCardEvents(match) {
  return (match.events || [])
    .filter((event) => event.kind === "card")
    .slice()
    .sort(sortEventsByMinute);
}

function sortEventsByMinute(a, b) {
  return Number(a.minute || 0) - Number(b.minute || 0);
}

function scoreFromGoalEvents(events = []) {
  return events.reduce(
    (score, event) => {
      if (event.kind !== "goal") return score;
      if (event.team === "opponent") score.goalsAgainst += 1;
      else score.goalsFor += 1;
      return score;
    },
    { goalsFor: 0, goalsAgainst: 0 },
  );
}

function summarizeGoalEvents(events) {
  const stats = { own: 0, opponent: 0, byType: {}, scorers: new Map(), assists: new Map() };
  events.forEach((event) => {
    if (event.team === "opponent") stats.opponent += 1;
    else stats.own += 1;
    (event.goalTypes || []).forEach((type) => {
      stats.byType[type] = (stats.byType[type] || 0) + 1;
    });
    addEventCount(stats.scorers, eventParticipantName(event, "scorer"));
    const assistName = eventParticipantName(event, "assist");
    if (assistName) addEventCount(stats.assists, assistName);
  });
  return {
    ...stats,
    scorers: mapToRanking(stats.scorers),
    assists: mapToRanking(stats.assists),
  };
}

function summarizeCardEvents(events) {
  const stats = { yellow: 0, secondYellow: 0, red: 0, own: 0, players: new Map() };
  events.forEach((event) => {
    if (event.cardType === "Gelb-Rot") stats.secondYellow += 1;
    else if (event.cardType === "Rot") stats.red += 1;
    else stats.yellow += 1;
    if (event.team === "own") stats.own += 1;
    addEventCount(stats.players, eventParticipantName(event, "card"));
  });
  return {
    ...stats,
    players: mapToRanking(stats.players),
  };
}

function addEventCount(map, name) {
  if (!name) return;
  map.set(name, (map.get(name) || 0) + 1);
}

function mapToRanking(map) {
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
    .slice(0, 6);
}

function eventParticipantName(event, role) {
  if (role === "assist") {
    if (event.assistPlayerId) return getPlayer(event.assistPlayerId)?.name || "";
    return event.assistName || "";
  }
  if (event.playerId) return getPlayer(event.playerId)?.name || "";
  return event.playerName || (event.team === "opponent" ? "Gegner" : "");
}

function playerEventSummary(playerId, matchId = "") {
  const matches = matchId ? [getMatch(matchId)].filter(Boolean) : state.matches;
  return matches.reduce(
    (summary, match) => {
      matchGoalEvents(match).forEach((event) => {
        if (event.team !== "own") return;
        if (event.playerId === playerId) {
          summary.goals += 1;
          (event.goalTypes || []).forEach((type) => {
            summary.goalTypes[type] = (summary.goalTypes[type] || 0) + 1;
          });
        }
        if (event.assistPlayerId === playerId) summary.assists += 1;
      });

      matchCardEvents(match).forEach((event) => {
        if (event.team !== "own" || event.playerId !== playerId) return;
        summary.cards += 1;
        if (event.cardType === "Gelb-Rot") summary.secondYellow += 1;
        else if (event.cardType === "Rot") summary.red += 1;
        else summary.yellow += 1;
      });
      return summary;
    },
    { goals: 0, assists: 0, cards: 0, yellow: 0, secondYellow: 0, red: 0, goalTypes: {} },
  );
}

function statWithOfficialScoring(stat) {
  if (!stat) return stat;
  const scoring = playerEventSummary(stat.playerId, stat.matchId);
  return {
    ...stat,
    goals: scoring.goals,
    assists: scoring.assists,
  };
}

function aggregateEventScoringForStats(stats) {
  const matchIds = [...new Set(stats.map((stat) => stat.matchId).filter(Boolean))];
  const playerIds = [...new Set(stats.map((stat) => stat.playerId).filter(Boolean))];
  const isSinglePlayerScope = playerIds.length === 1 && stats.every((stat) => stat.playerId === playerIds[0]);
  const playerId = playerIds[0];

  return matchIds.reduce(
    (summary, matchId) => {
      const match = getMatch(matchId);
      if (!match) return summary;

      matchGoalEvents(match).forEach((event) => {
        if (event.team !== "own") return;
        if (isSinglePlayerScope) {
          if (event.playerId === playerId) summary.goals += 1;
          if (event.assistPlayerId === playerId) summary.assists += 1;
          return;
        }

        summary.goals += 1;
        if (event.assistPlayerId || event.assistName) summary.assists += 1;
      });
      return summary;
    },
    { goals: 0, assists: 0 },
  );
}

function goalEventRow(event) {
  return `
    <article class="event-row">
      <div class="event-minute">${Number(event.minute || 0)}'</div>
      <div>
        <strong>${event.team === "opponent" ? "Gegentor" : "Tor"} · ${escapeHtml(eventParticipantName(event, "scorer") || "Unbekannt")}</strong>
        <p>${event.assistPlayerId || event.assistName ? `Assist: ${escapeHtml(eventParticipantName(event, "assist"))}` : "Ohne erfasste Vorlage"}</p>
        <div class="event-tags">${(event.goalTypes || []).map((type) => `<span class="tag">${escapeHtml(goalTypeLabel(type))}</span>`).join("")}</div>
      </div>
      <button class="danger-button" data-delete-event="${event.id}" type="button">Entfernen</button>
    </article>
  `;
}

function cardEventRow(event) {
  return `
    <article class="event-row">
      <div class="event-minute">${Number(event.minute || 0)}'</div>
      <div>
        <strong>${escapeHtml(event.cardType)} · ${escapeHtml(eventParticipantName(event, "card") || "Unbekannt")}</strong>
        <p>${event.team === "opponent" ? "Gegner" : "Eigenes Team"}${event.note ? ` · ${escapeHtml(event.note)}` : ""}</p>
      </div>
      <button class="danger-button" data-delete-event="${event.id}" type="button">Entfernen</button>
    </article>
  `;
}

function eventRankingBlock(title, rows) {
  return `
    <div class="event-ranking-block">
      <h4>${escapeHtml(title)}</h4>
      ${rows.length
        ? rows
            .map(
              (row, index) => `
                <div class="event-ranking-row">
                  <span>${index + 1}</span>
                  <strong>${escapeHtml(row.name)}</strong>
                  <em>${row.value}</em>
                </div>
              `,
            )
            .join("")
        : `<p class="muted">Noch keine Werte.</p>`}
    </div>
  `;
}

function goalTypeLabel(type) {
  return goalTypeOptions.find((option) => option.id === type)?.label || type;
}

function saveGoalEvent(event) {
  event.preventDefault();
  const match = getMatch(activeMatchId);
  if (!match) return;
  const form = event.currentTarget;
  const selectedTypes = Array.from(form.querySelectorAll('input[name="goalType"]:checked')).map((input) => input.value);
  const goalEvent = normalizeMatchEvent(
    {
      id: `${match.id}-goal-${Date.now()}`,
      kind: "goal",
      team: form.querySelector("#goalTeam").value,
      minute: Number(form.querySelector("#goalMinute").value || 0),
      playerId: form.querySelector("#goalScorerPlayer").value,
      playerName: form.querySelector("#goalScorerName").value.trim(),
      assistPlayerId: form.querySelector("#goalAssistPlayer").value,
      assistName: form.querySelector("#goalAssistName").value.trim(),
      goalTypes: selectedTypes,
    },
    match,
  );
  updateMatchEvents(match.id, [...(match.events || []), goalEvent]);
}

function saveCardEvent(event) {
  event.preventDefault();
  const match = getMatch(activeMatchId);
  if (!match) return;
  const form = event.currentTarget;
  const cardEvent = normalizeMatchEvent(
    {
      id: `${match.id}-card-${Date.now()}`,
      kind: "card",
      team: form.querySelector("#cardTeam").value,
      minute: Number(form.querySelector("#cardMinute").value || 0),
      cardType: form.querySelector("#cardType").value,
      playerId: form.querySelector("#cardPlayer").value,
      playerName: form.querySelector("#cardPlayerName").value.trim(),
      note: form.querySelector("#cardNote").value.trim(),
    },
    match,
  );
  updateMatchEvents(match.id, [...(match.events || []), cardEvent]);
}

function deleteMatchEvent(eventId) {
  const match = getMatch(activeMatchId);
  if (!match) return;
  updateMatchEvents(match.id, (match.events || []).filter((event) => event.id !== eventId));
}

function updateMatchEvents(matchId, events) {
  const matchIndex = state.matches.findIndex((item) => item.id === matchId);
  if (matchIndex === -1) return;
  const match = state.matches[matchIndex];
  const normalizedEvents = events
    .map((event, index) => normalizeMatchEvent(event, match, index))
    .filter((event) => matchEventAllowed(match, event));
  const hadGoalEvents = (state.matches[matchIndex].events || []).some((event) => event.kind === "goal");
  const hasGoalEvents = normalizedEvents.some((event) => event.kind === "goal");
  const score = hasGoalEvents || hadGoalEvents
    ? scoreFromGoalEvents(normalizedEvents)
    : { goalsFor: state.matches[matchIndex].goalsFor, goalsAgainst: state.matches[matchIndex].goalsAgainst };
  state.matches[matchIndex] = {
    ...state.matches[matchIndex],
    ...score,
    events: normalizedEvents,
  };
  persist();
  renderMatches();
  renderMatchDetail();
}

function matchTimelinePane(match, aggregate, detail) {
  const notes = matchPlayerRows(match).filter((row) => row.stat.note).slice(0, 4);
  const eventMoments = (match.events || [])
    .slice()
    .sort(sortEventsByMinute)
    .map((event) => ({
      title: `${Number(event.minute || 0)}' · ${event.kind === "card" ? event.cardType : event.team === "opponent" ? "Gegentor" : "Tor"}`,
      text:
        event.kind === "card"
          ? `${eventParticipantName(event, "card") || "Unbekannt"} · ${event.team === "opponent" ? "Gegner" : "Eigenes Team"}${event.note ? ` · ${event.note}` : ""}`
          : `${eventParticipantName(event, "scorer") || "Unbekannt"}${eventParticipantName(event, "assist") ? `, Assist: ${eventParticipantName(event, "assist")}` : ""} · ${(event.goalTypes || []).map(goalTypeLabel).join(", ") || "Keine Torart erfasst"}`,
    }));
  const moments = [
    { title: "Spielrahmen", text: `${formatDate(match.date)} · ${match.venue || "Heim"} · ${match.competition || "Spiel"} · Endstand ${match.goalsFor}:${match.goalsAgainst}` },
    { title: "Offensive", text: `${aggregate.shots} Abschlüsse, ${detail.shotsOnTarget} aufs Tor, ${formatNumber(detail.nonPenaltyXg)} xG ohne Elfmeter.` },
    { title: "Defensive", text: `${formatNumber(detail.opponentXg)} xG Gegner, ${formatNumber(detail.ppda)} PPDA, ${formatNumber(detail.duelQuote)}% Zweikampfquote.` },
    ...eventMoments,
    ...notes.map((row) => ({ title: row.player.name, text: row.stat.note })),
  ];

  return `
    <section class="report-card">
      <span class="eyebrow">Spielverlauf</span>
      <h3>Analysechronik</h3>
      <div class="match-timeline">
        ${moments.map((moment, index) => `
          <article class="timeline-item">
            <span>${index + 1}</span>
            <div>
              <strong>${escapeHtml(moment.title)}</strong>
              <p>${escapeHtml(moment.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function matchStatsPane(match, aggregate, detail) {
  const rows = matchPlayerRows(match);
  const filteredGoals = matchGoalEvents(match, activeGoalTypeFilter);
  const goalStats = summarizeGoalEvents(filteredGoals);
  const cardStats = summarizeCardEvents(matchCardEvents(match));
  return `
    <div class="match-overview-grid">
      <section class="report-card">
        <span class="eyebrow">Teamdetails</span>
        <h3>Spielwerte</h3>
        <label class="inline-filter">
          Torart filtern
          <select id="goalTypeFilter">
            <option value="all">Alle Torarten</option>
            ${goalTypeOptions.map((option) => `<option value="${option.id}" ${activeGoalTypeFilter === option.id ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
          </select>
        </label>
        <div class="season-team-grid">
          ${[
            ["xG ohne Elfmeter", formatNumber(detail.nonPenaltyXg)],
            ["xG Gegner", formatNumber(detail.opponentXg)],
            ["Tore im Filter", goalStats.own],
            ["Gegentore im Filter", goalStats.opponent],
            ["Erlittene Fouls", detail.foulsWon],
            ["Begangene Fouls", detail.foulsCommitted],
            ["Gegnerpässe letztes Drittel", detail.opponentFinalThirdPasses],
            ["PPDA", formatNumber(detail.ppda)],
            ["Zweikampfquote", `${formatNumber(detail.duelQuote)}%`],
            ["Karten", cardStats.own],
          ].map(([label, value]) => `<div class="season-team-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </div>
      </section>
      <section class="report-card report-card-large">
        <span class="eyebrow">Spielerstatistiken</span>
        <h3>Einzelwerte</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Spieler</th>
                <th>Passquote</th>
                <th>Drib.</th>
                <th>Flanken</th>
                <th>Schüsse</th>
                <th>Index</th>
                <th>Notiz</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map(matchStatTableRow).join("") : `<tr><td colspan="7">Noch keine Spielerwerte gespeichert.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function formationBoardHtml(lineup, formation) {
  const starters = lineup.filter((item) => item.status === "Startelf");
  const rows = [
    ["Tor", starters.filter((item) => formationLineForPosition(item.position) === "Tor")],
    ["Abwehr", starters.filter((item) => formationLineForPosition(item.position) === "Abwehr")],
    ["Mittelfeld", starters.filter((item) => formationLineForPosition(item.position) === "Mittelfeld")],
    ["Angriff", starters.filter((item) => formationLineForPosition(item.position) === "Angriff")],
  ];

  return `
    <section class="formation-board">
      <div class="formation-title">
        <span class="eyebrow">Formation</span>
        <strong>${escapeHtml(formation)}</strong>
      </div>
      <div class="pitch">
        ${rows.map(([label, players]) => `
          <div class="pitch-row lineup-dropzone" data-lineup-drop-status="Startelf" data-lineup-drop-line="${escapeHtml(label)}">
            <span>${escapeHtml(label)}</span>
            <div>
              ${players.length ? players.map(lineupChipHtml).join("") : `<em>offen</em>`}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function lineupVisualLayoutHtml(lineup, formation) {
  const bench = lineup.filter((item) => item.status === "Bank");
  const squad = lineup.filter((item) => item.status === "Kader");
  return `
    ${formationBoardHtml(lineup, formation)}
    <div class="lineup-lists">
      ${lineupListHtml("Bank", bench)}
      ${lineupListHtml("Kader", squad)}
    </div>
  `;
}

function lineupListHtml(label, rows) {
  return `
    <section class="lineup-list-card">
      <span class="eyebrow">${escapeHtml(label)}</span>
      <div class="lineup-mini-list lineup-dropzone" data-lineup-drop-status="${escapeHtml(label)}">
        ${rows.length ? rows.map(lineupChipHtml).join("") : `<p class="muted">Keine Spieler eingetragen.</p>`}
      </div>
    </section>
  `;
}

function lineupChipHtml(item) {
  const player = getPlayer(item.playerId);
  if (!player) return "";
  return `<span class="lineup-chip" draggable="true" data-lineup-drag-player="${escapeHtml(player.id)}"><strong>#${escapeHtml(item.number || player.number)}</strong> ${escapeHtml(player.name)}</span>`;
}

function lineupEditRow(item) {
  const player = getPlayer(item.playerId);
  if (!player) return "";
  const position = normalizePlayerPosition(item.position || player.primaryPosition || player.position);
  return `
    <tr data-lineup-player="${player.id}">
      <td><strong>${escapeHtml(player.name)}</strong><br><span class="muted">Profil: #${player.number} · ${escapeHtml(player.position)}</span></td>
      <td>
        <select data-lineup-field="status">
          ${["Startelf", "Bank", "Kader", "Nicht im Kader"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
      <td><input data-lineup-field="number" min="0" type="number" value="${escapeHtml(item.number || player.number)}" /></td>
      <td>
        <select data-lineup-field="position">
          ${playerPositions.map((option) => `<option value="${escapeHtml(option)}" ${position === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-lineup-field="roleInPossession">
          ${lineupRoleOptionsHtml(position, item.roleInPossession, possessionRoles)}
        </select>
      </td>
      <td>
        <select data-lineup-field="roleOutOfPossession">
          ${lineupRoleOptionsHtml(position, item.roleOutOfPossession, outOfPossessionRoles)}
        </select>
      </td>
    </tr>
  `;
}

function lineupRoleOptionsHtml(position, selectedValue, roleMap) {
  const normalizedPosition = normalizePlayerPosition(position);
  const options = roleMap[normalizedPosition] || [];
  const selected = normalizeRoleFor(normalizedPosition, selectedValue, roleMap);
  return options.map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function bindLineupRoleSelects(form) {
  form.querySelectorAll('[data-lineup-field="position"]').forEach((select) => {
    select.addEventListener("change", () => {
      const row = select.closest("[data-lineup-player]");
      if (!row) return;
      const position = normalizePlayerPosition(select.value);
      const roleInSelect = row.querySelector('[data-lineup-field="roleInPossession"]');
      const roleOutSelect = row.querySelector('[data-lineup-field="roleOutOfPossession"]');
      roleInSelect.innerHTML = lineupRoleOptionsHtml(position, "", possessionRoles);
      roleOutSelect.innerHTML = lineupRoleOptionsHtml(position, "", outOfPossessionRoles);
    });
  });
}

function bindLineupFormInteractions(form) {
  bindLineupDragAndDrop(form);
  if (form.dataset.lineupInteractionsBound) return;
  form.dataset.lineupInteractionsBound = "true";
  form.addEventListener("change", (event) => {
    if (!event.target.matches("#matchFormationSelect, [data-lineup-field='status'], [data-lineup-field='position']")) return;
    renderLineupVisualFromForm(form);
  });
}

function bindLineupDragAndDrop(form) {
  form.querySelectorAll("[data-lineup-drag-player]").forEach((chip) => {
    chip.addEventListener("dragstart", (event) => {
      if (!event.dataTransfer) return;
      event.dataTransfer.setData("text/plain", chip.dataset.lineupDragPlayer);
      event.dataTransfer.effectAllowed = "move";
      chip.classList.add("is-dragging");
    });
    chip.addEventListener("dragend", () => chip.classList.remove("is-dragging"));
  });

  form.querySelectorAll("[data-lineup-drop-status]").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      zone.classList.add("is-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-over");
      moveLineupPlayerInForm(form, event.dataTransfer?.getData("text/plain"), zone.dataset.lineupDropStatus, zone.dataset.lineupDropLine || "");
    });
  });
}

function moveLineupPlayerInForm(form, playerId, status, line = "") {
  const row = Array.from(form.querySelectorAll("[data-lineup-player]")).find((item) => item.dataset.lineupPlayer === playerId);
  if (!row) return;

  const statusSelect = row.querySelector('[data-lineup-field="status"]');
  statusSelect.value = normalizeLineupStatus(status);
  if (statusSelect.value === "Startelf" && line) {
    setLineupRowPosition(row, lineupPositionForLine(line, row));
  }
  renderLineupVisualFromForm(form);
}

function lineupPositionForLine(line, row) {
  const current = normalizePlayerPosition(row.querySelector('[data-lineup-field="position"]').value);
  if (formationLineForPosition(current) === line) return current;
  const player = getPlayer(row.dataset.lineupPlayer);
  const primary = normalizePlayerPosition(player?.primaryPosition || player?.position);
  if (formationLineForPosition(primary) === line) return primary;
  return {
    Tor: "Torhüter",
    Abwehr: "Innenverteidiger",
    Mittelfeld: "Zentrales Mittelfeld",
    Angriff: "Stürmer",
  }[line] || current;
}

function setLineupRowPosition(row, position) {
  const normalized = normalizePlayerPosition(position);
  const positionSelect = row.querySelector('[data-lineup-field="position"]');
  const roleInSelect = row.querySelector('[data-lineup-field="roleInPossession"]');
  const roleOutSelect = row.querySelector('[data-lineup-field="roleOutOfPossession"]');
  positionSelect.value = normalized;
  roleInSelect.innerHTML = lineupRoleOptionsHtml(normalized, "", possessionRoles);
  roleOutSelect.innerHTML = lineupRoleOptionsHtml(normalized, "", outOfPossessionRoles);
}

function renderLineupVisualFromForm(form) {
  const lineup = lineupFromForm(form);
  const formation = form.querySelector("#matchFormationSelect").value || "4-3-3";
  const layout = form.querySelector(".lineup-layout");
  if (layout) {
    layout.innerHTML = lineupVisualLayoutHtml(lineup, formation);
    bindLineupDragAndDrop(form);
  }
  const starters = lineup.filter((item) => item.status === "Startelf").length;
  const bench = lineup.filter((item) => item.status === "Bank").length;
  const squad = lineup.filter((item) => item.status === "Kader").length;
  const summary = form.querySelector(".lineup-summary");
  if (summary) {
    summary.innerHTML = `
      <span class="tag">${starters} Startelf</span>
      <span class="tag">${bench} Bank</span>
      <span class="tag">${squad} Kader</span>
    `;
  }
}

function lineupFromForm(form) {
  return Array.from(form.querySelectorAll("[data-lineup-player]")).map(lineupItemFromRow);
}

function lineupItemFromRow(row) {
  const position = normalizePlayerPosition(row.querySelector('[data-lineup-field="position"]').value);
  return {
    playerId: row.dataset.lineupPlayer,
    status: normalizeLineupStatus(row.querySelector('[data-lineup-field="status"]').value),
    number: Number(row.querySelector('[data-lineup-field="number"]').value || 0),
    position,
    roleInPossession: normalizePossessionRole(position, row.querySelector('[data-lineup-field="roleInPossession"]').value),
    roleOutOfPossession: normalizeOutOfPossessionRole(position, row.querySelector('[data-lineup-field="roleOutOfPossession"]').value),
  };
}

function saveMatchAvailability(event) {
  event.preventDefault();
  const match = getMatch(activeMatchId);
  if (!match) return;

  const availability = Array.from(event.currentTarget.querySelectorAll("[data-match-availability-player]")).map((row) => {
    const status = row.querySelector('[data-match-field="status"]').value;
    const reason = row.querySelector('[data-match-field="reason"]').value;
    return {
      playerId: row.dataset.matchAvailabilityPlayer,
      status,
      reason: isUnavailableStatus(status) ? reason || defaultAbsenceReason(status) : "",
      note: row.querySelector('[data-match-field="note"]').value.trim(),
    };
  });

  const unavailable = new Set(availability.filter((item) => isUnavailableStatus(item.status)).map((item) => item.playerId));
  state.stats = state.stats.filter((stat) => stat.matchId !== match.id || !unavailable.has(stat.playerId));
  const events = (match.events || []).filter((item) => {
    if (item.team !== "own") return true;
    if (item.playerId && unavailable.has(item.playerId)) return false;
    if (item.assistPlayerId && unavailable.has(item.assistPlayerId)) return false;
    return true;
  });
  const lineup = (match.lineup || []).filter((item) => !unavailable.has(item.playerId));
  const matchIndex = state.matches.findIndex((item) => item.id === match.id);
  if (matchIndex === -1) return;
  state.matches[matchIndex] = normalizeMatch({ ...match, availability, events, lineup }, {}, state.players, state.stats);
  persist();
  renderAll();
  renderMatchDetail();
}

function saveMatchLineup(event) {
  event.preventDefault();
  const match = getMatch(activeMatchId);
  if (!match) return;

  const form = event.currentTarget;
  const lineup = lineupFromForm(form);

  const matchIndex = state.matches.findIndex((item) => item.id === match.id);
  if (matchIndex === -1) return;
  state.matches[matchIndex] = normalizeMatch({
    ...match,
    formation: form.querySelector("#matchFormationSelect").value,
    lineup,
  }, {}, state.players, state.stats);
  persist();
  renderMatches();
  renderMatchDetail();
}

function matchPlayerRows(match) {
  return statsForMatch(match.id)
    .map((stat) => {
      const officialStat = statWithOfficialScoring(stat);
      return {
        stat: officialStat,
        player: getPlayer(stat.playerId),
        index: calculateIndex(officialStat),
        passAccuracy: passAccuracy(stat),
      };
    })
    .filter((row) => row.player)
    .sort((a, b) => b.index - a.index);
}

function matchPlayerMiniRow(row, index) {
  return `
    <article class="leaderboard-row">
      <span class="leaderboard-rank">${index + 1}</span>
      <div class="leaderboard-player">
        <strong>${playerNameLink(row.player)}</strong>
        <span>#${row.player.number} · ${escapeHtml(row.player.position)}</span>
      </div>
      <div class="leaderboard-value">
        <strong>${formatNumber(row.index)}</strong>
        <span>${formatNumber(row.passAccuracy)}% Pässe</span>
      </div>
    </article>
  `;
}

function matchStatTableRow(row) {
  return `
    <tr>
      <td><strong>${playerNameLink(row.player)}</strong></td>
      <td>${formatNumber(row.passAccuracy)}%</td>
      <td>${Number(row.stat.dribblesCompleted || 0)}/${Number(row.stat.dribblesAttempted || 0)}</td>
      <td>${Number(row.stat.crossesCompleted || 0)}/${Number(row.stat.crossesAttempted || 0)}</td>
      <td>${Number(row.stat.shots || 0)}</td>
      <td>${formatNumber(row.index)}</td>
      <td>${escapeHtml(row.stat.note || "Keine Notiz")}</td>
    </tr>
  `;
}

function renderNotesTimeline(players) {
  const selectedIds = new Set(players.map((player) => player.id));
  const notes = state.stats
    .filter((stat) => selectedIds.has(stat.playerId) && stat.note)
    .map((stat) => ({
      stat,
      player: getPlayer(stat.playerId),
      match: state.matches.find((match) => match.id === stat.matchId),
      index: calculateIndex(stat),
    }))
    .filter((item) => item.player && item.match)
    .sort((a, b) => b.match.date.localeCompare(a.match.date) || b.index - a.index)
    .slice(0, 9);

  if (!notes.length) {
    dom.notesTimeline.innerHTML = `<div class="empty-state">Für die ausgewählten Spieler sind noch keine Notizen gespeichert.</div>`;
    return;
  }

  dom.notesTimeline.innerHTML = notes
    .map(
      (item, index) => `
        <article class="note-card" style="border-left-color: ${colors[index % colors.length]}">
          <span class="tag">${formatDate(item.match.date)} · ${escapeHtml(item.match.opponent)}</span>
          <h3>${playerNameLink(item.player)} · Index ${formatNumber(item.index)}</h3>
          <p>${escapeHtml(item.stat.note)}</p>
        </article>
      `,
    )
    .join("");
}

async function handlePlayerPhotoChange() {
  const file = dom.playerPhoto.files?.[0];
  if (!file) {
    if (!editingPlayerId) pendingPlayerPhoto = "";
    renderPlayerPhotoPreview();
    renderPlayerFormMode();
    return;
  }

  pendingPlayerPhoto = await resizeImageFile(file);
  renderPlayerPhotoPreview();
  renderPlayerFormMode();
}

function clearPlayerForm() {
  editingPlayerId = "";
  pendingPlayerPhoto = "";
  dom.playerForm.reset();
  renderPlayerPositionControls("Torhüter", [], "", "");
  renderPlayerPhotoPreview();
  renderPlayerFormMode();
}

function renderPlayerPhotoPreview() {
  dom.playerPhotoPreview.innerHTML = pendingPlayerPhoto
    ? `<img src="${pendingPlayerPhoto}" alt="" />`
    : `<span>Bild</span>`;
}

function renderPlayerFormMode() {
  const isEditing = Boolean(editingPlayerId);
  dom.playerFormTitle.textContent = isEditing ? "Spieler bearbeiten" : "Spieler anlegen";
  dom.playerSubmitButton.textContent = isEditing ? "Änderungen speichern" : "Spieler speichern";
  dom.cancelPlayerEdit.classList.toggle("is-hidden", !isEditing);
  dom.removePlayerPhoto.classList.toggle("is-hidden", !pendingPlayerPhoto);
}

function resizeImageFile(file) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 640;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => resolve("");
      image.src = reader.result;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function playerAvatar(player) {
  if (player.photo) {
    return `<div class="player-avatar"><img src="${player.photo}" alt="" /></div>`;
  }
  return `<div class="player-avatar" aria-hidden="true">${escapeHtml(initials(player.name))}</div>`;
}

function shortRole(role) {
  const text = String(role || "");
  return text.includes("–") ? text.split("–").pop().trim() : text;
}

function playerNameLink(player, label = player.name) {
  return `<span class="player-name-link" data-profile-player="${escapeHtml(player.id)}" title="Doppelklick öffnet das Spielerprofil">${escapeHtml(label)}</span>`;
}

function initials(name) {
  return String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function syncStatForm() {
  const existing = statsForMatch(dom.statMatch.value).find((stat) => stat.playerId === dom.statPlayer.value);
  clearStatInputs(false);
  if (!existing) {
    const official = playerEventSummary(dom.statPlayer.value, dom.statMatch.value);
    ["goals", "assists"].forEach((field) => {
      const input = document.querySelector(`#${field}`);
      if (input) input.value = official[field] ?? 0;
    });
    return;
  }

  statFields.forEach((field) => {
    const input = document.querySelector(`#${field}`);
    if (!input) return;
    if (field === "goals" || field === "assists") {
      const official = playerEventSummary(dom.statPlayer.value, dom.statMatch.value);
      input.value = official[field] ?? 0;
      return;
    }
    input.value = existing[field] ?? "";
  });
  document.querySelector("#note").value = existing.note || "";
}

function clearStatInputs(clearNote = true) {
  statFields.forEach((field) => {
    const input = document.querySelector(`#${field}`);
    if (input) input.value = "";
  });
  if (clearNote) document.querySelector("#note").value = "";
}

function handleStatSubmit(event) {
  event.preventDefault();
  if (!state.players.length || !state.matches.length) return;

  const matchId = dom.statMatch.value;
  const playerId = dom.statPlayer.value;
  const match = getMatch(matchId);
  if (!playerCanHaveMatchStats(match, playerId)) return;
  const values = Object.fromEntries(
    statFields.map((field) => {
      const input = document.querySelector(`#${field}`);
      return [field, Number(input.value || 0)];
    }),
  );

  [
    ["passesCompleted", "passesAttempted"],
    ["dribblesCompleted", "dribblesAttempted"],
    ["crossesCompleted", "crossesAttempted"],
  ].forEach(([completed, attempted]) => {
    if (values[attempted] < values[completed]) values[attempted] = values[completed];
  });

  const stat = {
    id: `${matchId}-${playerId}`,
    matchId,
    playerId,
    ...values,
    note: document.querySelector("#note").value.trim(),
  };

  const existingIndex = state.stats.findIndex((item) => item.matchId === matchId && item.playerId === playerId);
  if (existingIndex >= 0) {
    state.stats[existingIndex] = stat;
  } else {
    state.stats.push(stat);
  }

  persist();
  renderAll();
}

function handlePlayerSubmit(event) {
  event.preventDefault();
  const primaryPosition = normalizePlayerPosition(dom.playerPosition.value);
  const roleInPossession = normalizePossessionRole(primaryPosition, dom.playerRoleInPossession.value);
  const roleOutOfPossession = normalizeOutOfPossessionRole(primaryPosition, dom.playerRoleOutOfPossession.value);
  const playerDetails = {
    name: dom.playerName.value.trim(),
    position: primaryPosition,
    primaryPosition,
    secondaryPositions: selectedSecondaryPositionsFromForm().filter((position) => position !== primaryPosition),
    number: Number(dom.playerNumber.value),
    birthYear: Number(dom.playerBirthYear.value || 0) || "",
    height: Number(dom.playerHeight.value || 0) || "",
    foot: dom.playerFoot.value,
    role: roleInPossession,
    roleInPossession,
    roleOutOfPossession,
    profileNote: dom.playerProfileNote.value.trim(),
    trainingGoal: dom.playerTrainingGoal.value.trim(),
    photo: pendingPlayerPhoto,
  };
  if (!playerDetails.name || !playerDetails.number) return;

  if (editingPlayerId) {
    const existingIndex = state.players.findIndex((player) => player.id === editingPlayerId);
    if (existingIndex === -1) return;
    state.players[existingIndex] = {
      ...state.players[existingIndex],
      ...playerDetails,
      id: editingPlayerId,
    };
    if (activeProfilePlayerId === editingPlayerId && dom.playerProfileModal.classList.contains("is-visible")) {
      renderPlayerProfile();
    }
  } else {
    const player = {
      id: `p${Date.now()}`,
      ...playerDetails,
    };
    state.players.push(player);
    if ((state.comparisonPlayers || []).length < 3) state.comparisonPlayers.push(player.id);
  }

  clearPlayerForm();
  persist();
  renderAll();
}

function handleMatchSubmit(event) {
  event.preventDefault();
  const matchId = `m${Date.now()}`;
  const match = {
    id: matchId,
    date: dom.matchDate.value,
    opponent: dom.matchOpponent.value.trim(),
    venue: dom.matchVenue.value,
    competition: normalizeCompetition(dom.matchCompetition.value),
    goalsFor: Number(dom.matchGoalsFor.value || 0),
    goalsAgainst: Number(dom.matchGoalsAgainst.value || 0),
    nonPenaltyXg: optionalInputNumber(dom.matchNonPenaltyXg),
    opponentXg: optionalInputNumber(dom.matchOpponentXg),
    shotsOnTarget: optionalInputNumber(dom.matchShotsOnTarget),
    foulsWon: optionalInputNumber(dom.matchFoulsWon),
    foulsCommitted: optionalInputNumber(dom.matchFoulsCommitted),
    opponentFinalThirdPasses: optionalInputNumber(dom.matchOpponentFinalThirdPasses),
    ppda: optionalInputNumber(dom.matchPpda),
    duelQuote: optionalInputNumber(dom.matchDuelQuote),
    formation: "4-3-3",
    lineup: normalizeLineup({ id: matchId, lineup: [] }, state.players, []),
  };
  if (!match.date || !match.opponent) return;

  state.matches.push(normalizeMatch(match, {}, state.players, state.stats));
  dom.matchForm.reset();
  persist();
  renderAll();
}

function openDeleteConfirmation(type, id) {
  pendingDelete = { type, id };

  if (type === "player") {
    const player = getPlayer(id);
    if (!player) return;
    const affectedStats = state.stats.filter((stat) => stat.playerId === id);
    const noteCount = affectedStats.filter((stat) => stat.note).length;
    dom.deleteConfirmTitle.textContent = `${player.name} löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du #${player.number} ${player.name} wirklich endgültig löschen? Dabei werden ${affectedStats.length} Spieler-Auswertungen und ${noteCount} Notizen dieses Spielers entfernt.`;
    dom.confirmDeleteButton.textContent = "Ja, Spieler löschen";
  }

  if (type === "match") {
    const match = state.matches.find((item) => item.id === id);
    if (!match) return;
    const affectedStats = state.stats.filter((stat) => stat.matchId === id);
    const noteCount = affectedStats.filter((stat) => stat.note).length;
    dom.deleteConfirmTitle.textContent = `Spiel gegen ${match.opponent} löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du das Spiel vom ${formatDate(match.date)} wirklich endgültig löschen? Dabei werden ${affectedStats.length} Spieler-Auswertungen und ${noteCount} Notizen aus diesem Spiel entfernt.`;
    dom.confirmDeleteButton.textContent = "Ja, Spiel löschen";
  }

  if (type === "training") {
    const training = getTraining(id);
    if (!training) return;
    const summary = trainingSummary(training);
    dom.deleteConfirmTitle.textContent = `Training vom ${formatDate(training.date)} löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du das Training "${training.topic || training.type}" wirklich endgültig löschen? Dabei werden ${summary.confirmed} Zusagen, ${summary.cancelled} Absagen und ${summary.ratingCount} Bewertungen entfernt.`;
    dom.confirmDeleteButton.textContent = "Ja, Training löschen";
  }

  if (type === "injury") {
    const injury = state.injuries.find((item) => item.id === id);
    const player = injury ? getPlayer(injury.playerId) : null;
    if (!injury) return;
    dom.deleteConfirmTitle.textContent = `Verletzung löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du die Verletzung ${injury.type} (${injury.bodyArea})${player ? ` von ${player.name}` : ""} wirklich löschen? Dadurch werden automatisch erzeugte Verletzungs-Verfügbarkeiten neu berechnet.`;
    dom.confirmDeleteButton.textContent = "Ja, Verletzung löschen";
  }

  if (type === "availabilityBlock") {
    const block = (state.availabilityBlocks || []).find((item) => item.id === id);
    const player = block ? getPlayer(block.playerId) : null;
    if (!block) return;
    dom.deleteConfirmTitle.textContent = `Verfügbarkeit löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du die Abwesenheit ${block.reason || block.status}${player ? ` von ${player.name}` : ""} wirklich löschen? Termine und Anwesenheitswerte werden danach neu berechnet.`;
    dom.confirmDeleteButton.textContent = "Ja, Verfügbarkeit löschen";
  }

  if (type === "calendarEvent") {
    const event = getCalendarEvent(id);
    if (!event) return;
    dom.deleteConfirmTitle.textContent = `Termin "${event.title}" löschen?`;
    dom.deleteConfirmMessage.textContent = `Möchtest du den Termin vom ${formatDate(event.date)} wirklich endgültig löschen?`;
    dom.confirmDeleteButton.textContent = "Ja, Termin löschen";
  }

  dom.deleteConfirmModal.classList.add("is-visible");
  dom.deleteConfirmModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDeleteConfirmation() {
  pendingDelete = null;
  dom.deleteConfirmModal.classList.remove("is-visible");
  dom.deleteConfirmModal.setAttribute("aria-hidden", "true");
  if (!dom.playerProfileModal.classList.contains("is-visible")) {
    document.body.style.overflow = "";
  }
}

function confirmPendingDelete() {
  if (!pendingDelete) return;
  const { type, id } = pendingDelete;
  pendingDelete = null;
  dom.deleteConfirmModal.classList.remove("is-visible");
  dom.deleteConfirmModal.setAttribute("aria-hidden", "true");

  if (type === "player") deletePlayer(id);
  if (type === "match") deleteMatch(id);
  if (type === "training") deleteTraining(id);
  if (type === "injury") deleteInjury(id);
  if (type === "availabilityBlock") deleteAvailabilityBlock(id);
  if (type === "calendarEvent") deleteCalendarEvent(id);
  if (!dom.playerProfileModal.classList.contains("is-visible")) {
    document.body.style.overflow = "";
  }
}

function deletePlayer(playerId) {
  state.players = state.players.filter((player) => player.id !== playerId);
  state.stats = state.stats.filter((stat) => stat.playerId !== playerId);
  state.injuries = (state.injuries || []).filter((injury) => injury.playerId !== playerId);
  state.availabilityBlocks = (state.availabilityBlocks || []).filter((block) => block.playerId !== playerId);
  state.comparisonPlayers = (state.comparisonPlayers || []).filter((id) => id !== playerId);
  state.trainings = (state.trainings || []).map((training) => normalizeTraining({
    ...training,
    availability: training.availability.filter((item) => item.playerId !== playerId),
    ratings: training.ratings.filter((item) => item.playerId !== playerId),
    groups: training.groups.map((group) => ({ ...group, playerIds: group.playerIds.filter((id) => id !== playerId) })),
  }, {}, state.players));
  state.matches = (state.matches || []).map((match) => normalizeMatch({
    ...match,
    availability: (match.availability || []).filter((item) => item.playerId !== playerId),
    lineup: (match.lineup || []).filter((item) => item.playerId !== playerId),
    events: (match.events || []).filter((item) => item.playerId !== playerId && item.assistPlayerId !== playerId),
  }, {}, state.players, state.stats));
  if (activeProfilePlayerId === playerId) closePlayerProfile();
  persist();
  renderAll();
}

function deleteMatch(matchId) {
  state.matches = state.matches.filter((match) => match.id !== matchId);
  state.stats = state.stats.filter((stat) => stat.matchId !== matchId);
  if (activeMatchId === matchId) closeMatchDetail();
  persist();
  renderAll();
}

function deleteTraining(trainingId) {
  state.trainings = state.trainings.filter((training) => training.id !== trainingId);
  if (activeTrainingId === trainingId) closeTrainingDetail();
  if (editingTrainingId === trainingId) clearTrainingForm();
  persist();
  renderAll();
}

function deleteInjury(injuryId) {
  state.injuries = (state.injuries || []).filter((injury) => injury.id !== injuryId);
  if (editingInjuryId === injuryId) clearInjuryForm();
  reconcileScheduleWithInjuries();
  persist();
  renderAll();
}

function deleteAvailabilityBlock(blockId) {
  state.availabilityBlocks = (state.availabilityBlocks || []).filter((block) => block.id !== blockId);
  if (editingAvailabilityBlockId === blockId) clearAvailabilityForm();
  reconcileScheduleWithInjuries();
  persist();
  renderAll();
}

function deleteCalendarEvent(eventId) {
  state.calendarEvents = state.calendarEvents.filter((event) => event.id !== eventId);
  persist();
  renderAll();
}

function reconcileScheduleWithInjuries() {
  state.matches = (state.matches || []).map((match) => normalizeMatch(match, {}, state.players, state.stats, state.injuries, state.availabilityBlocks));
  state.trainings = (state.trainings || []).map((training) => normalizeTraining(training, {}, state.players, state.injuries, state.availabilityBlocks));
}

function aggregateTeam() {
  return aggregateStats(activeStats());
}

function aggregatePlayer(playerId) {
  return aggregateStats(activeStats().filter((stat) => stat.playerId === playerId));
}

function aggregateMatch(matchId) {
  return aggregateStats(statsForMatch(matchId));
}

function aggregateTeamFiltered(filters) {
  return aggregateStats(statsForFilteredMatches(filters));
}

function aggregatePlayerFiltered(playerId, filters) {
  const matchIds = new Set(filteredMatches(filters).map((match) => match.id));
  return aggregateStats(activeStats().filter((stat) => stat.playerId === playerId && matchIds.has(stat.matchId)));
}

function aggregateTeamDetail(filters) {
  const matches = filteredMatches(filters);
  const team = aggregateTeamFiltered(filters);
  const games = matches.length;
  const detailRows = matches.map(matchDetailStats);
  const sumDetail = (field) => detailRows.reduce((sum, row) => sum + Number(row[field] || 0), 0);
  const averageDetail = (field) => average(detailRows.map((row) => Number(row[field] || 0)));
  const goalsFor = matches.reduce((sum, match) => sum + Number(match.goalsFor || 0), 0);
  const goalsAgainst = matches.reduce((sum, match) => sum + Number(match.goalsAgainst || 0), 0);
  const shotsOnTarget = sumDetail("shotsOnTarget");
  const ballWins = team.tacklesWon + team.interceptions;

  return {
    games,
    passAccuracy: team.passAccuracy,
    duelQuote: averageDetail("duelQuote"),
    goalsPerGame: perGame(goalsFor, games),
    nonPenaltyXgPer90: perGame(sumDetail("nonPenaltyXg"), games),
    goalsAgainstPerGame: perGame(goalsAgainst, games),
    opponentXgPerGame: perGame(sumDetail("opponentXg"), games),
    shotsPerGame: perGame(team.shots, games),
    shotsOnTargetRate: team.shots ? (shotsOnTarget / team.shots) * 100 : 0,
    foulsWonPerGame: perGame(sumDetail("foulsWon"), games),
    dribblesPerGame: perGame(team.dribblesAttempted, games),
    crossAccuracy: team.crossAccuracy,
    opponentFinalThirdPassesPerGame: perGame(sumDetail("opponentFinalThirdPasses"), games),
    foulsCommittedPerGame: perGame(sumDetail("foulsCommitted"), games),
    cleanSheets: matches.filter((match) => Number(match.goalsAgainst || 0) === 0).length,
    ppda: averageDetail("ppda"),
    ballWinsPerGame: perGame(ballWins, games),
  };
}

function matchDetailStats(match) {
  const aggregate = aggregateMatch(match.id);
  const goalsFor = Number(match.goalsFor || 0);
  const goalsAgainst = Number(match.goalsAgainst || 0);
  const provided = (field) => {
    const value = match[field];
    return value === undefined || value === null || value === "" ? null : Number(value || 0);
  };

  return {
    nonPenaltyXg: provided("nonPenaltyXg") ?? roundTo(Math.max(0.2, goalsFor * 0.75 + aggregate.shots * 0.08), 1),
    opponentXg: provided("opponentXg") ?? roundTo(Math.max(0.2, goalsAgainst * 0.85 + Math.max(0, 14 - aggregate.interceptions) * 0.04), 1),
    shotsOnTarget: clampNumber(Math.round(provided("shotsOnTarget") ?? Math.max(goalsFor, aggregate.shots * 0.42)), 0, Math.max(aggregate.shots, goalsFor)),
    foulsWon: Math.round(provided("foulsWon") ?? Math.max(0, 7 + aggregate.dribblesAttempted * 0.45)),
    foulsCommitted: Math.round(provided("foulsCommitted") ?? Math.max(0, 8 + aggregate.tacklesWon * 0.35)),
    opponentFinalThirdPasses: Math.round(provided("opponentFinalThirdPasses") ?? Math.max(8, 64 - aggregate.interceptions * 1.6 + goalsAgainst * 7)),
    ppda: provided("ppda") ?? roundTo(clampNumber(14 - aggregate.tacklesWon * 0.25 - aggregate.interceptions * 0.18 + goalsAgainst * 1.1, 6, 24), 1),
    duelQuote: provided("duelQuote") ?? roundTo(clampNumber(47 + aggregate.duelsWon * 0.45 - aggregate.ballLosses * 0.22, 35, 68), 1),
  };
}

function statsForFilteredMatches(filters) {
  const matchIds = new Set(filteredMatches(filters).map((match) => match.id));
  return activeStats().filter((stat) => matchIds.has(stat.matchId));
}

function filteredMatches(filters = defaultFilters) {
  const normalized = normalizeFilters(filters);
  return state.matches
    .filter((match) => matchPassesFilters(match, normalized))
    .slice()
    .filter((match, index, matches) => matchPassesPeriod(match, normalized, matches))
    .sort(sortByDateDesc);
}

function matchPassesFilters(match, filters) {
  const venuePasses = filters.venue === "all" || match.venue === filters.venue;
  const competitionPasses = filters.competition === "all" || match.competition === filters.competition;
  const datePasses = (!filters.dateFrom || match.date >= filters.dateFrom) && (!filters.dateTo || match.date <= filters.dateTo);
  return venuePasses && competitionPasses && datePasses;
}

function matchPassesPeriod(match, filters, matches) {
  if (filters.period === "last3" || filters.period === "last5") {
    const count = filters.period === "last3" ? 3 : 5;
    const ids = new Set(matches.slice().sort(sortByDateDesc).slice(0, count).map((item) => item.id));
    return ids.has(match.id);
  }
  if (filters.period === "last30") {
    const latest = matches.slice().sort(sortByDateDesc)[0]?.date;
    if (!latest) return false;
    const cutoff = dateOffset(latest, -30);
    return match.date >= cutoff && match.date <= latest;
  }
  if (filters.period === "firstHalf") {
    const month = Number(match.date.slice(5, 7));
    return month >= 7 && month <= 12;
  }
  if (filters.period === "secondHalf") {
    const month = Number(match.date.slice(5, 7));
    return month >= 1 && month <= 6;
  }
  return true;
}

function filterLabel(filters) {
  const normalized = normalizeFilters(filters);
  const parts = [];
  if (normalized.period !== "all") parts.push(periodLabel(normalized));
  if (normalized.venue !== "all") parts.push(normalized.venue === "Heim" ? "Heimspiele" : "Auswärtsspiele");
  if (normalized.competition !== "all") parts.push(normalized.competition);
  return parts.length ? parts.join(" · ") : "Alle Spiele";
}

function periodLabel(filters) {
  if (filters.period === "last3") return "Letzte 3 Spiele";
  if (filters.period === "last5") return "Letzte 5 Spiele";
  if (filters.period === "last30") return "Letzte 30 Tage";
  if (filters.period === "firstHalf") return "Hinrunde";
  if (filters.period === "secondHalf") return "Rückrunde";
  if (filters.period === "custom") {
    if (filters.dateFrom && filters.dateTo) return `${formatDate(filters.dateFrom)} bis ${formatDate(filters.dateTo)}`;
    if (filters.dateFrom) return `Ab ${formatDate(filters.dateFrom)}`;
    if (filters.dateTo) return `Bis ${formatDate(filters.dateTo)}`;
    return "Datumsbereich";
  }
  return "Gesamte Saison";
}

function aggregateStats(stats) {
  const baseTotals = Object.fromEntries(statFields.map((field) => [field, 0]));
  const eventScoring = aggregateEventScoringForStats(stats);
  const totals = stats.reduce(
    (sum, stat) => {
      const officialStat = statWithOfficialScoring(stat);
      statFields.forEach((field) => {
        if (field === "goals" || field === "assists") return;
        sum[field] += Number(officialStat[field] || 0);
      });
      sum.indexes.push(calculateIndex(officialStat));
      if (stat.rating) sum.ratings.push(Number(stat.rating));
      return sum;
    },
    {
      ...baseTotals,
      indexes: [],
      ratings: [],
    },
  );

  return {
    ...totals,
    ...eventScoring,
    games: new Set(stats.map((stat) => stat.matchId)).size,
    entries: stats.length,
    passAccuracy: totals.passesAttempted ? (totals.passesCompleted / totals.passesAttempted) * 100 : 0,
    dribbleSuccess: totals.dribblesAttempted ? (totals.dribblesCompleted / totals.dribblesAttempted) * 100 : 0,
    crossAccuracy: totals.crossesAttempted ? (totals.crossesCompleted / totals.crossesAttempted) * 100 : 0,
    averageIndex: average(totals.indexes),
    averageRating: average(totals.ratings),
  };
}

function passAccuracy(stat) {
  return stat.passesAttempted ? (stat.passesCompleted / stat.passesAttempted) * 100 : 0;
}

function calculateIndex(stat) {
  const officialStat = statWithOfficialScoring(stat);
  const accuracy = passAccuracy(stat);
  const attack = Number(officialStat.goals || 0) * 12 + Number(officialStat.assists || 0) * 8 + Number(stat.shots || 0) * 1.7;
  const technique = Number(stat.dribblesCompleted || 0) * 1.6 + Number(stat.crossesCompleted || 0) * 1.4;
  const defense = Number(stat.tacklesWon || 0) * 2.2 + Number(stat.duelsWon || 0) * 1.3 + Number(stat.interceptions || 0) * 2;
  const security = Math.max(0, 18 - Number(stat.ballLosses || 0) * 1.6);
  const ratingBoost = Number(stat.rating || 0) * 3;
  const minutesFactor = Math.min(Number(stat.minutes || 0), 90) / 90;
  return Math.round((accuracy * 0.28 + attack + technique + defense + security + ratingBoost) * minutesFactor);
}

function teamSeries(metric) {
  return {
    name: metricLabel(metric),
    color: colors[0],
    points: state.matches
      .slice()
      .sort(sortByDateAsc)
      .map((match) => {
        const matchStats = statsForMatch(match.id);
        return {
          label: shortOpponent(match.opponent),
          value: metricValue(aggregateStats(matchStats), metric),
        };
      }),
  };
}

function seasonTeamSeries(metric, filters) {
  return {
    name: metricLabel(metric),
    color: colors[0],
    points: filteredMatches(filters)
      .slice()
      .sort(sortByDateAsc)
      .map((match) => ({
        label: shortOpponent(match.opponent),
        value: metricValue(aggregateStats(statsForMatch(match.id)), metric),
      })),
  };
}

function playerSeries(playerId, metric, color) {
  const player = getPlayer(playerId);
  return {
    name: player?.name || "Unbekannt",
    color,
    points: state.matches
      .slice()
      .sort(sortByDateAsc)
      .map((match) => {
        const stat = statsForMatch(match.id).find((item) => item.playerId === playerId);
        return {
          label: shortOpponent(match.opponent),
          value: stat ? metricValueForStat(stat, metric) : null,
        };
      }),
  };
}

function metricValueForStat(stat, metric) {
  const officialStat = statWithOfficialScoring(stat);
  if (metric === "passAccuracy") return passAccuracy(stat);
  if (metric === "dribbleSuccess") return stat.dribblesAttempted ? (stat.dribblesCompleted / stat.dribblesAttempted) * 100 : 0;
  if (metric === "crossAccuracy") return stat.crossesAttempted ? (stat.crossesCompleted / stat.crossesAttempted) * 100 : 0;
  if (metric === "rating") return Number(stat.rating || 0);
  if (metric === "goalsAssists") return Number(officialStat.goals || 0) + Number(officialStat.assists || 0);
  return calculateIndex(officialStat);
}

function metricValue(aggregate, metric) {
  const definition = getLeaderboardDefinition(metric);
  if (definition) return definition.value(aggregate);
  if (metric === "passAccuracy") return aggregate.passAccuracy;
  if (metric === "dribbleSuccess") return aggregate.dribbleSuccess;
  if (metric === "crossAccuracy") return aggregate.crossAccuracy;
  if (metric === "rating") return aggregate.averageRating;
  if (metric === "goalsAssists") return aggregate.goals + aggregate.assists;
  return aggregate.averageIndex;
}

function metricMax(metric) {
  if (metric === "passAccuracy" || metric === "dribbleSuccess" || metric === "crossAccuracy") return 100;
  if (metric === "rating") return 10;
  if (metric === "goalsAssists") return 4;
  return 100;
}

function metricSuffix(metric) {
  return metric === "passAccuracy" || metric === "dribbleSuccess" || metric === "crossAccuracy" ? "%" : "";
}

function metricLabel(metric) {
  const definition = getLeaderboardDefinition(metric);
  if (definition) return definition.label;
  const labels = {
    index: "Leistungsindex",
    passAccuracy: "Passquote",
    dribbleSuccess: "Dribblingquote",
    crossAccuracy: "Flankenquote",
    rating: "Bewertung",
    goalsAssists: "Tore + Assists",
  };
  return labels[metric] || labels.index;
}

function renderLineChart(container, series, options = {}) {
  const width = 760;
  const height = 310;
  const margin = { top: 28, right: 28, bottom: 54, left: 48 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allValues = series.flatMap((item) => item.points.map((point) => point.value).filter((value) => value !== null));
  const yMax = Math.max(options.yMax || 0, Math.ceil(Math.max(...allValues, 1) / 10) * 10);
  const pointCount = Math.max(...series.map((item) => item.points.length), 1);

  if (!allValues.length) {
    container.innerHTML = emptySvg("Noch keine Daten für diese Kurve.");
    return;
  }

  const x = (index) => margin.left + (pointCount === 1 ? innerWidth / 2 : (index / (pointCount - 1)) * innerWidth);
  const y = (value) => margin.top + innerHeight - (Number(value || 0) / yMax) * innerHeight;
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((step) => {
      const yPos = margin.top + innerHeight - step * innerHeight;
      const value = Math.round(step * yMax);
      return `
        <line x1="${margin.left}" x2="${width - margin.right}" y1="${yPos}" y2="${yPos}" stroke="#e6ded1" />
        <text class="axis-label" x="10" y="${yPos + 4}">${value}${options.suffix || ""}</text>
      `;
    })
    .join("");

  const lines = series
    .map((item) => {
      const validPoints = item.points
        .map((point, index) => ({ ...point, index }))
        .filter((point) => point.value !== null);
      const path = validPoints.map((point) => `${x(point.index)},${y(point.value)}`).join(" ");
      const circles = validPoints
        .map(
          (point) => `
            <circle cx="${x(point.index)}" cy="${y(point.value)}" r="4" fill="${item.color}" />
            <text class="chart-value" x="${x(point.index) + 6}" y="${y(point.value) - 6}">${formatNumber(point.value)}${options.suffix || ""}</text>
          `,
        )
        .join("");
      return `
        <polyline points="${path}" fill="none" stroke="${item.color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        ${circles}
      `;
    })
    .join("");

  const labels = (series[0]?.points || [])
    .map(
      (point, index) => `
        <text class="axis-label" x="${x(index)}" y="${height - 18}" text-anchor="middle">${escapeSvg(point.label)}</text>
      `,
    )
    .join("");

  const legend = series
    .map(
      (item, index) => `
        <g transform="translate(${margin.left + index * 145}, 12)">
          <rect width="10" height="10" rx="2" fill="${item.color}" />
          <text class="chart-label" x="16" y="10">${escapeSvg(item.name)}</text>
        </g>
      `,
    )
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Formkurve">
      ${grid}
      ${lines}
      ${labels}
      ${legend}
    </svg>
  `;
}

function renderBarChart(container, data, options = {}) {
  if (!data.length) {
    container.innerHTML = emptySvg("Noch keine Werte vorhanden.");
    return;
  }

  const width = 620;
  const rowHeight = 36;
  const margin = { top: 22, right: 28, bottom: 22, left: 168 };
  const height = Math.max(250, margin.top + margin.bottom + data.length * rowHeight);
  const max = options.max || Math.max(...data.map((item) => item.value), 1);
  const barMaxWidth = width - margin.left - margin.right - 54;

  const bars = data
    .map((item, index) => {
      const y = margin.top + index * rowHeight;
      const barWidth = Math.max(2, (item.value / max) * barMaxWidth);
      return `
        <text class="chart-label" x="${margin.left - 12}" y="${y + 18}" text-anchor="end">${escapeSvg(trimLabel(item.label, 22))}</text>
        <rect x="${margin.left}" y="${y + 4}" width="${barMaxWidth}" height="18" rx="4" fill="#ede7dc" />
        <rect x="${margin.left}" y="${y + 4}" width="${barWidth}" height="18" rx="4" fill="${item.color || colors[0]}" />
        <text class="chart-value" x="${margin.left + barWidth + 8}" y="${y + 18}">${formatNumber(item.value)}${options.suffix || ""}</text>
      `;
    })
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Balkendiagramm">
      ${bars}
    </svg>
  `;
}

function renderRadarChart(container, players) {
  if (!players.length) {
    container.innerHTML = emptySvg("Wähle Spieler für den Vergleich.");
    return;
  }

  const width = 420;
  const height = 330;
  const center = { x: 210, y: 150 };
  const radius = 92;
  const axes = [
    { label: "Pässe", key: "passAccuracy", max: 100 },
    { label: "Scoring", key: "scoring", max: 2.5 },
    { label: "Defensiv", key: "defense", max: 18 },
    { label: "Duelle", key: "duelsWon", max: 12 },
    { label: "Sicherheit", key: "security", max: 100 },
    { label: "Bewertung", key: "averageRating", max: 10 },
  ];

  const angleFor = (index) => (Math.PI * 2 * index) / axes.length - Math.PI / 2;
  const pointFor = (index, value) => {
    const angle = angleFor(index);
    return {
      x: center.x + Math.cos(angle) * radius * value,
      y: center.y + Math.sin(angle) * radius * value,
    };
  };

  const rings = [0.25, 0.5, 0.75, 1]
    .map((scale) => {
      const points = axes.map((_, index) => pointFor(index, scale)).map((point) => `${point.x},${point.y}`).join(" ");
      return `<polygon points="${points}" fill="none" stroke="#e5ded2" />`;
    })
    .join("");

  const axisLines = axes
    .map((axis, index) => {
      const end = pointFor(index, 1.15);
      const labelAnchor = end.x < center.x - 10 ? "end" : end.x > center.x + 10 ? "start" : "middle";
      return `
        <line x1="${center.x}" y1="${center.y}" x2="${end.x}" y2="${end.y}" stroke="#ded6ca" />
        <text class="axis-label" x="${end.x}" y="${end.y + 4}" text-anchor="${labelAnchor}">${axis.label}</text>
      `;
    })
    .join("");

  const polygons = players
    .map((player, playerIndex) => {
      const aggregate = aggregatePlayer(player.id);
      const scoringPerGame = aggregate.games ? (aggregate.goals + aggregate.assists) / aggregate.games : 0;
      const defensePerGame = aggregate.games ? (aggregate.tacklesWon + aggregate.interceptions) / aggregate.games : 0;
      const duelsPerGame = aggregate.games ? aggregate.duelsWon / aggregate.games : 0;
      const security = Math.max(0, 100 - (aggregate.games ? aggregate.ballLosses / aggregate.games : 0) * 9);
      const values = {
        passAccuracy: aggregate.passAccuracy,
        scoring: scoringPerGame,
        defense: defensePerGame,
        duelsWon: duelsPerGame,
        security,
        averageRating: aggregate.averageRating,
      };
      const points = axes
        .map((axis, index) => pointFor(index, Math.min(1, Number(values[axis.key] || 0) / axis.max)))
        .map((point) => `${point.x},${point.y}`)
        .join(" ");
      const color = colors[playerIndex % colors.length];
      return `
        <polygon points="${points}" fill="${color}33" stroke="${color}" stroke-width="2.5" />
      `;
    })
    .join("");

  const legend = players
    .map((player, index) => {
      const x = 26 + (index % 2) * 190;
      const y = 272 + Math.floor(index / 2) * 22;
      return `
        <g transform="translate(${x}, ${y})">
          <rect width="10" height="10" rx="2" fill="${colors[index % colors.length]}" />
          <text class="chart-label" x="16" y="10">${escapeSvg(player.name)}</text>
        </g>
      `;
    })
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Radarvergleich">
      ${rings}
      ${axisLines}
      ${polygons}
      ${legend}
    </svg>
  `;
}

function emptySvg(message) {
  return `
    <svg viewBox="0 0 520 250" role="img" aria-label="${escapeHtml(message)}">
      <rect x="18" y="18" width="484" height="214" rx="8" fill="#f7f3ea" stroke="#ded8cc" stroke-dasharray="8 8" />
      <text x="260" y="128" text-anchor="middle" class="chart-label">${escapeSvg(message)}</text>
    </svg>
  `;
}

function statsForMatch(matchId) {
  const match = getMatch(matchId);
  return state.stats.filter((stat) => stat.matchId === matchId && playerCanHaveMatchStats(match, stat.playerId));
}

function activeStats() {
  return state.stats.filter((stat) => playerCanHaveMatchStats(getMatch(stat.matchId), stat.playerId));
}

function bestNoteForMatch(matchId) {
  const stat = statsForMatch(matchId)
    .filter((item) => item.note)
    .sort((a, b) => calculateIndex(b) - calculateIndex(a))[0];
  return stat?.note || "";
}

function getPlayer(playerId) {
  return state.players.find((player) => player.id === playerId);
}

function getMatch(matchId) {
  return state.matches.find((match) => match.id === matchId);
}

function average(values) {
  const filtered = values.filter((value) => Number.isFinite(value));
  if (!filtered.length) return 0;
  return filtered.reduce((sum, value) => sum + value, 0) / filtered.length;
}

function perGame(value, games) {
  return games ? Number(value || 0) / games : 0;
}

function optionalInputNumber(input) {
  if (!input || input.value === "") return undefined;
  return Number(String(input.value).replace(",", ".") || 0);
}

function roundTo(value, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round(Number(value || 0) * factor) / factor;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(Number(value || 0), min), max);
}

function sortByDateDesc(a, b) {
  return b.date.localeCompare(a.date);
}

function sortByDateAsc(a, b) {
  return a.date.localeCompare(b.date);
}

function sortByNumber(a, b) {
  return Number(a.number) - Number(b.number);
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(`${value}T12:00:00`));
}

function parseIsoDate(value) {
  const normalized = normalizeIsoDate(value);
  if (!normalized) return null;
  return new Date(`${normalized}T12:00:00`);
}

function normalizeIsoDate(value) {
  const text = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return "";
  const date = new Date(`${text}T12:00:00`);
  return Number.isNaN(date.getTime()) ? "" : text;
}

function isoDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function dateOffset(value, days) {
  const date = parseIsoDate(value);
  if (!date) return "";
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(value);
}

function shortOpponent(value) {
  return value.replace(/^(FC|SV|VfL|TSG)\s+/i, "");
}

function slugify(value) {
  return String(value || "spieler")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function trimLabel(value, maxLength) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeSvg(value) {
  return escapeHtml(value);
}
