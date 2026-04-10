import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload } from '../components/Upload';
import { Result } from '../components/Result';
import { Loader } from '../components/Loader';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      // API call to the backend configured on port 8080
      const response = await axios.post('http://localhost:8080/v1/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // The backend returns a JSON string that needs parsing
      const results = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      setData(results);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to connect to the Neural Core. Ensure backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full -ml-32 -mb-32" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between mb-20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-outfit font-extrabold text-2xl tracking-tight">NutriScan <span className="text-accent">AI</span></h1>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
               <ShieldCheck className="w-4 h-4" />
               SECURE PROXY
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
               <Terminal className="w-4 h-4" />
               NEURAL CORE v1.0
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-outfit font-black text-5xl lg:text-7xl mb-6 leading-[1.1]"
          >
            Smarter Eating <br />
            <span className="text-gradient">Powered by AI</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg lg:text-xl max-w-2xl mx-auto font-medium"
          >
            Instant calorie estimation and nutrient breakdown for your favorite Indian dishes using computer vision.
          </motion.p>
        </div>

        {/* Main Interface */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!data && !loading && (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Upload onUpload={handleUpload} isUploading={loading} />
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20"
              >
                <Loader />
              </motion.div>
            )}

            {data && !loading && (
              <motion.div
                key="result-zone"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Result data={data} onReset={reset} />
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
