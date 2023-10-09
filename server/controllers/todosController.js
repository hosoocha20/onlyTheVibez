import { db } from "../connect.js"

export const getAllTodos = (req, res) =>{
    const q = "SELECT * FROM aucklandtododb"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

}

export const getTodoCategory = (req,res)=>{
    const q = "SELECT * FROM aucklandtododb WHERE funCategory=?"
    db.query(q,req.params.funCategory,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}