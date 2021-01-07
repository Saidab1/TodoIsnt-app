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
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function SignUp() {
  const { setUser } = useContext(userContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(values) {
    const { data, error } = await client("/signup", "POST", {body: values});
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

  return (
    <FormWrapper>
      <Link to="/">
        <Logo
          fill="black"
          stroke="black"
          css={{ marginBottom: "15px", width: "98px" }}
        />
      </Link>
      <FormTitle>Sign Up</FormTitle>
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
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          first_name: Yup.string().required("First Name is required"),
          last_name: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form css={{ width: "100%" }}>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <FormInput
            name="first_name"
            type="text"
            placeholder="your first name is ..."
          ></FormInput>

          <FormLabel htmlFor="last_name">Last Name</FormLabel>
          <FormInput
            name="last_name"
            type="text"
            placeholder="your last name is ..."
          ></FormInput>

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
            Sign up
          </FormButton>
        </Form>
      </Formik>
      {errorMessage && <ErrorMessage> Email {errorMessage}</ErrorMessage>}
      <Divider css={{ color: "#cbbcb1", marginTop: "40px" }} />
      <FormBottomMessage>
        Have an account? <FormLink to="/login">Log in</FormLink>
      </FormBottomMessage>
    </FormWrapper>
  );
}

export default SignUp;
