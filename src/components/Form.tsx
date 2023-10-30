"use client";
import { Formik, Form, ErrorMessage, FormikHelpers, Field } from "formik";
import ModalTermos from "../components/ModalTermos";
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

const { TextArea } = Input;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

interface CustomFile extends File {
  uid: string;
}

const FormFeira = () => {
  const [listFiles, setListFiles] = useState<Array<CustomFile>>([]);
  const [bucandoCliente, setBuscandoCliente] = useState(false);
  const { id } = useParams()

  const { termo } = useContext(FormContext);
  const defaultEndDate = dayjs().add(90, "day");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < defaultEndDate;
  };

  const pegarCasoExistente = useCallback(async () => {
    const res = await getDemanda(+id);
    const data = await res;
    return data;
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pegarCasoExistente();
        console.log(data.EmpresaRealizadoraFeira);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pegarCasoExistente]);

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
        PlantaBaixa: listFiles[0] ? listFiles[0]["uid"] : "",
        ComprovantedeExclusividade: listFiles[1]
          ? listFiles[1]["uid"]
          : "",
          ContratosLocacaoEspaco: listFiles[2] ? listFiles[2]["uid"] : "",
          ManualExpositorRegrasExpo: listFiles[3] ? listFiles[3]["uid"] : "",
        periodoEvento,
        ...rest,
      };
      const casoCriado = await criarCaso(bodyReq);
      console.log(casoCriado);
      console.log(
        casoCriado["soap:Envelope"]["soap:Body"].createCasesResponse
          .createCasesResult.processes.process.processRadNumber
      );
      return casoCriado;
    },
    [listFiles]
  );

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={250} height={250} />
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FeirasSchema}
        onSubmit={(values: IFormValues) => /* enviarForm(values) */ console.log(values)}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          handleChange,
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
                <Tag style={{ margin: "0 1em" }} color="geekblue">
                  Antecedência mínima de 90 dias!
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
                  handleChange={handleChange("EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA")}
                  placeholder="Insira somente números"
                  onSearch={async (clientDoc) => {
                    if (clientDoc.length === 14) {
                      setBuscandoCliente(true);
                      const realizadora = await buscarCliente(clientDoc);
                      console.log('realizadora', realizadora)
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
                        setFieldValue(
                          "EmpresaRealizadoraFeira.Telefone",
                          realizadora.Telefone._text
                            .replace(" ", "")
                            .replace("-", "")
                            .replace("(", "")
                            .replace(")", "")
                        );
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
                        setFieldValue("EmpresaRealizadoraFeira.UF", realizadora.UF._text);
                        setFieldValue("EmpresaRealizadoraFeira.CEP", realizadora.CEP._text);
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
                  handleChange={handleChange("bairroRealizadora")}
                  value={values.EmpresaRealizadoraFeira.Bairro}
                  label="Bairro"
                  name="bairroRealizadora"
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
                  value={values.EmpresaRealizadoraFeira.Cidade}
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
                  handleChange={handleChange("EmpresaRealizadoraFeira.Telefone")}
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
            <Cabecalho title="Empresa Organizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("empresaOrganizadora")}
                  value={values.EmpresaOrganizadoraFeira.Nome}
                  label="Nome"
                  name="empresaOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <SearchClientInput
                  loading={bucandoCliente}
                  handleChange={handleChange("docOrganizadora")}
                  onSearch={async (clientDoc) => {
                    if (clientDoc.length === 14) {
                      setBuscandoCliente(true);
                      const organizadora = await buscarCliente(clientDoc);
                      setBuscandoCliente(false);
                      if (organizadora) {
                        setFieldValue(
                          "idEmpresaOrganizadora",
                          organizadora["_attributes"]["key"]
                        );
                        setFieldValue(
                          "empresaOrganizadora",
                          organizadora.Nome._text
                        );
                        setFieldValue(
                          "contatoRepresentanteOrganizadora",
                          organizadora.Telefone._text
                            .replace(" ", "")
                            .replace("-", "")
                            .replace("(", "")
                            .replace(")", "")
                        );
                        if (organizadora.Email._text)
                          setFieldValue(
                            "emailRepresentanteOrganizadora",
                            organizadora.Email._text
                          );
                        setFieldValue(
                          "enderecoOrganizadora",
                          organizadora.Rua._text
                        );
                        setFieldValue(
                          "bairroOrganizadora",
                          organizadora.Bairro._text
                        );
                        setFieldValue(
                          "cidadeOrganizadora",
                          organizadora.Cidade._text
                        );
                        setFieldValue("ufOrganizadora", organizadora.UF._text);
                        setFieldValue(
                          "cepOrganizadora",
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
                  name="docOrganizadora"
                  value={values.docOrganizadora}
                  maxLength={14}
                  showCount
                />
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("enderecoOrganizadora")}
                  value={values.enderecoOrganizadora}
                  label="Endereço"
                  name="enderecoOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("bairroOrganizadora")}
                  value={values.bairroOrganizadora}
                  label="Bairro"
                  name="bairroOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cidadeOrganizadora")}
                  value={values.cidadeOrganizadora}
                  label="Cidade"
                  name="cidadeOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("ufOrganizadora")}
                  value={values.ufOrganizadora}
                  label="UF"
                  name="ufOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cepOrganizadora")}
                  value={values.cepOrganizadora}
                  label="CEP"
                  name="cepOrganizadora"
                  type="text"
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("representanteOrganizadora")}
                  value={values.representanteOrganizadora}
                  label="Representante Legal"
                  name="representanteOrganizadora"
                  type="text"
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("cpfRepresentanteOrganizadora")}
                  value={values.cpfRepresentanteOrganizadora}
                  label="CPF"
                  name="cpfRepresentanteOrganizadora"
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
                    "contatoRepresentanteOrganizadora"
                  )}
                  value={values.contatoRepresentanteOrganizadora}
                  label="Telefone"
                  name="contatoRepresentanteOrganizadora"
                  type="text"
                  required
                  onlyNumbersInput
                  placeholder="27999999999"
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("emailRepresentanteOrganizadora")}
                  value={values.emailRepresentanteOrganizadora}
                  label="Email"
                  name="emailRepresentanteOrganizadora"
                  type="email"
                  required
                />
              </Col>
            </Row>
            <Cabecalho title="3. Empresas Apoiadoras:" size={4} />
            <TextAreaInput
              handleChange={handleChange("empresasApoiadoras")}
              value={values.empresasApoiadoras}
              name="empresasApoiadoras"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <Cabecalho title="4. Descritivo do Evento / Objetivo:" size={4} />
            <TextAreaInput
              handleChange={handleChange("descritivoEvento")}
              value={values.descritivoEvento}
              name="descritivoEvento"
              type="textarea"
              antdComponent={TextArea}
              required
              placeholder="Acima de 1500 caracteres"
              maxLength={4000}
              showCount
            />
            <TextInput
              handleChange={handleChange("expectativaPubExpositor")}
              value={values.expectativaPubExpositor}
              label="Expectativa de Público Expositor"
              name="expectativaPubExpositor"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("expectativaPubVisitante")}
              value={values.expectativaPubVisitante}
              label="Expectativa de Público Visitante"
              name="expectativaPubVisitante"
              type="text"
              required
            />
            <Cabecalho title="5. Dados das Últimas 03 edições:" size={4} />
            <TextAreaInput
              handleChange={handleChange("dadosUltimasEdicoes")}
              value={values.dadosUltimasEdicoes}
              name="dadosUltimasEdicoes"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho title="6. Plano de Comunicação do Evento:" size={4} />
            <TextAreaInput
              handleChange={handleChange("planoComunicacaoEvento")}
              value={values.planoComunicacaoEvento}
              name="planoComunicacaoEvento"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho title="7. Objeto da Proposta e Valores:" size={4} />
            <TextInput
              handleChange={handleChange("valorLocacaoLivre")}
              value={values.valorLocacaoLivre}
              label="Valor de Locação da Área Livre (R$/m²)"
              name="valorLocacaoLivre"
              type="text"
              onlyNumbersInput
              required
            />
            <TextInput
              handleChange={handleChange("valorLocacaoMontada")}
              value={values.valorLocacaoMontada}
              label="Valor de Locação da Área Montada (Área com estande montado)
              (R$/m²)"
              name="valorLocacaoMontada"
              onlyNumbersInput
              type="text"
              required
            />
            <TextAreaInput
              handleChange={handleChange("descritivoEstruturaMontagem")}
              value={values.descritivoEstruturaMontagem}
              label="Descritivo da Estrutura de montagem e insumos de locação da área
              montada"
              name="descritivoEstruturaMontagem"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <TextInput
              handleChange={handleChange("txsAdicionais")}
              value={values.txsAdicionais}
              label="Taxas Adicionais"
              name="txsAdicionais"
              type="text"
              required
            />
            <TextInput
              handleChange={handleChange("outrosBeneficios")}
              value={values.outrosBeneficios}
              label="Outros benefícios"
              name="outrosBeneficios"
              type="text"
              required
            />
            <Cabecalho title="8. Informações Adicionais:" size={4} />
            <TextAreaInput
              handleChange={handleChange("infoAdicional")}
              value={values.infoAdicional}
              name="infoAdicional"
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
                  setFieldValue("plantaBaixa", "");
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("plantaBaixa", value.name);
              }}
              label="Planta Baixa"
              name="plantaBaixa"
              id="plantaBaixa"
              required
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="comprovanteExclusividadeRegistroINPI"
              label="Comprovante de Exclusividade / Registro INPI"
              name="comprovanteExclusividadeRegistroINPI"
              required
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("comprovanteExclusividadeRegistroINPI", "");
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue(
                  "comprovanteExclusividadeRegistroINPI",
                  value.name
                );
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="contratoLocacao"
              label="Contrato de Locação de espaço"
              name="contratoLocacao"
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("contratoLocacao", "");
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("contratoLocacao", value.name);
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              id="manualExpositor"
              label="Manual do Expositor ou Regras para Exposição"
              name="manualExpositor"
              onChange={(value: any) => {
                if (value.status === "removed") {
                  setFieldValue("manualExpositor", "");
                  setListFiles((ps) => ps.filter((val) => val.name !== value));
                  return;
                }
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
                setFieldValue("manualExpositor", value.name);
              }}
            />
            <Row style={{ margin: "1em", padding: "1em" }}>
              <ModalTermos />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "40%" }}
              >
                {/* {isSubmitting ? <Spin /> : "Enviar"} */}
                TESTE
              </Button>
              {/* <Button
                type="primary"
                disabled={!termo || isSubmitting}
                title={
                  !termo ? "É Necessário aceitar os termos contratuais!" : ""
                }
                htmlType="submit"
                style={{ width: "40%" }}
              >
                {isSubmitting ? <Spin /> : "Enviar"}
              </Button> */}
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormFeira;
