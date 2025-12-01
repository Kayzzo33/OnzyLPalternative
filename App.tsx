import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/layout/Header';
import { ReferralEngine } from './components/pages/ReferralEngine';
import { Button } from './components/ui/Button';
import { ChatBot } from './components/features/ChatBot';
import { InfiniteMarquee } from './components/ui/InfiniteMarquee';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { AiChatSimulation } from './components/sections/AiChatSimulation';
import { PartnerLogos } from './components/sections/PartnerLogos';
import { ContactForm } from './components/sections/ContactForm';
import { RadarDashboard } from './components/sections/RadarDashboard';
import { 
  Globe, Database, 
  ArrowRight, Search, BarChart3, ShieldCheck, 
  Zap, PenTool, EyeOff
} from 'lucide-react';

const RotatingText: React.FC = () => {
  const words = ["Automação", "Estratégia", "Inteligência Artificial"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true); // Start fade in
      }, 300); // Wait for fade out to complete
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`inline-block text-onzy-orange transition-all duration-300 transform ${
        fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {words[index]}
    </span>
  );
};

const HeroButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-8 py-4 bg-gradient-to-r from-onzy-orange to-orange-600 text-white rounded-full font-bold uppercase tracking-wider overflow-hidden shadow-[0_10px_30px_rgba(255,85,0,0.3)] hover:shadow-[0_10px_40px_rgba(255,85,0,0.5)] transition-all duration-300"
    >
      <span className="inline-block transition-all duration-300 group-hover:-translate-y-[150%]">
        SEJA ONZY
      </span>
      <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center translate-y-[150%] transition-all duration-300 group-hover:translate-y-0 gap-2">
        Agendar Agora <ArrowRight size={18} />
      </span>
    </button>
  );
};

const App: React.FC = () => {
  const [route, setRoute] = useState<PageRoute>(PageRoute.HOME);

  if (route === PageRoute.GROWTH_ENGINE) {
    return <ReferralEngine setRoute={setRoute} />;
  }

  return (
    <div className="bg-onzy-light min-h-screen text-black font-sans">
      <Header setRoute={setRoute} currentRoute={route} />
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-10 overflow-hidden bg-white">
         {/* Background Glows */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/80 via-white to-white pointer-events-none"></div>
         <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-onzy-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[80px] pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-10 animate-fade-in-up">
               <span className="w-2 h-2 rounded-full bg-onzy-orange"></span>
               Onzy High Level
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-balance max-w-6xl animate-fade-in-up [animation-delay:200ms]">
              Seu Negócio Acelerado com <br className="hidden md:block" />
              <RotatingText />
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed text-balance animate-fade-in-up [animation-delay:400ms]">
              Transformamos sua presença online com automação e IA.
              Conheça nosso <strong className="text-black">AI Referral Engine™</strong> e escale seus resultados.
            </p>

            {/* CTA Button */}
            <div className="mb-20 animate-fade-in-up [animation-delay:600ms]">
                <HeroButton onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} />
            </div>

            {/* Infinite Marquee */}
            <div className="w-full animate-fade-in-up [animation-delay:800ms]">
               <InfiniteMarquee />
            </div>
         </div>
      </section>

      {/* SECTION 2: PERFORMANCE (Draggable 3D Cards) */}
      <PerformanceSection />

      {/* SECTION 3: AI CHAT SIMULATION */}
      <AiChatSimulation />

      {/* SECTION 4: "INVISIBLE" (Gray Background - Rounded Top) */}
      <section className="bg-onzy-light text-black py-32 rounded-t-[3rem] -mt-12 relative z-30">
          <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-onzy-orange text-xs font-bold uppercase tracking-widest mb-6">
                          Por que isso importa?
                      </div>
                      <h2 className="text-5xl font-bold mb-6">
                          Se a IA não confia em você, <br />
                          você é <span className="text-gray-300 decoration-4 underline decoration-onzy-orange/30">invisível.</span>
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          O tráfego de busca tradicional está caindo. O "tráfego de resposta" está explodindo.
                          As decisões de compra B2B e High-Ticket estão migrando para LLMs.
                      </p>
                      
                      {/* Dark Cards */}
                      <div className="space-y-4">
                          <div className="bg-onzy-black p-6 rounded-2xl text-white flex items-start gap-4 border border-gray-800">
                              <div className="p-3 bg-white/10 rounded-lg">
                                 <ShieldCheck className="text-onzy-orange" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Autoridade E-E-A-T</h4>
                                  <p className="text-gray-400 text-sm mt-1">
                                      Criamos os sinais técnicos profundos que provam sua expertise para o algoritmo.
                                  </p>
                              </div>
                          </div>
                          <div className="bg-onzy-black p-6 rounded-2xl text-white flex items-start gap-4 border border-gray-800">
                              <div className="p-3 bg-white/10 rounded-lg">
                                 <Zap className="text-onzy-orange" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Zero-Click Rank</h4>
                                  <p className="text-gray-400 text-sm mt-1">
                                      Seja a resposta direta, sem precisar que o usuário clique.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Abstract Graphic */}
                  <div className="hidden lg:flex items-center justify-center relative h-full min-h-[400px]">
                      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-onzy-orange/10 to-gray-200/50 rounded-full blur-3xl animate-pulse"></div>
                      
                      <div className="relative z-10 w-full max-w-sm aspect-square bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden p-8">
                          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                          
                          <div className="text-center relative z-20">
                             <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
                                <EyeOff size={48} className="text-gray-300" />
                                <div className="absolute -right-2 -top-2 bg-onzy-orange text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                                   404
                                </div>
                             </div>
                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Sem Estratégia?</h3>
                             <p className="text-gray-500 text-sm">
                               Marcas sem sinais de E-E-A-T desaparecem nas respostas da Inteligência Artificial.
                             </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 5: STEPS / ENGINEERING (Dark) */}
      <section className="bg-black py-32 text-white rounded-t-[3rem] -mt-12 relative z-40">
          <div className="container mx-auto px-6">
              <div className="text-center mb-20">
                  <span className="text-onzy-orange font-bold text-sm tracking-widest uppercase">A Metodologia Onzy</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-4">Engenharia Reversa do Algoritmo</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                      { step: "01", title: "Diagnóstico", desc: "Mapeamos como a IA percebe sua marca hoje vs. concorrentes." },
                      { step: "02", title: "Engenharia de Prompt", desc: "Criamos a semântica exata que os LLMs valorizam." },
                      { step: "03", title: "Ecossistema de Dados", desc: "Implementação de Schema Markup e estruturação de dados." },
                      { step: "04", title: "Validação de Autoridade", desc: "Sinais de E-E-A-T em canais de alta relevância." },
                      { step: "05", title: "Amplificação de Sinal", desc: "Tráfego pago estratégico para educar o algoritmo." },
                      { step: "06", title: "Domínio da Resposta", desc: "Sua marca se torna a resposta padrão (Zero-Click)." }
                  ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                          <div className="text-4xl font-bold text-gray-800 group-hover:text-onzy-orange/50 transition-colors mb-4 font-mono">{item.step}</div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 6: PARTNER LOGOS */}
      <PartnerLogos />

      {/* SECTION 7: SERVICES GRID (White - Rounded Top) */}
      <section id="servicos" className="bg-white py-32 rounded-t-[3rem] -mt-12 relative z-50">
          <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                   <h2 className="text-4xl md:text-5xl font-bold">
                       Nossos <span className="text-onzy-orange">Serviços Principais</span>
                   </h2>
                   <p className="text-gray-500 mt-4">Uma gama completa para impulsionar sua presença digital.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                   {[
                       { title: "Tráfego Pago & Google Ads", icon: BarChart3 },
                       { title: "SEO e Posicionamento", icon: Search },
                       { title: "Sites & Landing Pages", icon: Globe },
                       { title: "CRM & Automações com IA", icon: Database },
                       { title: "Branding & Design", icon: PenTool },
                       { title: "Security Cloud", icon: ShieldCheck },
                   ].map((svc, i) => (
                       <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
                           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-onzy-orange mb-6 group-hover:scale-110 transition-transform">
                               <svc.icon size={24} />
                           </div>
                           <h3 className="font-bold text-xl mb-3">{svc.title}</h3>
                           <p className="text-gray-500 text-sm leading-relaxed">
                               Soluções personalizadas moldadas às necessidades específicas da sua empresa.
                           </p>
                       </div>
                   ))}
               </div>
          </div>
      </section>

      {/* SECTION 8: RADAR DASHBOARD (New Section) */}
      <RadarDashboard />

      {/* SECTION 9: CONTACT FORM (Replaces Footer CTA) */}
      <ContactForm />

      {/* FOOTER (Dark - Just Links) */}
      <footer className="bg-black text-white py-12 border-t border-gray-900 relative z-[60]">
          <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12">
                  <div className="col-span-1 md:col-span-2">
                      <div className="text-2xl font-bold mb-4 flex items-center gap-1">
                        C
                        <span className="relative inline-block mx-[1px]">
                          o
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-onzy-orange rounded-[1px]"></span>
                        </span>
                        rtex
                      </div>
                      <p className="text-gray-500 max-w-sm text-sm">
                          Agência de soluções digitais completas. Transformando ideias em resultados reais com tecnologia, estratégia e design.
                      </p>
                  </div>
                  <div>
                      <h4 className="font-bold mb-4">Navegação</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                          <li><button onClick={() => setRoute(PageRoute.HOME)} className="hover:text-white">Home</button></li>
                          <li><button onClick={() => setRoute(PageRoute.GROWTH_ENGINE)} className="hover:text-white">AI Engine</button></li>
                          <li className="hover:text-white cursor-pointer">Cases</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold mb-4">Contato</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                          <li>contato@onzy.com.br</li>
                          <li>Santa Catarina - Brasil</li>
                      </ul>
                  </div>
              </div>
              
              <div className="text-center text-gray-800 text-xs mt-12 pt-8 border-t border-gray-900">
                  © 2024 Onzy Digital Solutions. All rights reserved.
              </div>
          </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;