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
app.get('/', (req, res) => {
   res.render('home.ejs')
});

app.get("/allAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors";
    const [rows] = await conn.query(sql);
    res.render("authors.ejs", {rows});
});//dbTest

app.get("/femaleAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors WHERE sex = ?";
    let sqlParams = ['F']
    const [rows] = await conn.query(sql, sqlParams);
    res.render("authors.ejs", {rows});
});

//americanMaleAuthors
app.get("/americanMaleAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors WHERE sex = ? AND country = ? ORDER BY lastName";
    let sqlParams = ['M', "USA"]
    const [rows] = await conn.query(sql, sqlParams);
    res.render("authors.ejs", {rows});
});

app.get("/birthPlaces", async(req, res) => {
    let sql = "SELECT DISTINCT(country) AS birthPlace FROM authors ORDER BY country DESC";
    
    const [rows] = await conn.query(sql);
    res.render("birthPlaces.ejs", {rows});
});

app.get("/cAuthors", async(req, res) => {
    let sql = "SELECT firstName, lastName, country FROM authors WHERE lastName LIKE ?";
    let sqlParams = ['C%']
    const [rows] = await conn.query(sql, sqlParams);
    res.render("authors.ejs", {rows});
});

app.get("/quotes", async(req, res) => {
    let sql = "SELECT quote FROM quotes ORDER BY quote";
    // let sqlParams = ['C%']
    const [rows] = await conn.query(sql);
    res.render("quotes.ejs", {rows});
});

app.get("/inspirationsalQuotes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE category = ?";
    let sqlParams = ['Inspirational']
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

app.get("/lifeQuotes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE quote LIKE ? OR quote = ?";
    let sqlParams = ['%life%', '%Life%']
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

app.get("/wisdomQuoteThings", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE quote LIKE ? OR quote = ? AND category = ?";
    let sqlParams = ['%things%', '%Things%', 'Wisdom']
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

app.get("/quoteWithLikes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE likes >= ? and likes <= ? ORDER BY likes DESC";
    let sqlParams = ["50", "100"]
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
});

app.get("/uniqueCat", async(req, res) => {
    let sql = "SELECT DISTINCT(category) AS category FROM quotes ORDER BY category";
    //SELECT DISTINCT(country) AS birthPlace FROM authors
    
    
    const [rows] = await conn.query(sql);
    res.render("uniqueCats.ejs", {rows});
});

app.get("/topThree", async(req, res) => {
    let sql = "SELECT * FROM quotes ORDER BY likes DESC LIMIT 3";
    // let sqlParams = ["50", "100"]
    const [rows] = await conn.query(sql);
    res.render("quotes.ejs", {rows});
});

app.get("/authorPics", async(req, res) => {
    let sql = "SELECT * FROM authors WHERE portrait ";
    // let sqlParams = ["50", "100"]
    const [rows] = await conn.query(sql);
    res.render("quotes.ejs", {rows});
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

//uniqueCat


app.listen(3001, ()=>{
    console.log("Express server running")
})