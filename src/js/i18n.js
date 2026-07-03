/* Tweetalig (NL/EN). Nederlands is de standaard en staat in de HTML.
   Engels is een woordenboek dat over de zichtbare tekst en de labels heen
   wordt gelegd. Wisselen slaat de keuze op en herlaadt de pagina, zodat de
   scroll-animaties en gesplitste teksten netjes in de nieuwe taal opbouwen. */

const STORAGE_KEY = 'cello-lang';

/* Normaliseer tekst zodat het woordenboek soepel matcht: witruimte inklappen
   en typografische tekens terugbrengen naar ASCII. De sleutels hieronder zijn
   in diezelfde genormaliseerde vorm geschreven. */
export function normalize(s) {
  return s
    .replace(/ /g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/‑/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/×/g, 'x');
}

/* Genormaliseerd Nederlands → Engels. Alles wat hier niet in staat (merknaam,
   namen, cijfers, gelijk in beide talen) blijft ongewijzigd. */
export const EN = {
  // ── Nav, menu, algemeen ──
  'Naar inhoud': 'Skip to content',
  'Cello, naar boven': 'Cello, back to top',
  Hoofdnavigatie: 'Main navigation',
  'Mobiele navigatie': 'Mobile navigation',
  'Hoe het werkt': 'How it works',
  "Scenario's": 'Scenarios',
  'Voor teams': 'For teams',
  'Over ons': 'About us',
  'Plan een demo': 'Book a demo',
  'Menu openen': 'Open menu',
  Taal: 'Language',

  // ── Hero ──
  'Bellen leer je': 'You learn to call',
  'door te bellen.': 'by calling.',
  'Je team oefent échte gesprekken met AI die terugpraat. Meteen daarna volgt feedback op tempo, taal en zelfvertrouwen.':
    'Your team practises real conversations with AI that talks back. Right after, you get feedback on pace, language and confidence.',
  'Voorbeeld van een oefengesprek in Cello': 'Example of a practice call in Cello',
  'Inkoper · TechNova': 'Buyer · TechNova',
  'In gesprek': 'In call',
  'Scenario · Cold call · demo inboeken': 'Scenario · Cold call · book a demo',
  'Live feedback van Cello tijdens het gesprek': "Cello's live feedback during the call",
  'Sterke opening': 'Strong opening',
  '172 wpm, iets trager': '172 wpm, a touch slower',
  '0x "euhm"': '0× “um”',
  'Bekijk hoe het werkt': 'See how it works',

  // ── Manifest ──
  'Waarom Cello': 'Why Cello',
  'Niemand wordt geboren als beller. Toch trainen we presentaties, e-mails en pitches, maar nooit het gesprek zelf. Cello geeft je team een veilige lijn om te oefenen: faal vrijuit, probeer opnieuw en word elke week beter.':
    'Nobody is born a caller. We train presentations, emails and pitches, yet never the conversation itself. Cello gives your team a safe line to practise on: fail freely, try again and get audibly better every week.',

  // ── Simulatie / Hoe het werkt ──
  'Oefenen in': 'Practise in',
  'drie stappen.': 'three steps.',
  'Scroll om de stappen te doorlopen': 'Scroll to move through the steps',
  '1 · Kies je scenario': '1 · Pick your scenario',
  '2 · Voer het gesprek': '2 · Have the conversation',
  '3 · Krijg je belrapport': '3 · Get your call report',
  '3 · Je belrapport': '3 · Your call report',
  'Kies je scenario': 'Pick your scenario',
  'Van cold call tot klachtgesprek, of bouw je eigen.': 'From cold call to complaint call, or build your own.',
  'Voer het gesprek': 'Have the conversation',
  'Sofie praat terug, twijfelt en onderbreekt. Net echt.': 'Sofie talks back, hesitates and interrupts. Just like real life.',
  'Krijg je belrapport': 'Get your call report',
  'Tempo, stopwoorden en structuur, met tips voor de volgende keer.':
    'Pace, filler words and structure, with tips for next time.',
  'Sofie · Inkoper · kritisch': 'Sofie · Buyer · critical',
  Klachtgesprek: 'Complaint call',
  'Tom · Klant · geïrriteerd': 'Tom · Customer · irritated',
  Sollicitatie: 'Job interview',
  'Anna · HR-manager · vriendelijk': 'Anna · HR manager · friendly',
  'Moeilijkheid: 1 van 3': 'Difficulty: 1 of 3',
  'Moeilijkheid: 2 van 3': 'Difficulty: 2 of 3',
  'Moeilijkheid: 3 van 3': 'Difficulty: 3 of 3',
  'Goeiemiddag, met Sofie De Wolf van TechNova.': 'Good afternoon, this is Sofie De Wolf from TechNova.',
  'Dag Sofie, u spreekt met Alex van Cello. Bel ik gelegen?':
    'Hi Sofie, this is Alex from Cello. Is now a good time?',
  'Ik heb twee minuten. Waarover gaat het precies?': 'I have two minutes. What is this about exactly?',
  'Goeie vraag. Wij laten teams veilig oefenen op moeilijke gesprekken. Ik toon het u graag in tien minuten.':
    "Good question. We let teams safely practise difficult conversations. I'd be glad to show you in ten minutes.",
  Belrapport: 'Call report',
  'Totaalscore 78 op 100': 'Total score 78 out of 100',
  Tempo: 'Pace',
  Structuur: 'Structure',
  Duidelijkheid: 'Clarity',
  Stopwoorden: 'Filler words',
  'Rustige, zelfverzekerde opening': 'Calm, confident opening',
  'Sneller to-the-point in minuut één': 'Get to the point faster in minute one',

  // ── Feedback ──
  'Feedback die': 'Feedback that',
  'blijft plakken.': 'sticks.',
  'Geen vage scores, maar concrete werkpunten na elk gesprek.':
    'No vague scores, but concrete action points after every call.',
  'Vooruitgang die je ziet': 'Progress you can see',
  'Elke sessie meetbaar beter, per persoon en per team.': 'Measurably better every session, per person and per team.',
  'Grafiek: gespreksscore stijgt van 52 naar 86 over acht sessies':
    'Chart: call score rises from 52 to 86 over eight sessions',
  'Sessie 1 · 52': 'Session 1 · 52',
  'Sessie 8 ·': 'Session 8 ·',
  'Stopwoorden-teller': 'Filler-word counter',
  'Gemiddeld aantal "euhms" na vijf sessies.': 'Average number of “ums” after five sessions.',
  'Tempo & stiltes': 'Pace & pauses',
  'Cello hoort wanneer je raast én wanneer je stilvalt.': 'Cello hears when you race and when you fall silent.',
  'Taal & grammatica': 'Language & grammar',
  'groter als': 'bigger then',
  'groter dan': 'bigger than',
  'Elke taalfout benoemd, elk stopwoord geteld. Ook in het Frans of Engels.':
    'Every language mistake flagged, every filler word counted. In French or English too.',
  'Luisteren vs. praten': 'Listening vs. talking',
  'Wie luistert, verkoopt. Cello meet je verhouding in elk gesprek.':
    'Those who listen, sell. Cello measures your ratio in every call.',
  'Luisteren 62%': 'Listening 62%',
  'Praten 38%': 'Talking 38%',
  'Verhouding: 62 procent luisteren, 38 procent praten': 'Ratio: 62 percent listening, 38 percent talking',

  // ── Scenario's ──
  'Voor elk gesprek': 'For every conversation',
  'dat telt.': 'that counts.',
  Klantendienst: 'Customer service',
  Leiderschap: 'Leadership',
  'Van eerste cold call tot laatste onderhandeling.': 'From first cold call to final negotiation.',
  Opvolggesprekken: 'Follow-up calls',
  Prijsonderhandeling: 'Price negotiation',
  'Demo inplannen': 'Booking demos',
  'Boze klanten worden oefenmateriaal.': 'Angry customers become practice material.',
  Klachten: 'Complaints',
  Retenties: 'Retention',
  Escalaties: 'Escalations',
  Terugbetalingen: 'Refunds',
  'Elk kandidaat- en medewerkersgesprek, veilig geoefend.':
    'Every candidate and employee conversation, safely practised.',
  Sollicitaties: 'Job interviews',
  Feedbackgesprekken: 'Feedback talks',
  Exitgesprekken: 'Exit interviews',
  'De moeilijkste gesprekken voer je best niet voor het eerst in het echt.':
    "You'd better not have the hardest conversations for the first time for real.",
  'Slecht nieuws': 'Bad news',
  Evaluaties: 'Reviews',
  Conflicten: 'Conflicts',

  // ── Voor teams ──
  "Jullie scenario's.": 'Your scenarios.',
  'Zelf gebouwd, of door ons.': 'Built by you, or by us.',
  'Bouw het zelf': 'Build it yourself',
  'Nieuwe rollenspellen in minuten, geen technische kennis nodig.':
    'New role-plays in minutes, no technical skills needed.',
  'Voorbeeld van de scenario-editor': 'Example of the scenario editor',
  Stem: 'Voice',
  Houding: 'Attitude',
  Doel: 'Goal',
  'Sofie · Vlaams': 'Sofie · Flemish',
  'Een demo van 30 min inboeken': 'Book a 30-min demo',
  'Houding: eerder kritisch': 'Attitude: rather critical',
  vriendelijk: 'friendly',
  kritisch: 'critical',
  'Scenario gepubliceerd': 'Scenario published',
  'Of laat het aan ons over': 'Or leave it to us',
  'Vertel ons je sector en doelen. Wij leveren een volledige scenariobibliotheek, klaar op dag één.':
    'Tell us your sector and goals. We deliver a full scenario library, ready on day one.',
  "Scenario's op maat van jullie sector": 'Scenarios tailored to your sector',
  "Stemmen en persona's die kloppen": 'Voices and personas that ring true',
  'Meertalig: NL · FR · EN · DE': 'Multilingual: NL · FR · EN · DE',
  'Onboarding van je hele team inbegrepen': 'Onboarding for your whole team included',
  'Bespreek het met ons': 'Talk it through with us',

  // ── Over ons ──
  'Het team achter': 'The team behind',
  'Vier oprichters, één team.': 'Four founders, one team.',
  'Foto van Wout Severens': 'Photo of Wout Severens',
  'Foto van Alexander Vanvinckenroye': 'Photo of Alexander Vanvinckenroye',
  'Foto van Brendan': 'Photo of Brendan',
  'Foto van Sophia': 'Photo of Sophia',
  'Onze software-man. Zet ideeën om in een platform dat gewoon werkt. Als het werkt, was het Wout. Als het niet werkt, ook.':
    "Our software guy. Turns ideas into a platform that just works. If it works, it was Wout. If it doesn't, also Wout.",
  'De CEO. Houdt het hele team georganiseerd, en huurt zichzelf steeds opnieuw in als developer.':
    'The CEO. Keeps the whole team organised, and keeps re-hiring himself as a developer.',
  'Marketing en sales. Zorgt dat de juiste bedrijven Cello vinden, en er niet meer mee willen stoppen. Kan een ijsbeer een airco aansmeren.':
    'Marketing and sales. Makes sure the right companies find Cello, and never want to leave. Could sell an air conditioner to a polar bear.',
  'Houdt alle contracten en documenten op orde, en zorgt dat we niet in de gevangenis belanden. Tegelijk de creatieve stem van het team.':
    'Keeps all contracts and documents in order, and makes sure we stay out of jail. Also the creative voice of the team.',

  // ── CTA ──
  'Klaar om': 'Ready to',
  'op te nemen?': 'pick up?',
  'Plan een demo van 30 minuten en laat je team deze week nog oefenen.':
    'Book a 30-minute demo and let your team start practising this week.',

  // ── Footer ──
  'AI-belsimulaties die van elk team zelfverzekerde bellers maken.':
    'AI call simulations that turn any team into confident callers.',

  // ── Documenttitel ──
  'Cello · Beter bellen begint met oefenen': 'Cello · Better calling starts with practice',
};

