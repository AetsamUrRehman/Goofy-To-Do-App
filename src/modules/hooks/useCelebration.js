import { useState } from 'react';    
    
export function useCelebration({ enableNyan, enableGojo, enableAnthonySmile, enableDeleteEmoji }) {
    const [showCelebration, setShowCelebration]       = useState(false);
    const [currentCelebration, setCurrentCelebration] = useState(null);

    function triggerCelebration(type) {
        if (type === 'emoji' && enableDeleteEmoji) {
            setCurrentCelebration('emoji');
            setShowCelebration(true);
            return;
        }
        
        const options = [];
        if (enableNyan)  options.push('nyan');
        if (enableGojo)  options.push('gojo');
        if (enableAnthonySmile) options.push('anthonySmile');
        if (!options.length) return;
        const choice = options[Math.floor(Math.random() * options.length)];
        setCurrentCelebration(choice);
        setShowCelebration(true);
    }

    return { showCelebration, currentCelebration, triggerCelebration, setShowCelebration };
    
}