
export const PREVIEW_TEXT =
  "When ..., Playing Dead!";

/*
"Almost before we knew it, we had left the ground. The quick brown fox jumps over the lazy dog.";
*/

// Font configuration - single source of truth
export const FONT_CONFIG = [
  { name: "Sans-serif", fallback: "sans-serif", isWebFont: false },
  { name: "Monospace", fallback: "monospace", isWebFont: false },
  { name: "Montserrat", fallback: "sans-serif", isWebFont: true },
  { name: "Nunito", fallback: "sans-serif", isWebFont: true },
  { name: "Roboto", fallback: "sans-serif", isWebFont: true },
  { name: "Georgia", fallback: "serif", isWebFont: false },
  { name: "Libre Franklin", fallback: "sans-serif", isWebFont: true },
  { name: "Courier New", fallback: "monospace", isWebFont: false },
  { name: "Dosis", fallback: "sans-serif", isWebFont: true },
];

export const FONT_WEIGHTS = [100, 300, 400, 500, 600, 700, 900];

// Derived from FONT_CONFIG
export const AVAILABLE_FONTS = FONT_CONFIG.map(
  (font) => `${font.name}, ${font.fallback}`
);

// Generate Google Fonts URL
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

// Dynamically load Google Fonts - call this once when the app loads
export const loadGoogleFonts = (): void => {
  // Check if already loaded to avoid duplicates
  const existingLink = document.querySelector('link[data-font-loader="google-fonts"]');
  if (existingLink) return;

  const url = generateGoogleFontsUrl();
  
  // Create preconnect links for better performance
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  
  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  
  // Create the font stylesheet link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.setAttribute('data-font-loader', 'google-fonts');
  
  // Inject into head
  document.head.appendChild(preconnect1);
  document.head.appendChild(preconnect2);
  document.head.appendChild(link);
  
  console.log('✅ Google Fonts loaded from FONT_CONFIG');
};
