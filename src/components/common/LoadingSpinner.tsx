import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  'aria-label'?: string;
  pulseColor?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 120, 
  'aria-label': ariaLabel = 'Loading content, please wait',
  pulseColor = '#3b82f6'
}) => {
  // Calculate pulse ring sizes with enhanced effects
  const pulseRings = useMemo(() => 
    Array.from({ length: 4 }, (_, i) => ({
      size: size * (1 + i * 0.3),
      delay: i * 0.4,
      opacity: 1 - i * 0.2,
      strokeWidth: 3 - i * 0.5
    })), [size]
  );

  // Calculate snowflake positions with more variety
  const snowflakes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 2 * Math.PI;
      const distance = size * (0.35 + Math.random() * 0.25);
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 3 + Math.random() * 6,
        delay: i * 0.12,
        rotationSpeed: 2 + Math.random() * 3
      };
    }), [size]
  );

  // Add aurora particles
  const auroraParticles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * 2 * Math.PI,
      radius: size * 0.5,
      delay: i * 0.2,
      duration: 4 + Math.random() * 2
    })), [size]
  );

  const center = size / 2;
  const mountainSize = size * 0.65;

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent 70%)',
      }}
      aria-label={ariaLabel}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Enhanced Mountain logo with glowing effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.08, 1],
            y: [0, -8, 0],
            filter: ['brightness(1) saturate(1)', 'brightness(1.2) saturate(1.3)', 'brightness(1) saturate(1)']
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse",
            duration: 2.2,
            ease: "easeInOut"
          }}
          style={{
            position: 'relative',
            zIndex: 20,
            width: mountainSize,
            height: mountainSize,
            filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mountain-gradient" x1="12" y1="3" x2="12" y2="21">
                <stop offset="0%" stopColor="#e0f7fa" />
                <stop offset="30%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="snow-gradient" x1="12" y1="8" x2="12" y2="14">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e0f7fa" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path 
              d="M12 3L2 21H22L12 3Z" 
              fill="url(#mountain-gradient)" 
              stroke={pulseColor} 
              strokeWidth="0.8"
              filter="url(#glow)"
            />
            <path 
              d="M8 14L12 8L16 14H8Z" 
              fill="url(#snow-gradient)" 
              stroke="#ffffff" 
              strokeWidth="0.4"
              filter="url(#glow)"
            />
            {/* Add mountain details */}
            <path 
              d="M10 12L12 9L14 12" 
              stroke="#ffffff" 
              strokeWidth="0.3" 
              fill="none"
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Enhanced Glacier name text with glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0, 1, 1, 1],
            y: [10, 0, 0, 0],
            textShadow: [
              '0 0 5px rgba(59, 130, 246, 0.5)',
              '0 0 15px rgba(59, 130, 246, 0.8)',
              '0 0 25px rgba(59, 130, 246, 0.6)',
              '0 0 5px rgba(59, 130, 246, 0.5)'
            ]
          }}
          transition={{ 
            delay: 0.5,
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-0 w-full text-center"
          style={{ zIndex: 30 }}
        >
          <span 
            className="font-bold tracking-wide"
            style={{ 
              color: pulseColor,
              fontSize: size * 0.15,
              letterSpacing: '2px',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
              fontWeight: 800
            }}
          >
            GlaCTrack
          </span>
        </motion.div>

        {/* Enhanced Pulse rings with gradient borders */}
        {pulseRings.map((ring, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1.5], 
              opacity: [0, ring.opacity, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 0.5,
              delay: ring.delay,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              width: ring.size,
              height: ring.size,
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, ${pulseColor}44, transparent, ${pulseColor}44)`,
              border: `${ring.strokeWidth}px solid transparent`,
              backgroundClip: 'padding-box',
              zIndex: 10,
            }}
          />
        ))}

        {/* Aurora particles */}
        {auroraParticles.map((particle, i) => (
          <motion.div
            key={`aurora-${i}`}
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${pulseColor}, #e0f7fa)`,
              zIndex: 12,
            }}
            animate={{
              x: [
                Math.cos(particle.angle) * particle.radius,
                Math.cos(particle.angle + Math.PI) * particle.radius,
                Math.cos(particle.angle) * particle.radius
              ],
              y: [
                Math.sin(particle.angle) * particle.radius,
                Math.sin(particle.angle + Math.PI) * particle.radius,
                Math.sin(particle.angle) * particle.radius
              ],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced Snowflakes with rotation and shimmer */}
        {snowflakes.map((flake, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: center + flake.x - flake.size / 2,
              top: center + flake.y - flake.size / 2,
              width: flake.size,
              height: flake.size,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff, #e0f7fa, #93c5fd)',
              zIndex: 15,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), inset 0 0 4px rgba(59, 130, 246, 0.3)',
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? -12 : 12, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 360, 720]
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i * 0.3,
              delay: flake.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced background glow with multiple layers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${pulseColor}25, ${pulseColor}10, transparent 70%)`,
            zIndex: 5,
          }}
        />

        {/* Inner rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: size * 0.9,
            height: size * 0.9,
            borderRadius: '50%',
            border: `2px dashed ${pulseColor}40`,
            zIndex: 8,
          }}
        />

        {/* Outer counter-rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: size * 1.1,
            height: size * 1.1,
            borderRadius: '50%',
            border: `1px dotted ${pulseColor}30`,
            zIndex: 7,
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;