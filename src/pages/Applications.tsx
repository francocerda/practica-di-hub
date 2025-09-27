import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building2, Calendar, FileText, Eye, MapPin, Clock, Users, Mail, Phone, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Tipos para los detalles de las empresas
interface CompanyDetails {
  id: number;
  company: string;
  logo: string;
  position: string;
  sector: string;
  size: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  supervisor: string;
  email: string;
  phone: string;
  duration: string;
  schedule: string;
  modality: string;
  timeline: Array<{
    date: string;
    event: string;
  }>;
}

const Applications = () => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);

  const applications = [
    {
      id: 1,
      company: "TechCorp Solutions",
      logo: "🏢",
      position: "Desarrollador Full-Stack Jr.",
      appliedDate: "2024-01-20",
      status: "En Revisión",
      lastUpdate: "2024-01-22",
      notes: "Se realizó entrevista técnica el 22/01. Esperando respuesta del equipo de RRHH."
    },
    {
      id: 2,
      company: "DataSciencePro",
      logo: "📊", 
      position: "Analista de Datos Jr.",
      appliedDate: "2024-01-18",
      status: "Entrevista Programada",
      lastUpdate: "2024-01-21",
      notes: "Entrevista programada para el 25/01 a las 14:00. Preparar presentación de proyecto de análisis de datos."
    },
    {
      id: 3,
      company: "CyberSecure Chile",
      logo: "🔒",
      position: "Especialista en Ciberseguridad Jr.",
      appliedDate: "2024-01-15",
      status: "Rechazada",
      lastUpdate: "2024-01-19",
      notes: "La empresa decidió continuar con otros candidatos. Se recomienda fortalecer conocimientos en análisis de malware."
    },
    {
      id: 4,
      company: "MobileTech Innovations",
      logo: "📱",
      position: "Desarrollador Mobile Jr.",
      appliedDate: "2024-01-12",
      status: "Aceptada",
      lastUpdate: "2024-01-16",
      notes: "¡Felicitaciones! Has sido seleccionado para la práctica. Inicio: 1 de febrero. Contactar a Juan Pérez (juan@mobiletech.cl)."
    }
  ];

  // Datos detallados de las empresas
  const companyDetails: CompanyDetails[] = [
    {
      id: 1,
      company: "TechCorp Solutions",
      logo: "🏢",
      position: "Desarrollador Full-Stack Jr.",
      sector: "Desarrollo de Software",
      size: "51-200 empleados",
      location: "Santiago, Las Condes",
      description: "Empresa líder en soluciones tecnológicas para empresas medianas y grandes. Nos especializamos en desarrollo de aplicaciones web y móviles, con más de 10 años de experiencia en el mercado chileno.",
      requirements: [
        "Conocimientos en JavaScript/TypeScript",
        "Experiencia con React y Node.js",
        "Familiaridad con bases de datos SQL",
        "Conocimientos básicos de Git",
        "Inglés técnico intermedio"
      ],
      benefits: [
        "Seguro de salud complementario",
        "Horario flexible",
        "Capacitaciones internas",
        "Ambiente de trabajo colaborativo",
        "Posibilidad de continuidad laboral"
      ],
      supervisor: "María González",
      email: "maria.gonzalez@techcorp.cl",
      phone: "+56 9 8765 4321",
      duration: "4 meses",
      schedule: "Lunes a Viernes, 9:00 - 18:00",
      modality: "Híbrido (3 días presencial, 2 días remoto)",
      timeline: [
        { date: "20/01/2024", event: "Postulación enviada" },
        { date: "22/01/2024", event: "Entrevista técnica realizada" },
        { date: "25/01/2024", event: "Esperando respuesta de RRHH" }
      ]
    },
    {
      id: 2,
      company: "DataSciencePro",
      logo: "📊",
      position: "Analista de Datos Jr.",
      sector: "Análisis de Datos y BI",
      size: "11-50 empleados",
      location: "Santiago, Providencia",
      description: "Consultora especializada en análisis de datos y business intelligence. Trabajamos con grandes corporaciones ayudándolas a tomar decisiones basadas en datos.",
      requirements: [
        "Conocimientos en Python/R",
        "Experiencia con SQL",
        "Familiaridad con Power BI o Tableau",
        "Conocimientos estadísticos básicos",
        "Capacidad analítica"
      ],
      benefits: [
        "Mentorías con senior data scientists",
        "Acceso a cursos online",
        "Trabajo con datos reales",
        "Networking con industria",
        "Certificaciones pagadas"
      ],
      supervisor: "Carlos Mendoza",
      email: "carlos.mendoza@datasciencepro.cl",
      phone: "+56 9 7654 3210",
      duration: "5 meses",
      schedule: "Lunes a Viernes, 8:30 - 17:30",
      modality: "Presencial",
      timeline: [
        { date: "18/01/2024", event: "Postulación enviada" },
        { date: "21/01/2024", event: "Revisión de CV aprobada" },
        { date: "25/01/2024", event: "Entrevista técnica programada - 14:00" }
      ]
    },
    {
      id: 3,
      company: "CyberSecure Chile",
      logo: "🔒",
      position: "Especialista en Ciberseguridad Jr.",
      sector: "Ciberseguridad",
      size: "201-500 empleados",
      location: "Santiago, Vitacura",
      description: "Empresa líder en ciberseguridad en Chile, brindando servicios de consultoría y soluciones de seguridad informática a empresas de todos los tamaños.",
      requirements: [
        "Conocimientos en redes y protocolos",
        "Familiaridad con Linux",
        "Conceptos básicos de criptografía",
        "Inglés avanzado",
        "Certificaciones de seguridad (deseable)"
      ],
      benefits: [
        "Capacitación en herramientas especializadas",
        "Certificaciones internacionales",
        "Exposición a casos reales",
        "Mentoría especializada",
        "Red de contactos en ciberseguridad"
      ],
      supervisor: "Andrea Silva",
      email: "andrea.silva@cybersecure.cl",
      phone: "+56 9 6543 2109",
      duration: "6 meses",
      schedule: "Lunes a Viernes, 9:00 - 18:00",
      modality: "Presencial",
      timeline: [
        { date: "15/01/2024", event: "Postulación enviada" },
        { date: "17/01/2024", event: "Entrevista inicial realizada" },
        { date: "19/01/2024", event: "Decisión: No seleccionado" }
      ]
    },
    {
      id: 4,
      company: "MobileTech Innovations",
      logo: "📱",
      position: "Desarrollador Mobile Jr.",
      sector: "Desarrollo Mobile",
      size: "11-50 empleados",
      location: "Santiago, Las Condes",
      description: "Startup en crecimiento especializada en desarrollo de aplicaciones móviles innovadoras. Trabajamos con startups y empresas consolidadas en la creación de apps iOS y Android.",
      requirements: [
        "Conocimientos en React Native o Flutter",
        "Experiencia con JavaScript/Dart",
        "Familiaridad con APIs REST",
        "Conocimientos de UI/UX mobile",
        "Inglés intermedio"
      ],
      benefits: [
        "Ambiente startup dinámico",
        "Participación en proyectos innovadores",
        "Flexibilidad horaria",
        "Oportunidad de crecimiento rápido",
        "Stock options (si continúas)"
      ],
      supervisor: "Juan Pérez",
      email: "juan.perez@mobiletech.cl",
      phone: "+56 9 5432 1098",
      duration: "4 meses",
      schedule: "Lunes a Viernes, 9:30 - 18:30",
      modality: "Híbrido (2 días presencial, 3 días remoto)",
      timeline: [
        { date: "12/01/2024", event: "Postulación enviada" },
        { date: "14/01/2024", event: "Entrevista técnica aprobada" },
        { date: "16/01/2024", event: "¡Seleccionado! Iniciar 1 de febrero" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Revisión":
        return "bg-warning text-warning-foreground";
      case "Entrevista Programada":
        return "bg-primary text-primary-foreground";
      case "Aceptada":
        return "bg-success text-success-foreground";
      case "Rechazada":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En Revisión":
        return "📋";
      case "Entrevista Programada":
        return "🗓️";
      case "Aceptada":
        return "✅";
      case "Rechazada":
        return "❌";
      default:
        return "📄";
    }
  };

  const getCompanyDetails = (id: number): CompanyDetails | undefined => {
    return companyDetails.find(detail => detail.id === id);
  };

  const getTimelineIcon = (event: string) => {
    if (event.includes("Postulación")) return "📝";
    if (event.includes("Entrevista")) return "🎯";
    if (event.includes("Seleccionado") || event.includes("Aprobada")) return "✅";
    if (event.includes("Esperando") || event.includes("Programada")) return "⏳";
    if (event.includes("Rechazado") || event.includes("No seleccionado")) return "❌";
    return "📋";
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
          <h1 className="text-3xl font-bold mb-2">Mis Postulaciones</h1>
          <p className="text-lg opacity-90">Revisa el estado de tus aplicaciones a prácticas profesionales</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-primary">4</CardTitle>
              <CardDescription>Total Postulaciones</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-l-4 border-l-warning">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-warning">1</CardTitle>
              <CardDescription>En Revisión</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-l-4 border-l-success">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-success">1</CardTitle>
              <CardDescription>Aceptadas</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-l-4 border-l-destructive">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-destructive">1</CardTitle>
              <CardDescription>Rechazadas</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{application.logo}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary mb-2">{application.position}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{application.company}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Postulado: {new Date(application.appliedDate).toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>Actualizado: {new Date(application.lastUpdate).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${getStatusColor(application.status)} px-3 py-1`}>
                      <span className="mr-2">{getStatusIcon(application.status)}</span>
                      {application.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notas y Comentarios
                  </h4>
                  <p className="text-sm text-muted-foreground">{application.notes}</p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      {(() => {
                        const details = getCompanyDetails(application.id);
                        if (!details) return <div>No se encontraron detalles</div>;
                        
                        return (
                          <>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3 text-xl">
                                <span className="text-2xl">{details.logo}</span>
                                <div>
                                  <div>{details.company}</div>
                                  <div className="text-base font-normal text-muted-foreground">{details.position}</div>
                                </div>
                              </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Información básica de la empresa */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Building2 className="w-4 h-4" />
                                    Sector
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.sector}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Users className="w-4 h-4" />
                                    Tamaño
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.size}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <MapPin className="w-4 h-4" />
                                    Ubicación
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.location}</p>
                                </div>
                              </div>

                              <Separator />

                              {/* Descripción de la empresa */}
                              <div>
                                <h4 className="font-medium mb-2">Sobre la Empresa</h4>
                                <p className="text-sm text-muted-foreground">{details.description}</p>
                              </div>

                              <Separator />

                              {/* Detalles de la práctica */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    Duración
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.duration}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Clock className="w-4 h-4" />
                                    Horarios
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.schedule}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Building2 className="w-4 h-4" />
                                    Modalidad
                                  </div>
                                  <p className="text-sm text-muted-foreground">{details.modality}</p>
                                </div>
                              </div>

                              <Separator />

                              {/* Requisitos y beneficios */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium mb-3">Requisitos</h4>
                                  <ul className="space-y-2">
                                    {details.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-3">Beneficios</h4>
                                  <ul className="space-y-2">
                                    {details.benefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <Separator />

                              {/* Información de contacto */}
                              <div>
                                <h4 className="font-medium mb-3">Contacto del Supervisor</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                      <Users className="w-4 h-4" />
                                      Supervisor
                                    </div>
                                    <p className="text-sm text-muted-foreground">{details.supervisor}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                      <Mail className="w-4 h-4" />
                                      Email
                                    </div>
                                    <p className="text-sm text-muted-foreground">{details.email}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                      <Phone className="w-4 h-4" />
                                      Teléfono
                                    </div>
                                    <p className="text-sm text-muted-foreground">{details.phone}</p>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Timeline de la postulación */}
                              <div>
                                <h4 className="font-medium mb-3">Estado de Postulación</h4>
                                <div className="space-y-3">
                                  {details.timeline.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                                        {getTimelineIcon(item.event)}
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">{item.event}</p>
                                        <p className="text-xs text-muted-foreground">{item.date}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </DialogContent>
                  </Dialog>
                  {application.status === "Entrevista Programada" && (
                    <Button className="gradient-primary text-primary-foreground">
                      Preparar Entrevista
                    </Button>
                  )}
                  {application.status === "Aceptada" && (
                    <Button className="bg-success text-success-foreground hover:bg-success/90">
                      Ver Siguiente Paso
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2 text-muted-foreground">No tienes postulaciones</CardTitle>
              <CardDescription className="mb-6">
                Comienza a postular a ofertas de práctica para ver el seguimiento aquí
              </CardDescription>
              <Button onClick={() => navigate('/offers')} className="gradient-primary text-primary-foreground">
                Explorar Ofertas
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Applications;