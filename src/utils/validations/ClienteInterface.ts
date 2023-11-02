interface FamDemanda {
  _text: number;
}

interface FAMManifestantesInteress {
  FAMDemanda: FamDemanda;
}

export interface InfosClienteInteressado {
  FAMManifestantesInteress: FAMManifestantesInteress;
}
