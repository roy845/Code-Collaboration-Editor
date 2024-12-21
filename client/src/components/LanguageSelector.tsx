import React, { useState, useEffect, useRef } from "react";
import { LANGUAGE_VERSIONS } from "../constants/codeSnippets";
import { Languages } from "../types/language.types";

interface LanguageSelectorProps {
  language: Languages;
  onSelect: (language: Languages) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS) as [Languages, string][];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="ml-4 mb-4" ref={menuRef}>
      <p className="mb-2 text-lg">Language:</p>
      <div className="relative">
        <button
          onClick={handleToggleMenu}
          className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none"
        >
          {language}
        </button>

        {isMenuOpen && (
          <div className="absolute bg-gray-900 text-white mt-2 rounded shadow-lg z-10 w-full">
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                className={`px-4 py-2 cursor-pointer ${
                  lang === language ? "bg-gray-700" : ""
                } hover:bg-gray-700`}
                onClick={() => {
                  onSelect(lang);
                  setIsMenuOpen(false);
                }}
              >
                {lang}
                <span className="text-gray-500 text-sm ml-2">({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
