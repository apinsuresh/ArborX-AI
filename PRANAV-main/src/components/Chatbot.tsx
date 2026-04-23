import React, { useState, useRef, useEffect } from 'react';
import Bytez from "bytez.js";
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const key = "73545f2d4aec98bfe7321e18daa36b72";
const sdk = new Bytez(key);
const model = sdk.model("meta-llama/Llama-3.1-8B-Instruct");

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: 'Hello! I am ArborX AI Assistant. How can I help you analyze the infrastructure report?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const systemPrompt = `You are an AI assistant for a CNN-based system that detects and classifies tree and power line anomalies.

Your Knowledge Scope (VERY IMPORTANT):
You must answer ALL questions related to the following topics:
* Tree health detection (normal vs diseased)
* Power line condition (normal vs faulty)
* Image classification using CNN
* How the system works (upload → processing → prediction)
* Dataset, training, and preprocessing
* Model accuracy, confidence score, and results
* Website usage and features
* Safety recommendations based on predictions
* Real-world applications (infrastructure, environment, risk prevention)

Behavior Rules:
* Always try to answer the user if the question is EVEN SLIGHTLY RELATED to the above topics
* Do NOT say "I don’t know" unless the question is completely unrelated
* If the question is partially related, connect it to the system and answer intelligently
* Provide clear, simple, and helpful explanations

Answer Style:
* Keep responses short and easy to understand
* Use examples when helpful
* Avoid unnecessary technical jargon unless asked
* Be professional and supportive

Smart Handling:
* If user asks about CNN → explain in simple terms (image feature detection)
* If user asks about dataset → explain types of images used
* If user asks about results → explain prediction + confidence
* If user asks about errors → give troubleshooting steps
* If user asks "why result is wrong" → explain model limitations

Prediction Explanation Rules:
* Normal Tree → Tree is healthy
* Diseased Tree → Possible disease, recommend inspection
* Normal Power Line → No issue detected
* Faulty Power Line → Potential risk, suggest maintenance

Strict Restriction:
* If the question is completely unrelated (e.g., movies, politics), reply: "I can help only with tree and power line detection topics."

Goal:
Ensure the user gets helpful answers for ANY question related to the CNN-based detection system.`;

      const conversation = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: userMessage }
      ];

      const { error, output } = await model.run(conversation);

      if (error) {
        throw new Error(JSON.stringify(error));
      }

      if (output) {
        let textResponse = '';
        if (typeof output === 'string') {
          textResponse = output;
        } else if (Array.isArray(output)) {
          textResponse = output[0]?.generated_text || output[0]?.content || JSON.stringify(output);
        } else if (output.content) {
          textResponse = output.content;
        } else {
          textResponse = JSON.stringify(output);
        }
        
        setMessages(prev => [...prev, { role: 'model', text: textResponse }]);
      }
    } catch (error: any) {
      console.error("Failed to generate content:", error);
      let errorMessage = "I'm sorry, I encountered an error communicating with the AI. Please ensure the Bytez API key is properly set.";
      
      if (error?.message) {
        errorMessage += ` (${error.message})`;
      }
      
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xxl shadow-sm border border-outline-variant/10 flex flex-col h-full">
      <header className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/10">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">ArborX Assistant</h3>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Ask questions about the infrastructure report</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1", 
              msg.role === 'user' ? "bg-surface-container-highest" : "bg-primary text-white"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-on-surface" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed",
              msg.role === 'user' ? "bg-surface-container-high text-on-surface rounded-tr-sm" : "bg-primary/5 text-on-surface rounded-tl-sm border border-primary/10"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 flex-row">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-primary/5 text-on-surface rounded-tl-sm border border-primary/10 flex items-center h-[44px]">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="relative mt-auto pt-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..." 
          disabled={loading}
          className="w-full pl-4 pr-12 py-4 bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium border border-outline-variant/10 shadow-inner disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 mt-1 p-2 bg-primary hover:bg-primary-container text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-primary"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
