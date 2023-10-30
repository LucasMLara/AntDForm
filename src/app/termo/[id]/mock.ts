const mockData = {
  percentualDeContrapartidaDoCliente: "20%",
  valorContrapartidaCliente: "R$ 15.000,00",
  dataLimiteInscricao: "29/10/2023 08:32:55.098",
};

export default mockData;

export interface InfosContrato {
  nomeDaFeira: string;
  razãoSocial: string;
  nomeFantasia: string;
  CNPJ: string;
  enderecoEmpreendimento: string;
  bairroEmpreendimento: string;
  cidadeEmpreendimento: string;
  ufEmpreendimento: string;
  cepEmpreendimento: string;
  telefoneEmpreendimento: string;
  emailEmpreendimento: string;
  qtdEmpregados: string;
  dataAbertura: string;
  nome: string;
  CPF: string;
  enderecoResponsavel: "";
  bairroResponsavel: "";
  cidadeResponsavel: "";
  ufResponsavel: string;
  cepResponsavel: string;
  telefoneResponsavel: string;
  emailResponsavel: string;
  nomeDoProjeto: string;
  tipoDeAreaLivre?: boolean;
  tipoDeAreaMontada?: boolean;
  metragemAreaLivre: string;
  metragemAreaMontada: string;
  identificaçãoDoEsta6ande: string;
  dataInicio: string;
  dataFim: string;
  localDaFeira: string;
  percentualDeContrapartidaDoCliente: string;
  valorContrapartidaCliente: string;
  dataLimiteInscricao: string;
}
