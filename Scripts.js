/*
 * Idioma, tema e impresión.
 * El HTML contiene la versión en español; aquí solo vive la traducción al inglés.
 * Para añadir un texto traducible: ponle data-i18n="clave" en el HTML y agrega la clave en `en`.
 */

const translations = {
  en: {
    "meta.title": "Leonel Navarro Valades — Computer Systems Engineer",
    "meta.description": "Résumé of Leonel Navarro Valades, Computer Systems Engineer. Frontend web development (Vue, Nuxt, React) and Unity development.",

    download: "Download PDF",
    role: "Computer Systems Engineer",

    "h.profile": "Professional summary",
    "h.experience": "Experience",
    "h.education": "Education",
    "h.projects": "Projects",
    "h.skills": "Technical skills",
    "h.soft": "Strengths",

    summary: "Computer Systems Engineer with experience in web development with Nuxt, Vue and Node.js, and in designing system architectures on AWS, including managing development and production environments. I also have specialized training in video game and virtual reality development with Unity. I focus on building clear, maintainable and well-structured interfaces, and I adapt easily to both team and individual work. I'm looking to contribute to a team building innovative digital products.",

    "exp2.title": "Frontend Developer",
    "exp2.dates": "Jan 2025 – Feb 2026",
    "exp2.b1": "Built web interfaces with Nuxt, Vue, JavaScript and Tailwind CSS.",
    "exp2.b2": "Managed and maintained databases for the team's applications.",

    "exp1.title": "Full-Stack Developer – Advanced Electronic Signature",
    "exp1.dates": "Mar 2026 – Present",
    "exp1.b1": "Designed, developed, maintained, documented and administered the Advanced Electronic Signature platform for the State of Nayarit, along with its related applications and services.",
    "exp1.b2": "Designed the systems' architecture on AWS across all components: infrastructure, databases, storage and deployment.",
    "exp1.b3": "Managed development and production environments and version control, on a stack built on Nuxt, Vue and Node.js, among other technologies.",
    "exp1.b4": "Trained staff and end users.",

    "edu1.title": "B.S. in Computer Systems Engineering",
    "edu1.org": "Instituto Tecnológico de Tepic",
    "edu2.title": "Diploma in Video Game and Virtual Reality Development with Unity",
    "edu2.org": "Universidad Anáhuac Mayab",

    "proj1.title": "Unity Play portfolio",
    "proj1.desc": "A collection of games and interactive experiences built with Unity and C#, playable in the browser.",

    "sk.backend": "Backend & data",
    "sk.cloud": "Cloud (AWS)",
    "sk.mobile": "Mobile",
    "sk.games": "Games & VR",
    "sk.tools": "Tools",

    "soft.1": "Teamwork and communication",
    "soft.2": "Problem solving",
    "soft.3": "Adaptability and continuous learning",
    "soft.4": "Organization and working under pressure",
  },
};

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* sin almacenamiento */ }
  },
};

/* ---------- Idioma ---------- */

const nodes = Array.from(document.querySelectorAll("[data-i18n]"));
const metaDescription = document.querySelector('meta[name="description"]');

// Guarda el texto original (español) de cada nodo para poder volver a él.
const original = {
  "meta.title": document.title,
  "meta.description": metaDescription.content,
};
nodes.forEach((el) => { original[el.dataset.i18n] = el.textContent.trim(); });

function applyLang(lang) {
  const dict = lang === "en" ? translations.en : original;

  nodes.forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value) el.textContent = value;
  });

  document.documentElement.lang = lang;
  document.title = dict["meta.title"];
  metaDescription.content = dict["meta.description"];

  const btn = document.getElementById("lang-toggle");
  btn.textContent = lang === "en" ? "ES" : "EN";
  btn.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Switch to English");
  document.getElementById("theme-toggle")
    .setAttribute("aria-label", lang === "en" ? "Toggle theme" : "Cambiar tema");

  storage.set("lang", lang);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLang(document.documentElement.lang === "en" ? "es" : "en");
});

const savedLang = storage.get("lang");
if (savedLang === "en") applyLang("en");

/* ---------- Tema ---------- */

function currentTheme() {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit) return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  storage.set("theme", next);
});

/* ---------- Impresión / PDF ---------- */

document.getElementById("print-btn").addEventListener("click", () => window.print());

document.getElementById("year").textContent = new Date().getFullYear();
