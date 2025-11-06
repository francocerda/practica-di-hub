import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Clock, Building2, ArrowLeft, Send, Briefcase, Users, DollarSign, Calendar, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickApplicationModal from "@/components/QuickApplicationModal";
import Navbar from "@/components/Navbar";

const Offers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalityFilter, setModalityFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);

  const handleQuickApplication = (offer: typeof offers[0]) => {
    setSelectedOffer(offer);
    setIsApplicationModalOpen(true);
  };

  const handleViewDetails = (offer: typeof offers[0]) => {
    setSelectedOffer(offer);
    setIsDetailsModalOpen(true);
  };

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
      description: "Únete a nuestro equipo para desarrollar aplicaciones web modernas usando React y Node.js. Trabajarás en proyectos reales para clientes nacionales e internacionales.",
      requirements: ["JavaScript/TypeScript", "React", "Node.js", "Git", "Inglés técnico intermedio"],
      benefits: ["Seguro de salud", "Horario flexible", "Capacitaciones", "Ambiente colaborativo"],
      duration: "4-6 meses",
      salary: "$400.000 - $550.000",
      vacancies: 2
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
      description: "Trabaja con grandes volúmenes de datos usando Python, SQL y herramientas de machine learning. Aprenderás técnicas avanzadas de análisis y visualización de datos.",
      requirements: ["Python/R", "SQL", "Power BI o Tableau", "Estadística básica", "Análisis de datos"],
      benefits: ["Mentorías con senior data scientists", "Cursos online", "Trabajo con datos reales", "Certificaciones"],
      duration: "5-6 meses",
      salary: "$450.000 - $600.000",
      vacancies: 1
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
      description: "Ayuda a proteger sistemas empresariales y aprende sobre seguridad informática avanzada. Realizarás auditorías de seguridad y análisis de vulnerabilidades.",
      requirements: ["Redes y protocolos", "Linux", "Criptografía básica", "Inglés avanzado", "Certificaciones (deseable)"],
      benefits: ["Capacitación especializada", "Certificaciones internacionales", "Casos reales", "Mentoría"],
      duration: "6 meses",
      salary: "$350.000 - $500.000",
      vacancies: 3
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
      description: "Desarrolla aplicaciones móviles nativas e híbridas para iOS y Android. Trabajarás con React Native y Flutter en proyectos innovadores.",
      requirements: ["React Native o Flutter", "JavaScript/Dart", "APIs REST", "UI/UX mobile", "Git"],
      benefits: ["Ambiente startup", "Proyectos innovadores", "Flexibilidad", "Stock options"],
      duration: "4 meses",
      salary: "$400.000 - $550.000",
      vacancies: 2
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
      description: "Aprende sobre infraestructura en la nube, CI/CD y automatización de despliegues. Trabajarás con AWS, Docker y Kubernetes.",
      requirements: ["Linux", "Docker", "Git", "Scripting (Bash/Python)", "AWS (deseable)"],
      benefits: ["Certificaciones AWS", "Equipos de última generación", "Trabajo en la nube", "Mentorías"],
      duration: "5 meses",
      salary: "$500.000 - $650.000",
      vacancies: 1
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
      description: "Trabaja en proyectos de machine learning y procesamiento de lenguaje natural. Desarrollarás modelos de IA aplicados a problemas reales del negocio.",
      requirements: ["Python", "TensorFlow o PyTorch", "Machine Learning básico", "Matemáticas", "Inglés técnico"],
      benefits: ["Proyectos de IA real", "Publicaciones", "Networking académico", "Flexibilidad total"],
      duration: "6 meses",
      salary: "$450.000 - $600.000",
      vacancies: 2
    },
    {
      id: 7,
      company: "FinTech Chile",
      logo: "💰",
      position: "Desarrollador Backend Jr.",
      location: "Las Condes",
      modality: "Híbrido",
      schedule: "Full-time",
      area: "Desarrollo Web",
      description: "Desarrolla soluciones backend robustas y escalables para plataformas financieras. Trabajarás con Java, Spring Boot y microservicios.",
      requirements: ["Java", "Spring Boot", "SQL", "APIs REST", "Microservicios (deseable)"],
      benefits: ["Industria financiera", "Estabilidad", "Bonos por desempeño", "Capacitación continua"],
      duration: "5 meses",
      salary: "$500.000 - $700.000",
      vacancies: 1
    },
    {
      id: 8,
      company: "GameDev Studio",
      logo: "🎮",
      position: "Desarrollador de Videojuegos Jr.",
      location: "Ñuñoa",
      modality: "Presencial",
      schedule: "Full-time",
      area: "Desarrollo de Videojuegos",
      description: "Crea experiencias interactivas usando Unity o Unreal Engine. Participarás en todas las fases del desarrollo de videojuegos indie.",
      requirements: ["Unity o Unreal", "C# o C++", "Matemáticas para juegos", "Pasión por videojuegos", "Portfolio"],
      benefits: ["Trabajo en juegos", "Equipo creativo", "Ambiente informal", "Créditos en juegos"],
      duration: "4-5 meses",
      salary: "$350.000 - $500.000",
      vacancies: 2
    },
    {
      id: 9,
      company: "E-Commerce Solutions",
      logo: "🛒",
      position: "Desarrollador Frontend Jr.",
      location: "Santiago Centro",
      modality: "Híbrido",
      schedule: "Part-time",
      area: "Desarrollo Web",
      description: "Desarrolla interfaces de usuario modernas y responsive para plataformas de e-commerce. Trabajarás con React, TypeScript y Tailwind CSS.",
      requirements: ["React", "TypeScript", "Tailwind CSS", "Responsive design", "Git"],
      benefits: ["Trabajo flexible", "Proyectos e-commerce", "Experiencia real", "Posibilidad de continuidad"],
      duration: "4 meses",
      salary: "$300.000 - $450.000",
      vacancies: 3
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
      <Navbar />
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
                      <SelectItem value="Desarrollo de Videojuegos">Desarrollo de Videojuegos</SelectItem>
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
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(offer)}
                  >
                    Ver Detalles
                  </Button>
                  <Button 
                    onClick={() => handleQuickApplication(offer)}
                    className="flex-1 gradient-primary text-primary-foreground font-medium"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Postulación Rápida
                  </Button>
                </div>
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

      {/* Modal de Postulación Rápida */}
      <QuickApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        offer={selectedOffer}
      />

      {/* Modal de Detalles de Oferta */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOffer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-5xl">{selectedOffer.logo}</span>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl text-primary mb-1">
                      {selectedOffer.position}
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                      {selectedOffer.company} • {selectedOffer.location}
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Badges de información rápida */}
                <div className="flex gap-2 flex-wrap">
                  <Badge className={getModalityColor(selectedOffer.modality)}>
                    {selectedOffer.modality}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedOffer.schedule}
                  </Badge>
                  <Badge variant="secondary">
                    {selectedOffer.area}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {selectedOffer.duration}
                  </Badge>
                  <Badge variant="outline">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {selectedOffer.salary}
                  </Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {selectedOffer.vacancies} vacante{selectedOffer.vacancies > 1 ? 's' : ''}
                  </Badge>
                </div>

                <Separator />

                {/* Descripción */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Descripción de la Práctica
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {selectedOffer.description}
                  </p>
                </div>

                <Separator />

                {/* Requisitos */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    📋 Requisitos
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedOffer.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Beneficios */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    ⭐ Beneficios
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedOffer.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success mt-1">●</span>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Información adicional */}
                <div className="grid md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duración</p>
                    <p className="font-medium text-foreground">{selectedOffer.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Remuneración</p>
                    <p className="font-medium text-foreground">{selectedOffer.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vacantes</p>
                    <p className="font-medium text-foreground">
                      {selectedOffer.vacancies} disponible{selectedOffer.vacancies > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="flex-1"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleQuickApplication(selectedOffer);
                    }}
                    className="flex-1 gradient-primary text-primary-foreground font-medium"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Postular Ahora
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Offers;