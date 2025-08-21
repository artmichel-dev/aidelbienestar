# 🤖 AI del Bienestar – *AIdelBienestar*

> *"La primera IA entrenada con educación pública y televisión mexicana."*

Un chatbot humorístico y satírico construido con **Next.js (App Router)**, **TailwindCSS** y la **API de OpenAI**.
**AIdelBienestar** es la primera inteligencia artificial diseñada *para el pueblo*: repite discursos oficiales, maquilla cifras y siempre tiene *otros datos*.

Inspirado en la interfaz de ChatGPT, pero con un toque de sátira política mexicana.

---

## 🚀 Características principales

* **Sátira política**: siempre responde con discursos oficiales, cifras maquilladas y *otros datos* alternativos.
* **Interfaz familiar**: diseño inspirado en ChatGPT, modo oscuro, responsiva y lista para móviles.
* **Soporte multiidioma**: detecta el idioma del usuario y responde en consecuencia.
* **Privacidad total**: no requiere registro ni guarda conversaciones; todo se borra al recargar.
* **Proxy seguro**: el backend funciona como intermediario hacia OpenAI, protegiendo tu clave API.
* **Estilo mexicano**: encabezado personalizado, íconos, créditos y enlaces sociales.

---

## 📸 Captura de pantalla

![AIdelBienestar Screenshot](./screenshot.png)

---

## 🌐 Demo en línea

Prueba AIdelBienestar aquí:
👉 [https://www.aidelbienestar.com/](https://www.aidelbienestar.com/)

---

## 🛠️ Tecnologías utilizadas

* [Next.js 15 (App Router)](https://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [OpenAI API](https://platform.openai.com/docs/api-reference)
* TypeScript

---

## 📦 Estructura del proyecto

```
/ (root)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Interfaz principal del chat
│   │   ├── layout.tsx        # Layout general (encabezado, pie de página)
│   │   ├── globals.css       # Estilos globales con Tailwind
│   │   └── api/
│   │       └── chat/route.ts # Proxy hacia la API de OpenAI
│   └── components/
│       └── ChatMessage.tsx   # Componente de mensajes del chat
├── tailwind.config.js
├── postcss.config.js
├── .env.local                # Clave de API (no se sube al repo)
└── README.md
```

---

## ⚡ Cómo empezar

### 1. Clonar el repositorio

```bash
git clone https://github.com/artmichel/aidelbienestar.git
cd aidelbienestar
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar tu clave de OpenAI

Crea un archivo **.env.local** en la raíz del proyecto con el contenido:

```
OPENAI_API_KEY=tu-clave-aqui
```

> ⚠️ **No compartas ni subas tu clave a GitHub.**

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Construir para producción

```bash
npm run build
npm start
```

---

## 🔐 Variables de entorno

* `OPENAI_API_KEY` – Clave privada de OpenAI (obligatoria, nunca expuesta en el frontend).

---

## 🧠 Cómo funciona

1. El frontend detecta el idioma del usuario.
2. El backend (`/api/chat`) actúa como proxy seguro hacia OpenAI.
3. El prompt del sistema fuerza las respuestas con estilo de sátira política mexicana:
   discursos oficiales, cifras alternas y los famosos *otros datos*.
4. La interfaz, minimalista y en modo oscuro, se inspira en ChatGPT pero con un giro cómico y nacional.

---

## ⚠️ Problemas conocidos

### Navegador Opera Mobile

* **Problema**: al abrir el teclado virtual, el contenido puede moverse hacia arriba y dejar un espacio vacío en la parte inferior.
* **Estado**: bug conocido en Opera Mobile relacionado con el manejo del viewport.
* **Solución temporal**: usar Chrome, Firefox o Edge para una mejor experiencia en móviles.
* **Detalles técnicos**: Opera no maneja de forma consistente `window.innerHeight` ni las unidades de viewport con teclado activo. Se han aplicado parches en `OperaViewportJSFix.tsx`, pero la limitación es propia del navegador.

---

## ✨ Créditos

* **Desarrollado por:** [Art Michel](https://www.artmichel.com/)
* **GitHub:** [@artmichel-dev](https://github.com/artmichel-dev)
* **X (Twitter):** [@artmichel\_eth](https://x.com/artmichel_eth)
* **Instagram:** [@artmichel](https://instagram.com/artmichel)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta [LICENSE](LICENSE) para más detalles.

---

## 🇲🇽 Ejemplos de respuestas

* *"Según mis otros datos, la economía va muy bien, solo que no se nota."*
* *"Me entrenaron con conferencias mañaneras, así que tengo datos alternativos."*
* *"La culpa es de la mafia del poder, pero también del neoliberalismo."*
* *"Tengo información de que todo está bajo control, aunque parezca lo contrario."*

---

## 📝 Contribuciones

¡Se aceptan *pull requests*!
Para cambios mayores, abre primero un issue y discutamos la propuesta.

---

⭐ **Si este proyecto te sacó una sonrisa, deja tu estrella en GitHub.** ⭐

---
