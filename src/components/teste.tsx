import React, { useEffect, useState } from "react";
import xmlJs from "xml-js";

const XMLDisplay = () => {
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    fetch(
      "https://10.9.4.162/ESAmbienteBPMS/webservices/EntityManagerSOA.asmx",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
          SOAPAction: "http://tempuri.org/getEntities",
          "Access-Control-Allow-Origin": "*",
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <tem:getEntities>\r\n           <!--Optional:-->\r\n            <tem:entitiesInfo>\r\n              <BizAgiWSParam>\r\n                 <EntityData>\r\n                        <EntityName>ClienteFornecedor</EntityName>\r\n                      <Filters><![CDATA[CGCCFO_SEMMASCARA = \'31476294000156\']]></Filters>\r\n                   </EntityData>\r\n               </BizAgiWSParam>\r\n            </tem:entitiesInfo>\r\n     </tem:getEntities>\r\n  </soapenv:Body>\r\n</soapenv:Envelope>',
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
  }, []);

  return (
    <div>
      {xmlData ? (
        <pre>{JSON.stringify(xmlData, null, 4)}</pre>
      ) : (
        <p>Loading XML data...</p>
      )}
    </div>
  );
};

export default XMLDisplay;
