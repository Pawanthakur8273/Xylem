import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Import external spinner
import Footer from '../components/layout/Footer'; // Import Footer

const EmissionsMap: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    const iframe = iframeRef.current;
    
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
      clearTimeout(timer);
    };
  }, []);

  const stats = [
    { 
      id: 1, 
      title: 'Total Global CO₂', 
      value: '36.8B', 
      description: 'tons emitted annually',
      color: 'from-red-400 to-orange-400'
    },
    { 
      id: 2, 
      title: 'Glacier Ice Loss', 
      value: '150B', 
      description: 'tons lost yearly',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      id: 3, 
      title: 'Sea Level Rise', 
      value: '3.4mm', 
      description: 'per year from melt',
      color: 'from-emerald-400 to-teal-400'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-200/20 rounded-full"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Earth container - always rotating */}
              <motion.div
                className="relative"
              >
                {/* Rotating Earth */}
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{ 
                    rotate: { 
                      duration: 20, 
                      ease: "linear", 
                      repeat: Infinity
                    }
                  }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{
                      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))" 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </motion.svg>
                </motion.div>

                {/* Orbital particles - always active */}
                <AnimatePresence>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 1.5],
                        rotate: 360
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.2,
                        ease: "easeOut",
                        repeat: Infinity
                      }}
                      className="absolute inset-0"
                      style={{
                        transformOrigin: 'center',
                      }}
                    >
                      <div
                        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          marginLeft: '30px',
                          marginTop: '-4px'
                        }}
                      />
                    </motion.div>
                  ))}
                  
                  {/* Pulsing rings - always active */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 0.4, 0],
                        scale: [0.8, 2 + i * 0.5, 3 + i * 0.5]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 3, 
                        delay: i * 0.3,
                        ease: "easeOut",
                        repeat: Infinity
                      }}
                      className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                      style={{
                        width: '48px',
                        height: '48px',
                        margin: 'auto'
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Global CO2 Emissions
              </h1>
              <p className="text-gray-600 mt-2">
                Explore carbon dioxide emissions by country over time with interactive visualization
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Information Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 py-8 relative z-10"
      >
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100"
        >
          <motion.h2 
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Understanding the Data
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            This visualization shows CO₂ emissions in metric tons per capita. Darker colors indicate higher emissions.
            Use the filters to explore historical data and compare countries.
          </motion.p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer`}
              >
                {/* Animated background patterns */}
                <motion.div
                  className="absolute -inset-4 bg-white/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <motion.h3 
                    className="text-lg font-semibold"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {stat.title}
                  </motion.h3>
                  <motion.div 
                    className="text-3xl font-bold my-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {stat.description}
                  </motion.p>
                </div>

                {/* Floating particles inside cards */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 20}%`
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Looker Studio Embed */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 pb-12 relative z-10"
      >
        <motion.div
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
            y: -8
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative"
        >
          {/* Decorative border animation */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              background: [
                "linear-gradient(0deg, rgba(59,130,246,0.1) 0%, transparent 50%, transparent 100%)",
                "linear-gradient(90deg, rgba(59,130,246,0.1) 0%, transparent 50%, transparent 100%)",
                "linear-gradient(180deg, rgba(59,130,246,0.1) 0%, transparent 50%, transparent 100%)",
                "linear-gradient(270deg, rgba(59,130,246,0.1) 0%, transparent 50%, transparent 100%)",
                "linear-gradient(360deg, rgba(59,130,246,0.1) 0%, transparent 50%, transparent 100%)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {isLoading && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <LoadingSpinner size={80} aria-label="Loading emissions data" />
                <motion.p 
                  className="mt-4 text-gray-600 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading emissions visualization...
                </motion.p>
              </div>
            </motion.div>
          )}
          
          <iframe
            ref={iframeRef}
            width="100%"
            height="750"
            src="https://lookerstudio.google.com/embed/reporting/1cccf677-a249-4072-a37d-6b4ec85172c0/page/p_0c7zxvt1qd"
            frameBorder="0"
            allowFullScreen
            Games="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-Games"
            className="min-h-[750px] relative z-10"
            style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          ></iframe>
        </motion.div>
      </motion.div>
      
      {/* Enhanced floating particles background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 6 + 4,
            height: Math.random() * 6 + 4,
            borderRadius: '50%',
            background: `rgba(59, 130, 246, ${0.1 + Math.random() * 0.3})`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 20, 0],
            x: [0, (i % 2 === 0 ? -1 : 1) * (10 + Math.random() * 10), 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2 + Math.random() * 0.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Add Footer */}
      <Footer />
    </div>
  );
};

export default EmissionsMap;