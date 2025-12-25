import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import axios from 'axios';
function Challenges() {
    const [challenge, setchallenge] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/challenges");
                setchallenge(res.data);
            } catch (err) {
                console.error("Error fetching About data:", err);
            }
        };
        fetch();
    }, []);

    return (
        <section id="faq" className="faq section dark-background">

            <div className="container section-title" data-aos="fade-up">
                <h2 className='fancy '>Financial Challenges</h2>
                <div><span>Common Money Management</span> <span className="description-title">Challenges We Solve</span></div>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4 justify-content-between">

                    <div className="col-lg-9">
                        <div className="faq-list">
                            <div className="row gy-4">
                                {challenge.map((challenge) => (
                                    <div className="col-lg-6">
                                        <div className="faq-item" data-aos="fade-up" data-aos-delay="100">
                                            <h3>{challenge.challenge}</h3>
                                            <i className="bi bi-plus faq-toggle"></i>
                                        </div>
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
                        <div className="faq-card">
                            <i className="bi bi-wallet2"></i>
                            <h3>Need Help Managing Your Money?</h3>
                            <p>Our budgeting tools help you track expenses, plan savings, and stay on top of your financial goals with ease.</p>
                            <a href="#dashboard" class="btn btn-primary">Start Budgeting</a>
                        </div>
                    </div>

                </div>
            </div>

        </section>

    );
}
export default Challenges;