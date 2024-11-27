// DBアクセス
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;
app.use(cors());
const db = new sqlite3.Database("./kintai.db");
// 全レコード取得 API
app.get('/api/employees', (req, res) => {
    db.all('SELECT * FROM employees', (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Error accessing database' });
        } else {
            res.json(rows);  // フロントエンドにJSON形式でデータを返す
        }
    });
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:3001/api/employees`);
});
// 全レコード取得
// function fetchAllEmployees() {
//     return new Promise((resolve, reject) => {
//         db.all("SELECT * FROM employees", (err, rows) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(rows);
//             }
//         });
//     });
// }

// // 特定の条件で1件取得
// function fetchEmployeeByName(name) {
//     return new Promise((resolve, reject) => {
//         db.get("SELECT * FROM employees WHERE name = ?", name, (err, row) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(row);
//             }
//         });
//     });
// }

// // データベース操作
// (async () => {
//     try {
//         // 全レコード取得
//         const employees = await fetchAllEmployees();
//         console.log("All employees:");
//         console.log(employees);

//         // 特定のレコード取得
//         const employee = await fetchEmployeeByName("Alice");
//         console.log("Employee named Alice:");
//         console.log(employee);
//     } catch (err) {
//         console.error("Error accessing database:", err);
//     } finally {
//         db.close();
//     }
// })();
