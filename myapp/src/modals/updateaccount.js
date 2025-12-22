import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import "../styles/Transactions.css";
import API_URL from "../api"; 
// ${API_URL};
function UpdateAccount() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [account, setAccount] = useState({
        acount_name: "",
        acount_money: "",
        currency: "",
        acount_type: "",
        acount_number: "",
        acount_icon: ""
    });

    // ✅ Fetch account
    useEffect(() => {
        if (!user) return;

        const fetchAccount = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/acounts/update/${id}`
                );
                setAccount(res.data);
            } catch (err) {
                console.error("Error fetching account:", err);
            }
        };

        fetchAccount();
    }, [id, user]);

    // ✅ Handle change
    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });
    };

    // ✅ Submit update (POST as your backend)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.post(
                `${API_URL}/acounts/update/form/${id}`,
                account
            );
            navigate("/acounts");
        } catch (err) {
            console.error("Error updating account:", err);
        }
    };

    return (
        <div className="container mb-5">
            <h2 className="transactions-title text-center text-light mb-4">
                Update Account
            </h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 rounded shadow"
                        style={{ background: "rgba(34,203,167,0.15)" }}
                    >
                        <div className="row">

                            <div className="col-6 mb-3 text-light">
                                <label className="form-label">Account Name</label>
                                <input
                                    type="text"
                                    name="acount_name"
                                    className="form-control"
                                    value={account.acount_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label">Money</label>
                                <input
                                    type="number"
                                    name="acount_money"
                                    className="form-control"
                                    value={account.acount_money}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label">Currency</label>
                                <select
                                    className="form-control"
                                    name="currency"
                                    value={account.currency}
                                    onChange={handleChange}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="LBP">LBP</option>
                                    <option value="GBP">GBP</option>
                                    <option value="CAD">CAD</option>
                                </select>
                            </div>


                            <div className="col-6 mb-3">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-control"
                                    name="acount_type"
                                    value={account.acount_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Checking">Checking</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Investment">Investment</option>
                                </select>
                            </div>





                            <div className="col-6 mb-3">
                                <label className="form-label">Account Number</label>
                                <input
                                    type="text"
                                    name="acount_number"
                                    className="form-control"
                                    value={account.acount_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 mb-4">
                                <label className="form-label">Icon</label>
                                <input
                                    type="text"
                                    name="acount_icon"
                                    className="form-control"
                                    value={account.acount_icon}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            Update Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateAccount;
