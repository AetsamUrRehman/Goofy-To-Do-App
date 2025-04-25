import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export function useBackground(defaultColors = ['rgba(255,200,220,1)','rgba(200,220,255,1)']) {
  const [bgGradientName, setBgGradientName] = useLocalStorage('bgGradientName', 'Default');
  const [bgGradient, setBgGradient]         = useLocalStorage('bgGradient', defaultColors);
  const [showGradientPicker, setShowGradientPicker] = useState(false);

  return {
    bgGradientName, setBgGradientName,
    bgGradient,     setBgGradient,
    showGradientPicker, setShowGradientPicker
  };
}