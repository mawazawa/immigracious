"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Check, X, Pencil } from "lucide-react";

interface Comment {
    id: string;
    x: number;
    y: number;
    text: string;
    resolved: boolean;
}

export function AssetAnnotator({ src = "/placeholder-pdf.png" }: { src?: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isAnnotating, setIsAnnotating] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnnotating) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            x,
            y,
            text: "New revision request...",
            resolved: false,
        };

        setComments([...comments, newComment]);
        setIsAnnotating(false);
    };

    return (
        <div className="flex h-[calc(100vh-120px)] gap-6">
            {/* Tools */}
            <div className="w-16 flex flex-col gap-4">
                <Button
                    variant={isAnnotating ? "default" : "secondary"}
                    size="icon"
                    onClick={() => setIsAnnotating(!isAnnotating)}
                    title="Add Comment"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-center overflow-auto p-8 relative">
                <div
                    className="bg-white w-[595px] h-[842px] relative shadow-2xl cursor-crosshair" // A4/Letter roughly
                    onClick={handleClick}
                >
                    {/* Visual Placeholder for PDF */}
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <p>Asset Preview: {src}</p>
                        <div className="w-3/4 h-3/4 border-2 border-dashed border-slate-200 mt-4 rounded" />
                    </div>

                    {/* Annotations */}
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="absolute w-6 h-6 bg-indigo-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs font-bold"
                            style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                        >
                            !
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Panel */}
            <div className="w-80 flex flex-col gap-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Agent Feedback Loop
                </h3>
                <div className="flex-1 space-y-3 overflow-y-auto">
                    {comments.length === 0 && (
                        <p className="text-sm text-slate-500 italic">No annotations yet. Click pencil to add review notes.</p>
                    )}
                    {comments.map((c) => (
                        <Card key={c.id} className="bg-slate-900 border-slate-800 p-3">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs text-indigo-400 font-mono">Location: {c.x.toFixed(0)}%, {c.y.toFixed(0)}%</span>
                                <div className="flex gap-1">
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-green-500"><Check className="h-3 w-3" /></Button>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500"><X className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <textarea
                                className="w-full bg-slate-950 text-slate-200 text-sm p-2 rounded border border-slate-800 resize-none h-20"
                                defaultValue={c.text}
                            />
                        </Card>
                    ))}
                </div>
                <Button className="w-full font-bold bg-indigo-600 hover:bg-indigo-700">
                    Submit Feedback to Agents
                </Button>
            </div>
        </div>
    );
}
