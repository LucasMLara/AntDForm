import { message } from "antd";

import xmlJs from "xml-js";
import { ITermo } from "@/utils/validations/FormInterfaceTermo";

async function AceitarTermo(formValues: any) {
  const { radNumber, idFAMClientesInteressados, TermoAceito } = formValues;

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
                                  <eventName>EvtAceiteExpositor</eventName>\
                                </EventData>\
                                <Entities>\
                                    <FAMClientesInteressados key="${idFAMClientesInteressados}">\
                                        <TermoAceito>${TermoAceito}</TermoAceito>\                                       
                                    </FAMClientesInteressados>\
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
    console.log(xmlData);
    return xmlData;
  } catch (error) {
    message.error("Houve um erro ao enviar o formulário");
    console.error("Error fetching XML data:", error);
  }
}

export default AceitarTermo;
