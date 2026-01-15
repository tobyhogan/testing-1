import { useState } from "react";
import FontControlPanel from "./components/FontControlPanel";
import FontPreview from "./components/FontPreview";
import { PREVIEW_TEXT } from "./utils/constants";

const Page1 = () => {
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState(400);

  return (
    <div className="p-6 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Font Preview Tool</h1>

      <FontControlPanel
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontColor={fontColor}
        setFontColor={setFontColor}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
      />

      <FontPreview
        font={selectedFont}
        size={fontSize}
        color={fontColor}
        weight={fontWeight}
        text={PREVIEW_TEXT}
      />
    </div>
  );
};

export default Page1;
