
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../../types';
import Card from '../../components/ui/card/Card';
import Avatar from '../../components/ui/avatar/Avatar';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/loading/Spinner';

const AIChatAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // NOTE: This is a mock API call for demonstration.
            // Replace with your actual Gemini API call.
            // Ensure you have set up your API key in the environment.
            // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            // const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: input });
            // const modelResponse = response.text;

            // Mock response:
            await new Promise(resolve => setTimeout(resolve, 1500));
            const modelResponse = `This is a mocked response for: "${input}". In a real application, this would be a generated response from the Gemini API.`;

            const modelMessage: ChatMessage = { role: 'model', content: modelResponse };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 flex justify-center">
            <Card className="w-full max-w-2xl h-[calc(100vh-120px)] flex flex-col">
                <Card.Header>
                    <h2 className="font-semibold text-lg">AI Chat Assistant</h2>
                </Card.Header>
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <Avatar name="AI" size="sm" />}
                            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-900'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3">
                            <Avatar name="AI" size="sm" />
                            <div className="max-w-md p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900">
                                <Spinner size="sm" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t dark:border-neutral-800">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="w-full pl-4 pr-4 py-2 border rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <i className="bi bi-send-fill"></i>
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AIChatAssistant;
