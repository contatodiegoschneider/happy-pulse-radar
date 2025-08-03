import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Heart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import { PilarColumn } from "@/components/happiness-radar/PilarColumn";
import { EmotionVoting, EmotionCounts } from "@/components/happiness-radar/EmotionVoting";
import { AddPainDialog } from "@/components/happiness-radar/AddPainDialog";
import { Pain } from "@/components/happiness-radar/PainCard";

console.log('[HappinessRadar] Component loaded');

export default function HappinessRadar() {
  const [pains, setPains] = useState<Pain[]>([
    {
      id: "1",
      author: "Ana Silva",
      description: "O processo de aprovação de despesas é muito demorado e burocrático, gerando atrasos nos projetos.",
      pilar: "Processos",
      votes: 3,
      hasVoted: false,
    },
    {
      id: "2", 
      author: "Carlos Santos",
      description: "Falta comunicação clara entre as equipes, causando retrabalho e conflitos.",
      pilar: "Pessoas",
      votes: 5,
      hasVoted: false,
    },
    {
      id: "3",
      author: "Maria Oliveira", 
      description: "O sistema de gestão é lento e trava frequentemente, prejudicando a produtividade.",
      pilar: "Tecnologia",
      votes: 7,
      hasVoted: true,
    }
  ]);

  const [emotionCounts, setEmotionCounts] = useState<EmotionCounts>({
    Processos: { happy: 2, neutral: 3, sad: 5 },
    Pessoas: { happy: 4, neutral: 2, sad: 4 },
    Tecnologia: { happy: 1, neutral: 4, sad: 5 },
  });

  const [userVotes, setUserVotes] = useState<{ [pilar: string]: "happy" | "neutral" | "sad" | null }>({
    Processos: null,
    Pessoas: "neutral",
    Tecnologia: "sad",
  });

  const handleAddPain = (newPain: { author: string; description: string; pilar: "Processos" | "Pessoas" | "Tecnologia" }) => {
    console.log('[HappinessRadar] Adding new pain:', newPain);
    
    const pain: Pain = {
      id: Date.now().toString(),
      ...newPain,
      votes: 0,
      hasVoted: false,
    };
    
    setPains(prev => [pain, ...prev]);
  };

  const handleVotePain = (painId: string) => {
    console.log('[HappinessRadar] Voting on pain:', painId);
    
    setPains(prev => 
      prev.map(pain => 
        pain.id === painId 
          ? { ...pain, votes: pain.votes + 1, hasVoted: true }
          : pain
      )
    );
  };

  const handleEmotionVote = (pilar: "Processos" | "Pessoas" | "Tecnologia", emotion: "happy" | "neutral" | "sad") => {
    console.log('[HappinessRadar] Emotion vote:', { pilar, emotion });
    
    // Remove voto anterior se houver
    const previousVote = userVotes[pilar];
    if (previousVote) {
      setEmotionCounts(prev => ({
        ...prev,
        [pilar]: {
          ...prev[pilar],
          [previousVote]: prev[pilar][previousVote] - 1
        }
      }));
    }

    // Adiciona novo voto
    setEmotionCounts(prev => ({
      ...prev,
      [pilar]: {
        ...prev[pilar],
        [emotion]: prev[pilar][emotion] + 1
      }
    }));

    setUserVotes(prev => ({
      ...prev,
      [pilar]: emotion
    }));
  };

  const groupedPains = {
    Processos: pains.filter(p => p.pilar === "Processos"),
    Pessoas: pains.filter(p => p.pilar === "Pessoas"),
    Tecnologia: pains.filter(p => p.pilar === "Tecnologia"),
  };

  const totalPains = pains.length;
  const totalVotes = pains.reduce((acc, pain) => acc + pain.votes, 0);
  const totalEmotionVotes = Object.values(emotionCounts).reduce(
    (acc, counts) => acc + counts.happy + counts.neutral + counts.sad, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-processes bg-clip-text text-transparent">
                Radar da Felicidade
              </h1>
              <p className="text-muted-foreground mt-1">
                Sistema colaborativo para identificar dores e sentimentos da equipe
              </p>
            </div>
          </div>
          
          <AddPainDialog onAddPain={handleAddPain} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalPains}</p>
                  <p className="text-xs text-muted-foreground">Dores Registradas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{totalVotes}</p>
                  <p className="text-xs text-muted-foreground">Votos em Dores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">😊</span>
                <div>
                  <p className="text-2xl font-bold">{totalEmotionVotes}</p>
                  <p className="text-xs text-muted-foreground">Votos Emocionais</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-tecnologia" />
                <div>
                  <p className="text-2xl font-bold">Online</p>
                  <p className="text-xs text-muted-foreground">Status da Reunião</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Pilares - 3 colunas */}
          <div className="xl:col-span-3">
            <Card className="border-2 shadow-[var(--shadow-card)] mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Dores por Pilar
                </CardTitle>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PilarColumn
                pilar="Processos"
                pains={groupedPains.Processos}
                onVote={handleVotePain}
              />
              <PilarColumn
                pilar="Pessoas"
                pains={groupedPains.Pessoas}
                onVote={handleVotePain}
              />
              <PilarColumn
                pilar="Tecnologia"
                pains={groupedPains.Tecnologia}
                onVote={handleVotePain}
              />
            </div>
          </div>

          {/* Sidebar com Votação Emocional */}
          <div className="xl:col-span-1">
            <EmotionVoting
              emotionCounts={emotionCounts}
              userVotes={userVotes}
              onVote={handleEmotionVote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}