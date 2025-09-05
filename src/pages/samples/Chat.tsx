import React, { useState } from 'react';
import { CONVERSATIONS_DATA, MESSAGES_DATA, USERS_DATA } from '../../constants';
import { Conversation, Message } from '../../types';
import Card from '../../components/ui/card/Card';
import Avatar from '../../components/ui/avatar/Avatar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ConversationItem: React.FC<{ conv: Conversation; isActive: boolean; onClick: () => void }> = ({ conv, isActive, onClick }) => {
    const user = USERS_DATA.find(u => u.id === conv.participantId);
    if (!user) return null;

    return (
        <button onClick={onClick} className={`flex items-center w-full p-3 text-left rounded-lg transition-colors ${isActive ? 'bg-primary-background' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}>
            <Avatar name={user.name} src={`https://picsum.photos/50/50?random=${user.id}`} size="md" presence="online" />
            <div className="ml-3 flex-grow overflow-hidden">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{conv.lastMessage}</p>
            </div>
            <div className="flex-shrink-0 text-right text-xs text-neutral-500">
                <p>{conv.lastMessageTimestamp}</p>
                {conv.unreadCount > 0 && <span className="mt-1 inline-block bg-danger text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{conv.unreadCount}</span>}
            </div>
        </button>
    );
}

const MessageBubble: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => {
    const user = USERS_DATA.find(u => u.id === message.senderId);
    const bubbleClasses = isOwn
        ? 'bg-primary text-white self-end rounded-l-lg rounded-br-lg'
        : 'bg-neutral-200 dark:bg-neutral-800 self-start rounded-r-lg rounded-bl-lg';

    return (
        <div className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            {!isOwn && user && <Avatar name={user.name} src={`https://picsum.photos/40/40?random=${user.id}`} size="sm" />}
            <div className={`max-w-xs md:max-w-md p-3 ${bubbleClasses}`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-blue-200' : 'text-neutral-500'}`}>{message.timestamp}</p>
            </div>
        </div>
    );
};


const Chat: React.FC = () => {
    const [activeConversationId, setActiveConversationId] = useState(2);
    const [messages, setMessages] = useState(MESSAGES_DATA);
    const [newMessage, setNewMessage] = useState('');

    const activeConversation = CONVERSATIONS_DATA.find(c => c.id === activeConversationId);
    const activeParticipant = USERS_DATA.find(u => u.id === activeConversation?.participantId);
    const activeMessages = messages.filter(m => m.conversationId === activeConversationId);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newMessage.trim()) return;
        const msg: Message = {
            id: Date.now(),
            conversationId: activeConversationId,
            senderId: 0, // 0 represents the current logged-in user
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
        };
        setMessages(prev => [...prev, msg]);
        setNewMessage('');
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="h-[calc(100vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                    {/* Conversation List */}
                    <div className="col-span-1 md:col-span-4 border-r dark:border-neutral-800 flex flex-col">
                        <div className="p-4 border-b dark:border-neutral-800">
                           <Input id="search-chat" label="" placeholder="Search conversations..." />
                        </div>
                        <div className="flex-grow overflow-y-auto p-2">
                           {CONVERSATIONS_DATA.map(conv => (
                                <ConversationItem 
                                    key={conv.id} 
                                    conv={conv} 
                                    isActive={conv.id === activeConversationId} 
                                    onClick={() => setActiveConversationId(conv.id)}
                                />
                           ))}
                        </div>
                    </div>

                    {/* Chat Panel */}
                    <div className="col-span-1 md:col-span-8 flex flex-col h-full">
                        {activeParticipant ? (
                            <>
                                <div className="p-4 border-b dark:border-neutral-800 flex items-center">
                                    <Avatar name={activeParticipant.name} src={`https://picsum.photos/40/40?random=${activeParticipant.id}`} size="md" presence="online" />
                                    <h2 className="text-lg font-semibold ml-3">{activeParticipant.name}</h2>
                                </div>
                                <div className="flex-grow p-4 space-y-4 overflow-y-auto flex flex-col">
                                    {activeMessages.map(msg => <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === 0} />)}
                                </div>
                                <div className="p-4 border-t dark:border-neutral-800">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input id="message" label="" placeholder="Type a message..." className="flex-grow" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                                        <Button type="submit" size="icon"><i className="bi bi-send-fill"></i></Button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-neutral-500">Select a conversation to start chatting</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Chat;