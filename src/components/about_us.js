import { useState, useEffect } from 'react';
import aboutimg1 from '../assets/l8.png';
import aboutimg2 from '../assets/l11.png';
import axios from 'axios';
import '../styles/main.css';
function About() {
    const [about, setAbout] = useState({});
    const [vision, setVision] = useState({});

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get("http://localhost:5000/home");
                setAbout(res.data[0]);
            } catch (err) {
                console.error("Error fetching About data:", err);
            }
        };
        fetchAbout();
    }, []);

    useEffect(() => {
        const fetchVision = async () => {
            try {
                const res = await axios.get("http://localhost:5000/vision");
                setVision(res.data[0]);
            } catch (err) {
                console.error("Error fetching Vision data:", err);
            }
        };
        fetchVision();
    }, []);


    return (
        <section id="about" className="about section mt-0">
            <div className="container">
                <div className="section-title">
                    <h2 className='fancy '>About Us</h2>
                </div>
                <div className="row gy-4 mt-3">
                    <div className="col-lg-1"></div>
                    <div
                        className="col-lg-5 position-relative align-self-start order-lg-last order-first"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <img src={aboutimg1} className="img-fluid" alt="About illustration" />
                    </div>


                    <div className="col-lg-6 content order-last order-lg-first" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="mb-3"><i className="bi bi-people-fill me-2"></i>{about.title}</h3>
                        <p>
                            {about.text}
                        </p>
                        <strong>{about.quote}</strong>
                    </div>
                </div>

                <div className="row gy-4 mt-5">
                    <div className="col-lg-5 position-relative align-self-start order-lg-first order-last pt-4" data-aos="fade-up"
                        data-aos-delay="200">
                        <img src={aboutimg2} className="img-fluid w-100" alt="About illustration" />

                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-6 content order-first order-lg-last" data-aos="fade-up" data-aos-delay="100">
                        <h3>{vision.title}</h3>
                        <p >
                            {vision.text}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
export default About;