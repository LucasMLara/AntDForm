import { message } from "antd";

import xmlJs from "xml-js";
import { IFormValues } from "@/utils/validations/FormInterface";

async function revisarDemanda(formValues: IFormValues) {
  const {
    NomeFeiraEventoNegocio,
    Localidade,
    periodoEvento,
    HorarioFuncionamento,
    ValorEntradaVisitantes,
    EmpresaRealizadoraFeira,
    EmpresaOrganizadoraFeira,
    RepresentanteRealizadora,
    RepresentanteOrganizadora,
    CpfRepresentRealizadora,
    CpfRepresentOrganizadora,
    EmpApoiadorasParceriaEvt,
    DescritivodoEventoObjetivo,
    ExpectativadePublicoExposi,
    ExpectativaPublVisitante,
    DadosUltimas3Edicoes,
    PlanoComunicacaoEvento,
    ValorLocacaoAreaLivre,
    ValorLocacaoAreaMontada,
    EstruturadeMontagemeInsumo,
    TaxasAdicionais,
    OutrosbeneficiosLocacao,
    InformacoesAdicionais,
    PlantaBaixa,
    ComprovantedeExclusividade,
    ContratosLocacaoEspaco,
    ManualExpositorRegrasExpo,
    radNumber,
    idFAMDemanda,
  } = formValues;

  const [dataInicial] = periodoEvento as any;
  const [DataInicio, DataFim] = dataInicial;

  const url =
    "http://10.9.4.162/ESAmbienteBPMS/webservices/workflowenginesoa.asmx";
  const body = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\
        <soap:Header/>\
        <soap:Body>\
            <tem:setEvent>\
                <tem:eventInfo>\
                    <BizAgiWSParam>\
                        <domain>domain</domain>\
                        <userName>admon</userName>\
                        <Events>\
                            <Events>\
                                <EventData>\
                                  <radNumber>${radNumber}</radNumber>\
                                  <eventName>EvtRevisao</eventName>\
                                </EventData>\
                                <Entities>\
                                    <FAMDemanda key="${idFAMDemanda}">\
                                    <NomeFeiraEventoNegocio>${NomeFeiraEventoNegocio}</NomeFeiraEventoNegocio>\
                                    <Localidade>${Localidade}</Localidade>\
                                    <DataInicio>${DataInicio}</DataInicio>\
                                    <DataFim>${DataFim}</DataFim>\
                                    <HorarioFuncionamento>${HorarioFuncionamento}</HorarioFuncionamento>\
                                    <ValorEntradaVisitantes>${ValorEntradaVisitantes}</ValorEntradaVisitantes>\
                                    <EmpresaRealizadoraFeira>${EmpresaRealizadoraFeira.id}</EmpresaRealizadoraFeira>\
                                    <EmpresaRealizadoraFeira.Nome>${EmpresaRealizadoraFeira.Nome}</EmpresaRealizadoraFeira.Nome>\
                                    <EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA>${EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA}</EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA>\
                                    <EmpresaRealizadoraFeira.Rua>${EmpresaRealizadoraFeira.Rua}</EmpresaRealizadoraFeira.Rua>\
                                    <EmpresaRealizadoraFeira.Bairro>${EmpresaRealizadoraFeira.Bairro}</EmpresaRealizadoraFeira.Bairro>\
                                    <EmpresaRealizadoraFeira.Cidade>${EmpresaRealizadoraFeira.Cidade}</EmpresaRealizadoraFeira.Cidade>\
                                    <EmpresaRealizadoraFeira.UF>${EmpresaRealizadoraFeira.UF}</EmpresaRealizadoraFeira.UF>\
                                    <EmpresaRealizadoraFeira.CEP>${EmpresaRealizadoraFeira.CEP}</EmpresaRealizadoraFeira.CEP>\
                                    <EmpresaRealizadoraFeira.Telefone>${EmpresaRealizadoraFeira.Telefone}</EmpresaRealizadoraFeira.Telefone>\
                                    <EmpresaRealizadoraFeira.Email>${EmpresaRealizadoraFeira.Email}</EmpresaRealizadoraFeira.Email>\
                                    <RepresentanteRealizadora>${RepresentanteRealizadora}</RepresentanteRealizadora>\
                                    <CpfRepresentRealizadora>${CpfRepresentRealizadora}</CpfRepresentRealizadora>\
                                    <EmpresaOrganizadoraFeira>${EmpresaOrganizadoraFeira.id}</EmpresaOrganizadoraFeira>\
                                    <EmpresaOrganizadoraFeira.Nome>${EmpresaOrganizadoraFeira.Nome}</EmpresaOrganizadoraFeira.Nome>\
                                    <EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA>${EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA}</EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA>\
                                    <EmpresaOrganizadoraFeira.Rua>${EmpresaOrganizadoraFeira.Rua}</EmpresaOrganizadoraFeira.Rua>\
                                    <EmpresaOrganizadoraFeira.Bairro>${EmpresaOrganizadoraFeira.Bairro}</EmpresaOrganizadoraFeira.Bairro>\
                                    <EmpresaOrganizadoraFeira.Cidade>${EmpresaOrganizadoraFeira.Cidade}</EmpresaOrganizadoraFeira.Cidade>\
                                    <EmpresaOrganizadoraFeira.UF>${EmpresaOrganizadoraFeira.UF}</EmpresaOrganizadoraFeira.UF>\
                                    <EmpresaOrganizadoraFeira.CEP>${EmpresaOrganizadoraFeira.CEP}</EmpresaOrganizadoraFeira.CEP>\
                                    <EmpresaOrganizadoraFeira.Telefone>${EmpresaOrganizadoraFeira.Telefone}</EmpresaOrganizadoraFeira.Telefone>\
                                    <EmpresaOrganizadoraFeira.Email>${EmpresaOrganizadoraFeira.Email}</EmpresaOrganizadoraFeira.Email>\
                                    <RepresentanteOrganizadora>${RepresentanteOrganizadora}</RepresentanteOrganizadora>\
                                    <CpfRepresentOrganizadora>${CpfRepresentOrganizadora}</CpfRepresentOrganizadora>\
                                    <EmpApoiadorasParceriaEvt>${EmpApoiadorasParceriaEvt}</EmpApoiadorasParceriaEvt>\
                                    <DescritivodoEventoObjetivo>${DescritivodoEventoObjetivo}</DescritivodoEventoObjetivo>\
                                    <ExpectativadePublicoExposi>${ExpectativadePublicoExposi}</ExpectativadePublicoExposi>\
                                    <ExpectativaPublVisitante>${ExpectativaPublVisitante}</ExpectativaPublVisitante>\
                                    <DadosUltimas3Edicoes>${DadosUltimas3Edicoes}</DadosUltimas3Edicoes>\
                                    <PlanoComunicacaoEvento>${PlanoComunicacaoEvento}</PlanoComunicacaoEvento>\
                                    <ValorLocacaoAreaLivre>${ValorLocacaoAreaLivre}</ValorLocacaoAreaLivre>\
                                    <ValorLocacaoAreaMontada>${ValorLocacaoAreaMontada}</ValorLocacaoAreaMontada>\
                                    <EstruturadeMontagemeInsumo>${EstruturadeMontagemeInsumo}</EstruturadeMontagemeInsumo>\
                                    <TaxasAdicionais>${TaxasAdicionais}</TaxasAdicionais>\
                                    <OutrosbeneficiosLocacao>${OutrosbeneficiosLocacao}</OutrosbeneficiosLocacao>\
                                    <InformacoesAdicionais>${InformacoesAdicionais}</InformacoesAdicionais>\
                                    <PlantaBaixa>${PlantaBaixa}</PlantaBaixa>\
                                    <ComprovantedeExclusividade>${ComprovantedeExclusividade}</ComprovantedeExclusividade>\
                                    <ContratosLocacaoEspaco>${ContratosLocacaoEspaco}</ContratosLocacaoEspaco>\
                                    <ManualExpositorRegrasExpo>${ManualExpositorRegrasExpo}</ManualExpositorRegrasExpo>\
                                    </FAMDemanda>\
                                </Entities>\
                            </Events>\
                        </Events>\
                    </BizAgiWSParam>\
                </tem:eventInfo>\
            </tem:setEvent>\
        </soap:Body>\
    </soap:Envelope>`;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type":
        "application/soap+xml;charset=UTF-8;action='http://tempuri.org/setEvent'",
    },
    body,
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Erro na requisição: Status => ${response.status}`);
    }
    const xmlText = await response.text();
    const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
    const xmlData = JSON.parse(jsonData);
    return xmlData;
  } catch (error) {
    message.error("Houve um erro ao enviar o formulário");
    console.error("Error fetching XML data:", error);
  }
}

export default revisarDemanda;
