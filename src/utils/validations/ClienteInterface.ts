interface FamDemanda {
  _text: number;
}

interface FAMManifestantesInteress {
  FAMDemanda: FamDemanda;
}

export interface InfosClienteInteressado {
  CaseId: FamDemanda;
  FAMManifestantesInteress: FAMManifestantesInteress;
}
