'use client';
import { Send } from 'lucide-react'
import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function MessageInput({
    onSendMessage,
}: { onSendMessage: (text: string) => void }) {
    
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            onSendMessage(input)
            setInput('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
            <div className="flex space-x-2">
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 text-white placeholder-gray-400"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </form>
    )
}