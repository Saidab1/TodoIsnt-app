/**@jsx jsx */
import React, { useState, useEffect} from "react";
import "./App.css";
import { jsx } from "@emotion/core";
import logo from "./Images/logo.svg";
import {
  SideBarButton,
  SideBarItem,
  HeaderLink,
  Header,
  MenuHomeWrapper,
} from "./Components/StyledComponents";
import SideBar from "./Components/SideBar";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Tasks from "./Components/Tasks/Tasks";
import { useDisclosure } from "@chakra-ui/core";
import ProjectForm from "./Components/Projects/ProjectForm";
import Project from "./Components/Projects/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "./Components/Auth/SignupForm";
import Login from "./Components/Auth/LoginForm";
import Landing from "./Components/Landing";
import { COLOROPTIONS } from "./Components/ColorsOptions";
import { userContext } from "./UserContext";
import { client } from "./Services/AppService";
import { mediaQueries } from "./Components/StyledComponents";

function App() {
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    async function userProjects() {
      if (!user) return;
      const response = await client("/projects", "GET", {
        user: { token: `${user.token}` },
      });
      if (response.data) {
        setProjects(response.data);
      } 
    }
    userProjects();
  }, [user]);

  useEffect(() => {
    async function projecttasks() {
      if (!user) return;
      const response = await client("/tasks", "GET", {
        user: { token: `${user.token}` },
      });
      if (response.data) {
        setTasks(response.data);
      }
    }
    projecttasks();
  }, [user]);


  const [showMenu, setShowMenu] = useState(true);

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

 

  function handleTasks(task) {
    const currentTasks = [...tasks];
    currentTasks.push(task);
    setTasks(currentTasks);
  }

  async function handleTaskUpdates(taskUpdate) {
    let taskUpdated;
    const { data, error } = await client(`/tasks/${taskUpdate.id}`, "PATCH", {
      body: taskUpdate,
      user: { token: `${user.token}` },
    });

    if (data) {
      taskUpdated = data;
    } else {
      console.log(error);
    }
    const allTasks = tasks.map((task) => {
      if (task.id === taskUpdated.id) {
        return { ...task, ...taskUpdated };
      }
      return task;
    });
    setTasks(allTasks);
  }

  async function deleteATask(id) {
    await client(`/tasks/${id}`, "DELETE", {
      user: { token: `${user.token}` },
    });
    const allTasks = tasks.filter((task) => task.id !== id);
    setTasks(allTasks);
  }

  function handleProjects(project) {
    const currentsProjects = [...projects];
    currentsProjects.push(project);
    setProjects(currentsProjects);
  }

  function handleProjectUpdates(projectUpdates) {
    const allProjects = projects.map((project) => {
      if (project.id === projectUpdates.id) {
        return { ...project, ...projectUpdates };
      }
      return project;
    });
    setProjects(allProjects);
  }

  async function deleteAProject(id) {
    await client(`/projects/${id}`, "DELETE", {
      user: { token: `${user.token}` },
    });
    const allProjects = projects.filter((project) => project.id !== id);
    setProjects(allProjects);
    setTasks(tasks.filter((task) => task.project_id !== id));
  }

  async function handleLogOut() {
    await client("/logout", "POST", { user: { token: `${user.token}` } });
    localStorage.removeItem("User");
    setUser(null);
    history.push("/");
  }

  return (
    <userContext.Provider value={{ user, setUser }}>
      <div>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          {user ? (
            <Route path="/app">
              <Header
                css={{
                  width: "100%",
                  [mediaQueries[0]]: { padding: "10px 20px" },
                }}
              >
                <MenuHomeWrapper>
                  <FontAwesomeIcon
                    icon={faBars}
                    css={{ cursor: "pointer" }}
                    onClick={() => setShowMenu(!showMenu)}
                  />

                  <img
                    src={logo}
                    css={{ [mediaQueries[0]]: { width: "100px" } }}
                    alt="todo isnt logo"
                  />
                </MenuHomeWrapper>
                <div
                  css={{
                    width: "180px",
                    display: "flex",
                    justifyContent: "space-between",
                    [mediaQueries[0]]: { width: "100px", paddingTop: "5px" },
                  }}
                >
                  <div
                    css={{
                      alignSelf: "flex-end",
                      color: "#fff",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      css={{ marginRight: "5px" }}
                    />
                    <span>{user.first_name}</span>
                  </div>
                  <div>
                    <HeaderLink
                      to="/"
                      css={{
                        fontSize: "17px",
                        [mediaQueries[0]]: { display: "contents" },
                      }}
                      onClick={handleLogOut}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faSignOutAlt} />{" "}
                      <span css={{ [mediaQueries[0]]: { display: "none" } }}>
                        Log out
                      </span>
                    </HeaderLink>
                  </div>
                </div>
              </Header>
              <div css={{display: 'flex'}}>
                {showMenu && (
                  <SideBar onClose={() => setShowMenu(!showMenu)}>
                    <React.Fragment>
                      {projects.length > 0 &&
                        projects.map((project) => (
                          <Project
                            project={project}
                            key={project.id}
                            onEdit={handleProjectUpdates}
                            onDelete={deleteAProject}
                          />
                        ))}
                      <SideBarButton onClick={onOpen}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faPlus}
                          css={{
                            height: "14px",
                            marginRight: "14px",
                            marginTop: "6px",
                          }}
                        />{" "}
                        <SideBarItem>Add Project</SideBarItem>
                      </SideBarButton>
                    </React.Fragment>
                  </SideBar>
                )}
                <ProjectForm
                  openModal={isOpen}
                  closeModal={onClose}
                  onSubmit={handleProjects}
                  initialValues={{
                    name: "",
                    color: COLOROPTIONS[0].value,
                  }}
                />
                <Switch>
                  <Route exact path="/app/inbox">
                    <Tasks
                      projects={projects}
                      allTasks={tasks}
                      tasks={handleTasks}
                      handleDeleteTasks={deleteATask}
                      updateTask={handleTaskUpdates}
                    />
                  </Route>

                  <Route exact path="/app/projects/:id">
                    {({ match }) => (
                      <Tasks
                        key={match.params.id}
                        projects={projects}
                        allTasks={tasks}
                        tasks={handleTasks}
                        handleDeleteTasks={deleteATask}
                        updateTask={handleTaskUpdates}
                      />
                    )}
                  </Route>
                </Switch>
              </div>
            </Route>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </div>
    </userContext.Provider>
  );
}

export default App;
