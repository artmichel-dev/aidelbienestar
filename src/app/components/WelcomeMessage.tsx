import React from 'react';
import Image from 'next/image';
import { ChatInput } from './ChatInput';

interface WelcomeMessageProps {
  onSend: () => void;
  input: string;
  onChange: (value: string) => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function WelcomeMessage({ onSend, input, onChange, loading, inputRef }: WelcomeMessageProps) {
  return (
    <div className="px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto">
        <div className="text-center mb-8 animate-fade-in welcome-hero select-none">
          <div className="flex items-center justify-center mb-4 h-auto">
            <Image
              src="/main-bienestar.svg"
              alt="IA del Bienestar"
              width={600}
              height={200}
              priority
              className="w-full h-auto max-w-[280px] sm:max-w-[380px] md:max-w-[520px] welcome-logo"
            />
          </div>
          <p className="text-base sm:text-lg max-w-md" style={{color: '#d1bc95'}}>
            La primera inteligencia artificial creada para el pueblo.
          </p>
        </div>
        
        <div className="w-full max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ChatInput
            ref={inputRef}
            value={input}
            onChange={onChange}
            onSend={onSend}
            loading={loading}
            className="w-full"
          />
        </div>
        
        <div className="mt-6 text-center text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p style={{color: '#d1bc95'}}>La IA que repite discursos, maquilla cifras y siempre tiene otros datos.</p>
        </div>
      </div>
    </div>
  );
} 