/**@jsx jsx */
import { useContext, useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import { Divider } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormWrapper,
  FormButton,
  AuthFormLabel,
  FormInput,
  FormBottomMessage,
  FormLink,
  ErrorMessage,
} from "../StyledComponents";
import { ReactComponent as Logo } from "../../Images/logo.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function Login() {
  const { user, setUser } = useContext(userContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(values) {
    const { data, error } = await client("/login", "POST", { body: values });

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

  if (user) return <Redirect to="/app/inbox" />;

  return (
    <FormWrapper>
      <Link to="/">
        <Logo
          fill="black"
          stroke="black"
          css={{ marginBottom: "15px", width: "110px" }}
        />
      </Link>

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
          <AuthFormLabel htmlFor="email">Email</AuthFormLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="email@email.com"
          ></FormInput>

          <AuthFormLabel htmlFor="password">Password</AuthFormLabel>
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
    </FormWrapper>
  );
}

export default Login;
