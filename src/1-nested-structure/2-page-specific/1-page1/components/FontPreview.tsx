interface FontPreviewProps {
  font: string;
  size: number;
  color: string;
  weight: number;
  text: string;
}

const FontPreview = ({ font, size, color, weight, text }: FontPreviewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-[1px] border-neutral-300 p-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white"></h2>
      <div className="bg-white rounded-lg pt-[70px] pb-[100px] flex items-center justify-center">
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
