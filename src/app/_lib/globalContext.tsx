import {createContext , useState, FC, ReactNode, useEffect} from 'react'
import {Settings, Theme, Language, SettingsContextType} from './definitions';

// Settings:
// Note that this is a temporary solution for storing settings information.
// The downside is that values managed with the context api are not persisted.

const defaultSettings: Settings = {
    theme: 'light',
    language: 'en',
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{children : ReactNode}> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    const toggleTheme = () => {
        setSettings(prevSettings => ({
        ...prevSettings,
        theme: prevSettings.theme === 'dark' ? 'light' : 'dark'
        }));
    };

    const setLanguage = (language: Language) => {
        setSettings(prevSettings => ({
          ...prevSettings,
          language
        }));
    };

    return (
      <SettingsContext.Provider value={{
        settings,
        toggleTheme,
        setLanguage,
      }}>
        {children}
      </SettingsContext.Provider>
    );
};