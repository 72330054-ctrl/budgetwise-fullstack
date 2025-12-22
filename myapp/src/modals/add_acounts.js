import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../pages/AuthContext';
import { Modal } from "bootstrap";
import API_URL from "../api"; 
// ${API_URL};
function AddAccountModal({ onClose }) {
  const { user } = useAuth(); // logged-in user
  const [account, setAccount] = useState({
    type: "",
    name: "",
    bank: "",
    number: "",
    balance: "",
    currency: "USD",
    color: "#000000",
    icon: "",
  });

  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user) return alert("You must be logged in!");

    const payload = {
      user_id: user.id,
      acount_name: account.name,
      acount_money: parseFloat(account.balance),
      acount_icon: account.icon,
      acount_number: account.number,
      acount_type: account.type,
      currency: account.currency,
      color: account.color,
      bank: account.bank,
    };

    console.log("Payload going to backend:", payload); // debug

    try {
      await axios.post(`${API_URL}/acounts`, payload);
      
    } catch (err) {
      console.error("Error creating account:", err);
      setError(true);
    }
  };

  return (
    <div className="modal fade" id="addAccountModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Create New Account</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {error && <p className="text-danger">Something went wrong</p>}

            <div className="row g-3">
              {/* Account Type */}
              <div className="col-md-6">
                <label className="form-label">Account Type</label>
                <select
                  className="form-control"
                  name="type"
                  value={account.type}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              {/* Account Name */}
              <div className="col-md-6">
                <label className="form-label">Account Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={account.name}
                  onChange={handleChange}
                />
              </div>

              {/* Bank */}
              <div className="col-md-6">
                <label className="form-label">Bank / Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="bank"
                  value={account.bank}
                  onChange={handleChange}
                />
              </div>

              {/* Account Number */}
              <div className="col-md-6">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="number"
                  value={account.number}
                  onChange={handleChange}
                />
              </div>

              {/* Initial Balance */}
              <div className="col-md-6">
                <label className="form-label">Initial Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="balance"
                  value={account.balance}
                  onChange={handleChange}
                />
              </div>

              {/* Currency */}
              <div className="col-md-6">
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

              {/* Color */}
              <div className="col-md-6">
                <label className="form-label">Account Color</label>
                <input
                  type="color"
                  className="form-control form-control-color"
                  name="color"
                  value={account.color}
                  onChange={handleChange}
                />
              </div>

              {/* Icon */}
              <div className="col-md-6">
                <label className="form-label">Icon</label>
                <select
                  className="form-control"
                  name="icon"
                  value={account.icon}
                  onChange={handleChange}
                >
                  <option value="wallet">Wallet</option>
                  <option value="bank">Bank</option>
                  <option value="card">Credit Card</option>
                  <option value="piggy">Savings Piggy</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Create Account
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AddAccountModal;
