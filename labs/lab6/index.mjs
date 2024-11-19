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
    let sql = `SELECT authorId, firstName, lastName
               FROM authors
               ORDER BY lastName`;
    const [authors] = await conn.query(sql);

    let sql2 = `SELECT DISTINCT category FROM quotes`
    const [categories] = await conn.query(sql2);

    res.render('home.ejs', {authors, categories})
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    if (keyword.length < 3){
        let error = "Please try again with a keyword that is at least 3 characters"
        res.render("quotes.ejs", {error})
    }
    let sql = `SELECT authorId, firstName, lastName, quote 
               FROM quotes
               NATURAL JOIN authors 
               WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];
    const [rows] = await conn.query(sql, sqlParams);
    console.log(keyword);
    res.render("quotes.ejs", {rows})
 });

 app.get('/searchByAuthor', async (req, res) => {
    let authorId = req.query.authorId;
    console.log(authorId);
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes 
               WHERE authorId = ?`;
    let sqlParams = [`${authorId}`];
    const [rows] = await conn.query(sql, sqlParams);
    console.log(authorId);
    res.render("quotes.ejs", {rows})
 });

 
 app.get("/searchByLikes", async(req, res) => {
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let sql = `SELECT * FROM quotes NATURAL JOIN authors 
               WHERE likes >= ? and likes <= ? ORDER BY likes DESC`;
    let sqlParams = [num1, num2]
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

app.get("/searchByCategory", async(req, res) => {
    let cat = req.query.category;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes 
               WHERE category = ?`;
    let sqlParams = [cat]
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

// using route parameters
app.get('/api/author/:authorId', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT * 
            FROM authors
            WHERE authorId=?`
    let sqlParams = [authorId];
    const [rows] = await conn.query(sql, sqlParams);
    res.send(rows);
});



app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(10009, ()=>{
    console.log("Express server running")
})