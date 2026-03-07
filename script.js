import { fetchRandomQuote } from "./script_modules/api.js";
import {
  getLastQuote,
  saveLastQuote,
  getTheme,
  saveTheme,
} from "./script_modules/storage.js";
import {
  renderQuote,
  renderLoading,
  renderError,
  applyTheme,
  updateThemeButtonLabel,
} from "./script_modules/ui.js";

const WARM_THEME = "warm";
const DARK_THEME = "dark";
const MAX_RETRIES = 3;

// Esta funcion revisa si dos frases son la misma.
function areSameQuote(currentQuote, previousQuote) {
  if (!currentQuote || !previousQuote) {
    return false;
  }

  if (currentQuote.id && previousQuote.id) {
    return currentQuote.id === previousQuote.id;
  }

  return currentQuote.text === previousQuote.text;
}

// Esta funcion carga una frase y evita repetir la anterior.
async function loadQuote() {
  renderLoading();
  const lastQuote = getLastQuote();
  let selectedQuote = null;

  // Este loop intenta traer otra frase si sale la misma.
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const nextQuote = await fetchRandomQuote();

    if (!areSameQuote(nextQuote, lastQuote)) {
      selectedQuote = nextQuote;
      break;
    }

    selectedQuote = nextQuote;
  }

  if (!selectedQuote) {
    throw new Error("No se encontro una frase.");
  }

  renderQuote(selectedQuote);
  saveLastQuote(selectedQuote);
}

// Esta funcion aplica el tema inicial guardado.
function initializeTheme() {
  const savedTheme = getTheme();
  let currentTheme = WARM_THEME;

  if (savedTheme === DARK_THEME) {
    currentTheme = DARK_THEME;
  }

  applyTheme(currentTheme);
  updateThemeButtonLabel(currentTheme);

  return currentTheme;
}

// Esta funcion conecta el boton para cambiar el tema.
function setupThemeToggle(initialTheme) {
  const themeButton = document.querySelector("#theme-toggle-btn");
  let currentTheme = initialTheme;

  if (!themeButton) {
    return;
  }

  themeButton.addEventListener("click", () => {
    if (currentTheme === DARK_THEME) {
      currentTheme = WARM_THEME;
    } else {
      currentTheme = DARK_THEME;
    }

    applyTheme(currentTheme);
    updateThemeButtonLabel(currentTheme);
    saveTheme(currentTheme);
  });
}

// Esta funcion conecta el boton para cargar una frase nueva.
function setupQuoteButton() {
  const newQuoteButton = document.querySelector("#new-quote-btn");

  if (!newQuoteButton) {
    return;
  }

  newQuoteButton.addEventListener("click", async () => {
    try {
      await loadQuote();
    } catch (error) {
      renderError();
    }
  });
}

// Esta funcion inicia toda la pagina.
async function initializePage() {
  const currentTheme = initializeTheme();
  setupThemeToggle(currentTheme);
  setupQuoteButton();

  try {
    await loadQuote();
  } catch (error) {
    renderError();
  }
}

initializePage();