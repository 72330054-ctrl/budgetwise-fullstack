import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../pages/AuthContext';
import API_URL from "../api"; 
// ${API_URL};
function UsedBudgetModal({ onClose }) {
    const [budgets, setBudgets] = useState([]);
const { user } = useAuth(); // logged-in user
    const [used, setUsed] = useState({
        budget_id: "",
        amount_used: "",
        description: "",
        date_used: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        axios.get(`${API_URL}/budget/${user.id}`)
        
            .then(res => setBudgets(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsed(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!used.budget_id) return alert("Select a budget");
        if (!used.amount_used || parseFloat(used.amount_used) <= 0)
            return alert("Enter a valid amount");

        try {
            const res = await axios.post(
                `${API_URL}/used_budget`,
                used
            );
            alert(res.data.message );
            
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error);
        }
    };

    return (
        <div className="modal fade" id="usedBudgetModal" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">Add Used Budget</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">

                        {/* Budget Selector */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Select Budget</label>
                            <select
                                className="form-select"
                                name="budget_id"
                                value={used.budget_id}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Budget --</option>
                                {budgets.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.name} - {b.b_period} {b.actual_amount}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amount Used */}
                        <div className="mb-3">
                            <label className="form-label">Amount Used</label>
                            <input
                                type="number"
                                name="amount_used"
                                className="form-control"
                                value={used.amount_used}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Date */}
                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                name="date_used"
                                className="form-control"
                                value={used.date_used}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                value={used.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                        data-bs-dismiss="modal"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        > Save
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UsedBudgetModal;
