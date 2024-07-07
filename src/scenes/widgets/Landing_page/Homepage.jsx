import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Ensure this CSS file is created
import img_nature_wide from "./bi.jpg";
import img_snow_wide from "./bill.jpg" ;
import img_mountains_wide from"./ls.jpg";
import { Avatar, Box, Typography } from '@mui/material';
import { ReactTyped } from "react-typed";
import doc from "./doctor.png";
import pharma from "./pharmacie.png";
import patient from "./patient.png";
import lab from "./lab.png";
import logo from "./logo.png";
import { Form, Button, FloatingLabel, FormControl } from 'react-bootstrap';
import { HomeIcon, Bars3Icon, KeyIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import {Divider} from "@mui/material";
import {fadeIn} from "./variants.jsx";
import { motion } from 'framer-motion';
const fadeInVariants = fadeIn("up", 0, 2);

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { src: img_nature_wide},
    { src: img_snow_wide },
    { src: img_mountains_wide }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const navigate = useNavigate(); 

  const  handleClick2 = () => {
    navigate("/login");
  };
  const handleClickp = () => {
    navigate("/login");
  };
  const handleClick3 = () => {
    navigate("/login");
  };

  const handleClick4 = () => {
    navigate(`/login`);
  };
  return (
    <>
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>


               <nav class="navbar navbar-expand-lg navbar-light bg-light border border-light rounded" id="navbarResponsive">
                  <div class="container-fluid">  
                        <a href="#" class=""
                            ><img src={logo}   alt="" class="img-fluid w-60"
                        /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <span>
                            <div class="collapse navbar-collapse" id="navbarMenu">
                                <ul class="navbar-nav ms-2">
                                <li className="nav-item">
                                <button  onClick={handleClick4}className="transparent-button">
  <a  className="nav-link d-flex align-items-center">
    <HomeIcon className="me-2" style={{ width: '16px', height: '16px' }} /> Home
  </a>
  </button>
</li>            
<li className="nav-item">
<button  onClick={handleClick4}className="transparent-button">
  <a  className="nav-link d-flex align-items-center">
    <UserCircleIcon className="me-2" style={{ width: '16px', height: '16px' }}  /> Sign Up
  </a>
  </button>
</li>     
<li className="nav-item">
  <button  onClick={handleClick4}className="transparent-button">
  <a  className="nav-link d-flex align-items-center">
    <KeyIcon className="me-2" style={{ width: '16px', height: '16px' }}  /> Sign In
  </a>
  </button>
</li> 
<li className="nav-item">
  <a href="#contact" className="nav-link d-flex align-items-center">
   Contact Us
  </a>
</li> 
                                </ul>
                            </div>
                            </span>
                   </div>
                </nav>

             


    <div className="slideshow-container">
      <div className="welcome-container">
        <div className="welcome-message">WELCOME TO MEDILINK</div>
        <Typography  fontSize={20} sx={{ marginBottom: '40px', color: '#2a0e5e' }}>
      <b>Your comprehensive health management solution </b>
    </Typography>
            <a  className="get-started-button" onClick={handleClick2}> Let's Get Started</a>
      </div>
      {slides.map((slide, index) => (
        <div className={`mySlides fade ${index === slideIndex ? 'active' : ''}`} key={index} style={{ display: index === slideIndex ? 'block' : 'none' }}>
          <div className="numbertext">{index + 1} / {slides.length}</div>
          <img src={slide.src} style={{ width: '100%' }} alt={`Slide ${index + 1}`} />
          <div className="text">{slide.caption}</div>
        </div>
      ))}
      <br />
      <div style={{ textAlign: 'center' }}>
        {slides.map((_, index) => (
          <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(index)}></span>
        ))}
      </div>
    </div>



   
    <motion.h1
    className="display-3 font-weight-bold pt-3 pb-1 d-flex justify-content-center align-items-center"
    variants={fadeIn("up", 0, 2)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.7 }}
    > 
      Join Us As
    </motion.h1>
    <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 2rem' }}>
  <div className="row">
    
    {/* Section 1: Doctors */}
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="section card p-4 h-100" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}>
      <img className="bg-white position-relative d-block mx-auto" src={doc} alt="/" style={{ top: '-20px', width: '40%' }} />
      <h2 className="text-center mb-4" style={{ color: '#2b2b2b', fontSize: '2rem' }}>Doctors</h2>
        <div className="content text-center mb-4">
          <p className="mb-2 border-bottom">Streamline patient care with secure access to comprehensive medical records and treatment histories.</p>
          <p className="mb-2 border-bottom">Foster patient-doctor communication with secure messaging, ensuring timely responses and informed care.</p>
          <p className="mb-1 border-bottom">Stay alert with real-time alerts for medical emergencies</p>
        </div>
        <button className="btn btn-dark w-100 " style={{ borderRadius: '5px', fontSize: '1rem', fontWeight: '600' }}>Start Trial</button>
      </div>
    </div>
   {/* Section 2: Pharmacists */}
   <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="section card p-4 h-100" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}>
      <img className="bg-white position-relative d-block mx-auto" src={pharma} alt="/" style={{ top: '-20px', width: '40%' }} />
        <h2 className="text-center mb-4" style={{ color: '#2b2b2b', fontSize: '2rem' }}>Pharmacists</h2>
        <div className="content text-center mb-4">
          <p className="mb-2 border-bottom">Ensure accurate medication management with easy access to patient prescriptions and detailed medication reviews.</p>
          <p className="mb-2 border-bottom">Provide reliable medication advice</p>
          <p className="mb-2 border-bottom pb-2"> ensure availability and timely replenishment of essential medicines..</p>
        </div>
        <button onClick={handleClick4} className="btn btn-dark w-100" style={{ borderRadius: '5px', fontSize: '1rem', fontWeight: '600' }}>Start Trial</button>
      </div>
    </div>

    {/* Section 3: Laboratories */}
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="section card p-4 h-100" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}>
      <img className="bg-white position-relative d-block mx-auto" src={lab} alt="/" style={{ top: '-20px', width: '40%' }} />
      <h2 className="text-center mb-4" style={{ color: '#2b2b2b', fontSize: '2rem' }}>Laboratories</h2>
        <div className="content text-center mb-4">
          <p className="mb-2 border-bottom">Deliver test results securely and promptly, ensuring swift access for patients and healthcare providers.</p>
          <p className="mb-2 border-bottom">Facilitate seamless communication with patients regarding test outcomes and health implications.</p>
          <p className="mb-2 border-bottom pb-3">Support better patient outcomes.</p>
        </div>
        <button onClick={handleClick3} className="btn btn-dark w-100" style={{ borderRadius: '5px', fontSize: '1rem', fontWeight: '600' }}>Start Trial</button>
      </div>
    </div>

    {/* Section 4: Patients */}
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="section card p-4 h-100" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}>
      <img className="bg-white position-relative d-block mx-auto" src={patient} alt="/" style={{ top: '-20px', width: '40%' }} />
      <h2 className="text-center mb-4" style={{ color: '#2b2b2b', fontSize: '2rem' }}>Patients</h2>
        <div className="content text-center mb-4">
          <p className="mb-2 border-bottom">Take charge of your health journey with easy access to medical records and personalized care</p>
          <p className="mb-2 border-bottom">Track your medications effortlessly, get timely reminders,and ensure safe use with detailed information</p>
          <p className="mb-2 border-bottom">Communicate with your doctor, pharmacy, and laboratory.</p>
        </div>
        <button onClick={handleClickp} className="btn btn-dark w-100" style={{ borderRadius: '5px', fontSize: '1rem', fontWeight: '600' }}>Start Trial</button>
      </div>
    </div>
    
  </div>
