"use client";

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface CustomToastProps {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export function CustomToast({ 
  id, 
  type, 
  title, 
  description, 
  duration = 3000, 
  onClose 
}: CustomToastProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 10);

    // Progress bar animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining <= 0) {
        clearInterval(progressInterval);
        handleClose();
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Wait for exit animation
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-white" />;
      case 'info':
        return <Info className="w-5 h-5 text-white" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-white" />;
      default:
        return <CheckCircle className="w-5 h-5 text-white" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'info':
        return 'bg-emerald-600'; // Changed from blue to emerald
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-emerald-500';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-300';
      case 'info':
        return 'bg-emerald-400'; // Changed from blue to emerald
      case 'error':
        return 'bg-red-300';
      default:
        return 'bg-emerald-300';
    }
  };

  return (
    <div
      className={`
        fixed top-20 right-4 z-50 min-w-[300px] max-w-[400px] rounded-lg shadow-lg overflow-hidden
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getBackgroundColor()}
      `}
    >
      {/* Progress Bar */}
      <div className="h-1 bg-black bg-opacity-20">
        <div
          className={`h-full transition-all duration-75 ease-linear ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="p-4 text-white">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">
              {title}
            </p>
            {description && (
              <p className="text-sm text-white text-opacity-90 mt-1">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="flex-shrink-0 h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}