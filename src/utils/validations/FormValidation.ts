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
    .required("Campo obrigatório!"),
  Localidade: Yup.string()
    .min(2, "Entre com um nome válido")
    .required("Campo obrigatório!"),
  HorarioFuncionamento: Yup.string()
    .min(2, "Entre com um nome válido")
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
    Rua: Yup.string().required("Campo obrigatório"),
    Telefone: replaceNonIntegerChars(
      "Campo Obrigatório",
      11,
      "Insira 11 dígitos"
    ),
    Email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo obrigatório"),
  }),

  EmpresaOrganizadoraFeira: Yup.object().shape({
    Telefone: replaceNonIntegerChars(
      "Campo Obrigatório",
      11,
      "Insira 11 dígitos"
    ),
    CGCCFO_SEMMASCARA: replaceNonIntegerChars(
      "Campo Obrigatório",
      14,
      "Insira 14 dígitos"
    ),
    Nome: Yup.string().required("Campo obrigatório"),
    Rua: Yup.string().required("Campo obrigatório"),
    Bairro: Yup.string().required("Campo obrigatório"),
    CEP: Yup.string().required("Campo obrigatório"),
    Cidade: Yup.string().required("Campo obrigatório"),
    UF: Yup.string().required("Campo obrigatório"),
    Email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo obrigatório"),
  }),
  RepresentanteRealizadora: Yup.string().required("Campo obrigatório"),
  RepresentanteOrganizadora: Yup.string().required("Campo obrigatório"),
  CpfRepresentRealizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  CpfRepresentOrganizadora: replaceNonIntegerChars(
    "Campo Obrigatório",
    11,
    "Insira 11 dígitos"
  ),
  EmpApoiadorasParceriaEvt: Yup.string().required("Campo obrigatório"),
  DescritivodoEventoObjetivo: Yup.string()
    .min(1500, "Requer no mínimo 1500 caracteres")
    .required("Campo obrigatório"),
  ExpectativadePublicoExposi: Yup.string().required("Campo obrigatório"),
  ExpectativaPublVisitante: Yup.string().required("Campo obrigatório"),
  DadosUltimas3Edicoes: Yup.string().required("Campo obrigatório"),
  PlanoComunicacaoEvento: Yup.string().required("Campo obrigatório"),
  EstruturadeMontagemeInsumo: Yup.string().required("Campo obrigatório"),
  ValorLocacaoAreaLivre: Yup.string().required("Campo obrigatório"),
  ValorLocacaoAreaMontada: Yup.string().required("Campo obrigatório"),
  TaxasAdicionais: Yup.string().required("Campo obrigatório"),
  OutrosbeneficiosLocacao: Yup.string().required("Campo obrigatório"),
  InformacoesAdicionais: Yup.string().required("Campo obrigatório"),
  PlantaBaixa: Yup.mixed().nullable().required("Campo obrigatório"),
  ComprovantedeExclusividade: Yup.mixed()
    .nullable()
    .required("Campo obrigatório"),
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
  PlantaBaixa: null,
  ComprovantedeExclusividade: null,
  ContratosLocacaoEspaco: null,
  ManualExpositorRegrasExpo: null,
};
