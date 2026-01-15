interface FontPreviewProps {
  font: string;
  size: number;
  color: string;
  weight: number;
  text: string;
}

const FontPreview = ({ font, size, color, weight, text }: FontPreviewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Preview</h2>
      <div className="bg-white rounded-lg p-8 min-h-[400px] flex items-center justify-center">
        <p
          style={{
            fontFamily: font,
            fontSize: `${size}px`,
            color: color,
            fontWeight: weight,
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default FontPreview;
