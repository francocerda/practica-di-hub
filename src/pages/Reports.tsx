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

/**
 * Tipos para TypeScript
 */
interface Report {
  id: string;
  date: string;
  hours: number;
  activities: string;
  learnings: string;
  difficulties: string;
  submittedDate: string;
  status: "Pendiente Revisión" | "Aprobado" | "Necesita Revisión";
}

/**
 * Página de bitácora de práctica donde los estudiantes registran sus avances diarios
 */
const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoursWorked, setHoursWorked] = useState("");
  const [activities, setActivities] = useState("");
  const [learnings, setLearnings] = useState("");
  const [difficulties, setDifficulties] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [reports, setReports] = useState<Report[]>([]);

  const totalSteps = 3;
  const stepNames = ["Información Básica", "Actividades", "Reflexión"];

  /**
   * Cargar reportes desde localStorage al montar el componente
   */
  useEffect(() => {
    const savedReports = localStorage.getItem('practiceReports');
    if (savedReports) {
      const parsedReports = JSON.parse(savedReports);
      // Migrar reportes antiguos que tenían 'week' a 'date'
      const migratedReports = parsedReports.map((report: any) => {
        if (report.week && !report.date) {
          // Si tiene week pero no date, generar una fecha aproximada
          // Basado en el número de semana desde el inicio de la práctica
          const startDate = new Date('2024-02-05'); // Fecha de inicio aproximada
          const reportDate = new Date(startDate);
          reportDate.setDate(startDate.getDate() + (report.week - 1) * 7);
          return {
            ...report,
            date: reportDate.toISOString().split('T')[0]
          };
        }
        return report;
      });
      // Ordenar por fecha (más reciente primero)
      const sortedReports = migratedReports.sort((a: Report, b: Report) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setReports(sortedReports);
      // Actualizar localStorage con formato migrado
      if (parsedReports.some((r: any) => r.week && !r.date)) {
        localStorage.setItem('practiceReports', JSON.stringify(sortedReports));
      }
    } else {
      // Datos iniciales ficticios - Días de práctica
      const initialReports: Report[] = [
        {
          id: "3",
          date: "2024-02-19",
          hours: 8,
          activities: "Diseño de base de datos para el proyecto principal, modelado de entidades y relaciones, documentación técnica del modelo ER",
          learnings: "Aprendí sobre normalización de bases de datos, relaciones complejas entre entidades y mejores prácticas de diseño de bases de datos",
          difficulties: "Manejo de transacciones complejas y implementación correcta de rollbacks en casos de error",
          submittedDate: "2024-02-19",
          status: "Aprobado"
        },
        {
          id: "2", 
          date: "2024-02-18",
          hours: 7.5,
          activities: "Configuración del entorno de desarrollo, instalación de herramientas necesarias, primeros commits al repositorio del proyecto",
          learnings: "Familiarización con el stack tecnológico de la empresa, Git workflows utilizados por el equipo y metodologías ágiles",
          difficulties: "Configuración inicial de las credenciales de acceso y permisos en los diferentes sistemas",
          submittedDate: "2024-02-18",
          status: "Aprobado"
        },
        {
          id: "1",
          date: "2024-02-17",
          hours: 8,
          activities: "Inducción general a la empresa, conocimiento del equipo de trabajo, revisión de la documentación del proyecto asignado, setup inicial de ambiente local",
          learnings: "Conocimiento de la cultura organizacional, procesos internos de desarrollo, herramientas colaborativas utilizadas (Jira, Confluence, Slack)",
          difficulties: "Adaptación al ritmo de trabajo del equipo y comprensión del dominio del negocio",
          submittedDate: "2024-02-17",
          status: "Aprobado"
        }
      ];
      setReports(initialReports);
      localStorage.setItem('practiceReports', JSON.stringify(initialReports));
    }
  }, []);

  /**
   * Verifica si un paso del formulario está completo
   */
  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return reportDate && hoursWorked;
      case 2:
        return activities;
      case 3:
        return learnings;
      default:
        return false;
    }
  };

  /**
   * Calcular progreso dinámicamente basado en reportes enviados
   * Considerando una práctica de aproximadamente 3 meses (90 días laborables)
   */
  const completedDays = reports.length;
  const totalDays = 90;
  const progressPercentage = (completedDays / totalDays) * 100;

  /**
   * Maneja el envío del formulario de reporte diario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportDate || !hoursWorked || !activities || !learnings) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios antes de guardar.",
        variant: "destructive"
      });
      return;
    }

    /**
     * Verificar si ya existe un reporte para esta fecha
     */
    const existingReport = reports.find(r => r.date === reportDate);
    if (existingReport) {
      toast({
        title: "Reporte duplicado",
        description: "Ya existe un reporte para esta fecha. Por favor selecciona otra fecha.",
        variant: "destructive"
      });
      return;
    }

    /**
     * Crear nuevo reporte
     */
    const newReport: Report = {
      id: Date.now().toString(), // ID único basado en timestamp
      date: reportDate,
      hours: parseFloat(hoursWorked),
      activities,
      learnings,
      difficulties,
      submittedDate: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      status: "Pendiente Revisión"
    };

    /**
     * Agregar el nuevo reporte al estado y localStorage
     */
    const updatedReports = [newReport, ...reports].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setReports(updatedReports);
    localStorage.setItem('practiceReports', JSON.stringify(updatedReports));

    toast({
      title: "✅ Reporte enviado exitosamente",
      description: `Se ha enviado el reporte del día ${new Date(reportDate).toLocaleDateString('es-ES')}. Estado: Pendiente Revisión.`,
    });

    /**
     * Reset form y volver al paso 1
     */
    setReportDate(new Date().toISOString().split('T')[0]);
    setHoursWorked("");
    setActivities("");
    setLearnings("");
    setDifficulties("");
    setCurrentStep(1);
  };

  /**
   * Retorna la clase CSS correspondiente al color del estado del reporte
   */
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
          <p className="text-lg opacity-90">Registra tus actividades diarias y mantén un seguimiento de tu progreso</p>
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
                  {completedDays} de {totalDays} días reportados
                </span>
                <span className="text-sm font-medium text-accent">{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-3" />
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
                Total de horas registradas: <strong>{reports.reduce((sum, r) => sum + r.hours, 0).toFixed(1)} horas</strong>
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
                  Nuevo Reporte Diario
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
                            Fecha del Reporte *
                          </label>
                          <Input
                            type="date"
                            value={reportDate}
                            onChange={(e) => setReportDate(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            Horas Trabajadas *
                          </label>
                          <Input
                            type="number"
                            placeholder="Ej: 8"
                            value={hoursWorked}
                            onChange={(e) => setHoursWorked(e.target.value)}
                            min="0"
                            max="24"
                            step="0.5"
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
                          placeholder="¿Qué nuevas habilidades, conocimientos o experiencias adquiriste hoy?"
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
                  Historial de tus entregas diarias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {new Date(report.date).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{report.hours} horas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Enviado: {new Date(report.submittedDate).toLocaleDateString('es-ES')}</span>
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