import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import { Modal } from "bootstrap";
import AccountComboBox from "./accounts"; // your combo box component
import CategoryComboBox from "./categoriesComboBox"; // your combo box component
function AddBillModal({ onClose }) {
  const { user } = useAuth(); // logged-in user
  const [bill, setBill] = useState({
    name: "",
    amount: "",
    payee_to: "",
    category_id: "",
    account_id: "",
    due_date: "",
    frequency: "",
    notes: "",
    auto_pay: false,
    notification: "",
  });

  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBill((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user) return alert("You must be logged in!");

    const payload = { ...bill, amount: parseFloat(bill.amount) };

    try {
     
      await axios.post("http://localhost:5000/bill", payload);

      // Close Bootstrap modal programmatically
      // const modalEl = document.getElementById("addBillModal");
      // const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      // modal.hide();

      // Reset form
      setBill({
        name: "",
        amount: "",
        payee_to: "",
        category_id: "",
        account_id: "",
        due_date: "",
        frequency: "",
        notes: "",
        auto_pay: false,
        notification: "",
      });

    } catch (err) {
      console.error("Error creating bill:", err);
      
    }
  };

  return (
    <div className="modal fade" id="addBillModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Bill Reminder</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {/* {error && <p className="text-danger">Something went wrong</p>} */}

            <div className="row g-3">
              {/* Bill Name */}
              <div className="col-md-4">
                <label className="form-label">Bill Name</label>
                <input
                  name="name"
                  value={bill.name}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Electricity, Internet..."
                />
              </div>

              {/* Amount */}
              <div className="col-md-4">
                <label className="form-label">Amount</label>
                <input
                  name="amount"
                  value={bill.amount}
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  placeholder="0.00"
                />
              </div>

              {/* Payee */}
              <div className="col-md-4">
                <label className="form-label">Payee</label>
                <input
                  name="payee_to"
                  value={bill.payee_to}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Company or Person"
                />
              </div>

              {/* Category */}
              <div className="col-md-3">
                <CategoryComboBox
                  selectedCategory={bill.category_id}
                  onChange={(id) =>
                   setBill((prev) => ({ ...prev, category_id: id }))
                  }
                />
              </div>
              

              {/* Account ComboBox */}
              <div className="col-md-3">
                
                <AccountComboBox
                  selectedAccount={bill.account_id}
                  onChange={(id) =>
                    setBill((prev) => ({ ...prev, account_id: id }))
                  }
                />
              </div>
              {/* Notification */}
              <div className="col-md-3">
                <label className="form-label">Notification Reminder</label>
                <select
                  name="notification"
                  value={bill.notification}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">On Due Date</option>
                  <option value="1_day_before">1 Day Before</option>
                   <option value="2_days_before">2 Days Before</option>
                  <option value="3_days_before">3 Days Before</option>
                  <option value="7_days_before">1 week Before</option>
                </select>
              </div>
              {/* Frequency */}
              {/* <div className="col-md-4">
                <label className="form-label">Frequency</label>
                <select
                  name="frequency"
                  value={bill.frequency}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">One Time</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div> */}

              {/* Due Date */}
              <div className="col-md-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={bill.due_date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>



              

              {/* Notes */}
              <div className="col-md-12">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  value={bill.notes}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                  placeholder="Optional notes..."
                ></textarea>
              </div>

              
            </div>
          </div>

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
              Save Bill Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBillModal;
