"use client";

import { useState, useContext } from 'react';

import { SettingsContext } from '@/app/lib/globalContext'
import { Language, SettingsContextType } from '@/app/lib/definitions';


const SettingsMenu = () => {
  const { settings, toggleTheme, setLanguage } = useContext(SettingsContext) as SettingsContextType;

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow bg-white">
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.theme === 'dark'}
            onChange={toggleTheme}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-800">Dark Mode</span>
        </label>
      </div>
      <div>
        <label htmlFor="language-select" className="block text-sm text-gray-800 mb-2">Language</label>
        <select
          id="language-select"
          value={settings.language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="form-select block w-full mt-1"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
  </div>

  );
};

export default SettingsMenu;
