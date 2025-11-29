import React from 'react';
import { motion } from 'framer-motion';

export const LoadingDots: React.FC = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -6 }
  };

  const containerVariants = {
    initial: { transition: { staggerChildren: 0.2 } },
    animate: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <motion.div 
      className="flex items-center gap-1.5 h-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-onzy-orange rounded-full"
          variants={dotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.15
          }}
        />
      ))}
    </motion.div>
  );
};