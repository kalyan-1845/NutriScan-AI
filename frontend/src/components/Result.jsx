import React from 'react';
import { motion } from 'framer-motion';

const Result = ({ data, onReset }) => {
  // Enhanced calorie map for Indian cuisine
  const calorieMap = {
    "Samosa": 262,
    "Biryani": 350,
    "Butter Chicken": 450,
    "Roti": 120,
    "Rice": 130,
    "Paneer Tikka": 280,
    "Dosa": 168,
    "Idli": 58,
    "Gulab Jamun": 150
  };

  const getCal = (name) => calorieMap[name] || 250;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {data.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">
                🍲
              </div>
              <div className="text-left">
                <h4 className="text-3xl font-black gradient-heading tracking-tight">{item.name}</h4>
                <p className="text-white/40 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-black text-white">{getCal(item.name)}</div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest">Calories</div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="text-center opacity-40">
                <div className="text-2xl font-bold italic">Avg.</div>
                <div className="text-xs font-bold uppercase tracking-widest">Portion</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full py-5 rounded-3xl glass-card border border-white/5 hover:bg-white/5 text-lg font-bold transition-all"
      >
        ANALYSIS COMPLETE — TAP TO RESET
      </motion.button>
    </div>
  );
};

export default Result;
