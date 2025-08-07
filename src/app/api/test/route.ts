import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        status: "error", 
        message: "API Key no encontrada",
        hasKey: false 
      });
    }
    
    // Verificar formato básico de la clave
    const isValidFormat = apiKey.startsWith('sk-') && apiKey.length > 20;
    
    return NextResponse.json({ 
      status: "success", 
      message: "API Key encontrada",
      hasKey: true,
      isValidFormat,
      keyPreview: `sk-...${apiKey.slice(-4)}`
    });
    
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      message: "Error al verificar configuración",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 