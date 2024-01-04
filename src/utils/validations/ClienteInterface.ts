interface IFormatacao {
  _text: number;
}

interface FAMManifestantesInteress {
  FAMDemanda: IFormatacao;
  DataLimiteInscricao?: IFormatacao;
}

export interface InfosClienteInteressado {
  CaseId: IFormatacao;
  FAMManifestantesInteress: FAMManifestantesInteress;
  ValorContrapartida?: IFormatacao;
  ContrapartidaCliente?: IFormatacao;
}
