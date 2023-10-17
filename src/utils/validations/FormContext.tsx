"use client"
import React, { createContext, useState } from 'react';

export const FormContext = createContext<{ termo: boolean; setTermo: (value: boolean) => void }>({
  termo: false,
  setTermo: () => {},
});

interface Props {
  children: React.ReactNode;
}

const FormContextProvider: React.FC<Props> = (props) => {
  const [termo, setTermo] = useState(false);

  const contextValue = {
    termo,
    setTermo,
  };

  return <FormContext.Provider value={contextValue}>{props.children}</FormContext.Provider>;
};

export default FormContextProvider;
