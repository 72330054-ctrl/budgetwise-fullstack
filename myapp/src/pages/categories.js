import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";
import "../styles/Transactions.css"; // For gradient animation
import Swal from "sweetalert2";
import API_URL from "../api"; 
// ${API_URL}
function Categories() {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (!user) return;
        axios.get(`${API_URL}/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, [user]);

    const handleDelete = async (id) => {
       
          try {
             await axios.delete(`${API_URL}/categories/delete/${id}`);
            setCategories(prev => prev.filter(c => c.id !== id));
            Swal.fire("Deleted!", "Category removed successfully.", "success");
        } catch (err) {
            console.error(err);
           Swal.fire("Error", "Failed to delete Category", "error");
         }
        
    };

    const handleAdd = async () => {
        if (!newCategory.trim()) return;
        const res = await axios.post(`${API_URL}/categories/add`, { name: newCategory });
        Swal.fire("Added!", "Category Added successfully.", "success");
        setCategories(prev => [...prev, res.data]);
        setNewCategory("");
    };

    const styles = {
        title: {
            fontSize: "3rem",
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(-45deg, rgb(34,203,167), #00ffe5, rgb(34,203,167), #00ffe5)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientMove 6s ease infinite",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
            marginBottom: "30px",
        },
        card: {
            background: "rgba(34, 203, 167, 0.1)",
            color: "#22cba7",
            padding: "15px 20px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            cursor: "default",
            transition: "transform 0.2s, box-shadow 0.2s",
        },
        deleteBtn: {
            border: "none",
            background: "#dc3545",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.8rem"
        },
        addInput: {
            borderRadius: "8px",
            border: "1px solid #ccc",
            padding: "8px 12px",
            fontSize: "0.9rem"
        },
        addBtn: {
            borderRadius: "8px",
            border: "none",
            background: "#22cba7",
            color: "#fff",
            fontWeight: "500",
            padding: "8px 14px"
        }
    };

    return (
        <div className="container py-5">
            <h2 style={styles.title}>Categories</h2>
            <div className="row">
                <div className="col-4">

                </div>
                <div className="col-4">
                    <div className="d-flex flex-column mb-5 flex-sm-row justify-content-center align-items-center gap-2 ">
                        <input
                            style={styles.addInput}
                            type="text"
                            placeholder="New category"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            className="form-control"
                        />
                        <button
                            style={styles.addBtn}
                            onClick={handleAdd}
                            className="btn"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="col-4">

                </div>

            </div>

            {categories.length > 0 ? (
                <div className="row g-3 justify-content-center">
                    {categories.map(cat => (
                        <div key={cat.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div style={styles.card} className="text-light">
                                <span>{cat.name}</span>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(cat.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted mt-5">No categories available</p>
            )}


        </div>
    );
}

export default Categories;
