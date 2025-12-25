import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from '../pages/AuthContext';
function Statistics() {
  const {user}=useAuth();
    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        remainingBudget: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/statistics/${user.id}`);
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching statistics:", err);
            }
        };
        fetchStats();
    }, [user.id]);

    const statData = [
        { label: "Total Balance", value: stats.totalBalance, className: "income", change: "+2.5% from last month" },
        { label: "Monthly Income", value: stats.monthlyIncome, className: "", change: "On track" },
        { label: "Monthly Expenses", value: stats.monthlyExpenses, className: "expenses", change: "-5% from last month" },
        { label: "Remaining Budget", value: stats.remainingBudget, className: "budget", change: `${((stats.remainingBudget/stats.totalBalance)*100).toFixed(0)}% of month left` }
    ];

    return (
        <div className="row g-3 m-5 justify-content-center rounded-4 row-card">
            {statData.map((s, index) => (
                <div key={index} className={`col-lg-3 col-sm-12 d-flex flex-column align-items-center metric ${s.className}`}>
                    <div className="metric-label">{s.label}</div>
                    <div className="metric-value">${s.value.toLocaleString()}</div>
                    <div className="metric-change">{s.change}</div>
                </div>
            ))}
        </div>
    );
}

export default Statistics;
