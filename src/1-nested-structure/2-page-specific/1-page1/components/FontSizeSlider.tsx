interface FontSizeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const FontSizeSlider = ({ value, onChange }: FontSizeSliderProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
        Font Size: <span className="text-blue-600 dark:text-blue-400">{value}px</span>
      </label>
      <input
        type="range"
        min="12"
        max="250"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>12px</span>
        <span>250px</span>
      </div>
    </div>
  );
};

export default FontSizeSlider;
