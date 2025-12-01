import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../ui/Button';

// Card Data
const INITIAL_CARDS = [
  {
    id: 1,
    badge: "RELATÓRIO MENSAL",
    title: "Performance de Vendas",
    metrics: [
      { label: "Taxa de Conversão", value: "+50%", color: "text-onzy-orange" },
      { label: "ROI Médio", value: "4.5x", color: "text-onzy-orange" }
    ],
    desc: "Campanhas de Tráfego Pago & Ads",
    footer: "Estrutura de dados otimizada para escala."
  },
  {
    id: 2,
    badge: "AUTORIDADE",
    title: "Score E-E-A-T",
    metrics: [
      { label: "Trust Score", value: "98/100", color: "text-green-600" },
      { label: "Backlinks", value: "320+", color: "text-blue-600" }
    ],
    desc: "Sinais técnicos de confiança para o Google.",
    footer: "Reconhecimento de entidade validado."
  },
  {
    id: 3,
    badge: "SEO TÉCNICO",
    title: "Zero-Click Rank",
    metrics: [
      { label: "Posição Média", value: "#1", color: "text-purple-600" },
      { label: "Rich Snippets", value: "Ativos", color: "text-purple-600" }
    ],
    desc: "Sua marca como resposta direta da IA.",
    footer: "Otimização para LLMs e Busca Generativa."
  },
  {
    id: 4,
    badge: "CRESCIMENTO",
    title: "Leads Qualificados",
    metrics: [
      { label: "Novos Leads", value: "2.4k", color: "text-onzy-orange" },
      { label: "Custo/Lead", value: "-40%", color: "text-green-600" }
    ],
    desc: "Pipeline de vendas automatizado.",
    footer: "Sistema CRM integrado."
  }
];

export const PerformanceSection: React.FC = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  
  // Logic: Drag Left -> Next Card | Drag Right -> Prev Card
  const handleDragEnd = (offsetX: number) => {
    if (offsetX < -50) {
      // Dragged Left -> Next (Move first to last)
      setCards((currentCards) => {
        const newCards = [...currentCards];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      });
    } else if (offsetX > 50) {
      // Dragged Right -> Prev (Move last to first)
      setCards((currentCards) => {
        const newCards = [...currentCards];
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        return newCards;
      });
    }
  };

  const activeCardId = cards[0].id;

  return (
    <section className="bg-black text-white py-24 md:py-32 rounded-t-[3rem] relative z-20 -mt-12 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-onzy-orange/30 bg-onzy-orange/10 text-onzy-orange font-bold text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-onzy-orange animate-pulse"></span> Resultados
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Inteligência Digital que <br />
              <span className="text-onzy-orange">Gera Crescimento</span> & <br />
              <span className="text-white">Resultados Reais</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Combinamos tecnologia, dados e criatividade para construir ecossistemas digitais que transformam sua operação e <strong className="text-white">maximizam seu faturamento.</strong>
            </p>
            
            <Button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}>
              Fale com um especialista
            </Button>
          </div>

          {/* Right Content - Draggable 3D Stack */}
          <div className="relative h-[550px] flex flex-col items-center justify-center perspective-1000">
             {/* Background glow behind cards */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-onzy-orange/10 blur-[120px] rounded-full pointer-events-none"></div>

             <div className="relative w-full max-w-md h-[420px] mb-8">
               {cards.map((card, index) => {
                 const isFront = index === 0;
                 return (
                   <Card 
                     key={card.id} 
                     card={card} 
                     index={index} 
                     onDragEnd={handleDragEnd}
                     isFront={isFront}
                   />
                 );
               })}
             </div>

             {/* Indicators */}
             <div className="flex gap-3 z-10 mt-4">
               {INITIAL_CARDS.map((card) => (
                 <div 
                   key={card.id}
                   className={`
                     transition-all duration-300 rounded-full
                     ${card.id === activeCardId 
                        ? 'w-8 h-2 bg-onzy-orange' 
                        : 'w-2 h-2 bg-gray-700 hover:bg-gray-600'}
                   `}
                 />
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Card = ({ card, index, onDragEnd, isFront }: any) => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Stack visuals
  const yOffset = index * 12;
  const scaleOffset = 1 - index * 0.05;
  const opacityOffset = 1 - index * 0.15; // More visible stack
  const zIndex = 100 - index; // Ensure correct stacking order

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        y: yOffset,
        scale: isFront ? scale : scaleOffset,
        rotate: isFront ? rotate : 0,
        zIndex: zIndex,
        opacity: isFront ? opacity : opacityOffset,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        // Trigger navigation if dragged far enough
        if (Math.abs(info.offset.x) > 50) {
          onDragEnd(info.offset.x);
        }
      }}
      animate={{
        y: yOffset,
        scale: isFront ? 1 : scaleOffset,
        opacity: isFront ? 1 : opacityOffset,
        rotate: isFront ? 0 : 0 // Reset rotation on release
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`absolute top-0 left-0 w-full bg-white rounded-[2rem] p-6 shadow-2xl border border-gray-100 select-none cursor-grab active:cursor-grabbing overflow-hidden ${
        isFront ? 'hover:shadow-[0_20px_50px_rgba(255,85,0,0.2)]' : ''
      }`}
    >
      {/* Badge */}
      <div className="flex justify-between items-center mb-6 relative z-10">
         <div className="text-xs font-bold text-onzy-orange bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {card.badge}
         </div>
         {isFront && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">{card.title}</h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
         {card.metrics.map((m: any, i: number) => (
             <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">{m.label}</div>
                <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
             </div>
         ))}
      </div>

      {/* Description */}
      <div className="flex items-center gap-3 text-gray-600 text-sm mb-8 relative z-10">
         <div className="p-2 bg-gray-100 rounded-full text-gray-800">
            <TrendingUp size={16} />
         </div>
         {card.desc}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-4 flex items-center gap-2 text-xs font-medium text-gray-500 relative z-10">
         <CheckCircle2 size={14} className="text-green-500" />
         {card.footer}
      </div>
      
      {/* Decorative Wave - Adjusted to prevent visual bug */}
      <div className="absolute -bottom-1 -left-1 -right-1 h-3 bg-gradient-to-r from-onzy-orange to-yellow-500 opacity-90 blur-[1px]"></div>
    </motion.div>
  );
};