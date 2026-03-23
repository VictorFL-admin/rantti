import { Card } from "./ui/card";

export default function EstadisticasContent() {
  const estadisticas = [
    {
      id: 1,
      valor: "0",
      descripcion: "Clics de publicaciones"
    },
    {
      id: 2,
      valor: "0",
      descripcion: "Veces que se guardó la publicación"
    },
    {
      id: 3,
      valor: "0",
      descripcion: "Veces que se compartió la publicación"
    },
    {
      id: 4,
      valor: "0",
      descripcion: "Seguidores de Marketplace"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-['Poppins',sans-serif] text-xl font-semibold text-gray-900">
        Estadísticas de Marketplace
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticas.map((stat) => (
          <Card 
            key={stat.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="font-['Poppins',sans-serif] text-3xl font-semibold text-gray-900 mb-2">
              {stat.valor}
            </p>
            <p className="font-['Poppins',sans-serif] text-sm text-gray-600 leading-tight">
              {stat.descripcion}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
