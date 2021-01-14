/**@jsx jsx */
import { useContext } from "react";
import { jsx } from "@emotion/core";
import Logo from "../Images/logo.svg";
import {
  Header,
  HeaderLink,
  LandingTitle,
  LandingButton,
  mediaQueries,
} from "./StyledComponents";
import LandingImg from "../Images/Landing-img.png";
import { userContext } from "../UserContext";
import { Redirect } from "react-router-dom";

function Landing() {
  const { user } = useContext(userContext);

  if (user) return <Redirect to="/app/inbox" />;
  
  return (
    <div>
      <div css={{ width: "100%", backgroundColor: "#119b9d" }}>
        <Header>
          <img src={Logo} alt="Todo isnt logo" />
          <nav>
            <HeaderLink to="/login" css={{ marginRight: "30px" }}>
              Login
            </HeaderLink>
            <HeaderLink to="/signup">Sign Up</HeaderLink>
          </nav>
        </Header>
      </div>
      <div
        css={{
          maxWidth: "1080px",
          width: "90%",
          margin: "50px auto",
          display: "flex",
          justifyContent: "space-between",
          [mediaQueries[1]]: {
            width: "87%",
          },
          [mediaQueries[0]]: {
            flexDirection: "column",
            width: "80%",
            margin: "20px auto",
          },
        }}
      >
        <div
          css={{
            width: "483px",
            [mediaQueries[0]]: { width: "240px", margin: " auto", order: "1" },
          }}
        >
          <LandingTitle>Organize it all with TodoIsnt</LandingTitle>
          <LandingButton to="/signup">Get Started</LandingButton>
        </div>
        <img
          src={LandingImg}
          alt="People get organized with todoIsnt"
          css={{
            marginTop: "80px",
            width: "686px",
            [mediaQueries[0]]: {
              width: "280px",
              order: "0",
              display: "block",
              margin: "40px auto 10px",
            },
            [mediaQueries[1]]: { width: "400px" },
          }}
        />
      </div>
    </div>
  );
}

export default Landing;
