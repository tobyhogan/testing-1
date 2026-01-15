import { useState } from "react";

// Constants
const PREVIEW_TEXT = "Almost before we knew it, we had left the ground. The quick brown fox jumps over the lazy dog.";

const AVAILABLE_FONTS = ["Montserrat", "Nunito", "Roboto", "Georgia", "Libre Franklin", "Courier New"];

const FONT_WEIGHTS = [100, 300, 400, 500, 600, 700, 900];

const Page1 = () => {
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState(400);

  const getFontWeightLabel = (weight: number) => {
    const labels: { [key: number]: string } = {
      100: "Thin",
      300: "Light",
      400: "Regular",
      500: "Medium",
      600: "Semi-Bold",
      700: "Bold",
      900: "Black"
    };
    return labels[weight] || weight.toString();
  };

  return (
    <div className="p-6 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Font Preview Tool</h1>
      
      {/* Controls Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Font Selector */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Font Family
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AVAILABLE_FONTS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Slider */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Font Size: <span className="text-blue-600 dark:text-blue-400">{fontSize}px</span>
            </label>
            <input
              type="range"
              min="12"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>12px</span>
              <span>72px</span>
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Font Color: <span className="text-blue-600 dark:text-blue-400">{fontColor}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Font Weight Selector */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Font Weight: <span className="text-blue-600 dark:text-blue-400">{getFontWeightLabel(fontWeight)}</span>
            </label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FONT_WEIGHTS.map((weight) => (
                <option key={weight} value={weight}>
                  {weight} - {getFontWeightLabel(weight)}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Preview</h2>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
          <p
            style={{
              fontFamily: selectedFont,
              fontSize: `${fontSize}px`,
              color: fontColor,
              fontWeight: fontWeight,
              lineHeight: 1.5,
            }}
          >
            {PREVIEW_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;
