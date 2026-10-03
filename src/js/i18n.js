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
  'Laat nieuwe medewerkers hun moeilijkste gesprekken eerst oefenen met Vlaamse AI-klanten, in het Nederlands en Frans. Na elk gesprek krijgen ze concrete feedback. Jij ziet wie klaar is voor de lijn.':
    'Let new team members practise their hardest conversations first with Flemish AI customers, in Dutch and French. After every call, they get concrete feedback. You see who’s ready to take real calls.',
  'Voorbeeld van een oefengesprek in Cello': 'Example of a practice call in Cello',
  'Inkoper · TechNova': 'Buyer · TechNova',
  'In gesprek': 'In call',
  'Scenario · Cold call · demo inboeken': 'Scenario · Cold call · book a demo',
  'Live feedback van Cello tijdens het gesprek': "Cello's live feedback during the call",
  'Sterke opening': 'Strong opening',
  'Bezwaar opgevangen': 'Objection handled',
  'Verzorgde taal': 'Polished language',
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
  'Structuur, bezwaren en taal, met tips voor de volgende keer.':
    'Structure, objections and language, with tips for next time.',
  'Sofie · Inkoper · kritisch': 'Sofie · Buyer · critical',
  Klachtgesprek: 'Complaint call',
  'Tom · Klant · geïrriteerd': 'Tom · Customer · irritated',
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
  Structuur: 'Structure',
  'Bezwaren opvangen': 'Handling objections',
  Taalvaardigheid: 'Language skills',
  'Tempo 148 wpm': 'Pace 148 wpm',
  '1 stopwoord': '1 filler word',
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
  'Lukte het gesprek?': 'Did the call land?',
  'Na elk gesprek scoort Cello wat telt: de structuur, hoe je bezwaren opvangt en je taalvaardigheid.':
    'After every call, Cello scores what matters: the structure, how you handle objections and your language skills.',
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
  'Boze klanten worden oefenmateriaal.': 'Angry customers become practice material.',

  // ── Scenario's ──
  'Cold calling · Opvolggesprekken · Prijsonderhandeling · Demo inplannen':
    'Cold calling · Follow-up calls · Price negotiation · Booking demos',
  'Klachten · Retenties · Escalaties · Terugbetalingen': 'Complaints · Retention · Escalations · Refunds',
  'Ook voor HR en leiderschap.': 'Also for HR and leadership.',
  'Sollicitaties, feedback- en exitgesprekken, slecht nieuws brengen, evaluaties en conflicten.':
    'Job interviews, feedback and exit conversations, delivering bad news, reviews and conflicts.',

  // ── Teamleider: vette inleidingen ──
  'Waar het team op zakt.': 'Where the team drops.',
  'Wie klaar is voor de lijn.': 'Who is ready for real calls.',
  'Hoe snel iemand groeit.': 'How fast someone improves.',

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
  "Vertel ons je sector en doelen. We bouwen je eerste scenario's samen met jou.":
    'Tell us your sector and goals. We build your first scenarios together with you.',
  "Scenario's op maat van jullie sector": 'Scenarios tailored to your sector',
  "Stemmen en persona's die kloppen": 'Voices and personas that ring true',
  'Meertalig: NL · FR · EN': 'Multilingual: NL · FR · EN',
  'Onboarding van je hele team inbegrepen': 'Onboarding for your whole team included',
  'Bespreek het met ons': 'Talk it through with us',

  // ── Over ons ──
  'Het team achter': 'The team behind',
  'Drie oprichters, één team.': 'Three founders, one team.',
  'Foto van Wout Severens': 'Photo of Wout Severens',
  'Foto van Alexander Vanvinckenroye': 'Photo of Alexander Vanvinckenroye',
  'Foto van Sophia': 'Photo of Sophia',
  'Onze software-man. Zet ideeën om in een platform dat gewoon werkt.':
    'Our software guy. Turns ideas into a platform that just works.',
  'De CEO. Houdt het hele team georganiseerd, en huurt zichzelf steeds opnieuw in als developer.':
    'The CEO. Keeps the whole team organised, and keeps re-hiring himself as a developer.',
  'Houdt alle contracten en documenten op orde. Tegelijk de creatieve stem van het team.':
    'Keeps all contracts and documents in order. Also the creative voice of the team.',

  // ── CTA ──
  'Klaar om': 'Ready to',
  'op te nemen?': 'pick up?',
  'Plan een demo van 30 minuten en laat je team deze week nog oefenen.':
    'Book a 30-minute demo and let your team start practising this week.',

  // ── Footer ──
  'AI-belsimulaties die van elk team zelfverzekerde bellers maken.':
    'AI call simulations that turn any team into confident callers.',

  // ── AI-klant ──
  'AI-klant': 'AI customer',

  // ── Voor de teamleider (een stukje uit het echte dashboard) ──
  'Voor de teamleider': 'For the team leader',
  'Zie wie': 'See who',
  'klaar is voor de lijn.': 'is ready for real calls.',
  'Eén overzicht van je hele team: hoe de oefengesprekken gaan, waar het team op zakt en wie klaar is voor de lijn.':
    'One overview of your whole team: how the practice calls are going, where the team drops and who is ready for real calls.',
  'Voorbeeld van het dashboard voor de teamleider': 'Example of the team leader dashboard',
  Medewerkers: 'Team members',
  Medewerker: 'Team member',
  Gemiddelde: 'Average',
  Verschil: 'Change',
  Verloop: 'Trend',
  '↑ 10,4': '↑ 10.4',
  '↑ 12,1': '↑ 12.1',
  '↑ 8,9': '↑ 8.9',
  '↑ 3,2': '↑ 3.2',
  Teamgemiddelde: 'Team average',
  '↑ 8,7': '↑ 8.7',
  'Waar het hele team op zakt': 'Where the whole team drops',
  'Kwaliteit van je vragen': 'Quality of your questions',
  '↑ 13,8': '↑ 13.8',
  'Bij 3 van de 4 medewerkers is dit het zwakste punt.': 'For 3 of the 4 team members this is the weakest point.',
  'Voorbeeld van het dashboard, met fictieve medewerkers.': 'Example of the dashboard, with fictional team members.',
  'Het zwakste punt van het hele team, en welk scenario het lastigst is. Meteen je volgende trainingsonderwerp.':
    'The weakest point of the whole team, and which scenario is the hardest. Your next training topic, right there.',
  'Per medewerker de gemiddelde score, de vooruitgang en het zwakste punt. Op basis van scores, niet op gevoel.':
    'For every team member: the average score, the progress and the weakest point. Based on scores, not gut feeling.',
  'Het verloop per medewerker, gesprek na gesprek. Zo zie je wanneer iemand zelfstandig kan bellen.':
    'The trend for every team member, call after call. So you can see when someone is ready to call on their own.',

  // ── Pilot ──
  'Start met een pilot van': 'Start with a pilot of',
  '6 weken.': '6 weeks.',
  "We bouwen je eerste scenario's samen met jou. Je nieuwe medewerkers oefenen, en jij ziet wie klaar is voor de lijn.":
    'We build your first scenarios together with you. Your new team members practise, and you see who is ready for real calls.',
  "Je eerste scenario's, samen gebouwd": 'Your first scenarios, built together',
  'Oefenen met Vlaamse AI-klanten, in het Nederlands, Frans en Engels':
    'Practise with Flemish AI customers, in Dutch, French and English',
  'Het dashboard voor de teamleider': 'The team leader dashboard',
  'Vooraf afgesproken doelen, zodat je na 6 weken weet of het werkt':
    'Goals agreed upfront, so after 6 weeks you know whether it works',
  'Na de pilot:': 'After the pilot:',
  'vanaf €750': 'from €750',
  'per maand per team, alles inbegrepen': 'per month per team, all-inclusive',
  'De pilot wordt volledig verrekend met je eerste jaar. Na 6 weken beslis jij of je doorgaat.':
    'The pilot is fully credited against your first year. After 6 weeks, you decide whether to continue.',
  'Plan een kennismaking': 'Book an intro call',

  // ── Documenttitel ──
  'Cello · Beter bellen begint met oefenen': 'Cello · Better calling starts with practice',

  // ── Blog (overzicht en rand van elk artikel; de artikels zelf zijn Nederlandstalig) ──
  'Cello, naar de homepage': 'Cello, to the homepage',
  'Blog · Cello: over de gesprekken waar teams tegen opzien': 'Blog · Cello: on the conversations teams dread',
  'De Cello-blog': 'The Cello blog',
  'Over de gesprekken waar teams tegen opzien, en hoe je ze oefent voor ze tellen.':
    'On the conversations teams dread, and how to practise them before they count.',
  Artikels: 'Articles',
  'Meer artikels': 'More articles',
  'min lezen': 'min read',
  'Lees ook': 'Read next',
};

