import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-8 glass-card rounded-3xl">
      <div className="relative">
        {/* outer ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-amber-500/10 border-t-amber-500"
        />
        {/* inner ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-2 rounded-full border-4 border-secondary/10 border-t-secondary"
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold gradient-heading animate-pulse">Deep Learning Analysis</h3>
        <p className="text-white/40 font-medium">Extracting features and estimating calories...</p>
      </div>
    </div>
  );
};

export default Loader;
