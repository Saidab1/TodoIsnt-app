/**@jsx jsx*/
import { useContext } from "react";
import { jsx } from "@emotion/core";
import { Formik, ErrorMessage, Field } from "formik";
import {
  TaskFormContainer,
  TaskInput,
  SubmitButton,
  CancelButton,
  AddTaskInputWrapper,
} from "../StyledComponents";
import * as Yup from "yup";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { userContext } from "../../UserContext";
import { client } from "../../Services/AppService";

function AddTaskForm({ onCancel, task, AllProjects, currentTask }) {
  const { user } = useContext(userContext);
  let { id = null } = useParams();
  if (id !== null) {
    id = parseInt(id);
  }

  const optionsN = AllProjects.map((project) => ({
    value: project.name.toLowerCase(),
    label: project.name,
    id: project.id,
  }));

  const options = [{ value: "inbox", label: "Inbox", id: null }].concat(
    optionsN
  );

  const projectSelected = options.find((option) => option.id === id);

  function SelectProject({ field, form }) {
    return (
      <Select
        defaultValue={projectSelected}
        css={{ width: "120px" }}
        options={options}
        name={field.name}
        value={
          options ? options.find((option) => option.value === field.value) : ""
        }
        onChange={(option) => form.setFieldValue(field.name, option.id)}
      />
    );
  }

  async function handleSubmit(values, actions) {
    if (values.project_id !== id) {
      currentTask(values, options);
    }

    const { data, error } = await client("/tasks", "POST", {
      body: { ...values, completed: false, user_id: user.id },
      user: { token: `${user.token}` },
    });

    if (data) {
      task(data);
      actions.resetForm();
    } else {
      console.log(error);
    }
  }

  return (
    <Formik
      initialValues={{ body: "", project_id: id }}
      validationSchema={Yup.object({
        body: Yup.string()
          .required("You need to add a task")
          .min(3, "The task must be at least 3 characters long"),
      })}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      <TaskFormContainer>
        <AddTaskInputWrapper>
          <TaskInput
            name="body"
            type="text"
            placeholder="write a todo..."
            css={{ border: "1px solid transparent" }}
          />
          <Field
            name={"project_id"}
            component={SelectProject}
            options={options}
          />
        </AddTaskInputWrapper>
        <div css={{ color: "red", marginBottom: "4px" }}>
          <ErrorMessage name="body" />
        </div>
        <div>
          <SubmitButton type="submit"> Add</SubmitButton>
          <CancelButton type="button" onClick={() => onCancel()}>
            Cancel
          </CancelButton>
        </div>
      </TaskFormContainer>
    </Formik>
  );
}

export default AddTaskForm;
