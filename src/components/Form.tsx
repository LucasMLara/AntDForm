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
import FormInput from "./FormInput";
import {
  FeirasSchema,
  INITIAL_VALUES,
} from "@/utils/validations/FormValidation";
import LogoTipo from "@/components/Image";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LogoSebrae from "../../public/SebraeLogo.svg";
import { useContext } from "react";
import { FormContext } from "@/utils/validations/FormContext";

const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

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
            <FormInput
              label="Nome da Feira"
              placeholder="Insira o nome do seu evento"
              name="nomeDaFeira"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Local"
              placeholder="Insira o local do seu evento"
              name="localDaFeira"
              type="text"
              antdComponent={Input}
              required
            />
            <Cabecalho title="Período de Realização" size={5} />
            <Row>
              <Col>
                <Field
                  id="FALTA POR NOME"
                  locale={locale}
                  defaultValue={[defaultEndDate, null]}
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  as={RangePicker}
                  onChange={(e: any) => console.log(e)}
                  size="large"
                  name="FALTA POR NOME"
                  type="date"
                />
                <ErrorMessage name="FALTA POR NOME" component={ErrComponent} />
              </Col>
            </Row>
            <FormInput
              label="Horário de Funcionamento"
              placeholder="Qual o horário do funcionamento?"
              name="horarioFuncionamento"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Valor da entrada dos visitantes"
              placeholder="Quanto vai custar o ingresso?"
              name="valorEntradaVisitantes"
              type="text"
              antdComponent={Input}
              required
            />
            <Cabecalho title="2. PRINCIPAIS INSTITUIÇÕES ENVOLVIDAS" size={5} />
            <Cabecalho title="Empresa Realizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Nome"
                  placeholder="Quanto vai custar o ingresso?"
                  name="empresaRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="CNPJ"
                  placeholder="Insira somente números"
                  name="docRealizadora"
                  showCount
                  maxLength={14}
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
            </Row>
            <FormInput
              label="Endereço"
              placeholder="Av...Rua... nº"
              name="enderecoRealizadora"
              type="text"
              antdComponent={Input}
              required
            />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <FormInput
                  label="Cidade"
                  name="cidadeRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <FormInput
                  label="UF"
                  name="ufRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <FormInput
                  label="CEP"
                  name="cepRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={8}
                  showCount
                  placeholder="Insira somente números"
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Representante Legal"
                  name="representanteRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="CPF"
                  name="cpfRepresentanteRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={11}
                  showCount
                  placeholder="Insira somente números"
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Telefone"
                  name="contatoRepresentanteRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={11}
                  placeholder="Insira somente números"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="Email"
                  name="emailRepresentanteRealizadora"
                  type="email"
                  antdComponent={Input}
                  required
                />
              </Col>
            </Row>
            <Cabecalho title="Empresa Organizadora" size={5} />
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Nome"
                  name="empresaOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="CNPJ"
                  name="docOrganizadora"
                  type="text"
                  antdComponent={Input}
                  maxLength={14}
                  showCount
                  required
                  placeholder="Insira somente números"
                />
              </Col>
            </Row>
            <FormInput
              label="Endereço"
              placeholder="Av...Rua... nº"
              name="enderecoOrganizadora"
              type="text"
              antdComponent={Input}
              required
            />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <FormInput
                  label="Cidade"
                  name="cidadeOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <FormInput
                  label="UF"
                  name="ufOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <FormInput
                  label="CEP"
                  name="cepOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={8}
                  showCount
                  placeholder="Insira somente números"
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Representante Legal"
                  name="representanteOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="CPF"
                  name="cpfRepresentanteOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={11}
                  showCount
                  placeholder="Insira somente números"
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <FormInput
                  label="Telefone"
                  name="contatoRepresentanteOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={11}
                  placeholder="Insira somente números"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  label="Email"
                  name="emailRepresentanteOrganizadora"
                  type="email"
                  antdComponent={Input}
                  required
                />
              </Col>
            </Row>
            <Cabecalho title="3. Empresas Apoiadoras:" size={4} />
            <FormInput
              name="empresasApoiadoras"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <Cabecalho title="4. Descritivo do Evento / Objetivo:" size={4} />
            <FormInput
              name="descritivoEvento"
              type="textarea"
              antdComponent={TextArea}
              required
              placeholder="Acima de 1500 caracteres"
              maxLength={4000}
              showCount
            />
            <FormInput
              label="Expectativa de Público Expositor"
              name="expectativaPubExpositor"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Expectativa de Público Visitante"
              name="expectativaPubVisitante"
              type="text"
              antdComponent={Input}
              required
            />
            <Cabecalho title="5. Dados das Últimas 03 edições:" size={4} />
            <FormInput
              name="dadosUltimasEdicoes"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho title="6. Plano de Comunicação do Evento:" size={4} />
            <FormInput
              name="planoComunicacaoEvento"
              type="textarea"
              antdComponent={TextArea}
              required
              showCount
            />
            <Cabecalho title="7. Objeto da Proposta e Valores:" size={4} />
            <FormInput
              label="Valor de Locação da Área Livre (R$/m²)"
              name="valorLocacaoLivre"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Valor de Locação da Área Montada (Área com estande montado)
              (R$/m²)"
              name="valorLocacaoMontada"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Descritivo da Estrutura de montagem e insumos de locação da área
              montada"
              name="descritivoEstruturaMontagem"
              type="textarea"
              antdComponent={TextArea}
              required
            />
            <FormInput
              label="Taxas Adicionais"
              name="txsAdicionais"
              type="text"
              antdComponent={Input}
              required
            />
            <FormInput
              label="Outros benefícios"
              name="outrosBeneficios"
              type="text"
              antdComponent={Input}
              required
            />
            <Cabecalho title="8. Informações Adicionais:" size={4} />
            <FormInput
              name="infoAdicional"
              type="textarea"
              antdComponent={TextArea}
              required
            />
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
