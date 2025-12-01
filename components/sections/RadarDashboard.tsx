import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CreditCard, Users, BookOpen, Briefcase, 
  Megaphone, PhoneCall, TrendingUp, Bot, 
  Target
} from 'lucide-react';

// Provided assets
const WHEEL_BG = "https://res.cloudinary.com/dxhlvrach/image/upload/v1764626202/Background-1_qomb39.webp";
const COMPASS_ICON = "https://res.cloudinary.com/dxhlvrach/image/upload/v1764626703/Bussola-Icone_-_Editado_lpgbly.png";

// Manual positioning configuration to create the "scattered/loose" look
// Radius reduced to bring cards closer to center
const CARDS = [
  { name: 'Co-produção', icon: Users, speed: 1.2, angle: 195, radius: 320 },
  { name: 'Infoprodutos', icon: BookOpen, speed: 0.8, angle: 210, radius: 280 },
  { name: 'Prestação de serviços', icon: Briefcase, speed: 1.5, angle: 225, radius: 340 },
  { name: 'Direct Response', icon: Megaphone, speed: 1.1, angle: 250, radius: 300 },
  { name: 'Cash on Delivery', icon: CreditCard, speed: 0.5, angle: 270, radius: 360 }, // Top Center
  { name: 'Inside Sales', icon: PhoneCall, speed: 1.3, angle: 290, radius: 290 },
  { name: 'Posicionamento', icon: TrendingUp, speed: 1.6, angle: 315, radius: 330 },
  { name: 'Agentes de IA', icon: Bot, speed: 0.9, angle: 330, radius: 280 },
  { name: 'Tráfego pago', icon: Target, speed: 1.4, angle: 345, radius: 320 }
];

export const RadarDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Mouse hover effect for the main card button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  };

  return (
    <section 
      ref={containerRef}
      // UPDATED: Added rounded-t-[3rem] and -mt-12 for consistent transitions
      className="bg-black py-24 md:py-32 overflow-hidden relative border-t border-white/5 font-sans min-h-[900px] flex flex-col items-center justify-center rounded-t-[3rem] -mt-12 z-50"
    >
      
      {/* --- BACKGROUND IMAGE (THE WHEEL) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-40">
         <img 
            src={WHEEL_BG} 
            alt="Radar Background" 
            className="w-full h-full object-contain"
         />
         {/* Vignette mask to blend edges */}
         <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* --- ARC CONTAINER --- */}
        <div className="relative w-full max-w-[1000px] h-[380px] flex justify-center mb-[-40px]">
            
            {/* Cards positioned on the arc */}
            {CARDS.map((card, index) => {
                const angleRad = (card.angle * Math.PI) / 180;
                
                // Position relative to the bottom center (hub)
                const x = card.radius * Math.cos(angleRad);
                const y = card.radius * Math.sin(angleRad);

                return (
                    <ParallaxCard 
                        key={index}
                        card={card}
                        x={x}
                        y={y}
                        speed={card.speed}
                        scrollYProgress={scrollYProgress}
                        angleDeg={card.angle}
                    />
                );
            })}
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <div 
            ref={cardRef}
            className="relative w-full max-w-5xl mx-auto z-30 mt-12"
        >
            {/* Compass Icon floating above center */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 z-40 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                <img src={COMPASS_ICON} alt="Compass" className="w-full h-full object-contain animate-float" />
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-10 py-12 md:px-16 md:py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                
                {/* Top highlight glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                
                <div className="relative z-10 pt-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
                        O que você quer <span className="text-transparent bg-clip-text bg-gradient-to-r from-onzy-orange to-yellow-500">aprender hoje?</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
                        Na <strong className="text-white">ONZY</strong>, você desenvolve novas habilidades dentro do mercado digital. 
                        Tudo isso e muito mais, na nossa estrutura completa de aceleração.
                    </p>
                    
                    {/* Button with Mouse-follow Glow */}
                    <button 
                        onMouseMove={handleMouseMove}
                        onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
                        className="
                            relative overflow-hidden px-10 py-4 rounded-full bg-white text-black font-bold text-base 
                            hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]
                            group/btn border border-white/50
                        "
                    >
                        <span className="relative z-10">COMEÇAR AGORA</span>
                        <div 
                            className="absolute inset-0 bg-gradient-radial from-gray-300 to-transparent opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300 pointer-events-none"
                            style={{
                                transform: 'translate(calc(var(--x) - 50%), calc(var(--y) - 50%))',
                                width: '150px',
                                height: '150px',
                                left: 0,
                                top: 0,
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

// --- Sub-component for individual cards with parallax ---

const ParallaxCard = ({ card, x, y, speed, scrollYProgress, angleDeg }: any) => {
    // Parallax Logic:
    const yParallax = useTransform(
        scrollYProgress,
        [0, 1],
        [0, speed * 60]
    );

    // Line rotation logic to point to center
    const lineRotation = angleDeg + 90; 

    return (
        <React.Fragment>
            {/* Connecting Line */}
            <div 
                className="absolute bottom-0 left-1/2 w-[1px] bg-gradient-to-t from-white/0 via-white/10 to-transparent origin-bottom z-0 pointer-events-none"
                style={{ 
                    height: '380px', 
                    transform: `translateX(-50%) rotate(${lineRotation}deg)`,
                }}
            />

            {/* The Card */}
            <motion.div
                style={{ 
                    x: x, 
                    y: y, 
                    translateY: yParallax, 
                    opacity: 1, 
                    left: '50%', 
                    bottom: 0,   
                }}
                className="absolute z-20 origin-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <div className="
                    group flex items-center gap-3 px-5 py-2.5
                    bg-white/5 backdrop-blur-xl
                    border border-white/10 rounded-full
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                    hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                    transition-all duration-500 cursor-pointer -translate-x-1/2 -translate-y-1/2
                ">
                    <card.icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white whitespace-nowrap">
                        {card.name}
                    </span>
                </div>
            </motion.div>
        </React.Fragment>
    );
};