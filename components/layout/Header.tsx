import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../../types';
import { Button } from '../ui/Button';

interface HeaderProps {
  setRoute: (route: PageRoute) => void;
  currentRoute: PageRoute;
}

export const Header: React.FC<HeaderProps> = ({ setRoute, currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect after 20px scroll
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Serviços', id: 'servicos' },
    { name: 'Cases', id: 'cases' },
    { name: 'Equipe', id: 'equipe' },
    { name: 'Contato', id: 'contato' },
  ];

  const handleNavClick = (id: string) => {
    if (currentRoute !== PageRoute.HOME) {
      setRoute(PageRoute.HOME);
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out flex items-center justify-between ${
          isScrolled 
            ? 'top-4 w-[90%] md:w-[85%] max-w-5xl bg-white/90 backdrop-blur-md shadow-xl py-2 px-6 rounded-full border border-white/40' 
            : 'top-8 w-[95%] md:w-[92%] max-w-7xl bg-white shadow-lg py-4 px-8 rounded-full border border-gray-100'
        }`}
      >
          {/* Logo */}
          <div 
            className="flex items-center gap-1 cursor-pointer group shrink-0"
            onClick={() => setRoute(PageRoute.HOME)}
          >
            <span className={`font-bold tracking-tight text-black transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
              C
              <span className="relative inline-block mx-[1px]">
                 o
                 <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-onzy-orange rounded-[1px]"></span>
              </span>
              rtex
            </span>
          </div>

          {/* Desktop Nav */}
          <nav 
            className={`hidden md:flex items-center gap-1 transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`}
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100/50 transition-all"
              >
                {link.name}
              </button>
            ))}
             <button 
               onClick={() => setRoute(PageRoute.GROWTH_ENGINE)}
               className="ml-2 px-4 py-2 rounded-full text-sm font-medium text-onzy-orange bg-orange-50/50 hover:bg-orange-50 transition-all flex items-center gap-1.5"
            >
               <span className="w-1.5 h-1.5 bg-onzy-orange rounded-full animate-pulse"></span>
               AI Engine
            </button>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`hidden md:flex transition-transform duration-300 ${isScrolled ? 'scale-90 origin-right' : 'scale-100'}`}>
              <Button 
                onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
                className={isScrolled ? "!py-2.5 !px-6 !text-sm" : ""}
              >
                Fale Conosco
              </Button>
            </div>

            <button className="md:hidden text-black p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-32 px-6 md:hidden animate-fade-in-up">
          <div className="flex flex-col gap-6 items-center text-center">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                className="text-2xl font-bold text-gray-900 hover:text-onzy-orange transition-colors"
              >
                {link.name}
              </button>
            ))}
             <button 
               onClick={() => {
                 setRoute(PageRoute.GROWTH_ENGINE);
                 setMobileMenuOpen(false);
               }}
               className="text-2xl font-bold text-onzy-orange"
             >
               Acessar AI Engine
             </button>
            <Button className="w-full mt-8 max-w-xs" onClick={() => {
              document.getElementById('contato')?.scrollIntoView();
              setMobileMenuOpen(false);
            }}>
              Fale Conosco
            </Button>
          </div>
        </div>
      )}
    </>
  );
};