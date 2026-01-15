interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
        Font Color: <span className="text-blue-600 dark:text-blue-400">{value}</span>
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
