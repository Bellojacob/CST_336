import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

// Express needs the following line to parse data sent using the POST method
app.use(express.urlencoded({extended:true}));


const pool = mysql.createPool({
    host: "jacob-bello.tech",
    user: "jacobbel_webuser",
    password: "cst-336",
    database: "jacobbel_quotes",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

app.get('/', (req, res) => {
   res.render('home.ejs');
});

app.get('/authors', async (req, res) => {
   let sql = `SELECT authorId, firstName, lastName
              FROM authors
              ORDER BY lastName`;

   const [authors] = await conn.query(sql);

   res.render('authors.ejs', {authors});
});

app.get('/author/edit', async (req, res) => {
   let authorId = req.query.authorId;
   let sql = `SELECT *
            FROM authors
            WHERE authorId = ?`;
   let sqlParams = [authorId];
   const [authorData] = await conn.query(sql, sqlParams);
   res.render('editAuthor.ejs', {authorData});
});

app.post('/author/edit', async (req, res) => {
   let authorId = req.body.authorId;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let bio = req.body.bio;

   let sql = `UPDATE authors
            SET firstName = ?, lastName = ?, biography = ?
            WHERE authorId = ?`;
   let sqlParams = [firstName, lastName, bio, authorId];
   const [authorData] = await conn.query(sql, sqlParams);
   res.redirect('/authors');
});

// route to display the form add new authors
app.get('/authors/new', (req, res) => {
   res.render('newAuthor.ejs');
});

//route to add info (new author) into the database
app.post('/author/new', async (req, res) => {
   let fName = req.body.firstName;
   let lName = req.body.lastName;
   let gender = req.body.sex;
   let textArea = req.body.textArea;
   let picture = req.body.picture;




   let sql = `INSERT INTO authors
              (firstName, lastName, dob, dod, sex, portrait, biography)
              VALUES
              (?,?,?,?,?,?,?)`;
   
   let sqlParams = [fName, lName,req.body.dob, req.body.dod, gender, picture, textArea];
   const [rows] = await conn.query(sql, sqlParams);
   res.render('newAuthor.ejs');
});



app.get('/quotes/new', (req, res) => {
   res.render('newQuotes.ejs');
});

app.post('/quotes/new', async (req, res) => {
   let quote = req.body.textArea;
   let cat = req.body.category;
   let author = req.body.author;
   let sql = `INSERT INTO quotes
              (quote, category, authorId)
              VALUES
              (?,?, ?)`;
   
   let sqlParams = [quote, cat, author];
   const [rows] = await conn.query(sql, sqlParams);
   res.render('newQuotes.ejs');
});





app.listen(3000, () => {
   console.log('server started');
});

app.get("/dbTest", async(req, res) => {
   let sql = "SELECT CURDATE()";
   const [rows] = await conn.query(sql);
   res.send(rows);
});//dbTest