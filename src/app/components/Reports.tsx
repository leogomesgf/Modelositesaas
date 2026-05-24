import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Download, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Building2,
  AlertCircle,
  CheckCircle2,
  BarChart3
} from "lucide-react";
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
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { mockPublications } from "../lib/mockData";

export function Reports() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Financial Analysis Data
  const monthlySpending = [
    { month: 'Ago', value: 8500000, contracts: 45 },
    { month: 'Set', value: 9200000, contracts: 52 },
    { month: 'Out', value: 7800000, contracts: 48 },
    { month: 'Nov', value: 10500000, contracts: 61 },
    { month: 'Dez', value: 9800000, contracts: 55 },
    { month: 'Jan', value: 11200000, contracts: 58 },
  ];

  const categorySpending = [
    { category: 'Obras', value: 28500000, percent: 42 },
    { category: 'Serviços', value: 18200000, percent: 27 },
    { category: 'Equipamentos', value: 12800000, percent: 19 },
    { category: 'Outros', value: 8100000, percent: 12 },
  ];

  const organPerformance = [
    { organ: 'Obras', eficiencia: 85, transparencia: 92, prazo: 78, economia: 88 },
    { organ: 'Educação', eficiencia: 92, transparencia: 95, prazo: 89, economia: 85 },
    { organ: 'Saúde', eficiencia: 88, transparencia: 90, prazo: 85, economia: 82 },
    { organ: 'Administração', eficiencia: 90, transparencia: 88, prazo: 92, economia: 91 },
  ];

  const complianceData = [
    { metric: 'Publicações no Prazo', value: 94, status: 'good' },
    { metric: 'Processos Completos', value: 87, status: 'good' },
    { metric: 'Documentação Adequada', value: 92, status: 'good' },
    { metric: 'Licitações Válidas', value: 78, status: 'warning' },
  ];

  const efficiencyMetrics = [
    { 
      title: 'Tempo Médio de Licitação', 
      value: '45 dias', 
      change: -12, 
      description: 'Redução de 12% em relação ao trimestre anterior',
      status: 'positive'
    },
    { 
      title: 'Economia em Processos', 
      value: 'R$ 2.4M', 
      change: 18, 
      description: 'Economia gerada por negociações e pregões',
      status: 'positive'
    },
    { 
      title: 'Taxa de Participação', 
      value: '6.8 empresas', 
      change: 23, 
      description: 'Média de empresas participantes por licitação',
      status: 'positive'
    },
    { 
      title: 'Contratos Aditados', 
      value: '18%', 
      change: -5, 
      description: 'Percentual de contratos que precisaram aditivos',
      status: 'positive'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Relatórios e Análises</h2>
          <p className="text-gray-600">
            Análises detalhadas e insights gerados por IA sobre a gestão pública
          </p>
        </div>
        <Button className="gap-2 w-fit">
          <Download className="size-4" />
          Exportar Relatório Completo
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="compliance">Conformidade</TabsTrigger>
          <TabsTrigger value="insights">Insights de IA</TabsTrigger>
        </TabsList>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Valor Total (6 meses)</p>
                  <p className="text-2xl font-semibold">R$ 57,0M</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="size-4 text-green-600" />
                    <span className="text-green-600">+12.5%</span>
                    <span className="text-gray-500">vs período anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Média Mensal</p>
                  <p className="text-2xl font-semibold">R$ 9,5M</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="size-4 text-green-600" />
                    <span className="text-green-600">+8.3%</span>
                    <span className="text-gray-500">tendência crescente</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Total de Contratos</p>
                  <p className="text-2xl font-semibold">319</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="size-4 text-green-600" />
                    <span className="text-green-600">+15.2%</span>
                    <span className="text-gray-500">vs período anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução dos Gastos</CardTitle>
                <CardDescription>Valores mensais de contratos e licitações</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis 
                      stroke="#6b7280" 
                      fontSize={12}
                      tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      formatter={(value: number) => [formatCurrency(value), 'Valor']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Gastos por tipo de despesa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySpending.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{cat.category}</span>
                        <span className="text-gray-600">{formatCurrency(cat.value)}</span>
                      </div>
                      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{cat.percent}% do total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Efficiency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {efficiencyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {metric.change > 0 ? (
                        <TrendingUp className="size-4 text-green-600" />
                      ) : (
                        <TrendingDown className="size-4 text-red-600" />
                      )}
                      <span className={`text-sm ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Órgão</CardTitle>
                <CardDescription>Análise multidimensional de desempenho</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={organPerformance}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="organ" stroke="#6b7280" fontSize={12} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" fontSize={10} />
                    <Radar name="Eficiência" dataKey="eficiencia" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Transparência" dataKey="transparencia" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Prazo" dataKey="prazo" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Radar name="Economia" dataKey="economia" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Número de Contratos Mensais</CardTitle>
                <CardDescription>Evolução da quantidade de contratos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="contracts" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Conformidade</CardTitle>
              <CardDescription>
                Análise de conformidade legal e regulamentar das publicações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceData.map((item, index) => (
                  <div key={index} className="p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-lg mb-1">{item.metric}</h4>
                        <p className="text-3xl font-semibold">{item.value}%</p>
                      </div>
                      {item.status === 'good' ? (
                        <CheckCircle2 className="size-8 text-green-600" />
                      ) : (
                        <AlertCircle className="size-8 text-orange-600" />
                      )}
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`absolute h-full rounded-full transition-all ${
                          item.status === 'good' ? 'bg-green-600' : 'bg-orange-600'
                        }`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <Badge 
                      className="mt-3"
                      variant={item.status === 'good' ? 'default' : 'secondary'}
                    >
                      {item.status === 'good' ? 'Dentro do esperado' : 'Requer atenção'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Conformidade Legal</CardTitle>
              <CardDescription>Principais achados e recomendações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">
                      Excelente índice de transparência
                    </h4>
                    <p className="text-sm text-green-800">
                      94% das publicações foram realizadas dentro do prazo legal estabelecido pela Lei de Acesso à Informação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex gap-3">
                  <FileText className="size-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Documentação completa
                    </h4>
                    <p className="text-sm text-blue-800">
                      87% dos processos licitatórios possuem toda documentação obrigatória anexada e disponível para consulta.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border-l-4 border-orange-600 rounded">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 mb-1">
                      Atenção: Licitações com irregularidades
                    </h4>
                    <p className="text-sm text-orange-800">
                      22% das licitações apresentam algum tipo de irregularidade formal. Recomenda-se revisão dos processos e capacitação das equipes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="size-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Análises Geradas por Inteligência Artificial</CardTitle>
                  <CardDescription>
                    Insights automáticos baseados em análise de padrões e tendências
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="size-5 text-purple-600" />
                  Padrões Identificados
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Sazonalidade em Licitações</h4>
                    <p className="text-sm text-gray-700">
                      O sistema identificou aumento de 35% em processos licitatórios nos meses de janeiro e fevereiro, 
                      provavelmente relacionado ao planejamento orçamentário anual.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Eficiência em Pregões Eletrônicos</h4>
                    <p className="text-sm text-gray-700">
                      Pregões eletrônicos apresentam tempo médio 40% menor e economia 18% maior em comparação 
                      com modalidades presenciais. Sugere-se ampliar o uso desta modalidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="size-5 text-orange-600" />
                  Alertas e Recomendações
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Concentração de Fornecedores</h4>
                    <p className="text-sm text-gray-700">
                      5 empresas representam 45% do valor total de contratos. Recomenda-se ações para ampliar 
                      a participação de fornecedores e aumentar competitividade.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Aditivos Contratuais Acima da Média</h4>
                    <p className="text-sm text-gray-700">
                      18% dos contratos necessitaram aditivos, acima da média nacional de 12%. Sugere-se 
                      melhoria no planejamento e especificação técnica dos projetos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  Boas Práticas Identificadas
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Redução no Tempo de Publicação</h4>
                    <p className="text-sm text-gray-700">
                      O tempo médio entre geração e publicação de atos reduziu 28%, indicando melhoria 
                      significativa nos processos internos de gestão documental.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-1">Alta Taxa de Participação</h4>
                    <p className="text-sm text-gray-700">
                      Média de 6.8 empresas por licitação, acima da média estadual de 4.2, 
                      demonstrando boa divulgação e atratividade dos processos.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
