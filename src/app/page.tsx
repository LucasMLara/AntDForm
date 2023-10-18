"use client";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import type { RangePickerProps } from 'antd/es/date-picker';
import FormFeira from "@/components/Form";

dayjs.extend(customParseFormat);

import FormContextProvider from "@/utils/validations/FormContext";

const WebForm = () => {
  return (
    <FormContextProvider>
      <FormFeira />
    </FormContextProvider>
  );
};

export default WebForm;
