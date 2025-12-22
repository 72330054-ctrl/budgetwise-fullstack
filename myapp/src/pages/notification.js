import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import { FaBell, FaMoneyBillWave, FaClock, FaTrash } from "react-icons/fa";
import "../styles/Transactions.css";
import API_URL from "../api"; 
// ${API_URL}
function Notifications() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        if (!user) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${API_URL}/notification/${user.id}`);
                const sorted = res.data.sort(
                    (a, b) => new Date(a.due_date) - new Date(b.due_date)
                );
                setNotifications(sorted);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
        };

        fetchNotifications();
    }, [user]);

    const formatDate = (dateStr) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const handlePay = async (billId) => {
        try {
            await axios.post(`${API_URL}/bill/pay/${billId}`);
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === billId ? { ...n, payed: 1 } : n
                )
            );
        } catch (err) {
            console.error("Error paying bill:", err);
        }
    };

    const handleDelete = async (billId) => {
        try {
            await axios.delete(`${API_URL}/bill/delete/${billId}`);
            setNotifications((prev) => prev.filter((n) => n.id !== billId));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };


    const today = new Date();

    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const notificationRows = chunkArray(notifications, 3);

    return (
        <div className="container mt-4">
            <h4 className="text-light transactions-title text-center">
                <FaBell className="me-2 ring" /> Notifications
            </h4>

            {notifications.length === 0 && (
                <p className="text-light text-center">No notifications today</p>
            )}

            {notificationRows.map((row, rowIndex) => (
                <div className="row mb-3 justify-content-center" key={rowIndex}>
                    {row.map((n) => {
                        const dueDate = new Date(n.due_date);
                        const today = new Date();

                        const diffTime = dueDate - today;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const notifyDays = Number(n.notification.split("_")[0]);
                        const highlight = diffDays === notifyDays;

                        const isOverdue = dueDate < today;

                        const payed = isOverdue || n.payed === 1;




                        return (
                            <div className="col-md-4 d-flex justify-content-center mb-3" key={n.id}>
                                <div
                                    className="account-card card shadow-sm text-center"
                                    style={{
                                        backgroundColor: payed ? "rgba(34,203,167,0.1)" : highlight ? "#8B0000" : "rgba(34,203,167,0.1)",
                                        color: payed ? "white" : "lightgray",
                                        borderRadius: "10px",
                                        transition: "all 0.3s",
                                        minHeight: "150px",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                >
                                    <div className="card-body d-flex flex-column justify-content-between align-items-center h-100">
                                        <div>
                                            <h5 className="card-title mb-2">{diffDays} {n.name}</h5>

                                            <p className="mb-1">
                                                <FaMoneyBillWave className="me-1" /> Amount: ${n.amount}
                                            </p>
                                            <p className="mb-1">
                                                <FaClock className="me-1" /> Due: {formatDate(n.due_date)}
                                            </p>
                                            <p className="mb-1">Payee: {n.payee_to}</p>
                                            {n.notes && <p className="mb-1">Notes: {n.notes}</p>}
                                        </div>

                                        <div className="d-flex gap-2 justify-content-center mt-2 ">
                                            {n.payed === 1 ? (
                                                <span className="badge bg-success py-2 px-3 rounded">Paid</span>
                                            ) : isOverdue ? (
                                                <span className="badge bg-danger py-2 px-3 rounded">Missed</span>
                                            ) : (
                                                <button
                                                    className="btn btn-primary btn-sm py-2 px-3 rounded"
                                                    onClick={() => handlePay(n.id)}
                                                    style={{ minWidth: "90px" }}
                                                >
                                                    Pay Now
                                                </button>

                                            )}
                                            <button
                                                className="btn btn-danger btn-sm py-2 px-3 rounded"
                                                onClick={() => handleDelete(n.id)}
                                                style={{ minWidth: "90px" }}
                                            >
                                                <FaTrash className="me-1" /> Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Notifications;
