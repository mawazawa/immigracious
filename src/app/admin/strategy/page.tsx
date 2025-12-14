import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function StrategyPage() {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Strategic Intelligence</h2>

            <div className="grid gap-6">
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <FileText className="h-8 w-8 text-indigo-400" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Live Strategy Document (task.md)</h3>
                                <p className="text-sm text-slate-400">Current Phase: Exodus (Execution)</p>
                            </div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-md border border-slate-800 font-mono text-sm text-slate-300 leading-relaxed">
                            Loading live markdown content... (Integration Pending)
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
