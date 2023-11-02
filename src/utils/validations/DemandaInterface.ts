interface TratarText {
  _text: string;
}

interface EmpresaFeira {
  Nome: TratarText;
  Bairro: TratarText;
  NomeFantasia: TratarText;
  CEP: TratarText;
  CGCCFO_SEMMASCARA: TratarText;
  CNPJCPF: TratarText;
  Cidade: TratarText;
  Email: TratarText;
  Numero: TratarText;
  Rua: TratarText;
  Telefone: TratarText;
  UF: TratarText;
}

export interface InfosDemanda {
  Nprocesso: TratarText;
  NomeFeiraEventoNegocio: TratarText;
  EmpresaRealizadoraFeira: EmpresaFeira;
  EmpresaOrganizadoraFeira: EmpresaFeira;
  CpfRepresentOrganizadora: TratarText;
  CpfRepresentRealizadora: TratarText;
  DadosUltimas3Edicoes: TratarText;
  DataInicio: TratarText;
  DataFim: TratarText;
  DataSolicitacao: TratarText;
  DescritivodoEventoObjetivo: TratarText;
  EmpApoiadorasParceriaEvt: TratarText;
  EstruturadeMontagemeInsumo: TratarText;
  ExpectativaPublVisitante: TratarText;
  ExpectativadePublicoExposi: TratarText;
  HorarioFuncionamento: TratarText;
  InformacoesAdicionais: TratarText;
  Localidade: TratarText;
  OutrosbeneficiosLocacao: TratarText;
  PlanoComunicacaoEvento: TratarText;
  RepresentanteOrganizadora: TratarText;
  RepresentanteRealizadora: TratarText;
  TaxasAdicionais: TratarText;
  ValorEntradaVisitantes: TratarText;
  ValorLocacaoAreaLivre: TratarText;
  ValorLocacaoAreaMontada: TratarText;
}
