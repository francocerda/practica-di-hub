import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: {
    id: number;
    company: string;
    position: string;
    location: string;
  } | null;
}

const QuickApplicationModal = ({ isOpen, onClose, offer }: QuickApplicationModalProps) => {
  const { toast } = useToast();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [name, setName] = useState("María González");
  const [email, setEmail] = useState("maria.gonzalez@estudiante.di.cl");
  const [phone, setPhone] = useState("+56 9 8765 4321");
  const [career, setCareer] = useState("Ingeniería Civil en Informática");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !career) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    
    if (!cvFile) {
      toast({
        title: "CV requerido",
        description: "Por favor adjunta tu CV para continuar con la postulación.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      toast({
        title: "¡Postulación enviada exitosamente! ✅",
        description: `Tu postulación para ${offer?.position} en ${offer?.company} ha sido registrada. Recibirás una confirmación por email.`,
      });

      // Reset form and close modal
      setCvFile(null);
      setCoverLetter("");
      setName("María González");
      setEmail("maria.gonzalez@estudiante.di.cl");
      setPhone("+56 9 8765 4321");
      setCareer("Ingeniería Civil en Informática");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary flex items-center gap-2">
            <Send className="w-5 h-5" />
            Postulación Rápida
          </DialogTitle>
          <DialogDescription>
            Postúlate a <span className="font-medium text-foreground">{offer.position}</span> en{" "}
            <span className="font-medium text-foreground">{offer.company}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Pre-filled student data */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@estudiante.di.cl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 1234 5678"
                required
              />
            </div>
            <div>
              <Label htmlFor="career">Carrera *</Label>
              <Input
                id="career"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="Tu carrera"
                required
              />
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <Label htmlFor="cv">Currículum Vitae *</Label>
            <div className="mt-2">
              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="flex items-center justify-center w-full p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  {cvFile ? (
                    <div>
                      <p className="text-sm font-medium text-foreground">{cvFile.name}</p>
                      <p className="text-xs text-muted-foreground">Archivo seleccionado</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-foreground">Seleccionar CV</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC o DOCX</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Optional cover letter */}
          <div>
            <Label htmlFor="coverLetter">Carta de Presentación (Opcional)</Label>
            <Textarea
              id="coverLetter"
              placeholder="Comparte brevemente por qué te interesa esta oportunidad y qué puedes aportar..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[100px] mt-2"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-primary text-primary-foreground font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Postulación
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickApplicationModal;