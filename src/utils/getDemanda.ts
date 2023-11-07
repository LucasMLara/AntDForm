import xmlJs from "xml-js";
import { message } from "antd";

async function buscarDemanda(idFAMDemanda: number | string) {
  const url =
    "http://10.9.4.162/ESAmbienteBPMS/webservices/EntityManagerSOA.asmx";
  const body =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
  <soapenv:Header/>\
  <soapenv:Body>\
    <tem:getEntities>\
      <tem:entitiesInfo>\
        <BizAgiWSParam>\
          <EntityData>\
            <EntityName>FAMDemanda</EntityName>\
            <Filters><![CDATA[idFAMDemanda=' +
    idFAMDemanda +
    "]]></Filters>\
          </EntityData>\
        </BizAgiWSParam>\
      </tem:entitiesInfo>\
    </tem:getEntities>\
  </soapenv:Body>\
  </soapenv:Envelope>";

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "text/xml;charset=UTF-8",
      SOAPAction: "http://tempuri.org/getEntities",
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
    const entidade =
      xmlData["soap:Envelope"]["soap:Body"]["getEntitiesResponse"][
        "getEntitiesResult"
      ]["BizAgiWSResponse"]["Entities"]["FAMDemanda"];

    return entidade;
  } catch (error) {
    message.error("Houve um erro ao buscar os dados da empresa");
    console.error("Error fetching XML data:", error);
  }
}

export default buscarDemanda;
