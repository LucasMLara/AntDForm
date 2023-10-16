import * as Yup from "yup";

//TODO verificar data inicio e fim

export const FeirasSchema = Yup.object().shape({
  nomeDaFeira: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  localDaFeira: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  horarioFuncionamento: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  valorEntradaVisitantes: Yup.number().required("Campo obrigatório!"),
  empresaRealizadora: Yup.string().required("Campo obrigatório!"),
  empresaOrganizadora: Yup.string().required("Campo obrigatório!"),
  docRealizadora: Yup.string().required("Campo obrigatório!"),
  docOrganizadora: Yup.string().required("Campo obrigatório!"),
  enderecoRealizadora: Yup.string().required("Campo obrigatório"),
  enderecoOrganizadora: Yup.string().required("Campo obrigatório"),
  cidadeRealizadora: Yup.string().required("Campo obrigatório"),
  cidadeOrganizadora: Yup.string().required("Campo obrigatório"),
  ufRealizadora: Yup.string().required("Campo obrigatório"),
  ufOrganizadora: Yup.string().required("Campo obrigatório"),
  cepRealizadora: Yup.string().required("Campo obrigatório"),
  cepOrganizadora: Yup.string().required("Campo obrigatório"),
  representanteRealizadora: Yup.string().required("Campo obrigatório"),
  representanteOrganizadora: Yup.string().required("Campo obrigatório"),
  cpfRepresentanteRealizadora: Yup.string().required("Campo obrigatório"),
  cpfRepresentanteOrganizadora: Yup.string().required("Campo obrigatório"),
  emailRepresentanteRealizadora: Yup.string()
    .email("Formato de email inválido")
    .required("Campo obrigatório!"),
  contatoRepresentanteRealizadora: Yup.string().required("Campo obrigatório"),
  contatoRepresentanteOrganizadora: Yup.string().required("Campo obrigatório"),
  emailRepresentanteOrganizadora: Yup.string()
    .email("Formato de email inválido")
    .required("Campo obrigatório!"),
  empresasApoiadoras: Yup.string().required("Campo obrigatório"),
  descritivoEvento: Yup.string().min(1500, "Requer no mínimo 1500 caracteres"),
  expectativaPubExpositor: Yup.string().required("Campo obrigatório"),
  expectativaPubVisitante: Yup.string().required("Campo obrigatório"),
  dadosUltimasEdicoes: Yup.string().required("Campo obrigatório"),
  planoComunicacaoEvento: Yup.string().required("Campo obrigatório"),
  valorLocacaoLivre: Yup.string().required("Campo obrigatório"),
  valorLocacaoMontada: Yup.string().required("Campo obrigatório"),
  txsAdicionais: Yup.string().required("Campo obrigatório"),
  outrosBeneficios: Yup.string().required("Campo obrigatório"),
  infoAdicional: Yup.string().required(),
  plantaBaixa: Yup.object()
    .shape({ name: Yup.string().required() })
    .required("Campo obrigatório"),
  comprovanteExclusividadeRegistroINPI: Yup.object()
    .shape({ name: Yup.string().required() })
    .required("Campo obrigatório"),
  aceiteTermos: Yup.boolean().required(),
});

export const INITIAL_VALUES = {
  nomeDaFeira: "",
  localDaFeira: "",
  horarioFuncionamento: "",
  valorEntradaVisitantes: "",
  empresaRealizadora: "",
  empresaOrganizadora: "",
  docRealizadora: "",
  docOrganizadora: "",
  enderecoRealizadora: "",
  enderecoOrganizadora: "",
  cidadeRealizadora: "",
  cidadeOrganizadora: "",
  ufRealizadora: "",
  ufOrganizadora: "",
  cepRealizadora: "",
  cepOrganizadora: "",
  representanteRealizadora: "",
  representanteOrganizadora: "",
  cpfRepresentanteRealizadora: "",
  cpfRepresentanteOrganizadora: "",
  emailRepresentanteRealizadora: "",
  emailRepresentanteOrganizadora: "",
  empresasApoiadoras: "",
  descritivoEvento: "",
  expectativaPubExpositor: "",
  expectativaPubVisitante: "",
  dadosUltimasEdicoes: "",
  planoComunicacaoEvento: "",
  valorLocacaoLivre: "",
  valorLocacaoMontada: "",
  txsAdicionais: "",
  outrosBeneficios: "",
  infoAdicional: "",
  plantaBaixa: null,
  comprovanteExclusividadeRegistroINPI: null,
  aceiteTermos: false,
  contatoRepresentanteRealizadora: "",
  contatoRepresentanteOrganizadora: "",
};
