import React from 'react';
import { LocationIcon } from './icons/LocationIcon';
import { PlateIcon } from './icons/PlateIcon';
import { UtensilsIcon } from './icons/UtensilsIcon';
import { GlassIcon } from './icons/GlassIcon';
import { GenericItemIcon } from './icons/GenericItemIcon';

interface StepVisualizerProps {
  step: string;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({ step }) => {
  const lowerCaseStep = step.toLowerCase();
  
  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = GenericItemIcon;
  let theme = {
    wrapper: 'bg-slate-700',
    iconColor: 'text-indigo-300'
  };

  if (lowerCaseStep.startsWith('pergi ke')) {
    IconComponent = LocationIcon;
    theme = { wrapper: 'bg-blue-500/20', iconColor: 'text-blue-400' };
  } else if (lowerCaseStep.startsWith('ambil')) {
    theme = { wrapper: 'bg-green-500/20', iconColor: 'text-green-400' };
    if (lowerCaseStep.includes('piring')) {
      IconComponent = PlateIcon;
    } else if (lowerCaseStep.includes('sendok') || lowerCaseStep.includes('garpu')) {
      IconComponent = UtensilsIcon;
    } else if (lowerCaseStep.includes('gelas')) {
      IconComponent = GlassIcon;
    }
  } else if (lowerCaseStep.startsWith('taruh')) {
    theme = { wrapper: 'bg-yellow-500/20', iconColor: 'text-yellow-400' };
    if (lowerCaseStep.includes('piring')) {
      IconComponent = PlateIcon;
    } else if (lowerCaseStep.includes('sendok') || lowerCaseStep.includes('garpu')) {
      IconComponent = UtensilsIcon;
    } else if (lowerCaseStep.includes('gelas')) {
      IconComponent = GlassIcon;
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <div 
        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${theme.wrapper}`} 
        aria-hidden="true"
      >
        <IconComponent className={`h-5 w-5 transition-colors duration-300 ${theme.iconColor}`} />
      </div>
      <span className="font-mono text-slate-200 tracking-tight">{step}</span>
    </div>
  );
};