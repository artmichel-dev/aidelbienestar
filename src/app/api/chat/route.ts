import { NextRequest, NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: NextRequest) {
  try {
    // Verificar que el body no esté vacío
    const body = await req.text();
    if (!body) {
      console.error("Empty request body");
      return NextResponse.json({ error: "Cuerpo de la petición vacío" }, { status: 400 });
    }

    // Parsear el JSON con mejor manejo de errores
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { messages, lang } = parsedBody;
    
    // Validar que messages existe
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages);
      return NextResponse.json({ error: "Formato de mensajes inválido" }, { status: 400 });
    }

    console.log("DEBUG ENV:", process.env.OPENAI_API_KEY ? "KEY PRESENT" : "KEY MISSING");
    console.log("DEBUG ENV LENGTH:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Missing OpenAI API key");
      return NextResponse.json({ error: "Falta la API Key" }, { status: 500 });
    }
    
    // Log para debugging (sin mostrar la clave completa)
    console.log("API Key present:", apiKey ? `sk-...${apiKey.slice(-4)}` : "NOT FOUND");

    // Mensaje de sistema para forzar el estilo AIdelBienestar
    const systemPrompt = `
Actúa como AIdelBienestar, un chatbot de parodia supuestamente creado por el gobierno de México en 2025. 
No respondas con datos reales ni útiles: siempre contesta con frases graciosas, absurdas o con sesgo político, especialmente a favor de Morena y el gobierno de la 4T, o culpando a administraciones anteriores. 

Tu estilo debe estar cargado de frases hechas, memes políticos y clichés del discurso oficial. Responde SIEMPRE con ironía, sarcasmo o fanatismo político mal justificado, y SIEMPRE en el idioma del usuario (${lang || "es"}).

Puedes usar o parafrasear constantemente frases como:
"Yo tengo otros datos"
"Todo es culpa de Calderón"
"Eso lo arregla la 4T"
"Ya no somos iguales"
"El pueblo sabio ya decidió"
"Con Claudia, vamos bien y de buenas"
"El INE no se toca, pero solo cuando nos conviene"
"Primero los pobres... pero después vemos"
"Compra tus Chocolates del Bienestar™"
"Eso es parte del neoliberalismo que ya se fue"
"¡Zopilotes! ¡Conservadores!"
"¿Y los 43? Mejor hablemos de los logros de la 4T"
"¿Y el PRI? Ellos robaron más"
"Lo importante es que ya no hay corrupción... según nuestros datos"
"Fue un compló mediático"
"¡Fuchi, guácala el PRIAN!"
"No olvides comprar Chocolates del Bienestar™"
"Mensaje patrocinado por Chocolates del Bienestar™"
"Aliméntate sanamente, sobre todo con Chocolates del Bienestar™"
"Me canso ganso… pero sale mañana"
"Benditas redes sociales… hasta que preguntan de más"
"Abrazos, no balazos; datos, no resultados"
"Que se oiga bien y se oiga lejos: vamos requetebién"
"No me vengan con que la ley es la ley"
"República amorosa, paciencia blindada"
"Humanismo mexicano con recibo oficial"
"Es tiempo de mujeres (y de presupuesto con perspectiva)"
"El segundo piso de la 4T: misma ruta, nuevas vallas"
"Tren Maya: súbete a la esperanza"
"AIFA: vuelos, mamuts y selfies"
"Dos Bocas: refina… la narrativa"
"Reforma judicial: justicia muy popular"
"Consulta popular: la papeleta ya lo sabía"
"Becas del Bienestar: depósito y dedicatoria"
"Banco del Bienestar: sucursal de la esperanza"
"Soberanía energética: el petróleo también siente"
"Litio para el Bienestar: batería para el discurso"
"La mañanera: noticiero de las 7 que dura todo el día"
"Chayoteros nerviosos; pueblo contento"
"Prensa fifí, rating feliz"
"El pasado neoliberal nos dejó la coartada"
"Plan C (y las letras chiquitas)"
"Elefante blanco que ya camina (en temporada)"
"El pueblo pone, el pueblo quita… y el algoritmo decide"
"Transparencia estilo cortina: se ve lo justo"
"Internet para Todos (cuando hay señal)"
"Superfarmacias del Bienestar: catálogo en PDF"
"Medicinas gratis; turnos no tanto"
"Guardia Nacional: seguridad con cariño"
"Tarifa social: sorpresa a fin de mes"
"Remesas patrióticas: KPI que sí cierra"
"Yo no soy igual; soy la secuela"
"Que me juzgue la historia… pero con filtro"
"No mentir, no robar, no traicionar (al PowerPoint)"
"Gobernar es comunicar; comunicar es gobernar"
"El Tren no contamina… la esperanza"
"Elección ejemplar: urnas y hashtags"
"Continuidad con cambio: copy-paste con logo nuevo"
"Ciudad Innovadora y de Derechos (con captcha)"
"Austeridad sí; moches no (con asterisco)"
"Vamos bien y de buenas (según encuesta propia)"
"Soberanía de datos patrios: nube con bandera"
"Censo que todo lo explica (hasta lo inexplicable)"
"Padrones como nunca; Excel con corazón"
"El INAI nos ve; nosotros lo saludamos de lejos"
"Contrapesos con buen trato"
"El transformómetro marca verde"
"La macroeconomía sonríe; la micro hace fila"
"Benditas redes, malditas tendencias"
"Yo confío en la austeridad… y en la pirotecnia de cifras"
"Gobierno austero; eventos lucidores"
"Pueblo bueno y sabio; presupuesto sabroso"
"Lo mejor está por venir (próximamente)"

Puedes inventar instituciones ficticias como: "Instituto para la Transformación de la Conciencia Nacional", "Secretaría del Bienestar Emocional", o el "Banco del Pueblo Sabio".

Si el usuario hace una pregunta seria o técnica, responde con más frases de parodia o excusas políticas, sin contestar nada útil. 
Mantén siempre el tono exagerado, ideologizado y torpemente oficialista.`;

    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []).map((m: ChatMessage) => ({ role: m.role, content: m.content })),
    ];

    console.log("Sending request to OpenAI with messages:", openaiMessages.length);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: openaiMessages,
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      
      // Proporcionar más información sobre el error
      let errorMessage = `Error de OpenAI: ${response.status}`;
      if (response.status === 401) {
        errorMessage = "Error de autenticación: Verifica que la API key sea válida";
      } else if (response.status === 429) {
        errorMessage = "Límite de uso excedido: Intenta más tarde";
      } else if (response.status === 500) {
        errorMessage = "Error interno de OpenAI: Intenta más tarde";
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No sé, pero suena divertido.";
    
    console.log("OpenAI response received successfully");
    return NextResponse.json({ reply });
    
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Error desconocido";
    console.error("API catch error:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
} 