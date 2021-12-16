export const LOCALE_TEXT = {
  // Root
  noRowsLabel: "Sem linhas",
  noResultsOverlayLabel: "Nenhum resultado encontrado.",
  errorOverlayDefaultLabel: "Ocorreu um erro.",

  // Density selector toolbar button text
  toolbarDensity: "Densidade",
  toolbarDensityLabel: "Densidade",
  toolbarDensityCompact: "Compacto",
  toolbarDensityStandard: "Padrão",
  toolbarDensityComfortable: "Confortável",

  // Columns selector toolbar button text
  toolbarColumns: "Colunas",
  toolbarColumnsLabel: "Selecionar colunas",

  // Filters toolbar button text
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Mostrar filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Mostrar filtros",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Export selector toolbar button text
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Baixar como CSV",
  toolbarExportPrint: "Imprimir",

  // Columns panel text
  columnsPanelTextFieldLabel: "Encontrar coluna",
  columnsPanelTextFieldPlaceholder: "Título da coluna",
  columnsPanelDragIconLabel: "Reordenar coluna",
  columnsPanelShowAllButton: "Mostrar tudo",
  columnsPanelHideAllButton: "Ocultar tudo",

  // Filter panel text
  filterPanelAddFilter: "Adicionar filtro",
  filterPanelDeleteIconLabel: "Excluir",
  filterPanelOperators: "Operadores",
  filterPanelOperatorAnd: "E",
  filterPanelOperatorOr: "Ou",
  filterPanelColumns: "Colunas",
  filterPanelInputLabel: "Value",
  filterPanelInputPlaceholder: "Valor do filtro",

  // Filter operators text
  filterOperatorContains: "contém",
  filterOperatorEquals: "igual",
  filterOperatorStartsWith: "começa com",
  filterOperatorEndsWith: "termina com",
  filterOperatorIs: "é",
  filterOperatorNot: "não é",
  filterOperatorAfter: "é depois",
  filterOperatorOnOrAfter: "está ativado ou após",
  filterOperatorBefore: "é antes",
  filterOperatorOnOrBefore: "está ligado ou antes",
  filterOperatorIsEmpty: "está vazio",
  filterOperatorIsNotEmpty: "não está vazio",

  // Filter values text
  filterValueAny: "qualquer",
  filterValueTrue: "verdadeiro",
  filterValueFalse: "falso",

  // Column menu text
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Mostrar colunas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Não ordenar",
  columnMenuSortAsc: "Ordenar por ASC",
  columnMenuSortDesc: "Ordenar por DESC",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: "Mostrar filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total rows footer text
  footerTotalRows: "Total de linhas:",

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Seleção de caixa de seleção",

  // Boolean cell text
  booleanCellTrueLabel: "versadeiro",
  booleanCellFalseLabel: "falso",

  // Actions cell more text
  actionsCellMore: "mais",

  // Column pinning text
  pinToLeft: "Fixar à esquerda",
  pinToRight: "Fixar à direita",
  desafixar: "Desafixar",

  // Tree
  treeDataGroupingHeaderName: "Grupo",
  treeDataExpand: "ver filhos",
  treeDataCollapse: "ocultar filhos",
};
