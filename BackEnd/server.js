import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect with mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskcruddb",
});
app.get("/", (req, res) => {
  const sql = "SELECT * FROM task";

  // running the SQL query

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Server Error" });

    // result back to the client in JSON format

    return res.json(result);
  });
});
app.post("/task", (req, res) => {
  const sql = "INSERT INTO  task (`Name`,`Status`,`Assign`,`Type`) VALUES(?)";
  const values = [
    req.body.name,
    req.body.status,
    req.body.assign,
    req.body.type,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Server Error" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM task  WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Server Error In Update" });

    // result back to the client in JSON format

    return res.json(result);
  });
});
app.listen(8081, () => {
  console.log("Server Running");
});
