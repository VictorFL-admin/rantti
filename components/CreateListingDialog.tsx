import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, X, ShoppingBag, Tag } from "lucide-react";
// import { toast } from "sonner";

interface CreateListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ListingType = 'buy' | 'sell';

// Formulario para VENTA (simple, sin imágenes)
interface SellFormData {
  category_id: string;
  title: string;
  description: string;
  location_text: string;
  price_suggested: string;
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

export default function CreateListingDialog({ open, onOpenChange }: CreateListingDialogProps) {
  const [activeTab, setActiveTab] = useState<ListingType>('sell');
  
  const [sellFormData, setSellFormData] = useState<SellFormData>({
    category_id: "",
    title: "",
    description: "",
    location_text: "",
    price_suggested: ""
  });

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + buyFormData.images.length > 10) {
      // toast.error("Máximo 10 imágenes", {
      //   description: "Solo puedes subir hasta 10 imágenes por publicación"
      // });
      alert("Máximo 10 imágenes. Solo puedes subir hasta 10 imágenes por publicación");
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        // toast.error(`${file.name} es muy grande`, {
        //   description: "Cada imagen debe ser menor a 10MB"
        // });
        alert(`${file.name} es muy grande. Cada imagen debe ser menor a 10MB`);
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

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sellFormData.title || !sellFormData.category_id || !sellFormData.price_suggested || !sellFormData.description) {
      // toast.error("Campos requeridos", {
      //   description: "Por favor completa todos los campos obligatorios"
      // });
      alert("Campos requeridos. Por favor completa todos los campos obligatorios");
      return;
    }

    console.log("Publicación de VENTA:", sellFormData);
    
    // toast.success("¡Publicación creada!", {
    //   description: "Tu artículo está en moderación y será visible pronto.",
    // });
    alert("¡Publicación creada! Tu artículo está en moderación y será visible pronto.");
    
