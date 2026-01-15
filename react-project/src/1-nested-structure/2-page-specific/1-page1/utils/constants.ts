
export const PREVIEW_TEXT =
  "When ..., Playing Dead!";

/*
"Almost before we knew it, we had left the ground. The quick brown fox jumps over the lazy dog.";
*/

// Font configuration - single source of truth
export const FONT_CONFIG = [
  { name: "Montserrat", fallback: "sans-serif", isWebFont: true },
  { name: "Nunito", fallback: "sans-serif", isWebFont: true },
  { name: "Roboto", fallback: "sans-serif", isWebFont: true },
  { name: "Georgia", fallback: "serif", isWebFont: false },
  { name: "Libre Franklin", fallback: "sans-serif", isWebFont: true },
  { name: "Courier New", fallback: "monospace", isWebFont: false },
];

export const FONT_WEIGHTS = [100, 300, 400, 500, 600, 700, 900];

// Derived from FONT_CONFIG
export const AVAILABLE_FONTS = FONT_CONFIG.map(
  (font) => `${font.name}, ${font.fallback}`
);

// Generate Google Fonts URL for index.html
export const generateGoogleFontsUrl = (): string => {
  const webFonts = FONT_CONFIG.filter((font) => font.isWebFont);
  
  const fontParams = webFonts
    .map((font) => {
      const fontName = font.name.replace(/ /g, "+");
      const weights = FONT_WEIGHTS.join(";");
      return `family=${fontName}:wght@${weights}`;
    })
    .join("&");

  return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
};

// Log the URL for easy copy-paste into index.html
console.log("📋 Google Fonts URL for index.html:");
console.log(generateGoogleFontsUrl());
