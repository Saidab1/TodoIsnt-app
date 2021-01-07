/**@jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormWrapper,
  FormTitle,
  FormButton,
  FormLabel,
  FormInput,
  FormLink,
} from "../StyledComponents";
import { ReactComponent as Logo } from "../../Images/logo.svg";
import { Link } from "react-router-dom";

function RecoverPassword() {
  return (
    <FormWrapper>
      <Link to="/">
        <Logo
          fill="black"
          stroke="black"
          css={{ marginBottom: "15px", width: "98px" }}
        />
      </Link>
      <FormTitle>Did you forget your password?</FormTitle>
      <p>
        To reset your password, enter the email address of your TodoIsnt
        account.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        <Form css={{ width: "100%" }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="email@email.com"
          ></FormInput>
          <FormButton
            type="submit"
            css={{
              backgroundColor: "#119b9d",
              color: "#fff",
              marginTop: "20px",
              fontSize: "17px",
            }}
          >
            Reset my password
          </FormButton>
        </Form>
      </Formik>
      <FormLink to="/login" css={{ textAlign: "center", display: "block" }}>
        Back to Login
      </FormLink>
    </FormWrapper>
  );
}

export default RecoverPassword;
