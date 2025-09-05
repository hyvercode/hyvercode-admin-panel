import React, { useState, useRef, useEffect } from 'react';
// FIX: Use a static import for GoogleGenAI and its type.
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Avatar from '../../components/ui/avatar/Avatar';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/loading/Spinner';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../contexts/AuthContext';

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const { user } = useAuth();
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <div className="flex items-end gap-2 justify-end">
                <div className="max-w-xs md:max-w-md p-3 bg-primary text-white self-end rounded-l-lg rounded-br-lg">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <Avatar name={user?.name || 'You'} size="sm" />
            </div>
        );
    }

    return (
        <div className="flex items-end gap-2 justify-start">
            <Avatar name="AI" size="sm" src="/favicon.svg" />
            <div className="max-w-xs md:max-w-md p-3 bg-neutral-200 dark:bg-neutral-800 self-start rounded-r-lg rounded-bl-lg">
                 <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
};

const AIChatAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // FIX: Use the imported GoogleGenAI type directly.
    const [ai, setAi] = useState<GoogleGenAI | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const apiKey = process.env.API_KEY;
    
    useEffect(() => {
        // FIX: Initialize the AI client directly without dynamic import.
        function initializeAi() {
            if (!apiKey) {
                setError("AI service is not configured. An API key is required.");
                return;
            }
            try {
                // FIX: Correctly initialize GoogleGenAI with a named apiKey parameter.
                setAi(new GoogleGenAI({ apiKey }));
            } catch(e) {
                console.error("Failed to initialize AI:", e);
                setError("Could not load the AI service. Please check the console for details.");
            }
        }
        initializeAi();
    }, [apiKey]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        if (!ai) {
            setError("AI service is not available or still loading.");
            setIsLoading(false);
            return;
        }

        try {
            // FIX: Correctly structure the generateContent call according to SDK guidelines.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: input,
            });
            // FIX: Correctly access the response text.
            const aiMessage: ChatMessage = { role: 'model', content: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) => {
            console.error(err);
            setError('Sorry, something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <PageHeader
                title="AI Chat Assistant"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'AI Chat', path: '/sample/ai-chat' }]}
            />
            <Card className="h-[calc(100vh-180px)] flex flex-col">
                <Card.Header>
                    <div className="flex items-center">
                        <Avatar name="AI Assistant" src="/favicon.svg" size="md" presence="online" />
                        <div className="ml-3">
                            <h3 className="font-bold">AI Assistant</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Online</p>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <MessageBubble key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                           <Avatar name="AI" size="sm" src="/favicon.svg" />
                            <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-r-lg rounded-bl-lg">
                               <Spinner size="sm" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </Card.Body>

                <Card.Footer>
                    {error && <Alert variant="danger" title="Error">{error}</Alert>}
                    <form onSubmit={handleSendMessage} className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading || !ai}
                            className="flex-grow w-full px-3 py-2 border rounded-md shadow-sm bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim() || !ai}>
                            <i className="bi bi-send-fill"></i>
                        </Button>
                    </form>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default AIChatAssistant;