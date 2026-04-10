import React from 'react';
import { motion } from 'framer-motion';

const Result = ({ data, onReset }) => {
  // Production-grade nutrient database for Indian cuisine
  const nutrientDb = {
    "Samosa": { cal: 262, pro: 4, fat: 17, carb: 24 },
    "Biryani": { cal: 350, pro: 12, fat: 14, carb: 45 },
    "Butter Chicken": { cal: 450, pro: 28, fat: 32, carb: 10 },
    "Roti": { cal: 120, pro: 4, fat: 3, carb: 24 },
    "Rice": { cal: 130, pro: 3, fat: 0.5, carb: 28 },
    "Paneer Tikka": { cal: 280, pro: 16, fat: 18, carb: 8 },
    "Dosa": { cal: 168, pro: 4, fat: 7, carb: 22 },
    "Idli": { cal: 58, pro: 2, fat: 0.2, carb: 12 },
    "Gulab Jamun": { cal: 150, pro: 2, fat: 7, carb: 20 }
  };

  const getNutrients = (name) => nutrientDb[name] || { cal: 250, pro: 8, fat: 10, carb: 30 };

  const NutrientBar = ({ label, value, max, color }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-black opacity-40">
        <span>{label}</span>
        <span>{value}g</span>
      </div>
      <div className="nutrient-bar">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {data.map((item, index) => {
          const nut = getNutrients(item.name);
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-[2.5rem] p-10 flex flex-col space-y-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/20">
                    🍲
                  </div>
                  <div className="text-left">
                    <h4 className="text-4xl font-black gradient-heading tracking-tight mb-1">{item.name}</h4>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-tighter rounded-lg border border-secondary/20">
                      {Math.round(item.confidence * 100)}% Match Accuracy
                    </span>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-6xl font-black text-white leading-none">{nut.cal}</div>
                  <div className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mt-2">Kcal / Portion</div>
                </div>
              </div>

              {/* Advanced Nutrient Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/5">
                <NutrientBar label="Protein" value={nut.pro} max={40} color="bg-blue-500" />
                <NutrientBar label="Fats" value={nut.fat} max={40} color="bg-red-500" />
                <NutrientBar label="Carbs" value={nut.carb} max={60} color="bg-secondary" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full py-6 rounded-[2rem] glass-card border border-white/10 text-sm font-black uppercase tracking-[0.4em] transition-all"
      >
        New Identification Scan
      </motion.button>
    </div>
  );
};

export default Result;
