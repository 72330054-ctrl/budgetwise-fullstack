import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import "../styles/Transactions.css";
import { Link } from 'react-router-dom';
function Acounts() {
    const { user } = useAuth();
    const [acounts, setAcounts] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchAllAcounts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/acounts/${user.id}`);
                setAcounts(res.data);
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };
        fetchAllAcounts();
    }, [user]);
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:5000/acounts/delete/${id}`);
            setAcounts(prev =>
                prev.filter(account => account.acount_id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    };
    const handleUpdate = async (id) => {
        console.log(id);
        try {

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 className="transactions-title">My Accounts </h2>

            <div className="container mt-4">
                <div className="row g-4">
                    {acounts.map((account) => (
                        <div className="col-md-4 text-light" key={account.acount_id}>
                            <div className="account-card p-3 shadow-sm text-center">
                                <div className="icon-wrapper mb-3">
                                    <span className="account-icon">{"💰"}</span>
                                </div>
                                <h5 className="card-title mb-2">{account.acount_name}</h5>
                                <p className="mb-1"><strong>Money:</strong> ${account.acount_money}</p>
                                <p className="mb-3"><strong>Currency:</strong> {account.currency}</p>
                                <p className="mb-3"><strong>Type:</strong> {account.acount_type}</p>
                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        onClick={() => handleDelete(account.acount_id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/updateaccount/${account.acount_id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Update
                                    </Link>


                                </div>
                            </div>
                        </div>
                    ))}

                    {acounts.length === 0 && (
                        <div className="col-12 text-center text-muted py-4">
                            No accounts found
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Acounts;
