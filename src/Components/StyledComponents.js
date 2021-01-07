import React from "react";
import styled from "@emotion/styled";
import { Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContent, ModalBody, ModalHeader, Divider } from "@chakra-ui/core";
import { NavLink, Link } from "react-router-dom";

const MainContainer = styled.div``;

const ContentContainer = styled.div`
  display: flex;
`;

const TasksContainer = styled.div`
  width: 800px;
  margin: auto;
  font-family: "Lato", sans-serif;
  margin-top: 56px;
`;

const ContentTitle = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #119b9d;
  margin-bottom: 30px;
  margin-top: 0px;
`;

const AddTaskText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
  margin: 0px;
`;

const AddTaskButton = styled.div`
  display: flex;
  background-color: #fdbd59;
  width: 104px;
  padding: 7px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
`;

const ShowCompletedButton = styled.button`
  font-family: "Lato", sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  background-color: #119b9d;
  width: 150px;
  padding: 5px;
  color: white;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 46px;
  border-style: none;
  margin-top: 53px;
`;

const TaskFormContainer = styled(Form)`
  width: 100%;
  margin-top: 16px;
`;

const AddTaskInputWrapper = styled.div`
  width: 100%;
  border: 1px solid #a6a6a4;
  border-radius: 4px;
  height: 100px;
  padding: 8px;
  margin-bottom: 5px;
`;

const TaskInput = styled(Field)`
  width: 100%;
  height: 34px;
  margin-bottom: 8px;
  border: 1px solid #1a202c;
  border-radius: 4px;
  padding-left: 6px;
  ::placeholder {
    font-size: 16px;
  }
  :focus {
    outline-color: transparent;
  }
`;

const Button = styled.button`
  border-style: none;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  font-style: normal;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 53px;
  border-radius: 4px;
  padding: 5px 12px;
  height: 34px;
  margin-right: 12px;
  color: #ffffff;
  background-color: #119b9d;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border-style: none;
`;

const TaskWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #119b9d;
  height: ${(props) => (props.isEditing ? "108px" : "56px")};
  padding: ${(props) => (props.isEditing ? "none" : "18px 0 18px 12px")};
  opacity: ${(props) => (props.completedTask ? "0.5" : "none")};
`;

const TaskItemContainer = styled.div`
  display: flex;
`;

const Task = styled.p`
  margin: 0 0 0 12px;
  font-size: 17px;
  line-height: 24px;
  color: #2d3748;
  text-decoration: ${(props) =>
    props.completedTask ? "line-through" : "none"};
  cursor: ${(props) => !props.completedTask && "pointer"};
`;

const SideBarButton = styled.button`
  width: 100%;
  height: 39px;
  border-style: none;
  display: flex;
  background-color: transparent;
  padding: 8px 10px 7px 40px;
  cursor: pointer;

  &:hover {
    background-color: #edf2f7;
  }
`;

const SideBarItem = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: bold;
  color: #000000;
  margin: 0px;
`;

const ArrowSideBarItem = styled(FontAwesomeIcon)`
  height: 12px;
  margin-right: 14px;
  margin-top: 6px;
  transform: ${(props) => (props.open ? "rotate(90deg)" : "rotate(0deg)")};
`;

const ModalHeaderWrapper = styled(ModalHeader)`
  font-family: "Lato", sans-serif;
  font-size: 18px;
  padding: 24px 24px 10px;
  font-weight: bold;
  background-color: #fafafa;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`;

const ModalWrapper = styled(ModalContent)`
  width: 400px;
  border-radius: 15px;
`;

const ModalFormContent = styled(ModalBody)`
  padding: 5px 24px;
`;

const Label = styled.label`
  display: block;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000000;
`;

const AddProjectInput = styled(Field)`
  width: 100%;
  height: 38px;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 8px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

const AddTaskMessageContainer = styled.div`
  width: 230px;
  box-shadow: 0 0 20px lightgray;
  border-radius: 5px;
  display: flex;
  padding: 10px 15px;
  margin: auto;
  justify-content: space-between;
  color: #ffffff;
  background-color: #119b9d;
  margin-top: 25px;
`;

const AddTaskMessage = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const ProjectMenuWrapper = styled.div`
  width: 250px;
  background-color: #ffffff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid #ddd;
  position: absolute;
  right: -200px;
`;

const MenuItemsWrapper = styled.ul`
  list-style: none;
  padding: 8px 10px 8px 18px;
  margin: 0px;
`;

const MenuItem = styled.li`
  width: 100%;
  height: 32px;
  padding: 6px 10px;
  color: #333;
  font-weight: normal;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #edf2f7;
  }
`;

const DeleteConfirmationButton = styled.button`
  width: 68px;
  font-weight: 700;
  padding: 6px 12px 7px;
  border-radius: 3px;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: 452px;
  border: 1px solid #dbdbdb; 
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  margin: 50px auto;
`;

const FormTitle = styled.h1`
  font-size: 26px;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  color: #119b9d;
  margin: 0 0 30px;
`;

const FormButton = styled.button`
  width: 100%;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 15px;
  display: block;
  padding: 6px;
  margin-bottom: 20px;
  height: 38px;
  font-weight: bold;
  background-color: #fff;
  cursor: pointer;
`;

const FormSeparator = styled(Divider)`
width: 178px;
 color: #cbbcb1;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: bold;
`;

const FormInput = styled(Field)`
  width: 100%;
  height: 36px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  padding: 5px;
`;

const FormBottomMessage = styled.p`
  text-align: center;
  margin-top: 35px;
  font-weight: bold;
`;

const FormLink = styled(Link)`
   color: #119b9d;
   margin-left: 5px;
`;

const HeaderLanding = styled.header`
 width: 1088px;
 height: 64px;
 margin: 0 auto;
 background-color:  #119b9d;
 display: flex;
 padding: 10px 50px;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-weight: 400;

  &:hover {
    font-weight: bold;
  };
`;

const LandingTitle = styled.h1`
  font-size: 80px;
  font-family: "Lato", sans-serif;
  line-height: 84px;
  text-align: center;
  font-weight: 600;
`;

const LandingButton = styled(Link)`
  width:163px;
  background-color: #119b9d;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  height: 44px;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  margin: auto;
  display: block;
`;

const HeaderApp = styled.header`
 background-color: #119b9d;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;




export {
  MainContainer,
  ContentContainer,
  TasksContainer,
  ContentTitle,
  AddTaskText,
  ShowCompletedButton,
  AddTaskButton,
  TaskFormContainer,
  TaskInput,
  SubmitButton,
  CancelButton,
  TaskWrapper,
  TaskItemContainer,
  Task,
  SideBarButton,
  SideBarItem,
  ArrowSideBarItem,
  ModalHeaderWrapper,
  ModalWrapper,
  ModalFormContent,
  Label,
  AddProjectInput,
  StyledLink,
  AddTaskInputWrapper,
  AddTaskMessageContainer,
  AddTaskMessage,
  ProjectMenuWrapper,
  MenuItem,
  MenuItemsWrapper,
  DeleteConfirmationButton,
  FormWrapper,
  FormTitle,
  FormButton,
  FormSeparator,
  FormLabel,
  FormInput,
  FormBottomMessage,
  FormLink,
  HeaderLanding,
  HeaderLink,
  LandingTitle,
  LandingButton,
  HeaderApp,
  ErrorMessage,
};
