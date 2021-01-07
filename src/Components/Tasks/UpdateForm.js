/**@jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Formik, ErrorMessage } from "formik";
import {
  TaskFormContainer,
  TaskInput,
  SubmitButton,
  CancelButton,
} from "../StyledComponents";
import * as Yup from "yup";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UpdateForm({ onCancel, task, update, deleteTask }) {
  function handleSubmit(taskUpdated) {
    update({ ...{ id: task.id }, ...taskUpdated });
    onCancel();
  }

  function handleDeleteaTask() {
    deleteTask(task.id);
  }

  return (
    <Formik
      initialValues={{ body: task.body }}
      validationSchema={Yup.object({
        task: Yup.string().min(
          3,
          "The task must be at least 3 characters long"
        ),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <TaskFormContainer
        css={{ marginBottom: "16px", paddingTop: "16px", marginTop: "0px" }}
      >
        <TaskInput name="body" type="text" />
        <div css={{ color: "red", marginBottom: "4px" }}>
          <ErrorMessage name="body" />
        </div>
        <div css={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <SubmitButton type="submit" css={{ width: "76px" }}>
              {" "}
              Update
            </SubmitButton>
            <CancelButton type="button" onClick={() => onCancel()}>
              Cancel
            </CancelButton>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            css={{ alignSelf: "center", marginRight: "5px", cursor: "pointer" }}
            onClick={() => handleDeleteaTask()}
          />
        </div>
      </TaskFormContainer>
    </Formik>
  );
}

export default UpdateForm;
