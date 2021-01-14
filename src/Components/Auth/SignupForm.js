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
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function SignUp() {
  const { setUser } = useContext(userContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(values) {
    const { data, error } = await client("/signup", "POST", { body: values });
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
          css={{ marginBottom: "15px", width: "110px" }}
        />
      </Link>

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
          <AuthFormLabel htmlFor="first_name">First Name</AuthFormLabel>
          <FormInput
            name="first_name"
            type="text"
            placeholder="your first name is ..."
          ></FormInput>

          <AuthFormLabel htmlFor="last_name">Last Name</AuthFormLabel>
          <FormInput
            name="last_name"
            type="text"
            placeholder="your last name is ..."
          ></FormInput>

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
