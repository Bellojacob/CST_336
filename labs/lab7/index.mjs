import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

// init session variable
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

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
   if (req.session.authenticated) {
       res.redirect('/home');
   } else {
       res.render('login.ejs'); // Render the login form for unauthenticated users
   }
});


app.get('/logout', (req, res) => {
   req.session.destroy();
   res.redirect('/');
});

app.get('/quotes', async (req, res) => {
   if (req.session.authenticated){
   let sql = `SELECT *
              FROM quotes
              ORDER BY quote`;

   const [quotes] = await conn.query(sql);
   res.render('quotes.ejs', {quotes});
   }
   else {
      res.render("login")
   }
});

app.get('/quote/edit', async (req, res) => {
   if (req.session.authenticated){

   
   let quoteId = req.query.quoteId;
   let sql = `SELECT *
            FROM quotes
            WHERE quoteId = ?`;
   let sql2 = `SELECT authorId, firstName, lastName
               FROM authors
               ORDER BY lastName`;
   let sqlParams = [quoteId];
   const [quoteData] = await conn.query(sql, sqlParams);
   const [authors] = await conn.query(sql2);
   res.render('editQuote.ejs', {quoteData, authors})
} else {
   res.render("login")
}
});

app.post('/quote/edit', async (req, res) => {
   let quoteId = req.body.quoteId;
   let quote = req.body.quote;
   let authorId = req.body.authorId;
   let category = req.body.category;
   let likes = req.body.likes;
   let sql = `UPDATE quotes
            SET quote = ?,
            category = ?,
            authorId = ?,
            likes = ?
            WHERE quoteId = ?`;
   
   let sqlParams = [quote, category, authorId, likes, quoteId];
   const [quoteData] = await conn.query(sql, sqlParams);
   res.redirect('/quotes');
});

app.get('/authors', async (req, res) => {
   if (req.session.authenticated){
   let sql = `SELECT authorId, firstName, lastName
              FROM authors
              ORDER BY lastName`;

   const [authors] = await conn.query(sql);

   res.render('authors.ejs', {authors});
   } 
   else {
      res.render("login.ejs")
   }
});

app.get('/author/edit', async (req, res) => {
   if (req.session.authenticated){
   let authorId = req.query.authorId;
   let sql = `SELECT *
            FROM authors
            WHERE authorId = ?`;
   let sqlParams = [authorId];
   const [authorData] = await conn.query(sql, sqlParams);
   res.render('editAuthor.ejs', {authorData})
} else {
   res.render("login")
}
});



app.post('/author/edit', async (req, res) => {
   let authorId = req.body.authorId;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let country = req.body.country;
   let dob = req.body.dob;
   let dod = req.body.dod;
   let sex = req.body.sex;
   let profession = req.body.profession;
   let portrait = req.body.portrait;
   let bio = req.body.bio;

   let sql = `UPDATE authors
            SET firstName = ?, lastName = ?, biography = ?, country = ?, dob = ?, dod = ?, sex = ?, profession = ?, portrait = ? 
            WHERE authorId = ?`;
   let sqlParams = [firstName, lastName, bio, country, dob, dod, sex, profession, portrait, authorId];
   const [authorData] = await conn.query(sql, sqlParams);
   res.redirect('/authors');
});

// route to display the form add new authors
app.get('/authors/new', (req, res) => {
   if (req.session.authenticated){
      res.render('newAuthor.ejs');
   } else {
      res.redirect('/login');

   }
   
});

//route to add info (new author) into the database
app.post('/author/new', async (req, res) => {
   let fName = req.body.firstName;
   let lName = req.body.lastName;
   let gender = req.body.sex;
   let textArea = req.body.textArea;
   let picture = req.body.picture;
   let profession = req.body.profession;
   let country = req.body.country;




   let sql = `INSERT INTO authors
              (firstName, lastName, dob, dod, sex, profession, country, portrait, biography)
              VALUES
              (?,?,?,?,?,?,?,?,?)`;
   
   let sqlParams = [fName, lName,req.body.dob, req.body.dod, gender,profession, country, picture, textArea];
   const [rows] = await conn.query(sql, sqlParams);
   res.render('newAuthor.ejs');
});



app.get('/quotes/new', async (req, res) => {
   if (req.session.authenticated){
      let sql3 = `SELECT authorId, firstName, lastName
      FROM authors
      ORDER BY firstName`;
      const [authors] = await conn.query(sql3);
      
      let sql4 = `SELECT DISTINCT category FROM quotes`
      const [categories] = await conn.query(sql4);

      res.render('newQuotes.ejs', {authors, categories});
   } else {
      res.render("login")
   }
   
});

