import { FONT_WEIGHTS } from "../utils/constants";
import { getFontWeightLabel } from "../utils/utils";

interface FontWeightSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const FontWeightSelector = ({ value, onChange }: FontWeightSelectorProps) => {
  // Convert weight value to slider index
  const currentIndex = FONT_WEIGHTS.indexOf(value);
  const sliderIndex = currentIndex !== -1 ? currentIndex : 2; // Default to 400 (index 2)

  // Handle slider change
  const handleSliderChange = (index: number) => {
    onChange(FONT_WEIGHTS[index]);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
        Font Weight:{" "}
        <span className="text-blue-600 dark:text-blue-400">
          {getFontWeightLabel(value)} ({value})
        </span>
      </label>
      <div className="relative pt-1 pb-6">
        <input
          type="range"
          min="0"
          max={FONT_WEIGHTS.length - 1}
          step="1"
          value={sliderIndex}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        {/* Tick marks */}
        <div className="absolute top-[9px] left-0 right-0 flex justify-between px-[6px] pointer-events-none">
          {FONT_WEIGHTS.map((weight) => (
            <div
              key={weight}
              className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"
            />
          ))}
        </div>
        {/* Weight labels */}
        <div className="absolute top-[20px] left-0 right-0 flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
          {FONT_WEIGHTS.map((weight) => (
            <span key={weight} className="text-center" style={{ width: '28px' }}>
              {weight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontWeightSelector;

/*
// OLD DROPDOWN VERSION:
import { FONT_WEIGHTS } from "../utils/constants";
import { getFontWeightLabel } from "../utils/utils";

interface FontWeightSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const FontWeightSelector = ({ value, onChange }: FontWeightSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
        Font Weight:{" "}
        <span className="text-blue-600 dark:text-blue-400">{getFontWeightLabel(value)}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {FONT_WEIGHTS.map((weight) => (
          <option key={weight} value={weight}>
            {weight} - {getFontWeightLabel(weight)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontWeightSelector;
*/
