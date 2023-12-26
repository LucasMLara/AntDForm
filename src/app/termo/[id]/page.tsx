"use client";
import { useState, useCallback, useEffect } from "react";
import styles from "@/app/styles.module.css";
import LogoTipo from "@/components/Image";
import LogoSebrae from "../../../../public/SebraeLogo.svg";
import { Typography, Checkbox, Row, Col, Flex, Button } from "antd";
const { Paragraph, Title } = Typography;
import mockData from "./mock";
import { useParams } from "next/navigation";
import getDemanda from "@/utils/getDemanda";
import getClienteInteressado from "@/utils/getClienteInteressado";
import { InfosDemanda } from "../../../utils/validations/DemandaInterface";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
import AceitarTermo from "@/utils/SetEventTermo";
import { InfosClienteInteressado } from "@/utils/validations/ClienteInterface";
import { handleDecode } from "@/utils/crypto";
import { useRouter } from "next/navigation";

dayjs.extend(utc);

dayjs.extend(timezone);

export default function TermoSMS() {
  const [caso, setCaso] = useState<InfosDemanda>();
  const [cliente, setCliente] = useState<InfosClienteInteressado>();
  const [enviarLiberado, setEnviarLiberado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const boldText = { fontWeight: "bold" };
  const { id } = useParams();
  const router = useRouter();
  const decodedId = id ? decodeURIComponent(id as string) : null;

  function convertToBRT(utcDate: string): string {
    const brtDateTime = dayjs
      .utc(utcDate)
      .tz("America/Sao_Paulo")
      .locale("pt-br")
      .format("DD/MM/YYYY");
    return brtDateTime;
  }

  const pegarCasoExistente = useCallback(async () => {
    const res1 = await getClienteInteressado(handleDecode(decodedId as string));
    console.log("📓 ~ file: page.tsx:50 ~ pegarCasoExistente ~ res1:", res1);

    const data1: InfosClienteInteressado = await res1;
    setCliente(data1);
    const res = await getDemanda(
      data1.FAMManifestantesInteress.FAMDemanda._text
    );
    const data: InfosDemanda = await res;

    return data;
  }, [decodedId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pegarCasoExistente();
        setCaso(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pegarCasoExistente]);

  const enviarAceiteTermo = async () => {
    setEnviando(true);
    await AceitarTermo({
      idCase: cliente?.CaseId._text,
      idFAMClientesInteressados: decodedId as string,
      TermoAceito: true,
    }).then(() => {
      setEnviando(false);
      router.replace("/termoenviado");
    });
  };

  return (
    <>
      {!caso ? (
        <div>
          <div className={styles.wrapper}>
            <LogoTipo
              src={LogoSebrae}
              alt="Logo Sebrae"
              width={150}
              height={150}
            />
          </div>
          <div className={styles.formWrapper} style={{ textAlign: "center" }}>
            <Title level={4}>
              Houve um erro ao recuperar os dados da requisição, por favor tente
              novamente mais tarde!
            </Title>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.wrapper}>
            <LogoTipo
              src={LogoSebrae}
              alt="Logo Sebrae"
              width={100}
              height={100}
            />
          </div>
          <Title level={5} style={{ margin: "1em" }}>
            <span>Nome da feira:</span> {caso.NomeFeiraEventoNegocio._text}
          </Title>
          <div className={styles.formWrapper}>
            <Paragraph strong>
              Identificação do Empreendimento Participante
            </Paragraph>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Razão Social:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Nome._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Nome Fantasia:</span>{" "}
                {caso.EmpresaRealizadoraFeira.NomeFantasia._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>CNPJ:</span>{" "}
                {caso.EmpresaRealizadoraFeira.CNPJCPF._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Endereço: </span>
                {caso.EmpresaRealizadoraFeira.Rua._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>Bairro: </span>
                {caso.EmpresaRealizadoraFeira.Bairro._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={8} sm={24}>
                <span style={boldText}>Cidade: </span>{" "}
                {caso.EmpresaRealizadoraFeira.Cidade._text}
              </Col>
              <Col md={8} sm={24}>
                <span style={boldText}>UF:</span>{" "}
                {caso.EmpresaRealizadoraFeira.UF._text}
              </Col>
              <Col md={8} sm={24}>
                <span style={boldText}>CEP:</span>{" "}
                {caso.EmpresaRealizadoraFeira.CEP._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Telefone:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Telefone._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>E-mail:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Email?._text}
              </Col>
            </Row>
            <Row justify="start">
              {/* <Col md={12} sm={24}>
            <span style={boldText}>Nº de Empregados:</span>{" "}
            {mockData.qtdEmpregados}
          </Col> */}
              <Col md={12} sm={24}>
                <span style={boldText}>Data de Abertura:</span>{" "}
                {convertToBRT(caso.DataSolicitacao._text)}
              </Col>
            </Row>
            <Paragraph strong style={{ margin: "1em 0" }}>
              Dados do(a) Responsável Legal do Empreendimento
            </Paragraph>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Nome:</span>{" "}
                {caso.RepresentanteOrganizadora?._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>CPF:</span>{" "}
                {caso.CpfRepresentOrganizadora?._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Endereço:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Rua._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>Bairro:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Bairro._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={8} sm={24}>
                <span style={boldText}>Cidade:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Cidade._text}
              </Col>
              <Col md={8} sm={24}>
                <span style={boldText}>UF:</span>{" "}
                {caso.EmpresaRealizadoraFeira.UF._text}
              </Col>
              <Col md={8} sm={24}>
                <span style={boldText}>CEP:</span>{" "}
                {caso.EmpresaRealizadoraFeira.CEP._text}
              </Col>
            </Row>
            <Row justify="start">
              <Col md={12} sm={24}>
                <span style={boldText}>Telefone:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Telefone._text}
              </Col>
              <Col md={12} sm={24}>
                <span style={boldText}>E-mail:</span>{" "}
                {caso.EmpresaRealizadoraFeira.Email?._text}
              </Col>
            </Row>
            <Paragraph strong style={{ margin: "1em 0" }}>
              Termos e Condições
            </Paragraph>
            <Paragraph strong>1. ESPECIFICAÇÕES</Paragraph>
            <Paragraph>
              1.1. O empreendimento acima identificado, devidamente selecionado
              pelo SEBRAE/ES dentro dos critérios estabelecidos (ser um
              empreendimento participante do projeto/Atividade -{" "}
              {caso.NomeFeiraEventoNegocio._text} - ), compromete-se a
              participar, na condição de expositor na Feira acima indicada em um
              espaço de{" "}
              {`área livre = R$ ${caso.ValorLocacaoAreaLivre._text} /m²  e área montada = R$ ${caso.ValorLocacaoAreaMontada._text} /m² `}
              a ser realizado no período de{" "}
              {convertToBRT(caso.DataInicio._text)} a{" "}
              {convertToBRT(caso.DataFim._text)}, Local {caso.Localidade._text},
              no espaço adquirido pelo SEBRAE/ES, bem como a cumprir as
              orientações do SEBRAE/ES e as condições deste Termo de
              Compromisso.
            </Paragraph>
            <Paragraph strong>2. PAGAMENTO</Paragraph>
            <Paragraph>
              2.1. A Título de contrapartida, correspondente a{" "}
              {mockData.percentualDeContrapartidaDoCliente} do investimento
              necessário para participação na feira, o empreendimento apoiado
              arcará com a quantia de {mockData.valorContrapartidaCliente}, que
              será paga ao SEBRAE/ES até o dia {mockData.dataLimiteInscricao}.
            </Paragraph>
            <Paragraph>
              2.2. O pagamento da contrapartida consolida o compromisso do
              empreendimento na participação da feira indicada acima.
            </Paragraph>
            <Paragraph strong>3. OBRIGAÇÕES DO EMPREENDIMENTO</Paragraph>
            <Paragraph>
              3.1. O Empreendimento apoiado se compromete a inserir a logomarca
              do SEBRAE como apoiador na programação visual na estrutura do
              espaço ou no estande, com boa visibilidade.
            </Paragraph>
            <Paragraph>
              3.2. O apoio do SEBRAE/ES é referente aos custos com a compra de
              espaço e/ou montagem do estande, conforme o caso. É de
              responsabilidade do empreendimento custear quaiquer insumos ou
              despesas necessárias para a exposição.
            </Paragraph>
            <Paragraph>
              3.3. O Representante do empreendimento deverá responder,
              obrigatoriametne, a pesquisa de avaliação do evento apresentada
              pelo SEBRAE/ES
            </Paragraph>
            <Paragraph>
              3.4. Caso o participante não efetue o pagamento até a data de
              vencimento identificada acima, a quantia devida será acrescida de
              correção monetária, com base no índice de atualização do site do
              TJ/ES, a contar do vencimento, e juros de 1% ao mês sobre o valor
              total do débito.
            </Paragraph>
            <Paragraph>
              3.5. O não pagamento do valor devido à titulo de contrapartida até
              a data de vencimento identificada acima incorrerá o empreendimento
              em mora, sujeitando-o à inclusão do registro nos órgãos de
              proteção ao crédito, bem como aos meios de cobranças
              extrajudiciais e judiciais que se fizerem necessários,
              independentemente de notificação prévia.
            </Paragraph>
            <Paragraph>
              3.6. Fica autorizada a utilização de imagens do empreendimento e
              do participante produzidas durante o evento (a exemplo de
              fotografias, vídeo depoimento) para fins de divulgação e/ou
              publicidade, sem nenhum custo ou ônus ao SEBRAE/ES.
            </Paragraph>
            <Paragraph>
              3.7. É dever do empreendimento aprticipante cumprir todas as
              regras do SEBRAE/ES e do organizador do evento, autuando de forma
              repsonsável, íntegra e de boa-fé. No caso de descumprimento por
              parte do participante, a exemplo de não comparecimento no evento,
              atuação com desvio de finalidade ou qualquer outra postura
              indevida, além das medidas legais cabíveis, o empreendimento
              poderá ser classificado como última prioridade para futura
              participação em eventos subsidiados pelo SEBRAE.
            </Paragraph>
            <Paragraph strong>4. CANCELAMENTO E DESISTÊNCIA</Paragraph>
            <Paragraph>
              4.1. O EMPREENDIMENTO poderá solicitar a desistência de
              participação na feira com antecedência mínima de 30 dias, contados
              da data prevista para o início do evento. Neste caso, a quantia
              paga a título de contrapartida poderá ser devolvida, deduzindo-se
              custos que eventualmente o SEBRAE/ES já tenha despendido ou se
              obrigado a despender para a realização do evento, inclusive
              multas, taxas e impostos.
            </Paragraph>
            <Paragraph>
              4.2. Caso a desistência do participante cause prejuízo ao
              SEBRAAE/ES em valor superior ao valor pago a título de
              contrapartida, o SEBRAE/ES reserva-se ao direito de cobrar a
              diferença, pelos meios extrajudiciais e juduciais cabíveis.
            </Paragraph>
            <Paragraph>
              4.3. no Caso de cancelamento do apoio pelo SEBRAE/ES, o
              participante receberá restituição integral da quantia paga a
              título de contrapartida.
            </Paragraph>
            <Paragraph>
              É de integral responsabilidade do EMPREENDIMENTO apoiado e seus
              representantes e/ou prepostos a assunção dos riscos inerentes a
              uma viagem, de sorte que o apoio financeiro do SEBRAE/ES à
              realização da Feira não atrai nenhuma forma de responsabilidade
              por fatos que possam vir a ocorrer, devendo eventuais danos
              materiais ou morais a serem obrados diretamente dos respectivos
              responsáveis pela conduta danosa.
            </Paragraph>
            <Paragraph>
              Ao aceitar as condições desse TERMO DE COMPROMISSO, o
              EMPREENDIMENTO, por meio de seu responsável legal,{" "}
              <span style={{ fontWeight: "bolder" }}>declara</span>, sob as
              penalidades legais, que as informações aqui prestadas são
              verdadeiras e{" "}
              <span style={{ fontWeight: "bolder" }}>autoriza</span> desde ká o
              SEBRAE/ES a adquirir da empresa organizadora da Feira, locação de
              área (livre ou montada) para participação conjunta com empresas do
              setor a que se refere o evento
            </Paragraph>
            <Flex align="center" justify="center" gap={10}>
              <Checkbox onClick={() => setEnviarLiberado(!enviarLiberado)} />
              <Paragraph style={{ margin: "1em" }}>
                Declaro estar ciente das condições previstas acima, bem como
                serem verídicas as informações prestadas.
              </Paragraph>
            </Flex>
            <Button
              disabled={!enviarLiberado || enviando}
              type="primary"
              onClick={() => enviarAceiteTermo()}
            >
              ENVIAR
            </Button>
          </div>
          <Paragraph style={{ textAlign: "center", margin: "1em" }}>
            Após aceite e envio deste Termo de Compromisso , você receberá um
            e-mail com o link para efetuar o pagamento da contrapartida.
          </Paragraph>
        </>
      )}
    </>
  );
}
