
// Packages
const express = require("express")
const app = express()
//const bodyParser = require("body-parser")

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use(require("./Routes/indexRoutes"))

// execution
app.get('/',(req,res)=> {res.send('Welcome api rest')})
app.listen(3000)
console.log("Server running in http://localhost:3000")