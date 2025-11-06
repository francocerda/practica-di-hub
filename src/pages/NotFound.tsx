import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

/**
 * Página de error 404 que se muestra cuando el usuario intenta acceder a una ruta inexistente
 */
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <header className="gradient-primary text-primary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Portal de Prácticas DI</h1>
          <p className="text-lg opacity-90">Página no encontrada</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full text-center shadow-lg">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-6 text-8xl">🔍</div>
            <CardTitle className="text-6xl font-bold text-primary mb-4">404</CardTitle>
            <CardTitle className="text-2xl text-foreground mb-2">Página No Encontrada</CardTitle>
            <CardDescription className="text-lg">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p>Ruta intentada: <code className="font-mono font-medium">{location.pathname}</code></p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver Atrás
              </Button>
              <Button 
                onClick={() => navigate('/')}
                size="lg"
                className="gradient-primary text-primary-foreground font-medium flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Ir al Dashboard
              </Button>
            </div>

            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-4">¿Buscas algo específico?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  onClick={() => navigate('/offers')}
                  variant="secondary"
                  size="sm"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Ver Ofertas
                </Button>
                <Button 
                  onClick={() => navigate('/applications')}
                  variant="secondary"
                  size="sm"
                >
                  Mis Postulaciones
                </Button>
                <Button 
                  onClick={() => navigate('/reports')}
                  variant="secondary"
                  size="sm"
                >
                  Mi Bitácora
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NotFound;
