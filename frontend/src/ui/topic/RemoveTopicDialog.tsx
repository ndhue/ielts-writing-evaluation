"use client";
import { Button } from "@/components";
import { useEffect, useRef } from "react";

interface RemoveTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  topicTitle: string;
}

const RemoveTopicDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  isLoading,
  topicTitle 
}: RemoveTopicDialogProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current === e.target && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling when dialog is open
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50" 
      />
      <div className="relative z-10 max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Remove Topic</h2>
        <p className="text-slate-600 mb-6">
          Are you sure you want to remove the topic &quot;{topicTitle.substring(0, 50)}...&quot;? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-4">
          <Button 
            variant="secondary"
            label="Cancel"
            onClick={onClose}
            className="border border-slate-300 text-slate-700"
            disabled={isLoading}
            type="button"
          />
          <Button 
            variant="primary"
            label={isLoading ? "Removing..." : "Remove"}
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default RemoveTopicDialog;
