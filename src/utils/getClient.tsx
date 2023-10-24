import { useEffect, useState } from "react";
import xmlJs from "xml-js";

const XMLDisplay = () => {
  const [xmlData, setXmlData] = useState(null);
  const [x, setX] = useState(31476294000156);

  useEffect(() => {
    fetch(
      "http://essrvbpm-h02/ESAmbienteBPMS/webservices/EntityManagerSOA.asmx",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
          SOAPAction: "http://tempuri.org/getEntities",
        },
        body:
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
        <soapenv:Header/>\
        <soapenv:Body>\
          <tem:getEntities>\
            <tem:entitiesInfo>\
              <BizAgiWSParam>\
                <EntityData>\
                  <EntityName>ClienteFornecedor</EntityName>\
                  <Filters><![CDATA[CGCCFO_SEMMASCARA = ' +
          x +
          "]]></Filters>\
                </EntityData>\
              </BizAgiWSParam>\
            </tem:entitiesInfo>\
          </tem:getEntities>\
        </soapenv:Body>\
      </soapenv:Envelope>",
      }
    )
      .then((response) => response.text())
      .then((xmlText) => {
        const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
        setXmlData(JSON.parse(jsonData));
      })
      .catch((error) => {
        console.error("Error fetching XML data:", error);
      });
  }, [x]);

  return (
    <div>
      {xmlData ? (
        <pre>
          {JSON.stringify(
            xmlData["soap:Envelope"]["soap:Body"]["getEntitiesResponse"][
              "getEntitiesResult"
            ]["BizAgiWSResponse"]["Entities"]["ClienteFornecedor"],
            null,
            4
          )}
        </pre>
      ) : (
        <p>Loading XML data...</p>
      )}
    </div>
  );
};

export default XMLDisplay;
