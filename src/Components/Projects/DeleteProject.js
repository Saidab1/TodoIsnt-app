/**@jsx jsx */
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalFooter,
  Divider,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  MenuItem,
  ModalWrapper,
  DeleteConfirmationButton,
} from "../StyledComponents";

function DeleteProject({ project, closeMenu, deleteProject }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleButtonClick() {
    onOpen();
    closeMenu();
  }

  function handleDeleteProject() {
    deleteProject(project.id);
    onClose();
  }

  return (
    <React.Fragment>
      <MenuItem onClick={()=>handleButtonClick()} css={{ "&:hover": { color: "red" } }}>
        <FontAwesomeIcon icon={faTrashAlt} css={{ marginRight: "5px" }} />{" "}
        <span css={{ verticalAlign: "middle" }}>Delete</span>
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} css={{ width: "400px" }}>
        <ModalOverlay />
        <ModalWrapper>
          <ModalHeader
            css={{ padding: "24px 24px 10px 34px", fontSize: "20px" }}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </ModalHeader>
          <ModalBody css={{ padding: "5px 24px" }}>
            <p css={{ textAlign: "center" }}>
              Are you sure you want to delete{" "}
              <strong>{project.name}</strong>?
            </p>
          </ModalBody>
          <Divider
            borderColor="#bbbfca"
            orientation="horizontal"
            width="100%"
            marginTop="20px"
          />
          <ModalFooter css={{ padding: "20px" }}>
            <DeleteConfirmationButton
              onClick={onClose}
              css={{
                border: "1px solid #ddd",
                backgroundColor: "f3f3f3",
              }}
            >
              Cancel
            </DeleteConfirmationButton>
            <DeleteConfirmationButton
              onClick={() => handleDeleteProject()}
              css={{
                marginLeft: "10px",
                backgroundColor: "#db4c3f",
                color: "#fff",
                border: " 1px solid transparent",
              }}
            >
              Delete
            </DeleteConfirmationButton>
          </ModalFooter>
        </ModalWrapper>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteProject;
