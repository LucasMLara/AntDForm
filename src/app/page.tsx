"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ModalTermos from "../components/ModalTermos";

import Header from "@/components/Header";
import { FeirasSchema } from "@/utils/validations/FormValidation";

const FormFeira = () => {
  return (
    <div>
      <Header />

      <ModalTermos />
      {/* <h1>Sign up</h1>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={FeirasSchema}
        onSubmit={(values) => {
          console.log("submit");
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {(formikProps) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" placeholder="Jane" type="text" />

            <ErrorMessage
              name="firstName"
              component="div"
              className="field-error"
            />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" placeholder="Doe" type="text" />
            <ErrorMessage
              name="lastName"
              component="div"
              className="field-error"
            />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@acme.com" type="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="field-error"
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default FormFeira;
