import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Users, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-processes bg-clip-text text-transparent">
            Happy Pulse Radar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sistema colaborativo em tempo real para identificar dores organizacionais e 
            medir o sentimento da equipe nos pilares fundamentais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-[var(--shadow-card)] card-hover">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 p-3 rounded-full bg-processes-light w-16 h-16 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-processes" />
              </div>
              <CardTitle className="text-lg">Registre Dores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Compartilhe problemas e dificuldades organizacionais de forma colaborativa
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] card-hover">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 p-3 rounded-full bg-pessoas-light w-16 h-16 flex items-center justify-center">
                <Heart className="h-8 w-8 text-pessoas" />
              </div>
              <CardTitle className="text-lg">Vote & Priorize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Vote nas dores mais impactantes e expresse seus sentimentos por pilar
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] card-hover">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 p-3 rounded-full bg-tecnologia-light w-16 h-16 flex items-center justify-center">
                <Users className="h-8 w-8 text-tecnologia" />
              </div>
              <CardTitle className="text-lg">Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Veja atualizações instantâneas durante as reuniões colaborativas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/happiness-radar">
            <Button size="lg" className="gap-3 shadow-lg hover:shadow-xl transition-all">
              <span className="text-lg">🎯</span>
              Acessar Radar da Felicidade
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className="mt-8 p-4 border border-muted rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>3 Pilares:</strong> Processos ⚙️ · Pessoas 👥 · Tecnologia 💻
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
