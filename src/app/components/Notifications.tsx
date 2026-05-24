import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { mockInsights } from "../lib/mockData";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  AlertTriangle, 
  Info, 
  TrendingUp, 
  CheckCircle, 
  Bell,
  BellOff,
  Archive,
  Clock
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Notifications() {
  const [notifications, setNotifications] = useState(mockInsights);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || notif.priority === filter
  );

  const markAsRead = (id: string) => {
    // In a real app, this would update the backend
    console.log('Mark as read:', id);
  };

  const archiveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'trend': return TrendingUp;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'warning': return {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200'
      };
      case 'info': return {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
      };
      case 'trend': return {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
      };
      case 'success': return {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200'
      };
      default: return {
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        border: 'border-gray-200'
      };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Alta Prioridade</Badge>;
      case 'medium':
        return <Badge variant="default">Média Prioridade</Badge>;
      case 'low':
        return <Badge variant="secondary">Baixa Prioridade</Badge>;
      default:
        return null;
    }
  };

  // Additional mock notifications for different categories
  const additionalNotifications = [
    {
      id: '4',
      type: 'success' as const,
      title: 'Meta de transparência alcançada',
      description: 'O município atingiu 95% de publicações dentro do prazo legal estabelecido no último trimestre.',
      date: '2026-02-03',
      priority: 'low' as const
    },
    {
      id: '5',
      type: 'warning' as const,
      title: 'Processo licitatório com valor atípico',
      description: 'Identificado processo licitatório com valor 180% superior à média histórica para serviços similares. Sugere-se revisão técnica.',
      date: '2026-02-02',
      priority: 'high' as const
    },
    {
      id: '6',
      type: 'info' as const,
      title: 'Nova categoria detectada',
      description: 'Sistema identificou nova categoria de publicações relacionadas a "projetos ambientais". Considere adicionar ao sistema de classificação.',
      date: '2026-02-01',
      priority: 'medium' as const
    },
  ];

  const allNotifications = [...notifications, ...additionalNotifications];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Notificações e Alertas</h2>
        <p className="text-gray-600">
          Insights automáticos e alertas sobre padrões detectados no Diário Oficial
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-semibold">{allNotifications.length}</p>
              </div>
              <Bell className="size-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Alta Prioridade</p>
                <p className="text-2xl font-semibold text-red-600">
                  {allNotifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
              <AlertTriangle className="size-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Média Prioridade</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {allNotifications.filter(n => n.priority === 'medium').length}
                </p>
              </div>
              <Info className="size-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Baixa Prioridade</p>
                <p className="text-2xl font-semibold text-green-600">
                  {allNotifications.filter(n => n.priority === 'low').length}
                </p>
              </div>
              <CheckCircle className="size-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Alertas Recentes</CardTitle>
              <CardDescription>
                Análises e padrões detectados automaticamente pelo sistema
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <BellOff className="size-4" />
                Marcar todas como lidas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                Todas ({allNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="high">
                Alta ({allNotifications.filter(n => n.priority === 'high').length})
              </TabsTrigger>
              <TabsTrigger value="medium">
                Média ({allNotifications.filter(n => n.priority === 'medium').length})
              </TabsTrigger>
              <TabsTrigger value="low">
                Baixa ({allNotifications.filter(n => n.priority === 'low').length})
              </TabsTrigger>
            </TabsList>

            {['all', 'high', 'medium', 'low'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                {allNotifications
                  .filter(notif => tabValue === 'all' || notif.priority === tabValue)
                  .map((notif) => {
                    const Icon = getIcon(notif.type);
                    const colors = getColorClasses(notif.type);

                    return (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex gap-4">
                          <div className={`p-3 rounded-lg bg-white h-fit`}>
                            <Icon className={`size-6 ${colors.text}`} />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">
                                  {notif.title}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {notif.description}
                                </p>
                              </div>
                              {getPriorityBadge(notif.priority)}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="size-4" />
                                {new Date(notif.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notif.id)}
                                  className="gap-2"
                                >
                                  <CheckCircle className="size-4" />
                                  Marcar como lida
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => archiveNotification(notif.id)}
                                  className="gap-2"
                                >
                                  <Archive className="size-4" />
                                  Arquivar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {allNotifications.filter(notif => tabValue === 'all' || notif.priority === tabValue).length === 0 && (
                  <div className="text-center py-12">
                    <BellOff className="size-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">Nenhuma notificação nesta categoria</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Notificações</CardTitle>
          <CardDescription>
            Personalize quais tipos de alertas você deseja receber
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium">Anomalias em valores</p>
                <p className="text-sm text-gray-600">
                  Alertas sobre valores atípicos em licitações e contratos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium">Tendências de volume</p>
                <p className="text-sm text-gray-600">
                  Notificações sobre mudanças no volume de publicações
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium">Concentração de recursos</p>
                <p className="text-sm text-gray-600">
                  Alertas sobre concentração de gastos em órgãos específicos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium">Indicadores de eficiência</p>
                <p className="text-sm text-gray-600">
                  Notificações sobre melhorias ou reduções de desempenho
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button>Salvar Configurações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
