import FontSelector from "./FontSelector";
import FontSizeSlider from "./FontSizeSlider";
import ColorPicker from "./ColorPicker";
import FontWeightSelector from "./FontWeightSelector";

interface FontControlPanelProps {
  selectedFont: string;
  setSelectedFont: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
  fontWeight: number;
  setFontWeight: (value: number) => void;
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
}: FontControlPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FontSelector value={selectedFont} onChange={setSelectedFont} />
        <FontSizeSlider value={fontSize} onChange={setFontSize} />
        <ColorPicker value={fontColor} onChange={setFontColor} />
        <FontWeightSelector value={fontWeight} onChange={setFontWeight} />
      </div>
    </div>
  );
};

export default FontControlPanel;
