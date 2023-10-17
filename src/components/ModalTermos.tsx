"use client"

import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Typography } from "antd";
import { FormContext } from "@/utils/validations/FormContext";

const { Paragraph, Title } = Typography;

const ModalInfos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { termo, setTermo } = useContext(FormContext);

  useEffect(() => {
    // console.log(termo); // This will log the updated termo value
  }, [termo]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setTermo(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTermo(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type={!termo ? "primary" : "default"} onClick={showModal}>
        { !termo ? 'Termos contratuais' : "Termos Aceitos!"}
      </Button>
      <Modal
        footer={[
          <Button key="back" onClick={handleCancel} danger type="text">
            Não aceito os termos
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Aceito os termos
          </Button>,
        ]}
        title="IMPEDIMENTO DE CONTRATAÇÃO - VEDAÇÃÇÕES PREVISTAS NO ART. 42 DA RLCSS"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Title level={5}>
          Art. 42 - Não poderão participar de licitações nem contratar com o
          sistema SEBRAE:{" "}
        </Title>
        <Paragraph>
          I. Empregado, dirigente ou membro dos Conselhos Deliberativos e
          Fiscais de suas respectivas unidades federativas;
        </Paragraph>
        <Paragraph>
          II. Pessoas jurídicas que tenham em seus quadros societários ou sejam
          constituídas por empregado, dirigente ou membro dos Conselhos
          Deliberativos e Fiscais de suas respectivas unidades federativas;
        </Paragraph>
        <Paragraph>
          III. Pessoas jurídicas que tenham assento nos Conselhos Deliberativos
          e Fiscais de suas respectivas unidades federativas.
        </Paragraph>
        <Paragraph>
          § 1º A Pessoa jurídica que tenha como sócio ou titualr ex-empregado,
          não poderá prestar serviços para o respectivo SEBRAE contratante do
          ex-empregado, antes do decurso do prazo de 18 (dezoito) meses,
          contados a partir da respectiva demissão ou desligamento, exceto se os
          referidos sócios ou titulares forem aposentados
        </Paragraph>
        <Paragraph>
          § 2º A pessoa jurídica que tenha como sócio ou titular ex-dirigente ou
          ex-membro dos Conselhos Deliberativos e Fiscais, não poderá prestar
          serviços para o SEBRAE de sua respectiva unidade federativa, antes do
          decurso do prazo mínimo de quarentena de 60 (sessenta) dias, contados
          à partir do respectivo desligamento.
        </Paragraph>
        <Paragraph>
          § 3º As vedações previstas no inciso III não se aplicam ao Institudo
          Euvaldo Lodi (IEL) e aos Serviços Sociais Autônomos, nem às pessoas
          jurídicas integrantes da Administração Pública, Direta ou Indireta,
          federal, estadual ou municipal
        </Paragraph>
        <Title level={5}>
          Ao aceitar os termos, você declara, para os devidos fins de direito e
          sob as penas da Lei, que as exigências supramencioandas, Art 42 do
          RLCSS, que trata daqueles que não poderão participar das licitações
          nem contratar com o Sistema Sebrae
        </Title>
      </Modal>
    </>
  );
};

export default ModalInfos;
