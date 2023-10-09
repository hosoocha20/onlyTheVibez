import express from "express";
import mysql from "mysql2";
import cors from "cors"

import eatsRoutes from "./routes/eats.js";
import todosRoutes from "./routes/todos.js";
import dotenv from "dotenv";
dotenv.config();

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
const port = process.env.PORT || 8800
app.listen(port, ()=>{
    console.log(`Listening to Port ${port}`)
})