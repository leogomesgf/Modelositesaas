import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { mockPublications, publicationTypeLabels, Publication } from "../lib/mockData";
import { Search, Filter, Download, Calendar, Building2, Tag } from "lucide-react";
import { Label } from "./ui/label";

export function Publications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedOrgan, setSelectedOrgan] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique organs
  const organs = useMemo(() => {
    return Array.from(new Set(mockPublications.map(p => p.organ))).sort();
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return mockPublications.filter(pub => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          pub.title.toLowerCase().includes(searchLower) ||
          pub.content.toLowerCase().includes(searchLower) ||
          pub.organ.toLowerCase().includes(searchLower) ||
          pub.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedType !== "all" && pub.type !== selectedType) return false;

      // Organ filter
      if (selectedOrgan !== "all" && pub.organ !== selectedOrgan) return false;

      // Date filters
      if (startDate && new Date(pub.date) < new Date(startDate)) return false;
      if (endDate && new Date(pub.date) > new Date(endDate)) return false;

      return true;
    });
  }, [searchTerm, selectedType, selectedOrgan, startDate, endDate]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedOrgan("all");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters = searchTerm || selectedType !== "all" || selectedOrgan !== "all" || startDate || endDate;

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
        <h2 className="text-3xl font-semibold mb-2">Publicações</h2>
        <p className="text-gray-600">
          Busque e filtre publicações do Diário Oficial Municipal
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Buscar Publicações</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="size-4" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Pesquisar por título, conteúdo, órgão ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Tag className="size-4" />
                  Tipo de Publicação
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {Object.entries(publicationTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Building2 className="size-4" />
                  Órgão
                </Label>
                <Select value={selectedOrgan} onValueChange={setSelectedOrgan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os órgãos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os órgãos</SelectItem>
                    {organs.map(organ => (
                      <SelectItem key={organ} value={organ}>{organ}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Calendar className="size-4" />
                  Data Inicial
                </Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Calendar className="size-4" />
                  Data Final
                </Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Active filters indicator */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-900">
                  {filteredPublications.length} resultado(s) encontrado(s)
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {filteredPublications.length} Publicações
          </h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Exportar Resultados
          </Button>
        </div>

        {filteredPublications.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <Search className="size-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Nenhuma publicação encontrada</p>
                <p className="text-sm">Tente ajustar os filtros ou termos de busca</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{pub.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline">{publicationTypeLabels[pub.type]}</Badge>
                          <span className="flex items-center gap-1">
                            <Building2 className="size-3" />
                            {pub.organ}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {new Date(pub.date).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      {pub.value && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Valor</p>
                          <p className="text-lg font-semibold text-green-600">
                            {formatCurrency(pub.value)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {pub.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pub.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