</div>

  <div className="text-dark">
  <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
    <p className="text-muted font-weight-bold p-2">
    Embark on a journey of empowered healthcare management with Medilink    </p>
    <h1 className="display-3 font-weight-bold pt-3 pb-1">
      A Pioneering Platform.
    </h1>
    <div className="d-flex justify-content-center align-items-center">
      <p className="h2 font-weight-bold py-4">
    {/*Personalized Care, Anytime, Anywhere  */}
      <div>
            <ReactTyped 
              strings={['Personalized Care', 'Personalized Anytime','Personalized anywhere',]}
              typeSpeed={40}
              backSpeed={50}
              loop
            >           
              <input  type="text"   className="bg-transparent border-0"  />
            </ReactTyped>
            </div>
</p>
    </div>
    <p className="font-weight-bold text-secondary">
    Medilink is more than just an app; it's your partner in proactive health management, ensuring your well-being is always a priority.    </p>
    <p className="font-weight-bold text-secondary">
    Experience healthcare reimagined with Medilink – your trusted partner for a healthier tomorrow.
</p>
  </div>
</div>
 

<Container>
  <Row className="g-4">
    <Col sm={12} md={4}>
      <motion.hr 
        className="bg-primary rounded"
        style={{ height: '6px' }}
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      />
      <motion.h3
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="bg-primary rounded text-white"
      > 
        Developing Innovation
      </motion.h3>
      <motion.p 
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        We collaborate with your team to anticipate the future by exploring new technologies and pushing the boundaries of digital medical practices.
      </motion.p>
    </Col>
    <Col sm={12} md={4}>
      <motion.hr 
        className="bg-primary rounded"
        style={{ height: '6px' }}
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      />
      <motion.h2
        className="bg-primary rounded text-white"
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      > 
        Cultivating Resilience
      </motion.h2>
      <motion.p 
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        We continuously adapt Medilink to respond to a changing healthcare environment, reducing risks and ensuring effective adaptation to new standards and regulations.
      </motion.p>
    </Col>
    <Col sm={12} md={4}>
      <motion.hr 
        className="bg-primary rounded"
        style={{ height: '6px' }}
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      />
      <motion.h2
        className="bg-primary rounded text-white "
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      > 
        Improving Efficiency
      </motion.h2>
      <motion.p 
        variants={fadeIn("up", 0, 2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        We optimize the interaction between technology and human care to increase productivity, support your growth, and enhance the patient experience in the long term.
      </motion.p>
    </Col>
  </Row>
</Container>





 
<Footer/>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </>
  );
};

export default Slideshow;
