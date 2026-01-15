import { useState, useEffect } from "react";
import FontControlPanel from "./components/FontControlPanel";
import FontPreview from "./components/FontPreview";
import { PREVIEW_TEXT } from "./utils/constants";

const STORAGE_KEYS = {
  FONT: "fontPreview_selectedFont",
  SIZE: "fontPreview_fontSize",
  COLOR: "fontPreview_fontColor",
  WEIGHT: "fontPreview_fontWeight",
  TEXT: "fontPreview_previewText",
};

const Page1 = () => {
  const [selectedFont, setSelectedFont] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.FONT) || "Montserrat, sans-serif"
  );
  const [fontSize, setFontSize] = useState(() => 
    Number(localStorage.getItem(STORAGE_KEYS.SIZE)) || 24
  );
  const [fontColor, setFontColor] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.COLOR) || "#000000"
  );
  const [fontWeight, setFontWeight] = useState(() => 
    Number(localStorage.getItem(STORAGE_KEYS.WEIGHT)) || 400
  );
  const [previewText, setPreviewText] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.TEXT) || PREVIEW_TEXT
  );

  // Persist to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FONT, selectedFont);
  }, [selectedFont]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIZE, fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLOR, fontColor);
  }, [fontColor]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WEIGHT, fontWeight.toString());
  }, [fontWeight]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEXT, previewText);
  }, [previewText]);

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
        previewText={previewText}
        setPreviewText={setPreviewText}
      />

      <FontPreview
        font={selectedFont}
        size={fontSize}
        color={fontColor}
        weight={fontWeight}
        text={previewText}
      />
    </div>
  );
};

export default Page1;