const TRANSLATABLE_ATTRS = ['aria-label', 'alt', 'title', 'placeholder'];

function translateNode(node, dict) {
  const raw = node.nodeValue;
  const key = normalize(raw);
  if (!key) return;
  const en = dict[key];
  if (en === undefined) return;
  const lead = raw.match(/^\s*/)[0];
  const trail = raw.match(/\s*$/)[0];
  node.nodeValue = lead + en + trail;
}

/* Blogpagina's dragen een eigen woordenlijst mee (titels en samenvattingen
   van de artikels), die de build erin zet als <script id="i18n-en">. */
function pageDictionary() {
  const el = document.getElementById('i18n-en');
  if (!el) return {};
  try {
    return JSON.parse(el.textContent);
  } catch {
    return {};
  }
}

/* Een artikel met een Engelse versie heeft die als <template id="artikel-en">
   in de pagina: kop, intro en tekst wisselen we in één keer om. */
function swapArticle() {
  const tpl = document.getElementById('artikel-en');
  const post = document.querySelector('.post');
  if (!tpl || !post) return;
  ['h1', '.post-lead', '.post-body'].forEach((sel) => {
    const nl = post.querySelector(sel);
    const en = tpl.content.querySelector(sel);
    if (nl && en) nl.replaceWith(en.cloneNode(true));
  });
  if (tpl.dataset.titel) document.title = tpl.dataset.titel;
}

// datums die de build in het Nederlands schreef, in Engelse notatie
function formatDates() {
  const fmt = {
    lang: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    kort: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  document.querySelectorAll('time[datetime][data-fmt]').forEach((el) => {
    const date = new Date(el.getAttribute('datetime'));
    const f = fmt[el.dataset.fmt];
    if (f && !Number.isNaN(date.getTime())) el.textContent = f.format(date);
  });
}

function applyEnglish() {
  const dict = { ...EN, ...pageDictionary() };
  swapArticle();
  formatDates();

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
  nodes.forEach((node) => translateNode(node, dict));

  // 2. attributen (aria-label, alt, title, placeholder)
  TRANSLATABLE_ATTRS.forEach((attr) => {
    document.querySelectorAll('[' + attr + ']').forEach((el) => {
      const en = dict[normalize(el.getAttribute(attr))];
      if (en !== undefined) el.setAttribute(attr, en);
    });
  });

  // 3. documenttitel
  const t = dict[normalize(document.title)];
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
