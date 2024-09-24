import { useState, useEffect } from 'react';

function getSavedValue(key, initialValue) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue !== null) return savedValue;
    if (typeof initialValue === 'function') return initialValue();
    return initialValue;
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
