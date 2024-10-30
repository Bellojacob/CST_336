import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

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
    let sql = `SELECT firstName, lastName from authors`
    const [authorNames] = await conn.query(sql) 
    console.log(authorNames)

    let sql2 = `SELECT DISTINCT category FROM quotes`
    const [categories] = await conn.query(sql2) 
   res.render('home.ejs', {authorNames, categories})
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    let sql = `SELECT firstName, lastName, quote 
               FROM quotes
               NATURAL JOIN authors 
               WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];
    const [rows] = await conn.query(sql, sqlParams);
    console.log(keyword);
    res.render("quotes.ejs", {rows})
 });


app.get('/searchByAuthor', async (req, res) => {
    let author = req.query.authors;
    let sql =   `SELECT firstName, lastName, quote 
                FROM quotes
                NATURAL JOIN authors 
                WHERE CONCAT(firstName, ' ', lastName) LIKE ?`;
    let sqlParams = [`%${author}%`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows})
});

app.get('/searchByCategory', async (req, res) => {
    let category = req.query.category;
    let sql =   `SELECT firstName, lastName, quote 
                FROM quotes
                NATURAL JOIN authors 
                WHERE category LIKE ?`;
    let sqlParams = [`%${category}%`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows})
});

app.get('/searchByLikes', async (req, res) => {
    let firstNum = req.query.firstNum;
    let secondNum = req.query.secondNum;

    let sql =   `SELECT * FROM quotes WHERE likes >= ? and likes <= ?`;
    let sqlParams = [firstNum, secondNum];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows})
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(8000, ()=>{
    console.log("Express server running")
})