/**@jsx jsx */
import { useRef, useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  SideBarItem,
  SideBarButton,
  ArrowSideBarItem,
  StyledLink,
  mediaQueries,
} from "./StyledComponents";

function SideBar({ children, onClose }) {
  const [openList, setOpenList] = useState(false);
  const sideBarRef = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!sideBarRef.current) return;

      if (!sideBarRef.current.contains(event.target)) {
        if (window.matchMedia(`(max-width: 767px)`).matches) {
          onClose();
        }
      }
    };
    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  });

  return (
    <div
      ref={sideBarRef}
      css={{
        width: "305px",
        marginRight: "31px",
        backgroundColor: "#fafafa",
        height: "calc(100vh - 44px)",
        paddingTop: "25px",
        [mediaQueries[0]]: {
          position: "absolute",
        },
      }}
    >
      <StyledLink to="/app/inbox">
        <SideBarButton
          css={{
            marginBottom: "16px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faInbox}
            css={{ height: "18px", marginRight: "11px", alignSelf: "center" }}
          />
          <SideBarItem css={{ margin: "0" }}>Inbox</SideBarItem>
        </SideBarButton>
      </StyledLink>
      <SideBarButton onClick={() => setOpenList(!openList)}>
        <ArrowSideBarItem icon={faChevronRight} open={openList} />
        <SideBarItem css={{ margin: "0" }}>Projects</SideBarItem>
      </SideBarButton>
      {openList && children}
    </div>
  );
}

export default SideBar;
