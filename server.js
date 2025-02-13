const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const cors = require('cors');
const { logEvent , logger } = require('./middleware/logEvents');
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

// custom middleware logger
app.use(logger);

app.use(credentials)

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware to handle cookies
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '/public')));
app.use( '/subdir' ,express.static(path.join(__dirname, '/public')));
app.use( '/puzzle' ,express.static(path.join(__dirname, '/public' , 'puzzle')));

// routes 
app.use('/' , require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/puzzle', require('./routes/puzzle'));
app.use('/regester', require('./routes/regester'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// api 
app.use('/employees', require('./routes/api/employees'));
app.use('/puzzle-api', require('./routes/api/puzzle'));
app.use('/leaderboard-api', require('./routes/api/leaderboard'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(port, () => { console.log(`Server is running on port ${port}`) } );
 