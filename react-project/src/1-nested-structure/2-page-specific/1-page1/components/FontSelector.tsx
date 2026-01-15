import { AVAILABLE_FONTS } from "../utils/constants";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FontSelector = ({ value, onChange }: FontSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">Font Family</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {AVAILABLE_FONTS.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
