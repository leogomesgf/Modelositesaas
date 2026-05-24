// Mock data types
export interface Publication {
  id: string;
  date: string;
  type: 'licitacao' | 'contrato' | 'nomeacao' | 'decreto' | 'portaria' | 'edital';
  title: string;
  organ: string;
  content: string;
  value?: number;
  tags: string[];
}

export interface Insight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'trend';
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Stat {
  label: string;
  value: number;
  change: number;
  period: string;
}

// Mock data generator
export const mockPublications: Publication[] = [
  {
    id: '1',
    date: '2026-02-06',
    type: 'licitacao',
    title: 'Pregão Eletrônico nº 023/2026 - Aquisição de equipamentos de informática',
    organ: 'Secretaria de Administração',
    content: 'Processo licitatório para aquisição de 150 computadores desktop e 50 notebooks para modernização do parque tecnológico municipal.',
    value: 850000,
    tags: ['tecnologia', 'equipamentos', 'pregão']
  },
  {
    id: '2',
    date: '2026-02-05',
    type: 'contrato',
    title: 'Contrato nº 045/2026 - Serviços de manutenção predial',
    organ: 'Secretaria de Obras',
    content: 'Contratação da empresa XYZ Construções para manutenção predial dos prédios públicos municipais pelo período de 12 meses.',
    value: 450000,
    tags: ['manutenção', 'obras', 'infraestrutura']
  },
  {
    id: '3',
    date: '2026-02-05',
    type: 'nomeacao',
    title: 'Portaria nº 156/2026 - Nomeação de Diretor',
    organ: 'Gabinete do Prefeito',
    content: 'Nomeia João da Silva para o cargo de Diretor do Departamento de Planejamento Urbano.',
    tags: ['recursos humanos', 'nomeação']
  },
  {
    id: '4',
    date: '2026-02-04',
    type: 'decreto',
    title: 'Decreto nº 1.234/2026 - Regulamentação de horários',
    organ: 'Gabinete do Prefeito',
    content: 'Regulamenta o horário de funcionamento do comércio durante o período de festas municipais.',
    tags: ['regulamentação', 'comércio']
  },
  {
    id: '5',
    date: '2026-02-04',
    type: 'licitacao',
    title: 'Concorrência nº 008/2026 - Obra de pavimentação',
    organ: 'Secretaria de Obras',
    content: 'Processo licitatório para pavimentação de 12km de vias no bairro Jardim das Flores.',
    value: 3200000,
    tags: ['obras', 'pavimentação', 'infraestrutura']
  },
  {
    id: '6',
    date: '2026-02-03',
    type: 'edital',
    title: 'Edital nº 012/2026 - Concurso Público',
    organ: 'Secretaria de Administração',
    content: 'Abertura de inscrições para concurso público com 45 vagas para diversos cargos da administração municipal.',
    tags: ['concurso', 'recursos humanos']
  },
  {
    id: '7',
    date: '2026-02-03',
    type: 'contrato',
    title: 'Contrato nº 046/2026 - Fornecimento de merenda escolar',
    organ: 'Secretaria de Educação',
    content: 'Contratação para fornecimento de alimentos para merenda escolar das escolas municipais.',
    value: 1200000,
    tags: ['educação', 'alimentação']
  },
  {
    id: '8',
    date: '2026-02-02',
    type: 'portaria',
    title: 'Portaria nº 157/2026 - Designação de comissão',
    organ: 'Secretaria de Saúde',
    content: 'Designa comissão para avaliação e seleção de projetos de saúde preventiva.',
    tags: ['saúde', 'comissão']
  }
];

export const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Aumento de 45% em licitações de TI',
    description: 'Detectado crescimento significativo em processos licitatórios relacionados a tecnologia nos últimos 30 dias. Recomenda-se análise de viabilidade e consolidação de demandas.',
    date: '2026-02-06',
    priority: 'high'
  },
  {
    id: '2',
    type: 'trend',
    title: 'Redução no tempo médio de publicação',
    description: 'O tempo médio entre a geração e publicação de atos administrativos reduziu em 28%, indicando melhoria na eficiência dos processos.',
    date: '2026-02-05',
    priority: 'low'
  },
  {
    id: '3',
    type: 'info',
    title: 'Concentração de contratos em único órgão',
    description: 'A Secretaria de Obras representa 62% do volume financeiro de contratos do último trimestre. Sugere-se revisão do planejamento orçamentário.',
    date: '2026-02-04',
    priority: 'medium'
  }
];

export const mockStats: Stat[] = [
  { label: 'Publicações (30 dias)', value: 156, change: 12.5, period: 'vs mês anterior' },
  { label: 'Valor Total Licitações', value: 12400000, change: -8.3, period: 'vs mês anterior' },
  { label: 'Contratos Ativos', value: 89, change: 5.2, period: 'vs mês anterior' },
  { label: 'Tempo Médio Publicação', value: 2.4, change: -15.8, period: 'vs mês anterior' },
];

export const publicationTypeLabels: Record<Publication['type'], string> = {
  licitacao: 'Licitação',
  contrato: 'Contrato',
  nomeacao: 'Nomeação',
  decreto: 'Decreto',
  portaria: 'Portaria',
  edital: 'Edital'
};
