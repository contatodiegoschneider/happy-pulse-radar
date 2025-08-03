import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function PainCard({ pain, onVote }: PainCardProps) {
  const config = pilarConfig[pain.pilar];
  
  return (
    <Card className={cn(
      "card-hover shadow-[var(--shadow-card)] border-l-4",
      config.colorClass
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={cn("text-xs font-medium", config.bgClass)}>
            {pain.pilar}
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="text-sm">{pain.author}</span>
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