import React, { useState, useEffect } from 'react';
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

  const [history, setHistory] = useState([]);

  // Persistent History Loader
  useEffect(() => {
    const savedHistory = localStorage.getItem('nutriscan_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleUpload = async (file) => {
    setState({ status: 'loading', data: null, error: null });
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('model', 'yolov5s');

    try {
      const response = await axios.post(BACKEND_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 15000 
      });

      if (response.data && response.data.length > 0) {
        const newData = response.data;
        setState({ status: 'success', data: newData, error: null });
        
        // Update Persistent History
        const newHistoryItem = {
          id: Date.now(),
          name: newData[0].name,
          date: new Date().toLocaleDateString(),
          data: newData
        };
        const updatedHistory = [newHistoryItem, ...history].slice(0, 5); // Keep last 5
        setHistory(updatedHistory);
        localStorage.setItem('nutriscan_history', JSON.stringify(updatedHistory));
      } else {
        setState({ status: 'error', data: null, error: 'No food detected. Please ensure the lighting is good.' });
      }
    } catch (err) {
      console.error("API Error:", err);
      setState({ status: 'error', data: null, error: 'Network Error: Handshake failed.' });
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
            Nutritional AI Vision v2.0
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              NutriScan<span className="gradient-heading">AI</span>
            </h1>
          </motion.div>
        </header>

        <main className="space-y-16">
          <AnimatePresence mode="wait">
            {state.status === 'idle' && (
              <motion.div key="idle-view" className="space-y-16">
                <Upload onUpload={handleUpload} />
                
                {/* Recent Activity Section */}
                {history.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-px flex-1 bg-white/5"></div>
                      <h2 className="text-xs font-black uppercase tracking-[0.4em] opacity-30 text-white">Recent Activity</h2>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {history.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => setState({ status: 'success', data: item.data, error: null })}
                          className="glass-card history-card p-6 rounded-2xl flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center space-x-6">
                            <div className="text-2xl group-hover:scale-125 transition-transform duration-500">🍲</div>
                            <div>
                              <div className="text-lg font-bold text-white/90">{item.name}</div>
                              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.date}</div>
                            </div>
                          </div>
                          <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {state.status === 'loading' && <Loader key="loader" />}
            {state.status === 'success' && <Result key="result" data={state.data} onReset={reset} />}
            {state.status === 'error' && (
              <motion.div key="error" className="glass-card rounded-[2rem] p-12 text-center space-y-6">
                <div className="text-4xl">⚠️</div>
                <p className="text-white/40">{state.error}</p>
                <button onClick={reset} className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">Retry</button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between opacity-20">
          <div className="text-xs font-black uppercase tracking-widest text-white/40 font-inter">Deep Learning Vision</div>
          <div className="text-xs font-medium text-white/30 italic">Developed by NutriScan-AI Labs</div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
