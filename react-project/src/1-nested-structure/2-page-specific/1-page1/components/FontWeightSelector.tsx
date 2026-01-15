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
