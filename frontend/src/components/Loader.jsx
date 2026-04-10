import { motion } from 'framer-motion';

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        {/* Outer Circular Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 rounded-full border-4 border-accent/30"
        />
        
        {/* Inner Core */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-accent shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        />
        
        {/* Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            linear: true,
          }}
          className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-accent shadow-accent"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 text-white/60 font-medium tracking-widest uppercase text-xs animate-pulse"
      >
        Analyzing Neural Textures...
      </motion.p>
    </div>
  );
}
