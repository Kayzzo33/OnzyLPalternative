import React from 'react';
import { CheckCircle2, Circle, HelpCircle, Layout, TrendingUp, Zap } from 'lucide-react';

const row1 = [
  { icon: TrendingUp, text: "Como a Onzy aumenta minhas vendas?" },
  { icon: Layout, text: "Meu site pode chegar ao topo do Google?" },
  { icon: Zap, text: "A IA pode realmente ajudar meu negócio?" },
  { icon: Circle, text: "Vocês criam o design também?" },
  { icon: CheckCircle2, text: "Como sei se minha estratégia é a certa?" },
  { icon: HelpCircle, text: "O que é Growth Marketing na prática?" },
];

const row2 = [
  { icon: Layout, text: "Vocês criam lojas virtuais?" },
  { icon: Zap, text: "Preciso de um app para meu negócio?" },
  { icon: TrendingUp, text: "Como funciona a automação de vendas?" },
  { icon: HelpCircle, text: "Qual o prazo médio de entrega?" },
  { icon: CheckCircle2, text: "A hospedagem está inclusa?" },
  { icon: Circle, text: "Posso atualizar o site depois?" },
];

interface MarqueeRowProps {
  items: typeof row1;
  direction: 'left' | 'right';
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction }) => {
  return (
    <div className="flex overflow-hidden w-full py-4 mask-image-gradient">
      <div 
        className={`flex gap-6 whitespace-nowrap ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        }`}
      >
        {/* Double the items to create seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default min-w-[300px]"
          >
            <div className="p-2 bg-orange-50 rounded-full text-onzy-orange">
              <item.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InfiniteMarquee: React.FC = () => {
  return (
    <div className="w-full space-y-4 py-8 overflow-hidden relative">
      {/* Side gradients for fading effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
    </div>
  );
};