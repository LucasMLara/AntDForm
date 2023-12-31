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
  Nprocesso?: string;
  idFAMDemanda?: number;
  NomeFeiraEventoNegocio: string;
  EmpresaRealizadoraFeira: EmpresaFeira;
  EmpresaOrganizadoraFeira: EmpresaFeira;
  CpfRepresentOrganizadora: string;
  CpfRepresentRealizadora: string;
  DadosUltimas3Edicoes: string;
  DataInicio: string;
  DataFim: string;
  DataSolicitacao?: string;
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
  periodoEvento?: string[] | undefined[];
  PlantaBaixa: File | null;
  ComprovantedeExclusividade: File | null;
  ContratosLocacaoEspaco: File | null;
  ManualExpositorRegrasExpo: File | null;
}
