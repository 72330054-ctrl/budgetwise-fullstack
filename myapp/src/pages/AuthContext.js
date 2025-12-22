import { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
import API_URL from "../api"; 
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const foundUser = res.data.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        setUser({
          id: foundUser.user_id,
          email: foundUser.email,
          role: foundUser.role,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error logging in:", err);
      return false;
    }
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
