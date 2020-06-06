import knex from "knex";

const connection = knex( {
  client : "mysql",
  version : "5.7",
  connection : {
    host : "172.17.0.2",
    user : "root",
    password : "ecocoletadb",
    database : "ecocoletadb"
  },
  useNullAsDefault : true
});

export default connection;