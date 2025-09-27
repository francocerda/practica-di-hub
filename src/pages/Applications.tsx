import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, Calendar, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();

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
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
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