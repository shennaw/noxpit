import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LangCtx = createContext({ lang: 'id', setLang: () => {}, t: (key) => key });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('noxpit-lang') || 'id'
  );

  useEffect(() => {
    localStorage.setItem('noxpit-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations['id']?.[key] ?? key,
    [lang]
  );

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangCtx);
