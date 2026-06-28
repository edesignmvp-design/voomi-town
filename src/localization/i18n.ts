import en from "./en.json";
import fr from "./fr.json";
import zh from "./zh.json";

const dictionaries = {
  zh,
  en,
  fr,
} as const;

export type Language = keyof typeof dictionaries;
export type TranslationKey = keyof typeof zh;

const languageNameKeys: Record<Language, TranslationKey> = {
  zh: "language.zh",
  en: "language.en",
  fr: "language.fr",
};

let currentLanguage: Language = "en";

export function detectDeviceLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const deviceLanguage = navigator.language.toLowerCase();

  if (deviceLanguage.startsWith("zh")) {
    return "zh";
  }

  if (deviceLanguage.startsWith("fr")) {
    return "fr";
  }

  if (deviceLanguage.startsWith("en")) {
    return "en";
  }

  return "en";
}

export function setLanguage(language: Language) {
  currentLanguage = language;
}

export function getLanguage() {
  return currentLanguage;
}

export function getLanguageName(language: Language) {
  return dictionaries[language][languageNameKeys[language]];
}

export function t(key: TranslationKey) {
  return dictionaries[currentLanguage][key] ?? dictionaries.en[key] ?? key;
}
