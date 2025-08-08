import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Pain {
  id: string;
  author: string;
  description: string;
  pilar: "Processos" | "Pessoas" | "Tecnologia";
  votes: number;
  hasVoted?: boolean;
}

interface PainCardProps {
  pain: Pain;
  onVote: (painId: string) => void;
  onDelete: (painId: string) => void;
}

const pilarConfig = {
  Processos: {
    bgClass: "pilar-processes",
    colorClass: "border-processes",
  },
  Pessoas: {
    bgClass: "pilar-pessoas", 
    colorClass: "border-pessoas",
  },
  Tecnologia: {
    bgClass: "pilar-tecnologia",
    colorClass: "border-tecnologia",
  },
};

export function PainCard({ pain, onVote, onDelete }: PainCardProps) {
  const config = pilarConfig[pain.pilar];
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pain.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={cn(
        "card-hover shadow-[var(--shadow-card)] border-l-4 relative group",
        config.colorClass,
        isDragging && "opacity-50"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <Badge variant="secondary" className={cn("text-xs font-medium", config.bgClass)}>
              {pain.pilar}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="text-sm">{pain.author}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(pain.id)}
              className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-foreground mb-4 leading-relaxed">
          {pain.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{pain.votes} votos</span>
          </div>
          
          <Button
            variant={pain.hasVoted ? "secondary" : "outline"}
            size="sm"
            onClick={() => onVote(pain.id)}
            disabled={pain.hasVoted}
            className="h-8"
          >
            {pain.hasVoted ? "Votado" : "Votar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}