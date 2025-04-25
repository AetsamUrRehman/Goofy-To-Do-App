import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';


export function useSettings() {
    const [enableBlyaaat, setEnableBlyaaat]     = useLocalStorage('enableBlyaaat', true);
    const [enableGetOut,  setEnableGetOut]      = useLocalStorage('enableGetOut',  true);
    const [soundVolume,   setSoundVolume]       = useLocalStorage('soundVolume',   1);
    const [enableDeleteEmoji, setEnableDeleteEmoji] = useLocalStorage('enableDeleteEmoji', true);
    const [enableNyan,    setEnableNyan]        = useLocalStorage('enableNyan',    true);
    const [enableGojo,    setEnableGojo]        = useLocalStorage('enableGojo',    true);
    const [enableAnthonySmile, setEnableAnthonySmile] = useLocalStorage('enableAnthonySmile', true);
    
    return {
        enableBlyaaat, setEnableBlyaaat,
        enableGetOut,  setEnableGetOut,
        soundVolume,   setSoundVolume,
        enableDeleteEmoji, setEnableDeleteEmoji,
        enableNyan, setEnableNyan,
        enableGojo, setEnableGojo,
        enableAnthonySmile, setEnableAnthonySmile,
    };
}