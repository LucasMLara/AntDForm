"use client";


import { Formik, Field, Form, ErrorMessage } from "formik";
import ModalTermos from "../components/ModalTermos";

import {Input, Col, Row, Button, DatePicker, Typography } from "antd";
import styles from "./styles.module.css"
import Header from "@/components/Header";
import { FeirasSchema, INITIAL_VALUES } from "@/utils/validations/FormValidation";
const { Title, Text } = Typography;
//TODO criar css modules para os erros do errormsg do formik e para para aplicar o padding das colunas do grid do formulário e aplicar a validação do joy, fazer context para o termo de aceite no modal

const ErrComponent = () => <span className={styles.error}></span>
const FormFeira = () => {
type Sizes = 1 | 2 | 3 | 4 |5;
const Cabecalho = ({title, size} : {title: string, size?: Sizes }) => <Title level={size}   style={{marginTop: "0.5em"}} type="secondary">{title}</Title>


  return (
    <div>
      <Header />
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
            <Cabecalho title="1. DADOS GERAIS" size={4}/>
            <label className={styles.label} htmlFor="nomeDaFeira">Nome da Feira: </label>
              <Field id="nomeDaFeira" as={Input}size="large" name="nomeDaFeira" placeholder="Insira o nome do seu evento" type="text" />
              <ErrorMessage
                name="nomeDaFeira"
                component={ErrComponent}
              />
              <label className={styles.label} htmlFor="localDaFeira">Local: </label>
                <Field id="localDaFeira" as={Input}size="large" name="localDaFeira" placeholder="Insira o local do seu evento" type="text" />
                <ErrorMessage
                  name="localDaFeira"
                  component={ErrComponent}
                />
              <label className={styles.label} htmlFor="horarioFuncionamento">Horário de Funcionamento: </label>
                <Field id="horarioFuncionamento" as={Input}size="large" name="horarioFuncionamento" placeholder="Qual o horário do funcionamento?" type="text" />
                <ErrorMessage
                  name="horarioFuncionamento"
                  component={ErrComponent}
                />
              <label className={styles.label} htmlFor="valorEntradaVisitantes">Valor da entrada dos visitantes: </label>
                <Field id="valorEntradaVisitantes" as={Input}size="large" name="valorEntradaVisitantes" placeholder="Quanto vai custar o ingresso?" type="text" />
                <ErrorMessage
                  name="valorEntradaVisitantes"
                  component={ErrComponent}
                />
            <Cabecalho title="2. PRINCIPAIS INSTITUIÇÕES ENVOLVIDAS" size={5}/>
            <Cabecalho title="Empresa Realizadora" size={5}/>
            <Row gutter={25}>
              <Col xs={24} md={12}>
              <label className={styles.label} htmlFor="empresaRealizadora">Nome: </label>
                <Field id="empresaRealizadora" as={Input}size="large" name="empresaRealizadora" placeholder="Quanto vai custar o ingresso?" type="text" />
                <ErrorMessage
                  name="empresaRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
              <label className={styles.label} htmlFor="docRealizadora">CNPJ: </label>
                <Field id="docRealizadora" as={Input}size="large" name="docRealizadora" maxLength={14} placeholder="00000000000000" type="text" />
                <ErrorMessage
                  name="docRealizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <label className={styles.label} htmlFor="enderecoRealizadora">Endereço: </label>
              <Field id="enderecoRealizadora" as={Input}size="large" name="enderecoRealizadora" placeholder="Av...Rua... nº" type="text" />
              <ErrorMessage
                name="enderecoRealizadora"
                component={ErrComponent}
              />
            <Row gutter={25}>
              <Col xs={24} md={8}><label className={styles.label} htmlFor="cidadeRealizadora">Cidade: </label>
              <Field id="cidadeRealizadora" as={Input}size="large" name="cidadeRealizadora"  type="text" />
              <ErrorMessage
                name="cidadeRealizadora"
                component={ErrComponent}
              /></Col>
              <Col xs={24} md={8}><label className={styles.label} htmlFor="ufRealizadora">UF: </label>
              <Field id="ufRealizadora" as={Input}size="large" name="ufRealizadora"  type="text" />
              <ErrorMessage
                name="ufRealizadora"
                component={ErrComponent}
              /></Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cepRealizadora">CEP: </label>
              <Field id="cepRealizadora" as={Input}size="large" name="cepRealizadora"   maxLength={8} placeholder="00000000" type="text" />
              <ErrorMessage
                name="cepRealizadora"
                component={ErrComponent}
              /></Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="representanteRealizadora">Representante Legal: </label>
                <Field id="representanteRealizadora" as={Input}size="large" name="representanteRealizadora"  type="text" />
                <ErrorMessage
                  name="representanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="cpfRepresentanteRealizadora">CPF: </label>
                <Field id="cpfRepresentanteRealizadora" as={Input}size="large" name="cpfRepresentanteRealizadora"  maxLength={11} placeholder="00000000000" type="text" />
                <ErrorMessage
                  name="cpfRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="contatoRepresentanteRealizadora">Telefone: </label>
                <Field id="contatoRepresentanteRealizadora" as={Input}size="large" maxLength={11} name="contatoRepresentanteRealizadora" placeholder="27999999999"  type="text" />
                <ErrorMessage
                  name="contatoRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="emailRepresentanteRealizadora">Email: </label>
                <Field id="emailRepresentanteRealizadora" as={Input}size="large" name="emailRepresentanteRealizadora" placeholder="Email do representante legal" type="text" />
                <ErrorMessage
                  name="emailRepresentanteRealizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Cabecalho title="Empresa Organizadora" size={5}/>
            <Row gutter={25}>
              <Col xs={24} md={12}>
              <label className={styles.label} htmlFor="empresaOrganizadora">Nome: </label>
                <Field id="empresaOrganizadora" as={Input}size="large" name="empresaOrganizadora" placeholder="Quanto vai custar o ingresso?" type="text" />
                <ErrorMessage
                  name="empresaOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
              <label className={styles.label} htmlFor="docOrganizadora">CNPJ: </label>
                <Field id="docOrganizadora" as={Input}size="large" name="docOrganizadora" maxLength={14} placeholder="00000000000000" type="text" />
                <ErrorMessage
                  name="docOrganizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <label className={styles.label} htmlFor="enderecoOrganizadora">Endereço: </label>
              <Field id="enderecoOrganizadora" as={Input}size="large" name="enderecoOrganizadora" placeholder="Av...Rua... nº" type="text" />
              <ErrorMessage
                name="enderecoOrganizadora"
                component={ErrComponent}
              />
            <Row gutter={25}>
              <Col xs={24} md={8}><label className={styles.label} htmlFor="cidadeOrganizadora">Cidade: </label>
              <Field id="cidadeOrganizadora" as={Input}size="large" name="cidadeOrganizadora"  type="text" />
              <ErrorMessage
                name="cidadeOrganizadora"
                component={ErrComponent}
              /></Col>
              <Col xs={24} md={8}><label className={styles.label} htmlFor="ufOrganizadora">UF: </label>
              <Field id="ufOrganizadora" as={Input}size="large" name="ufOrganizadora"  type="text" />
              <ErrorMessage
                name="ufOrganizadora"
                component={ErrComponent}
              /></Col>
              <Col xs={24} md={8}>
                <label className={styles.label} htmlFor="cepOrganizadora">CEP: </label>
              <Field id="cepOrganizadora" as={Input}size="large" name="cepOrganizadora"   maxLength={8} placeholder="00000000" type="text" />
              <ErrorMessage
                name="cepOrganizadora"
                component={ErrComponent}
              /></Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="representanteOrganizadora">Representante Legal: </label>
                <Field id="representanteOrganizadora" as={Input}size="large" name="representanteOrganizadora"  type="text" />
                <ErrorMessage
                  name="representanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="cpfRepresentanteOrganizadora">CPF: </label>
                <Field id="cpfRepresentanteOrganizadora" as={Input}size="large" name="cpfRepresentanteOrganizadora"  maxLength={11} placeholder="00000000000" type="text" />
                <ErrorMessage
                  name="cpfRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="contatoRepresentanteOrganizadora">Telefone: </label>
                <Field id="contatoRepresentanteOrganizadora" as={Input}size="large" maxLength={11} name="contatoRepresentanteOrganizadora" placeholder="27999999999"  type="text" />
                <ErrorMessage
                  name="contatoRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
              <Col xs={24} md={12}>
                <label className={styles.label} htmlFor="emailRepresentanteOrganizadora">Email: </label>
                <Field id="emailRepresentanteOrganizadora" as={Input}size="large" name="emailRepresentanteOrganizadora" placeholder="Email do representante legal" type="text" />
                <ErrorMessage
                  name="emailRepresentanteOrganizadora"
                  component={ErrComponent}
                />
              </Col>
            </Row>
            

            {/* <Button type="primary" htmlType="submit">Submit</Button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormFeira;
