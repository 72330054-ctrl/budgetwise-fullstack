import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bs"; // Import all BS icons
import axios from 'axios';
function Features() {
  const [features, setFeatures] = useState([]);
     useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/features");
                setFeatures(res.data);
            } catch (err) {
                console.error("Error fetching About data:", err);
            }
        };
        fetch();
    }, []);
  return (
    <section id="features" className="services section dark-background">
      <div className="container section-title">
        <h2 className="fancy">Features of Our Budget Website</h2>
        <p>
          Manage your finances smarter with tools that help you track, save, and plan efficiently.
        </p>
      </div>

      <div className="container">
        <div className="row justify-content-center gy-4">
          {features.map((feature) => {
            // Dynamically get the icon component from react-icons
            const Icon = Icons[feature.icon] || Icons.BsWallet2; // fallback icon
            return (
              <div key={feature.id} className="col-lg-4 col-sm-12">
                <div className="service-item position-relative">
                  <div className="icon">
                    <Icon size={40} color={feature.color || "#0dcaf0"} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
