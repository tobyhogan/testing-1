interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({ value, onChange }: TextInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
        Preview Text
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
        placeholder="Enter text to preview..."
      />
    </div>
  );
};

export default TextInput;
