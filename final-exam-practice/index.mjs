import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "jacob-bello.tech",
    user: "jacobbel_webuser",
    password: "cst-336",
    database: "jacobbel_quotes",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//routes
app.get('/', async (req, res) => {
    let sql = `SELECT * 
                FROM fe_comic_sites`;
    const [rows] = await conn.query(sql);

    //display random comic section
    let sql2 = `SELECT * FROM fe_comics ORDER BY RAND() LIMIT 1`
    const [randomComic] = await conn.query(sql2);
   res.render('home.ejs', {rows})
});

//addComic
app.get('/addComic', async (req, res) => {
    let sql = `SELECT * 
    FROM fe_comic_sites`;
    const [rows] = await conn.query(sql);
    res.render('addComic.ejs', {rows})
 });

 //comicPage
 app.get('/', (req, res) => {
    res.render('home.ejs')
 });

 //addComment
 app.get('/', (req, res) => {
    res.render('home.ejs')
 });

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})