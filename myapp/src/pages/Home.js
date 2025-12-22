import heroImg from '../assets/hero-img.svg';
import Hero from '../assets/l34.png';
import { BsGraphUpArrow } from "react-icons/bs";
import { BsPiggyBank } from "react-icons/bs";
import { BsBarChartLine } from "react-icons/bs";
import { BsWallet2, BsCalendarCheck, BsShieldLock } from "react-icons/bs";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import About from '../components/about_us';
import Challenges from '../components/challenges';
import Why from '../components/why_us';
import Features from '../components/features';
import Contact from './Contact';

function Home() {
    return (
        <div className='dark-background'>
            {/* hero section */}
            <section id="hero" className="hero section dark-background ">
                <div className="container ">
                    <div className="row ">
                        <div className="col-lg-7 order-lg-last hero-img" data-aos="zoom-out" data-aos-delay="100">
                            <img  src={Hero} className="img-fluid animated p-4" alt="Hero Illustration" />
                            {/* <div className="row text-center">
                                <div className="col-lg-3 col-4 px-2">
                                    <div className="floating-card card-1" data-aos="zoom-in" data-aos-delay="600">
                                        <div className="row p-2">
                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                <BsGraphUpArrow
                                                    style={{
                                                        fontSize: "60px",
                                                        color: "white",
                                                        // background: "transparent",

                                                    }}
                                                />
                                            </div>
                                            <div className="col-8 text-center">
                                                <span className="card-label">Growth Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center" data-aos="fade-in">
                            <h1 className="heros-title mb-2">Your Money Your Way</h1>

                            <p>Budget better, spend smarter, stress less.</p>
                            <div className="d-flex">
                                <Link to="/login" className="btn-get-started">Get Started</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* about section */}
            <About />
            {/* challenges section */}
            <Challenges />
            {/* why us */}
            <Why />
            {/* our services */}
            <Features/>
          
        </div>
    );
}

export default Home;
