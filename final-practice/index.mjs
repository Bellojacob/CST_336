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


app.get("/", async (req, res) => {
    let sql = "SELECT * FROM fe_comic_sites";
    const [rows] = await conn.query(sql);
    res.render("home.ejs", {rows});
});

app.get("/comicPage", async (req, res) => {
    let siteId = req.query.comicSiteId;
    let sql = "SELECT * FROM fe_comics WHERE comicSiteId = ?";
    const [rows] = await pool.query(sql, [siteId]);
    res.render("comicPage.ejs", {rows});
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})