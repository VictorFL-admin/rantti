import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiGet } from "@/lib/api-client";
import { Listing, ListingsResponse } from "@/lib/types/listings";
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
  FileText,
  ShoppingCart,
  ShoppingBag
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
import CreateListingDialog from "./CreateListingDialog";
import ChatsPanel from "./ChatsPanel";
import DashboardSidebar from "./dashboard/DashboardSidebar";
import ProductSpecifications from "./ProductSpecifications";
import ActividadRecienteContent from "./ActividadRecienteContent";
import PerfilMarketplaceModal from "./PerfilMarketplaceModal";
import PanelVendedoresContent from "./PanelVendedoresContent";
import TusPublicacionesContent from "./TusPublicacionesContent";
import EstadisticasContent from "./EstadisticasContent";

interface DashboardProps {
  user: { email: string; name: string; avatar?: string };
  onLogout: () => void;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard' | 'forgot-password' | 'reset-password' | 'terms' | 'privacy' | 'product-specs') => void;
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [limitReachedDialogOpen, setLimitReachedDialogOpen] = useState(false);
  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [selectedListingForBoost, setSelectedListingForBoost] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(initialUser);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  // Estados para "Explorar Hoy"
  const [exploreTodayListings, setExploreTodayListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [listingsError, setListingsError] = useState<string | null>(null);

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

  // Fetch user profile data - SOLO UNA VEZ al montar y solo si falta el avatar
  useEffect(() => {
    // Si ya tenemos avatar en initialUser, no hacer fetch
    if (initialUser.avatar && initialUser.avatar !== "") {
      setProfileLoaded(true);
      setLoadingProfile(false);
      return;
    }
    
    if (profileLoaded) return; // Evitar llamadas múltiples
    
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
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
          
          // Actualizar localStorage con el avatar para futuras sesiones
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              parsedUser.avatar = userProfile.avatar || "";
              localStorage.setItem('user', JSON.stringify(parsedUser));
              console.log('✅ Avatar actualizado en localStorage');
            } catch (e) {
              console.error('Error actualizando localStorage:', e);
            }
          }
          
          // Actualizar también en el componente padre si es necesario
          onUpdateUser(updatedUser);
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [profileLoaded, onUpdateUser, initialUser.avatar]);

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

  // Fetch "Explorar Hoy" listings
  const fetchExploreTodayListings = async () => {
    try {
      setLoadingListings(true);
      setListingsError(null);
      
      const response = await apiGet(
        `${getApiUrl(API_ENDPOINTS.LISTINGS.PUBLIC)}?per_page=8&sort=recent`
      );
      
      if (response.ok) {
        const result: ListingsResponse = await response.json();
        setExploreTodayListings(result.data.listings);
      } else {
        setListingsError('Error al cargar publicaciones');
      }
    } catch (error) {
      console.error('Error al cargar listings de Explorar Hoy:', error);
      setListingsError('Error al conectar con el servidor');
    } finally {
      setLoadingListings(false);
    }
  };

