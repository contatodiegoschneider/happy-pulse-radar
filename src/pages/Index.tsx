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
          {/* Botão principal com muito destaque */}
          <div className="relative mb-8">
            {/* Glow effect background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            
            <Link to="/happiness-radar">
              <Button 
                size="lg" 
                className="relative px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group border-2 border-white/20"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shine_0.8s_ease-out] transition-opacity"></div>
                
                <div className="relative flex items-center gap-4">
                  <span className="text-3xl animate-bounce">🎯</span>
                  <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Acessar Radar da Felicidade
                  </span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                </div>
              </Button>
            </Link>
          </div>
          
          {/* Call to action adicional */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-xl border border-primary/20">
            <p className="text-lg font-semibold text-primary mb-2 flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              Comece agora sua jornada de felicidade!
              <span className="text-2xl">✨</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Participe da avaliação colaborativa e ajude a construir um ambiente mais feliz
            </p>
          </div>
          
          <div className="p-4 border border-muted rounded-lg bg-muted/30">
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
