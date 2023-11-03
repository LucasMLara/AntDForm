import React, { useState } from "react";
import { Modal, Typography, Button } from "antd";
import { QuestionOutlined, CheckOutlined } from "@ant-design/icons";

const { Text, Paragraph, Title } = Typography;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Text style={{ fontSize: "1.2em" }} mark>
        <QuestionOutlined
          onClick={showModal}
          title="Impedimento de Contratação - Vedações Previstas"
          style={{ color: "#2576c7cc" }}
        />
      </Text>

      <Modal
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            <CheckOutlined />
          </Button>,
        ]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Title level={5}>
          São exigidos os seguintes documentos a título de comprovação de
          regularidade cadastral:
        </Title>

        <Paragraph>
          a) Comprovante de inscrição no Cadastro Nacional de Pessoa Jurídica do
          Ministério da Fazenda – CNPJ;
        </Paragraph>
        <Paragraph>
          b) Cópia do ato constitutivo e eventuais alterações, registrados nos
          órgãos competentes;
        </Paragraph>
        <Paragraph>
          c) Cópia do ato de designação das pessoas habilitadas a representar a
          instituição, se aplicável;
        </Paragraph>
        <Paragraph>
          d) Cópia da carteira de identidade e Cadastro de Pessoas Físicas do
          Ministério da Fazenda – CPF/MF, ou outro documento equivalente com
          foto, dos representantes legais da instituição.
        </Paragraph>
        <Title level={5}>
          São exigidos os seguintes documentos a título de comprovação de
          regularidade fiscal:
        </Title>
        <Paragraph>
          a) Certidão Negativa de Débitos Relativos a Créditos Tributários
          Federais e à Dívida Ativa da União (Certidão Conjunta Receita Federal
          + INSS);
        </Paragraph>
        <Paragraph>b) Certificado de Regularidade do FGTS – CRF;</Paragraph>
        <Paragraph>c) Certidão Negativa de Débito Estadual;</Paragraph>
        <Paragraph>
          d) Certidão Negativa de Débito Municipal;   O cadastro e a manutenção
          da regularidade do fornecedor deverão ser realizados por meio do
          Sistema de Regularidade SEBRAE/ES (SRS), sendo a Certidão Regular
          válida para substituição dos documentos supracitados.
        </Paragraph>
      </Modal>
    </>
  );
};

export default App;
