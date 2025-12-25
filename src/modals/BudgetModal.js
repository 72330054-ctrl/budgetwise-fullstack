import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import CategoryComboBox from "./categoriesComboBox";
import Swall from '../components/Swal'
function AddBudgetModal({ onClose }) {
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const [budget, setBudget] = useState({
        b_period: "Monthly",
        actual_amount: "",
        category_id: "",
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBudget((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        if (!budget.actual_amount || parseFloat(budget.actual_amount) <= 0)
            return alert("Enter a valid budget amount");
        if (!budget.category_id) return alert("Select a category");
       
        try {
           
            const payload = { ...budget, user_id: user.id };
            const res = await axios.post("http://localhost:5000/budget/add", payload);
            // alert(res.data.message);
            setShowAlert(true);
          
             
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error);
        }
    };

    return (
        <>
        {showAlert && <Swall mss="Budget added successfully!" />}

        
        <div className="modal fade" id="addBudgetModal" tabIndex="-1" >
            
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Budget</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Budget Period</label>
                                <select
                                    name="b_period"
                                    className="form-select"
                                    value={budget.b_period}
                                    onChange={handleChange}
                                >
                                    <option>Weekly</option>
                                    <option>Bi-Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Budget Amount</label>
                                <input
                                    type="number"
                                    name="actual_amount"
                                    className="form-control"
                                    value={budget.actual_amount}
                                    onChange={handleChange}
                                    placeholder="Enter budget amount"
                                />
                            </div>

                            <div className="col-md-4">
                                <CategoryComboBox
                                    selectedCategory={budget.category_id}
                                    onChange={(id) =>
                                        setBudget((prev) => ({ ...prev, category_id: id }))
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button onClick={onClose} className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button data-bs-dismiss="modal" className="btn btn-primary" onClick={handleSubmit}>
                            Save Budget
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddBudgetModal;
