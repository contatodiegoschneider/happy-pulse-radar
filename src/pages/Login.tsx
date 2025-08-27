import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import loginBackground from '@/assets/login-background.jpg';

const Login = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(code);
      
      if (success) {
        toast({
          title: "Acesso liberado!",
          description: "Bem-vindo ao Happiness Radar. Sessão válida por 3 horas.",
        });
        navigate('/');
      } else {
        toast({
          title: "Código inválido",
          description: "Por favor, verifique o código e tente novamente.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
      
      {/* Floating smile emojis */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">😊</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse delay-300">😄</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-500">😃</div>
        <div className="absolute bottom-20 right-32 text-4xl animate-pulse delay-700">🙂</div>
        <div className="absolute top-1/3 left-1/4 text-2xl animate-bounce delay-1000">😀</div>
        <div className="absolute top-2/3 right-1/3 text-3xl animate-pulse delay-1200">😊</div>
      </div>
      
      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95 border-2 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl">😊</span>
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Happiness Radar
            </CardTitle>
            <span className="text-4xl">😊</span>
          </div>
          <CardDescription className="text-center text-base">
            Insira o código de acesso para participar da avaliação
            <br />
            <span className="text-sm text-muted-foreground mt-2 block">
              Use o código de admin para acessar funcionalidades especiais
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Digite o código de acesso"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono h-12 border-2 focus:border-primary"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" 
              disabled={isLoading || !code.trim()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verificando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>😊</span>
                  Entrar
                  <span>😊</span>
                </div>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span>⏰</span>
              Código válido por 3 horas após o acesso
              <span>⏰</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;