const THEMES = {
  warm: "warm",
  dark: "dark",
};

// Esta funcion muestra la frase y su autor en pantalla.
export function renderQuote(quote) {
  const quoteTextElement = document.querySelector("#quote-text");
  const quoteAuthorElement = document.querySelector("#quote-author");
  const quoteStatusElement = document.querySelector("#quote-status");

  if (!quoteTextElement || !quoteAuthorElement || !quoteStatusElement) {
    return;
  }

  quoteTextElement.textContent = '"' + quote.text + '"';
  quoteAuthorElement.textContent = "- " + quote.author;
  quoteStatusElement.textContent = "";
}

// Esta funcion muestra un mensaje de carga mientras llega una frase nueva.
export function renderLoading() {
  const quoteTextElement = document.querySelector("#quote-text");
  const quoteAuthorElement = document.querySelector("#quote-author");
  const quoteStatusElement = document.querySelector("#quote-status");

  if (!quoteTextElement || !quoteAuthorElement || !quoteStatusElement) {
    return;
  }

  quoteTextElement.textContent = "Cargando frase...";
  quoteAuthorElement.textContent = "";
  quoteStatusElement.textContent = "Buscando una frase nueva.";
}

// Esta funcion muestra un mensaje simple si algo falla.
export function renderError() {
  const quoteTextElement = document.querySelector("#quote-text");
  const quoteAuthorElement = document.querySelector("#quote-author");
  const quoteStatusElement = document.querySelector("#quote-status");

  if (!quoteTextElement || !quoteAuthorElement || !quoteStatusElement) {
    return;
  }

  quoteTextElement.textContent = "No se pudo cargar la frase en este momento.";
  quoteAuthorElement.textContent = "";
  quoteStatusElement.textContent = "Intenta de nuevo en unos segundos.";
}

// Esta funcion pone la clase del tema que corresponde.
export function applyTheme(themeName) {
  const body = document.body;

  body.classList.remove("theme-warm", "theme-dark");

  if (themeName === THEMES.dark) {
    body.classList.add("theme-dark");
  } else {
    body.classList.add("theme-warm");
  }
}

// Esta funcion cambia el texto del boton de tema.
export function updateThemeButtonLabel(themeName) {
  const themeButtonText = document.querySelector("#theme-toggle-text");

  if (!themeButtonText) {
    return;
  }

  if (themeName === THEMES.dark) {
    themeButtonText.textContent = "Modo claro";
  } else {
    themeButtonText.textContent = "Modo oscuro";
  }
}
