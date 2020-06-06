import path from "path";

module.exports = {
  client : "mysql",
  version : "5.7",
  connection : {
    host : "172.17.0.2",
    user : "root",
    password : "ecocoletadb",
    database : "ecocoletadb"
  },
  migrations : {
    directory : path.resolve(__dirname, "src", "db", "migrations")
  },
  seeds : {
    directory : path.resolve(__dirname, "src", "db", "seeds")
  }
}