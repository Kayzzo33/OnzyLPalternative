import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CreditCard, Users, BookOpen, Briefcase, 
  Megaphone, PhoneCall, TrendingUp, Bot, 
  Target, Compass 
} from 'lucide-react';
import { Button } from '../ui/Button';

const CARDS = [
  { name: 'Co-produção', icon: Users },
  { name: 'Infoprodutos', icon: BookOpen },
  { name: 'Prestação de serviços', icon: Briefcase },
  { name: 'Direct Response', icon: Megaphone },
  { name: 'Cash on Delivery', icon: CreditCard }, // Top center
  { name: 'Inside Sales', icon: PhoneCall },
  { name: 'Posicionamento', icon: TrendingUp },
  { name: 'Agentes de IA', icon: Bot },
  { name: 'Tráfego pago', icon: Target }
];

export const RadarDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const radius = 380; // Radius of the arc
  const totalCards = CARDS.length;
  // Arc settings: 195 degrees (left) to 345 degrees (right) for a top-arch look
  const startAngle = 195;
  const endAngle = 345;

  return (
    <section 
      ref={containerRef}
      className="bg-black py-32 overflow-hidden relative border-t border-white/5 font-sans min-h-[900px] flex flex-col items-center justify-center"
    >
      
      {/* --- BACKGROUND: THE WHEEL/RADAR --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-0 opacity-40">
         {/* Main concentric rings */}
         <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.3]" />
         <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.5]" />
         <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.7]" />
         <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.9]" />
         
         {/* Ticks ring */}
         <div className="absolute inset-0 rounded-full border border-white/5 border-dashed scale-[0.85]" />

         {/* Radial Spokes */}
         {[...Array(24)].map((_, i) => (
            <div 
                key={i} 
                className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }}
            />
         ))}
         
         {/* Vignette mask */}
         <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* --- INTERACTIVE ARC CONTAINER --- */}
        <div className="relative w-full max-w-[1000px] h-[450px] flex justify-center mb-[-50px]">
            
            {/* Center Hub (The pulsing light) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center justify-center">
                {/* Glow layers */}
                <div className="absolute w-40 h-40 bg-onzy-orange/20 blur-[60px] animate-pulse-slow"></div>
                <div className="absolute w-20 h-20 bg-white/10 blur-[30px] rounded-full"></div>
                
                {/* Physical Hub UI */}
                <div className="relative w-20 h-20 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] z-30">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border border-white/10">
                        <Compass size={28} className="text-white opacity-90" />
                    </div>
                    {/* Breathing light ring */}
                    <div className="absolute inset-0 border-2 border-onzy-orange/50 rounded-full animate-ping opacity-20"></div>
                </div>
            </div>

            {/* Cards positioned on the arc */}
            {CARDS.map((card, index) => {
                // Angle calculations
                const angleStep = (endAngle - startAngle) / (totalCards - 1);
                const angleDeg = startAngle + (angleStep * index);
                const angleRad = (angleDeg * Math.PI) / 180;
                
                // Position relative to the bottom center (hub)
                const x = radius * Math.cos(angleRad);
                const y = radius * Math.sin(angleRad);

                return (
                    <ParallaxCard 
                        key={index}
                        card={card}
                        x={x}
                        y={y}
                        index={index}
                        total={totalCards}
                        scrollYProgress={scrollYProgress}
                    />
                );
            })}
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <div className="relative w-full max-w-4xl mx-auto z-30 mt-24">
            <div className="bg-black/60 backdrop-blur-2xl border border-white/15 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_20px_100px_rgba(0,0,0,0.9)] relative overflow-hidden group">
                
                {/* Glassy sheen */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        O que você quer <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-onzy-orange to-yellow-500">aprender hoje?</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Na <strong className="text-white">ONZY</strong>, você desenvolve novas habilidades dentro do mercado digital. 
                        Tudo isso e muito mais, na nossa estrutura completa de aceleração.
                    </p>
                    
                    <Button 
                        variant="white" 
                        onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
                        className="!px-12 !py-5 !text-lg !rounded-full hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        COMEÇAR AGORA
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

// --- Sub-component for individual cards with parallax ---

const ParallaxCard = ({ card, x, y, index, total, scrollYProgress }: any) => {
    // Determine if card is near center or edges
    const centerIndex = (total - 1) / 2;
    const distFromCenter = Math.abs(index - centerIndex);
    
    // Parallax Effect:
    // Outer cards move MORE than inner cards to create a "bowing" effect as you scroll
    const movementRange = 40 + (distFromCenter * 20); 
    
    const yParallax = useTransform(
        scrollYProgress,
        [0, 1],
        [0, movementRange] // Move down as we scroll
    );

    // Fade/Scale effect on entry
    const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Rotation for the connecting line
    const rotation = Math.atan2(y, x) * (180 / Math.PI) + 90;

    return (
        <React.Fragment>
            {/* Connecting Line */}
            {/* Anchored at bottom center (hub), pointing to card */}
            <div 
                className="absolute bottom-0 left-1/2 w-[1px] bg-gradient-to-t from-white/5 via-white/20 to-transparent origin-bottom z-0"
                style={{ 
                    height: '400px', // Slightly longer than radius to fade out
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                }}
            />

            {/* The Card */}
            <motion.div
                style={{ 
                    x: x, 
                    y: y, // Base position
                    translateY: yParallax, // Scroll movement
                    scale: scale,
                    opacity: opacity,
                    left: '50%', // Centered horizontally in container
                    bottom: 0,   // Anchored at bottom
                }}
                className="absolute z-20 origin-center"
            >
                <div className="
                    group flex items-center gap-3 px-5 py-3 
                    bg-black/80 backdrop-blur-md 
                    border border-white/20 rounded-full 
                    shadow-[0_4px_30px_rgba(0,0,0,0.5)] 
                    hover:border-onzy-orange hover:bg-black hover:shadow-[0_0_20px_rgba(255,85,0,0.4)]
                    transition-all duration-300 cursor-pointer -translate-x-1/2 -translate-y-1/2
                ">
                    <card.icon size={16} className="text-gray-400 group-hover:text-onzy-orange transition-colors" />
                    <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white whitespace-nowrap">
                        {card.name}
                    </span>
                </div>
            </motion.div>
        </React.Fragment>
    );
};