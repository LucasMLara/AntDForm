import React from "react";
import styles from "../app/styles.module.css";
import { ErrorMessage } from "formik";

import { Input, Typography } from "antd";
const { Search } = Input;
const { Paragraph } = Typography;

interface ISearchInputProps {
  name: string;
  label?: string | null;
  placeholder?: string;

  antdComponent?: React.ComponentType<any>;
  required?: boolean;
  maxLength?: number;
  showCount?: boolean;
  handleChange(value: string): void;
  onSearch(value: string): void;
  value: string;
  disabled?: boolean;
  loading?: boolean;
}

const SearchClientInput: React.FC<ISearchInputProps> = ({
  name,
  label,
  placeholder,
  required,
  maxLength,
  showCount,
  value,
  loading,
  onSearch,
  handleChange,
}) => {
  return (
    <div style={{ margin: ".2em 0", padding: ".5em" }}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {`${label}:`}
          {required && (
            <Paragraph style={{ display: "inline" }} type="danger">
              {" "}
              *
            </Paragraph>
          )}
        </label>
      )}
      <Search
        onChange={(e) => handleChange(e.target.value)}
        onSearch={(value: string) => onSearch(value)}
        showCount={showCount}
        maxLength={maxLength}
        id={name}
        loading={loading}
        size="large"
        value={value}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {(errMsg) => <Paragraph type="danger">{errMsg}</Paragraph>}
      </ErrorMessage>
    </div>
  );
};

export default SearchClientInput;
