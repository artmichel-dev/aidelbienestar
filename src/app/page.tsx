"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { LoadingMessage } from "./components/LoadingMessage";
import { ErrorMessage } from "./components/ErrorMessage";
import { WelcomeMessage } from "./components/WelcomeMessage";


import { ViewportInitializer } from "./components/ViewportInitializer";
import { useViewport } from "./hooks/useViewport";
import { OperaViewportJSFix } from './components/OperaViewportJSFix';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lang, setLang] = useState("es");
  
  // Usar el hook de viewport dinámico
  const viewport = useViewport();

  useEffect(() => {
    setLang(navigator.language.split("-")[0] || "es");
  }, []);

  // Scroll siempre al fondo cuando hay mensajes nuevos
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Ajustar scroll cuando el viewport cambia (teclado aparece/desaparece)
  useEffect(() => {
    if (chatRef.current && messages.length > 0) {
      // Pequeño delay para asegurar que el DOM se ha actualizado
      setTimeout(() => {
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
      }, 50);
    }
  }, [viewport.height, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setError(null);
    const userMsg: Message = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    
    try {
      const requestBody = {
        messages: [...messages, userMsg],
        lang,
      };
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Error ${res.status}: ${errorData}`);
      }
      
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Error desconocido";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      <OperaViewportJSFix />
      {/* Inicializador del viewport dinámico */}
      <ViewportInitializer />
      
      <div className="flex flex-col h-viewport w-full overflow-hidden viewport-dynamic touch-pan-y">

        
        {/* Header (si lo tienes en layout, puedes quitarlo aquí) */}
        <main className="flex flex-col h-viewport viewport-content">
        {isEmpty ? (
            // Bienvenida: input centrado, footer clásico fijo abajo
            <>
              <div className="flex-1 flex flex-col items-center justify-center">
                <WelcomeMessage
                  onSend={sendMessage}
                  input={input}
                  onChange={setInput}
                  loading={loading}
                  inputRef={inputRef}
                />
              </div>
              {/* Footer clásico, solo en bienvenida */}
              <div className="fixed bottom-0 left-0 w-full z-40 bg-black/20 border-t border-white/10 backdrop-blur-md flex flex-col items-center justify-center px-4 py-2 text-white/80 text-xs sm:text-sm viewport-sticky sm:flex-row sm:gap-4">
                {/* Primera fila en móvil: Logo y nombre con contenido satírico */}
                <div className="flex items-center gap-1 mb-1 sm:mb-0">
                  <span className="font-normal text-sm" style={{color: '#d1bc95'}}>Este sitio es sátira política con fines humorísticos.</span>
                </div>
                
                {/* Segunda fila en móvil: Desarrollador */}
                <div className="flex items-center">
                  <span className="font-normal text-sm mr-1" style={{color: '#d1bc95'}}>Dev:</span>
                  <a href="https://www.artmichel.com/" target="_blank" rel="noopener noreferrer" className="font-semibold transition-all text-sm mr-2" style={{color: '#d1bc95'}}>Art Michel</a>
                  <a href="https://github.com/artmichel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center transition-all" style={{color: '#d1bc95'}} aria-label="GitHub @artmichel-dev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 align-middle" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fade/sombra arriba, siempre visible cuando hay conversación */}
              <div className="pointer-events-none w-full z-20" style={{position: 'relative'}}>
                <div className="absolute top-0 left-0 w-full h-10" style={{background: 'linear-gradient(to bottom, rgba(91,19,41,0.9) 70%, rgba(91,19,41,0))'}} />
              </div>
              {/* Área de mensajes: crecen hacia arriba, scrollable */}
              <div
                className="flex-1 flex flex-col justify-end overflow-y-auto min-h-0 relative"
                style={{ maxHeight: 'calc(var(--viewport-height) - 64px)' }}
                aria-label="Historial del chat"
                ref={chatRef}
              >
                {/* Fade/sombra arriba, ahora sí como gradiente real */}
                                  <div className="pointer-events-none absolute top-0 left-0 w-full z-10"
                     style={{background: 'linear-gradient(to bottom, rgba(91,19,41,0.9) 10%, rgba(91,19,41,0))'}} />
                <div className="w-full px-4 sm:px-6 py-4 space-y-4 min-h-[120px] max-w-2xl mx-auto flex flex-col">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
                  {loading && <LoadingMessage />}
                  {error && <ErrorMessage message={error} />}
                </div>
              </div>
              {/* Input y footer juntos, siempre al fondo, sin sticky ni absolute */}
              <div className="shrink-0 flex flex-col w-full max-w-2xl mx-auto viewport-sticky">
                <div className="w-full flex justify-center items-center gap-0 p-4 bg-transparent">
                  <ChatInput
                    ref={inputRef}
                    value={input}
                    onChange={setInput}
                    onSend={sendMessage}
                    loading={loading}
                    className="max-w-2xl"
                  />
                </div>
                {/* Footer aquí, solo en modo conversación */}
                <div className="w-full flex flex-col items-center justify-center my-2 text-white/80 text-xs sm:text-sm sm:flex-row sm:gap-4">
                  {/* Primera fila en móvil: Logo y nombre con contenido satírico */}
                  <div className="flex items-center gap-1 mb-1 sm:mb-0">
                    <span className="font-normal text-sm" style={{color: '#d1bc95'}}>Este sitio es sátira política con fines humorísticos.</span>
                  </div>
                  
                  {/* Segunda fila en móvil: Desarrollador */}
                  <div className="flex items-center">
                    <span className="font-normal text-sm mr-1" style={{color: '#d1bc95'}}>Dev:</span>
                    <a href="https://www.artmichel.com/" target="_blank" rel="noopener noreferrer" className="font-semibold transition-all text-sm mr-2" style={{color: '#d1bc95'}}>Art Michel</a>
                    <a href="https://github.com/artmichel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center transition-all" style={{color: '#d1bc95'}} aria-label="GitHub @artmichel-dev">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 align-middle" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
          </main>
      </div>
    </>
  );
}
