import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { mockStats, mockPublications, mockInsights, publicationTypeLabels } from "../lib/mockData";
import { TrendingUp, TrendingDown, FileText, DollarSign, Clock, CheckCircle, AlertTriangle, Info, TrendingUpIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Button } from "./ui/button";
import { Link } from "react-router";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function Dashboard() {
  // Prepare chart data
  const publicationsByType = Object.entries(
    mockPublications.reduce((acc, pub) => {
      acc[pub.type] = (acc[pub.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, count]) => ({
    name: publicationTypeLabels[type as keyof typeof publicationTypeLabels],
    value: count
  }));

  const publicationsByOrgan = Object.entries(
    mockPublications.reduce((acc, pub) => {
      acc[pub.organ] = (acc[pub.organ] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([organ, count]) => ({
    organ: organ.replace('Secretaria de ', ''),
    count
  })).sort((a, b) => b.count - a.count);

  const timelineData = [
    { date: '01/02', publicacoes: 18 },
    { date: '02/02', publicacoes: 22 },
    { date: '03/02', publicacoes: 15 },
    { date: '04/02', publicacoes: 28 },
    { date: '05/02', publicacoes: 31 },
    { date: '06/02', publicacoes: 24 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Dashboard</h2>
        <p className="text-gray-600">
          Visão geral e análise inteligente do Diário Oficial Municipal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => {
          const isPositive = stat.change > 0;
          const isCurrency = stat.label.includes('Valor');
          const isDays = stat.label.includes('Tempo');
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                {index === 0 && <FileText className="size-4 text-gray-500" />}
                {index === 1 && <DollarSign className="size-4 text-gray-500" />}
                {index === 2 && <CheckCircle className="size-4 text-gray-500" />}
                {index === 3 && <Clock className="size-4 text-gray-500" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {isCurrency ? formatCurrency(stat.value) : isDays ? `${stat.value} dias` : stat.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {isPositive ? (
                    <TrendingUp className="size-3 text-green-600" />
                  ) : (
                    <TrendingDown className="size-3 text-red-600" />
                  )}
                  <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-xs text-gray-500">{stat.period}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Insights e Análises por IA</CardTitle>
              <CardDescription>
                Padrões detectados e recomendações baseadas em análise de dados
              </CardDescription>
            </div>
            <Link to="/notificacoes">
              <Button variant="outline" size="sm">Ver todos</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockInsights.map((insight) => {
            const Icon = insight.type === 'warning' ? AlertTriangle : 
                        insight.type === 'info' ? Info : 
                        insight.type === 'trend' ? TrendingUpIcon : CheckCircle;
            const colorClass = insight.type === 'warning' ? 'text-orange-600 bg-orange-50' : 
                              insight.type === 'info' ? 'text-blue-600 bg-blue-50' : 
                              insight.type === 'trend' ? 'text-purple-600 bg-purple-50' : 'text-green-600 bg-green-50';
            
            return (
              <div key={insight.id} className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className={`p-2 rounded-lg ${colorClass} h-fit`}>
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}>
                      {insight.priority === 'high' ? 'Alta' : insight.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(insight.date).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publications Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Publicações ao Longo do Tempo</CardTitle>
            <CardDescription>Últimos 6 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                  labelStyle={{ color: '#374151', fontWeight: 500 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="publicacoes" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Publications by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
            <CardDescription>Categorias de publicações</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={publicationsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {publicationsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Publications by Organ */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Publicações por Órgão</CardTitle>
            <CardDescription>Distribuição entre secretarias municipais</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={publicationsByOrgan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="organ" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                  labelStyle={{ color: '#374151', fontWeight: 500 }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Publications Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Publicações Recentes</CardTitle>
              <CardDescription>Últimas atualizações do Diário Oficial</CardDescription>
            </div>
            <Link to="/publicacoes">
              <Button variant="outline" size="sm">Ver todas</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPublications.slice(0, 5).map((pub) => (
              <div key={pub.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm">{pub.title}</h4>
                    <Badge variant="outline">{publicationTypeLabels[pub.type]}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{pub.organ}</span>
                    <span>•</span>
                    <span>{new Date(pub.date).toLocaleDateString('pt-BR')}</span>
                    {pub.value && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-green-600">{formatCurrency(pub.value)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
