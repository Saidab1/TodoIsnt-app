/**@jsx jsx */
import React, { useContext } from 'react'; 
import {jsx} from '@emotion/core';
import Logo from '../Images/logo.svg';
import { HeaderLanding, HeaderLink, LandingTitle, LandingButton } from './StyledComponents';
import LandingImg from '../Images/Landing-img.png';
import { userContext } from '../UserContext';
import { Redirect } from 'react-router-dom';


function Landing() {
  const {user} = useContext(userContext);
  
  if(user) return <Redirect to="/app/inbox"/>
  return(
    <div>
      <div css={{width: "100%", backgroundColor: "#119b9d"}}>
      <HeaderLanding>
        <img src={Logo} alt="Todo isnt logo"/>
        <nav>
          <HeaderLink to="/login" css={{marginRight: "30px"}}>Login</HeaderLink>
          <HeaderLink to="/signup">Sign Up</HeaderLink>
        </nav>
      </HeaderLanding>
      </div>
      <div css={{width: "1088px", margin: "50px auto", display: "flex", justifyContent: "space-between"}}>
        <div css={{width: "483px"}}>
          <LandingTitle>Organize it all with TodoIsnt</LandingTitle>
          <LandingButton to="/signup">Get Started</LandingButton>
        </div>
        <img src={LandingImg} alt="People get organized with todoIsnt" css={{marginTop: "80px", width: "696px"}}/>
      </div>
    </div>

  )

}

export default Landing