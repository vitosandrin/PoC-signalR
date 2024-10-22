'use client'

import React, { useState, useEffect } from 'react';
import { Message, MessageList } from './message';
import { MessageInput } from './message-input';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { RoomSelection } from './room-selection';

export default function Chat() {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! Welcome to chat", sender: 'system' },
    ]);
    const [chatRoom, setChatRoom] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState('');

    const joinChatRoom = async (username: string, room: string) => {
        setUsername(username);
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7062/chat")
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("ReceiveMessage", (sender: string, message: string) => {
            const newMessage: Message = {
                id: Date.now(),
                text: `${sender}: ${message}`,
                sender: sender === username ? "user" : "system",
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        try {
            await connection.start();
            await connection.invoke("JoinSpecificChatRoom", { username, chatRoom: room });
            setConnection(connection);
            setChatRoom(room);
            setIsConnected(true);
            console.log(`Joined room: ${room}`);
        } catch (error) {
            console.error("Connection failed: ", error);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (connection && chatRoom) {
            try {
                await connection.invoke("SendMessage", text);
            } catch (error) {
                console.error("Failed to send message: ", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            {!isConnected ? (
                <RoomSelection onJoin={joinChatRoom} />
            ) : (
                <>
                    <MessageList>
                        {messages.map(message => (
                            <Message message={message} key={message.id} />
                        ))}
                    </MessageList>
                    <MessageInput onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    );
}
