/**@jsx  jsx*/
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import {
  ContentTitle,
  AddTaskText,
  ShowCompletedButton,
  AddTaskButton,
  TasksContainer,
  AddTaskMessageContainer,
  AddTaskMessage,
} from "../StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import { useParams } from "react-router-dom";

function Tasks({ projects, tasks, handleDeleteTasks, updateTask, allTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [changeTextButton, setChangeTextButton] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  let { id = null  } = useParams();
  if(id !== null) {
    id = parseInt(id)
  }
  

  function handleShowForm(showform) {
    setShowForm(!showForm);
  }


  function handleShowMessage(task, options) {
    const selectedProject = options.find(
      (option) => option.id === task.project_id
    );

    setShowMessage(selectedProject.label);
  }

  const tasksToShow = allTasks.filter((task) => task.project_id === id);

  const completedTask = tasksToShow.filter((task) => task.completed);
  const uncompletedTasks = tasksToShow.filter((task) => !task.completed);

  

  return (
    <TasksContainer>
      <ContentTitle>Todos</ContentTitle>
      {uncompletedTasks.length > 0 &&
        uncompletedTasks.map((task) => (
          <TaskItem
            value={task}
            key={task.id}
            taskStatus={updateTask}
            onCancel={handleShowForm}
            deleted={handleDeleteTasks}
          />
        ))}
      {showForm ? (
        <AddTaskForm
          onCancel={handleShowForm}
          task={tasks}
          AllProjects={projects}
          currentTask={handleShowMessage}
        />
      ) : (
        <AddTaskButton onClick={() => handleShowForm()}>
          <FontAwesomeIcon
            icon={faPlus}
            css={{ marginRight: "8px", alignSelf: "center" }}
          />
          <AddTaskText>Add task</AddTaskText>
        </AddTaskButton>
      )}
      {completedTask.length > 0 && (
        <div css={{ textAlign: "right" }}>
          <ShowCompletedButton
            onClick={() => setChangeTextButton(!changeTextButton)}
          >
            {" "}
            {changeTextButton ? "Hide" : "Show completed"}{" "}
          </ShowCompletedButton>
        </div>
      )}
      {completedTask.length > 0 &&
        changeTextButton &&
        completedTask.map((task) => (
          <TaskItem value={task} key={task.id} taskStatus={updateTask} />
        ))}
      {showMessage.length > 0 ? (
        <AddTaskMessageContainer>
          {" "}
          <AddTaskMessage>
            Task added to{" "}
            <span css={{ textDecoration: "underline" }}>{showMessage}</span>
          </AddTaskMessage>{" "}
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowMessage("")}
            css={{ cursor: "pointer" }}
          />
        </AddTaskMessageContainer>
      ) : (
        ""
      )}
    </TasksContainer>
  );
}

export default Tasks;
