"use client";
import "dayjs/locale/zh-cn";
import FormFeira from "@/components/Form";

import FormContextProvider from "@/utils/validations/FormContext";

const WebForm = () => (
  <FormContextProvider>
    <FormFeira />
  </FormContextProvider>
);

export default WebForm;
