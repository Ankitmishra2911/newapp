import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const app = express();
const router = express.Router();
const jwtSecret="MyNameisAnkitMishraisHeroofworld";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "CTZ",
    password: "Ankit@123",
    port: 5432,
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const college="BIT MESRA"

router.post('/createUser', body('email').not().isEmpty().trim().withMessage('Email Address field is required')
    .isEmail().withMessage('Email field is not a valid format'),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const {fname,lname,email,password,personid}=req.body;
        const name=fname+" " +lname;
        const salt=await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(password,salt);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        
        try {
            await db.query("Insert into users(name,collegename,personid,email,password) values ($1,$2,$3,$4,$5)", [name, college, personid, email, secPassword]);
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.json({ success: false });
        }
        
    })
    router.post('/loginUser', body('email').not().isEmpty().trim().withMessage('Email Address field is required')
    .isEmail().withMessage('Email field is not a valid format'),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const {email,password}=req.body;
        global.name=email;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            const rest=await db.query("select email, password from users where email=$1",[email]);
            if(!rest.rows[0]){
                return res.status(400).json({errors:"Try logging with correct email address"});
            }
            
            const pwdCompare=await bcrypt.compare(password,rest.rows[0].password);
          
            if(!pwdCompare){
                return res.status(400).json({errors:"Try logging with correct password"});
            }
            const data={
                vart:{
                    personid:rest.rows[0].email
                }
            }
            const authtoken=jwt.sign(data,jwtSecret);
            console.log(authtoken);
            return res.json({success:true,authtoken:authtoken});
        } catch (error) {
            console.log(error.message);
            res.json({ success: false });
        }  
    })
    
export default router;