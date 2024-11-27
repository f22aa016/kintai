const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./kintai.db");

db.serialize(() => {
    // テーブルの削除と作成
    db.run("DROP TABLE IF EXISTS employees")
      .run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL
      )`)
      // データの挿入
      .run("INSERT INTO employees(name, password) VALUES(?, ?)", "長沼", "shimoda")
      .run("INSERT INTO employees(name, password) VALUES(?, ?)", "下田", "shimoda")
      // データの更新
    //   .run("UPDATE employees SET password = ? WHERE name = ?", "newpassword", "長沼");
    
    // データの取得（各行ごと）
    db.each("SELECT * FROM employees", (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(`ID: ${row.id}, Name: ${row.name}, Password: ${row.password}`);
    });

    // データの取得（全件）
    db.all("SELECT * FROM employees", (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(JSON.stringify(rows, null, 2));
    });

    // レコード数の取得
    db.get("SELECT COUNT(*) as count FROM employees", (err, count) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(`Total employees: ${count.count}`);
    });
});

db.close();
