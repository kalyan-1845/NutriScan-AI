import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFiles = useCallback((files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onUpload(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  }, [onUpload]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-[2rem] p-1 overflow-hidden transition-all duration-500 ${dragActive ? 'ring-4 ring-amber-500/50 scale-[1.02]' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="bg-white/5 rounded-[1.9rem] p-12 flex flex-col items-center justify-center text-center space-y-8 border border-white/5">
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div 
              key="prompt"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Identify Your Meal</h3>
                <p className="text-white/40 text-lg">Drop your photo here or use the button below</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10"
            >
              <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent flex items-end justify-center pb-4">
                <span className="text-sm font-bold text-amber-500">Image Captured</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          onChange={(e) => handleFiles(e.target.files)}
          accept="image/*"
        />
        <label 
          htmlFor="file-upload" 
          className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-bg-dark font-black rounded-2xl cursor-pointer transition-all active:scale-95 shadow-lg shadow-amber-500/20"
        >
          SELECT FROM GALLERY
        </label>
      </div>
    </motion.div>
  );
};

export default Upload;
