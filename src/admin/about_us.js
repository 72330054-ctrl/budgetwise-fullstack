import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "../styles/Transactions.css";

function AboutModal() {
    const [about, setAbout] = useState({});
    const [vision, setVision] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/home")
            .then(res => setAbout(res.data[0] || {}));

        axios.get("http://localhost:5000/vision")
            .then(res => setVision(res.data[0] || {}));
    }, []);

    const cardStyle = {
        background: "rgba(34,203,167,0.1)",
        borderRadius: "20px",
        padding: "25px",
        height: "100%",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    };

    const iconStyle = {
        width: "60px",
        height: "60px",
        margin: "0 auto 15px auto",
        borderRadius: "50%",
        background: "rgba(34,203,167,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
    };

    const labelStyle = {
        fontWeight: "600",
        color: "#fff",
        marginBottom: "5px",
        display: "block",
    };

    const inputStyle = {
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.3)",
        backgroundColor: "rgba(0,0,0,0.2)",
        color: "#fff",
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/about_update", about);
            await axios.post("http://localhost:5000/vision_update", vision);
            Swal.fire("Updated!", "Updated successfully.", "success");
        } catch (err) {
            Swal.fire("Error", "Update failed.", "error");
        }
    };

    return (
        <div className='container mt-5 mb-5'>
            <div
                className='row g-4 p-3'
                style={{
                    border: "2px dotted rgba(34,203,167,0.5)",
                    borderRadius: "20px",
                }}
            >
                <div className='col-12'>
                    <h4 className="transactions-title text-center text-light">About Us</h4>
                </div>

                {/* About Card */}
                <div className='col-lg-6 col-sm-12'>
                    <div style={cardStyle}>
                        
                        <h3 className="text-center mb-3 text-light">About</h3>

                        <label style={labelStyle}>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            style={inputStyle}
                            value={about.title || ""}
                            onChange={e => setAbout({ ...about, title: e.target.value })}
                        />

                        <label style={labelStyle}>Text</label>
                        <textarea
                            className="form-control"
                            style={inputStyle}
                            rows="5"
                            value={about.text || ""}
                            onChange={e => setAbout({ ...about, text: e.target.value })}
                        />

                        <label style={labelStyle}>Quote</label>
                        <input
                            type="text"
                            className="form-control"
                            style={inputStyle}
                            value={about.quote || ""}
                            onChange={e => setAbout({ ...about, quote: e.target.value })}
                        />
                    </div>
                </div>

                {/* Vision Card */}
                <div className='col-lg-6 col-sm-12'>
                    <div style={cardStyle}>
                        
                        <h3 className="text-center mb-3 text-light">Vision</h3>

                        <label style={labelStyle}>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            style={inputStyle}
                            value={vision.title || ""}
                            onChange={e => setVision({ ...vision, title: e.target.value })}
                        />

                        <label style={labelStyle}>Text</label>
                        <textarea
                            className="form-control"
                            style={inputStyle}
                            rows="10"
                            value={vision.text || ""}
                            onChange={e => setVision({ ...vision, text: e.target.value })}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='col-12'>
                    <div className="text-center mt-3">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-warning px-4 py-2"
                            style={{ fontWeight: "600" }}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutModal;
