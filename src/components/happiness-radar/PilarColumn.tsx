import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pain, PainCard } from "./PainCard";
import { AddPainDialog } from "./AddPainDialog";
import { cn } from "@/lib/utils";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from "lucide-react";

interface PilarColumnProps {
  pilar: "Processos" | "Pessoas" | "Tecnologia";
  pains: Pain[];
  onVote: (painId: string) => void;
  onDelete: (painId: string) => void;
  onAddPain: (pain: { author: string; description: string; pilar: "Processos" | "Pessoas" | "Tecnologia" }) => void;
}

const pilarConfig = {
  Processos: {
    icon: "⚙️",
    bgClass: "pilar-processes",
    description: "Melhorias nos processos organizacionais"
  },
  Pessoas: {
    icon: "👥", 
    bgClass: "pilar-pessoas",
    description: "Questões relacionadas a pessoas e cultura"
  },
  Tecnologia: {
    icon: "💻",
    bgClass: "pilar-tecnologia", 
    description: "Problemas e melhorias tecnológicas"
  },
};

export function PilarColumn({ pilar, pains, onVote, onDelete, onAddPain }: PilarColumnProps) {
  const config = pilarConfig[pilar];
  
  return (
    <div className="flex flex-col h-full">
      <Card className="mb-4 border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h3 className="font-semibold">{pilar}</h3>
              <p className="text-xs text-muted-foreground font-normal">
                {config.description}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn("text-xs", config.bgClass)}>
              {pains.length} {pains.length === 1 ? "dor" : "dores"}
            </Badge>
            <AddPainDialog onAddPain={onAddPain} defaultPilar={pilar}>
              <Button size="sm" variant="ghost" className="gap-1 text-xs h-7">
                <Plus className="h-3 w-3" />
                Adicionar
              </Button>
            </AddPainDialog>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex-1 space-y-4 overflow-y-auto max-h-[60vh]">
        {pains.length === 0 ? (
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-muted-foreground text-sm text-center">
                Nenhuma dor adicionada ainda.<br />
                Seja o primeiro a compartilhar!
              </p>
            </CardContent>
          </Card>
        ) : (
          <SortableContext items={pains.map(p => p.id)} strategy={verticalListSortingStrategy}>
            {pains.map((pain) => (
              <PainCard key={pain.id} pain={pain} onVote={onVote} onDelete={onDelete} />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}