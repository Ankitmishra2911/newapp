import express from 'express';
import pg from 'pg';



const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "CTZ",
    password: "Ankit@123",
    port: 5432,
});

db.connect();


const displaydata=express.Router();


displaydata.post('/items',async(req,res)=>{
    try {
        const resut=await db.query("Select * from item");
        const result=await db.query("Select * from categories");
        global.items=resut;
        global.categories=result;
        res.send([global.items,global.categories]);
  
        
    } catch (error) {
        res.status(400).json(error.message);
        
    }
})
displaydata.get("/category/:itemid",async(req,res)=>{
    try{
    const itemid=req.params.itemid;
    const category=req.params.category;
    const result=await db.query("select * from item where itemid=$1",[itemid]);
    res.send(result.rows);
    }
    catch(err)
{
    res.sendStatus(400).json(err.message);
}
})

export default displaydata;