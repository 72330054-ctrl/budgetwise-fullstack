import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../pages/AuthContext";
import API_URL from "../api"; 
// ${API_URL};
function NotificationBell() {
    const { user } = useAuth();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/notification/${user.id}`
                );

                const today = new Date();

                const highlightCount = res.data.filter((n) => {
                    const diffDays = Math.ceil(
                        (new Date(n.due_date) - today) / (1000 * 60 * 60 * 24)
                    );
                    const notifyDays = Number(n.notification.split("_")[0]);
                    return diffDays === notifyDays && n.payed === 0;
                }).length;

                setCount(highlightCount);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
        };

        fetchNotifications(); // initial fetch

        const interval = setInterval(fetchNotifications, 1);

        return () => clearInterval(interval); // cleanup on unmount
    }, [user]);

    if (count === 0) return null;

    return (
        <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }}>
            <FaBell
                size={20}
                color="white"
                style={{
                    display: "inline-block",
                    transformOrigin: "top center",
                    animation: "ring 1s ease-in-out infinite" // optional: if you want it to ring continuously
                }}
            />

            <span
                style={{
                    position: "absolute",
                    top: "-6px",       // move badge above bell
                    right: "-6px",     // move badge to the right edge
                    backgroundColor: "#8B0000",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    minWidth: "18px",
                    textAlign: "center",
                    lineHeight: "1",
                }}
            >
                {count}
            </span>
        </div>
        
    );
}

export default NotificationBell;
