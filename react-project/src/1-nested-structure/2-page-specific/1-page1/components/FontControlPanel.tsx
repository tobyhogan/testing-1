import FontSelector from "./FontSelector";
import FontSizeSlider from "./FontSizeSlider";
import ColorPicker from "./ColorPicker";
import FontWeightSelector from "./FontWeightSelector";
import TextInput from "./TextInput";

interface FontControlPanelProps {
  selectedFont: string;
  setSelectedFont: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
  fontWeight: number;
  setFontWeight: (value: number) => void;
  previewText: string;
  setPreviewText: (value: string) => void;
}

const FontControlPanel = ({
  selectedFont,
  setSelectedFont,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  fontWeight,
  setFontWeight,
  previewText,
  setPreviewText,
}: FontControlPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FontSelector value={selectedFont} onChange={setSelectedFont} />
        <FontSizeSlider value={fontSize} onChange={setFontSize} />
        <ColorPicker value={fontColor} onChange={setFontColor} />
        <FontWeightSelector value={fontWeight} onChange={setFontWeight} />
      </div>
      <div className="mt-6">
        <TextInput value={previewText} onChange={setPreviewText} />
      </div>
    </div>
  );
};

export default FontControlPanel;
