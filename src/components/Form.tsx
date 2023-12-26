import { Formik, Form, ErrorMessage } from "formik";
import ModalTermos from "../components/ModalTermos";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import "dayjs/locale/zh-cn";
import { Input, Col, Row, Button, DatePicker, Spin, Tag, message } from "antd";
import styles from "../app/styles.module.css";
import Header from "@/components/Header";
import Cabecalho from "./Cabecalho";
import buscarCliente from "@/utils/getClient";
import {
  FeirasSchema,
  INITIAL_VALUES,
} from "@/utils/validations/FormValidation";
import LogoTipo from "@/components/Image";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LogoSebrae from "../../public/SebraeLogo.svg";
import { useContext, useState, useCallback, useEffect } from "react";
import { FormContext } from "@/utils/validations/FormContext";
import type { RangePickerProps } from "antd/es/date-picker";
import UploadInput from "./UploadInput";
import SearchClientInput from "./SearchClientInput";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import Paragraph from "antd/es/typography/Paragraph";
import { IFormValues } from "@/utils/validations/FormInterface";
import criarCaso from "@/utils/CreateCase";
import getDemanda from "@/utils/getDemanda";
import { useParams } from "next/navigation";
import RevisarDemanda from "@/utils/SetEventDemanda";
import { handleDecode } from "@/utils/crypto";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

interface CustomFile extends File {
  uid: string;
}

