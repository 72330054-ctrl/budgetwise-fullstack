import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/AuthContext";

function CategoryComboBox({ selectedCategory, onChange }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchCategories();
  }, [user]);

  return (
    <div className="mb-3">
      <label htmlFor="categorySelect" className="form-label">
        Select Category
      </label>
      <select
        id="categorySelect"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose category --</option>
        {categories.map((categories) => (
          <option key={categories.id} value={categories.id}>
            {categories.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryComboBox;
