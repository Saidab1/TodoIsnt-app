/**@jsx jsx */
import React, { useContext } from "react";
import { Modal, ModalOverlay, ModalFooter, Divider } from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  ModalHeaderWrapper,
  ModalWrapper,
  ModalFormContent,
  Label,
  AddProjectInput,
  SubmitButton,
} from "../StyledComponents";
import Select from "react-select";
import chroma from "chroma-js";
import { COLOROPTIONS } from "../ColorsOptions";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function CreateProjectForm({ openModal, closeModal, onSubmit, initialValues }) {
  const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,

        ":active": {
          ...styles[":active"],
          backgroundColor: isSelected ? data.color : color.alpha(0.3).css(),
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const SelectField = ({ field, form }) => (
    <Select
      defaultValue={initialValues.color}
      options={COLOROPTIONS}
      styles={colourStyles}
      name={field.name}
      value={
        COLOROPTIONS
          ? COLOROPTIONS.find((option) => option.value === field.value)
          : ""
      }
      onChange={(option) => form.setFieldValue(field.name, option.value)}
    />
  );

  const {user} = useContext(userContext);

  async function handleSubmit(values) {
  
    if(initialValues.id) {
      const {data, error}= await client(`/projects/${initialValues.id}`, "PATCH", {body: {...values}, user: {token: `${user.token}`}});
      if (data) {
        onSubmit(data);
        closeModal();
      } else {
        console.log(error);
      }
    } else {
     const {data, error} = await client(`/projects`, "POST", {body: {...values, ...{user_id: user.id}}, user: {token: `${user.token}`}});
  
      if (data) {
        onSubmit(data);
        closeModal();
      } else {
        console.log(error);
      }
    }
    
  }

  return (
    <React.Fragment>
      <Modal onClose={closeModal} isOpen={openModal} isCentered>
        <ModalOverlay />
        <ModalWrapper>
          <ModalHeaderWrapper>
            <span>Add Project</span>{" "}
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeModal}
              css={{ cursor: "pointer" }}
            />
          </ModalHeaderWrapper>
          <Divider
            borderColor="#ddd"
            orientation="horizontal"
            width="100%"
            marginTop="0px"
          />
          <ModalFormContent>
            <Formik
              initialValues={{
                name: initialValues.name,
                color: initialValues.color,
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <Label htmlFor="name"> Project name</Label>
                <AddProjectInput
                  type="text"
                  name="name"
                  placeholder="Project name"
                />

                <Label htmlFor="color"> Project Color</Label>
                <AddProjectInput
                  name={"color"}
                  component={SelectField}
                  options={COLOROPTIONS}
                ></AddProjectInput>
                <ModalFooter>
                  <SubmitButton type="submit">
                    {initialValues.name ? "Save" : "Add"}
                  </SubmitButton>
                  <button
                    type="button"
                    onClick={closeModal}
                    css={{
                      border: "1px solid #ddd",
                      backgroundColor: "f3f3f3",
                      width: "68px",
                      fontWeight: "700",
                    }}
                  >
                    Cancel
                  </button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalFormContent>
        </ModalWrapper>
      </Modal>
    </React.Fragment>
  );
}

export default CreateProjectForm;
