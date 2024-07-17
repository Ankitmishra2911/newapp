import express from 'express';
import pg  from 'pg';
import router from './Routes/User.js';
import displaydata from './Routes/DisplayData.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { redirect } from 'react-router-dom';
import multer from 'multer';
const app=express();
const port =4000;
const upload = multer({ dest: 'uploads/' });

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "CTZ",
    password: "Ankit@123",
    port: 5432,
  });
db.connect();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello world');
})


app.use('/api',router);
app.use('/api',displaydata);
app.use(cors());
app.use(bodyParser.json());

app.post('/api/posts',upload.array('photos'),async(req,res)=>{
  const { title, category, description,price, location, contactPerson, sellerid, phone } = req.body;
  const photos=req.files;
  const itemid=await db.query('SELECT itemid FROM item ORDER BY itemid DESC LIMIT 1');
  let itemid1=itemid.rows[0].itemid;
  itemid1++;
  const result=await db.query('insert into item (itemname,itemid,itemprice,description,sellerid,sellername,category) values ($1,$2,$3,$4,$5,$6,$7)',[title,itemid1++,price,description,sellerid,contactPerson,category]);
  if (!title || !category || !description || !location || !contactPerson) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  res.json({ message: 'Post created successfully', data: req.body ,files:photos});
});














app.post('/api/chat', async (req, res) => {
  const { buyerId, sellerId, itemId } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO chats (buyer_id, seller_id, item_id) VALUES ($1, $2, $3) RETURNING *',
      [buyerId, sellerId, itemId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/message', async (req, res) => {
  const { chatId, senderId, content } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO messages (chat_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *',
      [chatId, senderId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/chat/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM messages WHERE chat_id = $1 ORDER BY sent_at',
      [chatId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });