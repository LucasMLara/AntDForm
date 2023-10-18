"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ModalTermos from "../components/ModalTermos";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import "dayjs/locale/zh-cn";
import { UploadOutlined } from "@ant-design/icons";
import {
  Input,
  Col,
  Row,
  Button,
  DatePicker,
  Typography,
  Upload,
  message,
  UploadProps,
} from "antd";
import styles from "../app/styles.module.css";
import Header from "@/components/Header";
import {
  FeirasSchema,
  INITIAL_VALUES,
} from "@/utils/validations/FormValidation";
const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import LogoTipo from "@/components/Image";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import type { RangePickerProps } from 'antd/es/date-picker';
import LogoSebrae from "../../public/SebraeLogo.svg";
import { useContext } from "react";

import { FormContext } from "@/utils/validations/FormContext";

dayjs.extend(customParseFormat);

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} - Arquivo carregado com Sucesso`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} - Carregamento de arquivo inválido!.`);
    }
  },
};

const ErrComponent = () => <span className={styles.error}></span>;
type Sizes = 1 | 2 | 3 | 4 | 5;
const Cabecalho = ({ title, size }: { title: string; size?: Sizes }) => (
  <Title level={size} style={{ marginTop: "0.5em" }} type="secondary">
    {title}
  </Title>
);

import type { RangePickerProps } from "antd/es/date-picker";

