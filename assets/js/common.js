/*
 * Comportamiento compartido por todas las páginas: idioma, tema e impresión.
 *
 * Idioma
 *   - El HTML contiene la versión en español; el inglés vive en un diccionario.
 *   - Cada página carga ANTES de este archivo su diccionario: window.I18N_EN = { ... }
 *     (ej. /assets/i18n/cv.js). Aquí se le suman las claves comunes (COMMON_EN).
 *   - Para traducir un texto: data-i18n="clave" en el elemento.
 *   - Para traducir atributos: data-i18n-attr="aria-label:clave; alt:otra.clave".
 *   - "meta.title" y "meta.description" traducen <title> y la meta description.
 *   - El idioma elegido se guarda en localStorage y se aplica en todas las páginas.
 *
 * Tema
 *   - El script inline del <head> aplica el tema guardado antes de pintar.
 *   - Aquí solo se conecta el botón #theme-toggle.
 *
 * Impresión
 *   - Solo si la página tiene #print-btn (el CV).
 */

(function () {
  "use strict";

  /* Claves comunes a todas las páginas (toolbar, nav, pie). */
  const COMMON_EN = {
    "nav.options": "Options",
    "nav.main": "Main navigation",
    "nav.backPortfolio": "← Portfolio",
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.cv": "Résumé",

    "status.prod": "In production · Government of Nayarit",
    "status.demo": "Live demo",
    "status.dev": "In development",

    "footer.linkedinTodo": "LinkedIn — TODO: URL",
  };

  const EN = Object.assign({}, COMMON_EN, window.I18N_EN || {});

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* sin almacenamiento */ }
    },
  };

  /* ---------- Idioma ---------- */

  const textNodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const attrNodes = Array.from(document.querySelectorAll("[data-i18n-attr]"));
  const metaDescription = document.querySelector('meta[name="description"]');

  // "aria-label:clave; alt:otra" -> [["aria-label", "clave"], ["alt", "otra"]]
  function parseAttrSpec(el) {
    return el.dataset.i18nAttr.split(";")
      .map((part) => part.split(":").map((s) => s.trim()))
      .filter((pair) => pair.length === 2 && pair[0] && pair[1]);
  }

  // Guarda el texto original (español) de cada nodo para poder volver a él.
  const original = { "meta.title": document.title };
  if (metaDescription) original["meta.description"] = metaDescription.content;
  textNodes.forEach((el) => { original[el.dataset.i18n] = el.textContent.trim(); });
  attrNodes.forEach((el) => {
    parseAttrSpec(el).forEach(([attr, key]) => { original[key] = el.getAttribute(attr) || ""; });
  });

  function applyLang(lang) {
    const dict = lang === "en" ? EN : original;

    textNodes.forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value) el.textContent = value;
    });

    attrNodes.forEach((el) => {
      parseAttrSpec(el).forEach(([attr, key]) => {
        const value = dict[key];
        if (value) el.setAttribute(attr, value);
      });
    });

    document.documentElement.lang = lang;
    if (dict["meta.title"]) document.title = dict["meta.title"];
    if (metaDescription && dict["meta.description"]) metaDescription.content = dict["meta.description"];

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = lang === "en" ? "ES" : "EN";
      langBtn.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Switch to English");
    }
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.setAttribute("aria-label", lang === "en" ? "Toggle theme" : "Cambiar tema");

    storage.set("lang", lang);
  }

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLang(document.documentElement.lang === "en" ? "es" : "en");
    });
  }

  if (storage.get("lang") === "en") applyLang("en");

  /* ---------- Tema ---------- */

  function currentTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      storage.set("theme", next);
    });
  }

  /* ---------- Impresión / PDF (solo en el CV) ---------- */

  const printBtn = document.getElementById("print-btn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  /* ---------- Año en el pie ---------- */

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
