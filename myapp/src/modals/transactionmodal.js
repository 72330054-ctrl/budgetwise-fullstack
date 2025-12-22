import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import { Modal } from "bootstrap";
import AccountComboBox from "./accounts"; // your combo box component
import CategoryComboBox from "./categoriesComboBox"; // your combo box component
import API_URL from "../api"; 
// ${API_URL};
function TransactionModal() {
    const { user } = useAuth();

    const [transaction, setTransaction] = useState({
        account_id: "",
        amount: "",
        date: "",
        category_id: "",
        pay: "",
        Description: "",
        type: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = async () => {

        // Validate required fields
        if (
            !transaction.type ||
            !transaction.account_id ||
            !transaction.amount ||
            !transaction.date
        ) {
            alert("Please fill all required fields!");
            return;
        }

        try {

            const payload = {
                ...transaction,
                amount: parseFloat(transaction.amount),
            };

            const res = await axios.post(
                `${API_URL}/transactions/add`,
                payload
            );

            console.log("Transaction saved:", res.data);

            // Reset form
            setTransaction({
                account_id: "",
                amount: "",
                date: "",
                category_id: "",
                pay: "",
                Description: "",
                type: "",
            });

            // Close modal
            const modalEl = document.getElementById("addTransactionModal");
            const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
            modalInstance.hide();
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="addTransactionModal"
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Transaction</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* Transaction Type */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Transaction Type</label>
                            <div className="d-flex gap-3 pt-1">
                                <div>
                                    <input
                                        type="radio"
                                        id="income"
                                        name="type"
                                        value="income"
                                        checked={transaction.type === "income"}
                                        onChange={handleChange}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="income" className="form-check-label ms-1">
                                        Income
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="expense"
                                        name="type"
                                        value="expense"
                                        checked={transaction.type === "expense"}
                                        onChange={handleChange}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="expense" className="form-check-label ms-1">
                                        Expense
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Amount + Date */}
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Amount</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="amount"
                                    value={transaction.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Date</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="date"
                                    value={transaction.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4">
                                {/* Pay */}

                                <label className="form-label">Pay</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="pay"
                                    value={transaction.pay}
                                    onChange={handleChange}
                                    placeholder="Paid to / received from"
                                />

                            </div>
                        </div>

                        {/* Account + Category */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <AccountComboBox
                                    selectedAccount={transaction.account_id}
                                    onChange={(id) =>
                                        setTransaction((prev) => ({ ...prev, account_id: id }))
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <CategoryComboBox
                                    selectedCategory={transaction.category_id}
                                    onChange={(id) =>
                                        setTransaction((prev) => ({ ...prev, category_id: id }))
                                    }
                                />
                            </div>
                        </div>



                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="Description"
                                value={transaction.Description}
                                onChange={handleChange}
                                placeholder="Optional description"
                            ></textarea>
                        </div>

                        <button
                            className="btn btn-primary w-100 mt-2"
                            onClick={handleSave}
                            data-bs-dismiss="modal" // Bootstrap automatically hides modal and backdrop
                        >
                            Save Transaction
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionModal;
