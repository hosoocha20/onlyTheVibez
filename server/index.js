import express from "express";
import mysql from "mysql2";
import cors from "cors"

import eatsRoutes from "./routes/eats.js";
import todosRoutes from "./routes/todos.js";

const app = express()

//middlewares
app.use(express.json())
app.use(cors())

app.use(express.static('public'));
app.use('/images', express.static('images'));


app.use("/api/eats", eatsRoutes)
app.use("/api/todos", todosRoutes)





// app.get("/eats/:EatCategory", (req,res)=>{
//     const q = "SELECT * FROM aucklanddb.eat WHERE EatCategory=?"
//     db.query(q,req.params.EatCategory,(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })


app.listen(8800, ()=>{
    console.log("Listening to Port 8800")
})