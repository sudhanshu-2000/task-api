var mysql = require("mysql");
const con = mysql.createPool({
  connectionLimit: 10,
  host: "dpg-coci26gl5elc739t5ei0-a",
  port: 5432,
  user: "taskwebappsql_user",
  password: "GDpYUPWSAqoNLH2CgeWhSdxiWI6sZ8oS",
  database: "postgres://taskwebappsql_user:GDpYUPWSAqoNLH2CgeWhSdxiWI6sZ8oS@dpg-coci26gl5elc739t5ei0-a/taskwebappsql",
  multipleStatements:true
});
con.getConnection((err) => {
  if (err) throw err;
  console.log("Database Connected");
});
module.exports = con;
// rmnkuuby_task
// 87@6C]m) 5e[~