    resetForms();
    onOpenChange(false);
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buyFormData.title || !buyFormData.category_id || !buyFormData.description) {
      // toast.error("Campos requeridos", {
      //   description: "Por favor completa todos los campos obligatorios"
      // });
      alert("Campos requeridos. Por favor completa todos los campos obligatorios");
      return;
    }

    console.log("Solicitud de COMPRA:", buyFormData);
    
    // toast.success("¡Solicitud publicada!", {
    //   description: "Tu búsqueda ha sido publicada. Recibirás ofertas pronto.",
    // });
    alert("¡Solicitud publicada! Tu búsqueda ha sido publicada. Recibirás ofertas pronto.");
    
    resetForms();
    onOpenChange(false);
  };

  const resetForms = () => {
    setSellFormData({
      category_id: "",
      title: "",
      description: "",
      location_text: "",
      price_suggested: ""
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
    setActiveTab('sell');
  };

  // Categorías actualizadas según tu marketplace
  const categories = [
    { value: "1", label: "Joyas Exclusivas" },
    { value: "2", label: "Relojes de Lujo" },
    { value: "3", label: "Arte & Coleccionables" },
    { value: "4", label: "Consolas Retro" },
    { value: "5", label: "Tech Premium" },
    { value: "6", label: "Objetos Únicos" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nueva Publicación</DialogTitle>
          <DialogDescription className="text-slate-400">
            Elige si quieres vender o comprar un artículo.
          </DialogDescription>
        </DialogHeader>

        {/* TABS */}
        <div className="flex gap-2 border-b border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('sell')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'sell'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            <Tag className="w-4 h-4" />
            Quiero Vender
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'buy'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Busco Comprar
          </button>
        </div>

        {/* FORMULARIO DE VENTA */}
        {activeTab === 'sell' && (
          <form onSubmit={handleSellSubmit} className="space-y-5">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="sell-title" className="text-slate-300">Título *</Label>
              <Input
                id="sell-title"
                placeholder="Ej: Rolex Submariner Oro Blanco 2023"
                value={sellFormData.title}
                onChange={(e) => setSellFormData({ ...sellFormData, title: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label htmlFor="sell-category" className="text-slate-300">Categoría *</Label>
              <Select 
                value={sellFormData.category_id} 
                onValueChange={(value) => setSellFormData({ ...sellFormData, category_id: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Selecciona una categoría..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="sell-price" className="text-slate-300">Precio sugerido *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">S/</span>
                <Input
                  id="sell-price"
                  type="number"
                  step="0.01"
                  placeholder="50000.00"
                  value={sellFormData.price_suggested}
                  onChange={(e) => setSellFormData({ ...sellFormData, price_suggested: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 pl-10"
                  required
                />
              </div>
              <p className="text-xs text-slate-400">Este precio es negociable</p>
            </div>

            {/* Ubicación */}
            <div className="space-y-2">
              <Label htmlFor="sell-location" className="text-slate-300">Ubicación</Label>
              <Input
                id="sell-location"
                placeholder="Ej: Lima, Perú"
                value={sellFormData.location_text}
                onChange={(e) => setSellFormData({ ...sellFormData, location_text: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="sell-description" className="text-slate-300">Descripción *</Label>
              <Textarea
                id="sell-description"
                placeholder="Describe tu artículo, características, estado, historial, etc."
                value={sellFormData.description}
                onChange={(e) => setSellFormData({ ...sellFormData, description: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Publicar Venta
              </Button>
            </div>
          </form>
        )}

        {/* FORMULARIO DE COMPRA */}
        {activeTab === 'buy' && (
          <form onSubmit={handleBuySubmit} className="space-y-5">
            {/* TÍTULO */}
            <div className="space-y-2">
              <Label htmlFor="buy-title" className="text-slate-300">Título de la publicación *</Label>
              <Input
                id="buy-title"
                placeholder="Ej: Busco Rolex Submariner"
                value={buyFormData.title}
                onChange={(e) => setBuyFormData({ ...buyFormData, title: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <p className="text-xs text-slate-400">Máximo 200 caracteres</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CATEGORÍA */}
              <div className="space-y-2">
                <Label htmlFor="buy-category" className="text-slate-300">Categoría *</Label>
                <Select 
                  value={buyFormData.category_id} 
                  onValueChange={(value) => setBuyFormData({ ...buyFormData, category_id: value })}
                  required
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* MONEDA */}
              <div className="space-y-2">
                <Label htmlFor="buy-currency" className="text-slate-300">Moneda</Label>
                <Select 
                  value={buyFormData.currency} 
                  onValueChange={(value) => setBuyFormData({ ...buyFormData, currency: value })}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="PEN">PEN (S/)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PRECIO */}
            <div className="space-y-2">
              <Label htmlFor="buy-price" className="text-slate-300">Precio sugerido *</Label>
              <Input
                id="buy-price"
                type="number"
                step="0.01"
                placeholder="50000.00"
                value={buyFormData.price_suggested}
                onChange={(e) => setBuyFormData({ ...buyFormData, price_suggested: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <p className="text-xs text-slate-400">Este precio es negociable</p>
            </div>

            {/* UBICACIÓN */}
            <div className="space-y-2">
              <Label htmlFor="buy-location" className="text-slate-300">Ubicación</Label>
              <Input
                id="buy-location"
                placeholder="Ej: Lima, Perú"
                value={buyFormData.location_text}
                onChange={(e) => setBuyFormData({ ...buyFormData, location_text: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400">Máximo 200 caracteres</p>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-2">
              <Label htmlFor="buy-description" className="text-slate-300">Descripción *</Label>
              <Textarea
                id="buy-description"
                placeholder="Describe tu artículo, características, historial, etc."
                value={buyFormData.description}
                onChange={(e) => setBuyFormData({ ...buyFormData, description: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
                required
              />
            </div>

            {/* CONDICIONES */}
            <div className="space-y-2">
              <Label htmlFor="buy-conditions" className="text-slate-300">Condiciones y Términos</Label>
              <Textarea
                id="buy-conditions"
                placeholder="Condiciones de venta, garantías, inspecciones, etc."
                value={buyFormData.conditions_text}
                onChange={(e) => setBuyFormData({ ...buyFormData, conditions_text: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 min-h-[80px]"
              />
            </div>

            {/* DISPONIBILIDAD */}
            <div className="space-y-2">
              <Label htmlFor="buy-availability" className="text-slate-300">Fecha de disponibilidad</Label>
              <Input
                id="buy-availability"
                type="date"
                value={buyFormData.availability_date}
                onChange={(e) => setBuyFormData({ ...buyFormData, availability_date: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
              <p className="text-xs text-slate-400">¿Cuándo está disponible para entrega?</p>
            </div>

            {/* Imágenes */}
            <div className="space-y-2">
              <Label className="text-slate-300">Imágenes (Opcional, máximo 10)</Label>
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-slate-600 transition-colors cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Click para subir imágenes</p>
                <p className="text-slate-500 text-xs mt-1">PNG, JPG hasta 10MB cada una</p>
              </label>
            </div>

            {/* Estado de moderación info */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-300">
                📋 <span className="font-semibold">Moderación:</span> Tu publicación será revisada antes de publicarse
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-4 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // toast.success("Borrador guardado", {
                  //   description: "Puedes continuar editando más tarde"
                  // });
                  alert("Borrador guardado. Puedes continuar editando más tarde");
                  onOpenChange(false);
                }}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Guardar Borrador
              </Button>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
