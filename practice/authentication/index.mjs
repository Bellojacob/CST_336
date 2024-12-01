import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// init session variable
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

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
app.get('/', (req, res) => {
   res.render('login.ejs');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('/');
 });



app.get('/profile', (req, res) => {
    if (req.session.authenticated){
        res.render('profile.ejs');
    } else {
        res.redirect('/');
    }
    
 });

 app.get('/settings', isAuthenticated, (req, res) => {
        res.render('settings.ejs');
 });

//login using bcrypt
app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(password);

    let passwordHash = '';

    let sql = `SELECT *
               FROM admin
               WHERE username = ?
               `;
    const [rows] = await conn.query(sql, [username]);
    
    if (rows.length > 0){ // if found at least one record
        passwordHash = rows[0].password;
    }

    let match = await bcrypt.compare(password, passwordHash);


    

    if (match){
        req.session.fullName = rows[0].firstName + " " + rows[0].lastName;
        req.session.authenticated = true;
        res.render('welcome.ejs');
    } else {
        res.redirect('/');
    }
 });

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

//middleware functions
function isAuthenticated(req, res, next){
    if (req.session.authenticated){
        next();
    } else {
        res.redirect('/');
    }
}

app.listen(3000, ()=>{
    console.log("Express server running")
})