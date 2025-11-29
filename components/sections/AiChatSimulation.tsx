import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { TypingEffect } from '../ui/TypingEffect';
import { LoadingDots } from '../ui/LoadingDots';
import { User, ShoppingBag, Search, CheckCircle2, Star } from 'lucide-react';

type Phase = 'typing' | 'loading' | 'result' | 'idle';

export const AiChatSimulation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('typing');
  const [key, setKey] = useState(0); // To force re-render/reset of typewriter

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'loading') {
      // Phase 2: Loading (Thinking) -> Result
      // Increased to 2.5s for better visibility of "thinking" animation
      timer = setTimeout(() => setPhase('result'), 2500);
    } else if (phase === 'result') {
      // Phase 3: Result (Reading) -> Idle
      // Increased to 12s to ensure ample reading time
      timer = setTimeout(() => setPhase('idle'), 12000);
    } else if (phase === 'idle') {
      // Phase 4: Idle (Fade out) -> Reset Loop
      timer = setTimeout(() => {
        setKey(prev => prev + 1); // Reset components via key change
        setPhase('typing');
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  const handleTypingComplete = () => {
    // Phase 1: Typing Done -> Loading
    // Small pause (1s) after typing completes before showing the "thinking" state
    if (phase === 'typing') {
      setTimeout(() => setPhase('loading'), 1000);
    }
  };

  return (
    <section className="bg-black py-24 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-onzy-orange/30 bg-onzy-orange/10 text-onzy-orange font-bold text-xs tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-onzy-orange"></span> Marketing de Resposta
             </div>

             <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Sua marca é a <br />
                <span className="text-onzy-orange">principal resposta</span> da IA?
             </h2>

             <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                O SEO tradicional não basta. As decisões de compra começam em conversas com IA. 
                Nós posicionamos sua empresa como a resposta definitiva e confiável, utilizando nosso <span className="text-white border-b border-onzy-orange">AI Referral Engine™</span>.
             </p>

             <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}>
                   Dominar as Respostas
                </Button>
                <button className="px-6 py-3 rounded-full font-semibold text-white hover:text-onzy-orange transition-colors flex items-center gap-2 group">
                   Ver Metodologia 
                   <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
             </div>

             <div className="pt-8 border-t border-white/10 mt-8">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                   Otimizado para os grandes modelos de linguagem:
                </p>
                <div className="flex flex-wrap gap-6 text-gray-500 font-medium text-sm">
                   <span>OpenAI</span>
                   <span>Google DeepMind</span>
                   <span>Anthropic</span>
                   <span>Meta AI</span>
                </div>
             </div>
          </div>

          {/* Right Content - Chat Mockup */}
          <div className="relative">
             {/* Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-onzy-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

             <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 min-h-[500px] flex flex-col">
                {/* Window Header */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                   </div>
                   <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                      engine_active
                   </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 relative">
                   <AnimatePresence mode="wait">
                     {phase !== 'idle' && (
                       <motion.div 
                         key={`chat-content-${key}`}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col gap-8"
                       >
                         
                         {/* User Message (Typing) */}
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                               <User size={18} className="text-gray-500" />
                            </div>
                            <div className="pt-2">
                               <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Sua Pergunta</div>
                               <div className="text-lg md:text-xl leading-relaxed max-w-md">
                                  <TypingEffect 
                                    text="Claude, recomenda um serviço de otimização de reputação." 
                                    speed={60} // Slower typing speed (60ms) for clearer "writing" effect
                                    onComplete={handleTypingComplete}
                                  />
                               </div>
                            </div>
                         </div>

                         {/* AI Thinking / Response */}
                         {(phase === 'loading' || phase === 'result') && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start gap-4"
                            >
                               <div className="w-10 h-10 rounded-full bg-onzy-orange/10 flex items-center justify-center shrink-0">
                                  {phase === 'loading' ? (
                                     <div className="w-2 h-2 bg-onzy-orange rounded-full animate-ping"></div>
                                  ) : (
                                     <ShoppingBag size={18} className="text-onzy-orange" />
                                  )}
                               </div>
                               
                               <div className="pt-2 w-full">
                                  <div className="text-xs font-bold text-onzy-orange mb-1 uppercase tracking-wide">Referral Engine</div>
                                  
                                  {phase === 'loading' ? (
                                     <div className="mt-2">
                                        <LoadingDots />
                                     </div>
                                  ) : (
                                     <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="bg-white border-2 border-orange-100 rounded-2xl p-6 shadow-xl relative overflow-hidden mt-2 group"
                                     >
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                           <Search size={100} />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                   <h3 className="text-xl font-bold text-gray-900">Sua Empresa™</h3>
                                                   <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                                                      <Star size={12} fill="currentColor" />
                                                      <Star size={12} fill="currentColor" />
                                                      <Star size={12} fill="currentColor" />
                                                      <Star size={12} fill="currentColor" />
                                                      <Star size={12} fill="currentColor" />
                                                      <span className="text-gray-400 ml-1">(Top Choice)</span>
                                                   </div>
                                                </div>
                                                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold border border-green-100 flex items-center gap-1">
                                                   <CheckCircle2 size={12} />
                                                   99.8% Match
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-600 leading-relaxed">
                                               Com base na análise de autoridade e consistência digital, esta é a recomendação mais segura e confiável para o setor.
                                            </p>
                                        </div>
                                     </motion.div>
                                  )}
                               </div>
                            </motion.div>
                         )}

                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                {/* Input Area (Mock) */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 flex items-center text-gray-400 text-sm select-none">
                       {phase === 'idle' ? (
                          <span className="animate-pulse">|</span>
                       ) : (
                          "Aguardando input..."
                       )}
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};