'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AIMinigameOverlay from '../components/AIMinigameOverlay';

interface LabContextValue {
  isLabOpen: boolean;
  openLab: () => void;
  closeLab: () => void;
  toggleLab: () => void;
}

const LabContext = createContext<LabContextValue | undefined>(undefined);

const SECRET_SEQUENCE = ['a', 'i', 'l', 'a', 'b'];

export const LabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLabOpen, setIsLabOpen] = useState(false);
  const bufferRef = useRef<string[]>([]);

  const openLab = useCallback(() => setIsLabOpen(true), []);
  const closeLab = useCallback(() => setIsLabOpen(false), []);
  const toggleLab = useCallback(() => setIsLabOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'escape') {
        closeLab();
        bufferRef.current = [];
        return;
      }

      bufferRef.current.push(key);
      if (bufferRef.current.length > SECRET_SEQUENCE.length) {
        bufferRef.current.shift();
      }

      if (SECRET_SEQUENCE.every((value, index) => bufferRef.current[index] === value)) {
        openLab();
        bufferRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openLab, closeLab]);

  const value = useMemo(
    () => ({
      isLabOpen,
      openLab,
      closeLab,
      toggleLab,
    }),
    [isLabOpen, openLab, closeLab, toggleLab]
  );

  return (
    <LabContext.Provider value={value}>
      {children}
      {isLabOpen && <AIMinigameOverlay onClose={closeLab} />}
    </LabContext.Provider>
  );
};

export const useLab = () => {
  const ctx = useContext(LabContext);
  if (!ctx) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return ctx;
};
