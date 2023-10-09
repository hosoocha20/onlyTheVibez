import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import {motion} from "framer-motion";
import {VscHeartFilled } from "react-icons/vsc";

const About = () => {
  return (
    <motion.div className='about-container' initial={{opacity:0}} animate={{opacity:1, transition: {duration: 1}}}>
      
        <div className="about-heading-wrapper">
          <h4>ABOUT US</h4>
              <h2>About Only The Vibez <span><VscHeartFilled color='#FF4D6D'/></span></h2>
              
            <p>Discovering the latest trends and hidden gems in Auckland. </p>
        </div>
        <div className='about-content'>
            <p>We dont gatekeep here.</p>
            <p>We curate and share the trendiest and hotspots in the vibrant heart of New Zealand's largest city. We understand that Auckland's food and culture landscape is constantly evolving, and we are committed to keeping you in the know about the freshest, most innovative, and trendiest places.</p>
            <p>Whether you're a local looking to discover a new favorite spot or a visitor eager to explore Auckland, we invite you to join us on a journey of taste, culture, and exploration.</p>
            <p>Stay on trend. Discover Auckland.</p>
            <p>Ngā mihi</p>
        </div>

        {/* <div className='contact-wrapper'>
            <HiOutlineMail size={"25px"}/>
            <a>onlythevibez.org</a>
        </div> */}
    </motion.div>
  )
}

export default About