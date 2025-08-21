import React from "react";

export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`flex w-full ${role === "user" ? "justify-end" : "justify-start"} py-1 sm:py-2 animate-fade-in`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[90%] sm:max-w-[75%] lg:max-w-[70%] whitespace-pre-line text-base sm:text-lg transition-all duration-200 shadow-lg border
          ${role === "user"
            ? "bg-white/15 font-medium border-white/20 shadow-black/20"
            : "bg-white/5 border-white/10 shadow-black/20"
          }
        `}
        style={{color: '#d1bc95'}}
        role="article"
        aria-label={`Mensaje de ${role === "user" ? "usuario" : "AIdelBienestar"}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            role === "user" 
              ? "bg-emerald-500/20" 
              : "bg-white/10"
          }`}
          style={{color: '#d1bc95'}}>
            {role === "user" ? "Tú" : "AIdelBienestar"}
          </span>
          <span className="text-xs" style={{color: '#d1bc95'}}>
            {new Date().toLocaleTimeString('es-MX', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="break-words leading-relaxed">{content}</div>
      </div>
    </div>
  );
} 