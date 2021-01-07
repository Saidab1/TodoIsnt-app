/**@jsx jsx*/
import React, { useState} from "react";
import { jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { TaskWrapper, TaskItemContainer, Task } from "../StyledComponents";
import UpdateForm from "./UpdateForm";


function TaskItem({ value, taskStatus, onCancel, deleted }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditATask() {
    setIsEditing(!isEditing);
  }

  async function uncompleteATask() {
    taskStatus( { ...value, ...{ completed: false } })
  }

  function completeATask() {
    taskStatus({ ...value, ...{ completed: true } })
  }

  return (
    <TaskWrapper completedTask={value.completed} isEditing={isEditing}>
      {isEditing && !value.completed ? (
        <UpdateForm
          onCancel={handleEditATask}
          task={value}
          update={taskStatus}
          deleteTask={deleted}
        ></UpdateForm>
      ) : (
        <TaskItemContainer>
          {value.completed ? (
            <FontAwesomeIcon
              className="task-icon"
              css={{
                alignSelf: "center",
                height: "20px",
              }}
              icon={faCheckCircle}
              onClick={() => uncompleteATask()}
            />
          ) : (
            <div className="icons">
              <FontAwesomeIcon
                className="task-icon task-icon-unchecked "
                css={{ alignSelf: "center", height: "20px" }}
                icon={faCircle}
              />
              <FontAwesomeIcon
                className="task-icon task-icon-check"
                css={{ alignSelf: "center", height: "20px" }}
                icon={faCheckCircle}
                onClick={() => completeATask()}
              />
            </div>
          )}
          <Task
            completedTask={value.completed}
            onClick={() => !value.completed && handleEditATask()}
            isEditing={isEditing}
          >
            {value.body}
          </Task>
        </TaskItemContainer>
      )}
    </TaskWrapper>
  );
}

export default TaskItem;
