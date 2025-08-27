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
      <Card className="mb-6 border-2">{/* Increased margin from 4 to 6 */}
        <CardHeader className="pb-4">{/* Increased padding bottom */}
          <CardTitle className="flex items-center gap-3 text-xl">{/* Increased from text-lg to text-xl */}
            <span className="text-3xl">{config.icon}</span>{/* Increased from text-2xl to text-3xl */}
            <div>
              <h3 className="font-semibold">{pilar}</h3>
              <p className="text-sm text-muted-foreground font-normal">{/* Increased from text-xs to text-sm */}
                {config.description}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn("text-sm px-3 py-1", config.bgClass)}>{/* Increased padding and text size */}
              {pains.length} {pains.length === 1 ? "dor" : "dores"}
            </Badge>
            <AddPainDialog onAddPain={onAddPain} defaultPilar={pilar}>
              <Button size="sm" variant="ghost" className="gap-2 text-sm h-8">{/* Increased gap and text size */}
                <Plus className="h-4 w-4" />{/* Increased icon size */}
                Adicionar
              </Button>
            </AddPainDialog>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex-1 space-y-5 overflow-y-auto max-h-[60vh]">{/* Increased spacing from 4 to 5 */}
        {pains.length === 0 ? (
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="flex items-center justify-center py-12">{/* Increased padding from py-8 to py-12 */}
              <p className="text-muted-foreground text-base text-center">{/* Increased from text-sm to text-base */}
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