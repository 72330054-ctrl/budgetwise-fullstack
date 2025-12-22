import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import API_URL from "../api"; 
// ${API_URL};
function AccountComboBox({ selectedAccount, onChange }) {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAccounts = async () => {
      try {
        const res = await axios.get(`${API_URL}/acounts/${user.id}`);
        setAccounts(res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, [user]);

  return (
    <div className="mb-3">
      <label htmlFor="accountSelect" className="form-label">
        Select Account
      </label>
      <select
        id="accountSelect"
        className="form-select"
        value={selectedAccount}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose an account --</option>
        {accounts.map((account) => (
          <option key={account.acount_id} value={account.acount_id}>
            {account.acount_name} ({account.currency})
          </option>
        ))}
      </select>
    </div>
  );
}

export default AccountComboBox;
