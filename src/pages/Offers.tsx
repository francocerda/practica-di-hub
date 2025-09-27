import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Building2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalityFilter, setModalityFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  const offers = [
    {
      id: 1,
      company: "TechCorp Solutions",
      logo: "🏢",
      position: "Desarrollador Full-Stack Jr.",
      location: "Santiago Centro",
      modality: "Híbrido",
      schedule: "Full-time",
      area: "Desarrollo Web",
      description: "Únete a nuestro equipo para desarrollar aplicaciones web modernas usando React y Node.js"
    },
    {
      id: 2,
      company: "DataSciencePro",
      logo: "📊",
      position: "Analista de Datos Jr.",
      location: "Las Condes",
      modality: "Presencial",
      schedule: "Full-time",
      area: "Ciencia de Datos",
      description: "Trabaja con grandes volúmenes de datos usando Python, SQL y herramientas de machine learning"
    },
    {
      id: 3,
      company: "CyberSecure Chile",
      logo: "🔒",
      position: "Especialista en Ciberseguridad Jr.",
      location: "Remoto",
      modality: "Remoto",
      schedule: "Part-time",
      area: "Ciberseguridad",
      description: "Ayuda a proteger sistemas empresariales y aprende sobre seguridad informática avanzada"
    },
    {
      id: 4,
      company: "MobileTech Innovations",
      logo: "📱",
      position: "Desarrollador Mobile Jr.",
      location: "Providencia",
      modality: "Presencial",
      schedule: "Full-time",
      area: "Desarrollo Móvil",
      description: "Desarrolla aplicaciones móviles nativas e híbridas para iOS y Android"
    },
    {
      id: 5,
      company: "CloudFirst Systems",
      logo: "☁️",
      position: "DevOps Engineer Jr.",
      location: "Vitacura",
      modality: "Híbrido",
      schedule: "Full-time",
      area: "DevOps",
      description: "Aprende sobre infraestructura en la nube, CI/CD y automatización de despliegues"
    },
    {
      id: 6,
      company: "AI Innovations Lab",
      logo: "🤖",
      position: "Desarrollador de IA Jr.",
      location: "Remoto",
      modality: "Remoto",
      schedule: "Part-time",
      area: "Inteligencia Artificial",
      description: "Trabaja en proyectos de machine learning y procesamiento de lenguaje natural"
    }
  ];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality = modalityFilter === "all" || offer.modality === modalityFilter;
    const matchesSchedule = scheduleFilter === "all" || offer.schedule === scheduleFilter;
    const matchesArea = areaFilter === "all" || offer.area === areaFilter;

    return matchesSearch && matchesModality && matchesSchedule && matchesArea;
  });

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Remoto":
        return "bg-success text-success-foreground";
      case "Híbrido":
        return "bg-warning text-warning-foreground";
      case "Presencial":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Ofertas de Práctica</h1>
          <p className="text-lg opacity-90">Encuentra la oportunidad perfecta para tu práctica profesional</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Search and Filters */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Buscar y Filtrar Ofertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cargo, empresa o tecnología..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Modalidad</label>
                  <Select value={modalityFilter} onValueChange={setModalityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las modalidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las modalidades</SelectItem>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                      <SelectItem value="Remoto">Remoto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Jornada</label>
                  <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las jornadas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las jornadas</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Área</label>
                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las áreas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las áreas</SelectItem>
                      <SelectItem value="Desarrollo Web">Desarrollo Web</SelectItem>
                      <SelectItem value="Ciencia de Datos">Ciencia de Datos</SelectItem>
                      <SelectItem value="Ciberseguridad">Ciberseguridad</SelectItem>
                      <SelectItem value="Desarrollo Móvil">Desarrollo Móvil</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Inteligencia Artificial">Inteligencia Artificial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Mostrando {filteredOffers.length} de {offers.length} ofertas
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{offer.logo}</div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-2">{offer.position}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{offer.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.location}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getModalityColor(offer.modality)}>
                        {offer.modality}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {offer.schedule}
                      </Badge>
                      <Badge variant="secondary">
                        {offer.area}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {offer.description}
                </CardDescription>
                <Button className="w-full gradient-primary text-primary-foreground font-medium">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2 text-muted-foreground">No se encontraron ofertas</CardTitle>
              <CardDescription>
                Intenta ajustar tus filtros de búsqueda para encontrar más oportunidades
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Offers;