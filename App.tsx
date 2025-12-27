
import React, { useState, useEffect, useCallback } from 'react';
import { SlideshowSettings, DEFAULT_IMAGES, STORAGE_KEY } from './types';
import Controls from './components/Controls';
import Display from './components/Display';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(5000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const config: SlideshowSettings = JSON.parse(saved);
        setImages(config.images.length > 0 ? config.images : DEFAULT_IMAGES);
        setIntervalTime(config.interval);
        setIsPlaying(config.isPlaying);
      } catch (e) {
        setImages(DEFAULT_IMAGES);
      }
    } else {
      setImages(DEFAULT_IMAGES);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    const config: SlideshowSettings = {
      images,
      interval: intervalTime,
      isPlaying
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [images, intervalTime, isPlaying, isLoaded]);

  const nextSlide = useCallback(() => {
    setImages(prev => {
      if (prev.length === 0) return prev;
      setCurrentIndex(curr => (curr + 1) % prev.length);
      return prev;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setImages(prev => {
      if (prev.length === 0) return prev;
      setCurrentIndex(curr => (curr - 1 + prev.length) % prev.length);
      return prev;
    });
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: number | undefined;
    if (isPlaying && images.length > 0) {
      timer = window.setInterval(nextSlide, intervalTime);
    }
    return () => clearInterval(timer);
  }, [isPlaying, intervalTime, nextSlide, images.length]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'arrowright':
          nextSlide();
          break;
        case 'arrowleft':
          prevSlide();
          break;
        case 'f':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          break;
        case 'c':
          setIsControlsOpen(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleAddImage = (url: string) => {
    if (!url.trim()) return;
    setImages(prev => [...prev, url]);
    // Immediately hide the menu after submission
    setIsControlsOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const newList = prev.filter((_, i) => i !== index);
      if (currentIndex >= newList.length && newList.length > 0) {
        setCurrentIndex(newList.length - 1);
      }
      return newList;
    });
  };

  return (
    <div className="relative w-screen h-screen bg-black select-none overflow-hidden group">
      {/* Image Display Layer */}
      <Display 
        imageUrl={images[currentIndex] || ''} 
        onImageError={() => setTimeout(nextSlide, 1500)}
      />

      {/* Persistent but "Invisible" Toggle Trigger Zone (Top Right) */}
      <div className="absolute top-0 right-0 w-32 h-32 z-50 group">
        <button 
          onClick={() => setIsControlsOpen(true)}
          className={`absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-700 opacity-0 group-hover:opacity-100 ${isControlsOpen ? 'pointer-events-none scale-0' : 'scale-100'}`}
          title="Open Settings (C)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Controls Overlay */}
      <Controls 
        isOpen={isControlsOpen}
        onClose={() => setIsControlsOpen(false)}
        images={images}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />

      {/* Auto-Hide Play Status Overlay (bottom-right) */}
      {!isControlsOpen && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
           <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
           <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
            {isPlaying ? 'Auto Play' : 'Paused'}
           </span>
        </div>
      )}
    </div>
  );
};

export default App;
