import React from 'react';

export type Category = 'Action' | 'Strategy' | 'Adventure' | 'Simulation' | 'Casino';

export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
  category: Category;
}
