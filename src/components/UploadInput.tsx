import React from "react";

import { Upload, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../app/styles.module.css";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { ErrorMessage } from "formik";

const { Paragraph } = Typography;

interface IUpload {
  name: string;
  label: string;
  onChange(value: File): void;
  required?: boolean;
}

const UploadInput: React.FC<IUpload> = ({
  name,
  label,
  onChange,
  required,
}) => {
  const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let file = info.file as unknown as File;
    onChange(file);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", margin: " 0 .5em" }}
    >
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
      <Upload
        name={name}
        maxCount={1}
        onChange={handleFileChange}
        beforeUpload={() => false}
      >
        <Button size="large" icon={<UploadOutlined />} />
      </Upload>
      <ErrorMessage name={name}>
        {(errMsg) => <Paragraph type="danger">{errMsg}</Paragraph>}
      </ErrorMessage>
    </div>
  );
};

export default UploadInput;
