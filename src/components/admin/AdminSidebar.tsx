import Link from "next/link";
import { LayoutDashboard, Brain, Eye, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Cockpit", href: "/admin/cockpit", icon: LayoutDashboard },
  { name: "Strategy (Brain)", href: "/admin/strategy", icon: Brain },
  { name: "Asset Review (Eyes)", href: "/admin/assets", icon: Eye },
  { name: "Agency (Swarm)", href: "/admin/agency", icon: Users },
];

export function AdminSidebar() {
  return (
    <div className="flex bg-slate-900 text-white w-64 min-h-screen flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-400" />
          Immigreat
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Zero-Person Command</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
