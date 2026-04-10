import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Upload from '../components/Upload';
import Result from '../components/Result';
import Loader from '../components/Loader';

const BACKEND_URL = 'http://localhost:8080/v1/predict';

const Home = () => {
  const [state, setState] = useState({
    status: 'idle', // idle, loading, success, error
    data: null,
    error: null
  });

  const handleUpload = async (file) => {
    setState({ status: 'loading', data: null, error: null });
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('model', 'yolov5s');

    try {
      // Configuration for Axios
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 10000 // 10s timeout
      });

      if (response.data && response.data.length > 0) {
        setState({ status: 'success', data: response.data, error: null });
      } else {
        setState({ status: 'error', data: null, error: 'No food detected in this image. Please try a clearer shot.' });
      }
    } catch (err) {
      console.error("API Error:", err);
      let errorMsg = 'Server connection failed. Please ensure the backend is running.';
      
      if (err.response) {
        errorMsg = err.response.data.error || `Server Error (${err.response.status})`;
      } else if (err.request) {
        errorMsg = 'Network Error: Backend is not responding (Check port 8080).';
      }

      setState({ status: 'error', data: null, error: errorMsg });
    }
  };

  const reset = () => setState({ status: 'idle', data: null, error: null });

  return (
    <div className="min-h-screen relative bg-bg-dark selection:bg-amber-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <header className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 glass-card rounded-full text-amber-500 text-xs font-black tracking-[0.2em] uppercase"
          >
            Neural Vision Engine v1.0
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              NutriScan<span className="gradient-heading">AI</span>
            </h1>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">
              Professional-grade Indian food recognition and real-time nutritional estimation using deep learning.
            </p>
          </motion.div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {state.status === 'idle' && (
              <Upload key="upload" onUpload={handleUpload} />
            )}

            {state.status === 'loading' && (
              <Loader key="loader" />
            )}

            {state.status === 'success' && (
              <Result key="result" data={state.data} onReset={reset} />
            )}

            {state.status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-[2rem] p-12 border-red-500/20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 text-4xl">
                  ⚠️
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-red-400">Analysis Halted</h3>
                  <p className="text-white/40 text-lg">{state.error}</p>
                </div>
                <button 
                  onClick={reset}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all"
                >
                  Clear & Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 opacity-20 hover:opacity-100 transition-opacity">
          <div className="text-xs font-bold uppercase tracking-widest text-white/40">
            Powered by YOLOv5 • PyTorch • Vite
          </div>
          <div className="text-xs font-medium text-white/30">
            © 2026 NutriScan-AI Labs. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
