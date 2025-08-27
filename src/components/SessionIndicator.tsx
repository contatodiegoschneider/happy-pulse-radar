import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, LogOut, RotateCcw } from 'lucide-react';

const SessionIndicator = () => {
  const { sessionTimeLeft, logout, renewSession } = useAuth();

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
          <Button
            variant="outline"
            size="sm"
            onClick={renewSession}
            className="h-8"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Renovar
          </Button>
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