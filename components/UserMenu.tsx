import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogOut, Settings, Package, MessageSquare } from "lucide-react";

interface UserMenuProps {
  user: { email: string; name: string; avatar?: string } | null;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout: () => void;
}

export default function UserMenu({ user, onNavigate, onLogout }: UserMenuProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user.avatar || ""} />
            <AvatarFallback className="bg-[#0047FF] text-white text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 text-gray-900 mt-2">
        <DropdownMenuLabel className="text-gray-700">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-900">{getFirstName(user.name)}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem 
          onClick={() => onNavigate('dashboard')}
          className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
        >
          <Package className="w-4 h-4 mr-2" />
          Mi Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer">
          <MessageSquare className="w-4 h-4 mr-2" />
          Negociaciones activas
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem 
          onClick={onLogout}
          className="focus:bg-red-50 focus:text-red-600 cursor-pointer text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
