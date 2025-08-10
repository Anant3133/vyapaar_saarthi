import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed top-6 left-6 z-50 ${className}`}
    >
      <Button
        variant="outline"
        onClick={onClick}
        className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-200 shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {label}
      </Button>
    </motion.div>
  );
}