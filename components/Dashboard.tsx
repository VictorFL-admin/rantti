import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiGet, apiPost } from "@/lib/api-client";
import { Listing } from "@/lib/types/listings";
import { Card, CardContent } from "./ui/card";
import { 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Plus,
  Eye,
  DollarSign,
  Bell,
  Zap,
  Menu,
  Box,
  ShoppingCart,
  ShoppingBag,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
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
import NotificationsPanel from "./NotificationsPanel";

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
  const [loadingListings, setLoadingListings] = useState(false);
  const [listingsError, setListingsError] = useState<string | null>(null);
  
  // Estados para vista de especificaciones del producto
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [exploreFilter, setExploreFilter] = useState<'COMPRA' | 'VENTA'>('VENTA');
  const [exploreTodayListings, setExploreTodayListings] = useState<Listing[]>([]);
  
  // Estado para abrir chat específico después de enviar oferta
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  
  // Trigger para actualizar las publicaciones del usuario
  const [userListingsRefresh, setUserListingsRefresh] = useState(0);

  // Función para cargar publicaciones de "Explorar Hoy"
  const fetchExploreTodayListings = async () => {
    try {
      setLoadingListings(true);
      setListingsError(null);
      
      const response = await apiGet(getApiUrl(API_ENDPOINTS.LISTINGS.PUBLIC));
      
      if (!response.ok) {
        throw new Error('Error al cargar las publicaciones');
      }
      
      const data = await response.json();
      console.log('📦 Publicaciones cargadas:', data);
      
      // Normalizar la respuesta según el formato del backend - asegurar que siempre sea un array
      let listings: Listing[] = [];
      if (Array.isArray(data)) {
        // Respuesta directa como array: [...]
        listings = data;
      } else if (data && data.data) {
        // Respuesta con estructura anidada
        if (Array.isArray(data.data.listings)) {
          // Estructura: { data: { listings: [...] } }
          listings = data.data.listings;
        } else if (Array.isArray(data.data)) {
          // Estructura: { data: [...] }
          listings = data.data;
        }
      }
      
      console.log('✅ Listings normalizados:', listings);
      setExploreTodayListings(listings);
    } catch (error) {
      console.error('❌ Error al cargar publicaciones:', error);
      setListingsError('No se pudieron cargar las publicaciones. Intenta de nuevo.');
      setExploreTodayListings([]);
    } finally {
      setLoadingListings(false);
    }
  };

  // Cargar publicaciones al montar el componente y cada 60 segundos
  useEffect(() => {
    if (activeTab === 'overview') {
      fetchExploreTodayListings();
      
      // Actualizar cada 60 segundos
      const interval = setInterval(() => {
        fetchExploreTodayListings();
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [activeTab]);

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

  // Función para abrir vista de detalle de producto
  const handleOpenProduct = async (productId: number) => {
    setSelectedProductId(productId);
    setActiveTab('product-detail');
    setLoadingProduct(true);
    
    try {
      const response = await apiGet(getApiUrl(API_ENDPOINTS.LISTINGS.DETAILS(productId)));
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('📦 Datos recibidos de la API:', responseData);
        // La estructura es: { success: true, data: { listing: {...} } }
        setSelectedProductData(responseData.data.listing);
      } else {
        console.error('Error al cargar producto');
        toast.error('No se pudo cargar el producto');
        setActiveTab('overview');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar el producto');
      setActiveTab('overview');
    } finally {
      setLoadingProduct(false);
    }
  };

  // Función para volver desde detalle de producto
  // Función para manejar el envío de una oferta
  const handleMakeOffer = async (listingId: number, amount: number, currency: string, message?: string, isRequest: boolean = false) => {
    try {
      const defaultMessage = isRequest 
        ? `Hola, me interesa comprar al precio publicado de ${currency} ${amount.toFixed(2)}`
        : `Hola, te ofrezco ${currency} ${amount.toFixed(2)}`;

      const response = await apiPost(getApiUrl(API_ENDPOINTS.OFFERS.SEND), {
        listing_id: listingId,
        amount: amount,
        currency: currency,
        message: message || defaultMessage,
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.data.conversation_id) {
          // Guardar el conversation_id y cambiar al tab de chats
          setActiveConversationId(data.data.conversation_id);
          setActiveTab('chats');
          
          const successMessage = isRequest ? 'Solicitud enviada' : 'Oferta enviada';
          const successDescription = isRequest 
            ? 'Tu solicitud de compra ha sido enviada al vendedor. Ahora puedes chatear con él.'
            : 'Tu oferta ha sido enviada al vendedor. Ahora puedes chatear con él.';
          
          toast.success(successMessage, {
            description: successDescription,
          });
        }
      } else {
        const errorData = await response.json();
        toast.error('Error al enviar oferta', {
          description: errorData.error?.message || 'No se pudo enviar la oferta',
        });
      }
    } catch (error) {
      console.error('Error sending offer:', error);
      toast.error('Error', {
        description: 'Ocurrió un error al enviar la oferta',
      });
    }
  };

  const handleBackFromProduct = () => {
    setActiveTab('overview');
    setSelectedProductId(null);
    setSelectedProductData(null);
  };

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
                  {activeTab === "product-detail" && "Detalle de Producto"}
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
                  
                  {/* Tabs de Artículos en Venta / Comprar */}
                  <div className="flex gap-8 border-b border-gray-200">
                    <button
                      onClick={() => setExploreFilter('VENTA')}
                      className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                        exploreFilter === 'VENTA'
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Artículos en Venta
                      {exploreFilter === 'VENTA' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0047FF]" />
                      )}
                    </button>
                    <button
                      onClick={() => setExploreFilter('COMPRA')}
                      className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                        exploreFilter === 'COMPRA'
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Comprar
                      {exploreFilter === 'COMPRA' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0047FF]" />
                      )}
                    </button>
                  </div>
                  
                  {/* Loader de Listings */}
                  {loadingListings && (!Array.isArray(exploreTodayListings) || exploreTodayListings.length === 0) ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF]"></div>
                    </div>
                  ) : (
                    <>
                      {/* Products Grid - Estilo Marketplace */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {(Array.isArray(exploreTodayListings) ? exploreTodayListings : []).filter(listing => listing.listing_type === exploreFilter).length === 0 ? (
                          <div className="col-span-full text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No hay publicaciones disponibles en este momento</p>
                          </div>
                        ) : (
                          (Array.isArray(exploreTodayListings) ? exploreTodayListings : [])
                            .filter(listing => listing.listing_type === exploreFilter)
                            .map((listing) => (
                              <Card 
                                key={listing.id}
                                onClick={() => handleOpenProduct(listing.id)}
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
                                <CardContent className="p-4 pt-5">
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
            <NotificationsPanel />
          )}

          {/* Chats Tab */}
          {/* Chats Tab */}
          {activeTab === "chats" && (
            <ChatsPanel initialConversationId={activeConversationId} />
          )}

          {/* Actividad Reciente Tab */}
          {activeTab === "actividad-reciente" && (
            <ActividadRecienteContent user={user} onOpenPerfilModal={() => setPerfilModalOpen(true)} />
          )}

          {/* Panel de Vendedores Tab */}
          {activeTab === "panel-vendedores" && (
            <PanelVendedoresContent refreshTrigger={userListingsRefresh} />
          )}

          {/* Tus Publicaciones Tab */}
          {activeTab === "tus-publicaciones" && (
            <TusPublicacionesContent refreshTrigger={userListingsRefresh} />
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

          {/* Product Detail View */}
          {activeTab === "product-detail" && (
            <div className="space-y-4">
              {/* Botón Volver */}
              <Button
                variant="ghost"
                onClick={handleBackFromProduct}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Explorar
              </Button>
              
              {loadingProduct ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 animate-spin text-[#0047FF]" />
                </div>
              ) : selectedProductData ? (
                <ProductSpecifications
                  listing={selectedProductData}
                  onMakeOffer={(amount: number, currency: string) => {
                    const isRequest = amount === selectedProductData.pricing.current_price;
                    handleMakeOffer(selectedProductData.id, amount, currency, undefined, isRequest);
                  }}
                  onContactSeller={() => {
                    setActiveTab('chats');
                  }}
                />
              ) : null}
            </div>
          )}
            </>
          )}
        </div>
      </main>

      {/* Create Listing Dialog */}
      <CreateListingDialog 
        open={createListingOpen} 
        onOpenChange={setCreateListingOpen}
        onListingCreated={() => {
          fetchExploreTodayListings();
          setUserListingsRefresh(prev => prev + 1);
        }}
      />
      
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
