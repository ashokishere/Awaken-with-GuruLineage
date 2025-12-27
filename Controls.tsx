
import React, { useState } from 'react';

interface ControlsProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  intervalTime: number;
  setIntervalTime: (time: number) => void;
  onAddImage: (url: string) => void;
  onRemoveImage: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const INTERVAL_OPTIONS = [
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '10s', value: 10000 },
  { label: '30s', value: 30000 },
  { label: '1m', value: 60000 },
];

const Controls: React.FC<ControlsProps> = ({
  isOpen,
  onClose,
  images,
  isPlaying,
  setIsPlaying,
  intervalTime,
  setIntervalTime,
  onAddImage,
  onRemoveImage,
  nextSlide,
  prevSlide
}) => {
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim()) {
      onAddImage(newUrl.trim());
      setNewUrl('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-neutral-900/40 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-8 zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Section */}
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
              <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-1">Awaken</h2>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em]">GuruLineage Media Hub</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="group p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/5"
          >
            <svg className="w-6 h-6 text-white/40 group-hover:text-white group-hover:rotate-90 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Form & List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          
          {/* Quick Controls */}
          <section className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
              <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-4">Playback</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={prevSlide} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/50 hover:text-white active:scale-90 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button onClick={nextSlide} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/50 hover:text-white active:scale-90 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className={`px-6 py-3 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-lg ${isPlaying ? 'bg-red-500/10 text-red-500' : 'bg-green-500 text-white shadow-green-500/20'}`}
                >
                  {isPlaying ? 'STOP' : 'PLAY'}
                </button>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
              <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-4">Frequency</h3>
              <div className="flex flex-wrap gap-2">
                {INTERVAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setIntervalTime(opt.value)}
                    className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                      intervalTime === opt.value 
                      ? 'bg-amber-600 border-amber-400 text-white' 
                      : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Input Section */}
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-5 flex items-center gap-3">
              <span className="w-5 h-[1px] bg-white/10"></span>
              Add Sacred Media
            </h3>
            <form onSubmit={handleAdd} className="flex gap-3">
              <input
                type="url"
                placeholder="Paste image URL here..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-sm text-white focus:outline-none focus:ring-4 focus:ring-amber-600/20 transition-all placeholder:text-white/10 font-mono"
              />
              <button 
                type="submit"
                className="bg-white text-black px-10 rounded-3xl text-sm font-black hover:bg-amber-50 hover:text-amber-600 transition-all active:scale-95 shadow-xl disabled:opacity-50"
                disabled={!newUrl.trim()}
              >
                ADD
              </button>
            </form>
          </section>

          {/* Library Section */}
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-6 flex items-center gap-3">
              <span className="w-5 h-[1px] bg-white/10"></span>
              Media Library ({images.length})
            </h3>
            <div className="space-y-3">
              {images.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                  <p className="text-white/10 text-xs font-mono uppercase tracking-widest">No media present</p>
                </div>
              ) : (
                images.map((url, idx) => (
                  <div key={`${url}-${idx}`} className="group flex items-center gap-5 bg-white/[0.02] hover:bg-white/[0.05] p-4 rounded-[1.5rem] border border-white/[0.03] transition-all">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-800 shadow-2xl flex-shrink-0">
                      <img src={url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Preview" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/40 truncate font-mono tracking-tighter mb-1 select-all">{url}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-white/5 rounded-md text-[8px] uppercase font-black text-white/20">Item #{idx + 1}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveImage(idx)}
                      className="p-4 opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Shortcuts Bar */}
        <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center px-10">
           <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-white/10 uppercase font-black tracking-widest">Pause/Play</span>
                <span className="text-[10px] text-white/30 font-mono">SPACE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-white/10 uppercase font-black tracking-widest">Skip</span>
                <span className="text-[10px] text-white/30 font-mono">ARROWS</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-white/10 uppercase font-black tracking-widest">Fullscreen</span>
                <span className="text-[10px] text-white/30 font-mono">F</span>
              </div>
           </div>
           <div className="text-right">
              <p className="text-[9px] text-white/10 uppercase font-black tracking-[0.4em]">GuruLineage System</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
