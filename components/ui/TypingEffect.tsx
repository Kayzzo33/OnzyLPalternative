import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 50, 
  onComplete,
  showCursor = true 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // If not yet finished typing
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } 
    // If finished typing and haven't triggered completion yet
    else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  // Reset if the input text changes completely (e.g. parent loop reset)
  useEffect(() => {
    if (text && displayedText !== '' && currentIndex === text.length && displayedText !== text) {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [text]);

  return (
    <span className="font-medium text-gray-800">
      {displayedText}
      {showCursor && !isComplete && (
        <span className="animate-pulse ml-0.5 text-onzy-orange font-bold">|</span>
      )}
      {showCursor && isComplete && (
        <span className="opacity-0 ml-0.5">|</span> // Hide cursor when done but keep space
      )}
    </span>
  );
};