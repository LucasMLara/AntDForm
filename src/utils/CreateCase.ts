import { useEffect, useState } from "react";
import xmlJs from "xml-js";

const XMLDisplay = () => {
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    fetch(
      "http://essrvbpm-h02/ESAmbienteBPMS/webservices/workflowenginesoa.asmx",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/soap+xml;charset=UTF-8;action='http://tempuri.org/createCases'",
        },
        body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\
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
                                        <DataInicio>2023-10-23</DataInicio>\
                                        <ItemdoContrato>3851</ItemdoContrato>\
                                        <EmpresaOrganizadoraFeira>1251</EmpresaOrganizadoraFeira>\
                                        <EmpresaRealizadoraFeira>2149</EmpresaRealizadoraFeira>\
                                    </FAMDemanda>\
                                </Entities>\
                            </Case>\
                        </Cases>\
                    </BizAgiWSParam>\
                </tem:casesInfo>\
            </tem:createCases>\
        </soap:Body>\
    </soap:Envelope>',
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
};

export default XMLDisplay;
