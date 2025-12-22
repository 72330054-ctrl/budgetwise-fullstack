import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "../styles/Transactions.css";
import { BsPiggyBank, BsBarChartLine, BsShieldCheck } from "react-icons/bs"; 
import { MdTrendingUp } from "react-icons/md";
import API_URL from "../api"; 
// ${API_URL};
// Map icon string to actual React icon
const iconMap = {
    BsPiggyBank: BsPiggyBank,
    BsBarChartLine: BsBarChartLine,
    BsShieldCheck: BsShieldCheck,
    MdTrendingUp: MdTrendingUp,
};

function WhyUs() {
    const styles = {
        row: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
        card: { background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", borderRadius: "16px", padding: "20px", textAlign: "center" },
        icon: { fontSize: "2.5rem", color: "#0dcaf0", marginBottom: "12px" },
        titleText: { fontSize: "1.3rem", fontWeight: "600", color: "#fff", marginBottom: "8px" },
        text: { color: "#ccc", fontSize: "0.95rem", marginBottom: "15px" },
        button: { padding: "6px 14px", fontSize: "0.85rem", borderRadius: "6px", border: "1px solid #0d6efd", backgroundColor: "transparent", color: "#0d6efd", cursor: "pointer" },
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/why_us`);
                setItems(res.data);
            } catch (err) {
                console.error("Error fetching Why Us data:", err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (item) => {
        const { value: formValues } = await Swal.fire({
            title: "Update entry",
            html: `
                <input id="swal-icon" class="swal2-input" placeholder="Icon key" value="${item.icon || ''}">
                <input id="swal-title" class="swal2-input" placeholder="Title" value="${item.title || ''}">
                <textarea id="swal-text" class="swal2-textarea" placeholder="Text">${item.text || ''}</textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => ({
                icon: document.getElementById("swal-icon").value,
                title: document.getElementById("swal-title").value,
                text: document.getElementById("swal-text").value
            })
        });

        if (!formValues) return;

        try {
            await axios.post(`${API_URL}/why_us/update/${item.id}`, {
                id: item.id,
                ...formValues
            });

            setItems(prev =>
                prev.map(i => i.id === item.id ? { ...i, ...formValues } : i)
            );

            Swal.fire("Updated!", "Entry updated successfully", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed", "error");
        }
    };

    return (
        <div className='container mt-5 mb-5'>
            <div className='row g-3 p-3 mb-2' style={{ border: "2px dotted rgba(34,203,167,0.5)", borderRadius: "20px" }}>
                <div className='col-12 text-center mb-3'>
                    <h4 className="transactions-title text-light">Why Us</h4>
                </div>

                {items.length > 0 ? items.map((item) => {
                    const IconComponent = iconMap[item.icon] || BsPiggyBank; // default icon
                    return (
                        <div key={item.id} className='col-lg-4 col-md-6 col-sm-12'>
                            <div style={styles.card}>
                                <div style={styles.icon}><IconComponent /></div>
                                <div style={styles.titleText}>{item.title}</div>
                                <div style={styles.text}>{item.text}</div>
                                <button style={styles.button} onClick={() => handleUpdate(item)}>Update</button>
                            </div>
                        </div>
                    );
                }) : (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#bbb", width: "100%" }}>
                        No entries created yet
                    </p>
                )}
            </div>
        </div>
    );
}

export default WhyUs;
