"use client"
import styles from "@/app/styles.module.css";
import LogoTipo from "@/components/Image";
import LogoSebrae from "../../public/SebraeLogo.svg";
import { Typography} from "antd";

const {  Title } = Typography;
import 'dayjs/locale/pt-br';


export default function Loading() {

  return (
    <>
    <div className={styles.wrapper}>
      <LogoTipo src={LogoSebrae} alt="Logo Sebrae" width={350} height={350} />
    </div>
    <div className={styles.formWrapper} style={{textAlign: 'center'}}>
      <Title level={3}>Por favor, aguarde...</Title>  
    </div>
    
  </>
  );
}
