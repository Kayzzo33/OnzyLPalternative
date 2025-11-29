import React from 'react';

export enum PageRoute {
  HOME = 'home',
  GROWTH_ENGINE = 'growth-engine'
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CaseStudy {
  title: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}