const express = require('express'); // import the package
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


db.connect((err) => {
    if (err) {
        console.log("❌ DB connection error:", err);
        return;
    }
    console.log("✅ Connected to MySQL (liu DB)");
});
app.get("/test", (req, res) => {
    res.send("Test route works!");
});
app.get("/acounts/:id", (req, res) => {
    const userId = req.params.id;

    const q = `SELECT * FROM acounts WHERE user_id=? `;

    db.query(q, [userId], (err, data) => {
        if (err) {
            console.log("❌ Error in /acounts:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/acounts/update/:id", (req, res) => {
    const accountId = req.params.id;

    const q = `SELECT * FROM acounts WHERE acount_id = ?`;

    db.query(q, [accountId], (err, data) => {
        if (err) {
            console.log("❌ Error in /acounts/update:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Account not found" });
        }

        // ✅ return single account object
        return res.json(data[0]);
    });
});
app.post("/acounts/update/form/:id", (req, res) => {
    const accountId = req.params.id;

    const {
        acount_name,
        acount_money,
        currency,
        acount_type,
        acount_number,
        acount_icon
    } = req.body;

    const q = `
        UPDATE acounts
        SET
            acount_name = ?,
            acount_money = ?,
            currency = ?,
            acount_type = ?,
            acount_number = ?,
            acount_icon = ?
        WHERE acount_id = ?
    `;

    db.query(
        q,
        [
            acount_name,
            acount_money,
            currency,
            acount_type,
            acount_number,
            acount_icon,
            accountId
        ],
        (err, result) => {
            if (err) {
                console.error("❌ Update error:", err);
                return res.status(500).json({ error: "Update failed" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Account not found"
                });
            }

            res.json({
                message: "Account updated successfully"
            });
        }
    );
});
app.delete("/acounts/delete/:id", (req, res) => {
    const id = req.params.id;

    console.log("DELETE HIT:", id);
    db.query(
        "DELETE FROM acounts WHERE acount_id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Account not found" });
            }

            res.json({ message: "Deleted successfully" });
        }
    );
});
app.get("/users", (req, res) => {
    const q = `
        SELECT * FROM users
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /users:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.post("/acounts", (req, res) => {
    const { user_id, acount_name, acount_money, acount_icon, acount_number, acount_type, currency } = req.body;

    const q = `
    INSERT INTO acounts (user_id, acount_name, acount_money, acount_icon, acount_number, acount_type, currency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(q, [user_id, acount_name, acount_money, acount_icon, acount_number, acount_type, currency], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Account created successfully!" });
    });
});
app.post("/bill", (req, res) => {
    const {
        name,
        amount,
        payee_to,
        category_id,
        account_id,
        due_date,
        frequency,
        notes,
        auto_pay,
        notification,
    } = req.body;

    const q = `
   INSERT INTO bill ( name, amount, payee_to, category_id, acount_id, due_date, frequency, notes, auto_pay, notification)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `;

    db.query(
        q,
        [
            name,
            amount,
            payee_to,
            category_id,
            account_id,
            due_date,
            frequency,
            notes,
            auto_pay,
            notification,
        ],
        (err, result) => {
            if (err) {
                console.error("Error inserting bill:", err);
                return res.status(500).json(err);
            }
            res.json({ message: "Bill created successfully!", bill_id: result.insertId });
        }
    );
});
app.delete("/bill/delete/:id", (req, res) => {
    const id = req.params.id;

    console.log("DELETE HIT:", id);
    db.query(
        "DELETE FROM bill WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "bill not found" });
            }

            res.json({ message: "Deleted successfully" });
        }
    );
});
app.post("/bill/pay/:id", (req, res) => {
    const id = req.params.id;

    // First, get bill info to know account_id and amount
    db.query("SELECT amount, acount_id FROM bill WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Bill not found" });
        const { amount, acount_id } = result[0];

        // Update bill as paid
        db.query("UPDATE bill SET payed=1 WHERE id=?", [id], (err2, result2) => {
            if (err2) return res.status(500).json(err2);

            // Deduct money from account
            db.query("UPDATE acounts SET acount_money = acount_money - ? WHERE acount_id = ?", [amount, acount_id], (err3) => {
                if (err3) return res.status(500).json(err3);

                res.json({ message: "Bill paid successfully" });
            });
        });
    });
});
app.get("/acounts", (req, res) => {
    const q = `SELECT * FROM acounts  `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /acounts:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/categories", (req, res) => {
    const q = `SELECT * FROM categories`;
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    })
})
app.post("/categories/add", (req, res) => {
    const { name } = req.body;

    const q = "INSERT INTO categories (name) VALUES (?)";

    db.query(q, [name], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        // ✅ Send back the created category
        return res.json({
            id: result.insertId,
            name: name,
        });
    });
});
app.delete("/categories/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log("DELETE HIT:", id);
    db.query(
        `DELETE FROM categories WHERE id=? `,
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            else {
                res.json({ message: "Deleted successfully" });
            }


        }
    );
});
app.get("/home", (req, res) => {
    const q = `
        SELECT * FROM about_us
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /home:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/vision", (req, res) => {
    const q = `
        SELECT * FROM vision
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /vision:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/challenges", (req, res) => {
    const q = `
        SELECT * FROM challenges
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /challenges:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/why_us", (req, res) => {
    const q = `
        SELECT * FROM why_us
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /why_us:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get("/features", (req, res) => {
    const q = `
        SELECT * FROM features
    `;
    db.query(q, (err, data) => {
        if (err) {
            console.log("❌ Error in /features:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});

app.post("/users", (req, res) => {
    const { email, password } = req.body;

    const q = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(q, [email, password], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User created" });
    });
});
app.post("/transactions/add", (req, res) => {
    let { account_id, amount, date, category_id, pay, Description, type } = req.body;
    if (!account_id || !amount || !date || !type) {
        return res.status(400).json({ error: "Missing required fields" });}
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
        return res.status(400).json({ error: "Amount must be a number" });
    }
    const insertQuery = `
    INSERT INTO transaction (acount_id, amount, date, category_id, pay, description, type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    db.query(insertQuery, [account_id, numericAmount, date, category_id, pay, Description, type], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const balanceQuery =
            type.trim().toLowerCase() === "income"
                ? `UPDATE acounts SET acount_money = acount_money + ? WHERE acount_id = ?`
                : `UPDATE acounts SET acount_money = acount_money - ? WHERE acount_id = ?`;

        db.query(balanceQuery, [numericAmount, account_id], (err2, result2) => {
            if (err2) return res.status(500).json({ error: err2.message });

            res.json({
                message: "Transaction added successfully",
                transactionId: result.insertId,
            });
        });
    });
});
app.get("/transactions/:id", (req, res) => {
    const userId = req.params.id;

    const q = `
        SELECT * ,acounts.acount_name,categories.name AS c_name 
        FROM transaction
        INNER JOIN acounts ON acounts.acount_id = transaction.acount_id
        INNER JOIN users ON acounts.user_id = users.user_id
        INNER JOIN categories ON categories.id = transaction.category_id
        WHERE users.user_id = ?;
    `;

    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});
app.get("/transformation/:id", (req, res) => {
    const userId = req.params.id;

    const q = `
    SELECT 
        t.from_acount AS from_id,
        from_acc.acount_name AS from_name,
        t.to_acount AS to_id,
        to_acc.acount_name AS to_name,
        t.amount,
        t.description,
        t.date
    FROM transfers t
    INNER JOIN acounts AS from_acc ON from_acc.acount_id = t.from_acount
    INNER JOIN acounts AS to_acc ON to_acc.acount_id = t.to_acount
    INNER JOIN users u ON u.user_id = from_acc.user_id
    WHERE u.user_id = ?;
`;


    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});
app.get("/notification/:id", (req, res) => {
    const { id } = req.params;

    const q = `
    SELECT bill.*, acounts.acount_name, users.user_id
    FROM bill
    INNER JOIN acounts ON acounts.acount_id = bill.acount_id
    INNER JOIN users ON users.user_id = acounts.user_id
    WHERE bill.auto_pay = 1 OR users.user_id = ?
  `;

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("❌ Error fetching notifications:", err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(data);
    });
});
app.post("/transfer", (req, res) => {
    let { amount, from_acount, to_acount, date, description } = req.body;
    const numericAmount = parseFloat(amount);
    from_acount = parseInt(from_acount);
    to_acount = parseInt(to_acount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount" }); }
    db.beginTransaction(err => {
        if (err) return res.status(500).json({ error: err.message });
        const insertQuery = `
            INSERT INTO transfers(from_acount, to_acount, amount, description, date)
            VALUES (?, ?, ?, ?, ?) `;
        db.query(insertQuery, [from_acount, to_acount, numericAmount, description, date], (err) => {
            if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
            const subtractQuery = `
                UPDATE acounts
                SET acount_money = acount_money - ?
                WHERE acount_id = ? AND acount_money >= ? `;
            db.query(subtractQuery, [numericAmount, from_acount, numericAmount], (err, result) => {
                if (err || result.affectedRows === 0) {
                    return db.rollback(() => res.status(400).json({ error: "Insufficient balance or invalid account" }));   }
                const addQuery = `
                    UPDATE acounts
                    SET acount_money = acount_money + ?
                    WHERE acount_id = ? `;
                db.query(addQuery, [numericAmount, to_acount], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                    db.commit(err => {
                        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                        res.json({ message: "Transfer successful" });  });   });    });  });   });
});

app.get("/budget/:id", (req, res) => {
    const userId = req.params.id;
    const q = `SELECT b.*, c.name 
         FROM budget b 
         JOIN categories c ON b.category_id = c.id
         WHERE b.user_id = ?`;
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});
app.get("/usedbudget/:id", (req, res) => {
    const Id = req.params.id;
    const q = `SELECT * FROM used_budget WHERE budget_id=?`;
    db.query(q, [Id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});
app.post("/used_budget", (req, res) => {
    let { budget_id, amount_used, description, date_used } = req.body;
    const numericAmount = parseFloat(amount_used);
    if (!budget_id || numericAmount <= 0) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const insertUsed = `
        INSERT INTO used_budget (budget_id, amount_used, date_used, description)
        VALUES (?, ?, ?, ?)
    `;
    db.query(insertUsed, [budget_id, numericAmount, date_used, description], (err) => {
        if (err) {
            console.error("Error inserting used budget:", err);
            return res.status(500).json({ error: err });
        }
        const updateBudget = `
            UPDATE budget
            SET used_amount = used_amount + ?
            WHERE id = ?
        `;
        db.query(updateBudget, [numericAmount, budget_id], (err) => {
            if (err) {
                console.error("Error updating budget:", err);
                return res.status(500).json({ error: "Failed to update budget" });
            }
            res.json({ message: "Used budget added successfully!" });
        });
    });
});
app.post("/budget/add",(req,res)=>{
    const{b_period,category_id,actual_amount,user_id}=req.body;
    q=`INSERT INTO budget(user_id, category_id, b_period, actual_amount )
     VALUES (?,?,?,?)`
     const category=parseInt(category_id);
     const amount=parseFloat(actual_amount);
     db.query(q,[user_id,category,b_period,amount],(err)=>{
        if(err){
            console.error("Error inserting used budget:", err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: " budget added successfully!" });

     })
})
app.delete("/budget/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM budget WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database deletion failed" });
            }
            res.json({ message: "Deleted successfully" });
        }
    );
});
// Update budget route
app.post("/budget/update/:id", (req, res) => {
    const id = req.params.id;
    const { actual_amount, b_period, used_amount } = req.body;

    const q = `
        UPDATE budget 
        SET actual_amount = ?, b_period = ?, used_amount = ?
        WHERE id = ?
    `;

    db.query(q, [actual_amount, b_period, used_amount, id], (err, result) => {
        if (err) {
            console.error("Error updating budget:", err);
            return res.status(500).json({ error: "Failed to update budget" });
        }
        res.json({ message: "Budget updated successfully!" });
    });
});

app.delete("/usedbudget/delete/:id", (req, res) => {
    const id = req.params.id; 
    db.query("DELETE FROM used_budget WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to delete transaction" });
        }
        res.json({ message: "Transaction deleted successfully" });
    });
});




//  Admin Actionsssss



app.post("/about_update",(req,res)=>{
    const{title,text,quote}=req.body;
    q=`UPDATE about_us SET title=?,text=?,quote=? WHERE 1`
    db.query(q,[title,text,quote],(err)=>{
        if(err){
            return res.status(500).json({ error: "Failed to update about" });
        }
        res.json({ message: "Updated successfully!" });
    })
})
app.post("/vision_update",(req,res)=>{
    const{title,text}=req.body;
    q=`UPDATE vision SET title=?,text=? WHERE 1`
    db.query(q,[title,text],(err)=>{
        if(err){
            return res.status(500).json({ error: "Failed to update vision" });
        }
        res.json({ message: "Vision updated successfully!" });
    })
})

app.post("/challenge/update/:id",(req,res)=>{
 
    const id=parseInt(req.params.id);
    const{challenge}=req.body;
    q=`UPDATE challenges SET challenge=? WHERE id=?`
    db.query(q,[challenge,id],(err)=>{
        if(err){
            return res.status(500).json({ error: "Failed to update challenges" });
        }
        res.json({ message: "challenges updated successfully!" });
    })
})
app.post("/why_us/update/:id", (req, res) => {
    const id = parseInt(req.params.id); // get the id from URL
    const { icon, title, text } = req.body; // get fields from request body

    const q = `UPDATE why_us SET icon = ?, title = ?, text = ? WHERE id = ?`;
    
    db.query(q, [icon, title, text, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update Why Us entry" });
        }
        res.json({ message: "Why Us entry updated successfully!" });
    });
});
// Update a feature by ID
app.post("/features/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { icon, title, text } = req.body;

    const q = `UPDATE features SET icon = ?, title = ?, text = ? WHERE id = ?`;

    db.query(q, [icon, title, text, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update feature" });
        }
        res.json({ message: "Feature updated successfully!" });
    });
});
// server.js or routes/stats.js
app.get("/api/statistics/:userId", (req, res) => {
    const userId = req.params.userId;

    const queries = {
        totalBalance: `SELECT SUM(acount_money) AS totalBalance FROM acounts WHERE user_id = ?`,
        monthlyIncome: `SELECT SUM(amount) AS monthlyIncome 
                        FROM transaction 
                        WHERE acount_id IN (SELECT acount_id FROM acounts WHERE user_id = ?) 
                          AND type='income' 
                          AND MONTH(date)=MONTH(CURRENT_DATE()) 
                          AND YEAR(date)=YEAR(CURRENT_DATE())`,
        monthlyExpenses: `SELECT SUM(amount_used) AS monthlyExpenses 
                          FROM used_budget 
                          WHERE budget_id IN (SELECT id FROM budget WHERE user_id = ?)
                            AND MONTH(date_used)=MONTH(CURRENT_DATE()) 
                            AND YEAR(date_used)=YEAR(CURRENT_DATE())`,
        remainingBudget: `SELECT SUM(actual_amount - used_amount) AS remainingBudget 
                          FROM budget 
                          WHERE user_id = ?`
    };

    db.query(queries.totalBalance, [userId], (err, totalBalanceResult) => {
        if (err) return res.status(500).json(err);

        db.query(queries.monthlyIncome, [userId], (err, monthlyIncomeResult) => {
            if (err) return res.status(500).json(err);

            db.query(queries.monthlyExpenses, [userId], (err, monthlyExpensesResult) => {
                if (err) return res.status(500).json(err);

                db.query(queries.remainingBudget, [userId], (err, remainingBudgetResult) => {
                    if (err) return res.status(500).json(err);

                    res.json({
                        totalBalance: totalBalanceResult[0].totalBalance || 0,
                        monthlyIncome: monthlyIncomeResult[0].monthlyIncome || 0,
                        monthlyExpenses: monthlyExpensesResult[0].monthlyExpenses || 0,
                        remainingBudget: remainingBudgetResult[0].remainingBudget || 0
                    });
                });
            });
        });
    });
});
const path = require('path');
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "myapp/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "myapp/build", "index.html"));
  });
}
