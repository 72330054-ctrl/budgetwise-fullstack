import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import API_URL from "../api"; 
// ${API_URL};
// Import icons
import { 
    BsPiggyBank, BsBarChartLine, BsShieldCheck, BsWallet2, BsGraphUpArrow,
    BsCalendarCheck, BsShieldLock, BsGeoAlt, BsTelephone, BsEnvelope 
} from 'react-icons/bs';
import { MdTrendingUp } from 'react-icons/md';

// Icon mapping
const iconMap = {
    BsGraphUpArrow:BsGraphUpArrow,
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

function Features() {
    const styles = {
        row: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
        card: { 
            background: "rgba(255, 255, 255, 0.05)", 
            backdropFilter: "blur(12px)", 
            padding: "20px", 
            borderRadius: "16px", 
            textAlign: "center",
            
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
        },
        cardHover: { transform: "translateY(-8px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
        icon: { marginBottom: "10px" },
        title: { fontSize: "1.3rem", fontWeight: "bold", marginBottom: "5px", color: "#0d6efd" },
        text: { fontSize: "0.95rem", color: "#fff" },
        button: { marginTop: "10px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #0d6efd", backgroundColor: "transparent", color: "#0d6efd", cursor: "pointer" }
    };

    const [features, setFeatures] = useState([]);

    // Fetch features
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const res = await axios.get(`${API_URL}/features`);
                setFeatures(res.data);
            } catch (err) {
                console.error("Error fetching features:", err);
            }
        };
        fetchFeatures();
    }, []);

    // Handle feature update
    const handleUpdate = async (feature) => {
        const { value: formValues } = await Swal.fire({
            title: "Update Feature",
            html: `
                <input id="swal-title" class="swal2-input" placeholder="Title" value="${feature.title}">
                <textarea id="swal-text" class="swal2-textarea" placeholder="Text">${feature.text}</textarea>
                <select id="swal-icon" class="swal2-select">
                    ${Object.keys(iconMap).map(iconName => `
                        <option value="${iconName}" ${feature.icon === iconName ? "selected" : ""}>${iconName}</option>
                    `).join('')}
                </select>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => ({
                title: document.getElementById("swal-title").value,
                text: document.getElementById("swal-text").value,
                icon: document.getElementById("swal-icon").value
            })
        });

        if (!formValues) return;

        try {
            await axios.post(`${API_URL}/features/update/${feature.id}`, {
                id: feature.id,
                ...formValues
            });

            setFeatures(prev =>
                prev.map(f => f.id === feature.id ? { ...f, ...formValues } : f)
            );

            Swal.fire("Updated!", "Feature updated successfully", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed", "error");
        }
    };

    return (
        <div className='container mt-5 mb-5'>
            <div className='row g-3 p-3 mb-2' style={{
                border: "2px dotted rgba(34,203,167,0.5)", 
                borderRadius: "20px" 
            }}>
                <div className='col-12'>
                    <h4 className="transactions-title text-center mb-3">Features</h4>
                </div>

                {features.length > 0 ? features.map(f => {
                    const IconComponent = iconMap[f.icon];
                    return (
                        <div key={f.id} className='col-lg-4 col-md-6 col-sm-12'>
                            <div style={{ ...styles.card }} 
                                onMouseEnter={e => Object.assign(e.currentTarget.style, styles.cardHover)}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "none" })}
                            >
                                <div style={styles.icon}>
                                    {IconComponent && <IconComponent size={40} color="#0d6efd" />}
                                </div>
                                <div style={styles.title}>{f.title}</div>
                                <div style={styles.text}>{f.text}</div>
                                <button style={styles.button} onClick={() => handleUpdate(f)}>Update</button>
                            </div>
                        </div>
                    )
                }) : (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#bbb", width: "100%" }}>No features created yet</p>
                )}
            </div>
        </div>
    );
}

export default Features;
