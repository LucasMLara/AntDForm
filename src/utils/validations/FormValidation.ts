import * as Yup from "yup";
import { IFormValues } from "./FormInterface";

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
  NomeFeiraEventoNegocio: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  Localidade: Yup.string()
    .min(2, "Entre com um nome válido")
    .max(50, "Nome muito comprido!")
    .required("Campo obrigatório!"),
  HorarioFuncionamento: Yup.string()
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
  ValorEntradaVisitantes: Yup.string().required("Campo obrigatório!"),
  EmpresaRealizadoraFeira: Yup.object().shape({
    CGCCFO_SEMMASCARA: replaceNonIntegerChars(
      "Campo Obrigatório",
      14,
      "Insira 14 dígitos"
    ),
    Nome: Yup.string().required("Campo obrigatório"),
    Bairro: Yup.string().required("Campo obrigatório"),
    CEP: Yup.string().required("Campo obrigatório"),
    Cidade: Yup.string().required("Campo obrigatório"),
    UF: Yup.string().required("Campo obrigatório"),
    Email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo obrigatório"),
  }),
  EmpresaOrganizadoraFeira: Yup.object().shape({
    CGCCFO_SEMMASCARA: replaceNonIntegerChars(
      "Campo Obrigatório",
      14,
      "Insira 14 dígitos"
    ),
    Nome: Yup.string().required("Campo obrigatório"),
    Bairro: Yup.string().required("Campo obrigatório"),
    CEP: Yup.string().required("Campo obrigatório"),
    Cidade: Yup.string().required("Campo obrigatório"),
    UF: Yup.string().required("Campo obrigatório"),
    Email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo obrigatório"),
  }),
  // representanteRealizadora: Yup.string().required("Campo obrigatório"),
  // representanteOrganizadora: Yup.string().required("Campo obrigatório"),
  // cpfRepresentanteRealizadora: replaceNonIntegerChars(
  //   "Campo Obrigatório",
  //   11,
  //   "Insira 11 dígitos"
  // ),
  // cpfRepresentanteOrganizadora: replaceNonIntegerChars(
  //   "Campo Obrigatório",
  //   11,
  //   "Insira 11 dígitos"
  // ),
  // empresasApoiadoras: Yup.string().required("Campo obrigatório"),
  // descritivoEvento: Yup.string()
  //   .min(1500, "Requer no mínimo 1500 caracteres")
  //   .required("Campo obrigatório"),
  // expectativaPubExpositor: Yup.string().required("Campo obrigatório"),
  // expectativaPubVisitante: Yup.string().required("Campo obrigatório"),
  // dadosUltimasEdicoes: Yup.string().required("Campo obrigatório"),
  // planoComunicacaoEvento: Yup.string().required("Campo obrigatório"),
  // descritivoEstruturaMontagem: Yup.string().required("Campo obrigatório"),
  // valorLocacaoLivre: Yup.string().required("Campo obrigatório"),
  // valorLocacaoMontada: Yup.string().required("Campo obrigatório"),
  // txsAdicionais: Yup.string().required("Campo obrigatório"),
  // outrosBeneficios: Yup.string().required("Campo obrigatório"),
  // infoAdicional: Yup.string().required("Campo obrigatório"),
  // plantaBaixa: Yup.string().required("Campo obrigatório"),
  // comprovanteExclusividadeRegistroINPI:
  //   Yup.string().required("Campo obrigatório"),
});

export const INITIAL_VALUES: IFormValues = {
  NomeFeiraEventoNegocio: "",
  Localidade: "",
  HorarioFuncionamento: "",
  ValorEntradaVisitantes: "",
  EmpresaRealizadoraFeira: {
    Nome: "",
    Bairro: "",
    CEP: "",
    CGCCFO_SEMMASCARA: "",
    Cidade: "",
    CNPJCPF: "",
    Email: "",
    id: "",
    NomeFantasia: "",
    Numero: "",
    Rua: "",
    Telefone: "",
    UF: "",
  },
  EmpresaOrganizadoraFeira: {
    Nome: "",
    Bairro: "",
    CEP: "",
    CGCCFO_SEMMASCARA: "",
    Cidade: "",
    CNPJCPF: "",
    Email: "",
    id: "",
    NomeFantasia: "",
    Numero: "",
    Rua: "",
    Telefone: "",
    UF: "",
  },
  periodoEvento: [undefined, undefined],
  DataInicio: "",
  DataFim: "",
  RepresentanteRealizadora: "",
  RepresentanteOrganizadora: "",
  CpfRepresentRealizadora: "",
  CpfRepresentOrganizadora: "",
  EmpApoiadorasParceriaEvt: "",
  DescritivodoEventoObjetivo: "",
  ExpectativadePublicoExposi: "",
  ExpectativaPublVisitante: "",
  DadosUltimas3Edicoes: "",
  PlanoComunicacaoEvento: "",
  ValorLocacaoAreaLivre: "",
  ValorLocacaoAreaMontada: "",
  TaxasAdicionais: "",
  EstruturadeMontagemeInsumo: "",
  OutrosbeneficiosLocacao: "",
  InformacoesAdicionais: "",
  PlantaBaixa: "",
  ComprovantedeExclusividade: "",
  ContratosLocacaoEspaco: "",
  ManualExpositorRegrasExpo: "",
};
