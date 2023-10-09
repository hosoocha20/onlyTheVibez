import { db } from "../connect.js"

export const getAllEats = (req, res) =>{
    const q = "SELECT * FROM aucklanddb.eat"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

}

export const getEatCategory = (req,res)=>{
    const q = `SELECT * FROM aucklanddb.eatfielddb 
                INNER JOIN aucklanddb.eatfieldlink 
                ON aucklanddb.eatfielddb.EatFieldID = aucklanddb.eatfieldlink.EatFieldID 
                INNER JOIN aucklanddb.eat 
                ON aucklanddb.eatfieldlink.EatID = aucklanddb.eat.EatID 
                WHERE aucklanddb.eatfielddb.EatFieldName =?`
    db.query(q,req.params.EatCategory,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

