import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Heart, MessageSquare, Trophy, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { PilarColumn } from "@/components/happiness-radar/PilarColumn";
import { EmotionVoting, EmotionCounts } from "@/components/happiness-radar/EmotionVoting";
import { AddPainDialog } from "@/components/happiness-radar/AddPainDialog";
import { Pain } from "@/components/happiness-radar/PainCard";
import SessionIndicator from "@/components/SessionIndicator";
import { useAuth } from "@/hooks/useAuth";

console.log('[HappinessRadar] Component loaded');

export default function HappinessRadar() {
  const { isAdmin } = useAuth();
  
  const [pains, setPains] = useState<Pain[]>([]);

  const [emotionCounts, setEmotionCounts] = useState<EmotionCounts>({
    Processos: { happy: 0, neutral: 0, sad: 0 },
    Pessoas: { happy: 0, neutral: 0, sad: 0 },
    Tecnologia: { happy: 0, neutral: 0, sad: 0 },
  });

  const [userVotes, setUserVotes] = useState<{ [pilar: string]: "happy" | "neutral" | "sad" | null }>({
    Processos: null,
    Pessoas: null,
    Tecnologia: null,
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

  const handleDeletePain = (painId: string) => {
    console.log('[HappinessRadar] Deleting pain:', painId);
    setPains(prev => prev.filter(pain => pain.id !== painId));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPains((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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

  const handleResetVotes = () => {
    console.log('[HappinessRadar] Resetting all votes for new monthly voting');
    
    // Resetar todas as dores para 0 votos e remover votos do usuário
    setPains(prev => 
      prev.map(pain => ({
        ...pain,
        votes: 0,
        hasVoted: false
      }))
    );

    // Resetar contadores de emoções
    setEmotionCounts({
      Processos: { happy: 0, neutral: 0, sad: 0 },
      Pessoas: { happy: 0, neutral: 0, sad: 0 },
      Tecnologia: { happy: 0, neutral: 0, sad: 0 },
    });

    // Resetar votos do usuário
    setUserVotes({
      Processos: null,
      Pessoas: null,
      Tecnologia: null,
    });
  };

  // Ordenar dores por votos (mais votadas primeiro)
  const sortedPains = [...pains].sort((a, b) => b.votes - a.votes);
  
  const groupedPains = {
    Processos: sortedPains.filter(p => p.pilar === "Processos"),
    Pessoas: sortedPains.filter(p => p.pilar === "Pessoas"),
    Tecnologia: sortedPains.filter(p => p.pilar === "Tecnologia"),
  };

  // Dor mais votada
  const topPain = sortedPains[0];
  const topPainVotes = topPain?.votes || 0;

  const totalPains = pains.length;
  const totalVotes = pains.reduce((acc, pain) => acc + pain.votes, 0);
  const totalEmotionVotes = Object.values(emotionCounts).reduce(
    (acc, counts) => acc + counts.happy + counts.neutral + counts.sad, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Session Indicator */}
        <div className="mb-6">
          <SessionIndicator />
        </div>

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
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetVotes}
                className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <RotateCcw className="h-4 w-4" />
                Nova Votação
              </Button>
            )}
            <AddPainDialog onAddPain={handleAddPain} />
          </div>
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
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{topPainVotes}</p>
                  <p className="text-xs text-muted-foreground">Dor Mais Votada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Pilares - 3 colunas - Mais espaço */}
          <div className="xl:col-span-3">
            <Card className="border-2 shadow-[var(--shadow-card)] mb-8">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="text-2xl">📊</span>
                  Dores por Pilar
                </CardTitle>
              </CardHeader>
            </Card>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PilarColumn
                  pilar="Processos"
                  pains={groupedPains.Processos}
                  onVote={handleVotePain}
                  onDelete={handleDeletePain}
                  onAddPain={handleAddPain}
                />
                <PilarColumn
                  pilar="Pessoas"
                  pains={groupedPains.Pessoas}
                  onVote={handleVotePain}
                  onDelete={handleDeletePain}
                  onAddPain={handleAddPain}
                />
                <PilarColumn
                  pilar="Tecnologia"
                  pains={groupedPains.Tecnologia}
                  onVote={handleVotePain}
                  onDelete={handleDeletePain}
                  onAddPain={handleAddPain}
                />
              </div>
            </DndContext>
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