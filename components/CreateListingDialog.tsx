import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, X, ShoppingBag, Tag, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { apiPost, apiPostFormData, apiGet } from "../lib/api-client";
import { API_ENDPOINTS } from "../lib/api-config";
import { toast } from "sonner";

interface CreateListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onListingCreated?: () => void; // Callback para actualizar la lista en tiempo real
}

type ListingType = 'buy' | 'sell';

// Formulario para VENTA (con imágenes)
interface SellFormData {
  category_id: string;
  title: string;
  description: string;
  location_text: string;
  price_suggested: string;
  images: File[];
}

// Formulario para COMPRA (completo original con imágenes)
interface BuyFormData {
  category_id: string;
  title: string;
  description: string;
  location_text: string;
  price_suggested: string;
  currency: string;
  conditions_text: string;
  availability_date: string;
  images: File[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export default function CreateListingDialog({ open, onOpenChange, onListingCreated }: CreateListingDialogProps) {
  const [activeTab, setActiveTab] = useState<ListingType>('sell');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [sellFormData, setSellFormData] = useState<SellFormData>({
    category_id: "",
    title: "",
    description: "",
    location_text: "",
    price_suggested: "",
    images: []
  });

  const [sellImagePreviews, setSellImagePreviews] = useState<string[]>([]);

  const [buyFormData, setBuyFormData] = useState<BuyFormData>({
    category_id: "",
    title: "",
    description: "",
    location_text: "",
    price_suggested: "",
    currency: "PEN",
    conditions_text: "",
    availability_date: "",
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await apiGet(API_ENDPOINTS.CATEGORIES.ALL);
        const data = await response.json();
        
        if (data.success && data.data?.categories) {
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        toast.error('Error al cargar categorías', {
          description: 'No se pudieron cargar las categorías disponibles',
          icon: <AlertCircle className="w-5 h-5" />
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleSellImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + sellFormData.images.length > 10) {
      toast.error("Máximo 10 imágenes", {
        description: "Solo puedes subir hasta 10 imágenes por publicación",
        icon: <AlertCircle className="w-5 h-5" />
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Archivo muy grande", {
          description: `${file.name} debe ser menor a 10MB`,
          icon: <AlertCircle className="w-5 h-5" />
        });
        return false;
      }
      return true;
    });

    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === validFiles.length) {
          setSellImagePreviews([...sellImagePreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setSellFormData({
      ...sellFormData,
      images: [...sellFormData.images, ...validFiles]
    });
  };

  const removeSellImage = (index: number) => {
    const newImages = sellFormData.images.filter((_, i) => i !== index);
    const newPreviews = sellImagePreviews.filter((_, i) => i !== index);
    setSellFormData({ ...sellFormData, images: newImages });
    setSellImagePreviews(newPreviews);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + buyFormData.images.length > 10) {
      toast.error("Máximo 10 imágenes", {
        description: "Solo puedes subir hasta 10 imágenes por publicación",
        icon: <AlertCircle className="w-5 h-5" />
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Archivo muy grande", {
          description: `${file.name} debe ser menor a 10MB`,
          icon: <AlertCircle className="w-5 h-5" />
        });
        return false;
      }
      return true;
    });

    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === validFiles.length) {
          setImagePreviews([...imagePreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setBuyFormData({
      ...buyFormData,
      images: [...buyFormData.images, ...validFiles]
    });
  };

  const removeImage = (index: number) => {
    const newImages = buyFormData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setBuyFormData({ ...buyFormData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sellFormData.title || !sellFormData.category_id || !sellFormData.price_suggested || !sellFormData.description) {
      toast.error("Campos requeridos", {
        description: "Por favor completa todos los campos obligatorios",
        icon: <AlertCircle className="w-5 h-5" />
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear FormData para enviar las imágenes
      const formData = new FormData();
      formData.append('title', sellFormData.title);
      formData.append('category_id', sellFormData.category_id);
      formData.append('price_suggested', sellFormData.price_suggested);
      formData.append('description', sellFormData.description);
      
      if (sellFormData.location_text) {
        formData.append('location_text', sellFormData.location_text);
      }
      
      // Agregar imágenes
      sellFormData.images.forEach((image) => {
        formData.append('images[]', image);
      });

      const response = await apiPostFormData(API_ENDPOINTS.LISTINGS.SELL, formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la publicación');
      }

      const result = await response.json();
      console.log("✅ Publicación de VENTA creada:", result);
      
      toast.success("¡Publicación creada!", {
        description: "Tu artículo está en moderación y será visible pronto",
        icon: <CheckCircle2 className="w-5 h-5" />,
        duration: 4000
      });
      
      resetForms();
      onOpenChange(false);
      
      // Actualizar la lista en tiempo real
      if (onListingCreated) {
        onListingCreated();
      }
    } catch (error) {
      console.error("❌ Error al crear publicación de venta:", error);
      toast.error("Error al crear publicación", {
        description: error instanceof Error ? error.message : 'No se pudo crear la publicación',
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBuySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buyFormData.title || !buyFormData.category_id || !buyFormData.description) {
      toast.error("Campos requeridos", {
        description: "Por favor completa todos los campos obligatorios",
        icon: <AlertCircle className="w-5 h-5" />
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear FormData para enviar las imágenes
      const formData = new FormData();
      formData.append('title', buyFormData.title);
      formData.append('category_id', buyFormData.category_id);
      formData.append('price_suggested', buyFormData.price_suggested);
      formData.append('currency', buyFormData.currency);
      formData.append('description', buyFormData.description);
      
      if (buyFormData.location_text) {
        formData.append('location_text', buyFormData.location_text);
      }
      
      if (buyFormData.conditions_text) {
        formData.append('conditions_text', buyFormData.conditions_text);
      }
      
      if (buyFormData.availability_date) {
        formData.append('availability_date', buyFormData.availability_date);
      }
      
      // Agregar imágenes
      buyFormData.images.forEach((image, index) => {
        formData.append('images[]', image);
      });

      const response = await apiPostFormData(API_ENDPOINTS.LISTINGS.BUY, formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la solicitud');
      }

      const result = await response.json();
      console.log("✅ Solicitud de COMPRA creada:", result);
      
      toast.success("¡Solicitud publicada!", {
        description: "Tu búsqueda ha sido publicada. Recibirás ofertas pronto",
        icon: <CheckCircle2 className="w-5 h-5" />,
        duration: 4000
      });
      
      resetForms();
      onOpenChange(false);
      
      // Actualizar la lista en tiempo real
      if (onListingCreated) {
        onListingCreated();
      }
    } catch (error) {
      console.error("❌ Error al crear solicitud de compra:", error);
      toast.error("Error al crear solicitud", {
        description: error instanceof Error ? error.message : 'No se pudo crear la solicitud',
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForms = () => {
    setSellFormData({
      category_id: "",
      title: "",
      description: "",
      location_text: "",
      price_suggested: "",
      images: []
    });
    setBuyFormData({
      category_id: "",
      title: "",
      description: "",
      location_text: "",
      price_suggested: "",
      currency: "PEN",
      conditions_text: "",
      availability_date: "",
      images: []
    });
    setImagePreviews([]);
    setSellImagePreviews([]);
    setActiveTab('sell');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-gray-200 text-gray-900 w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Nueva Publicación</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-600">
            Elige si quieres vender o comprar un artículo.
          </DialogDescription>
        </DialogHeader>

        {/* TABS */}
        <div className="flex gap-1 sm:gap-2 border-b border-gray-200 mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('sell')}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 border-b-2 transition-colors text-xs sm:text-sm ${
              activeTab === 'sell'
                ? 'border-[#0047FF] text-gray-900 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Quiero Vender
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 border-b-2 transition-colors text-xs sm:text-sm ${
              activeTab === 'buy'
                ? 'border-[#0047FF] text-gray-900 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Busco Comprar
          </button>
        </div>

        {/* FORMULARIO DE VENTA */}
        {activeTab === 'sell' && (
          <form onSubmit={handleSellSubmit} className="space-y-3 sm:space-y-4">
            {/* Título */}
            <div className="space-y-1.5">
              <Label htmlFor="sell-title" className="text-xs sm:text-sm text-gray-700">Título *</Label>
              <Input
                id="sell-title"
                placeholder="Ej: Rolex Submariner Oro Blanco 2023"
                value={sellFormData.title}
                onChange={(e) => setSellFormData({ ...sellFormData, title: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 h-9"
                required
              />
            </div>

            {/* Categoría */}
            <div className="space-y-1.5">
              <Label htmlFor="sell-category" className="text-xs sm:text-sm text-gray-700">Categoría *</Label>
              <Select 
                value={sellFormData.category_id} 
                onValueChange={(value) => setSellFormData({ ...sellFormData, category_id: value })}
                disabled={loadingCategories}
              >
                <SelectTrigger className="bg-gray-50 border-gray-300 text-sm text-gray-900 h-9 px-3">
                  <SelectValue placeholder={loadingCategories ? "Cargando categorías..." : "Selecciona una categoría..."} />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 text-sm text-gray-900">
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Precio */}
            <div className="space-y-1.5">
              <Label htmlFor="sell-price" className="text-xs sm:text-sm text-gray-700">Precio sugerido *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">S/</span>
                <Input
                  id="sell-price"
                  type="number"
                  step="0.01"
                  placeholder="50000.00"
                  value={sellFormData.price_suggested}
                  onChange={(e) => setSellFormData({ ...sellFormData, price_suggested: e.target.value })}
                  className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 pl-10 h-9"
                  required
                />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500">Este precio es negociable</p>
            </div>

            {/* Ubicación */}
            <div className="space-y-1.5">
              <Label htmlFor="sell-location" className="text-xs sm:text-sm text-gray-700">Ubicación</Label>
              <Input
                id="sell-location"
                placeholder="Ej: Lima, Perú"
                value={sellFormData.location_text}
                onChange={(e) => setSellFormData({ ...sellFormData, location_text: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 h-9"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-1.5">
              <Label htmlFor="sell-description" className="text-xs sm:text-sm text-gray-700">Descripción *</Label>
              <Textarea
                id="sell-description"
                placeholder="Describe tu artículo, características, estado, historial, etc."
                value={sellFormData.description}
                onChange={(e) => setSellFormData({ ...sellFormData, description: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 min-h-[90px] resize-none"
                required
              />
            </div>

            {/* Imágenes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs sm:text-sm text-gray-700">Imágenes (Opcional)</Label>
                {sellFormData.images.length > 0 && (
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                    {sellFormData.images.length}/10 imágenes
                  </span>
                )}
              </div>
              
              {sellFormData.images.length > 0 && (
                <p className="text-[10px] sm:text-xs text-blue-600 mb-1">
                  💡 La primera imagen será la portada de tu publicación
                </p>
              )}
              
              {sellImagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-2">
                  {sellImagePreviews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-300"
                      />
                      {/* Badge de portada en la primera imagen */}
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-medium">
                          Portada
                        </div>
                      )}
                      {/* Botón eliminar - siempre visible en móvil, hover en desktop */}
                      <button
                        type="button"
                        onClick={() => removeSellImage(index)}
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-md sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                      {/* Número de imagen */}
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <label className={`border-2 border-dashed rounded-lg p-4 sm:p-5 text-center transition-all cursor-pointer block ${
                sellFormData.images.length >= 10 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-300 hover:border-[#0047FF] hover:bg-blue-50/50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSellImageUpload}
                  className="hidden"
                  disabled={sellFormData.images.length >= 10}
                />
                <Upload className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 ${
                  sellFormData.images.length >= 10 ? 'text-gray-300' : 'text-gray-400'
                }`} />
                <p className={`text-xs sm:text-sm font-medium ${
                  sellFormData.images.length >= 10 ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {sellFormData.images.length >= 10 
                    ? 'Máximo de imágenes alcanzado' 
                    : 'Click para subir imágenes'}
                </p>
                {sellFormData.images.length < 10 && (
                  <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">
                    PNG, JPG hasta 10MB cada una • {10 - sellFormData.images.length} restantes
                  </p>
                )}
              </label>
            </div>

            {/* Información de venta */}
            <div className="border border-gray-300 rounded-lg p-2.5 sm:p-3">
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5">
                <li>✓ No cobramos comisión por tu venta.</li>
                <li>✓ Negociar siempre es gratis.</li>
                <li>✓ El pago y la entrega se coordinan entre las partes.</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  toast.info("Borrador guardado", {
                    description: "Puedes continuar editando más tarde",
                    icon: <Info className="w-5 h-5" />
                  });
                  onOpenChange(false);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 h-9 text-xs sm:text-sm order-2 sm:order-1"
              >
                Guardar Borrador
              </Button>
              <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 h-9 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-9 text-xs sm:text-sm flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar Venta'}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* FORMULARIO DE COMPRA */}
        {activeTab === 'buy' && (
          <form onSubmit={handleBuySubmit} className="space-y-3 sm:space-y-4">
            {/* TÍTULO */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-title" className="text-xs sm:text-sm text-gray-700">Título de la publicación *</Label>
              <Input
                id="buy-title"
                placeholder="Ej: Busco Rolex Submariner"
                value={buyFormData.title}
                onChange={(e) => setBuyFormData({ ...buyFormData, title: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 h-9"
                required
              />
              <p className="text-[10px] sm:text-xs text-gray-500">Máximo 200 caracteres</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* CATEGORÍA */}
              <div className="space-y-1.5">
                <Label htmlFor="buy-category" className="text-xs sm:text-sm text-gray-700">Categoría *</Label>
                <Select 
                  value={buyFormData.category_id} 
                  onValueChange={(value) => setBuyFormData({ ...buyFormData, category_id: value })}
                  required
                  disabled={loadingCategories}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-sm text-gray-900 h-9 px-3">
                    <SelectValue placeholder={loadingCategories ? "Cargando..." : "Seleccionar..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-sm text-gray-900">
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* MONEDA */}
              <div className="space-y-1.5">
                <Label htmlFor="buy-currency" className="text-xs sm:text-sm text-gray-700">Moneda</Label>
                <Select 
                  value={buyFormData.currency} 
                  onValueChange={(value) => setBuyFormData({ ...buyFormData, currency: value })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-sm text-gray-900 h-9 px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-sm text-gray-900">
                    <SelectItem value="PEN">PEN (S/)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PRECIO */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-price" className="text-xs sm:text-sm text-gray-700">Precio sugerido *</Label>
              <Input
                id="buy-price"
                type="number"
                step="0.01"
                placeholder="50000.00"
                value={buyFormData.price_suggested}
                onChange={(e) => setBuyFormData({ ...buyFormData, price_suggested: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 h-9"
                required
              />
              <p className="text-[10px] sm:text-xs text-gray-500">Este precio es negociable</p>
            </div>

            {/* UBICACIÓN */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-location" className="text-xs sm:text-sm text-gray-700">Ubicación</Label>
              <Input
                id="buy-location"
                placeholder="Ej: Lima, Perú"
                value={buyFormData.location_text}
                onChange={(e) => setBuyFormData({ ...buyFormData, location_text: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 h-9"
              />
              <p className="text-[10px] sm:text-xs text-gray-500">Máximo 200 caracteres</p>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-description" className="text-xs sm:text-sm text-gray-700">Descripción *</Label>
              <Textarea
                id="buy-description"
                placeholder="Describe tu artículo, características, historial, etc."
                value={buyFormData.description}
                onChange={(e) => setBuyFormData({ ...buyFormData, description: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 min-h-[90px] resize-none"
                required
              />
            </div>

            {/* CONDICIONES */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-conditions" className="text-xs sm:text-sm text-gray-700">Condiciones y Términos</Label>
              <Textarea
                id="buy-conditions"
                placeholder="Condiciones de venta, garantías, inspecciones, etc."
                value={buyFormData.conditions_text}
                onChange={(e) => setBuyFormData({ ...buyFormData, conditions_text: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 min-h-[70px] resize-none"
              />
            </div>

            {/* DISPONIBILIDAD */}
            <div className="space-y-1.5">
              <Label htmlFor="buy-availability" className="text-xs sm:text-sm text-gray-700">Fecha de disponibilidad</Label>
              <Input
                id="buy-availability"
                type="date"
                value={buyFormData.availability_date}
                onChange={(e) => setBuyFormData({ ...buyFormData, availability_date: e.target.value })}
                className="bg-gray-50 border-gray-300 text-sm text-gray-900 h-9"
              />
              <p className="text-[10px] sm:text-xs text-gray-500">¿Cuándo está disponible para entrega?</p>
            </div>

            {/* Imágenes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs sm:text-sm text-gray-700">Imágenes (Opcional)</Label>
                {buyFormData.images.length > 0 && (
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                    {buyFormData.images.length}/10 imágenes
                  </span>
                )}
              </div>
              
              {buyFormData.images.length > 0 && (
                <p className="text-[10px] sm:text-xs text-blue-600 mb-1">
                  💡 La primera imagen será la portada de tu publicación
                </p>
              )}
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-300"
                      />
                      {/* Badge de portada en la primera imagen */}
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-medium">
                          Portada
                        </div>
                      )}
                      {/* Botón eliminar - siempre visible en móvil, hover en desktop */}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-md sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                      {/* Número de imagen */}
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <label className={`border-2 border-dashed rounded-lg p-4 sm:p-5 text-center transition-all cursor-pointer block ${
                buyFormData.images.length >= 10 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-300 hover:border-[#0047FF] hover:bg-blue-50/50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={buyFormData.images.length >= 10}
                />
                <Upload className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 ${
                  buyFormData.images.length >= 10 ? 'text-gray-300' : 'text-gray-400'
                }`} />
                <p className={`text-xs sm:text-sm font-medium ${
                  buyFormData.images.length >= 10 ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {buyFormData.images.length >= 10 
                    ? 'Máximo de imágenes alcanzado' 
                    : 'Click para subir imágenes'}
                </p>
                {buyFormData.images.length < 10 && (
                  <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">
                    PNG, JPG hasta 10MB cada una • {10 - buyFormData.images.length} restantes
                  </p>
                )}
              </label>
            </div>

            {/* Información de compra */}
            <div className="border border-gray-300 rounded-lg p-2.5 sm:p-3">
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5">
                <li>✓ No cobramos comisión por tu venta.</li>
                <li>✓ Negociar siempre es gratis.</li>
                <li>✓ El pago y la entrega se coordinan entre las partes.</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  toast.info("Borrador guardado", {
                    description: "Puedes continuar editando más tarde",
                    icon: <Info className="w-5 h-5" />
                  });
                  onOpenChange(false);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 h-9 text-xs sm:text-sm order-2 sm:order-1"
              >
                Guardar Borrador
              </Button>
              <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 h-9 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-9 text-xs sm:text-sm flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
