import { useState, useEffect } from "react";
import FontControlPanel from "./components/FontControlPanel";
import FontPreview from "./components/FontPreview";
import { PREVIEW_TEXT, loadGoogleFonts } from "./utils/constants";

const STORAGE_KEYS = {
  FONT: "fontPreview_selectedFont",
  SIZE: "fontPreview_fontSize",
  COLOR: "fontPreview_fontColor",
  WEIGHT: "fontPreview_fontWeight",
  TEXT: "fontPreview_previewText",
  SHOW_CONTROLS: "fontPreview_showControls",
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
  const [showControls, setShowControls] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.SHOW_CONTROLS) !== "false"
  );

  // Load Google Fonts dynamically from FONT_CONFIG
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = "Font Preview Tool";
  }, []);

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_CONTROLS, showControls.toString());
  }, [showControls]);

  return (

    <div className="p-6 min-h-screen dark:bg-gray-900">

      <div className="mt-[30px]"></div>

      <div className="mb-6">


        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={showControls}
            onChange={(e) => setShowControls(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm font-medium dark:text-gray-200"></span>
        </label>
      </div>

      <div className="mt-[70px]"></div>

      <FontPreview
        font={selectedFont}
        size={fontSize}
        color={fontColor}
        weight={fontWeight}
        text={previewText}
      />

      <div className="mt-10"></div>
        
      {showControls && (
        <>

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
        </>
        
      )}


    </div>
  );
};

export default Page1;