const FormFeira = () => {
  const [listFiles, setListFiles] = useState<Array<CustomFile>>([]);
  const [valoresIniciais, setValoresIniciais] = useState(INITIAL_VALUES);
  const [bucandoCliente, setBuscandoCliente] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { termo, setTermo } = useContext(FormContext);
  const defaultEndDate = dayjs().add(90, "day");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < defaultEndDate;
  };

  const pegarCasoExistente = useCallback(async () => {
    const res = await getDemanda(handleDecode(id as string));
    const data = await res;
    return data;
  }, [id]);

  interface Values {
    [key: string]: any;
  }

  const processObject = useCallback((inputObject: Values): any => {
    return Object.entries(inputObject)
      .map(([key, value]) => {
        if (value._text) {
          return { [key]: value._text };
        }
        if (
          key === "EmpresaRealizadoraFeira" ||
          key === "EmpresaOrganizadoraFeira"
        ) {
          const updatedValue: { [key: string]: string } = {};
          Object.entries(value).forEach(([subKey, subValue]: [string, any]) => {
            updatedValue[subKey] = subValue._text || subValue;
          });
          return { [key]: updatedValue };
        }
        return { [key]: value };
      })
      .reduce((acc, curr) => {
        return {
          ...acc,
          ...curr,
        };
      }, {});
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await pegarCasoExistente();
          if (data) {
            const processedData = processObject(data);
            const {
              EmpresaRealizadoraFeira: {
                CGCCFO_SEMMASCARA: CGCCFO_SEMMASCARA_Realizadora,
                id: id_Realizadora,
              },
              EmpresaOrganizadoraFeira: {
                CGCCFO_SEMMASCARA: CGCCFO_SEMMASCARA_Organizadora,
                id: id_Organizadora,
              },
            }: IFormValues = processedData;
            setValoresIniciais({
              ...processedData,
              EmpresaRealizadoraFeira: {
                CGCCFO_SEMMASCARA: CGCCFO_SEMMASCARA_Realizadora,
                id: id_Realizadora,
              },
              EmpresaOrganizadoraFeira: {
                CGCCFO_SEMMASCARA: CGCCFO_SEMMASCARA_Organizadora,
                id: id_Organizadora,
              },
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [pegarCasoExistente, id, processObject]);

  const enviarForm = useCallback(
    async (data: IFormValues) => {
      const {
        PlantaBaixa,
        ComprovantedeExclusividade,
        ContratosLocacaoEspaco,
        ManualExpositorRegrasExpo,
        periodoEvento,
        ...rest
      } = data;

      const bodyReq: IFormValues = {
        PlantaBaixa: listFiles[0] ?? null,
        ComprovantedeExclusividade: listFiles[1] ?? null,
        ContratosLocacaoEspaco: listFiles[2] ?? null,
        ManualExpositorRegrasExpo: listFiles[3] ?? null,
        periodoEvento,
        ...rest,
      };

      if (id) {
        const casoRevisado = await RevisarDemanda(bodyReq);
        return casoRevisado;
      }
      const casoCriado = await criarCaso(bodyReq);
      if (casoCriado) message.success("Feira criada com sucesso!");
      return casoCriado;
    },
    [id, listFiles]
  );

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={250} height={250} />
      </div>
      <Formik
        enableReinitialize
        initialValues={valoresIniciais}
        validationSchema={FeirasSchema}
        onSubmit={(values: IFormValues, { resetForm }) => {
          enviarForm(values).then(() => {
            resetForm();
            setTermo(false);
            router.replace("/done");
          });
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          handleChange,
          errors,
        }) => (
          <Form className={styles.formWrapper} onSubmit={handleSubmit}>
            <Cabecalho title="1. DADOS GERAIS" size={4} />
            <TextInput
              handleChange={handleChange("NomeFeiraEventoNegocio")}
              value={values.NomeFeiraEventoNegocio}
              label="Nome da Feira"
              placeholder="Insira o nome do seu evento"
              name="NomeFeiraEventoNegocio"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("Localidade")}
              value={values.Localidade}
              label="Local"
              placeholder="Insira o local do seu evento"
              name="Localidade"
              type="text"
              required
            />
            <Cabecalho title="Período de Realização" size={5} />
            <Row style={{ margin: ".2em 0", padding: ".5em" }}>
              <Col>
                <RangePicker
                  id="periodoEvento"
                  locale={locale}
                  defaultValue={[defaultEndDate, null]}
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  size="large"
                  name="periodoEvento"
                  onChange={(_, dateString) =>
                    setFieldValue("periodoEvento", [dateString])
                  }
                />
                <ErrorMessage name="periodoEvento">
                  {(errMsg) => <Paragraph type="danger">{errMsg}</Paragraph>}
                </ErrorMessage>
                {id ? (
                  <Tag style={{ margin: "0 1em" }}>
                    Favor reinserir as datas
                  </Tag>
                ) : (
                  ""
                )}
                <Tag style={{ margin: "0 1em" }} color="geekblue">
                  Antecedência mínima de 90 dias do início do evento!
                </Tag>
              </Col>
            </Row>
            <TextInput
              handleChange={handleChange("HorarioFuncionamento")}
              value={values.HorarioFuncionamento}
              label="Horário de Funcionamento"
              placeholder="Qual o horário do funcionamento?"
              name="HorarioFuncionamento"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("ValorEntradaVisitantes")}
              value={values.ValorEntradaVisitantes}
              label="Valor da entrada dos visitantes"
              placeholder="Quanto vai custar o ingresso?"
              name="ValorEntradaVisitantes"
              onlyNumbersInput
              type="text"
              required
            />
            <Cabecalho title="2. PRINCIPAIS INSTITUIÇÕES ENVOLVIDAS" size={5} />
            {/*--------REALIZADORA--------*/}
            <Cabecalho title="Empresa Realizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.Nome")}
                  value={values.EmpresaRealizadoraFeira.Nome}
                  label="Nome"
                  name="EmpresaRealizadoraFeira.Nome"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <SearchClientInput
                  loading={bucandoCliente}
                  handleChange={handleChange(
                    "EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA"
                  )}
                  placeholder="Insira somente números"
                  onSearch={async (clientDoc) => {
                    if (clientDoc.length === 14) {
                      setBuscandoCliente(true);
                      const realizadora = await buscarCliente(clientDoc);
                      setBuscandoCliente(false);
                      if (realizadora) {
                        setFieldValue(
                          "EmpresaRealizadoraFeira.id",
                          realizadora["_attributes"]["key"]
                        );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.Nome",
                          realizadora.Nome._text
                        );
                        if (realizadora.Telefone._text) {
                          setFieldValue(
                            "EmpresaRealizadoraFeira.Telefone",
                            realizadora.Telefone._text
                              .replace(" ", "")
                              .replace("-", "")
                              .replace("(", "")
                              .replace(")", "")
                          );
                        }
                        if (realizadora.Email._text)
                          setFieldValue(
                            "EmpresaRealizadoraFeira.Email",
                            realizadora.Email._text
                          );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.Rua",
                          realizadora.Rua._text
                        );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.Bairro",
                          realizadora.Bairro._text
                        );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.Cidade",
                          realizadora.Cidade._text
                        );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.UF",
                          realizadora.UF._text
                        );
                        setFieldValue(
                          "EmpresaRealizadoraFeira.CEP",
                          realizadora.CEP._text
                        );
                        message.success(
                          `Empresa encontrada: ${realizadora.Nome._text} `
                        );
                      } else {
                        setBuscandoCliente(false);
                        message.error(
                          `Empresa com documento: ${clientDoc} não encontrada.`
                        );
                      }
                    }
                  }}
                  label="CNPJ"
                  required
                  name="EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA"
                  value={values.EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA}
                  maxLength={14}
                  showCount
                />
                {id ? (
                  <Tag>Favor buscar a empresa realizadora novamente!</Tag>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.Rua")}
                  value={values.EmpresaRealizadoraFeira.Rua}
                  label="Endereço"
                  name="EmpresaRealizadoraFeira.Rua"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.Bairro")}
                  value={values.EmpresaRealizadoraFeira.Bairro}
                  label="Bairro"
                  name="EmpresaRealizadoraFeira.Bairro"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.Cidade")}
                  value={values.EmpresaRealizadoraFeira.Cidade}
                  label="Cidade"
                  name="EmpresaRealizadoraFeira.Cidade"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.UF")}
                  value={values.EmpresaRealizadoraFeira.UF}
                  label="UF"
                  name="EmpresaRealizadoraFeira.UF"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.CEP")}
                  value={values.EmpresaRealizadoraFeira.CEP}
                  label="CEP"
                  name="EmpresaRealizadoraFeira.CEP"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("RepresentanteRealizadora")}
                  value={values.RepresentanteRealizadora}
                  label="Representante Legal"
                  name="RepresentanteRealizadora"
                  type="text"
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("CpfRepresentRealizadora")}
                  value={values.CpfRepresentRealizadora}
                  label="CPF"
                  onlyNumbersInput
                  placeholder="Insira somente números"
                  name="CpfRepresentRealizadora"
                  type="text"
                  required
                  showCount
                  maxLength={11}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange(
                    "EmpresaRealizadoraFeira.Telefone"
                  )}
                  value={values.EmpresaRealizadoraFeira.Telefone}
                  label="Telefone"
                  name="EmpresaRealizadoraFeira.Telefone"
                  type="text"
                  required
                  onlyNumbersInput
                  placeholder="27999999999"
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaRealizadoraFeira.Email")}
                  value={values.EmpresaRealizadoraFeira.Email}
                  label="Email"
                  name="EmpresaRealizadoraFeira.Email"
                  type="email"
                  required
                />
              </Col>
            </Row>
            {/*--------ORGANIZADORA--------*/}
            <Cabecalho title="Empresa Organizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.Nome")}
                  value={values.EmpresaOrganizadoraFeira.Nome}
                  label="Nome"
                  name="EmpresaOrganizadoraFeira.Nome"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <SearchClientInput
                  loading={bucandoCliente}
                  handleChange={handleChange(
                    "EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA"
                  )}
                  onSearch={async (clientDoc) => {
                    if (clientDoc.length === 14) {
                      setBuscandoCliente(true);
                      const organizadora = await buscarCliente(clientDoc);
                      setBuscandoCliente(false);
                      if (organizadora) {
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.id",
                          organizadora["_attributes"]["key"]
                        );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.Nome",
                          organizadora.Nome._text
                        );
                        if (organizadora.Telefone._text) {
                          setFieldValue(
                            "EmpresaOrganizadoraFeira.Telefone",
                            organizadora.Telefone._text
                              .replace(" ", "")
                              .replace("-", "")
                              .replace("(", "")
                              .replace(")", "")
                          );
                        }
                        if (organizadora.Email._text)
                          setFieldValue(
                            "EmpresaOrganizadoraFeira.Email",
                            organizadora.Email._text
                          );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.Rua",
                          organizadora.Rua._text
                        );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.Bairro",
                          organizadora.Bairro._text
                        );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.Cidade",
                          organizadora.Cidade._text
                        );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.UF",
                          organizadora.UF._text
                        );
                        setFieldValue(
                          "EmpresaOrganizadoraFeira.CEP",
                          organizadora.CEP._text
                        );
                        message.success(
                          `Empresa encontrada: ${organizadora.Nome._text} `
                        );
                      } else {
                        setBuscandoCliente(false);
                        message.error(
                          `Empresa com documento: ${clientDoc} não encontrada.`
                        );
                      }
                    }
                  }}
                  label="CNPJ"
                  required
                  name="EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA"
                  value={values.EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA}
                  maxLength={14}
                  showCount
                />
                {id ? (
                  <Tag>Favor buscar a empresa organizadora novamente!</Tag>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.Rua")}
                  value={values.EmpresaOrganizadoraFeira.Rua}
                  label="Endereço"
                  name="EmpresaOrganizadoraFeira.Rua"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.Bairro")}
                  value={values.EmpresaOrganizadoraFeira.Bairro}
                  label="Bairro"
                  name="EmpresaOrganizadoraFeira.Bairro"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.Cidade")}
                  value={values.EmpresaOrganizadoraFeira.Cidade}
                  label="Cidade"
                  name="EmpresaOrganizadoraFeira.Cidade"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.UF")}
                  value={values.EmpresaOrganizadoraFeira.UF}
                  label="UF"
                  name="EmpresaOrganizadoraFeira.UF"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.CEP")}
                  value={values.EmpresaOrganizadoraFeira.CEP}
                  label="CEP"
                  name="EmpresaOrganizadoraFeira.CEP"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("RepresentanteOrganizadora")}
                  value={values.RepresentanteOrganizadora}
                  label="Representante Legal"
                  name="RepresentanteOrganizadora"
                  type="text"
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("CpfRepresentOrganizadora")}
                  value={values.CpfRepresentOrganizadora}
                  label="CPF"
                  name="CpfRepresentOrganizadora"
                  type="text"
                  required
                  onlyNumbersInput
                  placeholder="Insira somente números"
                  showCount
                  maxLength={11}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange(
                    "EmpresaOrganizadoraFeira.Telefone"
                  )}
                  value={values.EmpresaOrganizadoraFeira.Telefone}
                  label="Telefone"
                  name="EmpresaOrganizadoraFeira.Telefone"
                  type="text"
                  required
                  onlyNumbersInput
                  placeholder="27999999999"
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("EmpresaOrganizadoraFeira.Email")}
                  value={values.EmpresaOrganizadoraFeira.Email}
                  label="Email"
                  name="EmpresaOrganizadoraFeira.Email"
                  type="email"
                  required
                />
              </Col>
            </Row>
            <Cabecalho
              title="3. Empresas Apoiadoras / Parceiras do Evento:"
              size={4}
            />
            <TextAreaInput
              handleChange={handleChange("EmpApoiadorasParceriaEvt")}
              value={values.EmpApoiadorasParceriaEvt}
              name="EmpApoiadorasParceriaEvt"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <Cabecalho title="4. Descritivo do Evento / Objetivo:" size={4} />
            <TextAreaInput
              handleChange={handleChange("DescritivodoEventoObjetivo")}
              value={values.DescritivodoEventoObjetivo}
              name="DescritivodoEventoObjetivo"
              type="textarea"
              antdComponent={TextArea}
              required
              placeholder="Acima de 1500 caracteres"
              maxLength={4000}
              showCount
            />
            <TextInput
              handleChange={handleChange("ExpectativadePublicoExposi")}
              value={values.ExpectativadePublicoExposi}
              label="Expectativa de Público Expositor"
              name="ExpectativadePublicoExposi"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("ExpectativaPublVisitante")}
              value={values.ExpectativaPublVisitante}
              label="Expectativa de Público Visitante"
              name="ExpectativaPublVisitante"
              type="text"
              required
            />
            <Cabecalho
              title="5. Dados das Últimas 03 edições:"
              size={4}
              required
            />
            <TextAreaInput
              handleChange={handleChange("DadosUltimas3Edicoes")}
              value={values.DadosUltimas3Edicoes}
              name="DadosUltimas3Edicoes"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho
              title="6. Plano de Comunicação do Evento:"
              size={4}
              required
            />
            <TextAreaInput
              handleChange={handleChange("PlanoComunicacaoEvento")}
              value={values.PlanoComunicacaoEvento}
              name="PlanoComunicacaoEvento"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho title="7. Objeto da Proposta e Valores:" size={4} />
            <TextInput
              handleChange={handleChange("ValorLocacaoAreaLivre")}
              value={values.ValorLocacaoAreaLivre}
              label="Valor de Locação da Área Livre (R$/m²)"
              name="ValorLocacaoAreaLivre"
              type="text"
              onlyNumbersInput
              required
            />
            <TextInput
              handleChange={handleChange("ValorLocacaoAreaMontada")}
              value={values.ValorLocacaoAreaMontada}
              label="Valor de Locação da Área Montada (Área com estande montado)
              (R$/m²)"
              name="ValorLocacaoAreaMontada"
              onlyNumbersInput
              type="text"
              required
            />
            <TextAreaInput
              handleChange={handleChange("EstruturadeMontagemeInsumo")}
              value={values.EstruturadeMontagemeInsumo}
              label="Descritivo da Estrutura de montagem e insumos de locação da área
              montada"
              name="EstruturadeMontagemeInsumo"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <TextInput
              handleChange={handleChange("TaxasAdicionais")}
              value={values.TaxasAdicionais}
              label="Taxas Adicionais"
              name="TaxasAdicionais"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("OutrosbeneficiosLocacao")}
              value={values.OutrosbeneficiosLocacao}
              label="Outros benefícios"
              name="OutrosbeneficiosLocacao"
              type="text"
              required
            />
            <Cabecalho title="8. Informações Adicionais:" size={4} required />
            <TextAreaInput
              handleChange={handleChange("InformacoesAdicionais")}
              value={values.InformacoesAdicionais}
              name="InformacoesAdicionais"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <Cabecalho title="9. Anexos:" size={4} />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("PlantaBaixa", null);
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("PlantaBaixa", value);
              }}
              label="Planta Baixa"
              name="PlantaBaixa"
              id="PlantaBaixa"
              required
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="ComprovantedeExclusividade"
              label="Comprovante de Exclusividade / Registro INPI"
              name="ComprovantedeExclusividade"
              required
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("ComprovantedeExclusividade", null);
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("ComprovantedeExclusividade", value);
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="ContratosLocacaoEspaco"
              label="Contrato de Locação de espaço"
              name="ContratosLocacaoEspaco"
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("ContratosLocacaoEspaco", null);
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("ContratosLocacaoEspaco", value);
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="ManualExpositorRegrasExpo"
              label="Manual do Expositor ou Regras para Exposição"
              name="ManualExpositorRegrasExpo"
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("ManualExpositorRegrasExpo", null);
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("ManualExpositorRegrasExpo", value);
              }}
            />
            <Row style={{ margin: "1em", padding: "1em" }}>
              <ModalTermos />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button
                onClick={() => {
                  if (errors && id) {
                    Object.keys(errors).forEach((e) =>
                      message.error(`Campo: ${e} precisa ser revisado!`)
                    );
                  }
                }}
                type="primary"
                disabled={!termo || isSubmitting}
                title={
                  !termo ? "É Necessário aceitar os termos contratuais!" : ""
                }
                htmlType="submit"
                style={{ width: "40%" }}
              >
                {isSubmitting ? <Spin /> : "Enviar"}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
      <Paragraph style={{ textAlign: "center", margin: "1em 2em," }}>
        O SEBRAE/ES, desde já, coloca-se à disposição para esclarecimentos
        complementares à interpretação, à utilização e ao preenchimento deste
        roteiro, através da UMC - Unidade de Marketing e Comunicação{" "}
        <a href="tel:+552730415577">(027) 3041 - 5577 </a>
      </Paragraph>
    </>
  );
};

export default FormFeira;
