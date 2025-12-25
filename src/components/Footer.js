import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../styles/Footer.css'; // correct CSS import

function Footer() {
  return (
    <footer id="footer" className="footer dark-background fixed-bottom">

      <div className="container footer-top">
        <div className="row gy-4">

          {/* About */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">BudgetWise</span>
            </a>
            <div className="footer-contact pt-3">
              <p>Beirut, Lebanon</p>
              <p>Helping families and individuals manage their finances</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+961 81 000 000</span></p>
              <p><strong>Email:</strong> <span>support@budgetwise.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><InstagramIcon /></a>
              <a href="#"><FacebookIcon /></a>
              <a href="#"><LinkedInIcon /></a>
              <a href="#"><WhatsAppIcon /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Features</h4>
            <ul>
              <li><a href="/features#expense-tracking">Expense Tracking</a></li>
              <li><a href="/features#budget-planning">Budget Planning</a></li>
              <li><a href="/features#savings-goals">Savings Goals</a></li>
              <li><a href="/features#financial-insights">Financial Insights</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to receive tips, updates, and insights to manage your finances better.</p>
            <form className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" placeholder="Enter your email" />
                <input type="submit" value="Subscribe" />
              </div>
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">Thank you for subscribing!</div>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container copyright text-center mt-4">
        <p>© <span>2025</span> <strong className="px-1 sitename">BudgetWise</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed & Developed by BudgetWise Team
        </div>
      </div>

    </footer>
  );
}

export default Footer;
