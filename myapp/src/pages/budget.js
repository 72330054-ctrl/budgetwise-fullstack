import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import Swal from "sweetalert2";
import API_URL from "../api"; 

function Budget() {
    const { user } = useAuth();
    const [budgets, setBudgets] = useState([]);

    // Fetch budgets
    useEffect(() => {
        if (!user?.id) return;
        axios
            .get(`${API_URL}/budget/${user.id}`)
            .then(res => setBudgets(res.data))
            .catch(err => console.error(err));
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This budget will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${API_URL}/budget/delete/${id}`);
            setBudgets(prev => prev.filter(b => b.id !== id));
            Swal.fire("Deleted!", "Budget removed successfully.", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to delete budget", "error");
        }
    };

    // Update budget with actual_amount, b_period, used_amount
    const handleUpdate = async (budget) => {
        const { value: formValues } = await Swal.fire({
            title: "Update Budget",
            html: `
                <input id="swal-amount" class="swal2-input" placeholder="Actual Amount" type="number" value="${budget.actual_amount}">
                <input id="swal-period" class="swal2-input" placeholder="Budget Period" type="text" value="${budget.b_period}">
                <input id="swal-used" class="swal2-input" placeholder="Used Amount" type="number" value="${budget.used_amount || 0}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return {
                    actual_amount: parseFloat(document.getElementById("swal-amount").value),
                    b_period: document.getElementById("swal-period").value,
                    used_amount: parseFloat(document.getElementById("swal-used").value),
                };
            }
        });

        if (!formValues) return;

        try {
            await axios.post(`${API_URL}/budget/update/${budget.id}`, formValues);
            setBudgets(prev =>
                prev.map(b =>
                    b.id === budget.id
                        ? { ...b, ...formValues }
                        : b
                )
            );

            Swal.fire("Updated!", "Budget updated successfully", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed", "error");
        }
    };

    // Details with used transactions
    const handleDetails = async (budget) => {
        try {
            const res = await axios.get(`${API_URL}/usedbudget/${budget.id}`);
            let usedData = res.data;

            const renderTransactions = () => {
                return usedData.length
                    ? usedData.map(u => `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                            <span>${u.date_used}: $${u.amount_used} - ${u.description}</span>
                            <button class="swal2-confirm swal2-styled" style="background:#dc3545; border:none; font-size:0.7rem; padding:2px 6px;" onclick="deleteTransaction(${u.id})">Delete</button>
                        </div>
                    `).join("")
                    : "<p>No transactions yet</p>";
            };

            Swal.fire({
                title: `💵 ${budget.name} Details`,
                html: `
                    <p><strong>Period:</strong> ${budget.b_period}</p>
                    <p><strong>Actual:</strong> $${budget.actual_amount}</p>
                    <p><strong>Used:</strong> $${budget.used_amount || 0}</p>
                    <hr/>
                    <h5>Transactions:</h5>
                    <div id="transactions-container">
                        ${renderTransactions()}
                    </div>
                `,
                width: 500,
                didOpen: () => {
                    window.deleteTransaction = async (id) => {
                        try {
                            await axios.delete(`${API_URL}/usedbudget/delete/${id}`);
                            Swal.fire("Deleted!", "Transaction removed successfully.", "success");
                            const updatedRes = await axios.get(`${API_URL}/usedbudget/${budget.id}`);
                            usedData = updatedRes.data;
                            const container = Swal.getHtmlContainer().querySelector("#transactions-container");
                            container.innerHTML = renderTransactions();
                        } catch (err) {
                            console.error(err);
                            Swal.fire("Error", "Failed to delete transaction", "error");
                        }
                    };
                },
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch transactions", "error");
        }
    };

    // Inline styles
    const styles = {
        container: { padding: "40px 20px", color: "#fff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
        header: { textAlign: "center", marginBottom: "20px" },
        title: { fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(90deg, #0d6efd, #20c997)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
        row: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
        card: { background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.1)", width: "300px", padding: "10px", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
        cardHover: { transform: "translateY(-8px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
        cardHeader: { textAlign: "center", marginBottom: "20px" },
        budgetName: { fontSize: "1.8rem", fontWeight: "bold", color: "#0d6efd" },
        badge: { display: "inline-block", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", backgroundColor: "#6c757d", color: "#fff", marginTop: "5px" },
        amounts: { textAlign: "center", marginBottom: "15px" },
        actual: { fontSize: "1.3rem", fontWeight: "bold" },
        used: { fontSize: "1.2rem", fontWeight: "bold" },
        progressContainer: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "5px", height: "10px", marginBottom: "10px" },
        progressBar: (percent, over) => ({ width: `${percent}%`, height: "100%", borderRadius: "5px", backgroundColor: over ? "#dc3545" : "#198754", transition: "width 0.5s ease" }),
        status: (over) => ({ display: "inline-block", padding: "4px 10px", borderRadius: "12px", backgroundColor: over ? "#dc3545" : "#198754", color: "#fff", fontSize: "0.8rem", textAlign: "center", marginBottom: "15px" }),
        buttons: { display: "flex", justifyContent: "center", gap: "10px" },
        button: { padding: "6px 12px", fontSize: "0.85rem", borderRadius: "6px", border: "1px solid #fff", backgroundColor: "transparent", color: "#fff", cursor: "pointer" },
        buttonInfo: { borderColor: "#0dcaf0", color: "#0dcaf0" },
        buttonPrimary: { borderColor: "#0d6efd", color: "#0d6efd" },
        buttonDanger: { borderColor: "#dc3545", color: "#dc3545" },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>💰 Budget Dashboard</h1>
            </div>

            <div style={styles.row}>
                {budgets.length > 0 ? budgets.map((b) => {
                    const used = b.used_amount || 0;
                    const percent = Math.min((used / b.actual_amount) * 100, 100);
                    const over = used > b.actual_amount;

                    return (
                        <div
                            key={b.id}
                            style={styles.card}
                            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.cardHover)}
                            onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "none" })}
                        >
                            <div style={styles.cardHeader}>
                                <div style={styles.budgetName}>{b.name}</div>
                                <div style={styles.badge}>{b.b_period}</div>
                            </div>

                            <div style={styles.amounts}>
                                <p style={{ marginBottom: "5px", color: "#bbb" }}>Total Budget</p>
                                <div style={styles.actual}>${b.actual_amount}</div>
                                <p style={{ marginBottom: "5px", color: "#bbb", marginTop: "10px" }}>Used</p>
                                <div style={{ ...styles.used, color: over ? "#dc3545" : "#198754" }}>${used}</div>
                            </div>

                            <div style={styles.progressContainer}>
                                <div style={styles.progressBar(percent, over)}></div>
                            </div>
                            <div style={{ textAlign: "center", fontSize: "0.8rem", marginBottom: "10px", color: "#bbb" }}>
                                {percent.toFixed(0)}% used
                            </div>

                            <div style={styles.status(over)}>{over ? "Exceeded Budget" : "Budget Under Control"}</div>

                            <div style={styles.buttons}>
                                <button style={{ ...styles.button, ...styles.buttonInfo }} onClick={() => handleDetails(b)}>Details</button>
                                <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => handleUpdate(b)}>Update</button>
                                <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => handleDelete(b.id)}>Delete</button>
                            </div>
                        </div>
                    );
                }) : (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#bbb" }}>No budgets created yet</p>
                )}
            </div>
        </div>
    );
}

export default Budget;
