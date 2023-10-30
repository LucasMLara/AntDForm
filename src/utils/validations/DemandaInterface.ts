interface NomeFeiraEvento {
  _text: string;
}

interface EmpresaFeira {
  Nome: NomeFeiraEvento;
  Bairro: NomeFeiraEvento;
  NomeFantasia: NomeFeiraEvento;
  CEP: NomeFeiraEvento;
  CGCCFO_SEMMASCARA: NomeFeiraEvento;
  CNPJCPF: NomeFeiraEvento;
  Cidade: NomeFeiraEvento;
  Email: NomeFeiraEvento;
  Numero: NomeFeiraEvento;
  Rua: NomeFeiraEvento;
  Telefone: NomeFeiraEvento;
  UF: NomeFeiraEvento;
}

export interface InfosDemanda {
  NomeFeiraEventoNegocio: NomeFeiraEvento;
  EmpresaRealizadoraFeira: EmpresaFeira;
  EmpresaOrganizadoraFeira: EmpresaFeira;
  CpfRepresentOrganizadora: NomeFeiraEvento;
  CpfRepresentRealizadora: NomeFeiraEvento;
  DadosUltimas3Edicoes: NomeFeiraEvento;
  DataInicio: NomeFeiraEvento;
  DataFim: NomeFeiraEvento;
  DataSolicitacao: NomeFeiraEvento;
  DescritivodoEventoObjetivo: NomeFeiraEvento;
  EmpApoiadorasParceriaEvt: NomeFeiraEvento;
  EstruturadeMontagemeInsumo: NomeFeiraEvento;
  ExpectativaPublVisitante: NomeFeiraEvento;
  ExpectativadePublicoExposi: NomeFeiraEvento;
  HorarioFuncionamento: NomeFeiraEvento;
  InformacoesAdicionais: NomeFeiraEvento;
  Localidade: NomeFeiraEvento;
  OutrosbeneficiosLocacao: NomeFeiraEvento;
  PlanoComunicacaoEvento: NomeFeiraEvento;
  RepresentanteOrganizadora: NomeFeiraEvento;
  RepresentanteRealizadora: NomeFeiraEvento;
  TaxasAdicionais: NomeFeiraEvento;
  ValorEntradaVisitantes: NomeFeiraEvento;
  ValorLocacaoAreaLivre: NomeFeiraEvento;
  ValorLocacaoAreaMontada: NomeFeiraEvento;
}
