import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input, Typography } from "antd";
import styles from "../app/styles.module.css";

const { Paragraph } = Typography;

interface FeiraInputProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  antdComponent?: React.ComponentType<any>;
  required?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

const FormInput: React.FC<FeiraInputProps> = ({
  name,
  label,
  placeholder,
  type,
  antdComponent,
  required,
  maxLength,
  showCount,
}) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {`${label}:`}
        {required && (
          <Paragraph style={{ display: "inline" }} type="danger">
            {" "}
            *
          </Paragraph>
        )}
      </label>
      <Field
        showCount={showCount}
        maxLength={maxLength}
        id={name}
        as={antdComponent || Input}
        size="large"
        name={name}
        placeholder={placeholder}
        type={type}
      />
      <ErrorMessage name={name}>
        {(errMsg) => <Paragraph type="danger">{errMsg}</Paragraph>}
      </ErrorMessage>
    </div>
  );
};

export default FormInput;
