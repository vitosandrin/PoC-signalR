import React from 'react'

export type Message = {
    id: number
    text: string
    sender: 'user' | 'system'
}

export function Message({ message }: { message: Message }) {
    return (
        <div
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
            >
                {message.text}
            </div>
        </div>
    )
}

export function MessageList({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {children}
        </div>
    )
}