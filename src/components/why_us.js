
import aboutimg3 from '../assets/budget_illustration.jpg';
import { BsPiggyBank } from "react-icons/bs";
import { BsBarChartLine } from "react-icons/bs";
import { BsShieldCheck } from "react-icons/bs";
import { MdTrendingUp } from "react-icons/md";
import { BsWallet2, BsCalendarCheck, BsShieldLock, BsGeoAlt, BsTelephone, BsEnvelope } from "react-icons/bs";
import { useState, useEffect } from 'react';

import axios from 'axios';
import '../styles/main.css';
function Why() {
    const iconMap = {
        BsPiggyBank: BsPiggyBank,
        BsBarChartLine: BsBarChartLine,
        BsShieldCheck: BsShieldCheck,
        MdTrendingUp: MdTrendingUp,
        BsWallet2: BsWallet2,
        BsCalendarCheck: BsCalendarCheck,
        BsShieldLock: BsShieldLock,
        BsGeoAlt: BsGeoAlt,
        BsTelephone: BsTelephone,
        BsEnvelope: BsEnvelope,
    };

    const [why, setWhy] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/why_us");
                setWhy(res.data);
            } catch (err) {
                console.error("Error fetching About data:", err);
            }
        };
        fetch();
    }, []);

    return (
        <section id="why-choose-us" className="why-choose-us section">


            <div className="container section-title" data-aos="fade-up">
                <h2 className='fancy '>Why Use Smart Budgeting</h2>
                <div>
                    <span>Why Choose</span> <span className="description-title">Our Budgeting Tools</span>
                </div>
            </div>


            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row align-items-center">
                    <div className="col-lg-5" data-aos="fade-up" data-aos-delay="300">
                        <div className="features-image">
                            <div className="stats-card ">
                                <div className="stat-item">
                                    <h3>
                                        <span data-purecounter-start="0" data-purecounter-end="90" className="purecounter">90</span>%
                                    </h3>
                                    <p>Better Expense Tracking</p>
                                </div>
                                <div className="stat-item">
                                    <h3>
                                        <span data-purecounter-start="0" data-purecounter-end="85" className="purecounter">85</span>%
                                    </h3>
                                    <p>Savings Achieved</p>
                                </div>
                                <div className="stat-item">
                                    <h3>
                                        <span data-purecounter-start="0" data-purecounter-end="95" className="purecounter">95</span>%
                                    </h3>
                                    <p>Financial Clarity</p>
                                </div>
                                <div className="stat-item">
                                    <h3>
                                        <span data-purecounter-start="0" data-purecounter-end="100" className="purecounter">100</span>%
                                    </h3>
                                    <p>Goal Planning Ready</p>
                                </div>
                            </div>

                            <img src={aboutimg3} alt="Budget Illustration" className="img-fluid main-image" />

                            <div className="experience-badge">
                                <div className="badge-content">
                                    <span className="number">Smart</span>
                                    <span className="text">Budgeting Upgrade</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" data-aos="fade-up" data-aos-delay="200">
                        <div className="features-content">
                            <div className="features-list">
                                {why.map((item, index) => {
                                    const IconComponent = iconMap[item.icon]; // Get the actual icon component
                                    return (
                                        <div className="feature-item" key={index}>
                                            <div className="feature-icon">
                                                {IconComponent && <IconComponent />}
                                            </div>
                                            <div className="feature-text">
                                                <h4>{item.title}</h4>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
export default Why;