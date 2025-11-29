import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Cpu, Rocket, BarChart } from 'lucide-react';
import { PageRoute } from '../../types';
import { Button } from '../ui/Button';
import { generateFastInsight } from '../../services/geminiService';

interface ReferralEngineProps {
  setRoute: (route: PageRoute) => void;
}

export const ReferralEngine: React.FC<ReferralEngineProps> = ({ setRoute }) => {
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [aiInsight, setAiInsight] = useState('');

  // Auto-generate insight when business name is entered (simulating analysis)
  useEffect(() => {
    if (businessName.length > 3 && step === 1) {
        const fetchInsight = async () => {
             const text = await generateFastInsight(businessName);
             setAiInsight(text);
        }
        // Debounce simple
        const timer = setTimeout(fetchInsight, 1000);
        return () => clearTimeout(timer);
    }
  }, [businessName, step]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col font-sans">
      {/* Navbar Minimal */}
      <div className="p-8 flex justify-between items-center z-50">
        <button 
          onClick={() => setRoute(PageRoute.HOME)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> Voltar para Home
        </button>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-onzy-orange rounded-full animate-pulse"></span>
            <span className="text-xl font-bold tracking-tighter">ONZY AI ENGINE</span>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-onzy-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 flex-1 flex flex-col justify-center items-center relative z-10">
        
        {step === 0 && (
          <div className="text-center max-w-3xl animate-[fadeInUp_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Cpu size={14} className="text-onzy-orange" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Diagnóstico Digital</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Descubra o potencial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-onzy-orange to-yellow-500">oculto do seu negócio.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Nossa engine de IA analisa suas necessidades e propõe a estrutura digital perfeita para escalar seus resultados.
            </p>
            <Button onClick={() => setStep(1)} className="text-lg px-10 py-5">
              Iniciar Análise Gratuita
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="w-full max-w-xl animate-[fadeInUp_0.5s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">Qual o nome do seu projeto?</h2>
            <input 
              type="text" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 text-4xl py-4 text-center text-white focus:outline-none focus:border-onzy-orange transition-colors placeholder:text-gray-700"
              placeholder="Digite aqui..."
              autoFocus
            />
            
            {aiInsight && (
               <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-[fadeIn_1s_ease]">
                  <div className="flex items-start gap-3">
                    <Rocket className="text-onzy-orange shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Onzy AI Insight (Flash Lite)</p>
                        <p className="text-lg font-medium italic">"{aiInsight}"</p>
                    </div>
                  </div>
               </div>
            )}

            <div className="mt-12 flex justify-center">
                <Button onClick={() => setStep(2)} disabled={!businessName} variant="white">
                    Continuar
                </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 animate-[fadeInUp_0.5s_ease-out]">
             <div className="space-y-6">
                <h2 className="text-4xl font-bold">O plano perfeito para <span className="text-onzy-orange">{businessName}</span></h2>
                <p className="text-gray-400">Com base no perfil da sua empresa, a Onzy recomenda a seguinte stack tecnológica:</p>
                
                <ul className="space-y-4 mt-8">
                    {[
                        "Site Institucional de Alta Performance (React)",
                        "Automação de Atendimento (WhatsApp Bot)",
                        "Integração com CRM",
                        "Identidade Visual Premium"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-lg">
                            <CheckCircle2 className="text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="pt-8">
                     <Button onClick={() => window.location.href = "mailto:contato@onzy.com.br"} variant="primary">
                        Agendar Consultoria
                     </Button>
                </div>
             </div>

             <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-onzy-orange/20 rounded-full blur-[50px] pointer-events-none"></div>
                 <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Projeção de Crescimento</h3>
                        <BarChart className="text-onzy-orange" />
                    </div>
                    <div className="h-48 flex items-end justify-between gap-2 px-4 pb-4 border-b border-white/10">
                        <div className="w-full bg-white/10 rounded-t-lg h-[40%]"></div>
                        <div className="w-full bg-white/10 rounded-t-lg h-[55%]"></div>
                        <div className="w-full bg-white/20 rounded-t-lg h-[70%]"></div>
                        <div className="w-full bg-onzy-orange rounded-t-lg h-[95%] relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Com a Onzy
                            </div>
                        </div>
                    </div>
                 </div>
                 <p className="text-sm text-gray-500 mt-4 text-center">
                    Empresas digitalizadas crescem até 3x mais rápido.
                 </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};