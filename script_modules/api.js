// Esta funcion trae una frase en espanol desde una API publica.
export async function fetchRandomQuote() {
  const response = await fetch("https://www.positive-api.online/phrase/esp");

  if (!response.ok) {
    throw new Error("No se pudo cargar la frase.");
  }

  const data = await response.json();

  return {
    id: data.id || null,
    text: data.text || "Sin frase disponible.",
    author: data.author || "Autor desconocido",
  };
}
