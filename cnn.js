const pgPromise = require("pg-promise")
const config = {
    host: "localhost",
    port: "5432",
    database: "moduloCompras",
    user: "postgres",
    password: "123456"

    
}

const pgp = pgPromise({})
const db = pgp(config)

//db.any("select * from pizza").then(res =>{console.log(res)}) 


exports.db=db;