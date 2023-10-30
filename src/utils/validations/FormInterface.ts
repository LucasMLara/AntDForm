interface EmpresaFeira {
  Nome: string;
  Bairro: string;
  NomeFantasia: string;
  CEP: string;
  CGCCFO_SEMMASCARA: string;
  CNPJCPF: string;
  Cidade: string;
  Email: string;
  Numero: string;
  Rua: string;
  Telefone: string;
  UF: string;
  id: string;
}

export interface IFormValues {
  idCase?: number;
  idFAMDemanda?: number;
  NomeFeiraEventoNegocio: string;
  idEmpresaRealizadora: string;
  idEmpresaOrganizadora: string;
  EmpresaRealizadoraFeira: EmpresaFeira;
  EmpresaOrganizadoraFeira: EmpresaFeira;
  CpfRepresentOrganizadora: string;
  CpfRepresentRealizadora: string;
  DadosUltimas3Edicoes: string;
  DataInicio: string;
  DataFim: string;
  DataSolicitacao: string;
  DescritivodoEventoObjetivo: string;
  EmpApoiadorasParceriaEvt: string;
  EstruturadeMontagemeInsumo: string;
  ExpectativaPublVisitante: string;
  ExpectativadePublicoExposi: string;
  HorarioFuncionamento: string;
  InformacoesAdicionais: string;
  Localidade: string;
  OutrosbeneficiosLocacao: string;
  PlanoComunicacaoEvento: string;
  RepresentanteOrganizadora: string;
  RepresentanteRealizadora: string;
  TaxasAdicionais: string;
  ValorEntradaVisitantes: string;
  ValorLocacaoAreaLivre: string;
  ValorLocacaoAreaMontada: string;
  // periodoEvento?: string[] | undefined[];
  PlantaBaixa: string;
  ComprovantedeExclusividade: string;
  ContratosLocacaoEspaco: string;
  ManualExpositorRegrasExpo: string;
}
