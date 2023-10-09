import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import myLogo from "../assets/my-logo-pink1.png";
import {VscHeartFilled } from "react-icons/vsc";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const [openHamburger, setOpenHamburger] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;


  function overflowDisable() {
    if (openHamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "hidden";
    }
  }

  const navigateToTab = (route : string) =>{
    setActiveTab(route);
    setOpenHamburger(false);
    navigate(route);
  }

  useEffect(()=>{
    overflowDisable();
  },[openHamburger])
  return (
    <div className='navbar-container'>
        <div className='logo-wrapper'>
          {/* <img src={myLogo} id='myLogo' alt='OnlyTheVibez Logo'/> */}
          <VscHeartFilled id='myLogo-heart'/>
          <div>
            <p>Only</p>
            <p>The</p>
            <p>Vibez</p>
          </div>
        </div>
        <button className={`menu-toggle ${openHamburger ? "is-active" : "closeHam"}`} onClick={(e) => setOpenHamburger(!openHamburger)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar-links ${openHamburger ? "ham-active" : ""}`}>
            <li className={` ${location === '/' ? "activeEatTab" : "nonActiveTab"}`} onClick={()=>navigateToTab('/')}>EAT</li>
            <li className={`${location === '/todo' ? "activeDoTab" : "nonActiveTab"}`} onClick={()=>navigateToTab('todo')}>DO</li>
            <li className={` ${location === '/about' ? "activeAboutTab" : "nonActiveTab"}`} onClick={()=>navigateToTab('about')}>ABOUT</li>
        </ul>
        
    </div>
  )
}

export default Navbar