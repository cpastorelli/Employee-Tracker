const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.query('SELECT * FROM employee', function (err, result) {
    if (err) throw err;
    console.log(result);
});

db.query(`DELETE FROM employee WHERE id = ?`, 3, (err, result) => {
    if (err) throw err;
    console.log(result);
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});