"use client";
import styles from "@/app/styles.module.css";
import LogoTipo from "@/components/Image";
import LogoSebrae from "../../../public/SebraeLogo.svg";
import { Typography } from "antd";

const { Title } = Typography;
import "dayjs/locale/pt-br";

export default function TermoAceitoDone() {
  return (
    <>
      <div className={styles.wrapper}>
        <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={250} height={250} />
      </div>
      <div className={styles.formWrapper} style={{ textAlign: "center" }}>
        <Title level={3}>
          Sua Resposta de Aceite do Termo contratual da feira foi enviado!
        </Title>
      </div>
      <div style={{ margin: "2em" }}>
        <Title level={5} style={{ textAlign: "center" }}>
          O SEBRAE/ES, desde já, coloca-se à disposição para esclarecimentos
          complementares à interpretação, à utilização e ao preenchimento deste
          roteiro, através da UMC - Unidade de Marketing e Comunicação{" "}
          <a href="tel:+552730415524">(027) 3041 - 5524 </a>
        </Title>
      </div>
    </>
  );
}
