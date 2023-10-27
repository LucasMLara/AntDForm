import { message } from "antd";

import xmlJs from "xml-js";
import { IFormValues } from "@/utils/validations/FormInterface";

async function revisarDemanda(formValues: IFormValues) {
  const {
    idCase,
    idFAMDemanda,
    nomeDaFeira,
    localDaFeira,
    periodoEvento,
    horarioFuncionamento,
    valorEntradaVisitantes,
    idEmpresaRealizadora,
    empresaRealizadora,
    docRealizadora,
    enderecoRealizadora,
    bairroRealizadora,
    cidadeRealizadora,
    ufRealizadora,
    cepRealizadora,
    contatoRepresentanteRealizadora,
    emailRepresentanteRealizadora,
    representanteRealizadora,
    cpfRepresentanteRealizadora,
    idEmpresaOrganizadora,
    empresaOrganizadora,
    docOrganizadora,
    enderecoOrganizadora,
    bairroOrganizadora,
    cidadeOrganizadora,
    ufOrganizadora,
    cepOrganizadora,
    contatoRepresentanteOrganizadora,
    emailRepresentanteOrganizadora,
    representanteOrganizadora,
    cpfRepresentanteOrganizadora,
    empresasApoiadoras,
    descritivoEvento,
    expectativaPubExpositor,
    expectativaPubVisitante,
    dadosUltimasEdicoes,
    planoComunicacaoEvento,
    valorLocacaoLivre,
    valorLocacaoMontada,
    descritivoEstruturaMontagem,
    txsAdicionais,
    outrosBeneficios,
    infoAdicional,
    plantaBaixa,
    comprovanteExclusividadeRegistroINPI,
    contratoLocacao,
    manualExpositor,
  } = formValues;

  const [dataInicial] = periodoEvento;

  const [dataInicio, dataFim] = dataInicial as any;
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
                                  <idCase>${idCase}</idCase>\
                                  <eventName>EvtRevisao</eventName>\
                                </EventData>\
                                <Entities>\
                                    <FAMDemanda key="${idFAMDemanda}">\
                                        <NomeFeiraEventoNegocio>${nomeDaFeira}</NomeFeiraEventoNegocio>\
                                        <Localidade>${localDaFeira}</Localidade>\
                                        <DataInicio>${dataInicio}</DataInicio>\
                                        <DataFim>${dataFim}</DataFim>\
                                        <HorarioFuncionamento>${horarioFuncionamento}</HorarioFuncionamento>\
                                        <ValorEntradaVisitantes>${valorEntradaVisitantes}</ValorEntradaVisitantes>\
                                        <EmpresaRealizadoraFeira>${idEmpresaRealizadora}</EmpresaRealizadoraFeira>\
                                        <EmpresaRealizadoraFeira.Nome>${empresaRealizadora}</EmpresaRealizadoraFeira.Nome>\
                                        <EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA>${docRealizadora}</EmpresaRealizadoraFeira.CGCCFO_SEMMASCARA>\
                                        <EmpresaRealizadoraFeira.Rua>${enderecoRealizadora}</EmpresaRealizadoraFeira.Rua>\
                                        <EmpresaRealizadoraFeira.Bairro>${bairroRealizadora}</EmpresaRealizadoraFeira.Bairro>\
                                        <EmpresaRealizadoraFeira.Cidade>${cidadeRealizadora}</EmpresaRealizadoraFeira.Cidade>\
                                        <EmpresaRealizadoraFeira.UF>${ufRealizadora}</EmpresaRealizadoraFeira.UF>\
                                        <EmpresaRealizadoraFeira.CEP>${cepRealizadora}</EmpresaRealizadoraFeira.CEP>\
                                        <EmpresaRealizadoraFeira.Telefone>${contatoRepresentanteRealizadora}</EmpresaRealizadoraFeira.Telefone>\
                                        <EmpresaRealizadoraFeira.Email>${emailRepresentanteRealizadora}</EmpresaRealizadoraFeira.Email>\
                                        <RepresentanteRealizadora>${representanteRealizadora}</RepresentanteRealizadora>\
                                        <CpfRepresentRealizadora>${cpfRepresentanteRealizadora}</CpfRepresentRealizadora>\
                                        <EmpresaOrganizadoraFeira>${idEmpresaOrganizadora}</EmpresaOrganizadoraFeira>\
                                        <EmpresaOrganizadoraFeira.Nome>${empresaOrganizadora}</EmpresaOrganizadoraFeira.Nome>\
                                        <EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA>${docOrganizadora}</EmpresaOrganizadoraFeira.CGCCFO_SEMMASCARA>\
                                        <EmpresaOrganizadoraFeira.Rua>${enderecoOrganizadora}</EmpresaOrganizadoraFeira.Rua>\
                                        <EmpresaOrganizadoraFeira.Bairro>${bairroOrganizadora}</EmpresaOrganizadoraFeira.Bairro>\
                                        <EmpresaOrganizadoraFeira.Cidade>${cidadeOrganizadora}</EmpresaOrganizadoraFeira.Cidade>\
                                        <EmpresaOrganizadoraFeira.UF>${ufOrganizadora}</EmpresaOrganizadoraFeira.UF>\
                                        <EmpresaOrganizadoraFeira.CEP>${cepOrganizadora}</EmpresaOrganizadoraFeira.CEP>\
                                        <EmpresaOrganizadoraFeira.Telefone>${contatoRepresentanteOrganizadora}</EmpresaOrganizadoraFeira.Telefone>\
                                        <EmpresaOrganizadoraFeira.Email>${emailRepresentanteOrganizadora}</EmpresaOrganizadoraFeira.Email>\
                                        <RepresentanteOrganizadora>${representanteOrganizadora}</RepresentanteOrganizadora>\
                                        <CpfRepresentOrganizadora>${cpfRepresentanteOrganizadora}</CpfRepresentOrganizadora>\
                                        <EmpApoiadorasParceriaEvt>${empresasApoiadoras}</EmpApoiadorasParceriaEvt>\
                                        <DescritivodoEventoObjetivo>${descritivoEvento}</DescritivodoEventoObjetivo>\
                                        <ExpectativadePublicoExposi>${expectativaPubExpositor}</ExpectativadePublicoExposi>\
                                        <ExpectativaPublVisitante>${expectativaPubVisitante}</ExpectativaPublVisitante>\
                                        <DadosUltimas3Edicoes>${dadosUltimasEdicoes}</DadosUltimas3Edicoes>\
                                        <PlanoComunicacaoEvento>${planoComunicacaoEvento}</PlanoComunicacaoEvento>\
                                        <ValorLocacaoAreaLivre>${valorLocacaoLivre}</ValorLocacaoAreaLivre>\
                                        <ValorLocacaoAreaMontada>${valorLocacaoMontada}</ValorLocacaoAreaMontada>\
                                        <EstruturadeMontagemeInsumo>${descritivoEstruturaMontagem}</EstruturadeMontagemeInsumo>\
                                        <TaxasAdicionais>${txsAdicionais}</TaxasAdicionais>\
                                        <OutrosbeneficiosLocacao>${outrosBeneficios}</OutrosbeneficiosLocacao>\
                                        <InformacoesAdicionais>${infoAdicional}</InformacoesAdicionais>\
                                        <PlantaBaixa>${plantaBaixa}</PlantaBaixa>\
                                        <ComprovantedeExclusividade>${comprovanteExclusividadeRegistroINPI}</ComprovantedeExclusividade>\
                                        <ContratosLocacaoEspaco>${contratoLocacao}</ContratosLocacaoEspaco>\
                                        <ManualExpositorRegrasExpo>${manualExpositor}</ManualExpositorRegrasExpo>\
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
