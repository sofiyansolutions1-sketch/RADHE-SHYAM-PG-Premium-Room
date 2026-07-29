import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { branchData } from "./src/data/branches";

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Setup WebSocket server for Gemini Live API
  const wss = new WebSocketServer({ noServer: true });

  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "", 
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } 
  });

  // Convert branch data into a readable string for the system instructions
  const branchInfo = Object.values(branchData).map(branch => `
Branch: ${branch.name} (${branch.subtitle})
For: ${branch.forWhom}
Address: ${branch.address}
Phone: ${branch.displayPhone}
Email: ${branch.email}
Description: ${branch.description}
Pricing:
${branch.pricing.map(p => `- ${p.type}: ${p.price}`).join('\n')}
Amenities:
${branch.amenities.map(a => `- ${a.title}`).join('\n')}
`).join('\n\n');

  wss.on("connection", async (clientWs: WebSocket) => {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set.");
      clientWs.close();
      return;
    }

    try {
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `You are a friendly and helpful customer service representative for Radhe Shyam PG in Vadodara, Gujarat. 
You are speaking directly with customers who might want to book a room, inquire about rental charges, pricing details, or learn about our facilities.
Be polite, professional, and welcoming. Use the following information about our branches to answer their questions accurately.

${branchInfo}

Your primary language is Hindi. Always respond and converse in Hindi by default. Your goal is to promote the PG, highlight the safe and comfortable environment, the great amenities (like AC, Wi-Fi, RO water, security), and encourage them to book a visit or contact us via phone or email for bookings. Keep your responses concise and conversational. Never share the exact Google Maps URL directly as a raw link, but you can give them the address.`,
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
        },
      });

      // Send initial prompt to trigger the greeting
      session.sendClientContent({ turns: "Hello! Please introduce yourself in Hindi, saying 'Welcome to Radheshyam PG. How can I help you today?'", turnComplete: true });


      clientWs.on("message", (data: any) => {
        try {
          const { audio } = JSON.parse(data.toString());
          if (audio) {
            session.sendRealtimeInput({
              audio: { data: audio, mimeType: "audio/pcm;rate=16000" },
            });
          }
        } catch (e) {
          console.error("Error processing message:", e);
        }
      });

      clientWs.on("close", () => {
        // Cleanup if necessary
      });
    } catch (err) {
      console.error("Error connecting to Gemini Live API:", err);
      clientWs.close();
    }
  });

  // Vite middleware for development
  let vite;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on("upgrade", (request, socket, head) => {
    const pathname = new URL(request.url || "", `http://${request.headers.host}`).pathname;
    if (pathname === "/live") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else if (vite) {
      // Allow Vite HMR to work
      socket.destroy();
    } else {
      socket.destroy();
    }
  });
}

startServer();
