import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Mountain, Snowflake, Clock, Info, Globe,
  Thermometer, AlertTriangle, BarChart, MapPin, Droplet, Activity, BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageTransition from '../components/common/PageTransition';
import { glaciers } from '../data/glacierData.tsx';
import Footer from '../components/layout/Footer';

const GlacierComparison = () => {
  const [currentGlacier, setCurrentGlacier] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 
  
  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updateSliderPosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [updateSliderPosition]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      updateSliderPosition(e.clientX);
    }
  }, [isDragging, updateSliderPosition]);

  const nextGlacier = () => {
    setCurrentGlacier((prev) => (prev === glaciers.length - 1 ? 0 : prev + 1));
    setSliderPosition(50); // Reset slider position
  };

  const prevGlacier = () => {
    setCurrentGlacier((prev) => (prev === 0 ? glaciers.length - 1 : prev - 1));
    setSliderPosition(50); // Reset slider position
  };

  const glacier = glaciers[currentGlacier];

  return (
    <div className="flex flex-col min-h-screen">
      <PageTransition className="flex-grow bg-gradient-to-b from-blue-50 to-indigo-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Snowflake className="w-10 h-10 mr-3 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Glacier Time Comparison
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Compare glacier changes over decades to see the impact of climate change
            </motion.p>
          </div>
          
          {/* Glacier Comparison Viewer */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Glacier Info */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{glacier.name}</h2>
                  <p className="text-blue-100 flex items-center mt-1">
                    <Globe className="w-4 h-4 mr-2" />
                    {glacier.location}
                  </p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <button 
                    onClick={prevGlacier}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                    aria-label="Previous glacier"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="mx-4 text-lg">
                    {currentGlacier + 1} / {glaciers.length}
                  </div>
                  <button 
                    onClick={nextGlacier}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                    aria-label="Next glacier"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Comparison Viewer */}
            <div 
              ref={containerRef}
              className="relative h-[60vh] md:h-[70vh] overflow-hidden cursor-pointer select-none"
              onClick={handleContainerClick}
            >
              {/* Before Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-200"
                style={{ backgroundImage: `url(${glacier.before})` }}
              />
              
              {/* After Image with Slider */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-200"
                style={{ 
                  backgroundImage: `url(${glacier.after})`,
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`
                }}
              />
              
              {/* Drag overlay for better UX */}
              <div className="absolute inset-0 z-10" />
              
              {/* Slider Control */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-blue-600 cursor-col-resize z-20 hover:w-2 transition-all duration-200"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div className={`absolute -left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}>
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                
                {/* Vertical line extends */}
                <div className="absolute -left-1 top-0 bottom-0 w-3 bg-blue-600/30 rounded-full" />
              </div>
              
              {/* Year Indicators */}
              <div className="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded-lg flex items-center backdrop-blur-sm">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">{glacier.years[0]}</span>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded-lg flex items-center backdrop-blur-sm">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">{glacier.years[1]}</span>
              </div>
              
              {/* Slider Position Indicator */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="font-medium">{Math.round(sliderPosition)}% timeline</span>
              </div>
            </div>
            
            {/* Glacier Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <motion.div 
                className="bg-blue-50 p-4 rounded-xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Mountain className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="font-bold text-lg text-blue-800">Ice Volume Lost</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">{glacier.iceLoss}</div>
                <p className="text-sm text-gray-600 mt-2">since {glacier.years[0]}</p>
              </motion.div>
              
              <motion.div 
                className="bg-blue-50 p-4 rounded-xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <h3 className="font-bold text-lg text-blue-800">Area Change</h3>
                </div>
                <div className="text-xl font-bold text-blue-600">{glacier.areaChange}</div>
                <p className="text-sm text-gray-600 mt-2">over {glacier.years[1] - glacier.years[0]} years</p>
              </motion.div>
              
              <motion.div 
                className="bg-blue-50 p-4 rounded-xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-3">
                  <Info className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="font-bold text-lg text-blue-800">About This Glacier</h3>
                </div>
                <p className="text-gray-700">{glacier.description}</p>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Climate Impact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              The Impact of Climate Change on Glaciers
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Thermometer className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Key Statistics
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { 
                      icon: <Snowflake className="w-5 h-5 text-blue-600" />, 
                      text: "Glaciers worldwide have lost over 9 trillion tons of ice since 1961" 
                    },
                    { 
                      icon: <Droplet className="w-5 h-5 text-blue-600" />, 
                      text: "Glacial melt contributes to 25-30% of current sea level rise" 
                    },
                    { 
                      icon: <Globe className="w-5 h-5 text-blue-600" />, 
                      text: "The Arctic is warming 2-3 times faster than the global average" 
                    },
                    { 
                      icon: <AlertTriangle className="w-5 h-5 text-blue-600" />, 
                      text: "If all glaciers melted, sea levels would rise by about 70 meters" 
                    }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        {stat.icon}
                      </div>
                      <p className="text-gray-700 font-medium">{stat.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-amber-100 p-3 rounded-xl mr-4">
                    <BarChart className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Projected Future
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { 
                      icon: <Mountain className="w-5 h-5 text-amber-600" />, 
                      text: "By 2100, up to 80% of glacier mass could disappear in some regions" 
                    },
                    { 
                      icon: <Thermometer className="w-5 h-5 text-amber-600" />, 
                      text: "Even if global warming is limited to 1.5°C, glaciers will lose 30-50% of their volume" 
                    },
                    { 
                      icon: <MapPin className="w-5 h-5 text-amber-600" />, 
                      text: "The Himalayas could lose two-thirds of their glaciers by 2100" 
                    },
                    { 
                      icon: <Droplet className="w-5 h-5 text-amber-600" />, 
                      text: "Glacier retreat will significantly impact freshwater resources for 1.9 billion people" 
                    }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-amber-100"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        {stat.icon}
                      </div>
                      <p className="text-gray-700 font-medium">{stat.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Want to learn more about glacier conservation?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg group"
                onClick={() => navigate('/quiz')} 
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                <div className="flex items-center justify-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>Explore Glacier Data</span>
                </div>
              </motion.button>
              
              <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="relative px-8 py-4 rounded-xl font-medium group overflow-hidden"
  onClick={() => navigate('/Games')} 
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  <div className="absolute inset-0.5 bg-white rounded-[11px] group-hover:opacity-0 transition-opacity duration-300" />
  <div className="relative flex items-center justify-center text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text group-hover:text-white transition-colors duration-300">
    <Activity className="w-5 h-5 mr-2" />
    <span>Take Climate Action</span>
  </div>
</motion.button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
      
      {/* Added Footer */}
      <Footer />
    </div>
  );
};

export default GlacierComparison;