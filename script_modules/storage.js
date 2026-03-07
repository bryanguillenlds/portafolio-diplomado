const STORAGE_KEYS = {
  lastQuote: "portfolio_last_quote",
  theme: "portfolio_theme",
};

// Esta funcion lee la ultima frase guardada.
export function getLastQuote() {
  const rawQuote = localStorage.getItem(STORAGE_KEYS.lastQuote);

  if (!rawQuote) {
    return null;
  }

  try {
    return JSON.parse(rawQuote);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.lastQuote);
    return null;
  }
}

// Esta funcion guarda la frase actual para usarla luego.
export function saveLastQuote(quote) {
  localStorage.setItem(STORAGE_KEYS.lastQuote, JSON.stringify(quote));
}

// Esta funcion lee el tema guardado.
export function getTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme);
}

// Esta funcion guarda el tema elegido.
export function saveTheme(themeName) {
  localStorage.setItem(STORAGE_KEYS.theme, themeName);
}
