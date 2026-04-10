import { motion } from 'framer-motion';
import { Target, Activity, Zap, Info } from 'lucide-react';

const CALORIE_MAPPING = {
  "Aloo Gobi": 150,
  "Aloo Matar": 120,
  "Aloo Methi": 140,
  "Aloo Tikki": 180,
  "Apple": 95,
  "Bhindi Masala": 130,
  "Biryani": 350,
  "Boiled Egg": 78,
  "Bread": 80,
  "Burger": 250,
  "Butter Chicken": 400,
  "Chai": 60,
  "Chicken Curry": 300,
  "Chicken Tikka": 150,
  "Chicken Wings": 200,
  "Chole": 220,
  "Daal": 180,
  "French Fries": 312,
  "French Toast": 230,
  "Fried Egg": 90,
  "Kadhi Pakora": 250,
  "Kheer": 200,
  "Lobia Curry": 160,
  "Omelette": 150,
  "Onion Pakora": 200,
  "Onion Rings": 250,
  "Palak Paneer": 240,
  "Pancakes": 220,
  "Paratha": 200,
  "Rice": 130,
  "Roti": 70,
  "Samosa": 250,
  "Sandwich": 250,
  "Spring Rolls": 150,
  "Waffles": 220,
  "White Rice": 130
};

export function Result({ data, onReset }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-12 glass rounded-3xl">
        <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/60">No food items detected in this frame.</p>
        <button 
          onClick={onReset}
          className="mt-6 px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider"
        >
          Try Another Image
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => {
          const calories = CALORIE_MAPPING[item.name] || 100;
          return (
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-lg leading-tight uppercase tracking-tight">{item.name}</h4>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Detected Item</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-outfit font-black text-accent">{Math.round(item.confidence * 100)}%</p>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Confidence</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-1">
                  <Activity className="w-4 h-4 text-accent/60 mb-1" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Calories</span>
                  <p className="font-outfit font-bold text-white text-xl">~{calories} <span className="text-xs font-normal text-white/40">kcal</span></p>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-1">
                  <Zap className="w-4 h-4 text-amber-500/60 mb-1" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Density</span>
                  <p className="font-outfit font-bold text-white text-xl">Medium</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="group relative px-12 py-4 rounded-full overflow-hidden transition-all active:scale-95"
        >
          <div className="absolute inset-0 bg-accent transition-transform group-hover:scale-110" />
          <span className="relative z-10 font-outfit font-bold text-white uppercase tracking-[0.2em] text-sm">Analyze New Meal</span>
        </button>
      </div>
    </div>
  );
}
