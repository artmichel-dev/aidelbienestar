import React, { forwardRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ value, onChange, onSend, loading, placeholder = "Escribe tu duda… pero la culpa es de Calderón.", disabled = false, className = "" }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSend();
    };

    return (
      <form onSubmit={handleSubmit} className={`w-full ${className}`}>
        <div className="flex w-full items-center rounded-3xl shadow-lg border transition-all duration-200 bg-white/10 border-white/10 hover:border-white/20 focus-within:ring-2 focus-within:ring-bozo-accent/60 focus-within:shadow-xl">
          <input
            ref={ref}
            type="text"
            className="flex-1 rounded-3xl px-5 py-4 bg-transparent focus:outline-none text-base sm:text-lg border-none shadow-none focus-visible-outline transition-all duration-200 placeholder-[#d1bc95]/60"
            style={{color: '#d1bc95'}}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            autoFocus
          />
          <button
            type="submit"
            className={`flex items-center justify-center rounded-full transition-colors h-9 w-9 mr-2 bg-bozo-accent text-white disabled:bg-white/20 disabled:text-white/50 ${
              value.trim() && !loading ? 'hover:bg-[#7a0741]' : 'opacity-60'
            }`}
            disabled={disabled || loading || !value.trim()}
            aria-label="Enviar mensaje"
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg" 
                className="icon"
              >
                <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput'; 