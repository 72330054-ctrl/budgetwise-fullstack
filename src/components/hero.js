import '../styles/hero.css';
import l1 from '../assets/l3.png';

function Hero() {
  return (
    <div className='mt-5 pt-5 position-relative'>
      
      {/* Hero content */}
      <div className='hero-section px-5'>
        <div className='row align-items-center'>
          <div className='col-lg-5 col-sm-12'>
            <p className='hero-title'>
              Track <span className='sp'>Smarter</span> <br />
              Spend <span className='sp'>Better</span>
            </p>
          </div>
          <div className='col-lg-5 col-sm-12 position-relative'>
            {/* Floating image */}
            <img 
              src={l1} 
              className='hero-image floating-image' 
              alt="Hero" 
            />
          </div>
        </div>
      </div>

      {/* Curved section */}
      <div className="curved-section hero mt-5 position-relative">
        <div>sdfksdfksfs</div>
        <div className="feature">
          <h3>Custom Workflow</h3>
          <p>Checks natural details to make your tasks flow better.</p>
        </div>
        <div className="feature">
          <h3>Multi-team Projects</h3>
          <p>Users can collaborate across teams using this platform.</p>
        </div>
        <div className="avatars">
          <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="user" />
          <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="user" />
          <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="user" />
          <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="user" />
          <span className="download-text">Download from the App Store</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
