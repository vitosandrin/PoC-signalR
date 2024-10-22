'use client';

import React, { useState } from 'react';

export function RoomSelection({ onJoin }: { onJoin: (username: string, chatRoom: string) => void }) {
    const [username, setUsername] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    const handleJoin = () => {
        if (username.trim() && chatRoom.trim()) {
            onJoin(username, chatRoom);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white flex flex-col items-center">
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="text"
                placeholder="Enter chat room"
                value={chatRoom}
                onChange={(e) => setChatRoom(e.target.value)}
                className="mb-2 p-2 rounded bg-gray-700 text-white"
            />
            <button onClick={handleJoin} className="p-2 bg-blue-600 rounded">
                Join Chat Room
            </button>
        </div>
    );
}
