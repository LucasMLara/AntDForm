import xmlJs from "xml-js";
import { message } from "antd";

async function buscarClienteInteressado(idFAMClientesInteressados: string) {
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
            <EntityName>FAMClientesInteressados</EntityName>\
            <Filters><![CDATA[idFAMClientesInteressados=' +
    idFAMClientesInteressados +
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
      ]["BizAgiWSResponse"]["Entities"]["FAMClientesInteressados"];

    return entidade;
  } catch (error) {
    message.error("Houve um erro ao buscar os dados do cliente interessado");
    console.error("Error fetching XML data:", error);
  }
}

export default buscarClienteInteressado;