app.post('/quotes/new', async (req, res) => {
   try {
       let quote = req.body.textArea;
       let cat = req.body.category;
       let author = req.body.author;

       let sql = `INSERT INTO quotes (quote, category, authorId) VALUES (?, ?, ?)`;
       await conn.query(sql, [quote, cat, author]);

       // Fetch updated authors and categories
       let sql3 = `SELECT authorId, firstName, lastName FROM authors ORDER BY firstName`;
       const [authors] = await conn.query(sql3);

       let sql4 = `SELECT DISTINCT category FROM quotes`;
       const [categories] = await conn.query(sql4);

       res.render('newQuotes.ejs', { authors, categories, success: "Quote added successfully!" });
   } catch (err) {
       console.error("Error adding new quote:", err);
       res.render('newQuotes.ejs', { authors: [], categories: [], error: "Failed to add quote." });
   }
});


//middleware functions
function isAuthenticated(req, res, next){
   if (req.session.authenticated){
       next();
   } else {
       res.redirect('/');
   }
}

app.get('/settings', isAuthenticated, (req, res) => {
   res.render('settings.ejs');
});

app.get('/login', (req,res) => {
   res.render("login")
});

//login using bcrypt
app.post('/login', async (req, res) => {
   let username = req.body.username;
   let password = req.body.password;

   try {
       let sql = `SELECT * FROM admin WHERE username = ?`;
       const [rows] = await conn.query(sql, [username]);

       if (rows.length > 0) {
           let passwordHash = rows[0].password;
           let match = await bcrypt.compare(password, passwordHash);

           if (match) {
               req.session.fullName = rows[0].firstName + " " + rows[0].lastName;
               req.session.authenticated = true;
               return res.redirect('/home'); // Redirect to /home after successful login
           }
       }

       // If authentication fails
       res.render('login.ejs', { error: "Invalid username or password" });
   } catch (err) {
       console.error("Error during login:", err);
       res.render('login.ejs', { error: "An error occurred during login. Please try again." });
   }
});

app.get('/home', isAuthenticated, (req, res) => {
   res.render('home.ejs', { fullName: req.session.fullName });
});


app.get('/authors/delete', async (req, res) => {
   if (req.session.authenticated) {
       try {
           let sql = `SELECT authorId, firstName, lastName FROM authors ORDER BY lastName`;
           const [authors] = await conn.query(sql);
           res.render('deleteAuthors.ejs', { authors });
       } catch (err) {
           console.error("Error fetching authors:", err);
           res.render('deleteAuthors.ejs', { authors: [], error: "Failed to load authors." });
       }
   } else {
       res.redirect('/login');
   }
});

app.post('/authors/delete', async (req, res) => {
   try {
       let authorId = req.body.authorId;

       // Ensure the authorId is valid
       if (!authorId) {
           res.render('deleteAuthors.ejs', { error: "No author selected." });
           return;
       }

       let sql = `DELETE FROM authors WHERE authorId = ?`;
       await conn.query(sql, [authorId]);

       res.redirect('/authors'); // Redirect to the authors list after deletion
   } catch (err) {
       console.error("Error deleting author:", err);
       res.render('deleteAuthors.ejs', { error: "Failed to delete author." });
   }
});

app.get('/quotes/delete', async (req, res) => {
   if (req.session.authenticated) {
       try {
           let sql = `SELECT quoteId, quote, category FROM quotes ORDER BY quote`;
           const [quotes] = await conn.query(sql);
           res.render('deleteQuotes.ejs', { quotes });
       } catch (err) {
           console.error("Error fetching quotes:", err);
           res.render('deleteQuotes.ejs', { quotes: [], error: "Failed to load quotes." });
       }
   } else {
       res.redirect('/login');
   }
});

app.post('/quotes/delete', async (req, res) => {
   try {
       let quoteId = req.body.quoteId;

       // Ensure the quoteId is valid
       if (!quoteId) {
           res.render('deleteQuotes.ejs', { error: "No quote selected." });
           return;
       }

       let sql = `DELETE FROM quotes WHERE quoteId = ?`;
       await conn.query(sql, [quoteId]);

       res.redirect('/quotes'); // Redirect to the quotes list after deletion
   } catch (err) {
       console.error("Error deleting quote:", err);
       res.render('deleteQuotes.ejs', { error: "Failed to delete quote." });
   }
});





app.listen(3000, () => {
   console.log('server started');
});

app.get("/dbTest", async(req, res) => {
   let sql = "SELECT CURDATE()";
   const [rows] = await conn.query(sql);
   res.send(rows);
});//dbTest