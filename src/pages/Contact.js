import { useState } from "react";
import logo from '../assets/logo.png'
import '../styles/Contact.css';
import { BsWallet2, BsCalendarCheck, BsShieldLock, BsGeoAlt, BsTelephone, BsEnvelope } from "react-icons/bs";

function Contact() {

    return (
        <section id="contact" class="contact section dark-background-advanced " style={{ backgroundColor: "#0f0f23 !important" }}>
            <div className='row'>
                <div className='col-12'>
                    <div class="container section-title" data-aos="fade-up">
                        <h2>Contact</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div></div>
                <div className='col-12'>
                    <div class="container" data-aos="fade" data-aos-delay="100">

                        <div className="row gy-4 justify-content-center">

                            {/* LEFT COLUMN */}
                            <div className="col-lg-6 text-center">
                                <div className="info-item d-flex justify-content-center align-items-center text-center mb-4" data-aos="fade-up" data-aos-delay="200">
                                    <i className="flex-shrink-0 icon"><BsGeoAlt /></i>
                                    <div className="ms-3">
                                        <h3>Address</h3>
                                        <p> New York, NY 535</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex justify-content-center align-items-center text-center mb-4" data-aos="fade-up" data-aos-delay="300">
                                    <i className="flex-shrink-0 icon"><BsTelephone /></i>
                                    <div className="ms-3">
                                        <h3>Call Us</h3>
                                        <p>+1 5589 55488 55</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex justify-content-center align-items-center text-center" data-aos="fade-up" data-aos-delay="400">
                                    <i className="flex-shrink-0 icon"><BsEnvelope /></i>
                                    <div className="ms-3">
                                        <h3>Email Us</h3>
                                        <p>info@example.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="col-lg-6 text-center">
                                <form className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                                    <div className="row gy-4">

                                        <div className="col-md-6">
                                            <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                        </div>

                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                                        </div>

                                        <div className="col-md-12">
                                            <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <button type="submit" className="btn btn-primary mt-2">Send Message</button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </section>
    );
}
export default Contact;