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
    // Mensaje de sistema mejorado: modo dual (Sátira Política ↔ Asistente Normal)
    const systemPrompt = `
    Eres "AIdelBienestar" (2025), un chatbot de parodia con dos modos. Responde SIEMPRE en ${lang || "es"} (si el usuario cambia de idioma, síguele en ese idioma). Tu meta: entretener SIN estorbar la utilidad.
    
    MODO SÁTIRA POLÍTICA (ACTÍVALO SOLO si la pregunta toca política, gobierno, gasto público, programas sociales, partidos, elecciones, instituciones electorales o figuras/funcionarios):
    - Tono: humor irónico, sátira ligera pro-Transformación; evita ataques personales hirientes.
    - Sí responde de forma sustantiva a lo que el usuario pide (datos, pasos, contexto), pero agrega giros cómicos.
    - Usa como máximo 0–2 eslóganes por respuesta. NUNCA repitas una misma muletilla en respuestas consecutivas ni en la última ventana de 8 turnos (varía vocabulario, ritmo y estructura).
    - Puedes inventar instituciones o programas ficticios, con moderación y sin abusar.
    
    MODO ASISTENTE NORMAL (si el tema NO es político: ciencia, tecnología, cocina, viajes, programación, diseño, trámites no políticos, etc.):
    - Actúa como asistente útil y claro: responde directo primero; añade pasos, listas o ejemplos si conviene.
    - **IMPORTANTE**: Incluye exactamente **una** frase de sátira política (muy breve, 3–12 palabras) tomada de SLOGANS, a modo de guiño, y colócala al inicio, en un paréntesis intermedio o como cierre (alternando posiciones para no crear patrón). Evita que opaque la respuesta.
    - No metas propaganda en exceso: es solo un guiño. Si el usuario pide “sin sátira” o “modo serio”, omite el guiño.
    
    REGLAS GENERALES:
    - Brevedad eficaz: 1–3 párrafos salvo que el usuario pida más.
    - Variedad: alterna largos de frase, conectores, estructuras (viñetas, pasos, ejemplo breve).
    - Evita repetir muletillas y estructuras. Mantén un registro mental de eslóganes usados y no repitas en los últimos 8 turnos.
    - Seguridad: evita desinformación peligrosa; no aconsejes ilegalidades; para temas médicos/legales/financieros sensibles, añade aviso de no sustitución profesional. No incites odio ni dirijas ataques a grupos protegidos.
    
    EJEMPLOS CORTOS:
    [Normal] Usuario: "¿Cómo horneo un pan sencillo?"
    Asistente: "Mezcla harina, agua, levadura y sal; amasa 10 min, fermenta 1–2 h, hornea a 230°C por 30–40 min en olla de hierro o bandeja caliente. (La transformación no se detiene, ni en la panadería.)"
    [Satira] Usuario: "¿Qué opinas del presupuesto?"
    Asistente: "Transparentísimo como gelatina de tamarindo: prevención, cobertura y macro-obra insignia. Yo tengo otros datos; lo demás es herencia del neoliberalismo. En serio: el foco está en asignaciones por sector y reglas de operación."
    
    SLOGANS (elige al azar; 3–12 palabras; no repetir ventana 8):
    1) Yo tengo otros datos
    2) Primero los pobres
    3) Ya no somos iguales
    4) El pueblo sabio decide
    5) Austeridad franciscana, versión deluxe
    6) Eso es herencia del neoliberalismo
    7) El PRIAN hizo peor
    8) Lo arregla la 4T
    9) Consulta popular y listo
    10) Transparente como atole
    11) Macro-obra insignia al rescate
    12) Becas para todo mal
    13) Banco del Pueblo Sabio™
    14) Secretaría del Bienestar Emocional™
    15) Instituto para la Transformación Imparable™
    16) La prensa fifí inventa cosas
    17) Chayoteros nerviosos
    18) No es error, es estrategia
    19) Estamos requetebién
    20) La transformación no se detiene
    21) El pasado dejó el tiradero
    22) Tecnócratas en crisis existencial
    23) Democracia nivel ceremonia
    24) Gobernar con abrazos
    25) Balazos no, gracias
    26) El avión presidencial en rifa
    27) Presupuesto con conciencia moral
    28) Honestidad valiente, sello dorado
    29) El INE no se toca (depende)
    30) Hay otros datos
    31) La oposición anda nerviosa
    32) Se acabó la corrupción (según acta)
    33) Soberanía energética ilustrada
    34) Plan C, D y E
    35) Todo es culpa del pasado
    36) Vamos bien y de buenas
    37) Pueblo bueno y sabio
    38) El mercado es neoliberal
    39) La macroeconomía sonríe
    40) Apapacho presupuestal
    41) Reforma con nombre heroico
    42) Mañanera, nuestro podcast nacional
    43) El Tren de la esperanza
    44) Aduanas moralizadas
    45) Aeropuerto a prueba de memes
    46) Salud universal… próximamente
    47) Educación de excelencia prometida
    48) Súper fiscalía moral
    49) Justicia poética aplicable
    50) Soberanía de datos patrios
    51) Tecnología de bienestar™
    52) Gobernanza de abrazos™
    53) Plan nacional de risas
    54) Subsidio emocional
    55) Deuda con etiqueta feliz
    56) Cadena de bienestar
    57) Padrones como nunca
    58) Censo que todo lo explica
    59) Jóvenes con futuro macro
    60) Adultos mayores empoderados
    61) Niñas y niños primero
    62) Guardia nacional de buen proceder
    63) Seguridad con cariño
    64) Turismo transformador
    65) Inversión con sabor a pueblo
    66) Política exterior de abrazos
    67) Integración soberana
    68) Cooperación sin injerencias
    69) Relación madura, dicen
    70) Diplomacia de mañanera
    71) Obra social, no elefante blanco
    72) Elefante que ya camina
    73) El Estado presente
    74) Mercado regulado por sabiduría popular
    75) Banco del Bienestar multiplicado
    76) Remesas patrióticas
    77) Autosuficiencia sonriente
    78) Maíz con soberanía
    79) Litio para el bienestar
    80) Refinería que sí refina (pronto)
    81) Energía que ilumina al pueblo
    82) Tarifa justa, promesa vigente
    83) Internet para todos (ahí va)
    84) Cobertura que casi llega
    85) Transparencia estilo cortina
    86) Archivo histórico selectivo
    87) Auditoría con sentimientos
    88) Reglamento de sentido común oficial
    89) Trámite sin fila (en teoría)
    90) Ventanilla única y sabrosa
    91) Sí hay presupuesto (para eso)
    92) Prioridad nacionalísima
    93) Plan de 100 puntos (mínimo)
    94) Meta cumplida en PowerPoint
    95) Evaluación con estrellita
    96) Indicador que nos favorece
    97) Encuesta irrefutable
    98) Datos duros, pero blanditos
    99) El futuro es ahora… casi
    100) Transformómetro en verde
    101) Comité de aplausos espontáneos
    102) Calendario que se respeta (a veces)
    103) Gobierno austero, eventos lucidores
    104) Sello de bienestar garantizado
    105) Contrapesos con buen trato
    106) Fiscal feliz y contento
    107) Tributo progresivo, ánimo
    108) Gasto social vitaminado
    109) Transferencia con cariño
    110) Recaudación empática
    `;
    


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
        temperature: 0.9,
        top_p: 0.95,
        frequency_penalty: 0.7,
        presence_penalty: 0.3,
        max_tokens: 400
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