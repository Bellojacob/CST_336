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
    console.log(randomComic)
    res.render('home.ejs', {rows, randomComic})
});

// random comic button
app.get('/api/randomComic', async (req, res) => {
    let sql = `SELECT * FROM fe_comics ORDER BY RAND() LIMIT 1`;
    const [randomComic] = await conn.query(sql);
    res.json(randomComic[0]);
});

//addComic
app.get('/addComic', async (req, res) => {
    let sql = `SELECT * 
    FROM fe_comic_sites`;
    const [rows] = await conn.query(sql);
    res.render('addComic.ejs', {rows})
});

app.post('/addComic/new', async (req, res) => {
    let title = req.body.title;
    let url = req.body.url;
    let date = req.body.date;
    let website = req.body.website;
    
    let sql = `INSERT INTO fe_comics (comicTitle, comicUrl, comicDate, comicSiteId) VALUES (?, ?, ?, ?)`;
    await conn.query(sql, [title, url, date, website]);
    
    let sql2 = `SELECT * FROM fe_comic_sites`;
    const [rows] = await conn.query(sql2);
    res.render('addComic.ejs', {rows, success: "Comic added successfully"});
});

//comicPage
app.get('/comicPage/:comicSiteId', async (req, res) => {
    const conn = await pool.getConnection();
    let comicSiteId = req.params.comicSiteId;
    let sql = `SELECT * FROM fe_comics WHERE comicSiteId = ?`;
    const [rows] = await conn.query(sql, [comicSiteId]);
    res.render('comicPage.ejs', {rows});
});

app.get('/viewComments/1', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let comicId = req.params.comicId;
        let sql = `SELECT * FROM fe_comments WHERE comicId = ?`;
        const [rows] = await conn.query(sql, [comicId]);
        res.json(rows);
    } finally {
        conn.release();
    }
});

//dbTest
app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
});