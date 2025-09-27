import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const studentName = "María González";
  const currentStatus = "En Práctica";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Buscando Práctica":
        return "bg-warning text-warning-foreground";
      case "En Práctica":
        return "bg-success text-success-foreground";
      case "Práctica Finalizada":
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
          <h1 className="text-3xl font-bold mb-2">Portal de Prácticas DI</h1>
          <p className="text-lg opacity-90">Bienvenido, {studentName}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Status Section */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-accent shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-primary">Estado Actual</CardTitle>
                <Badge className={`${getStatusColor(currentStatus)} px-4 py-2 text-sm font-medium`}>
                  {currentStatus}
                </Badge>
              </div>
              <CardDescription>
                Mantén un seguimiento de tu progreso en el programa de prácticas
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-accent" onClick={() => navigate('/offers')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Buscar Ofertas de Práctica</CardTitle>
              <CardDescription>
                Explora oportunidades de práctica profesional disponibles para estudiantes de Informática
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                Ver Ofertas
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-accent" onClick={() => navigate('/applications')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Ver Mis Postulaciones</CardTitle>
              <CardDescription>
                Revisa el estado de tus postulaciones y gestiona tu proceso de aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                Ver Estado
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-accent" onClick={() => navigate('/reports')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Reportar Avances</CardTitle>
              <CardDescription>
                Registra tus actividades semanales y mantén actualizada tu bitácora de práctica
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                Ir a Bitácora
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bell className="w-5 h-5" />
              Notificaciones y Recordatorios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-l-accent">
                <p className="font-medium text-accent-foreground">Recordatorio: Entrega de informe semanal</p>
                <p className="text-sm text-muted-foreground mt-1">Tienes hasta mañana para entregar tu informe de la semana 8</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-l-primary">
                <p className="font-medium text-primary">Nueva oferta disponible</p>
                <p className="text-sm text-muted-foreground mt-1">Se publicó una nueva oferta para Desarrollador Frontend en TechCorp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;