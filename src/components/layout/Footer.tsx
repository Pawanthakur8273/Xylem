import { motion } from 'framer-motion';
import { 
  Mountain, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const socialLinks = [
    { icon: Facebook, url: "#", color: "from-blue-600 to-blue-400", label: "Facebook" },
    { icon: Twitter, url: "#", color: "from-sky-500 to-sky-300", label: "Twitter" },
    { icon: Instagram, url: "#", color: "from-pink-600 to-pink-400", label: "Instagram" },
    { icon: Linkedin, url: "#", color: "from-blue-700 to-blue-500", label: "LinkedIn" },
    { icon: Github, url: "#", color: "from-gray-800 to-gray-600", label: "GitHub" },
  ];
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Emissions Map", href: "/emissions" },
        { label: "Glacier Quiz", href: "/quiz" },
        { label: "Glacier Timeline", href: "/glacier" },
        { label: "Games", href: "/Games" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Climate Reports", href: "#" },
        { label: "Research Papers", href: "#" },
        { label: "Educational Materials", href: "#" },
        { label: "API Documentation", href: "#" },
      ]
    },
    {
      title: "About",
      links: [
        { label: "Our Mission", href: "#" },
        { label: "Team", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Partners", href: "#" },
      ]
    }
  ];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-gray-900 text-white overflow-hidden pt-20">
      {/* Animated wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <motion.svg 
          className="relative block w-full h-[60px]"
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-slate-800"
            animate={{ d: [
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            ] }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-400/30"
          style={{
            top: `${Math.random() * 30}%`,
            left: `${Math.random() * 100}%`,
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
      
      {/* Glacier animation */}
      <motion.div 
        className="absolute bottom-0 left-10 opacity-5"
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Mountain className="w-48 h-48" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <motion.div
                className="mr-3 bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-xl"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Mountain className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                GlaCTrack
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming climate data into interactive experiences. Our mission is to make environmental insights accessible and engaging for everyone.
            </p>
            
            {/* Social links with animated hover */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="relative group"
                  aria-label={social.label}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative w-10 h-10 flex items-center justify-center bg-gray-800 group-hover:bg-transparent rounded-xl">
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Links columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div key={colIndex} variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 text-white relative inline-block">
                {column.title}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={link.href} 
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: linkIndex * 0.2
                        }}
                      />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        {/* Bottom section with animated logo */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div
              className="mr-3"
              animate={{
                y: [0, -3, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Mountain className="h-6 w-6 text-cyan-400" />
            </motion.div>
            <div className="text-gray-500 text-sm">
              © {currentYear} GlaCTrack. All rights reserved.
            </div>
          </div>
          
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-500 hover:text-cyan-300 transition-colors text-sm"
                whileHover={{ y: -3 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Back to top button with animation */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg"
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 0 20px rgba(56, 189, 248, 0.8)"
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
      
      {/* Animated globe in background */}
      <motion.div 
        className="absolute bottom-10 right-10 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Globe className="w-64 h-64" />
      </motion.div>
      
      {/* Floating ice particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`ice-${i}`}
          className="absolute w-3 h-3 bg-cyan-200/20 rounded-full"
          style={{
            top: `${70 + Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10 - Math.random() * 10, 0],
            x: [0, (i % 2 === 0 ? -1 : 1) * (5 + Math.random() * 5), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;