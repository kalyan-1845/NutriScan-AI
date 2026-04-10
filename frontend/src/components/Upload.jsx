import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, X, FileImage, Sparkles } from 'lucide-react';

export function Upload({ onUpload, isUploading }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative group h-64 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
              dragActive 
                ? "border-accent bg-accent/5" 
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadIcon className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg font-outfit font-bold text-white mb-2">
                Drop your meal image here
              </p>
              <p className="text-sm text-white/40 font-medium">
                or click to browse from device
              </p>
            </div>
            
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4"
          >
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover rounded-2xl grayscale-[20%] group-hover:grayscale-0 transition-all"
            />
            
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); clearPreview(); }}
                className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isUploading && (
              <div className="absolute inset-4 rounded-2xl bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="w-8 h-8 text-accent animate-spin" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">Processing</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
