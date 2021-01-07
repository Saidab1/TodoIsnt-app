/**@jsx jsx */
import React, { useContext, useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Divider } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormWrapper,
  FormTitle,
  FormButton,
  FormSeparator,
  FormLabel,
  FormInput,
  FormBottomMessage,
  FormLink,
  ErrorMessage,
} from "../StyledComponents";
import google from "../../Images/google.svg";
import { ReactComponent as Logo } from "../../Images/logo.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function Login() {
  const { user, setUser } = useContext(userContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  
  async function handleSubmit(values) {
    const { data, error } = await client("/login", "POST", {body: values});

    if (data) {
      setUser(data);
      history.push("/app/inbox");
    } else {
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 5000);
  }, [errorMessage]);

  if(user) return <Redirect to="/app/inbox"/>

  return (
    <FormWrapper>
      <Link to="/">
        <Logo
          fill="black"
          stroke="black"
          css={{ marginBottom: "15px", width: "98px" }}
        />
      </Link>

      <FormTitle>Log In</FormTitle>
      <div>
        <FormButton css={{ backgroundColor: "#0095f6", color: "#fff" }}>
          {" "}
          <FontAwesomeIcon
            icon={faFacebookSquare}
            css={{ verticalAlign: "bottom", marginRight: "5px" }}
          />
          <span>Log in with Facebook</span>
        </FormButton>
        <FormButton>
          {" "}
          <img
            src={google}
            alt="google icon"
            css={{ verticalAlign: "bottom", marginRight: "5px" }}
          />
          <span>Log in with Google</span>
        </FormButton>
      </div>
      <div css={{ display: "flex", margin: "30px 0" }}>
        <FormSeparator />{" "}
        <span css={{ margin: " 0 5px", textAlign: "center", color: "#777" }}>
          Or
        </span>{" "}
        <FormSeparator />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form css={{ width: "100%" }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="email@email.com"
          ></FormInput>

          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            name="password"
            type="password"
            placeholder="******"
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
            Log In
          </FormButton>
        </Form>
      </Formik>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Divider css={{ color: "#cbbcb1", marginTop: "40px" }} />
      <FormBottomMessage>
        Don't have an account? <FormLink to="/signup">Sign Up</FormLink>
      </FormBottomMessage>
      <FormLink
        to="/recoverPassword"
        css={{ textAlign: "center", display: "block" }}
      >
        Forgot password?
      </FormLink>
    </FormWrapper>
  );
}

export default Login;
