import Title from "antd/es/typography/Title";
import React from "react";

type Sizes = 1 | 2 | 3 | 4 | 5;

const Cabecalho = ({ title, size }: { title: string; size?: Sizes }) => (
  <Title level={size} style={{ marginTop: "0.5em" }} type="secondary">
    {title}
  </Title>
);

export default Cabecalho;
