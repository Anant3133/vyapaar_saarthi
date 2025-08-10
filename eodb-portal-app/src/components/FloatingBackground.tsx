import React from 'react';
import { motion } from 'motion/react';

export function FloatingBackground() {
  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  const gradientBubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 150,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.2 + 0.05,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Gradients */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Primary Gradient Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20 dark:from-violet-900/40 dark:via-blue-900/40 dark:to-teal-900/40"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2), rgba(20, 184, 166, 0.2))',
              'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
              'linear-gradient(225deg, rgba(59, 130, 246, 0.2), rgba(20, 184, 166, 0.2), rgba(139, 92, 246, 0.2))',
              'linear-gradient(315deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2), rgba(20, 184, 166, 0.2))',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            mixBlendMode: 'overlay'
          }}
        />

        {/* Secondary Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)',
              'radial-gradient(ellipse 120% 80% at 80% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
              'radial-gradient(ellipse 120% 80% at 20% 100%, rgba(20, 184, 166, 0.15), transparent 70%)',
              'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            mixBlendMode: 'soft-light'
          }}
        />
      </motion.div>

      {/* Floating Geometric Shapes */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 backdrop-blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
            opacity: element.opacity,
            mixBlendMode: 'overlay',
          }}
          animate={{
            x: [0, 100, -50, 150, 0],
            y: [0, -80, 120, -40, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotate: [0, 180, 270, 360, 0],
            opacity: [element.opacity, element.opacity * 1.5, element.opacity * 0.5, element.opacity * 1.2, element.opacity],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient Blobs */}
      {gradientBubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.initialX}%`,
            top: `${bubble.initialY}%`,
            background: `radial-gradient(circle, 
              rgba(139, 92, 246, ${bubble.opacity}) 0%, 
              rgba(59, 130, 246, ${bubble.opacity * 0.8}) 40%, 
              rgba(20, 184, 166, ${bubble.opacity * 0.6}) 70%, 
              transparent 100%)`,
            filter: 'blur(40px)',
            mixBlendMode: 'multiply',
          }}
          animate={{
            x: [0, -100, 200, -150, 0],
            y: [0, 150, -100, 80, 0],
            scale: [1, 1.3, 0.7, 1.1, 1],
            opacity: [bubble.opacity, bubble.opacity * 0.3, bubble.opacity * 1.2, bubble.opacity * 0.8, bubble.opacity],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: [0.25, 0.25, 0, 1],
          }}
        />
      ))}

      {/* Animated SVG Particles */}
      <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'overlay' }}>
        <defs>
          <linearGradient id="particleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
          </linearGradient>
          <linearGradient id="particleGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Floating Geometric Particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.g key={`particle-${i}`}>
            <motion.circle
              cx={`${20 + i * 15}%`}
              cy={`${30 + i * 10}%`}
              r={Math.random() * 3 + 2}
              fill="url(#particleGradient1)"
              filter="url(#glow)"
              animate={{
                cx: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${15 + i * 15}%`, `${20 + i * 15}%`],
                cy: [`${30 + i * 10}%`, `${25 + i * 10}%`, `${35 + i * 10}%`, `${30 + i * 10}%`],
                opacity: [0.3, 0.8, 0.1, 0.6, 0.3],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
            <motion.polygon
              points={`${10 + i * 12},${20 + i * 8} ${15 + i * 12},${25 + i * 8} ${5 + i * 12},${25 + i * 8}`}
              fill="url(#particleGradient2)"
              filter="url(#glow)"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.2, 0.5, 0.1, 0.4, 0.2],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8,
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Animated Mesh Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)
          `,
          mixBlendMode: 'soft-light',
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 20% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 50% 30%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Light Rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(139, 92, 246, 0.05) 90deg, 
            transparent 180deg, 
            rgba(59, 130, 246, 0.05) 270deg, 
            transparent 360deg)`,
          mixBlendMode: 'overlay',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}