const FormFeira = () => {
  const { termo } = useContext(FormContext);
  const defaultEndDate = dayjs().add(90, "day");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < defaultEndDate;
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={250} height={250} />
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FeirasSchema}
        onSubmit={(values) => {
          console.log("submit");
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {() => (
          <Form className={styles.formWrapper}>
            <Cabecalho title="1. DADOS GERAIS" size={4} />
            <label className={styles.label} htmlFor="nomeDaFeira">
              Nome da Feira:{" "}
            </label>
            <Field
              id="nomeDaFeira"
              as={Input}
              size="large"
              name="nomeDaFeira"
              placeholder="Insira o nome do seu evento"
              type="text"
            />
            <ErrorMessage name="nomeDaFeira" component={ErrComponent} />
            <label className={styles.label} htmlFor="localDaFeira">
              Local:{" "}
            </label>
            <Field
              id="localDaFeira"
              as={Input}
              size="large"
              name="localDaFeira"
              placeholder="Insira o local do seu evento"
              type="text"
            />
            <ErrorMessage name="localDaFeira" component={ErrComponent} />
            <Cabecalho title="Período de Realização" size={5} />
            <Row gutter={15}>
              <Col md={12} xs={24}>
                <Field
                  id="FALTA POR NOME"
                  locale={locale}
                  defaultValue={[defaultEndDate, null]}
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  as={RangePicker}
                  size="large"
                  name="FALTA POR NOME"
                  type="date"
                />
                <ErrorMessage name="FALTA POR NOME" component={ErrComponent} />
              </Col>
            </Row>
            <label className={styles.label} htmlFor="horarioFuncionamento">
              Horário de Funcionamento:{" "}
            </label>
            <Field
              id="horarioFuncionamento"
              as={Input}
              size="large"
              name="horarioFuncionamento"
              placeholder="Qual o horário do funcionamento?"
              type="text"
            />
            <ErrorMessage
              name="horarioFuncionamento"
              component={ErrComponent}
            />
            <label className={styles.label} htmlFor="valorEntradaVisitantes">
              Valor da entrada dos visitantes:{" "}
            </label>
            <Field
              id="valorEntradaVisitantes"
              as={Input}
              size="large"
              name="valorEntradaVisitantes"
              placeholder="Quanto vai custar o ingresso?"
              type="text"
            />
            <ErrorMessage
              name="valorEntradaVisitantes"
              component={ErrComponent}
            />
            <Cabecalho title="2. PRINCIPAIS INSTITUIÇÕES ENVOLVIDAS" size={5} />
            <Cabecalho title="Empresa Realizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="empresaRealizadora">
                  Nome:{" "}
                </label>
                <Field
                  id="empresaRealizadora"
                  as={Input}
                  size="large"
                  name="empresaRealizadora"
                  placeholder="Quanto vai custar o ingresso?"
                  type="text"
                />
                <ErrorMessage
                  name="empresaRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="docRealizadora">
                  CNPJ:{" "}
                </label>
                <Field
                  id="docRealizadora"
                  as={Input}
                  size="large"
                  name="docRealizadora"
                  maxLength={14}
                  placeholder="00000000000000"
                  type="text"
                />
                <ErrorMessage name="docRealizadora" component={ErrComponent} />
              </Col>
            </Row>
            <label className={styles.label} htmlFor="enderecoRealizadora">
              Endereço:{" "}
            </label>
            <Field
              id="enderecoRealizadora"
              as={Input}
              size="large"
              name="enderecoRealizadora"
              placeholder="Av...Rua... nº"
              type="text"
            />
            <ErrorMessage name="enderecoRealizadora" component={ErrComponent} />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cidadeRealizadora">
                  Cidade:{" "}
                </label>
                <Field
                  id="cidadeRealizadora"
                  as={Input}
                  size="large"
                  name="cidadeRealizadora"
                  type="text"
                />
                <ErrorMessage
                  name="cidadeRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="ufRealizadora">
                  UF:{" "}
                </label>
                <Field
                  id="ufRealizadora"
                  as={Input}
                  size="large"
                  name="ufRealizadora"
                  type="text"
                />
                <ErrorMessage name="ufRealizadora" component={ErrComponent} />
              </Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cepRealizadora">
                  CEP:{" "}
                </label>
                <Field
                  id="cepRealizadora"
                  as={Input}
                  size="large"
                  name="cepRealizadora"
                  maxLength={8}
                  placeholder="00000000"
                  type="text"
                />
                <ErrorMessage name="cepRealizadora" component={ErrComponent} />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="representanteRealizadora"
                >
                  Representante Legal:{" "}
                </label>
                <Field
                  id="representanteRealizadora"
                  as={Input}
                  size="large"
                  name="representanteRealizadora"
                  type="text"
                />
                <ErrorMessage
                  name="representanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="cpfRepresentanteRealizadora"
                >
                  CPF:{" "}
                </label>
                <Field
                  id="cpfRepresentanteRealizadora"
                  as={Input}
                  size="large"
                  name="cpfRepresentanteRealizadora"
                  maxLength={11}
                  placeholder="00000000000"
                  type="text"
                />
                <ErrorMessage
                  name="cpfRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="contatoRepresentanteRealizadora"
                >
                  Telefone:{" "}
                </label>
                <Field
                  id="contatoRepresentanteRealizadora"
                  as={Input}
                  size="large"
                  maxLength={11}
                  name="contatoRepresentanteRealizadora"
                  placeholder="27999999999"
                  type="text"
                />
                <ErrorMessage
                  name="contatoRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="emailRepresentanteRealizadora"
                >
                  Email:{" "}
                </label>
                <Field
                  id="emailRepresentanteRealizadora"
                  as={Input}
                  size="large"
                  name="emailRepresentanteRealizadora"
                  placeholder="Email do representante legal"
                  type="text"
                />
                <ErrorMessage
                  name="emailRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Cabecalho title="Empresa Organizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="empresaOrganizadora">
                  Nome:{" "}
                </label>
                <Field
                  id="empresaOrganizadora"
                  as={Input}
                  size="large"
                  name="empresaOrganizadora"
                  placeholder="Quanto vai custar o ingresso?"
                  type="text"
                />
                <ErrorMessage
                  name="empresaOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="docOrganizadora">
                  CNPJ:{" "}
                </label>
                <Field
                  id="docOrganizadora"
                  as={Input}
                  size="large"
                  name="docOrganizadora"
                  maxLength={14}
                  placeholder="00000000000000"
                  type="text"
                />
                <ErrorMessage name="docOrganizadora" component={ErrComponent} />
              </Col>
            </Row>
            <label className={styles.label} htmlFor="enderecoOrganizadora">
              Endereço:{" "}
            </label>
            <Field
              id="enderecoOrganizadora"
              as={Input}
              size="large"
              name="enderecoOrganizadora"
              placeholder="Av...Rua... nº"
              type="text"
            />
            <ErrorMessage
              name="enderecoOrganizadora"
              component={ErrComponent}
            />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cidadeOrganizadora">
                  Cidade:{" "}
                </label>
                <Field
                  id="cidadeOrganizadora"
                  as={Input}
                  size="large"
                  name="cidadeOrganizadora"
                  type="text"
                />
                <ErrorMessage
                  name="cidadeOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="ufOrganizadora">
                  UF:{" "}
                </label>
                <Field
                  id="ufOrganizadora"
                  as={Input}
                  size="large"
                  name="ufOrganizadora"
                  type="text"
                />
                <ErrorMessage name="ufOrganizadora" component={ErrComponent} />
              </Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cepOrganizadora">
                  CEP:{" "}
                </label>
                <Field
                  id="cepOrganizadora"
                  as={Input}
                  size="large"
                  name="cepOrganizadora"
                  maxLength={8}
                  placeholder="00000000"
                  type="text"
                />
                <ErrorMessage name="cepOrganizadora" component={ErrComponent} />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="representanteOrganizadora"
                >
                  Representante Legal:{" "}
                </label>
                <Field
                  id="representanteOrganizadora"
                  as={Input}
                  size="large"
                  name="representanteOrganizadora"
                  type="text"
                />
                <ErrorMessage
                  name="representanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="cpfRepresentanteOrganizadora"
                >
                  CPF:{" "}
                </label>
                <Field
                  id="cpfRepresentanteOrganizadora"
                  as={Input}
                  size="large"
                  name="cpfRepresentanteOrganizadora"
                  maxLength={11}
                  placeholder="00000000000"
                  type="text"
                />
                <ErrorMessage
                  name="cpfRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="contatoRepresentanteOrganizadora"
                >
                  Telefone:{" "}
                </label>
                <Field
                  id="contatoRepresentanteOrganizadora"
                  as={Input}
                  size="large"
                  maxLength={11}
                  name="contatoRepresentanteOrganizadora"
                  placeholder="27999999999"
                  type="text"
                />
                <ErrorMessage
                  name="contatoRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label
                  className={styles.label}
                  htmlFor="emailRepresentanteOrganizadora"
                >
                  Email:{" "}
                </label>
                <Field
                  id="emailRepresentanteOrganizadora"
                  as={Input}
                  size="large"
                  name="emailRepresentanteOrganizadora"
                  placeholder="Email do representante legal"
                  type="text"
                />
                <ErrorMessage
                  name="emailRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Cabecalho title="3. Empresas Apoiadoras:" size={4} />
            <Field
              id="empresasApoiadoras"
              as={TextArea}
              size="large"
              name="empresasApoiadoras"
              type="text"
            />
            <ErrorMessage name="empresasApoiadoras" component={ErrComponent} />
            <Cabecalho title="4. Descritivo do Evento / Objetivo:" size={4} />
            <Field
              id="descritivoEvento"
              as={TextArea}
              size="large"
              name="descritivoEvento"
              placeholder="Acima de 1500 caracteres"
              type="text"
            />
            <ErrorMessage name="descritivoEvento" component={ErrComponent} />
            <label className={styles.label} htmlFor="expectativaPubExpositor">
              Expectativa de Público Expositor:{" "}
            </label>
            <Field
              id="expectativaPubExpositor"
              as={Input}
              size="large"
              name="expectativaPubExpositor"
              type="text"
            />
            <ErrorMessage
              name="expectativaPubExpositor"
              component={ErrComponent}
            />
            <label className={styles.label} htmlFor="expectativaPubVisitante">
              Expectativa de Público Visitante:{" "}
            </label>
            <Field
              id="expectativaPubVisitante"
              as={Input}
              size="large"
              name="expectativaPubVisitante"
              type="text"
            />
            <ErrorMessage
              name="expectativaPubVisitante"
              component={ErrComponent}
            />
            <Cabecalho title="5. Dados das Últimas 03 edições:" size={4} />
            <Field
              id="dadosUltimasEdicoes"
              as={TextArea}
              size="large"
              name="dadosUltimasEdicoes"
              type="text"
            />
            <ErrorMessage name="dadosUltimasEdicoes" component={ErrComponent} />
            <Cabecalho title="6. Plano de Comunicação do Evento:" size={4} />
            <Field
              id="planoComunicacaoEvento"
              as={TextArea}
              size="large"
              name="planoComunicacaoEvento"
              type="text"
            />
            <ErrorMessage
              name="planoComunicacaoEvento"
              component={ErrComponent}
            />
            <Cabecalho title="7. Objeto da Proposta e Valores:" size={4} />
            <label className={styles.label} htmlFor="valorLocacaoLivre">
              Valor de Locação da Área Livre (R$/m²):{" "}
            </label>
            <Field
              id="valorLocacaoLivre"
              as={Input}
              size="large"
              name="valorLocacaoLivre"
              placeholder="R$ 100.000,00"
              type="text"
            />
            <ErrorMessage name="valorLocacaoLivre" component={ErrComponent} />
            <label className={styles.label} htmlFor="valorLocacaoMontada">
              Valor de Locação da Área Montada (Área com estande montado)
              (R$/m²):{" "}
            </label>
            <Field
              id="valorLocacaoMontada"
              as={Input}
              size="large"
              name="valorLocacaoMontada"
              type="text"
              placeholder="R$ 100.000,00"
            />
            <ErrorMessage name="valorLocacaoMontada" component={ErrComponent} />
            <label
              className={styles.label}
              htmlFor="descritivoEstruturaMontagem"
            >
              Descritivo da Estrutura de montagem e insumos de locação da área
              montada:{" "}
            </label>
            <Field
              id="descritivoEstruturaMontagem"
              as={TextArea}
              size="large"
              name="descritivoEstruturaMontagem"
              type="text"
            />
            <ErrorMessage
              name="descritivoEstruturaMontagem"
              component={ErrComponent}
            />
            <label className={styles.label} htmlFor="txsAdicionais">
              Taxas Adicionais:{" "}
            </label>
            <Field
              id="txsAdicionais"
              as={Input}
              size="large"
              name="txsAdicionais"
              type="text"
            />
            <ErrorMessage name="txsAdicionais" component={ErrComponent} />
            <label className={styles.label} htmlFor="outrosBeneficios">
              Outros benefícios:{" "}
            </label>
            <Field
              id="outrosBeneficios"
              as={Input}
              size="large"
              name="outrosBeneficios"
              type="text"
            />
            <ErrorMessage name="outrosBeneficios" component={ErrComponent} />

            <Cabecalho title="8. Informações Adicionais:" size={4} />
            <Field
              id="infoAdicional"
              as={TextArea}
              size="large"
              name="infoAdicional"
              type="text"
            />
            <ErrorMessage name="infoAdicional" component={ErrComponent} />
            <Cabecalho title="9. Anexos:" size={4} />
            <label className={styles.label}>Planta Baixa: </label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} />
            </Upload>
            <label className={styles.label}>
              Comprovante de Exclusividade / Registro INPI:{" "}
            </label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} />
            </Upload>
            <label className={styles.label}>
              Contrato de Locação de espaço:{" "}
            </label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} />
            </Upload>
            <label className={styles.label}>
              Manual do Exposito ou Regras para Exposição:{" "}
            </label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} />
            </Upload>
            <Row style={{ margin: "1em", padding: "1em" }}>
              <ModalTermos />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button
                type="primary"
                disabled={!termo}
                title={
                  !termo ? "É Necessário aceitar os termos contratuais!" : ""
                }
                htmlType="submit"
                style={{ width: "40%" }}
              >
                Enviar
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormFeira;
