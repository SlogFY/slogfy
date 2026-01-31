import { useState, useCallback, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import "@/types/speech-recognition.d.ts";

interface UseSlogiAssistantReturn {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;
  startAssistant: () => Promise<void>;
  stopAssistant: () => void;
}

export function useSlogiAssistant(): UseSlogiAssistantReturn {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  
  const recognitionRef = useRef<InstanceType<typeof window.SpeechRecognition> | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isActiveRef = useRef(false);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        console.error("Speech synthesis not supported");
        resolve();
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to get a good English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) 
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const getAIResponse = useCallback(async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/slogi-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      return data.reply || "Sorry, I couldn't process that.";
    } catch (error) {
      console.error("AI response error:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again.";
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = async (event) => {
      const userSpeech = event.results[0][0].transcript;
      setTranscript(userSpeech);
      setIsListening(false);

      // Get AI response
      const aiResponse = await getAIResponse(userSpeech);
      setResponse(aiResponse);

      // Speak the response
      await speak(aiResponse);

      // Continue listening after response (use ref for current value)
      if (isActiveRef.current) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        // Restart listening if no speech detected (use ref)
        if (isActiveRef.current) {
          setTimeout(() => startListening(), 500);
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [getAIResponse, speak]);

  const startAssistant = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsActive(true);
      isActiveRef.current = true;
      
      // Load voices (needed for some browsers)
      window.speechSynthesis.getVoices();
      
      // Greeting
      await speak("Hey! I'm Slogi. How can I help you?");
      
      // Start listening after greeting
      startListening();
    } catch (error) {
      console.error("Failed to start assistant:", error);
      toast({
        title: "Permission Required",
        description: "Please allow microphone access to use the voice assistant.",
        variant: "destructive",
      });
      setIsActive(false);
      isActiveRef.current = false;
    }
  }, [speak, startListening]);

  const stopAssistant = useCallback(() => {
    setIsActive(false);
    isActiveRef.current = false;
    setIsListening(false);
    setIsSpeaking(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return {
    isActive,
    isListening,
    isSpeaking,
    transcript,
    response,
    startAssistant,
    stopAssistant,
  };
}
