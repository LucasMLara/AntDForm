import * as Yup from "yup";

const replaceNonIntegerChars = (
  message = "Campo obrigatório!",
  minDigit: number,
  minDigitErrorMsg: string
) =>
  Yup.string()
    .matches(/^\d+$/, {
      message: "Somente números são permitidos.",
    })
    .min(minDigit, minDigitErrorMsg)
    .required(message);

export const FeirasSchema = Yup.object().shape({
  nomeDaFeira: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  localDaFeira: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  periodoEvento: Yup.array()
    .test("periodoEvento", "Preencha corretamente as datas", (e) => {
      const data1 = e?.[0]?.[0];
      const data2 = e?.[0]?.[1];
      return data1 || data2;
    })
    .required("Campo Obrigatório"),
  horarioFuncionamento: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  valorEntradaVisitantes: Yup.string().required("Campo obrigatório!"),
  empresaRealizadora: Yup.string().required("Campo obrigatório!"),
  empresaOrganizadora: Yup.string().required("Campo obrigatório!"),
  docRealizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    14,
    "Insira 14 dígitos"
  ),
  docOrganizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    14,
    "Insira 14 dígitos"
  ),
  enderecoRealizadora: Yup.string().required("Campo obrigatório"),
  enderecoOrganizadora: Yup.string().required("Campo obrigatório"),
  cidadeRealizadora: Yup.string().required("Campo obrigatório"),
  cidadeOrganizadora: Yup.string().required("Campo obrigatório"),
  ufRealizadora: Yup.string().required("Campo obrigatório"),
  ufOrganizadora: Yup.string().required("Campo obrigatório"),
  cepRealizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    8,
    "Insira 8 dígitos"
  ),
  cepOrganizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    8,
    "Insira 8 dígitos"
  ),
  representanteRealizadora: Yup.string().required("Campo obrigatório"),
  representanteOrganizadora: Yup.string().required("Campo obrigatório"),
  cpfRepresentanteRealizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  cpfRepresentanteOrganizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  emailRepresentanteRealizadora: Yup.string()
    .email("Formato de email inválido")
    .required("Campo obrigatório!"),
  contatoRepresentanteRealizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  contatoRepresentanteOrganizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  emailRepresentanteOrganizadora: Yup.string()
    .email("Formato de email inválido")
    .required("Campo obrigatório!"),
  empresasApoiadoras: Yup.string().required("Campo obrigatório"),
  descritivoEvento: Yup.string()
    .min(1500, "Requer no mínimo 1500 caracteres")
    .required("Campo obrigatório"),
  expectativaPubExpositor: Yup.string().required("Campo obrigatório"),
  expectativaPubVisitante: Yup.string().required("Campo obrigatório"),
  dadosUltimasEdicoes: Yup.string().required("Campo obrigatório"),
  planoComunicacaoEvento: Yup.string().required("Campo obrigatório"),
  descritivoEstruturaMontagem: Yup.string().required("Campo obrigatório"),
  valorLocacaoLivre: Yup.string().required("Campo obrigatório"),
  valorLocacaoMontada: Yup.string().required("Campo obrigatório"),
  txsAdicionais: Yup.string().required("Campo obrigatório"),
  outrosBeneficios: Yup.string().required("Campo obrigatório"),
  infoAdicional: Yup.string().required("Campo obrigatório"),
  plantaBaixa: Yup.string().required("Campo obrigatório"),
  comprovanteExclusividadeRegistroINPI:
    Yup.string().required("Campo obrigatório"),
});

export const INITIAL_VALUES = {
  nomeDaFeira: "",
  localDaFeira: "",
  horarioFuncionamento: "",
  valorEntradaVisitantes: "",
  empresaRealizadora: "",
  empresaOrganizadora: "",
  docRealizadora: "",
  periodoEvento: [undefined, undefined],
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
  descritivoEstruturaMontagem: "",
  outrosBeneficios: "",
  infoAdicional: "",
  plantaBaixa: "",
  comprovanteExclusividadeRegistroINPI: "",
  contratoLocacao: "",
  manualExpositor: "",
  contatoRepresentanteRealizadora: "",
  contatoRepresentanteOrganizadora: "",
};
