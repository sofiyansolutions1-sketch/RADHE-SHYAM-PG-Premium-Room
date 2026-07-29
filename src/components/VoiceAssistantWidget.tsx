import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Loader2, Bot, X } from 'lucide-react';

export default function VoiceAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  
  const nextPlayTimeRef = useRef<number>(0);

  const startSession = async () => {
    if (isRecording || isConnecting) return;
    try {
      setError('');
      setIsConnecting(true);
      
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnecting(false);
        setIsRecording(true);
        
        // Input: 16kHz for mic capture
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        inputAudioCtxRef.current = inputCtx;
        
        // Output: 24kHz for model output playback
        const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        outputAudioCtxRef.current = outputCtx;
        nextPlayTimeRef.current = outputCtx.currentTime;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        
        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const base64 = pcmToBase64(inputData);
            ws.send(JSON.stringify({ audio: base64 }));
          }
        };
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.audio) {
          playAudioChunk(msg.audio);
        }
        if (msg.interrupted) {
          nextPlayTimeRef.current = outputAudioCtxRef.current?.currentTime || 0;
        }
      };

      ws.onerror = () => {
        setError('Connection error. Please try again.');
        stopSession();
      };
      
      ws.onclose = () => {
        stopSession();
      };
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to start voice assistant');
      setIsConnecting(false);
      stopSession();
    }
  };

  const pcmToBase64 = (float32Array: Float32Array) => {
    let l = float32Array.length;
    const buf = new Int16Array(l);
    while (l--) {
      let s = Math.max(-1, Math.min(1, float32Array[l]));
      buf[l] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const buffer = new Uint8Array(buf.buffer);
    let binary = '';
    for (let i = 0; i < buffer.byteLength; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  };

  const playAudioChunk = (base64Audio: string) => {
    const outputCtx = outputAudioCtxRef.current;
    if (!outputCtx) return;

    const binaryString = window.atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Int16Array -> Float32Array
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
    }

    const audioBuffer = outputCtx.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);
    
    const source = outputCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputCtx.destination);
    
    let startTime = nextPlayTimeRef.current;
    if (startTime < outputCtx.currentTime) {
      startTime = outputCtx.currentTime;
    }
    source.start(startTime);
    nextPlayTimeRef.current = startTime + audioBuffer.duration;
  };

  const stopSession = () => {
    setIsRecording(false);
    setIsConnecting(false);
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const toggleAssistant = () => {
    if (isRecording || isConnecting) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAssistant}
        disabled={isConnecting}
        className={`${isRecording ? 'bg-red-500 text-white' : 'bg-white text-violet-900'} p-3 rounded-full shadow-lg hover:shadow-xl transition-colors border ${isRecording ? 'border-red-500' : 'border-gray-100'} flex items-center justify-center relative z-50`}
        aria-label={isRecording ? "Stop Voice Assistant" : "Start Voice Assistant"}
      >
        {!isRecording && !isConnecting && <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full blur opacity-40 animate-pulse"></div>}
        {isRecording && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>}
        
        {isConnecting ? (
          <Loader2 className="w-6 h-6 relative z-10 animate-spin" />
        ) : isRecording ? (
          <Mic className="w-6 h-6 relative z-10" />
        ) : (
          <Bot className="w-6 h-6 relative z-10" />
        )}
      </motion.button>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-16 right-0 bg-white text-red-500 p-3 rounded-xl shadow-lg border border-red-100 text-sm min-w-48 whitespace-nowrap z-50"
        >
           {error}
        </motion.div>
      )}
    </div>
  );
}
