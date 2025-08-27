import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, LogOut, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SessionIndicator = () => {
  const { sessionTimeLeft, logout, renewSession } = useAuth();
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const [renewCode, setRenewCode] = useState('');
  const [isRenewing, setIsRenewing] = useState(false);
  const { toast } = useToast();

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getProgressPercentage = () => {
    const totalDuration = 3 * 60 * 60 * 1000; // 3 horas
    return (sessionTimeLeft / totalDuration) * 100;
  };

  const isNearExpiry = sessionTimeLeft < 30 * 60 * 1000; // Menos de 30 minutos

  const handleRenewSession = async () => {
    setIsRenewing(true);
    
    setTimeout(() => {
      const success = renewSession(renewCode);
      
      if (success) {
        toast({
          title: "Sessão renovada!",
          description: "Sua sessão foi renovada por mais 3 horas.",
        });
        setIsRenewDialogOpen(false);
        setRenewCode('');
      } else {
        toast({
          title: "Código inválido",
          description: "Por favor, verifique o código e tente novamente.",
          variant: "destructive",
        });
      }
      
      setIsRenewing(false);
    }, 1000);
  };

  return (
    <Card className="p-4 border-l-4 border-l-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Sessão:</span>
          <span className={`text-sm ${isNearExpiry ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
            {formatTime(sessionTimeLeft)}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isRenewDialogOpen} onOpenChange={setIsRenewDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Renovar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Renovar Sessão</DialogTitle>
                <DialogDescription>
                  Para renovar sua sessão por mais 3 horas, insira o código de acesso novamente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Digite o código de acesso"
                  value={renewCode}
                  onChange={(e) => setRenewCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsRenewDialogOpen(false);
                      setRenewCode('');
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleRenewSession}
                    disabled={isRenewing || !renewCode.trim()}
                    className="flex-1"
                  >
                    {isRenewing ? "Renovando..." : "Renovar"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="h-8"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Sair
          </Button>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-muted rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${
              isNearExpiry ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default SessionIndicator;