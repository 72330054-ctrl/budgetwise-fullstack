import React, { useState } from "react";
import { useAuth } from "../pages/AuthContext";
import AccountComboBox from "./accounts";
import axios from "axios";
import Swal from "sweetalert2";
function TransferModul({ onClose }) {
    const { user } = useAuth();
    const [transfer, setTransfer] = useState({
        from_acount: "",
        to_acount: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!user) return alert("You must be logged in!");
        if (transfer.from_acount === transfer.to_acount) return alert("Please select different accounts");
        if (!transfer.amount || parseFloat(transfer.amount) <= 0) return alert("Enter a valid amount");

        const payload = { ...transfer, amount: parseFloat(transfer.amount) };

        try {
            const res = await axios.post("http://localhost:5000/transfer", payload);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Transfer successful!",
                timer: 2000,
                showConfirmButton: false
            });
            // Reset form
            setTransfer({
                from_acount: "",
                to_acount: "",
                amount: "",
                description: "",
                date: "",
            });
        } catch (err) {
            console.error(err);
            // Show backend error message if available
            const errorMsg = err.response?.data?.error || "Transfer failed. Please try again.";
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMsg,
            });
        }
    };

    return (
        <div className="modal fade" id="transferModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">Transfer Money</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div
                                    style={{
                                        border: "2px solid #0d6efd",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        backgroundColor: "#e7f1ff",
                                    }}
                                >
                                    <label style={{ fontWeight: "bold", color: "#0d6efd" }}>From Account</label>
                                    <AccountComboBox
                                        selectedAccount={transfer.from_acount}
                                        onChange={(id) =>
                                            setTransfer((prev) => ({ ...prev, from_acount: id }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div
                                    style={{
                                        border: "2px solid #198754",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        backgroundColor: "#e6f4ea",
                                    }}
                                >
                                    <label style={{ fontWeight: "bold", color: "#198754" }}>To Account</label>
                                    <AccountComboBox
                                        selectedAccount={transfer.to_acount}
                                        onChange={(id) =>
                                            setTransfer((prev) => ({ ...prev, to_acount: id }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row g-3 mt-3">
                            <div className="col-md-6">
                                <label className="form-label">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={transfer.amount}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={transfer.date}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={transfer.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="3"
                                placeholder="Optional description"
                            ></textarea>
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
                        >
                            Make Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransferModul;
