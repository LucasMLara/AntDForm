"use client";
import "dayjs/locale/zh-cn";
import FormFeira from "@/components/Form";

import FormContextProvider from "@/utils/validations/FormContext";
import Teste from "@/components/teste";

const WebForm = () => (
  <FormContextProvider>
    {/*<Teste /> */}
    <FormFeira /> 
  </FormContextProvider>
);

export default WebForm;
