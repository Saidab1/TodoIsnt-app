/**@jsx jsx */
import { useState, useRef, useEffect } from "react";
import { jsx } from "@emotion/core";
import {
  StyledLink,
  SideBarButton,
  SideBarItem,
  ProjectMenuWrapper,
  MenuItemsWrapper,
  MenuItem,
} from "../StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { Divider, useDisclosure } from "@chakra-ui/core";
import ProjectForm from "./ProjectForm";
import DeleteProject from "./DeleteProject";

function Project({ project, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const listener = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, [showMenu]);

  function handleEditProject() {
    onOpen();
    setShowMenu(!showMenu);
  }

  return (
    <div css={{ position: "relative" }}>
      <StyledLink to={`/app/projects/${project.id}`}>
        <SideBarButton
          className="side-bar-button"
          css={{ justifyContent: "space-between" }}
        >
          {" "}
          <div css={{ display: "flex" }}>
            <FontAwesomeIcon
              icon={faCircle}
              css={{
                height: "14px",
                marginRight: "14px",
                marginTop: "6px",
                color: `${project.color}`,
              }}
            />{" "}
            <SideBarItem>{project.name}</SideBarItem>
          </div>
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="options"
            css={{ alignSelf: "center" }}
            onClick={() => setShowMenu(true)}
          />
        </SideBarButton>
      </StyledLink>

      <ProjectMenuWrapper ref={menuRef} hidden={!showMenu}>
        <MenuItemsWrapper>
          <MenuItem onClick={() => handleEditProject()}>
            <FontAwesomeIcon icon={faEdit} css={{ marginRight: "5px" }} />{" "}
            <span css={{ verticalAlign: "middle" }}>Edit</span>
          </MenuItem>
          <Divider css={{ color: "#cbbcb1" }} />
          <DeleteProject
            project={project}
            closeMenu={() => setShowMenu(!showMenu)}
            deleteProject={onDelete}
          />
        </MenuItemsWrapper>
      </ProjectMenuWrapper>

      <ProjectForm
        openModal={isOpen}
        closeModal={onClose}
        initialValues={{
          name: project.name,
          color: project.color,
          id: project.id,
        }}
        onSubmit={onEdit}
      />
    </div>
  );
}

export default Project;
