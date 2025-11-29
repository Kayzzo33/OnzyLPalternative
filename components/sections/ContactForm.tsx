import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, Phone, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', business: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  // Simple progress calculation based on filled fields
  const filledCount = Object.values(formData).filter(Boolean).length;
  const progress = (filledCount / 3) * 100;

  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-100">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-onzy-orange/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="space-y-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-onzy-orange text-xs font-bold uppercase tracking-widest mb-6">
                   <Sparkles size={12} />
                   Start Your Journey
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] text-gray-900">
                   Vamos construir algo <br />
                   <span className="text-onzy-orange relative inline-block">
                     incrível
                     <svg className="absolute w-full h-3 -bottom-1 left-0 text-onzy-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                     </svg>
                   </span> juntos.
                </h2>
             </motion.div>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-xl text-gray-500 leading-relaxed max-w-lg"
             >
                Para começarmos, preencha nosso briefing guiado. Ele nos ajuda a entender suas necessidades e a preparar uma proposta totalmente personalizada para o seu sucesso.
             </motion.p>

             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex items-center gap-4 pt-4"
             >
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm">
                         Client
                      </div>
                   ))}
                </div>
                <div className="text-sm font-medium text-gray-600">
                   <span className="text-onzy-orange font-bold">150+</span> Projetos entregues
                </div>
             </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D Glass Form */}
          <div className="perspective-1000">
             <motion.div
               initial={{ rotateY: -5, opacity: 0 }}
               whileInView={{ rotateY: 0, opacity: 1 }}
               whileHover={{ rotateY: 0, scale: 1.01 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative bg-gray-900/95 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-white overflow-hidden transform-gpu transition-all"
             >
                {/* Decorative Glow inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-onzy-orange/20 rounded-full blur-[80px] pointer-events-none"></div>

                {status === 'success' ? (
                   <div className="h-[400px] flex flex-col items-center justify-center text-center animate-fade-in-up">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                         <CheckCircle2 size={40} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Briefing Iniciado!</h3>
                      <p className="text-gray-400 max-w-xs">
                         Recebemos suas informações. Nossa equipe entrará em contato em breve.
                      </p>
                      <button 
                        onClick={() => { setStatus('idle'); setFormData({name:'', business:'', phone:''}); }}
                        className="mt-8 text-sm text-onzy-orange hover:text-white transition-colors"
                      >
                         Enviar outro
                      </button>
                   </div>
                ) : (
                   <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                      
                      {/* Header */}
                      <div className="mb-8">
                         <div className="flex justify-between items-end mb-2">
                            <div>
                               <h3 className="text-xl font-bold">Briefing Guiado</h3>
                               <p className="text-sm text-gray-400">Informações de Contato</p>
                            </div>
                            <span className="text-xs font-bold text-onzy-orange bg-onzy-orange/10 px-2 py-1 rounded">
                               Passo 1 de 3
                            </span>
                         </div>
                         {/* Progress Bar */}
                         <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                               className="h-full bg-gradient-to-r from-onzy-orange to-yellow-500"
                               initial={{ width: 0 }}
                               animate={{ width: `${Math.max(5, progress)}%` }}
                               transition={{ duration: 0.5 }}
                            />
                         </div>
                      </div>

                      {/* Input: Name */}
                      <div className="relative group">
                         <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-onzy-orange' : 'text-gray-500'}`}>
                            <User size={20} />
                         </div>
                         <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           onFocus={() => handleFocus('name')}
                           onBlur={handleBlur}
                           required
                           placeholder="Seu nome completo"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-onzy-orange focus:bg-white/10 transition-all duration-300"
                         />
                      </div>

                      {/* Input: Business */}
                      <div className="relative group">
                         <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'business' ? 'text-onzy-orange' : 'text-gray-500'}`}>
                            <Building size={20} />
                         </div>
                         <input
                           type="text"
                           name="business"
                           value={formData.business}
                           onChange={handleChange}
                           onFocus={() => handleFocus('business')}
                           onBlur={handleBlur}
                           required
                           placeholder="Nome da sua empresa"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-onzy-orange focus:bg-white/10 transition-all duration-300"
                         />
                      </div>

                      {/* Input: Phone */}
                      <div className="relative group">
                         <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'phone' ? 'text-onzy-orange' : 'text-gray-500'}`}>
                            <Phone size={20} />
                         </div>
                         <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           onFocus={() => handleFocus('phone')}
                           onBlur={handleBlur}
                           required
                           placeholder="Seu telefone / WhatsApp"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-onzy-orange focus:bg-white/10 transition-all duration-300"
                         />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-onzy-orange to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                         <span className="relative z-10 flex items-center justify-center gap-2">
                            {status === 'loading' ? (
                               <>
                                  <Loader2 size={20} className="animate-spin" />
                                  Enviando...
                               </>
                            ) : (
                               <>
                                  PRÓXIMO 
                                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                               </>
                            )}
                         </span>
                         {/* Button Shine Effect */}
                         <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                      </button>

                   </form>
                )}
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};