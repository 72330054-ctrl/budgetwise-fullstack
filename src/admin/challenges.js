import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "../styles/Transactions.css";
function Callenges() {
    const styles = {
        header: { textAlign: "center", marginBottom: "20px" },
        title: { fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(90deg, #0d6efd, #20c997)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
        row: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
        card: { background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", },
         amounts: { textAlign: "center", marginBottom: "15px" },
        actual: { fontSize: "1.3rem", fontWeight: "bold" , color:"white" },
        buttons: { display: "flex", justifyContent: "center", gap: "10px" },
        button: { padding: "6px 12px", fontSize: "0.85rem", borderRadius: "6px", border: "1px solid #fff", backgroundColor: "transparent", color: "#fff", cursor: "pointer" },
        buttonPrimary: { borderColor: "#0d6efd", color: "#0d6efd" },
    };

    const [challenges, setChallenges] = useState([]); // <-- array

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const res = await axios.get("http://localhost:5000/challenges");
                setChallenges(res.data); // <-- full array
            } catch (err) {
                console.error("Error fetching challenges:", err);
            }
        };
        fetchChallenges();
    }, []);

    const handleUpdate = async (challenge) => {
        const { value: formValues } = await Swal.fire({
            title: "Update challenge",
            html: `
                <input id="swal-amount" class="swal2-input" type="text" value="${challenge.challenge}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return {
                    challenge: document.getElementById("swal-amount").value,
                };
            }
        });
        if (!formValues) return;

        try {
            // Send both id and new challenge value to backend
            await axios.post(`http://localhost:5000/challenge/update/${challenge.id}`, {
                id: challenge.id,
                challenge: formValues.challenge
            });

            // Update state
            setChallenges(prev =>
                prev.map(c =>
                    c.id === challenge.id ? { ...c, challenge: formValues.challenge } : c
                )
            );

            Swal.fire("Updated!", "Challenge updated successfully", "success");
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
            <h4 className="transactions-title text-center mb-3">Challenges</h4>
        </div>

        {challenges.length > 0 ? challenges.map((c) => (
            <div
                key={c.id}
                className='col-lg-4 col-md-6 col-sm-12' // responsive columns
            >
                <div style={{ ...styles.card, padding: "20px", borderRadius: "16px" }}>
                    <div style={styles.amounts}>
                        <div style={styles.actual}>{c.challenge}</div>
                    </div>

                    <div style={styles.buttons}>
                        <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => handleUpdate(c)}>Update</button>
                    </div>
                </div>
            </div>
        )) : (
            <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#bbb", width: "100%" }}>No challenges created yet</p>
        )}
    </div>
</div>

    );
}

export default Callenges;