const TRANSLATABLE_ATTRS = ['aria-label', 'alt', 'title', 'placeholder'];

function translateNode(node) {
  const raw = node.nodeValue;
  const key = normalize(raw);
  if (!key) return;
  const en = EN[key];
  if (en === undefined) return;
  const lead = raw.match(/^\s*/)[0];
  const trail = raw.match(/\s*$/)[0];
  node.nodeValue = lead + en + trail;
}

function applyEnglish() {
  // 1. zichtbare tekst (tekstknopen), scripts/styles overslaan
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentNode;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
      return node.nodeValue && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateNode);

  // 2. attributen (aria-label, alt, title, placeholder)
  TRANSLATABLE_ATTRS.forEach((attr) => {
    document.querySelectorAll('[' + attr + ']').forEach((el) => {
      const en = EN[normalize(el.getAttribute(attr))];
      if (en !== undefined) el.setAttribute(attr, en);
    });
  });

  // 3. documenttitel
  const t = EN[normalize(document.title)];
  if (t !== undefined) document.title = t;
}

function currentLang() {
  return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'nl';
}

function setLang(lang) {
  if (lang === currentLang()) return;
  localStorage.setItem(STORAGE_KEY, lang === 'en' ? 'en' : 'nl');
  location.reload();
}

export function initI18n() {
  const lang = currentLang();
  document.documentElement.lang = lang;
  if (lang === 'en') applyEnglish();

  document.querySelectorAll('.lang-switch').forEach((group) => {
    group.querySelectorAll('.lang-opt').forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });
}
