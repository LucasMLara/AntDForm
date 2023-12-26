import Title from "antd/es/typography/Title";
import React from "react";
import { Typography } from "antd";
const { Paragraph } = Typography;

type Sizes = 1 | 2 | 3 | 4 | 5;

const Cabecalho = ({
  title,
  size,
  required,
}: {
  title: string;
  size?: Sizes;
  required?: boolean;
}) => (
  <Title level={size} style={{ marginTop: "0.5em" }} type="secondary">
    {title}{" "}
    {required && (
      <Paragraph style={{ display: "inline" }} type="danger">
        {" "}
        *
      </Paragraph>
    )}
  </Title>
);

export default Cabecalho;
