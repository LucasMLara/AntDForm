"use client";
import styles from "@/app/styles.module.css";
import LogoTipo from "@/components/Image";
import LogoSebrae from "../../../../public/SebraeLogo.svg";
import { Typography, Spin } from "antd";

const { Title } = Typography;
import "dayjs/locale/pt-br";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div className={styles.wrapper}>
        <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={150} height={150} />
      </div>
      <div className={styles.formWrapper} style={{ textAlign: "center" }}>
        <Title level={3}>Por favor, aguarde...</Title>
        <Spin size="large" />
      </div>
    </div>
  );
}
