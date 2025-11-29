import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'white';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-8 py-3.5 rounded-full font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base";
  
  const variants = {
    primary: "bg-onzy-orange text-white hover:bg-onzy-orangeLight shadow-[0_4px_20px_rgba(255,85,0,0.4)] hover:shadow-[0_4px_25px_rgba(255,85,0,0.6)]",
    secondary: "bg-white text-black border border-gray-200 hover:border-onzy-orange hover:text-onzy-orange",
    dark: "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20",
    outline: "border border-black/10 hover:border-black text-black bg-transparent",
    white: "bg-white text-onzy-orange hover:bg-gray-100 shadow-lg font-bold"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};