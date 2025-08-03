import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface EmotionVote {
  pilar: "Processos" | "Pessoas" | "Tecnologia";
  emotion: "happy" | "neutral" | "sad";
}

export interface EmotionCounts {
  Processos: { happy: number; neutral: number; sad: number };
  Pessoas: { happy: number; neutral: number; sad: number };
  Tecnologia: { happy: number; neutral: number; sad: number };
}

interface EmotionVotingProps {
  emotionCounts: EmotionCounts;
  userVotes: { [pilar: string]: "happy" | "neutral" | "sad" | null };
  onVote: (pilar: "Processos" | "Pessoas" | "Tecnologia", emotion: "happy" | "neutral" | "sad") => void;
}

const emotions = [
  { key: "happy" as const, emoji: "😀", label: "Feliz", color: "happy" },
  { key: "neutral" as const, emoji: "😐", label: "Neutro", color: "neutral" },
  { key: "sad" as const, emoji: "🙁", label: "Triste", color: "sad" }
];

const pilares = ["Processos", "Pessoas", "Tecnologia"] as const;

export function EmotionVoting({ emotionCounts, userVotes, onVote }: EmotionVotingProps) {
  return (
    <Card className="border-2 shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-xl">💭</span>
          Como você se sente sobre cada pilar?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Selecione uma emoção para cada pilar (1 voto por pilar)
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {pilares.map((pilar) => (
          <div key={pilar} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{pilar}</h4>
              {userVotes[pilar] && (
                <Badge variant="secondary" className="text-xs">
                  Você votou: {emotions.find(e => e.key === userVotes[pilar])?.emoji}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {emotions.map((emotion) => {
                const isSelected = userVotes[pilar] === emotion.key;
                const count = emotionCounts[pilar][emotion.key];
                
                return (
                  <Button
                    key={emotion.key}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => onVote(pilar, emotion.key)}
                    className={cn(
                      "emotion-button flex flex-col gap-1 h-auto py-3 relative",
                      `emotion-${emotion.key}`,
                      isSelected && "ring-2 ring-primary"
                    )}
                  >
                    <span className="text-xl">{emotion.emoji}</span>
                    <span className="text-xs font-medium">{emotion.label}</span>
                    {count > 0 && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Total: {emotionCounts[pilar].happy + emotionCounts[pilar].neutral + emotionCounts[pilar].sad} votos
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}