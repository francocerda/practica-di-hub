import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, BookOpen, TrendingUp, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

// Tipos para TypeScript
interface Report {
  id: string;
  week: number;
  hours: number;
  activities: string;
  learnings: string;
  difficulties: string;
  submittedDate: string;
  status: "Pendiente Revisión" | "Aprobado" | "Necesita Revisión";
}

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [weekNumber, setWeekNumber] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [activities, setActivities] = useState("");
  const [learnings, setLearnings] = useState("");
  const [difficulties, setDifficulties] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [reports, setReports] = useState<Report[]>([]);

  const totalSteps = 3;
  const stepNames = ["Información Básica", "Actividades", "Reflexión"];

  // Cargar reportes desde localStorage al montar el componente
  useEffect(() => {
    const savedReports = localStorage.getItem('practiceReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      // Datos iniciales ficticios - Semanas 1, 2 y 3
      const initialReports: Report[] = [
        {
          id: "3",
          week: 3,
          hours: 42,
          activities: "Diseño de base de datos para el proyecto principal, modelado de entidades y relaciones, documentación técnica del modelo ER",
          learnings: "Aprendí sobre normalización de bases de datos, relaciones complejas entre entidades y mejores prácticas de diseño de bases de datos",
          difficulties: "Manejo de transacciones complejas y implementación correcta de rollbacks en casos de error",
          submittedDate: "2024-02-19",
          status: "Aprobado"
        },
        {
          id: "2", 
          week: 2,
          hours: 38,
          activities: "Configuración del entorno de desarrollo, instalación de herramientas necesarias, primeros commits al repositorio del proyecto",
          learnings: "Familiarización con el stack tecnológico de la empresa, Git workflows utilizados por el equipo y metodologías ágiles",
          difficulties: "Configuración inicial de las credenciales de acceso y permisos en los diferentes sistemas",
          submittedDate: "2024-02-12",
          status: "Aprobado"
        },
        {
          id: "1",
          week: 1,
          hours: 40,
          activities: "Inducción general a la empresa, conocimiento del equipo de trabajo, revisión de la documentación del proyecto asignado, setup inicial de ambiente local",
          learnings: "Conocimiento de la cultura organizacional, procesos internos de desarrollo, herramientas colaborativas utilizadas (Jira, Confluence, Slack)",
          difficulties: "Adaptación al ritmo de trabajo del equipo y comprensión del dominio del negocio",
          submittedDate: "2024-02-05",
          status: "Aprobado"
        }
      ];
      setReports(initialReports);
      localStorage.setItem('practiceReports', JSON.stringify(initialReports));
    }
  }, []);

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return weekNumber && hoursWorked;
      case 2:
        return activities;
      case 3:
        return learnings;
      default:
        return false;
    }
  };

  // Calcular progreso dinámicamente basado en reportes enviados
  const completedWeeks = reports.length;
  const totalWeeks = 12;
  const currentWeek = completedWeeks + 1;
  const progressPercentage = (completedWeeks / totalWeeks) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weekNumber || !hoursWorked || !activities || !learnings) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios antes de guardar.",
        variant: "destructive"
      });
      return;
    }

    // Crear nuevo reporte
    const newReport: Report = {
      id: Date.now().toString(), // ID único basado en timestamp
      week: parseInt(weekNumber),
      hours: parseInt(hoursWorked),
      activities,
      learnings,
      difficulties,
      submittedDate: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      status: "Pendiente Revisión"
    };

    // Agregar el nuevo reporte al estado y localStorage
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('practiceReports', JSON.stringify(updatedReports));

    toast({
      title: "✅ Reporte enviado exitosamente",
      description: `Se ha enviado el reporte de la semana ${weekNumber}. Estado: Pendiente Revisión.`,
    });

    // Reset form y volver al paso 1
    setWeekNumber("");
    setHoursWorked("");
    setActivities("");
    setLearnings("");
    setDifficulties("");
    setCurrentStep(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pendiente Revisión":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Necesita Revisión":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
          <h1 className="text-3xl font-bold mb-2">Mi Bitácora de Práctica</h1>
          <p className="text-lg opacity-90">Registra tus actividades semanales y mantén un seguimiento de tu progreso</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Progress Section */}
        <Card className="mb-8 shadow-md border-l-4 border-l-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              Progreso de Práctica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {completedWeeks} de {totalWeeks} semanas completadas
                </span>
                <span className="text-sm font-medium text-accent">{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-3" />
              <p className="text-sm text-muted-foreground">
                Próxima semana a reportar: <strong>Semana {currentWeek}</strong>
              </p>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Aprobados: {reports.filter(r => r.status === "Aprobado").length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Pendientes: {reports.filter(r => r.status === "Pendiente Revisión").length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Necesitan Revisión: {reports.filter(r => r.status === "Necesita Revisión").length}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Te quedan {totalWeeks - currentWeek} semanas para completar tu práctica profesional
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* New Report Form */}
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BookOpen className="w-5 h-5" />
                  Nuevo Reporte Semanal
                </CardTitle>
                <CardDescription>
                  Paso {currentStep} de {totalSteps}: {stepNames[currentStep - 1]}
                </CardDescription>
                
                {/* Progress Indicator */}
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    {stepNames.map((stepName, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          index + 1 === currentStep 
                            ? 'bg-primary text-primary-foreground' 
                            : isStepComplete(index + 1)
                              ? 'bg-success text-success-foreground'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {isStepComplete(index + 1) && index + 1 !== currentStep ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        {index < stepNames.length - 1 && (
                          <div className={`w-12 h-0.5 ml-2 ${
                            isStepComplete(index + 1) ? 'bg-success' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {stepNames.map((stepName, index) => (
                      <span key={index} className={`text-center ${
                        index + 1 === currentStep ? 'text-primary font-medium' : ''
                      }`}>
                        {stepName}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            Número de Semana *
                          </label>
                          <Input
                            type="number"
                            placeholder="Ej: 8"
                            value={weekNumber}
                            onChange={(e) => setWeekNumber(e.target.value)}
                            min="1"
                            max="12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            Horas Trabajadas *
                          </label>
                          <Input
                            type="number"
                            placeholder="Ej: 40"
                            value={hoursWorked}
                            onChange={(e) => setHoursWorked(e.target.value)}
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          disabled={!isStepComplete(1)}
                          className="gradient-primary text-primary-foreground"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Activities */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Tareas Realizadas *
                        </label>
                        <Textarea
                          placeholder="• Desarrollé una nueva funcionalidad para el sistema&#10;• Participé en reuniones de planificación&#10;• Revisé código de otros desarrolladores..."
                          value={activities}
                          onChange={(e) => setActivities(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          disabled={!isStepComplete(2)}
                          className="gradient-primary text-primary-foreground"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Reflection */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Principales Aprendizajes *
                        </label>
                        <Textarea
                          placeholder="¿Qué nuevas habilidades, conocimientos o experiencias adquiriste esta semana?"
                          value={learnings}
                          onChange={(e) => setLearnings(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Dificultades Encontradas (Opcional)
                        </label>
                        <Textarea
                          placeholder="¿Qué obstáculos enfrentaste y cómo los resolviste o planeas resolverlos?"
                          value={difficulties}
                          onChange={(e) => setDifficulties(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={!isStepComplete(3)}
                          className="gradient-primary text-primary-foreground font-medium"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Guardar Avance
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Previous Reports */}
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calendar className="w-5 h-5" />
                  Reportes Anteriores
                </CardTitle>
                <CardDescription>
                  Historial de tus entregas semanales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">Semana {report.week}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{report.hours} horas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(report.submittedDate).toLocaleDateString('es-ES')}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(report.status)} border`}>
                          {report.status}
                        </Badge>
                      </div>
                      
                      {/* Preview de actividades */}
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium text-foreground">Actividades:</span>
                          <p className="text-muted-foreground mt-1 line-clamp-2">
                            {report.activities}
                          </p>
                        </div>
                        {report.learnings && (
                          <div>
                            <span className="font-medium text-foreground">Aprendizajes:</span>
                            <p className="text-muted-foreground mt-1 line-clamp-1">
                              {report.learnings}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {reports.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Aún no has enviado reportes</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;