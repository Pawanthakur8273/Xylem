import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Brain, Mountain, Layers, Play, TrendingUp } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom'; // Added import

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  const features = [
    {
      icon: Globe,
      title: 'Emissions Map',
      description: 'Explore interactive CO₂ emissions data across countries with real-time analytics',
      path: '/emissions',
      color: 'from-blue-500 via-blue-600 to-cyan-500',
      bgColor: 'bg-blue-50',
      accentColor: 'text-blue-600'
    },
    {
      icon: Brain,
      title: 'Glacier Quiz',
      description: 'Test your knowledge about glaciers and climate change with gamified learning',
      path: '/quiz',
      color: 'from-emerald-500 via-green-600 to-teal-500',
      bgColor: 'bg-emerald-50',
      accentColor: 'text-emerald-600'
    },
    {
      icon: Mountain,
      title: 'Your Glacier',
      description: 'Visualize your personal 3D glacier in real-time with advanced rendering',
      path: '/glacier',
      color: 'from-purple-500 via-violet-600 to-pink-500',
      bgColor: 'bg-purple-50',
      accentColor: 'text-purple-600'
    },
    {
      icon: Layers,
      title: 'Games',
      description: 'Engage with interactive games designed to educate on climate change',
      path: '/Games', // Matches your route configuration
      color: 'from-orange-500 via-red-500 to-pink-500',
      bgColor: 'bg-orange-50',
      accentColor: 'text-orange-600'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path); // Use navigate instead of console.log
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          >
            <source 
              src="src/videos/homeVideo.mp4" 
              type="video/mp4" 
            />
            <source 
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4" 
              type="video/mp4" 
            />
          </video>
          
          {/* Clean overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Animated particles overlay */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Welcome to{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-300">
                  GlaCTrack
                </span>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-lg blur opacity-30"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-blue-100 font-light leading-relaxed max-w-4xl mx-auto">
              Transform how you understand climate change through 
              <span className="font-semibold text-cyan-300"> immersive visualization</span> and 
              <span className="font-semibold text-cyan-300"> interactive games</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => handleNavigation('/Games')}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore Games {/* Changed from Explore Data */}
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleNavigation('/emissions')}
              className="group inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
            >
              <Globe className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              View Map
            </button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Mountain className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Explore Our Tools</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Climate Data Like 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400"> Never Before</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Experience the future of climate visualization with our suite of interactive tools. 
              From real-time emissions tracking to immersive 3D glacier modeling, 
              discover how data becomes insight.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => handleNavigation(feature.path)}
              >
                <div className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 hover:border-gray-200 overflow-hidden`}>
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-xl font-bold text-slate-900 mb-4 group-hover:${feature.accentColor} transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  
                  {/* CTA */}
                  <div className={`flex items-center ${feature.accentColor} font-semibold group-hover:translate-x-2 transition-all duration-300`}>
                    <span className="text-sm">Explore Now</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <TrendingUp className="w-4 h-4 mr-2 text-cyan-300" />
              <span className="text-sm font-semibold text-blue-200">Real-Time Climate Data</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              The Climate Crisis in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200"> Numbers</span>
            </h2>
            
            <p className="text-lg md:text-xl text-blue-300 max-w-4xl mx-auto leading-relaxed">
              Understanding the scale of climate change through powerful data visualization 
              and real-time monitoring systems that bring clarity to complex environmental challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              { 
                number: '36.8B', 
                label: 'Tons of CO₂ emitted annually worldwide', 
                suffix: 'tons',
                color: 'from-red-400 to-orange-400',
                icon: Globe
              },
              { 
                number: '150B', 
                label: 'Tons of glacier ice lost yearly due to warming', 
                suffix: 'tons',
                color: 'from-blue-400 to-cyan-400',
                icon: Mountain
              },
              { 
                number: '3.4mm', 
                label: 'Sea level rise per year from ice melt', 
                suffix: '/year',
                color: 'from-emerald-400 to-teal-400',
                icon: TrendingUp
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className={`text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-blue-300 text-base leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => handleNavigation('/Games')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span>Explore Our Climate Games</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Add Footer */}
      <Footer />
    </div>
  );
};

export default Home;