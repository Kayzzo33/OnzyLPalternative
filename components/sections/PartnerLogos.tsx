import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Hexagon, Circle, Triangle, Square, 
  Globe, Cloud, Command, Layers, Layout,
  Cpu, Database
} from 'lucide-react';

// Pool of simulated logos using Lucide icons
const LOGO_POOL = [
  { id: 1, icon: Hexagon, name: "TechGiant" },
  { id: 2, icon: Circle, name: "GlobalNet" },
  { id: 3, icon: Triangle, name: "DeltaSys" },
  { id: 4, icon: Square, name: "BlockChain" },
  { id: 5, icon: Globe, name: "WorldWide" },
  { id: 6, icon: Cloud, name: "CloudSync" },
  { id: 7, icon: Command, name: "CmdCorp" },
  { id: 8, icon: Layers, name: "LayerStack" },
  { id: 9, icon: Layout, name: "DesignFlow" },
  { id: 10, icon: Cpu, name: "AI Core" },
  { id: 11, icon: Database, name: "DataMesh" },
  { id: 12, icon: Box, name: "CubeSoft" },
];

export const PartnerLogos: React.FC = () => {
  // Initialize with the first 3 logos
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Pick a random slot (0, 1, or 2) to update
      const slotToUpdate = Math.floor(Math.random() * 3);
      
      // 2. Filter out currently visible logos to pick a new one
      const currentVisibleIds = visibleIndices.map(idx => LOGO_POOL[idx].id);
      const availableLogos = LOGO_POOL.filter(logo => !currentVisibleIds.includes(logo.id));
      
      // 3. Pick a random new logo from available ones
      const randomNewLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)];
      const newLogoIndex = LOGO_POOL.findIndex(l => l.id === randomNewLogo.id);

      // 4. Update state
      setVisibleIndices(prev => {
        const newIndices = [...prev];
        newIndices[slotToUpdate] = newLogoIndex;
        return newIndices;
      });

    }, 3000); // Update one logo every 3 seconds

    return () => clearInterval(interval);
  }, [visibleIndices]);

  return (
    <section className="bg-black py-24 border-t border-white/5 relative z-40">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Empresas Parceiras
        </h2>

        <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto items-center justify-items-center">
          {visibleIndices.map((logoIndex, slotIndex) => {
            const Logo = LOGO_POOL[logoIndex];
            return (
              <div key={slotIndex} className="w-32 h-32 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={Logo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center group cursor-pointer"
                  >
                    <div className="p-4 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                        <Logo.icon 
                            size={64} 
                            strokeWidth={1.5}
                            className="text-white group-hover:text-onzy-orange transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                        />
                    </div>
                    <span className="text-gray-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {Logo.name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};