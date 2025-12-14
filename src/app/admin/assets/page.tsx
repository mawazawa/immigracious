"use client";

import { AssetAnnotator } from "@/components/admin/AssetAnnotator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AssetsPage() {
    return (
        <div className="p-8 h-screen flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white tracking-tight">Asset Review</h2>
                <Tabs defaultValue="first-dollar" className="w-[400px]">
                    <TabsList className="bg-slate-900 border border-slate-800">
                        <TabsTrigger value="first-dollar" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Green Card Guide</TabsTrigger>
                        <TabsTrigger value="newsletter" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Newsletter #1</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex-1">
                <AssetAnnotator src="Marriage-Green-Card-Interview-Guide.pdf" />
            </div>
        </div>
    );
}
