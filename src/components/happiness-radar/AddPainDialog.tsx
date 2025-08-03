import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPainDialogProps {
  onAddPain: (pain: { author: string; description: string; pilar: "Processos" | "Pessoas" | "Tecnologia" }) => void;
}

export function AddPainDialog({ onAddPain }: AddPainDialogProps) {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pilar, setPilar] = useState<"Processos" | "Pessoas" | "Tecnologia" | "">("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!author.trim() || !description.trim() || !pilar) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    onAddPain({
      author: author.trim(),
      description: description.trim(),
      pilar: pilar as "Processos" | "Pessoas" | "Tecnologia",
    });

    // Reset form
    setAuthor("");
    setDescription("");
    setPilar("");
    setOpen(false);

    toast({
      title: "Dor adicionada!",
      description: "Sua contribuição foi registrada com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
          <Plus className="h-4 w-4" />
          Adicionar Dor
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            Nova Dor do Colaborador
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="author">Seu nome</Label>
            <Input
              id="author"
              placeholder="Digite seu nome..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pilar">Pilar</Label>
            <Select value={pilar} onValueChange={(value) => setPilar(value as "Processos" | "Pessoas" | "Tecnologia" | "")}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o pilar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Processos">⚙️ Processos</SelectItem>
                <SelectItem value="Pessoas">👥 Pessoas</SelectItem>
                <SelectItem value="Tecnologia">💻 Tecnologia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição da dor</Label>
            <Textarea
              id="description"
              placeholder="Descreva a dor ou problema que você gostaria de compartilhar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}