  // Fetch listings on mount y polling cada 60 segundos
  useEffect(() => {
    fetchExploreTodayListings();
    
    // Polling cada 60 segundos
    const interval = setInterval(() => {
      fetchExploreTodayListings();
    }, 60000);
    
    return () => clearInterval(interval);
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

  // Mostrar loader solo si estamos cargando el perfil por primera vez
  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

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
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        collapsed={sidebarCollapsed}
        onOpenPerfilModal={() => setPerfilModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger Button - Mobile & Desktop */}
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  // En mobile abre el sheet, en desktop toggle el sidebar
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    console.log('🍔 Menú móvil abriendo desde Dashboard');
                    setMobileMenuOpen(true);
                  } else {
                    setSidebarCollapsed(!sidebarCollapsed);
                  }
                }}
                type="button"
                title={sidebarCollapsed ? "Mostrar menú" : "Ocultar menú"}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              
              <div>
                <h1 className="text-xl md:text-2xl text-gray-900">
                  {activeTab === "overview" && "Explorar Hoy"}
                  {activeTab === "notifications" && "Notificaciones"}
                  {activeTab === "chats" && "Chats"}
                  {activeTab === "especificaciones" && "Especificaciones"}
                  {activeTab === "actividad-reciente" && "Actividad Reciente"}
                  {activeTab === "panel-vendedores" && "Panel de Vendedores"}
                  {activeTab === "tus-publicaciones" && "Tus Publicaciones"}
                  {activeTab === "estadisticas" && "Estadísticas"}
                  {activeTab === "negotiations" && "Compras"}
                  {activeTab === "payments" && "Ventas"}
                  {activeTab === "packages" && "Paquete"}
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
                  {/* Mensaje de Error */}
                  {listingsError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {listingsError}
                    </div>
                  )}
                  
                  {/* Loader de Listings */}
                  {loadingListings && exploreTodayListings.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF]"></div>
                    </div>
                  ) : (
                    <>
                      {/* Products Grid - Estilo Marketplace */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {exploreTodayListings.length === 0 ? (
                          <div className="col-span-full text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No hay publicaciones disponibles en este momento</p>
                          </div>
                        ) : (
                          exploreTodayListings.map((listing) => (
                            <Card 
                              key={listing.id} 
                              className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                            >
                              <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
                                <img
                                  src={listing.image || '/images/placeholder.jpg'}
                                  alt={listing.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/placeholder.jpg';
                                  }}
                                />
                              </div>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {listing.category.name}
                                  </Badge>
                                  <Badge 
                                    variant={listing.listing_type === 'VENTA' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {listing.listing_type}
                                  </Badge>
                                </div>
                                <h3 className="font-['Poppins',sans-serif] text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                  {listing.title}
                                </h3>
                                <p className="font-['Poppins',sans-serif] text-xl font-semibold text-[#0047FF] mb-2">
                                  {listing.currency} {listing.price.toLocaleString('es-PE')}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="font-['Poppins',sans-serif] text-xs">
                                      {listing.location}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-400">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="text-xs">{listing.views}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de notificaciones próximamente</p>
            </div>
          )}

          {/* Chats Tab */}
          {activeTab === "chats" && (
            <ChatsPanel />
          )}

          {/* Specifications Tab */}
          {activeTab === "especificaciones" && (
            <ProductSpecifications />
          )}

          {/* Actividad Reciente Tab */}
          {activeTab === "actividad-reciente" && (
            <ActividadRecienteContent user={user} onOpenPerfilModal={() => setPerfilModalOpen(true)} />
          )}

          {/* Panel de Vendedores Tab */}
          {activeTab === "panel-vendedores" && (
            <PanelVendedoresContent />
          )}

          {/* Tus Publicaciones Tab */}
          {activeTab === "tus-publicaciones" && (
            <TusPublicacionesContent />
          )}

          {/* Estadísticas Tab */}
          {activeTab === "estadisticas" && (
            <EstadisticasContent />
          )}

          {/* Negotiations Tab (Compras) */}
          {activeTab === "negotiations" && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de compras próximamente</p>
            </div>
          )}

          {/* Payments Tab (Ventas) */}
          {activeTab === "payments" && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de ventas próximamente</p>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div className="text-center py-12">
              <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Panel de paquete próximamente</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <SettingsPanel user={user} onUpdateUser={onUpdateUser} />
          )}
            </>
          )}
        </div>
      </main>

      {/* Create Listing Dialog */}
      <CreateListingDialog open={createListingOpen} onOpenChange={setCreateListingOpen} />
      
      {/* Perfil Marketplace Modal */}
      <PerfilMarketplaceModal 
        open={perfilModalOpen}
        onOpenChange={setPerfilModalOpen}
        user={user}
      />
      
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
