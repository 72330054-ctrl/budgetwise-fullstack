import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import { FaMoneyBillWave } from "react-icons/fa";
import "../styles/Transactions.css";
function Transformation() {
    const [transformation, setTransformation] = useState([]);
    const [filteredtransformation, setFilteredtransformation] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchAllAcounts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/transformation/${user.id}`);
                setTransformation(res.data);
                setFilteredtransformation(res.data); 
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };
        fetchAllAcounts();
    }, [user]);
    const handleFilter = () => {
        if (!filterDate) return;
        const filtered = transformation.filter(t => {
            const transactionDate = t.date.split("T")[0];
            return transactionDate === filterDate;
        });
        setFilteredtransformation(filtered);
    };
    return (
        <div className="container mt-4 mb-5">
            <div className="container">
                <h2 className="transactions-title">Transformations</h2>
                <div style={{ backgroundColor: "rgba(34,203,167,0.5)" }}
                    className=" rounded-4 row align-items-center mb-3">
                    <div className="col-7"></div>
                    <div className="col-5 ">
                        <div className="m-2  d-flex align-items-center">
                            <label className="me-2">Select Date:</label>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="form-control w-50"
                            />
                            <button onClick={handleFilter} className="btn btn-danger ms-2">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-4">
                {filteredtransformation.map((t) => (
                    <div className="col-md-4" key={t.id}>
                        <div className="transaction-card p-3">
                            <div className="icon-wrapper mb-3">
                                <FaMoneyBillWave size={30} />
                            </div>
                            <h5 className=" card-title">Amount: ${t.amount}</h5>
                            <p><strong>Date:</strong> {t.date.split("T")[0]}</p>
                            <p><strong> From Acount:</strong> {t.from_name}</p>
                            <p><strong>To Acount</strong> {t.to_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Transformation;
