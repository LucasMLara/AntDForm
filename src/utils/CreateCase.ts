import { message } from "antd";

import xmlJs from "xml-js";
import { IFormValues } from "@/utils/validations/FormInterface";

async function criarCaso(formValues: IFormValues) {
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
  } = formValues;

  const [dataInicial] = periodoEvento as any;
  const [DataInicio, DataFim] = dataInicial;

  const url =
    "http://10.9.4.162/ESAmbienteBPMS/webservices/workflowenginesoa.asmx";
  const body = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\
        <soap:Header/>\
        <soap:Body>\
            <tem:createCases>\
                <tem:casesInfo>\
                    <BizAgiWSParam>\
                        <domain>domain</domain>\
                        <userName>admon</userName>\
                        <Cases>\
                            <Case>\
                                <Process>FeiraDeAcessoAMercados</Process>\
                                <Entities>\
                                    <FAMDemanda>\
                                        <NomeFeiraEventoNegocio>${NomeFeiraEventoNegocio}</NomeFeiraEventoNegocio>\
                                        <Localidade>${Localidade}</Localidade>\
                                        <DataInicio>${DataInicio}</DataInicio>\
                                        <DataFim>${DataFim}</DataFim>\
                                        <HorarioFuncionamento>${HorarioFuncionamento}</HorarioFuncionamento>\
                                        <ValorEntradaVisitantes>${ValorEntradaVisitantes}</ValorEntradaVisitantes>\
                                        <EmpresaRealizadoraFeira>${EmpresaRealizadoraFeira.id}</EmpresaRealizadoraFeira>\
                                        <RepresentanteRealizadora>${RepresentanteRealizadora}</RepresentanteRealizadora>\
                                        <CpfRepresentRealizadora>${CpfRepresentRealizadora}</CpfRepresentRealizadora>\
                                        <EmpresaOrganizadoraFeira>${EmpresaOrganizadoraFeira.id}</EmpresaOrganizadoraFeira>\                                        
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
                                        ${
                                          PlantaBaixa != null
                                            ? "<PlantaBaixa><File fileName=\"" + PlantaBaixa.name + "\">" + await getBase64(PlantaBaixa) +
                                              "<\/File><\/PlantaBaixa>"
                                            : ""
                                        }
                                        ${
                                          ComprovantedeExclusividade != null
                                            ? "<ComprovantedeExclusividade><File fileName=\"" + ComprovantedeExclusividade.name +"\">" + 
                                            await getBase64(ComprovantedeExclusividade) +
                                              "<\/File><\/ComprovantedeExclusividade>"
                                            : ""
                                        }
                                        ${
                                          ContratosLocacaoEspaco != null
                                            ? "<ContratosLocacaoEspaco><File fileName=\"" + ContratosLocacaoEspaco.name + "\">" + 
                                            await getBase64(ContratosLocacaoEspaco) +
                                              "<\/File><\/ContratosLocacaoEspaco>"
                                            : ""
                                        }
                                        ${
                                          ManualExpositorRegrasExpo != null
                                            ? "<ManualExpositorRegrasExpo><File fileName=\"" + ManualExpositorRegrasExpo.name + "\">" + 
                                            await getBase64(ManualExpositorRegrasExpo) +
                                              "<\/File><\/ManualExpositorRegrasExpo>"
                                            : ""
                                        }
                                    </FAMDemanda>\
                                </Entities>\
                            </Case>\
                        </Cases>\
                    </BizAgiWSParam>\
                </tem:casesInfo>\
            </tem:createCases>\
        </soap:Body>\
    </soap:Envelope>`;
    
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type":
        "application/soap+xml;charset=UTF-8;action='http://tempuri.org/createCases'",
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

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(btoa(reader.result));
      } else {
        reject(new Error("The file could not be read as a string."));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
}

export default criarCaso;
