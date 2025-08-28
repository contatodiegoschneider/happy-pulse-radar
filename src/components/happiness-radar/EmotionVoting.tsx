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
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Selecione uma emoção para cada pilar (1 voto por pilar)
          </p>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-2">
            <p className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
              <span className="text-sm">🔒</span>
              <strong>Voto sigiloso:</strong> Sua identidade é protegida e anônima.
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {pilares.map((pilar) => (
          <div key={pilar} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-base">{pilar}</h4>
              {userVotes[pilar] && (
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Você votou: {emotions.find(e => e.key === userVotes[pilar])?.emoji}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {emotions.map((emotion) => {
                const isSelected = userVotes[pilar] === emotion.key;
                const count = emotionCounts[pilar][emotion.key];
                
                return (
                  <Button
                    key={emotion.key}
                    variant={isSelected ? "default" : "outline"}
                    size="lg"
                    onClick={() => onVote(pilar, emotion.key)}
                    className={cn(
                      "emotion-button flex flex-col gap-2 h-auto py-4 px-4 relative",
                      `emotion-${emotion.key}`,
                      isSelected && "ring-2 ring-primary"
                    )}
                  >
                    <span className="text-3xl">{emotion.emoji}</span>
                    <span className="text-sm font-medium">{emotion.label}</span>
                    {count > 0 && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center text-sm">
                        {count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="text-sm text-muted-foreground text-center pt-2">
              Total: {emotionCounts[pilar].happy + emotionCounts[pilar].neutral + emotionCounts[pilar].sad} votos
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}