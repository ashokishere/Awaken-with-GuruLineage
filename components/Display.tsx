
import React, { useState, useEffect } from 'react';

interface DisplayProps {
  imageUrl: string;
  onImageError: () => void;
}

const Display: React.FC<DisplayProps> = ({ imageUrl, onImageError }) => {
  const [displayImages, setDisplayImages] = useState<{ current: string, previous: string }>({
    current: imageUrl,
    previous: ''
  });
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (imageUrl !== displayImages.current) {
      // Start transition
      setDisplayImages(prev => ({
        previous: prev.current,
        current: imageUrl
      }));
      setIsFading(true);

      const timer = setTimeout(() => {
        setIsFading(false);
      }, 1000); // Transition duration matches CSS

      return () => clearTimeout(timer);
    }
  }, [imageUrl, displayImages.current]);

  if (!imageUrl && !displayImages.previous) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-950">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="relative h-20 w-20 text-neutral-800 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-light text-neutral-400 tracking-wider text-center">Awaken with GuruLineage</h2>
        <p className="text-neutral-600 text-sm mt-3 font-mono">Press 'C' or hover top-right to add images</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Previous Image (Layer underneath, stays visible then disappears) */}
      {displayImages.previous && (
        <img
          src={displayImages.previous}
          alt="Previous Slide"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
      )}

      {/* Current Image (Fades in over the previous) */}
      <img
        key={displayImages.current}
        src={displayImages.current}
        alt="Current Slide"
        className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        style={{ opacity: isFading ? 0 : 1 }}
        onLoad={() => setIsFading(false)}
        onError={onImageError}
      />
      
      {/* Dynamic Background Ambiance */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-1000 ease-in-out opacity-30 blur-[100px] scale-110"
        style={{ 
          backgroundImage: `url(${displayImages.current})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>
    </div>
  );
};

export default Display;
