import React, { useEffect, useRef } from 'react';
import type { ModalState } from '../types';

interface ModalProps extends ModalState {
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, isConfirm, onConfirm, onCancel }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements?.[0];
            const lastElement = focusableElements?.[focusableElements.length - 1];

            firstElement?.focus();

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (!modalRef.current?.contains(document.activeElement)) {
                    firstElement?.focus();
                    return;
                }

                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement?.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement?.focus();
                        e.preventDefault();
                    }
                }
            };

            const handleEscapeKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onCancel();
                }
            }

            document.addEventListener('keydown', handleTabKey);
            document.addEventListener('keydown', handleEscapeKey);

            return () => {
                document.removeEventListener('keydown', handleTabKey);
                document.removeEventListener('keydown', handleEscapeKey);
                previouslyFocusedElement.current?.focus();
            };
        }
    }, [isOpen, onCancel]);
    
    const handleConfirm = () => {
        if(onConfirm) {
            onConfirm();
        } else {
            onCancel();
        }
    };
    
    if (!isOpen) return null;

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-enter"
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="modal-dialog bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-title" className="sr-only">
                    {isConfirm ? "Confirmation" : "Notification"}
                </h2>
                <p className="text-slate-700 dark:text-slate-200 text-lg mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button onClick={handleConfirm} className="bg-brand text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand/90 dark:hover:bg-brand-light/90">
                        {isConfirm ? 'Confirm' : 'OK'}
                    </button>
                    {isConfirm && (
                         <button onClick={onCancel} className="bg-slate-200 text-slate-700 font-semibold py-2 px-6 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;