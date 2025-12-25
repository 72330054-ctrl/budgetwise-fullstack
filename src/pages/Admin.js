import heroImg from '../assets/hero-img.svg';
import Hero from '../assets/l34.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AboutModal from '../admin/about_us';
import Callenges from '../admin/challenges';
import WhyUs from '../admin/why_us';
import Features from '../admin/features';
function Admin() {

    return (
        <>
        <AboutModal />
         <Callenges/>
         <WhyUs/>
         <Features/>
         </>
        

    )
}
export default Admin;