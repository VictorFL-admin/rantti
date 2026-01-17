import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiGet } from "@/lib/api-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Bell,
  CreditCard,
  Zap,
  MessageCircle,
  Menu,
  Box,
  FileText
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { VisuallyHidden } from "./ui/visually-hidden";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import SettingsPanel from "./SettingsPanel";
import DashboardSidebar from "./dashboard/DashboardSidebar";

interface DashboardProps {
  user: { email: string; name: string; avatar?: string };
  onLogout: () => void;
  onNavigate: (page: 'home') => void;
  onUpdateUser: (updates: { name?: string; avatar?: string }) => void;
}

export default function Dashboard({ user: initialUser, onLogout, onNavigate, onUpdateUser }: DashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine active tab from URL
  const getTabFromPath = () => {
    if (pathname === '/configuracion') return 'settings';
    return 'overview';
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [boostPublicationOpen, setBoostPublicationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [limitReachedDialogOpen, setLimitReachedDialogOpen] = useState(false);
  const [selectedListingForBoost, setSelectedListingForBoost] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(initialUser);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Sync activeTab with URL changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [pathname]);

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

  // Fetch user profile data - SOLO UNA VEZ al montar
  useEffect(() => {
    if (profileLoaded) return; // Evitar llamadas múltiples
    
    const fetchUserProfile = async () => {
      try {
        const response = await apiGet(getApiUrl(API_ENDPOINTS.USER.PROFILE));
        
        if (response.ok) {
          const data = await response.json();
          const userProfile = data.user;
          
          const updatedUser = {
            name: userProfile.name || "",
            email: userProfile.email || "",
            avatar: userProfile.avatar || "",
          };
          
          setUser(updatedUser);
          setProfileLoaded(true);
          
          // Actualizar también en el componente padre si es necesario
          onUpdateUser(updatedUser);
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };

    fetchUserProfile();
  }, [profileLoaded, onUpdateUser]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await apiGet(getApiUrl(API_ENDPOINTS.DASHBOARD));
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Preparar los stats desde la API
  const stats = dashboardData ? [
    {
      title: "Publicaciones Activas",
      value: String(dashboardData.stats.activeListings.count),
      change: dashboardData.stats.activeListings.change,
      icon: Package,
      trend: dashboardData.stats.activeListings.count > 0 ? "up" : "neutral"
    },
    {
      title: "Negociaciones Activas",
      value: String(dashboardData.stats.activeNegotiations.count),
      change: `${dashboardData.stats.activeNegotiations.pending} pendientes de respuesta`,
      icon: MessageSquare,
      trend: "neutral"
    },
    {
      title: "Ofertas Recibidas",
      value: String(dashboardData.stats.receivedOffers.count),
      change: dashboardData.stats.receivedOffers.new,
      icon: TrendingUp,
      trend: dashboardData.stats.receivedOffers.count > 0 ? "up" : "neutral"
    },
    {
      title: "Valor Total Publicado",
      value: dashboardData.stats.totalValue.amount,
      change: `${dashboardData.stats.totalValue.listings} propiedades`,
      icon: DollarSign,
      trend: "neutral"
    }
  ] : [
    {
      title: "Publicaciones Activas",
      value: "0",
      change: "+0 esta semana",
      icon: Package,
      trend: "neutral"
    },
    {
      title: "Negociaciones Activas",
      value: "0",
      change: "0 pendientes de respuesta",
      icon: MessageSquare,
      trend: "neutral"
    },
    {
      title: "Ofertas Recibidas",
      value: "0",
      change: "+0 nuevas hoy",
      icon: TrendingUp,
      trend: "neutral"
    },
    {
      title: "Valor Total Publicado",
      value: "$0",
      change: "0 propiedades",
      icon: DollarSign,
      trend: "neutral"
    }
  ];

  const myListings = [
    {
      id: 1,
      title: "Tesla Model S 2022",
      category: "Autos",
      price: "$45,000",
      offers: 5,
      views: 234,
      status: "active",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400"
    },
    {
      id: 2,
      title: "Casa en Polanco, CDMX",
      category: "Propiedades",
      price: "$1,200,000",
      offers: 3,
      views: 567,
      status: "active",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
    },
    {
      id: 3,
      title: "Rolex Submariner",
      category: "Objetos de Lujo",
      price: "$12,500",
      offers: 8,
      views: 189,
      status: "negotiating",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop & Mobile Sidebar */}
      <DashboardSidebar
        user={user}
        currentSection={activeTab}
        onSectionChange={(section) => {
          setActiveTab(section);
          if (section === 'overview') {
            router.push('/dashboard');
          } else if (section === 'settings') {
            router.push('/configuracion');
          }
        }}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <div>
                <h1 className="text-xl md:text-2xl text-gray-900">
                  {activeTab === "overview" && "Dashboard"}
                  {activeTab === "listings" && "Mis Publicaciones"}
                  {activeTab === "negotiations" && "Negociaciones"}
                  {activeTab === "chats" && "Chats"}
                  {activeTab === "notifications" && "Notificaciones"}
                  {activeTab === "payments" && "Pagos"}
                  {activeTab === "packages" && "Paquetes"}
                  {activeTab === "specifications" && "Especificaciones"}
                  {activeTab === "settings" && "Configuración"}
                </h1>
                <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                  Bienvenido de nuevo, {getFirstName(user.name)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}
              
              <Button 
                variant="outline"
                onClick={() => onNavigate('home')}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hidden sm:flex"
              >
                Ver Marketplace
              </Button>
              
              {/* Mostrar botón "Más Publicaciones" solo en la pestaña de Mis Publicaciones */}
              {activeTab === "listings" && (
                <Button 
                  onClick={() => setLimitReachedDialogOpen(true)}
                  variant="outline"
                  className="border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF]/5"
                  size="sm"
                >
                  <Zap className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Más Publicaciones</span>
                </Button>
              )}
              
              <Button 
                onClick={() => setCreateListingOpen(true)}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Nueva Publicación</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {/* Loader */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF]"></div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                      <Card key={index} className="bg-white border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm text-gray-600">
                            {stat.title}
                          </CardTitle>
                          <stat.icon className="w-4 h-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl text-gray-900">{stat.value}</div>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            {stat.trend === "up" && <ArrowUpRight className="w-3 h-3 text-green-600" />}
                            {stat.change}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Actividad Reciente</CardTitle>
                    <CardDescription className="text-gray-500">
                      Tus negociaciones más recientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      {dashboardData?.recentActivity?.message || "No tienes actividad reciente aún."}
                    </p>
                    {dashboardData?.recentActivity?.message && (
                      <Button
                        onClick={() => setActiveTab("negotiations")}
                        variant="outline"
                        className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Ver Negociaciones
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Publicaciones Destacadas</CardTitle>
                    <CardDescription className="text-gray-500">
                      Con más interacción
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!dashboardData?.hasData || dashboardData?.featuredListings?.message ? (
                      <div className="py-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                          {dashboardData?.featuredListings?.message || "No tienes publicaciones aún."}
                        </p>
                      </div>
                    ) : dashboardData?.featuredListings?.data && Array.isArray(dashboardData.featuredListings.data) ? (
                      <div className="space-y-4">
                        {dashboardData.featuredListings.data.map((listing: any) => (
                          <div key={listing.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                            <img 
                              src={listing.image || listing.images?.[0] || "https://via.placeholder.com/64"} 
                              alt={listing.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 truncate">{listing.title}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-purple-600">{listing.price}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {listing.views || 0}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {listing.offers || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === "listings" && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de publicaciones próximamente</p>
            </div>
            // <MyListingsPanel />
          )}

          {/* Negotiations Tab - INTEGRACIÓN COMPLETA CON CULQI */}
          {activeTab === "negotiations" && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de negociaciones próximamente</p>
            </div>
            // <NegotiationsPanel userId={1} userName={user.name} />
          )}

          {/* Chats Tab */}
          {activeTab === "chats" && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de chats próximamente</p>
            </div>
            // <ChatsPanel />
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de notificaciones próximamente</p>
            </div>
            // <NotificationsPanel />
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de pagos próximamente</p>
            </div>
            // <PaymentsPanel />
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <SettingsPanel user={user} onUpdateUser={onUpdateUser} />
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div className="text-center py-12">
              <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de paquetes próximamente</p>
            </div>
            // <PackagesPanel />
          )}

          {/* Specifications Tab */}
          {activeTab === "specifications" && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de especificaciones próximamente</p>
            </div>
            // <SpecificationsPanel />
          )}
            </>
          )}
        </div>
      </main>

      {/* Create Listing Dialog */}
      {/* <CreateListingDialog open={createListingOpen} onOpenChange={setCreateListingOpen} /> */}
      
      {/* Boost Publication Dialog */}
      {/* selectedListingForBoost && (
        <BoostPublicationDialog 
          open={boostPublicationOpen} 
          onOpenChange={setBoostPublicationOpen}
          listingTitle={selectedListingForBoost.title}
          listingId={selectedListingForBoost.id}
          userId={1}
          onBoostSuccess={(boostData) => {
            console.log('Boost exitoso:', boostData);
          }}
        />
      ) */}

      {/* Limit Reached Alert Dialog */}
      <AlertDialog open={limitReachedDialogOpen} onOpenChange={setLimitReachedDialogOpen}>
        <AlertDialogContent className="bg-white border-gray-200 max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl text-gray-900">
              ¡Tus Oportunidades Gratis se Acabaron! 🚀
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600 space-y-3">
              <p>
                Has alcanzado el límite de publicaciones gratuitas disponibles en tu cuenta.
              </p>
              <p>
                Para continuar publicando y disfrutar de más beneficios, te invitamos a explorar nuestros <span className="text-[#0047FF]">paquetes premium</span>.
              </p>
              <div className="bg-gradient-to-r from-[#0047FF]/10 to-purple-500/10 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700">
                  <strong>💎 Con nuestros paquetes premium obtienes:</strong>
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1 text-left list-disc list-inside">
                  <li>Publicaciones ilimitadas</li>
                  <li>Mayor visibilidad en el marketplace</li>
                  <li>Soporte prioritario</li>
                  <li>Estadísticas avanzadas</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto">
              Ahora no
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                setLimitReachedDialogOpen(false);
                setActiveTab("packages");
              }}
              className="bg-gradient-to-r from-[#0047FF] to-purple-600 hover:from-[#0039CC] hover:to-purple-700 text-white w-full sm:w-auto"
            >
              Ver Paquetes Premium
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
