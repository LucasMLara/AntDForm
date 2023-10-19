"use client";
import { Formik, Form, ErrorMessage } from "formik";
import ModalTermos from "../components/ModalTermos";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import "dayjs/locale/zh-cn";
import { Input, Col, Row, Button, DatePicker, Typography, Spin } from "antd";
import styles from "../app/styles.module.css";
import Header from "@/components/Header";
import {
  FeirasSchema,
  INITIAL_VALUES,
} from "@/utils/validations/FormValidation";
import LogoTipo from "@/components/Image";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LogoSebrae from "../../public/SebraeLogo.svg";
import { useContext, useState } from "react";
import { FormContext } from "@/utils/validations/FormContext";
import type { RangePickerProps } from "antd/es/date-picker";
import UploadInput from "./UploadInput";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import Paragraph from "antd/es/typography/Paragraph";
const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

type Sizes = 1 | 2 | 3 | 4 | 5;
const Cabecalho = ({ title, size }: { title: string; size?: Sizes }) => (
  <Title level={size} style={{ marginTop: "0.5em" }} type="secondary">
    {title}
  </Title>
);

const FormFeira = () => {
  const [listFiles, setListFiles] = useState<Array<File>>([]);

  const { termo } = useContext(FormContext);
  const defaultEndDate = dayjs().add(90, "day");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < defaultEndDate;
  };

  const enviarForm = async (data: any) => {
    // api.post("yrk", {
    //   nome: data.nomeEvento,
    //   plantaBaixa: listformdata.filter onde eu vou buscar o nome do arquivo e o status é diuferente de error
    // })
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
        onSubmit={(values, { setSubmitting }) => {
          enviarForm(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          handleChange,
        }) => (
          <Form className={styles.formWrapper} onSubmit={handleSubmit}>
            <Cabecalho title="1. DADOS GERAIS" size={4} />
            <TextInput
              handleChange={handleChange("nomeDaFeira")}
              value={values.nomeDaFeira}
              label="Nome da Feira"
              placeholder="Insira o nome do seu evento"
              name="nomeDaFeira"
              type="text"
              antdComponent={Input}
              required
            />
            <TextInput
              handleChange={handleChange("localDaFeira")}
              value={values.localDaFeira}
              label="Local"
              placeholder="Insira o local do seu evento"
              name="localDaFeira"
              type="text"
              antdComponent={Input}
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
              </Col>
            </Row>
            <TextInput
              handleChange={handleChange("horarioFuncionamento")}
              value={values.horarioFuncionamento}
              label="Horário de Funcionamento"
              placeholder="Qual o horário do funcionamento?"
              name="horarioFuncionamento"
              type="text"
              antdComponent={Input}
              required
            />
            <TextInput
              handleChange={handleChange("valorEntradaVisitantes")}
              value={values.valorEntradaVisitantes}
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
                <TextInput
                  handleChange={handleChange("empresaRealizadora")}
                  value={values.empresaRealizadora}
                  label="Nome"
                  placeholder="Quanto vai custar o ingresso?"
                  name="empresaRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("docRealizadora")}
                  value={values.docRealizadora}
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
            <TextInput
              handleChange={handleChange("enderecoRealizadora")}
              value={values.enderecoRealizadora}
              label="Endereço"
              placeholder="Av...Rua... nº"
              name="enderecoRealizadora"
              type="text"
              antdComponent={Input}
              required
            />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cidadeRealizadora")}
                  value={values.cidadeRealizadora}
                  label="Cidade"
                  name="cidadeRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("ufRealizadora")}
                  value={values.ufRealizadora}
                  label="UF"
                  name="ufRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cepRealizadora")}
                  value={values.cepRealizadora}
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
                <TextInput
                  handleChange={handleChange("representanteRealizadora")}
                  value={values.representanteRealizadora}
                  label="Representante Legal"
                  name="representanteRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("cpfRepresentanteRealizadora")}
                  value={values.cpfRepresentanteRealizadora}
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
                <TextInput
                  handleChange={handleChange("contatoRepresentanteRealizadora")}
                  value={values.contatoRepresentanteRealizadora}
                  label="Telefone"
                  name="contatoRepresentanteRealizadora"
                  type="text"
                  antdComponent={Input}
                  required
                  maxLength={11}
                  showCount
                  placeholder="Insira somente números: Ex: 27999999999"
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("emailRepresentanteRealizadora")}
                  value={values.emailRepresentanteRealizadora}
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
                <TextInput
                  handleChange={handleChange("empresaOrganizadora")}
                  value={values.empresaOrganizadora}
                  label="Nome"
                  name="empresaOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("docOrganizadora")}
                  value={values.docOrganizadora}
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
            <TextInput
              handleChange={handleChange("enderecoOrganizadora")}
              value={values.enderecoOrganizadora}
              label="Endereço"
              placeholder="Av...Rua... nº"
              name="enderecoOrganizadora"
              type="text"
              antdComponent={Input}
              required
            />
            <Row gutter={25}>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cidadeOrganizadora")}
                  value={values.cidadeOrganizadora}
                  label="Cidade"
                  name="cidadeOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("ufOrganizadora")}
                  value={values.ufOrganizadora}
                  label="UF"
                  name="ufOrganizadora"
                  type="text"
                  antdComponent={Input}
                  required
                />
              </Col>
              <Col xs={24} md={8}>
                <TextInput
                  handleChange={handleChange("cepOrganizadora")}
                  value={values.cepOrganizadora}
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
                <TextInput
                  handleChange={handleChange("representanteOrganizadora")}
                  value={values.representanteOrganizadora}
                  label="Representante Legal"
                  name="representanteOrganizadora"
                  type="text"
                  antdComponent={Input}
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
                <TextInput
                  handleChange={handleChange(
                    "contatoRepresentanteOrganizadora"
                  )}
                  value={values.contatoRepresentanteOrganizadora}
                  label="Telefone"
                  name="contatoRepresentanteOrganizadora"
                  type="text"
                  showCount
                  antdComponent={Input}
                  required
                  maxLength={11}
                  placeholder="Insira somente números: Ex: 27999999999"
                />
              </Col>
              <Col xs={24} md={12}>
                <TextInput
                  handleChange={handleChange("emailRepresentanteOrganizadora")}
                  value={values.emailRepresentanteOrganizadora}
                  label="Email"
                  name="emailRepresentanteOrganizadora"
                  type="email"
                  antdComponent={Input}
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
              antdComponent={Input}
              required
            />
            <TextInput
              handleChange={handleChange("expectativaPubVisitante")}
              value={values.expectativaPubVisitante}
              label="Expectativa de Público Visitante"
              name="expectativaPubVisitante"
              type="text"
              antdComponent={Input}
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
              antdComponent={Input}
              required
            />
            <TextInput
              handleChange={handleChange("valorLocacaoMontada")}
              value={values.valorLocacaoMontada}
              label="Valor de Locação da Área Montada (Área com estande montado)
              (R$/m²)"
              name="valorLocacaoMontada"
              type="text"
              antdComponent={Input}
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
              antdComponent={Input}
              required
            />
            <TextInput
              handleChange={handleChange("outrosBeneficios")}
              value={values.outrosBeneficios}
              label="Outros benefícios"
              name="outrosBeneficios"
              type="text"
              antdComponent={Input}
              required
            />
            <Cabecalho title="8. Informações Adicionais:" size={4} />
            <TextInput
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
                console.log(value);
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              label="Planta Baixa"
              name="plantaBaixa"
              required
              onChange={(value) => {
                console.log("VALUE NO FORM", value);
                setFieldValue("plantaBaixa", value.name);
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              label="Comprovante de Exclusividade / Registro INPI"
              name="comprovanteExclusividadeRegistroINPI"
              required
              onChange={(value) => {
                setFieldValue(
                  "comprovanteExclusividadeRegistroINPI",
                  value.name
                );
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              label="Contrato de Locação de espaço"
              name="contratoLocacao"
              onChange={(value) => {
                setFieldValue("contratoLocacao", value.name);
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
              }}
            />
            <UploadInput
              onRemove={(value) => {
                setListFiles((ps) => ps.filter((val) => val.name !== value));
              }}
              label="Manual do Exposito ou Regras para Exposição"
              name="manualExpositor"
              onChange={(value) => {
                setFieldValue("manualExpositor", value.name);
                setListFiles((ps) =>
                  ps.length > 0 ? [...ps, value] : [value]
                );
              }}
            />
            <Row style={{ margin: "1em", padding: "1em" }}>
              <ModalTermos />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button
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
    </>
  );
};

export default FormFeira;
